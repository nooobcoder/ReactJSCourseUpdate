import { prisma } from "~/db.server";
import type { Post } from "@prisma/client";

const getPosts = async () => {
  return prisma.post.findMany();
};

const getPost = async (slug: string) =>
  prisma.post.findUnique({
    where: { slug },
  });

const createPost = async (post: Pick<Post, "slug" | "title" | "markdown">) =>
  prisma.post.create({ data: post });

export { getPosts, getPost, createPost };
export type { Post } from "@prisma/client";
