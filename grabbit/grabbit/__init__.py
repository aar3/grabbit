import logging
import os

handler = logging.StreamHandler()
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
handler.setFormatter(formatter)
logger = logging.getLogger("gunicorn")
logger.addHandler(handler)
logger.setLevel(logging.DEBUG)
