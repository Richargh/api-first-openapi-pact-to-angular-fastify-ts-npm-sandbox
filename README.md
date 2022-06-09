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

## Requires

* Node 18, because it provides global fetch API
  * Use [nvm](https://github.com/nvm-sh/nvm) to `nvm use 18`

## Usage

### Dto & Api Generation

* Install packages `npm ci --workspaces`
* Run codegen to generate shared frontend/backend Dtos: `npm run codegen`
* Start backend: `npm run start --workspace backend`
* Start frontend: `npm run start --workspace frontend`
* Query the backend (port: 8080) via `scripts/api/getPosts.sh
* Open the frontend in the browser at: `localhost:4200`

### Pacts

* Create the pact by defining it on the consumer side (`cd frontend`) and then calling `npm run test:consumer`
* The pact that the consumer expects will be saved to `backend/pacts`
* Verify the pact on the provider side (`cd backend`), by writing a new test that reads the pact and then calling `npm run test:provider`.

## Codegen

* Additional properties for the _typescript fetch_ generator can be found [here](https://github.com/OpenAPITools/openapi-generator/blob/master/docs/generators/typescript-fetch.md)

## References

* If you are interested in pact, check out [Contract testing with PactJS and Jest](https://medium.com/@jw_ng/contract-testing-with-pactjs-and-jest-f93c1ffe75a0) which helped me to get started.
