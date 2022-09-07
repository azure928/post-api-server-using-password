import express from 'express';
import * as postController from './postController.js';
import { body } from 'express-validator';
import { validate } from '../../middleware/validator.js';

const router = express.Router();

const validateCredential = [
  body('password')
    .notEmpty()
    .withMessage('비밀번호를 입력해 주세요.')
    .trim()
    .isLength({ min: 6 })
    .withMessage('비밀번호는 6자 이상 입력해 주세요.')
    .matches(/\d/)
    .withMessage('비밀번호는 숫자를 포함하여 입력해 주세요.'),
  body('title')
    .notEmpty()
    .withMessage('제목을 입력해 주세요.')
    .trim()
    .isLength({ max: 20 })
    .withMessage('제목은 20자 이하로 입력해 주세요.'),
  body('content')
    .trim()
    .isLength({ max: 200 })
    .withMessage('본문은 200자 이하로 입력해 주세요.'),
  validate,
];

// test
router.get('/posts/test', function (req, res, next) {
  res.send('respond with a resource');
});

// 게시물 목록
router.get('/posts', postController.readPostList);

// 게시물 작성
router.post('/posts', validateCredential, postController.createPost);

// 게시물 삭제
router.delete('/posts/:id', postController.deletePost);

// 게시물 수정
router.put('/posts/:id', validateCredential, postController.updatePost);

// 날씨 api 호출
//router.get('/weather', postController.requestWeatherApi);

export default router;
