SOURCE = .
PROJECT = $(SOURCE)/grabbit

PWD = $(shell pwd)

PYTEST_ARG = $(PWD)/

REQUIREMENTS_DIR=$(PWD)/requirements

CMD_PIP_OUTDATED = pip list --outdated --format=columns
CMD_PIP_UPDATE = $(CMD_PIP_OUTDATED) | tail -n +3 | cut -d' ' -f1 | xargs \
-r pip install --upgrade --trusted-host pypi.python.org
CMD_PIP_INSTALL_LOCK= pip install --upgrade -r $(REQUIREMENTS_DIR)/requirements.lock
CMD_PIP_INSTALL = $(foreach file, $(wildcard $(REQUIREMENTS_DIR)/*), pip install -r $(file) --trusted-host pypi.python.org;)
CMD_PIP_FREEZE = pip freeze > $(REQUIREMENTS_DIR)/requirements.lock

CMD_BLACK_FORMAT = find $(PROJECT) -type f -name "*.py" | xargs black
CMD_PYLINT = find $(PROJECT) -type f -name "*.py" | xargs pylint --rcfile $(SOURCE)/.pylintrc
CMD_PYTEST = python -m pytest --cov=./ -s -v -rxs tests/*.py

CMD_DJANGO_SHOW_MIGRATIONS = $(PROJECT)/manage.py showmigrations
CMD_DJANGO_MAKE_MIGRATIONS = $(PROJECT)/manage.py makemigrations
CMD_DJANGO_MIGRATE = $(PROJECT)/manage.py migrate

CMD_CREATE_LOGS = mkdir $(PROJECT)/logs && touch $(PROJECT)/logs/grabbit.log

CMD_START_APP_DEV = cd $(PROJECT) && gunicorn grabbit.wsgi:application \
	-w 2 -b 127.0.0.1:8000 --reload --log-level DEBUG

CMD_START_APP_PROD = cd $(PROJECT) && gunicorn grabbit.wsgi:application \
	-w 2 -b 0.0.0.0:8000 --log-level DEBUG


.PHONY: format lint migrate test install install_lock freeze start_dev start_prod show_migrations create_logs create_db


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

start_dev: migrate
	$(CMD_START_APP_DEV)

start_prod: migrate
	$(CMD_START_APP_PROD)

show_migrations:
	$(CMD_DJANGO_SHOW_MIGRATIONS)

create_logs:
	$(CMD_CREATE_LOGS)

create_db:
	createdb -U postgres grabbit_dev
