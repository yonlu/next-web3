import { NextPage } from 'next';
import { Faq, Features, Footer, Header, Roadmap, Team } from '../components';
import Image from 'next/image';
import { useWallet } from '@web3-ui/core';

const Octospace: NextPage = () => {
  const { connection, connected, readOnlyProvider, connectWallet } =
    useWallet();

  return (
    <div className="min-h-screen bg-gray-800 text-white selection:bg-indigo-500 selection:text-white">
      <Header />

      <main className="w-full pt-24">
        <div className="relative w-full">
          <div className="absolute -bottom-44 -left-4 h-72 w-72 animate-blob rounded-full bg-teal-500/50 mix-blend-overlay blur-2xl filter" />
          <div className="animation-delay-2000 absolute top-0 -right-4 h-96 w-96 animate-blob rounded-full bg-teal-200/20 mix-blend-overlay blur-2xl filter" />
          <div className="animation-delay-4000 absolute top-44 left-44 h-72 w-72 animate-blob rounded-full bg-indigo-300/30 mix-blend-overlay blur-2xl filter" />
        </div>
        <div className="absolute mx-auto mt-16 flex h-[400px] w-full bg-transparent px-20">
          <div className="h-full w-full bg-repeat heropattern-plus-gray-700" />
        </div>
        <section className="container relative z-20 mx-auto grid grid-cols-1 gap-x-4 gap-y-20 py-16 lg:grid-cols-2">
          <div className="flex flex-col items-center justify-center text-center lg:items-start lg:text-left">
            <h1 className="mb-4 text-6xl font-bold xl:text-7xl">
              Collection Name
            </h1>
            <h2 className="mb-12 text-4xl font-bold text-teal-400 underline decoration-indigo-400/30 xl:text-5xl">
              NFT Project
            </h2>
            <p className="text-md mb-10 font-medium text-gray-300 xl:text-lg">
              Meet a collection of 1000+ amazing figures with different
              attributes and styles!
            </p>
            <div className="flex flex-col items-center space-x-4 space-y-4 sm:flex-row sm:space-y-0">
              <a href="#">
                <div className="flex w-fit space-x-2 rounded-2xl bg-gray-600 px-4 py-3 font-semibold shadow-lg transition-all duration-300 hover:-translate-y-[1px] hover:bg-gray-700">
                  <span>Join Discord</span>{' '}
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 640 512"
                    height={24}
                    width={24}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
                  </svg>
                </div>
              </a>
              <a href="#">
                <div className="flex w-fit space-x-2 rounded-2xl bg-teal-600 px-4 py-3 font-semibold shadow-lg shadow-teal-500/20 transition-all duration-300 hover:-translate-y-[1px] hover:bg-teal-700">
                  <span>Shop on Opensea</span>{' '}
                  <Image
                    src="/right-arrow.svg"
                    height={30}
                    width={30}
                    alt="Arrow pointing right"
                  />
                </div>
              </a>
            </div>
          </div>
          <div className="ml-10 flex justify-center">
            <div className="relative -skew-y-3 mt-24 z-10 skew-x-6">
              <div className="h-[15rem] w-[11rem] rounded-2xl bg-gray-900 shadow-xl xl:h-[23rem] xl:w-[18rem]">
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
                    {/* <img
                      alt="Top Card"
                      src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                      decoding="async"
                      data-nimg="fill"
                      className="heroCard"
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
                      <p className="text-xs text-gray-300 xl:text-sm">#8258</p>
                      <p className="text-md font-medium text-indigo-300 xl:text-xl">
                        1.48 ETH
                      </p>
                    </div>
                  </div>
                  <a
                    target="_blank"
                    href="https://opensea.io/"
                    rel="noreferrer"
                  >
                    <div className="xl:text-md hidden w-fit space-x-2 rounded-2xl bg-teal-600 px-2 py-3 text-sm font-semibold shadow-lg shadow-teal-500/20 transition-all duration-300 hover:bg-teal-700 xl:flex xl:px-4">
                      Buy Now
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="relative skew-y-3 -translate-x-20 animate-pulse -skew-x-6">
              <div className="h-[15rem] w-[11rem] rounded-2xl bg-gray-900 shadow-xl xl:h-[23rem] xl:w-[18rem]">
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
                    {/* <img
                      alt="Back Card"
                      src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                      decoding="async"
                      data-nimg="fill"
                      className="heroCard"
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
                      <p className="text-md font-medium text-indigo-300 xl:text-xl">
                        1.48 ETH
                      </p>
                    </div>
                  </div>
                  <a
                    target="_blank"
                    href="https://opensea.io/"
                    rel="noreferrer"
                  >
                    <div className="xl:text-md hidden w-fit space-x-2 rounded-2xl bg-teal-600 px-2 py-3 text-sm font-semibold shadow-lg shadow-teal-500/20 transition-all duration-300 hover:bg-teal-700 xl:flex xl:px-4">
                      Buy Now
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="gallery container relative z-10 mx-auto py-10"
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
        <Features />
        <Roadmap />
        <Team />
        <Faq />
      </main>

      <Footer />
    </div>
  );
};

export default Octospace;
