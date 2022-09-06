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

export async function createPost(post) {
  const { title, content, writer, password } = post;

  if (!title) {
    const error = new Error('제목을 입력해 주세요.');
    error.statusCode = 400;
    throw error;
  }
  if (!password) {
    const error = new Error('비밀번호를 입력해 주세요.');
    error.statusCode = 400;
    throw error;
  } else {
    return await postRepository.createPost(title, content, writer, password);
  }
}
