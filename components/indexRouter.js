import express from 'express';
import postRouter from './posts/postRouter.js';

const router = express.Router();
router.use(postRouter);

export default router;
