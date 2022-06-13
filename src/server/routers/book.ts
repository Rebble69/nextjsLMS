import { prisma } from "../../db/client";
import { z } from "zod";
import { createRouter } from "../createRouter";

export const bookRouter = createRouter()
  .query("get-by-id", {
    input: z.number(),
    async resolve({ input: inputISBN }) {
      const book = await prisma.book.findFirst({
        where: { isbn: inputISBN },
      });

      return book ?? null;
    },
  })
  .query("get-all", {
    async resolve({}) {
      const books = await prisma.book.findMany();
      return books;
    },
  });
