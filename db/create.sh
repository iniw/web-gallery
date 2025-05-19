#!/usr/bin/env bash

mkdir pgdata/
initdb pgdata/
pg_ctl -D pgdata/ start
dropdb "web-gallery"
createdb "web-gallery"
psql -U $(whoami) -d "web-gallery" -a -f spec.sql
