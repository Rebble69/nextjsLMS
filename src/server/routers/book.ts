import { prisma } from "../../db/client";
import { z } from "zod";
import { createRouter } from "../createRouter";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";

export const bookRouter = createRouter()
  .query("get-by-id", {
    input: z.number().int(),
    async resolve({ input }) {
      const book = await prisma.book.findFirst({
        where: { isbn: input },
      });

      return book ?? null;
    },
  })
  .query("get-all", {
    async resolve({}) {
      const books = await prisma.book.findMany();
      return books;
    },
  })
  .mutation("create", {
    input: z.object({
      isbn: z.number().int(),
      title: z.string(),
      authors: z.array(z.string()).optional(),
      categories: z.array(z.string()).optional(),
      thumbnailUrl: z.string().url().optional(),
      description: z.string().optional(),
      language: z.string().optional(),
    }),
    resolve: async ({ input }) => {
      try {
        const newBook = await prisma.book.create({
          data: {
            isbn: input.isbn,
            title: input.title,
            thumbnailUrl: input.thumbnailUrl,
            description: input.description,
            lang: input.language,

            authors: {
              create: input.authors?.map((author) => {
                return {
                  author: {
                    connectOrCreate: {
                      where: { name: author },
                      create: { name: author },
                    },
                  },
                };
              }),
            },

            categories: {
              create: input.categories?.map((category) => {
                return {
                  category: {
                    connectOrCreate: {
                      where: { name: category },
                      create: { name: category },
                    },
                  },
                };
              }),
            },
          },
        });

        return newBook;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Book already exists",
          });
        }
      }
    },
  });
