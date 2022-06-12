// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export const pages: string[] = [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.NEXTAUTH_SECRET) {
    res.status(401).json({ error: "Invalid secret" });
    return;
  }

  try {
    pages.forEach(async (pageUrl) => {
      await res.unstable_revalidate(pageUrl);
    });

    return res.json({ revalidated: true, pagesRevalidated: pages });
  } catch (err) {
    return res.status(500).json({ error: "Error Revalidating" });
  }
}
