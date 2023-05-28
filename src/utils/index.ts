import { PrismaClient } from "@prisma/client";
import { Pagination } from "./pagination.input";

export async function withPagination<K>(prisma: PrismaClient, model: string, query: K, pagination: Pagination) {
  const [total, data] = await prisma.$transaction([
    prisma[model].count(query),
    prisma[model].findMany({
      ...query,
      skip: pagination.skip,
      take: pagination.limit,
    }),
  ]);
  return {
    total,
    data,
  }
}
