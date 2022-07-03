import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useContractRead, useContractWrite, useContractEvent } from 'wagmi';
import { NFTData } from '@web3-ui/components';
import { BigNumber } from 'ethers';
import { Result } from 'ethers/lib/utils';
import Image from 'next/image';
import base64 from 'base-64';

import { Faq, Footer, Header, Modal } from '../components';
import cardTwo from '../public/card2.png';
import cardThree from '../public/card3.png';
import myEpicNft from '../abis/myEpicNft.json';

// MOOSE delete me
const FOO = [
  '0x9Febf3C29A57B9C0B76750869AA2156696597E2a',
  {
    type: 'BigNumber',
    hex: '0x15',
  },
];

const BAR = {
  hash: '0x1a252943b75759091e4268b83fa29475991b7f300ac025c3347fba43a50e9f18',
  type: 2,
  accessList: null,
  blockHash: null,
  blockNumber: null,
  transactionIndex: null,
  confirmations: 0,
  from: '0x9Febf3C29A57B9C0B76750869AA2156696597E2a',
  gasPrice: {
    type: 'BigNumber',
    hex: '0x59682f0b',
  },
  maxPriorityFeePerGas: {
    type: 'BigNumber',
    hex: '0x59682f00',
  },
  maxFeePerGas: {
    type: 'BigNumber',
    hex: '0x59682f0b',
  },
  gasLimit: {
    type: 'BigNumber',
    hex: '0x1132a1',
  },
  to: '0x683C127679e3DceB7d876f8E8729BFB50164ae83',
  value: {
    type: 'BigNumber',
    hex: '0x00',
  },
  nonce: 80,
  data: '0xde9d132f',
  r: '0xc803abc06e60658541b8e10d583cd222ac068748c4db539b1accf8e213148389',
  s: '0x43f25c6617c8604f54f63487ef5f74fb7d85f31d013df1fa29c23ec5c0cde844',
  v: 1,
  creates: null,
  chainId: 0,
};

const NFT_MINTED_EVENT = [
  '0x9Febf3C29A57B9C0B76750869AA2156696597E2a',
  {
    type: 'BigNumber',
    hex: '0x12',
  },
  {
    blockNumber: 10955077,
    blockHash:
      '0x0e329959edf4436fa30e87df1286c5ac4cc4e83882b473de73cc29d6d675ce8a',
    transactionIndex: 10,
    removed: false,
    address: '0x683C127679e3DceB7d876f8E8729BFB50164ae83',
    data: '0x0000000000000000000000009febf3c29a57b9c0b76750869aa2156696597e2a0000000000000000000000000000000000000000000000000000000000000012',
    topics: [
      '0xebb98688741ffa4c7589bf325de30cf7becb63de567842e1ccdb6cb949fdc82c',
    ],
    transactionHash:
      '0x58e484531ef6b26331c7d5b1a3cd32a8e9967c03fe413447856e45a5bc525d91',
    logIndex: 19,
    event: 'NewEpicNFTMinted',
    eventSignature: 'NewEpicNFTMinted(address,uint256)',
    args: [
      '0x9Febf3C29A57B9C0B76750869AA2156696597E2a',
      {
        type: 'BigNumber',
        hex: '0x12',
      },
    ],
  },
];

const Home: NextPage = () => {
  const [metadata, setMetadata] = useState<NFTData | undefined>(undefined);
  const [isDialogActive, setIsDialogActive] = useState<boolean>(false);
  const [tokenId, setTokenId] = useState<string | null>(null);

  const { refetch } = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: myEpicNft.abi,
    functionName: 'tokenURI',
    args: metadata?.tokenId ?? '1',
    onSuccess: (data) => {
      fetchMetaData(data);
    },
    watch: true,
  });

  const {
    data,
    isLoading: isMinting,
    status,
    write,
    writeAsync,
  } = useContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: myEpicNft.abi,
    functionName: 'makeAnEpicNFT',
    onSuccess: (data) => {
      console.log(data);
    },
  });

  useContractEvent({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: myEpicNft.abi,
    eventName: 'NewEpicNFTMinted',
    listener: ([, , { args }]) => {
      // MOOSE refactor this sh*t
      const tokenIdHex = args[1] as BigNumber;
      const formattedTokenId = tokenIdHex.toString();

      setTokenId(formattedTokenId);
      setIsDialogActive(true);
    },
  });

  const fetchMetaData = async (readData: Result) => {
    try {
      const [, base64Metadata] = readData.split(',');
      const { image: imageUrl, name } = JSON.parse(
        base64.decode(base64Metadata)
      );

      const responseMetadata = {
        tokenId: tokenId ?? '1',
        imageUrl,
        name,
        assetContractSymbol: 'SQUARE',
        assetContractName: 'SquareNFT',
      };

      setMetadata(responseMetadata);
    } catch (err) {
      // MOOSE add proper error handling
      console.log(err);
    }
  };

  const renderDialogTrigger = () => {
    if (metadata && !isMinting && isDialogActive) {
      return <Modal nftData={metadata} />;
    }
    return;
  };

  // MOOSE delete logs
  useEffect(() => {
    console.log(status);
  }, [status]);

  useEffect(() => {
    refetch();
  }, [tokenId, refetch]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-sky-50 text-black selection:bg-indigo-500 selection:text-white">
      <Header />
      {renderDialogTrigger()}

      <main className="w-full pt-24">
        <section className="container relative mx-auto grid grid-cols-1 gap-x-4 gap-y-20 py-16 lg:grid-cols-2">
          <div className="flex flex-col items-center justify-center text-center lg:items-start lg:text-left">
            <h1 className="mb-4 text-6xl font-bold xl:text-7xl">
              Natured Developers
            </h1>
            <h2 className="mb-12 text-4xl font-bold text-purple-500 xl:text-5xl">
              On-chain NFT Project
            </h2>
            <p className="text-md mb-10 font-medium text-gray-600 xl:text-lg">
              A collection of Natured Developer cards with different attributes
              and styles!
            </p>
            <div className="flex flex-col items-center space-x-4 space-y-4 sm:flex-row sm:space-y-0">
              {status === 'loading' ? (
                <button
                  disabled
                  type="button"
                  className="flex items-center text-white space-x-2 rounded-2xl bg-gradient-to-r from-purple-500 via-violet-400 to-indigo-400 px-4 py-3 font-semibold shadow-lg transition-all duration-300 hover:-translate-y-[1px]"
                >
                  <svg
                    role="status"
                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Loading...
                </button>
              ) : (
                <button
                  onClick={() => write()}
                  className="flex w-fit text-white space-x-2 rounded-2xl bg-gradient-to-r from-purple-500 via-violet-400 to-indigo-400 px-4 py-3 font-semibold shadow-lg transition-all duration-300 hover:-translate-y-[1px]"
                >
                  Mint
                </button>
              )}

              <button
                onClick={() => setIsDialogActive(!isDialogActive)}
                className="flex w-fit text-white space-x-2 rounded-2xl bg-gradient-to-r from-purple-500 via-violet-400 to-indigo-400 px-4 py-3 font-semibold shadow-lg transition-all duration-300 hover:-translate-y-[1px]"
              >
                Trigger Dialog Modal
              </button>
            </div>
          </div>
          <div className="ml-10 flex justify-center">
            <div className="relative -skew-y-3 mt-24 skew-x-6">
              <div className="h-[15rem] w-[11rem] rounded-2xl bg-gray-50 shadow-xl xl:h-[23rem] xl:w-[18rem]">
                <div className="relative h-[11rem] w-full xl:h-[18rem]">
                  <span
                    style={{
                      boxSizing: 'border-box',
                      display: 'block',
                      overflow: 'hidden',
                      width: 'initial',
                      height: 'initial',
                      background: 'none',
                      opacity: 1,
                      border: 0,
                      margin: 0,
                      padding: 0,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                    }}
                  >
                    <Image src={cardTwo.src} layout="fill" alt="Back Card" />
                  </span>
                </div>
                <div className="flex h-[4rem] w-full items-center justify-between px-4 xl:h-[5rem]">
                  <div className="flex items-center space-x-3">
                    <div className="relative h-6 w-6 xl:h-8 xl:w-8">
                      <span
                        style={{
                          boxSizing: 'border-box',
                          display: 'block',
                          overflow: 'hidden',
                          width: 'initial',
                          height: 'initial',
                          background: 'none',
                          opacity: 1,
                          border: 0,
                          margin: 0,
                          padding: 0,
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                        }}
                      ></span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-300 xl:text-sm">#4204</p>
                      <p className="text-md font-medium text-purple-500 xl:text-xl">
                        1.48 ETH
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative skew-y-3 -translate-x-20 -skew-x-6">
              <div className="h-[15rem] w-[11rem] rounded-2xl bg-gray-50 shadow-xl xl:h-[23rem] xl:w-[18rem]">
                <div className="relative h-[11rem] w-full xl:h-[18rem]">
                  <span
                    style={{
                      boxSizing: 'border-box',
                      display: 'block',
                      overflow: 'hidden',
                      width: 'initial',
                      height: 'initial',
                      background: 'none',
                      opacity: 1,
                      border: 0,
                      margin: 0,
                      padding: 0,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                    }}
                  >
                    <Image alt="Back Card" src={cardThree.src} layout="fill" />
                  </span>
                </div>
                <div className="flex h-[4rem] w-full items-center justify-between px-4 xl:h-[5rem]">
                  <div className="flex items-center space-x-3">
                    <div className="relative h-6 w-6 xl:h-8 xl:w-8">
                      <span
                        style={{
                          boxSizing: 'border-box',
                          display: 'block',
                          overflow: 'hidden',
                          width: 'initial',
                          height: 'initial',
                          background: 'none',
                          opacity: 1,
                          border: 0,
                          margin: 0,
                          padding: 0,
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                        }}
                      >
                        {/*
                        MOOSE delete me
                         <img
                          alt="My Profile 2"
                          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                          decoding="async"
                          data-nimg="fill"
                          className="heroUser"
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            boxSizing: 'border-box',
                            padding: 0,
                            border: 'none',
                            margin: 'auto',
                            display: 'block',
                            width: 0,
                            height: 0,
                            minWidth: '100%',
                            maxWidth: '100%',
                            minHeight: '100%',
                            maxHeight: '100%',
                            objectFit: 'cover',
                          }}
                        /> */}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-300 xl:text-sm">#8258</p>
                      <p className="text-md font-medium text-purple-500 xl:text-xl">
                        2.67 ETH
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="gallery container relative mx-auto py-10"
          id="gallery"
        >
          <h3 className="mb-4 text-center text-3xl font-semibold underline decoration-indigo-500/80 lg:text-left xl:text-4xl">
            Gallery
          </h3>
          <div className="react-multi-carousel-list gallery-slider ">
            <ul
              className="react-multi-carousel-track "
              style={{
                transition: 'none',
                overflow: 'unset',
                transform: 'translate3d(0px,0,0)',
              }}
            />
          </div>
        </section>

        <Faq />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
