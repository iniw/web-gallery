#!/usr/bin/env bash

set -eu

dropdb "web-gallery"
createdb "web-gallery"
psql -U $(whoami) -d "web-gallery" -a -f spec.sql
