#!/bin/bash

DATE=$(date '+%Y%m%d')

pg_dump -U postgres -d $1 > "db/${1}.${DATE}.sql"