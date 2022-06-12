// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const books = await prisma.book.findMany({});
  res.status(200).json(books);
}
