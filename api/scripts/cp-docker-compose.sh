#!/bin/bash

set -e 

echo "scp -i ~/.ssh/ubuntuv1_rsa docker-compose.prod.yml rashad.a.alston@api.grabbithq.com:/usr/local/grabbit/docker-compose.prod.yml"
scp -i ~/.ssh/ubuntuv1_rsa docker-compose.prod.yml rashad.a.alston@api.grabbithq.com:/usr/local/grabbit/docker-compose.prod.yml
