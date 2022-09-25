import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(filterAttributes: any) {
  let backgrounds = filterAttributes['Background[]'] ?? [''];
  let cores = filterAttributes['Core[]'] ?? [''];

  if (typeof backgrounds === 'string') {
    backgrounds = new Array(filterAttributes['Background[]']);
  }

  if (typeof cores === 'string') {
    cores = new Array(filterAttributes['Core[]']);
  }

  const selectedNft = await prisma.nft.findMany({
    where: {
      OR: [
        ...backgrounds?.map((background: string) => {
          return {
            attributes: {
              path: '$.Background',
              equals: background,
            },
          };
        }),
        ...cores?.map((core: string) => {
          return {
            attributes: {
              path: '$.Core',
              equals: core,
            },
          };
        }),
      ],
    },
  });

  if (selectedNft !== null) {
    return selectedNft;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const result = await main(req.query);
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
