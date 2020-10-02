SOURCE = .
PWD = $(shell pwd)
REQUIREMENTS_DIR = $(PWD)/requirements

# pip requirements
CMD_PIP_OUTDATED = pip list --outdated --format=columns
CMD_PIP_UPDATE = $(CMD_PIP_OUTDATED) | tail -n +3 | cut -d' ' -f1 | xargs -r pip install --upgrade --trusted-host pypi.python.org
CMD_PIP_INSTALL_LOCK= pip install --upgrade -r $(REQUIREMENTS_DIR)/requirements.lock
CMD_PIP_INSTALL = $(foreach file, $(wildcard $(REQUIREMENTS_DIR)/*), pip install -r $(file) --trusted-host pypi.python.org;)
CMD_PIP_FREEZE = pip freeze > $(REQUIREMENTS_DIR)/requirements.lock

# code style, linting, and formatting
CMD_BLACK_FORMAT = find ./core -type f -name "*.py" | xargs black -l 120
CMD_PYLINT = find ./core -type f -name "*.py" | xargs pylint --rcfile $(SOURCE)/.pylintrc

# test suite
CMD_PYTEST = python -m pytest --cov=./ -s -v -rxs tests/*.py

# django migrations
CMD_DJANGO_SHOW_MIGRATIONS = ./manage.py showmigrations
CMD_DJANGO_MAKE_MIGRATIONS = ./manage.py makemigrations
CMD_DJANGO_MIGRATE = ./manage.py migrate

# start app locally
CMD_START_APP_DEV = cd . && gunicorn grabbit.wsgi:application -w 1 -b 0.0.0.0:8000 --reload --log-level DEBUG
CMD_START_APP_PROD = cd . && gunicorn grabbit.wsgi:application -w 2 -b 0.0.0.0:8000 --log-level DEBUG

# bootstrap environment
CMD_SOURCE_VIRTUAL_ENV = source $(SOURCE)/venv/bin/activate
CMD_CREATE_LOGS = mkdir -pv ./logs && touch ./logs/grabbit.log

# docker
CMD_DOCKER_BUILD_DEV = docker build -t ralston3/grabbit_api:dev-latest -f Dockerfile.dev .
CMD_DOCKER_BUILD_PROD = docker build -t ralston3/grabbit_api:prod-latest -f Dockerfile.prod .
CMD_DOCKER_CLEAN_ALL = docker image prune && docker volume prune && docker container stop $(docker ps -aq) && docker container rm $(docker ps -aq)
CMD_DOCKER_PUSH_DEV = docker push ralston3/grabbit_api:dev-latest
CMD_DOCKER_PUSH_PROD = docker push ralston3/grabbit_api:prod-latest
CMD_DOCKER_START_DEV = docker-compose -f docker-compose.dev.yml up
CMD_DOCKER_START_PROD = docker-compose -f docker-compose.prod.yml up
CMD_DOCKER_STOP_DEV = docker-compose -f docker-compose.dev.yml down -v
CMD_DOCKER_STOP_PROD = docker-compose -f docker-compose.prod.yml down -v
CMD_DOCKER_START_CI = docker-compose -f docker-compose.ci.yml up
CMD_DOCKER_STOP_CI = docker-compose -f docker-compose.ci.yml down -v


.PHONY: format \
lint \
migrate \
test \
install \
install_lock \
freeze \
start_dev \
start_prod \
show_migrations \
create_logs \
bootstrap_env \
docker_build_dev \
docker_build_prod \
docker_clean_all \
docker_push_prod \
docker_push_dev \
docker_start_dev \
docker_start_prod \
docker_start_ci \
docker_stop_dev \
docker_stop_prod \
docker_stop_ci


APPS = core


format:
	$(CMD_BLACK_FORMAT)

lint: format
	$(foreach dir,$(SOURCE),cd $(dir); $(CMD_PYLINT))

make_migrations:
	$(CMD_DJANGO_MAKE_MIGRATIONS) && $(CMD_DJANGO_SHOW_MIGRATIONS)

migrate: make_migrations
	$(foreach app,$(APPS), $(CMD_DJANGO_MIGRATE) $(app);)

test: lint migrate
	# TODO: foreach this instead of doing each app individually
	cd ./core && $(CMD_PYTEST)

install:
	$(CMD_PIP_INSTALL)

install_lock:
	$(CMD_PIP_INSTALL_LOCK)

freeze:
	$(CMD_PIP_FREEZE)

start_dev: create_logs install_lock migrate
	$(CMD_START_APP_DEV)

start_prod: create_logs install_lock migrate
	$(CMD_START_APP_PROD)

show_migrations:
	$(CMD_DJANGO_SHOW_MIGRATIONS)

create_logs:
	$(CMD_CREATE_LOGS)

bootstrap_env:
	$(CMD_SOURCE_VIRTUAL_ENV) && $(CMD_PIP_INSTALL_LOCK)

docker_build_dev:
	$(CMD_DOCKER_BUILD_DEV)

docker_build_prod:
	$(CMD_DOCKER_BUILD_PROD)

docker_clean_all:
	$(CMD_DOCKER_CLEAN_ALL)

docker_push_dev: docker_build_dev
	$(CMD_DOCKER_PUSH_DEV)

docker_push_prod: docker_build_prod
	$(CMD_DOCKER_PUSH_PROD)

# docker start/stop commands require you to be in the directory of the docker-compose file
docker_start_dev:
	$(CMD_DOCKER_START_DEV)

docker_start_prod:
	$(CMD_DOCKER_START_PROD)

docker_stop_dev:
	$(CMD_DOCKER_STOP_DEV)

docker_stop_prod:
	$(CMD_DOCKER_STOP_PROD)

docker_start_ci:
	$(CMD_DOCKER_START_CI)

docker_stop_ci:
	$(CMD_DOCKER_STOP_CI)