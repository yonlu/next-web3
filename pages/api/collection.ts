// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Network, Alchemy, Nft } from 'alchemy-sdk';

const settings = {
  apiKey: process.env.ALCHEMY_API,
  network: Network.ETH_MAINNET, // Replace with your network.
  maxRetries: 10,
};

const alchemy = new Alchemy(settings);

function filter(nfts: Nft[], filterOptions?: any) {
  const filtered = nfts.filter((nft) => {
    let matchesFilter = true;
    for (const [key, value] of Object.entries(filterOptions)) {
      const hasFilterCriteria = nft.rawMetadata?.attributes?.find(
        (attribute) =>
          attribute['trait_type'] === key && attribute['value'] === value
      );
      if (!hasFilterCriteria) {
        matchesFilter = false;
      }
    }
    return matchesFilter;
  });
  return filtered;
}

async function fetchCollection(fetchCollectionOptions: any) {
  return alchemy.nft.getNftsForContract(
    fetchCollectionOptions.contractAddress,
    {
      pageKey: fetchCollectionOptions.pageParam,
      omitMetadata: false,
      pageSize: fetchCollectionOptions.limit,
    }
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pageParam, contractAddress, startToken, limit, ...filterOptions } =
    req.query;
  console.log(pageParam);
  console.log(contractAddress);
  console.log(startToken);
  console.log(limit);

  const fetchOptions = {
    pageParam,
    contractAddress,
    startToken,
    limit: Number(limit),
  };

  const data = await fetchCollection(fetchOptions).then((r) => {
    const filteredCollection = filter(r.nfts, filterOptions);
    return { nextToken: r.pageKey, nfts: filteredCollection };
  });

  return res.status(200).json(data);
}
