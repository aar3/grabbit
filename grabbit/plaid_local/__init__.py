from plaid import Client
from django.conf import settings

PlaidClient = Client(
    client_id=settings.PLAID_CLIENT_ID, secret=settings.PLAID_CLIENT_SECRET, environment=settings.PLAID_ENV
)
