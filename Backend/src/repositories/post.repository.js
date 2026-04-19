import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAll = () =>
  prisma.post.findMany({ orderBy: { createdAt: "desc" } });

export const findById = (id) =>
  prisma.post.findUnique({ where: { id: Number(id) } });

export const findBySlug = (slug) =>
  prisma.post.findUnique({ where: { slug } });

export const create = (data) => prisma.post.create({ data });

export const update = (id, data) =>
  prisma.post.update({ where: { id: Number(id) }, data });

export const remove = (id) =>
  prisma.post.delete({ where: { id: Number(id) } });