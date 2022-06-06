import {build} from "../../src/app";
import {expect} from "chai";

describe("/Posts", () => {
    it('posts is not empty', async () => {
        // given
        const app = build()

        // when
        const response = await app.inject({
            method: 'GET',
            url: '/posts'
        })

        // then
        expect(response.statusCode).to.eq(200);
    })
})
