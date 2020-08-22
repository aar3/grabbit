SOURCE = .
PWD = $(shell pwd)
PROJECT = $(SOURCE)/grabbit
REQUIREMENTS_DIR = $(PWD)/requirements

# pip requirements
CMD_PIP_OUTDATED = pip list --outdated --format=columns
CMD_PIP_UPDATE = $(CMD_PIP_OUTDATED) | tail -n +3 | cut -d' ' -f1 | xargs -r pip install --upgrade --trusted-host pypi.python.org
CMD_PIP_INSTALL_LOCK= pip install --upgrade -r $(REQUIREMENTS_DIR)/requirements.lock
CMD_PIP_INSTALL = $(foreach file, $(wildcard $(REQUIREMENTS_DIR)/*), pip install -r $(file) --trusted-host pypi.python.org;)
CMD_PIP_FREEZE = pip freeze > $(REQUIREMENTS_DIR)/requirements.lock

# code style, linting, and formatting
CMD_BLACK_FORMAT = find $(PROJECT) -type f -name "*.py" | xargs black
CMD_PYLINT = find $(PROJECT) -type f -name "*.py" | xargs pylint --rcfile $(SOURCE)/.pylintrc

# test suite
CMD_PYTEST = python -m pytest --cov=./ -s -v -rxs tests/*.py

# django migrations
CMD_DJANGO_SHOW_MIGRATIONS = $(PROJECT)/manage.py showmigrations
CMD_DJANGO_MAKE_MIGRATIONS = $(PROJECT)/manage.py makemigrations
CMD_DJANGO_MIGRATE = $(PROJECT)/manage.py migrate

# start app
CMD_START_APP_DEV = cd $(PROJECT) && gunicorn grabbit.wsgi:application -w 2 -b 0.0.0.0:8000 --reload --log-level DEBUG
CMD_START_APP_PROD = cd $(PROJECT) && gunicorn grabbit.wsgi:application -w 2 -b 0.0.0.0:8000 --log-level DEBUG

# bootstrap environment
CMD_MAKE_VIRTUAL_ENV = /usr/local/bin/python3.8 -m venv $(SOURCE)/venv
CMD_SOURCE_VIRTUAL_ENV = source $(SOURCE)/venv/bin/activate
CMD_CREATE_LOGS = mkdir -pv $(PROJECT)/logs && touch $(PROJECT)/logs/grabbit.log


.PHONY: format \
lint \
migrate \
test \
install \
install_lock \
freeze start_dev \
start_prod \
show_migrations \
create_logs \
venv \
bootstrap_env


APPS = partners


format:
	$(CMD_BLACK_FORMAT)

lint: format
	$(foreach dir,$(SOURCE),cd $(dir); $(CMD_PYLINT))

make_migrations:
	$(CMD_DJANGO_MAKE_MIGRATIONS) && $(CMD_DJANGO_SHOW_MIGRATIONS)

migrate: make_migrations
	$(foreach app,$(APPS), $(CMD_DJANGO_MIGRATE) $(app);)

test: lint migrate
	$(foreach app,$(merchant broker),cd $(PWD)/grabbit/$(app); $(CMD_PYTEST))

install:
	$(CMD_PIP_INSTALL)

install_lock:
	$(CMD_PIP_INSTALL_LOCK)

freeze:
	$(CMD_PIP_FREEZE)

start_dev: migrate create_logs
	$(CMD_START_APP_DEV)

start_prod: migrate create_logs
	$(CMD_START_APP_PROD)

show_migrations:
	$(CMD_DJANGO_SHOW_MIGRATIONS)

create_logs:
	$(CMD_CREATE_LOGS)

venv:
	$(CMD_MAKE_VIRTUAL_ENV)

bootstrap_env: venv
	$(CMD_SOURCE_VIRTUAL_ENV) && $(CMD_PIP_INSTALL_LOCK)
