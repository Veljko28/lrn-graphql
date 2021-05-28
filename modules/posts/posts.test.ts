import {startServer} from '../../startServer';

beforeAll(() => {
    process.env.TEST_SERVER = 'true';
    startServer();
})


test("Create post", () => {
    return true;
})