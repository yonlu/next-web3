import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { Alchemy, Network, Nft } from 'alchemy-sdk';

interface NftAttributes {
  [key: string]: string;
}

interface FormattedNft extends Nft {
  formattedAttributes: NftAttributes;
}

const prisma = new PrismaClient();

const settings = {
  apiKey: process.env.ALCHEMY_API,
  network: Network.ETH_MAINNET, // Replace with your network.
  maxRetries: 10,
};

const alchemy = new Alchemy(settings);

async function fetchCollection() {
  return alchemy.nft.getNftsForContract(
    '0x5Af0D9827E0c53E4799BB226655A1de152A425a5',
    {
      pageKey: '200',
      omitMetadata: false,
    }
  );
}

function parseAttributes(nft: any) {
  const attributes = nft.rawMetadata?.attributes;
  let formattedAttributes: NftAttributes = {};

  attributes?.forEach((attribute: any) => {
    const key = attribute['trait_type'];
    const value = attribute['value'];
    formattedAttributes[key] = value;
  });

  const nftWithAttributes = {
    ...nft,
    formattedAttributes,
  };

  return nftWithAttributes;
}

async function createMultipleNft(nfts: FormattedNft[]) {
  console.log(nfts);
  const parsedNfts = nfts.map((nft) => {
    return {
      id: parseInt(nft.tokenId),
      token_id: nft.tokenId,
      title: nft.title,
      token_type: nft.tokenType.toString(),
      contract_address: nft.contract.address,
      attributes: nft.formattedAttributes,
      img_src: nft.media[0].gateway,
    };
  });

  try {
    await prisma.nft.createMany({
      data: parsedNfts,
      skipDuplicates: true,
    });
  } catch (err) {
    console.error(err);
  }
}

async function main() {
  const selectedNft = prisma.nft.findMany({
    where: {
      attributes: {
        path: '$.Background',
        string_contains: 'tennis',
      },
    },
  });

  if (selectedNft !== null) {
    return selectedNft;
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
  try {
    if (req.method === 'GET') {
    } else if (req.method === 'POST') {
      const result = await fetchCollection();
      const parsedNfts = result.nfts.map((nft: Nft) => parseAttributes(nft));
      await createMultipleNft(parsedNfts);
    }
  } catch (error) {
    console.error('Request error', error);
    res
      .status(500)
      .json({ error: 'Error fetching collection', success: false });
  }
}
