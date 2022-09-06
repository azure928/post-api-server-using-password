import prismaClient from '../../prisma/prisma-client.js';

export async function readPostList(page) {
  const posts = await prismaClient.$queryRawUnsafe(`
  SELECT *
  FROM posts
  ORDER BY created_at desc
  LIMIT 20 OFFSET ${(Number(page) - 1) * 20};
`);
  return posts;
}
