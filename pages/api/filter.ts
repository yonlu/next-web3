import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import Cors from 'cors';

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
  origin: '*',
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const prisma = new PrismaClient();

async function fetchNoFilter() {
  let selectedNfts;
  try {
    selectedNfts = await prisma.nft.findMany({
      skip: 0,
      take: 15,
    });
  } catch (err) {
    console.error(err);
  }
  return selectedNfts;
}

async function fetchWithFilter(filterAttributes: any) {
  let backgrounds = filterAttributes['Background[]'] ?? [''];
  let cores = filterAttributes['Core[]'] ?? [''];
  let pageParam = parseInt(filterAttributes.pageParam);

  if (typeof backgrounds === 'string') {
    backgrounds = new Array(filterAttributes['Background[]']);
  }

  if (typeof cores === 'string') {
    cores = new Array(filterAttributes['Core[]']);
  }

  if (backgrounds[0] === '' && cores[0] === '') {
    const selectedNft = await prisma.nft.findMany({
      skip: pageParam,
      take: 15,
    });

    return { selectedNft, nextCursor: 15 + pageParam };
  }

  const selectedNft = await prisma.nft.findMany({
    skip: pageParam,
    take: 15,
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

  return { selectedNft, nextCursor: 15 + pageParam };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  try {
    if (req.method === 'GET') {
      let result;
      if (Object.keys(req.query).length === 0) {
        result = await fetchNoFilter();
      } else {
        result = await fetchWithFilter(req.query);
      }
      return res.status(200).json(result);
    }
  } catch (error) {
    console.error('Request error', error);
    res
      .status(500)
      .json({ error: `Error fetching collection, ${error}`, success: false });
  }
  res.end();
}
