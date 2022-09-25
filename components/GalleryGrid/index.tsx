import { InfiniteData } from '@tanstack/react-query';
import { Nft, NftContractNftsResponse } from 'alchemy-sdk';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

interface GalleryGridProps {
  nftCollection?: InfiniteData<NftContractNftsResponse> | undefined;
  nftFilteredCollection?: any;
  filterOptions?: any;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({
  nftCollection,
  nftFilteredCollection,
  filterOptions,
}) => {
  const [isFilterActive, setIsFilterActive] = useState<boolean>();

  const renderCollection = (
    collection: InfiniteData<NftContractNftsResponse> | undefined
  ) =>
    collection?.pages.map((page) => {
      return page.nfts?.map((token: Nft) => {
        return (
          <Link
            href={`tokens/${token?.tokenId}`}
            key={`${token?.contract?.address} - ${token?.tokenId}`}
          >
            <a>
              <div className="max-w-[16rem] bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                <div>
                  <img src={token?.media[0]?.gateway} alt="" />
                </div>
                <div className="px-4 py-3 sm:p-2">
                  <div className="w-[80%]">{token?.title}</div>
                </div>
              </div>
            </a>
          </Link>
        );
      });
    });

  const renderFilteredCollection = (data: any) => {
    return data?.map((token: any) => {
      return (
        <Link href={`tokens/${token?.id}`} key={token?.id}>
          <a>
            <div className="max-w-[16rem] bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
              <div>
                <img src={token['img_src']} alt="" />
              </div>
              <div className="px-4 py-3 sm:p-2">
                <div className="w-[80%]">{token?.title}</div>
              </div>
            </div>
          </a>
        </Link>
      );
    });
  };

  const handleFilterActive = useCallback((filters: any) => {
    let active = false;
    for (const k in filters) {
      if (filters[k]?.length !== 0) {
        active = true;
      }
    }
    setIsFilterActive(active);
  }, []);

  useEffect(() => {
    handleFilterActive(filterOptions);
  }, [filterOptions, handleFilterActive]);

  return (
    <div className="lg:col-span-3">
      <div className="h-full">
        <div className="flex flex-wrap justify-around gap-3">
          {isFilterActive
            ? renderFilteredCollection(nftFilteredCollection)
            : renderCollection(nftCollection)}
        </div>
      </div>
    </div>
  );
};

export { GalleryGrid };
