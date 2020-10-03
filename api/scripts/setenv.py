import os
import argparse
import pathlib
from google.cloud import storage

if __name__ == "__main__":

    api_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    parser = argparse.ArgumentParser(description="set env vars for the project")
    parser.add_argument(
        "-k", "--key-file", help="google cloud storage keyfile to be used", required=True,
    )
    args = vars(parser.parse_args())

    os.environ["GOOGLE_STORAGE_API_JSON"] = args.get("k") or args.get("key_file")
    os.environ["DJANGO_SETTINGS_MODULE"] = "grabbit.settings.dev"

    print("exporting .envrc to .env.prod and uploading .env.prod to google storage")

    envrc = os.path.join(api_dir, ".envrc")
    secretdir = os.path.join(api_dir, "secrets")
    secretpath = pathlib.Path(secretdir)
    secretpath.mkdir(exist_ok=True)
    env = os.path.join(api_dir, ".env.prod")

    with open(envrc, "r") as reader:
        lines = reader.readlines()

        def filter_fn(name):
            return name != "" and name.startswith("export")

        lines = map(lambda line: line[7:], filter(filter_fn, lines))

        with open(env, "w") as writer:
            for line in lines:
                writer.write(line)

    oauth_creds_file = os.environ["GOOGLE_STORAGE_API_JSON"]
    client = storage.Client.from_service_account_json(oauth_creds_file)
    bucket = client.bucket(os.environ["GOOGLE_STORAGE_SECRET_BUCKET"])
    blob = bucket.blob(".env.prod")
    blob.upload_from_filename(env)
