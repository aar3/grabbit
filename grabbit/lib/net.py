import asyncio
import json
import socket
import pathlib
import threading
import os
import pickle
import logging
import collections
import websockets
import django
from django.conf import settings
from lib.local_redis import get_redis_instance
from lib.utils import addr_to_string
from grabbit import logger

redis = get_redis_instance(host=settings.REDIS_HOST, port=settings.REDIS_DEFAULT_PORT)

handler = logging.StreamHandler()
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
handler.setFormatter(formatter)
wslogger = logging.getLogger("websockets")
wslogger.addHandler(handler)
wslogger.setLevel(logging.DEBUG)


router = collections.OrderedDict()


class WebSocketMsg:
    def __init__(self, client_addr):
        self.client_addr = client_addr
        self.details = None
        self.status = None
        self.user_id = None
        self.model = None
        self.redux_action = None
        self.instance = None
        self.uid = None

    def serialize(self):
        if self.instance and self.model:
            self.uid = self.model + "-" + str(self.instance["id"])
        return json.dumps(self.__dict__)


def handle_django_client_connect(conn, addr, loop):
    async def _handle_django_client_connect(conn, addr):
        while True:
            data = conn.recv(1024)
            if not data:
                break
            user_id, data, model = pickle.loads(data)
            logger.debug("Received %s from process at %s", (user_id, data, model), addr)

            websocket, client_addr = router[user_id]

            response = WebSocketMsg(client_addr)
            response.status = 200
            response.details = "success"
            response.instance = data
            response.model = model

            msg = response.serialize()
            logger.info(msg)
            await websocket.send(msg)

    asyncio.run_coroutine_threadsafe(_handle_django_client_connect(conn, addr), loop)


def run_unix_socket_for_django(loop):
    path = pathlib.Path("/tmp/django_socket.s")

    if path.exists():
        path.unlink()

    sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    sock.bind(str(path.absolute()))
    logger.info("UNIX Socket for Django comms listening at %s", str(path.absolute()))

    while True:
        sock.listen(5)
        conn, addr = sock.accept()
        handle = threading.Thread(target=handle_django_client_connect, args=(conn, addr, loop), daemon=True)
        handle.start()
        handle.join()


async def handle_client_redux_connection(websocket, path):
    while True:
        client_addr = addr_to_string(websocket.remote_address)
        wslogger.debug("New connection at %s from client at %s", path, client_addr)

        response = WebSocketMsg(client_addr)

        try:
            data = await websocket.recv()
            wslogger.debug("Received {:,}B at {}".format(len(data), path))
            data = json.loads(data)
            token = data["current_session_token"]

            if not token:
                response.status = 403
                response.details = "no token"
            else:
                user = redis.get(token)
                if not user:
                    response.status = 403
                    response.details = "No token"
                else:
                    user = json.loads(user.decode())
                    router[user["id"]] = (websocket, client_addr)
                    user["current_websocket_addr"] = client_addr

                    response.status = 200
                    response.details = "success"
                    response.model = "user"
                    response.redux_action = "GetSessionUserSuccess"
                    response.user_id = user["id"]
                    response.instance = user
        except Exception as err:
            wslogger.error("Websocket handle_client_redux_connection error: %s", str(err))
            response.status = 500
            response.details = str(err)

        msg = response.serialize()
        wslogger.info("%s", msg)
        await websocket.send(msg)


def main(*args, **kwargs):
    host = os.environ["WEBSOCKET_HOST"]
    port = os.environ["WEBSOCKET_PORT"]
    loop = asyncio.get_event_loop()

    server = websockets.serve(
        handle_client_redux_connection, host, port, ping_interval=20, extra_headers={"Grabbit-WS-Version": "1.0"}
    )

    handle = threading.Thread(target=run_unix_socket_for_django, args=(loop,))
    handle.start()

    wslogger.info("Websocket server listening at ws://%s:%s", host, port)
    loop.run_until_complete(server)

    loop.run_forever()
    handle.join()
