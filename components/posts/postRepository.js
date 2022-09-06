import prisma from '../../prisma/prisma-client.js';

/*
export async function readPostList(page) {
  const posts = await prisma.$queryRawUnsafe(`
  SELECT *
  FROM posts
  ORDER BY created_at desc
  LIMIT 20 OFFSET ${(Number(page) - 1) * 20};
`);
  return posts;
}*/

export async function readPostList(page) {
  const posts = await prisma.posts.findMany({
    orderBy: {
      created_at: 'desc',
    },
    skip: (page - 1) * 20,
    take: 20,
  });
  return posts;
}

export const createPost = async (title, content, writer, hash) => {
  return await prisma.posts.create({
    data: {
      title,
      content,
      writer,
      password: hash,
    },
  });
};

export const deletePostById = async id => {
  return await prisma.posts.delete({ where: { id: Number(id) } });
};

export async function readPostById(id) {
  return await prisma.posts.findUnique({ where: { id: Number(id) } });
}

export const updatePostById = async (id, title, content) => {
  return await prisma.posts.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      content,
    },
  });
};
