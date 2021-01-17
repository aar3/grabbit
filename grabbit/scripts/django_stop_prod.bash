#!/bin/bash

PROCS=( `ps -u $(whoami) | grep 'gunicorn' | awk {'print$2'}` )

for PROC in ${PROCS[@]}; do
    echo "Killing gunicorn at $PROC"
    kill -9 $PROC
done

