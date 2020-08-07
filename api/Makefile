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

CMD_DJANGO_MAKE_MIGRATIONS = $(PROJECT)/manage.py makemigrations
CMD_DJANGO_MIGRATE = $(PROJECT)/manage.py migrate


.PHONY: format lint migrate test install installock freeze


format:
	$(CMD_BLACK_FORMAT)

lint: format
	$(foreach dir,$(SOURCE),cd $(dir); $(CMD_PYLINT))

make_migrations:
	$(CMD_DJANGO_MAKE_MIGRATIONS)

migrate: make_migrations
	$(foreach app,$(merchant grabber),$(CMD_DJANGO_MIGRATE) $(app))

test: lint migrate
	$(foreach app,$(merchant grabber),cd $(PWD)/grabbit/$(app); $(CMD_PYTEST))

install:
	$(CMD_PIP_INSTALL)

installock:
	$(CMD_PIP_INSTALL_LOCK)

freeze:
	$(CMD_PIP_FREEZE)