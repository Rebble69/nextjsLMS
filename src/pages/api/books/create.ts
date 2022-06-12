// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";
import { z, ZodError } from "zod";

const Book = z.object({
  //required
  isbn: z.string(),
  title: z.string(),
  authors: z.string().array(),
  //optional
  categories: z.string().array().optional(),
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;
  const { isbn, title, authors, categories } = body;

  try {
    Book.parse(body);

    await prisma.book
      .create({
        data: {
          isbn,
          title,
          authors,
          categories: categories || [],
        },
      })
      .then((newBook) => {
        return res.status(200).json(newBook);
      })
      .catch((err) => {
        if (err.code == "P2002")
          return res.status(409).json({ message: "book exists" });

        return res.status(400).json({ message: "invalid fields" });
      });
  } catch (e) {
    if (e instanceof ZodError)
      return res.status(400).json({ errors: e.flatten() });
  }
}
