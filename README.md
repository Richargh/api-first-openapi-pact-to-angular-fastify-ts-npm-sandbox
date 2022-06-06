# Shared Dto via Codegen (Sandbox)

**Features**:

* Dtos and Apis generated from OpenApi (Swagger) Schema
* Frontend and Backend use generated Dtos, Frontend uses generated Api to access backend
* Frontend
  * TypeScript+Angular
* Backend
  * TypeScript+Fastify

## Usage

* Install packages `npm ci --workspaces`
* Run codegen to generate shared frontend/backend Dtos: `npm run codegen`
* Start backend: `npm run start --workspace backend`
* Start frontend: `npm run start --workspace frontend`
* Query the backend (port: 8080) via `scripts/api/getPosts.sh
* Open the frontend in the browser at: `localhost:4200`

## Codegen

* Additional properties for the _typescript fetch_ generator can be found [here](https://github.com/OpenAPITools/openapi-generator/blob/master/docs/generators/typescript-fetch.md)
