import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Network, Alchemy, AssetTransfersCategory, fromHex } from 'alchemy-sdk';
import { BigNumber, BigNumberish } from 'ethers';
import { useQuery } from '@tanstack/react-query';
import { Disclosure } from '@headlessui/react';
import {
  Bars3Icon,
  ListBulletIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  IdentificationIcon,
} from '@heroicons/react/20/solid';

import { Navbar, Modal } from '../../components';
import { classNames } from '../../utils/helpers';
import miladyMakerIcon from '../../public/milady-maker.jpeg';

const settings = {
  apiKey: process.env.ALCHEMY_API,
  network: Network.ETH_MAINNET, // Replace with your network.
  maxRetries: 10,
};

const alchemy = new Alchemy(settings);

const miladyContract = {
  addressOrName: '0x5Af0D9827E0c53E4799BB226655A1de152A425a5',
};

async function fetchNft(contractAddress: string, tokenId: BigNumberish = '') {
  return alchemy.nft.getNftMetadata(contractAddress, tokenId);
}

async function fetchOwners(
  contractAddress: string,
  tokenId: BigNumberish = ''
) {
  return alchemy.nft
    .getOwnersForNft(contractAddress, tokenId)
    .then((res) => res.owners[0]);
}

async function fetchNftSales() {
  const response = await alchemy.core.getAssetTransfers({
    fromBlock: '0x0',
    contractAddresses: [miladyContract.addressOrName],
    category: [AssetTransfersCategory.ERC721],
    excludeZeroValue: false,
  });

  const nftId = 0;

  let txs = response.transfers.filter(
    (txn) => fromHex(txn.erc721TokenId ?? '') === nftId
  );
  console.log(txs);
  return txs;
}

const Token = () => {
  const router = useRouter();
  const { tokenId } = router.query;

  const [open, setOpen] = useState(false);

  const { data, isLoading } = useQuery(['selectedToken', tokenId], () =>
    fetchNft(miladyContract.addressOrName, BigNumber.from(tokenId))
  );

  const { data: owner, isLoading: isLoadingOwner } = useQuery(
    ['ownerAddress', tokenId],
    () => fetchOwners(miladyContract.addressOrName, BigNumber.from(tokenId))
  );

  const { data: sales, isLoading: isLoadingSales } = useQuery(
    ['nftSales'],
    fetchNftSales
  );

  const formatAddress = (address: string) => {
    const partOne = address.substring(0, 8);
    const partTwo = address.substring(38, 42);
    return `${partOne}...${partTwo}`;
  };

  const formattedOwnerAddress = useMemo(() => {
    const partOne = owner?.substring(0, 8);
    const partTwo = owner?.substring(38, 42);

    return `${partOne}...${partTwo}`;
  }, [owner]);

  if (isLoading) return <span>Loading...</span>;
  if (isLoadingOwner) return <span>Loading...</span>;
  if (isLoadingSales) return <span>Loading...</span>;

  return (
    <>
      <Navbar />
      <Modal open={open} setOpen={setOpen} imageUrl={data?.media[0].gateway} />

      <div className="bg-white">
        <main className="mt-8 max-w-2xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
            {/* Image */}
            <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-5 lg:row-start-1 lg:row-span-3">
              <h2 className="sr-only">Image</h2>

              <div
                onClick={() => setOpen(true)}
                className="grid grid-cols-1 lg:grid-cols-1 cursor-pointer"
              >
                <img
                  src={data?.media[0]?.gateway}
                  alt=""
                  className={classNames(
                    'lg:col-span-2 lg:row-span-2',
                    'rounded-lg'
                  )}
                />
              </div>

              {/* Accordion */}
              <section className="mt-5 border border-solid border-gray-200 rounded-lg">
                {/* Description */}
                <Disclosure defaultOpen={true}>
                  <Disclosure.Button
                    className={classNames(
                      'flex',
                      'p-5',
                      'border-b',
                      'w-full',
                      'font-semibold'
                    )}
                  >
                    <Bars3Icon
                      className="block h-6 w-6 mr-2"
                      aria-hidden="true"
                    />
                    <span>Description</span>
                  </Disclosure.Button>
                  <Disclosure.Panel className="p-7 text-stone-800 bg-sky-50">
                    {data?.description}
                  </Disclosure.Panel>
                </Disclosure>

                {/* Properties */}
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={classNames(
                          'flex',
                          'p-5',
                          'border-y',
                          'w-full',
                          'font-semibold'
                        )}
                      >
                        <ListBulletIcon
                          className="block h-6 w-6 mr-2"
                          aria-hidden="true"
                        />

                        <span>Properties</span>
                        {open ? (
                          <ChevronUpIcon
                            className="block h-6 w-6 ml-auto"
                            aria-hidden="true"
                          />
                        ) : (
                          <ChevronDownIcon
                            className="block h-6 w-6 ml-auto"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                      <Disclosure.Panel className="flex flex-wrap p-1 text-stone-800 bg-sky-50">
                        {data?.rawMetadata?.attributes?.map((attribute) => (
                          <a key={attribute['trait_type']} href="">
                            <div className="w-36 h-24 m-1 p-2 border rounded-md border-blue-500 text-center">
                              <div className="uppercase text-xs text-blue-500">
                                {attribute['trait_type']}
                              </div>
                              <div className="text-base capitalize">
                                {attribute.value}
                              </div>
                            </div>
                          </a>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                {/* Details */}
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={classNames(
                          'flex',
                          'p-5',
                          'border-y',
                          'w-full',
                          'font-semibold'
                        )}
                      >
                        <IdentificationIcon
                          className="block h-6 w-6 mr-2"
                          aria-hidden="true"
                        />

                        <span>Details</span>
                        {open ? (
                          <ChevronUpIcon
                            className="block h-6 w-6 ml-auto"
                            aria-hidden="true"
                          />
                        ) : (
                          <ChevronDownIcon
                            className="block h-6 w-6 ml-auto"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                      <Disclosure.Panel className="flex flex-wrap p-5 text-stone-800 bg-sky-50">
                        <div className="w-full">
                          <div className="flex justify-between mt-2">
                            Contract Address
                            <a
                              href={`https://etherscan.io/address/${data?.contract?.address}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm text-blue-600 font-medium"
                            >
                              {data?.contract?.address &&
                                formatAddress(data.contract.address)}
                            </a>
                          </div>
                          <div className="flex justify-between mt-2">
                            Token ID
                            <a
                              href={data?.tokenUri?.raw}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm text-blue-600 font-medium"
                            >
                              {data?.tokenId}
                            </a>
                          </div>
                          <div className="flex justify-between mt-2">
                            Token Standard
                            <span>{data?.tokenType}</span>
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </section>
            </div>

            <div className="lg:col-start-7 lg:col-span-6">
              {/* Collection & Token Name */}
              <div className="flex flex-col mb-8">
                <div className="flex mb-2 gap-2">
                  <img
                    className="inline-block h-6 w-6 rounded-md"
                    src={miladyMakerIcon.src}
                    alt=""
                  />
                  <span>Milady Maker</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {data?.title}
                </h1>
              </div>

              {/* Creator & Owner */}
              <div className="flex lg:gap-8 sm:gap-2">
                <div className="flex items-center">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500">
                    <span className="text-xs font-medium leading-none text-white">
                      TW
                    </span>
                  </span>
                  <div className="flex flex-col ml-4">
                    <span className="sm:text-xs">Creator</span>
                    <span className="sm:text-xs">Milady Maker</span>
                  </div>
                </div>

                <div className="flex items-center">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500">
                    <span className="text-xs font-medium leading-none text-white">
                      TW
                    </span>
                  </span>
                  <div className="flex flex-col ml-4">
                    <span className="text-base sm:text-xs">Current Owner</span>
                    <span className="text-base sm:text-xs">
                      {formattedOwnerAddress}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Token;
