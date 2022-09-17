import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { Nft } from 'alchemy-sdk';

interface NftAttributes {
  [key: string]: string;
}

interface FormattedNft extends Nft {
  formattedAttributes: NftAttributes;
}

const prisma = new PrismaClient();

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

async function createNft(nft: FormattedNft) {
  const { tokenId, title, tokenType, contract, formattedAttributes } = nft;

  try {
    const nftExists = await prisma.nft.findFirst({
      where: {
        token_id: nft.tokenId,
      },
    });

    if (!nftExists) {
      await prisma.nft.create({
        data: {
          id: tokenId,
          token_id: tokenId,
          title: title,
          token_type: tokenType,
          contract_address: contract.address,
          attributes: formattedAttributes,
        },
      });
    }
  } catch (err) {
    console.error('WARNING: ', err);
  }
}

async function createMultipleNft(nfts: FormattedNft[]) {
  const parsedNfts = nfts.map((nft) => {
    return {
      id: nft.tokenId,
      token_id: nft.tokenId,
      title: nft.title,
      token_type: nft.tokenType.toString(),
      contract_address: nft.contract.address,
      attributes: nft.formattedAttributes,
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
      const result = await main();
      return res.status(200).json(result);
    } else if (req.method === 'POST') {
      const { nfts } = req.body;
      const parsedNfts = nfts.map((nft: Nft) => parseAttributes(nft));
      await createMultipleNft(parsedNfts);
    }
  } catch (error) {
    console.error('Request error', error);
    res
      .status(500)
      .json({ error: 'Error fetching collection', success: false });
  }

  return res.status(200).json({ hello: 'ok' });
}
