#!/bin/bash

rootdir=$(pwd)
www="$rootdir/www/grabbit/package.json"
ios="$rootdir/mobile/grabbit/package.json"

for file in $www $ios; do
    matches=$(cat $file | grep '^*' | wc -l)
    if [ -z $matches ] || [ $matches -eq 0 ]; then
        echo "All package versions look to be exact in $file"
        continue
    fi
    echo "Found $matches packages that did not have exact versions in $file"
done
