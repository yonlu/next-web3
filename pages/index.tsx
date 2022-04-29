import { NextPage } from 'next';
import { useWallet, useWriteContract } from '@web3-ui/core';
import { TransactionResponse } from '@ethersproject/providers';
import Image from 'next/image';
import { Faq, Footer, Header } from '../components';
import myEpicNft from '../utils/myEpicNft.json';
import cardTwo from '../public/card2.png';
import cardThree from '../public/card3.png';

const CONTRACT_ADDRESS = '0x683C127679e3DceB7d876f8E8729BFB50164ae83';

const Home: NextPage = () => {
  const { connection, connected, readOnlyProvider, connectWallet } =
    useWallet();

  const [contract, isContractReady] = useWriteContract(
    CONTRACT_ADDRESS,
    myEpicNft.abi
  );

  const handleMint = async () => {
    try {
      const response: TransactionResponse = await contract?.makeAnEpicNFT();
      await response.wait();

      console.log(
        `Mined, see transaction: https://rinkeby.etherscan.io/tx/${response.hash}`
      );
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
                      >
                        {/* <img
                          alt="My Profile 1"
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
                        {/* <img
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
