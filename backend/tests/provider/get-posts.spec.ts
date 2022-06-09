import {describe, it} from 'mocha';
import {Verifier} from "@pact-foundation/pact";
import * as path from "path";
import {FastifyInstance} from "fastify";
import {build} from "../../src/app";

describe('Verify Order API Pact', () => {
    let app: FastifyInstance;

    before(async () => {
        app = build();
        await app.listen(10030);
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
