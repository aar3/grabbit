#!/bin/bash

$(which redis-server) --port 6379 --daemonize yes
$(which redis-server) --port 6380 --daemonize yes