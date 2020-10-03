import subprocess
import os

import httpx
from PIL import Image
from google.cloud import storage


GOOGLE_STORAGE_URL = "https://storage.googleapis.com"


class GoogleCloudService:
    @staticmethod
    def upload_asset_to_bucket(user_id, user_type, image_name, image_data):
        oauth_creds_file = os.environ["GOOGLE_STORAGE_API_JSON"]
        client = storage.Client.from_service_account_json(oauth_creds_file)

        bucket = client.get_bucket(os.environ["GOOGLE_STORAGE_DEFAULT_BUCKET"])
        path = user_type + str(user_id) + image_name

        blob = bucket.blob(path)
        blob.upload_from_string(image_data)

        return os.path.join(GOOGLE_STORAGE_URL, path)

    @staticmethod
    async def upload_asset_to_bucket_async(user_id, user_type, image_name, image_data):
        # https://cloud.google.com/storage/docs/json_api/v1/objects/insert
        proc = subprocess.Popen(
            [
                "gcloud",
                "auth",
                "print-access-token",
                # TODO: update this
                "cloud-storage@grabbit-1.iam.gserviceaccount.com",
            ],
            stdout=subprocess.PIPE,
        )
        service_key = proc.stdout.read().decode()[:-1]

        bucket = os.environ["GOOGLE_STORAGE_DEFAULT_BUCKET"]
        path = user_type + user_id + image_name

        async with httpx.AsyncClient() as client:
            response = await client.post(
                # TODO: verify this works
                f"https://storage.googleapis.com/upload/storage/v1/b/{bucket}/o?uploadType=multipart&name={path}",
                headers={"Authorization": f"Bearer {service_key}"},
                data=image_data.encode(),
            )
            return response.json()
