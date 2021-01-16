#!/bin/bash

$(which redis-server) --port 6379 --daemonize yes
$(which redis-server) --port 6380 --daemonize yes
$(which redis-server) --port 6381 --daemonize yes

ps -u $(whoami) | grep 'redis-server'