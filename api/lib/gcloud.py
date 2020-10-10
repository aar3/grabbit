import os

from google.cloud import storage


GOOGLE_STORAGE_URL = "https://storage.googleapis.com"


class GoogleCloudService:
    @staticmethod
    def upload_asset_to_bucket(user_email, user_type, image_name, image_data):
        # https://googleapis.dev/python/storage/1.16.1/blobs.html
        oauth_creds_file = os.environ["GOOGLE_STORAGE_API_JSON"]
        client = storage.Client.from_service_account_json(oauth_creds_file)

        bucket = client.get_bucket(os.environ["GOOGLE_STORAGE_DEFAULT_BUCKET"])
        path = os.path.join(user_type, user_email, image_name)

        blob = bucket.blob(path)
        blob.upload_from_string(image_data)
        blob.acl.all().grant_read()
        blob.acl.save()

        return os.path.join(GOOGLE_STORAGE_URL, os.environ["GOOGLE_STORAGE_DEFAULT_BUCKET"], path)
