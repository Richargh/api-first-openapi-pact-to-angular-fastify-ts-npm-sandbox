# Api First Angular + Fastify App (Sandbox)

**Features**:

* **Api First:** Dtos and Apis generated from OpenApi (Swagger) Schema, not Schema written after implementation
  * Frontend and Backend use generated Dtos to communicate
  * Frontend uses generated Api to access backend
* Npm Workspaces
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
