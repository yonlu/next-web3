import { useState } from 'react';
import { NextPage } from 'next';
import {
  useContractWrite,
  useContractReads,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { NFTData } from '@web3-ui/components';
import { Result } from 'ethers/lib/utils';
import Image from 'next/image';
import base64 from 'base-64';

import { Faq, Footer } from '../components';
import cardTwo from '../public/card2.png';
import cardThree from '../public/card3.png';
import NaturedDevelopers from '../abis/NaturedDevelopers.json';
import { Card } from '../components/Card';
import { Navbar } from '../components/Navbar';

const naturedDevelopersContract = {
  addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  contractInterface: NaturedDevelopers.abi,
};

const Home: NextPage = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [gallery, setGallery] = useState<NFTData[] | undefined>(undefined);

  const { config } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: NaturedDevelopers.abi,
    functionName: 'publicMint',
    args: quantity,
  });

  const { data, write } = useContractWrite(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  });

  useContractReads({
    contracts: [
      {
        ...naturedDevelopersContract,
        functionName: 'name',
      },
      {
        ...naturedDevelopersContract,
        functionName: 'symbol',
      },
      {
        ...naturedDevelopersContract,
        functionName: 'tokenURI',
        args: '0',
      },
      {
        ...naturedDevelopersContract,
        functionName: 'tokenURI',
        args: '1',
      },
      {
        ...naturedDevelopersContract,
        functionName: 'tokenURI',
        args: '2',
      },
    ],
    onSuccess: (data) => formatResults(data),
  });

  const formatResults = (readData: Result[]) => {
    const [assetContractName, assetContractSymbol, ...tokenURIs] = readData;

    const results = tokenURIs.map((data) => {
      const [, base64Metadata] = data.split(',');
      const { image: imageUrl, name } = JSON.parse(
        base64.decode(base64Metadata)
      );

      const responseMetadata = {
        tokenId: '1',
        imageUrl,
        name,
        assetContractSymbol: assetContractSymbol.toString(),
        assetContractName: assetContractName.toString(),
      };

      return responseMetadata;
    });

    setGallery(results);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
                A collection of Natured Developer cards with different
                attributes and styles!
              </p>

              <div className="flex flex-col items-center space-x-4 space-y-4 sm:flex-row sm:space-y-0 w-full">
                <div className="flex flex-col">
                  <div className="flex flex-row justify-between items-end w-full mt-2 ">
                    <div className="block text-base font-medium text-gray-400 ml-2 flex-none">
                      <span className="text-gray-400">
                        {quantity} * 0.125 Ξ ={' '}
                      </span>
                      <span className="text-emerald-500">
                        {quantity * 0.125} Ξ
                      </span>
                    </div>
                    <div className="block text-base font-medium text-gray-400 mr-2 grow text-right">
                      <span className="text-gray-500">Status:</span>{' '}
                      <span className="text-emerald-500 tracking-wide">
                        Live
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-row justify-start items-center mt-3 w-full mx-auto">
                    <div className="grow mr-4">
                      <div>
                        <div className="mt-1">
                          <input
                            value={quantity}
                            onChange={(e) => {
                              setQuantity(e.target.valueAsNumber);
                            }}
                            type="number"
                            name="quantity"
                            id="quantity"
                            className="shadow-sm border block w-full border-indigo-500/80 rounded-md h-12 p-4 sm:text-sm lg:text-lg"
                            aria-describedby="quantity to mint"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex-none">
                      <button
                        onClick={() => write?.()}
                        disabled={!write || isLoading}
                        type="button"
                        className="bg-indigo-500 hover:bg-indigo-600 text-white w-36 h-12 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold font-display rounded-md shadow-sm   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-colors"
                      >
                        Mint
                      </button>
                    </div>
                  </div>
                </div>
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
                      <Image
                        className="rounded-t-lg"
                        src={cardTwo.src}
                        layout="fill"
                        alt="Back Card"
                      />
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
                        <p className="text-xs text-gray-300 xl:text-sm">
                          #4204
                        </p>
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
                      <Image
                        className="rounded-t-lg"
                        alt="Back Card"
                        src={cardThree.src}
                        layout="fill"
                      />
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
                        <p className="text-xs text-gray-300 xl:text-sm">
                          #8258
                        </p>
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
            <div className="flex flex-wrap justify-center gap-3">
              {gallery &&
                gallery.map((item) => {
                  return (
                    <Card
                      key={item.name}
                      imageUrl={item.imageUrl}
                      name={item.name}
                    />
                  );
                })}
            </div>
          </section>

          <Faq />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Home;
