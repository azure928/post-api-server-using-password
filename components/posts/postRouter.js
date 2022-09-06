import express from 'express';
const router = express.Router();

// test
router.get('/posts/test', function (req, res, next) {
  res.send('respond with a resource');
});

export default router;
