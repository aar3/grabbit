#!/bin/bash

cd ../grabbit

for PORT in 8000 8001 8002; do
    gunicorn grabbit.wsgi:application \
    --workers=3 \
    -b $IP:$PORT \
    --log-level INFO \
    --worker-class=gevent \
    --timeout=120 \
    --worker-connections=1000 &
done


