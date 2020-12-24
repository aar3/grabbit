#!/bin/bash

celery -A lib.tasks worker -l INFO --without-gossip
