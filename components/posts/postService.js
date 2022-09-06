import * as postRepository from './postRepository.js';
import bcrypt from 'bcrypt';

export async function readPostList(page) {
  const posts = await postRepository.readPostList(page);

  if (posts.length == 0) {
    const error = new Error();
    error.statusCode = 204;
    throw error;
  } else {
    return posts;
  }
}

export async function createPost(inputContent) {
  const { title, content, writer, password } = inputContent;

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
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    return await postRepository.createPost(title, content, writer, hash);
  }
}

export async function deletePost(id, password) {
  if (!password) {
    const error = new Error('비밀번호를 입력해 주세요.');
    error.statusCode = 400;
    throw error;
  }

  const post = await postRepository.readPostById(id);

  if (!post) {
    const error = new Error('삭제할 게시물이 존재하지 않습니다.');
    error.statusCode = 404;
    throw error;
  }

  const isCorrect = await bcrypt.compare(password, post.password);

  if (!isCorrect) {
    const error = new Error('비밀번호가 일치하지 않습니다.');
    error.statusCode = 400;
    throw error;
  } else {
    await postRepository.deletePost(id);
  }
}

export async function updatePost(inputContent) {
  const { id, title, content, password } = inputContent;

  const post = await postRepository.readPostById(id);

  if (!post) {
    const error = new Error('수정할 게시물이 존재하지 않습니다.');
    error.statusCode = 404;
    throw error;
  }

  const isCorrect = await bcrypt.compare(password, post.password);

  if (!isCorrect) {
    const error = new Error('비밀번호가 일치하지 않습니다.');
    error.statusCode = 400;
    throw error;
  } else {
    await postRepository.updatePostById(id, title, content);
  }
}
