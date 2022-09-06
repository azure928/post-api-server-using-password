import express from 'express';
import * as postController from './postController.js';

const router = express.Router();

// test
router.get('/posts/test', function (req, res, next) {
  res.send('respond with a resource');
});

// 게시물 목록
router.get('/posts', postController.readPostList);

// 게시물 작성
router.post('/posts', postController.createPost);

export default router;
