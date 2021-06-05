import {startServer} from '../startServer';
import {request} from 'graphql-request';
import { host } from '../constants';
import { User } from '../models/User';
import 'regenerator-runtime/runtime';

beforeAll( () => {
    process.env.TEST_SERVER = 'true';
})

const email = "test@gmail.com";
const password = "testpass123";


const mutation = `
mutation {
    register(info: {
      email: "${email}"
      password: "${password}"
    }){
      path
      message
    }
  }
`;


test("Register a new user", async () => {
    await startServer();
    const res = await request(host, mutation);

    expect(res).toEqual({register: null});

    const user = await User.find({email});

    expect((user[0] as any).password).not.toEqual(password);
    expect((user[0] as any).email).toEqual(email);
})

test("Login the new user", async () => {
    await startServer();

    const loginMutation = `
    mutation {
        login(info: { email: "${email}", password: "${password}" }) {
          accessToken
        }
      }
      
    `;

    const res = await request(host, loginMutation);

    const token = res.login.accessToken; 

    expect(token).not.toEqual(null);

    expect(res).toEqual({login: {
        accessToken: token
    }});
})