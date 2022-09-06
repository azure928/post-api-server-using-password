import * as postRepository from './postRepository.js';

export async function readPostList(page) {
  const posts = await postRepository.readPostList(page);
  if (!posts) {
    const error = new Error();
    error.statusCode = 204;
    throw error;
  } else {
    return posts;
  }
}
