import asyncio
import json
import os
import logging
import collections
import websockets
import django
from lib.local_redis import DefaultRedis
from lib.utils import addr_to_string

django.setup()

handler = logging.StreamHandler()
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
handler.setFormatter(formatter)
logger = logging.getLogger("websockets")
logger.addHandler(handler)
logger.setLevel(logging.INFO)


INIT_HANDSHAKE_TOKEN = "XXX"


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


async def handle_connection(websocket, path):
    while True:
        client_addr = addr_to_string(websocket.remote_address)
        logger.debug("New connection at %s from client at %s", path, client_addr)
        router = WebSocketRouter()
        if not websocket in router:
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
                user = DefaultRedis.get(token)
                if not user:
                    response.status = 403
                    response.details = "No token"
                else:
                    user = json.loads(user.decode())
                    response.status = 200
                    response.details = "Operation successfull"
                    response.model = "user"
                    response.user_id = user["id"]
                    response.instance = user

        except Exception as err:
            logger.error("Websocket handle_connection error: %s", str(err))
            response.status = 500
            response.details = str(err)

        msg = response.serialize()
        logger.info("%s", msg)
        await websocket.send(msg)


if __name__ == "__main__":

    host = os.environ["WEBSOCKET_HOST"]
    port = os.environ["WEBSOCKET_PORT"]

    server = websockets.serve(
        handle_connection, host, port, ping_interval=20, extra_headers={"Grabbit-WS-Version": "1.0"}
    )

    loop = asyncio.get_event_loop()
    logger.info("Websocket server listening at ws://%s:%s", host, port)
    loop.run_until_complete(server)
    loop.run_forever()
