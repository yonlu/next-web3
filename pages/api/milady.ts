import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const nfts = await prisma.nft.findMany({
    take: 15,
    orderBy: {
      id: 'asc',
    },
  });

  if (nfts !== null) {
    return nfts;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const result = await main();
      return res.status(200).json(result);
    }
  } catch (error) {
    console.error('Request error', error);
    res
      .status(500)
      .json({ error: 'Error fetching collection', success: false });
  }
  res.end();
}
