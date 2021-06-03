import {startServer} from '../startServer';
// import {request} from 'graphql-request';
// import 'regenerator-runtime/runtime';

beforeAll( () => {
    process.env.TEST_SERVER = 'true';
})


test("Create post", async () => {
    await startServer();
    expect(2).toBe(2);
})