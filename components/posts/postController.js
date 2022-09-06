import * as postService from './postService.js';

export const readPostList = async (req, res) => {
  try {
    let page = req.query.page;

    const posts = await postService.readPostList(page);
    res.status(200).json(posts);
  } catch (error) {
    console.log(err);
    return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).send(
      { error: err.message } || {
        error: 'Internal Server Error',
      }
    );
  }
};
