import { Address } from '@web3-ui/components';
import { useWallet } from '@web3-ui/core';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { NetworkDropdown } from '../NetworkDropdown';

const Header = () => {
  const [balance, setBalance] = useState<string>('');
  const { connection, connected, connectWallet } = useWallet();

  const getWalletBalance = useCallback(async () => {
    if (connected) {
      const userBalance = await connection.signer?.getBalance();
      if (userBalance) {
        const parsedBalance = ethers.utils
          .formatEther(userBalance)
          .substring(0, 5);
        setBalance(parsedBalance);
      }
    }
  }, [connected, connection.signer]);

  const renderBalanceUI = () => (
    <div className="flex gap-1 rounded-2xl bg-gradient-to-r from-purple-500 via-violet-400 to-indigo-400 bg-size-200 bg-pos-0 px-4 py-2 font-semibold shadow-lg shadow-white/10 transition-all duration-300 hover:bg-pos-100">
      <div>{balance ?? '0.00'} ETH |</div>
      <div>
        <Address value={`${connection.userAddress}`} shortened />
      </div>
    </div>
  );

  const renderNetworkDropdown = () => {
    if (
      connection.network === 'mainnet' ||
      connection.network === 'rinkeby' ||
      connection.network === 'ropsten' ||
      connection.network === 'kovan' ||
      connection.network === 'goerli'
    ) {
      return <NetworkDropdown network={connection.network} />;
    }
  };

  useEffect(() => {
    getWalletBalance();
  }, [getWalletBalance, connection.network]);

  return (
    <header className="flex w-full flex-col text-white p-6 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <a href="#">
            <div className="relative flex h-10 w-52 items-center">
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
                  alt="nft project logo"
                  src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                  decoding="async"
                  data-nimg="fill"
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
                    objectFit: 'contain',
                  }}
                /> */}
              </span>
            </div>
          </a>
          <div className="ml-10 hidden xl:flex">
            <nav className="space-x-6 text-gray-500">
              <a
                className="transition duration-300 hover:text-gray-900"
                href="#gallery"
              >
                Gallery
              </a>
              <a
                className="transition duration-300 hover:text-gray-900"
                href="#features"
              >
                Features
              </a>
              <a
                className="transition duration-300 hover:text-gray-900"
                href="#roadmap"
              >
                Roadmap
              </a>
              <a
                className="transition duration-300 hover:text-gray-900"
                href="#team"
              >
                Team
              </a>
              <a
                className="transition duration-300 hover:text-gray-900"
                href="#faq"
              >
                FAQ
              </a>
            </nav>
          </div>
        </div>
        <div className="hidden items-center space-x-4 md:inline-flex">
          <>
            {connected && renderNetworkDropdown()}
            {connected ? (
              renderBalanceUI()
            ) : (
              <button
                onClick={connectWallet}
                className="rounded-2xl bg-gradient-to-r from-purple-500 via-violet-400 to-indigo-400 bg-size-200 bg-pos-0 px-4 py-2 font-semibold shadow-lg shadow-white/10 transition-all duration-300 hover:bg-pos-100"
              >
                Connect Wallet
              </button>
            )}
          </>
        </div>
        <div className="inline-flex md:hidden">
          <div className="cursor-pointer rounded-full bg-indigo-500 p-2 shadow-lg shadow-white/10 transition-colors hover:bg-indigo-600">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 448 512"
              height={22}
              width={22}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="hidden">
        <div className="relative flex w-full flex-col space-y-4 bg-transparent px-6 pb-2 pt-8">
          <h4 className="mb-2 text-lg">Useful Links:</h4>
          <a
            className="text-gray-300 transition duration-300 hover:text-white"
            href="#gallery"
          >
            Gallery
          </a>
          <a
            className="text-gray-300 transition duration-300 hover:text-white"
            href="#features"
          >
            Features
          </a>
          <a
            className="text-gray-300 transition duration-300 hover:text-white"
            href="#roadmap"
          >
            Roadmap
          </a>
          <a
            className="text-gray-300 transition duration-300 hover:text-white"
            href="#team"
          >
            Team
          </a>
          <a
            className="text-gray-300 transition duration-300 hover:text-white"
            href="#faq"
          >
            FAQ
          </a>
          <div className="flex items-center space-x-5">
            <a href="#">
              <div className="rounded-full bg-gray-500 hover:bg-gray-600 p-2 shadow-lg shadow-white/10 transition duration-300 hover:scale-110">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 640 512"
                  height={28}
                  width={28}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
                </svg>
              </div>
            </a>
            <a href="#">
              <div className="rounded-full bg-indigo-400 hover:bg-indigo-500 p-2 shadow-lg shadow-white/10 transition duration-300 hover:scale-110">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 448 512"
                  height={28}
                  width={28}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </div>
            </a>
            <a href="#">
              <div className="rounded-full bg-indigo-400 hover:bg-indigo-500 p-2 shadow-lg shadow-white/10 transition duration-300 hover:scale-110">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 512 512"
                  height={28}
                  width={28}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                </svg>
              </div>
            </a>
          </div>
          <a href="#">
            <div className="w-fit rounded-2xl bg-gradient-to-r from-indigo-500 via-teal-600 to-indigo-500 bg-size-200 bg-pos-0 px-4 py-2 font-semibold shadow-lg shadow-white/10 transition-all duration-300 hover:bg-pos-100">
              View on OpenSea
            </div>
          </a>
          <a href="#">
            <div className="w-fit rounded-2xl bg-gradient-to-r from-indigo-500 via-teal-600 to-indigo-500 bg-size-200 bg-pos-0 px-4 py-2 font-semibold shadow-lg shadow-white/10 transition-all duration-300 hover:bg-pos-100">
              Test
            </div>
          </a>
        </div>
      </div>
    </header>
  );
};

export { Header };