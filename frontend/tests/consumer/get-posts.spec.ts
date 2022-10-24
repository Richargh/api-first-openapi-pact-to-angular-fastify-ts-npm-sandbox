import {describe, it} from 'mocha';
import {expect} from "chai";
import {Pact} from "@pact-foundation/pact";
import * as path from "path";
import {eachLike, somethingLike} from "@pact-foundation/pact/src/dsl/matchers";
import {Configuration, PostsApi} from '../../../generated/api/dist/';

// Setup Pact
const port = 10030;
const provider = new Pact({
    port: port,
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    dir: path.resolve(process.cwd(), "../backend/pacts"),
    consumer: "OrderWeb",
    provider: "OrderApi"
});

describe('Pact with Order API', () => {
    before(async function () {
        // longer timeout so provider has time to start
        this.timeout(10_000);
        await provider.setup();
    });

    after(async () => {
        // finalize the contract after the tests have run, i.e. store c
        await provider.finalize();
    });

    afterEach(async () => {
        // verify interaction (and clear them) after each test has run
        await provider.verify();
    });

    describe('given there are posts', () => {
        describe('when a call to the API is made', () => {
            before(async () => {
                await provider.addInteraction({
                    state: 'there are posts',
                    uponReceiving: 'a request for posts',
                    withRequest: {
                        path: '/posts',
                        method: 'GET',
                    },
                    willRespondWith: {
                        body: {
                            items: eachLike(
                                {
                                    "id": somethingLike("1"),
                                    "createdBy": somethingLike("1-2-3"),
                                    "title": somethingLike("Will there be a party at craigs")
                                }
                                ),
                            links: {
                            },
                        },
                        status: 200,
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                        },
                    },
                })
            })

            it('will receive the list of posts', async() => {
                // given
                const postsApi = new PostsApi(new Configuration({
                    basePath: `http://127.0.0.1:${port}`
                }));
                // when
                const posts = await postsApi.getPosts();
                // then
                expect(posts.items).to.have.deep.members([
                    {id: '1', createdBy: '1-2-3', title: 'Will there be a party at craigs'}
                ]);
            })
        })
    })
})
