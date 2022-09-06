import * as postService from './postService.js';

export const readPostList = async (req, res) => {
  try {
    let page = req.query.page;

    const posts = await postService.readPostList(page);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).send(
      { error: error.message } || {
        error: 'Internal Server Error',
      }
    );
  }
};

export const createPost = async (req, res) => {
  try {
    let { title, content, writer, password } = req.body;

    await postService.createPost({
      title,
      content: content ? content : null,
      writer: writer ? writer : null,
      password,
    });
    return res.status(201).json({ message: '게시물 작성 성공' });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).send(
      { error: error.message } || {
        error: 'Internal Server Error',
      }
    );
  }
};
