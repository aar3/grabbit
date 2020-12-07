import datetime as dt
from lib.const import PLAID_DATE_FORMAT
from lib.tasks import task_manager
from plaid_local.models import Link, TransactionTask, Transaction
from plaid_local import PlaidClient
from user.models import User


def process_transaction_payload(user, transaction):
    amount = transaction["amount"]
    account_id = transaction["account_id"]
    category = transaction["category"]
    date = transaction["date"]
    location = transaction["location"]
    merchant_name = transaction["merchant_name"]
    payment_channel = transaction["payment_channel"]
    payment_meta = transaction["payment_meta"]
    pending = transaction["pending"]
    transaction_id = transaction["transaction_id"]

    Transaction.objects.create(
        user=user,
        amount=amount,
        account_id=account_id,
        category=category,
        date=date,
        location=location,
        merchant_name=merchant_name,
        payment_channel=payment_channel,
        payment_meta=payment_meta,
        pending=pending,
        transaction_id=transaction_id,
    )

    return True


@task_manager.task
def scrape_transactions_for_user(user_id, start_date, end_date):
    user = User.objects.get(pk=user_id)
    user_links = Link.objects.filter(user__id=user_id).order_by("-created_at")
    if len(user_links) == 0:
        raise Exception("User {} has no active Link".format(user_id))

    link = user_links[0]
    did_complete = None

    user_tasks = TransactionTask.objects.filter(user__id=user_id).order_by("-created_at")
    if len(user_tasks) > 0:
        last_task = user_tasks[0]
        start_date = last_task.created_at
        end_date = start_date + dt.timedelta(days=1)

    start_date_str = start_date.strftime(PLAID_DATE_FORMAT)
    end_date_str = end_date.strftime(PLAID_DATE_FORMAT)

    try:
        response = PlaidClient.Transactions.get(link.access_token, start_date_str, end_date_str)
        did_complete = True
        results = list(map(lambda t: process_transaction_payload(user, t), response["transactions"]))
        assert all(results)
    except Exception as err:
        print("Could not fetch user %i transactions: %s", user_id, str(err))
        did_complete = False

    TransactionTask.objects.create(user=user, did_complete=did_complete)
    return did_complete
