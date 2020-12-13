#!/bin/bash

celery flower -A lib.tasks --address=127.0.0.1 --port=5555
