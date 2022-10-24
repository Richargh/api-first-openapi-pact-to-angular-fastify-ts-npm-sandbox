import {describe, it} from 'mocha';
import {Verifier} from "@pact-foundation/pact";
import * as path from "path";
import {FastifyInstance} from "fastify";
import {build} from "../../src/app";

const port = 10030;

describe('Verify Order API Pact', () => {
    let app: FastifyInstance;

    before(async function () {
        // longer timeout so fastify has time to start
        this.timeout(10_000);

        app = build();
        await app.listen(port);
    })

    after(async () => {
        await app.close();
    });

    describe('given there are posts', () => {
        describe('when a call to the API is made', () => {
            it('will receive the list of posts', async() => {
                // given
                const opts = {
                    provider: 'OrderApi',
                    providerBaseUrl: `http://localhost:10030`,
                    // providerStatesSetupUrl: `http://localhost:10030/setup`,
                    pactUrls: [
                        path.resolve(
                            process.cwd(),
                            'pacts/orderweb-orderapi.json'
                        ),
                    ],
                };

                // when
                const output = await new Verifier(opts).verifyProvider();

                // then
                console.log('Pact Verification Complete!')
                console.log(output)
            })
        })
    })
})
