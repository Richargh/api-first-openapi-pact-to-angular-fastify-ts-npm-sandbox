# Api First Angular + Fastify App (Sandbox)

**Features**:

* **Api First:** Dtos and Apis generated from OpenApi (Swagger) Schema, not Schema written after implementation
    * Frontend and Backend use generated Dtos to communicate
    * Frontend uses generated Api to access backend
* **Pact**
    * Keep Backend and Frontend in sync with pacts that ensure the frontend expectations are fulfilled by the backend
    * You don't need the Api First approach to use Pact, but it's a nice combination to use
* Frontend
    * TypeScript+Angular
* Backend
  * TypeScript+Fastify

## Requires

* Node 18, because it provides global fetch API
    * Use [nvm](https://github.com/nvm-sh/nvm) to `nvm use 18`

## Usage

### Before All

* Install packages `npm ci`
* Run codegen to generate shared frontend/backend Dtos: `npm run codegen`
* The generated Dtos are in the folder [generated/api](generated/api)
* Install frontend packages `cd frontend && npm ci`
* Install backend packages `cd backend && npm ci`

## Codegen

* Additional properties for the _typescript fetch_ generator can be
  found [here](https://github.com/OpenAPITools/openapi-generator/blob/master/docs/generators/typescript-fetch.md)

### Start Frontend and Backend

* Start backend: `npm run start --workspace backend`
* Start frontend: `npm run start --workspace frontend`
* Query the backend (port: 8080) via `scripts/api/getPosts.sh
* Open the frontend in the browser at: `localhost:4200`

### Pacts

* If needed, write a new test in [frontend/tests/consumer](frontend/tests/consumer)
* Generate all pacts that the frontend consumer expects in a language-independent format in by going to the
  frontend (`cd frontend`) and then calling `npm run test:consumer`
    * If the consumer tests cannot be started because something is occupying the port, then the pact server did not shut
      down appropriately
    * Find the process id that is creating the problem (MacOs): `lsof -nP -iTCP -sTCP:LISTEN | grep 10030`
    * The second value of the result is the process id (pid), which you can kill via `kill <pid>`
* The pact that the consumer expects will be saved to `backend/pacts`
* Verify the pact on the provider side (`cd backend`), by writing a new test that reads the pact and then
  calling `npm run test:provider`.

## References

* If you are interested in pact, check out [Contract testing with PactJS and Jest](https://medium.com/@jw_ng/contract-testing-with-pactjs-and-jest-f93c1ffe75a0) which helped me to get started.
