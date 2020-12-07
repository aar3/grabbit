from plaid import Client
from grabbit.config import config

PlaidClient = Client(client_id=config.PLAID.CLIENT_ID, secret=config.PLAID.CLIENT_SECRET, environment=config.PLAID.ENV)
