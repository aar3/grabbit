#!/bin/bash

celery multi restart w1 -A lib.celery worker -l INFO --without-gossip