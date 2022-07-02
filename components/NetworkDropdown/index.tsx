// MOOSE deprecated
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useWallet } from '@web3-ui/core';
import { Fragment } from 'react';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

interface NetworkDropdownProps {
  network: keyof typeof NetworkColor;
}

const NetworkColor = {
  mainnet: 'bg-green-500',
  rinkeby: 'bg-yellow-500',
  ropsten: 'bg-pink-500',
  kovan: 'bg-purple-500',
  goerli: 'bg-blue-500',
};

const NetworkDropdown = ({ network }: NetworkDropdownProps) => {
  const { connection, connected, correctNetwork, disconnectWallet } =
    useWallet();

  const getValueOrFalse = (name: string) => {
    if (isObjKey(name, NetworkColor)) {
      // name narrowed to NetworkColor keys
      return NetworkColor[name];
    }

    return false;
  };

  function isObjKey<T>(key: PropertyKey, obj: T): key is keyof T {
    return key in obj;
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="items-center gap-1  rounded-2xl inline-flex justify-center w-full border border-gray-300 shadow-sm px-4 py-2 bg-white  capitalize text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          <span
            className={`h-4 w-4 mr-2 rounded-full ${NetworkColor[network]} `}
          />
          {/* {correctNetwork ? network : `${network} wrong!`} */}
          {network}
          <ChevronDownIcon className="-mr-1 ml-2 h-6 w-6" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Account settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Support
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={disconnectWallet}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block w-full text-left px-4 py-2 text-sm'
                  )}
                >
                  Disconnect Wallet
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export { NetworkDropdown };
