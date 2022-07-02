import { TransactionResponse } from '@ethersproject/providers';
import { NFTData } from '@web3-ui/components';
import { useWallet, useWriteContract } from '@web3-ui/core';
import base64 from 'base-64';
import { BigNumber } from 'ethers';
import { NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';

import { Faq, Footer, Header, Modal } from '../components';
import cardTwo from '../public/card2.png';
import cardThree from '../public/card3.png';
import myEpicNft from '../utils/myEpicNft.json';

const Home: NextPage = () => {
  const { connection, connected } = useWallet();
  const [metadata, setMetadata] = useState();
  const [isMinting, setIsMinting] = useState<boolean>(false);

  const nftData: NFTData = {
    tokenId: '1',
    imageUrl: metadata,
    name: 'Test name',
    assetContractName: 'Test asset contract name',
    assetContractSymbol: 'TEST',
  };

  const [contract, isContractReady] = useWriteContract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    myEpicNft.abi
  );

  const setupEventListener = async () => {
    if (connected && isContractReady) {
      contract?.on('NewEpicNFTMinted', async (from, tokenId: BigNumber) => {
        if (from === connection.userAddress) {
          console.log(from, tokenId.toNumber());
          fetchMetaData(tokenId.toNumber());
        }
      });
    }
  };

  const fetchMetaData = async (tokenURI: number) => {
    if (isContractReady) {
      try {
        const response = await contract?.tokenURI(tokenURI);
        const [, base64Metadata] = response.split(',');
        console.log(JSON.parse(base64.decode(base64Metadata)));
        const obj = JSON.parse(base64.decode(base64Metadata));
        setMetadata(obj.image);

        // MOOSE delete me
        console.log(obj.image);
      } catch (err) {
        // MOOSE delete me
        console.log(err);
      }
    }
  };

  const handleMint = async () => {
    try {
      setupEventListener();
      const response: TransactionResponse = await contract?.makeAnEpicNFT();
      setIsMinting(true);
      await response.wait();
      // MOOSE delete me
      console.log(
        `Mined, see transaction: https://rinkeby.etherscan.io/tx/${response.hash}`
      );

      setIsMinting(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-sky-50 text-black selection:bg-indigo-500 selection:text-white">
      <Header />

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
              <button
                onClick={handleMint}
                className="flex w-fit text-white space-x-2 rounded-2xl bg-gradient-to-r from-purple-500 via-violet-400 to-indigo-400 px-4 py-3 font-semibold shadow-lg transition-all duration-300 hover:-translate-y-[1px]"
              >
                Mint
              </button>
              <button
                onClick={() => fetchMetaData(1)}
                className="flex w-fit text-white space-x-2 rounded-2xl bg-gradient-to-r from-purple-500 via-violet-400 to-indigo-400 px-4 py-3 font-semibold shadow-lg transition-all duration-300 hover:-translate-y-[1px]"
              >
                Fetch Metadata
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

        <svg
          role="status"
          className="w-32 h-32 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>

        <section className="flex justify-center m-[4rem]">
          {metadata && !isMinting ? <Modal nftData={nftData} /> : null}
          {/* {metadata ? <Modal nftData={nftData} /> : null} */}
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
