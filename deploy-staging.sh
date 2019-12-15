#!/usr/bin/bash

cd /home/dev_root/www/smartfit-v2/stage/frontend

git status

git checkout .
git checkout staging
git pull

npm run build
