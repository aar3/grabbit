APP_NAME  = grabbit
SOURCE = .
PWD = $(shell pwd)
REQUIREMENTS_DIR = $(PWD)/requirements

# pip requirements
CMD_PIP_OUTDATED = pip list --outdated --format=columns
CMD_PIP_UPDATE = $(CMD_PIP_OUTDATED) | tail -n +3 | cut -d' ' -f1 | xargs -r pip install --upgrade --trusted-host pypi.python.org
CMD_PIP_INSTALL_LOCK= python -m pip install -r $(REQUIREMENTS_DIR)/requirements.lock --trusted-host pypi.python.org
CMD_PIP_INSTALL = $(foreach file, $(wildcard $(REQUIREMENTS_DIR)/*), pip install -r $(file) --trusted-host pypi.python.org;)
CMD_PIP_FREEZE = pip freeze > $(REQUIREMENTS_DIR)/requirements.lock

# code style, linting, and formatting
CMD_BLACK_FORMAT = find . -type d -path ./venv -prune -false -o -name "*.py" | xargs black -l 120
CMD_PYLINT = find . -type d -path ./venv -prune -false -o -name "*.py" | xargs pylint --rcfile $(SOURCE)/.pylintrc

# test suite
CMD_PYTEST = python -m pytest --cov=./ -s -v -rxs tests/*.py

# django migrations
CMD_DJANGO_SHOW_MIGRATIONS = ./manage.py showmigrations
CMD_DJANGO_MAKE_MIGRATIONS = ./manage.py makemigrations
CMD_DJANGO_MIGRATE = ./manage.py migrate

# start app locally
CMD_START_APP_DEV = cd . && gunicorn $(APP_NAME).wsgi:application --workers=3 -b 0.0.0.0:8000 --reload --log-level DEBUG --worker-class=gevent  --timeout=120 --worker-connections=1000
CMD_START_APP_PROD = cd . && gunicorn $(APP_NAME).wsgi:application -w 2 -b 0.0.0.0:8000 --log-level DEBUG

# bootstrap environment
CMD_SOURCE_VIRTUAL_ENV = source $(SOURCE)/venv/bin/activate
CMD_CREATE_LOGS = mkdir -pv ./logs && touch ./logs/$(APP_NAME).log

# docker
CMD_DOCKER_BUILD_DEV = docker build -t ralston3/$(APP_NAME)_api:dev-latest -f Dockerfile.dev .
CMD_DOCKER_BUILD_PROD = docker build -t ralston3/$(APP_NAME)_api:prod-latest -f Dockerfile.prod .
CMD_DOCKER_CLEAN_ALL = docker image prune && docker volume prune && docker container stop $(docker ps -aq) && docker container rm $(docker ps -aq)
CMD_DOCKER_PUSH_DEV = docker push ralston3/$(APP_NAME)_api:dev-latest
CMD_DOCKER_PUSH_PROD = docker push ralston3/$(APP_NAME)_api:prod-latest
CMD_DOCKER_START_DEV = docker-compose -f docker-compose.dev.yml up
CMD_DOCKER_START_PROD = docker-compose -f docker-compose.prod.yml up
CMD_DOCKER_STOP_DEV = docker-compose -f docker-compose.dev.yml down -v
CMD_DOCKER_STOP_PROD = docker-compose -f docker-compose.prod.yml down -v
CMD_DOCKER_START_CI = docker-compose -f docker-compose.ci.yml up
CMD_DOCKER_STOP_CI = docker-compose -f docker-compose.ci.yml down -v

CMD_CELERY_START = celery -A lib.celery worker -l INFO --without-gossip
CMD_START_FLOWER = celery flower -A lib.celery --address=127.0.0.1 --port=5555

.PHONY: format \
celery \
flower \
freeze \
install \
installock \
lint \
migrate \
dev \
prod \
test


APPS = user plaid_local deal analytics scraper


format:
	$(CMD_BLACK_FORMAT)

lint: format
	$(foreach dir,$(SOURCE),cd $(dir); $(CMD_PYLINT))

migrate: make_migrations
	$(foreach app,$(APPS), $(CMD_DJANGO_MIGRATE) $(app);)

test: lint migrate
	$(foreach app,$(APPS), $(CMD_PYTEST);)

install:
	$(CMD_PIP_INSTALL)

installock:
	$(CMD_PIP_INSTALL_LOCK)

freeze:
	$(CMD_PIP_FREEZE)

dev: create_logs install_lock migrate
	$(CMD_START_APP_DEV)

prod: create_logs install_lock migrate
	$(CMD_START_APP_PROD)

flower:
	$(CMD_START_FLOWER)

celery:
	$(CMD_CELERY_START)
	