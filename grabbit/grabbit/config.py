import os


class config:
    NAME = "grabbit v1"
    IP = os.environ["IP"]
    PORT = os.environ["PORT"]
    CELERY_BROKER = os.environ["CELERY_BROKER_URL"]
    CELERY_RESULT_BACKEND = os.environ["CELERY_RESULT_BACKEND"]

    class PLAID:
        CLIENT_ID = os.environ["PLAID_CLIENT_ID"]
        CLIENT_SECRET = os.environ["PLAID_SECRET"]
        ENV = os.environ["PLAID_ENV"]
