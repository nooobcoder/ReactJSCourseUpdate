import { prisma } from "~/db.server";

const getPosts = async () => {
  return prisma.post.findMany();
};

const getPost = async (slug: string) =>
  prisma.post.findUnique({
    where: { slug },
  });

export { getPosts, getPost };
export type { Post } from "@prisma/client";
