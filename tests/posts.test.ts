import {startServer} from '../startServer';
import {request} from 'graphql-request';
import { host } from '../constants';
import { Post } from '../models/Post';
import 'regenerator-runtime/runtime';

beforeAll( () => {
    process.env.TEST_SERVER = 'true';
})

const title = "Test post";
const desc = "Description of the test post";


const mutation = `
mutation {
    createPost(title: "${title}", desc: "${desc}"){
      title
      desc
    }
  }
`;


test("Create post", async () => {
    await startServer();
    const res = await request(host, mutation);

    expect(res).toEqual({createPost: {
        title,
        desc
    }});

    const post = await Post.find({title});

    expect((post[0] as any).title).toEqual(title);
})

test("Delete Post", async () => {
    await startServer();
    const lastPost = await Post.findOne({}, {}, { sort: { 'created_at' : -1 } });

    const delMutation = `
    mutation {
        deletePost(id: "${(lastPost as any)._id}")
      }
    `;

    const res = await request(host, delMutation);

    expect(res).toEqual({deletePost: true});
})