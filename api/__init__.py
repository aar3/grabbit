import sys
import logging
import pathlib
import os
import stat

from google.cloud import storage

logger = logging.getLogger("gunicorn.error")

# pylint: disable=redefined-outer-name
def download_app_secrets(rootdir):
    logger.info("attempting to download application secrets from google cloud....")

    envvars = {
        "gcloud-compute.json": "GOOGLE_COMPUTE_API_JSON",
    }

    client = storage.Client.from_service_account_json(os.environ["GOOGLE_STORAGE_API_JSON"])
    bucket = client.bucket(os.environ["GOOGLE_STORAGE_SECRET_BUCKET"])
    secretdir = os.path.join(rootdir, "secrets")

    pathlib.Path(secretdir).mkdir(exist_ok=True)

    for filename, envvar in envvars.items():
        blob = bucket.blob(filename)
        path = os.path.join(secretdir, filename)
        if not pathlib.Path(path).exists():
            logger.info("secret %s not found.....downloading from cloud store...", path)
            blob.download_to_filename(path)

        if filename == "client-key.pem":
            os.chmod(path, stat.S_IREAD)

        if envvar:
            os.environ[envvar] = path

    logger.info("downloading app secrets finished")


api_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

if not api_dir in sys.path:
    sys.path.insert(0, api_dir)

rootdir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
download_app_secrets(rootdir)
