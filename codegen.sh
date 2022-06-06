#!/usr/bin/env bash 

rm -rf generated/api
mkdir -p generated/api

npx openapi-generator-cli generate

#rm generated/api/index.ts
#rm generated/api/runtime.ts