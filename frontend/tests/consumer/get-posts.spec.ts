import {describe, it} from 'mocha';
import {expect} from "chai";
import {Pact} from "@pact-foundation/pact";
import * as path from "path";
import {eachLike} from "@pact-foundation/pact/src/dsl/matchers";
import {Configuration, PostsApi } from '../../../generated/api/dist/';

// Setup Pact
const port = 10030;
const provider = new Pact({
    port: port,
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    consumer: "OrderWeb",
    provider: "OrderApi"
});

describe('Pact with Order API', () => {
    before(async () => {
        await provider.setup();
    })

    after(() => {
        // finalize the contract after the tests have run, i.e. store c
        provider.finalize();
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
                            items: eachLike({
                                id: '111-222',
                                createdBy: 'aaa-bbb',
                                title: 'Party at Craigs'
                            }),
                            links: {
                                next: `http://127.0.0.1:${port}/posts?createdAfterId=1`
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
                expect(posts.items).to.have.deep.members([{id: '111-222', createdBy: 'aaa-bbb', title: 'Party at Craigs'}]);
            })
        })
    })
})
