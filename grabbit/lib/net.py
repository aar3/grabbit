import asyncio
import json
import os
import logging
import collections
import django
from asgiref.sync import sync_to_async
import websockets
from lib.local_redis import Redis
from lib.utils import addr_to_string

django.setup()

from user.models import User

handler = logging.StreamHandler()
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
handler.setFormatter(formatter)
logger = logging.getLogger("websockets")
logger.addHandler(handler)
logger.setLevel(logging.INFO)

INIT_HANDSHAKE_TOKEN = "XXX"


@sync_to_async
def save_user_websocket_addr(user_id, client_addr):
    instance = User.objects.get(pk=user_id)
    instance.current_websocket_addr = client_addr
    instance.save()


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


class WebSocketRouter:
    def __init__(self):
        self.connections = collections.OrderedDict()

    def register(self, addr, websocket):
        logger.info("Registering new client at %s", addr)
        self.connections[addr] = websocket

    def remove(self, addr):
        if addr in self:
            logger.info("Removing client at %s", addr)
            del self.connections[addr]

    def __contains__(self, addr):
        return addr in self.connections


router = WebSocketRouter()

"""
1. get instance
2. build payload
3. get active websocket for this user
4. using this websocket, send data to client using protocol message
5. Done

@reciever(senderpost_save)
def do_something_in_hook(sendder=Model, instance, *args, **kwargs):
    user = get_current_active_user()
    payload = build_protocol_message(instance, user)
    ws = WebsocketManager.get_socket_for(user)
    loop.run_until_complete(ws.send(payload))
"""


async def handle_client_redux_connection(websocket, path):
    while True:
        client_addr = addr_to_string(websocket.remote_address)
        logger.debug("New connection at %s from client at %s", path, client_addr)

        if not client_addr in router:
            router.register(client_addr, websocket)

        response = WebSocketMsg(client_addr)

        try:
            data = await websocket.recv()
            logger.debug("Received {:,}B at {}".format(len(data), path))
            data = json.loads(data)
            token = data["current_session_token"]

            if token == INIT_HANDSHAKE_TOKEN:
                response.status = 200
                response.details = "Websocket handshake success"
            else:
                user = Redis.get(token)
                if not user:
                    response.status = 403
                    response.details = "No token"
                else:
                    user = json.loads(user.decode())
                    # NOTE: since the anonymous INIT_HANDSHAKE_TOKEN is passed when the client websocket
                    # connects, we'll need to check for an existing websocket on subsequent connections.
                    # This `instance.current_websocket_addr = client_addr` should only happen once, since
                    # after the user instance is saved here, the cache for that user entry is busted
                    if not user.get("current_websocket_address"):
                        logger.info("Assigning a new websocket to user via %s", client_addr)
                        # instance = User.objects.get(pk=user["id"])
                        # instance.current_websocket_addr = client_addr
                        # instance.save()
                        await save_user_websocket_addr(user["id"], client_addr)

                    response.status = 200
                    response.details = "Operation successfull"
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
