#!/bin/bash

# https://stackoverflow.com/a/29307816/4701228
ps auxww | grep 'celery worker' | awk '{print $2}' | xargs kill -9