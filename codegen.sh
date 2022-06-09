#!/usr/bin/env bash

rm -rf generated/api
mkdir -p generated/api

npx openapi-generator-cli generate

cd generated/api || exit
npm run build
cd ../..
