import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { Network, Alchemy, Nft } from 'alchemy-sdk';

const settings = {
  apiKey: process.env.ALCHEMY_API,
  network: Network.ETH_MAINNET, // Replace with your network.
  maxRetries: 10,
};

const miladyContract = {
  addressOrName: '0x5Af0D9827E0c53E4799BB226655A1de152A425a5',
};

const alchemy = new Alchemy(settings);

async function fetchCollection(fetchCollectionOptions: any) {
  return alchemy.nft.getNftsForContract(
    fetchCollectionOptions.contractAddress,
    {
      pageKey: fetchCollectionOptions.pageParam,
      omitMetadata: false,
      pageSize: 2,
    }
  );
}

const prisma = new PrismaClient();

async function main() {
  const selectedNft = prisma.nft.findFirst({
    where: {
      id: '2',
    },
  });

  if (selectedNft !== null) {
    await prisma.nft.delete({
      where: {
        id: '2',
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, title } = req.body;

  if (req.method === 'POST') {
    main();
  }

  return res.status(200).json({ hello: 'ok' });
}
