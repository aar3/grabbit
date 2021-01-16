import asyncio
import json
import os
import pickle
import logging
import collections
import django
from django.conf import settings
from django.apps import apps
from asgiref.sync import async_to_sync, sync_to_async
import websockets
from lib.local_redis import get_redis_instance
from lib.utils import addr_to_string

redis = get_redis_instance(host=settings.REDIS_HOST, port=settings.REDIS_DEFAULT_PORT)
ws_redis = get_redis_instance(host=settings.REDIS_HOST, port=settings.REDIS_WSROUTER_PORT)

handler = logging.StreamHandler()
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
handler.setFormatter(formatter)
logger = logging.getLogger("websockets")
logger.addHandler(handler)
logger.setLevel(logging.INFO)


class WebSocketMsg:
    def __init__(self, client_addr):
        self.client_addr = client_addr
        self.details = None
        self.status = None
        self.user_id = None
        self.model = None
        self.instance = None
        self.uid = None

    def serialize(self):
        if self.instance and self.model:
            self.uid = self.model + "-" + str(self.instance["id"])
        return json.dumps(self.__dict__)


@async_to_sync
async def send_model_hook_result_via_websocket(user_id, data, model):
    websocket, client_addr = pickle.loads(ws_redis.get(user_id))
    response = WebSocketMsg(client_addr)
    response.status = 200
    response.details = "success"
    response.instance = data
    response.model = model

    msg = response.serialize()
    logger.info(msg)
    return websocket.send(msg)


async def handle_client_redux_connection(websocket, path):
    while True:
        client_addr = addr_to_string(websocket.remote_address)
        logger.debug("New connection at %s from client at %s", path, client_addr)

        response = WebSocketMsg(client_addr)

        try:
            data = await websocket.recv()
            logger.debug("Received {:,}B at {}".format(len(data), path))
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
                    _ = ws_redis.set(user["id"], pickle.dumps(websocket, client_addr))
                    user["current_websocket_addr"] = client_addr
                    _ = redis.set(user["current_session_token"], json.dumps(user).encode())

                    response.status = 200
                    response.details = "success"
                    response.model = "user"
                    response.user_id = user["id"]
                    response.instance = user
        except Exception as err:
            logger.error("Websocket handle_client_redux_connection error: %s", str(err))
            response.status = 500
            response.details = str(err)

        msg = response.serialize()
        logger.info("%s", msg)
        await websocket.send(msg)


if __name__ == "__main__":

    host = os.environ["WEBSOCKET_HOST"]
    port = os.environ["WEBSOCKET_PORT"]

    server = websockets.serve(
        handle_client_redux_connection, host, port, ping_interval=20, extra_headers={"Grabbit-WS-Version": "1.0"}
    )

    loop = asyncio.get_event_loop()
    logger.info("Websocket server listening at ws://%s:%s", host, port)
    loop.run_until_complete(server)
    loop.run_forever()
