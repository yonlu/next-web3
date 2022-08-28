import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Network, Alchemy } from 'alchemy-sdk';
import { BigNumber, BigNumberish } from 'ethers';
import { useQuery } from '@tanstack/react-query';

import { Navbar } from '../../components/Navbar';
import { Modal } from '../../components';
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

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const Token = () => {
  const router = useRouter();
  const { tokenId } = router.query;

  const [open, setOpen] = useState(false);
  let [categories] = useState({
    Recent: [
      {
        id: 1,
        title: 'Does drinking coffee make you smarter?',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Popular: [
      {
        id: 1,
        title: 'Is tech making coffee better or worse?',
        date: 'Jan 7',
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: 'The most innovative things happening in coffee',
        date: 'Mar 19',
        commentCount: 24,
        shareCount: 12,
      },
    ],
    Trending: [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
  });

  const { data, isLoading } = useQuery(['selectedToken', tokenId], () =>
    fetchNft(miladyContract.addressOrName, BigNumber.from(tokenId))
  );

  const { data: owner, isLoading: isLoadingOwner } = useQuery(
    ['ownerAddress', tokenId],
    () => fetchOwners(miladyContract.addressOrName, BigNumber.from(tokenId))
  );

  const formattedOwnerAddress = useMemo(() => {
    const partOne = owner?.substring(0, 8);
    const partTwo = owner?.substring(38, 42);

    return `${partOne}...${partTwo}`;
  }, [owner]);

  if (isLoading) return <span>Loading...</span>;
  if (isLoadingOwner) return <span>Loading...</span>;

  return (
    <>
      <Navbar />
      <Modal open={open} setOpen={setOpen} imageUrl={data?.media[0].gateway} />

      <div className="bg-white">
        <main className="mt-8 max-w-2xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
            {/* Image */}
            <div className="mt-8 lg:mt-0 lg:col-start-2 lg:col-span-3 lg:row-start-1 lg:row-span-3">
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
            </div>

            <div className="lg:col-start-8 lg:col-span-5">
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
