import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  ViewColumnsIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';
import { Network, Alchemy, Nft } from 'alchemy-sdk';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { Navbar } from '../components/Navbar';
import { classNames, debounce } from '../utils/helpers';

const sortOptions = [
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
];

const filters = [
  {
    id: 'background',
    name: 'Background',
    options: [
      { value: 'sunset', label: 'sunset', checked: false },
      { value: 'mountain', label: 'mountain', checked: false },
      { value: 'bushland', label: 'bushland', checked: false },
      { value: 'sunrise', label: 'sunrise', checked: false },
      { value: 'roadside', label: 'roadside', checked: false },
      { value: 'clouds', label: 'clouds', checked: false },
      { value: 'sonora', label: 'sonora', checked: false },
      { value: 'casino', label: 'casino', checked: false },
    ],
  },
  {
    id: 'core',
    name: 'Core',
    options: [
      { value: 'gyaru', label: 'gyaru', checked: false },
      { value: 'hypebeast', label: 'hypebeast', checked: false },
      { value: 'prep', label: 'prep', checked: false },
      { value: 'hypebeast-gyaru', label: 'hypebeast-gyaru', checked: false },
      { value: 'prep-gyaru', label: 'prep-gyaru', checked: false },
      { value: 'lolita', label: 'lolita', checked: false },
      { value: 'lolita-gyaru', label: 'lolita-gyaru', checked: false },
      { value: 'harajuku', label: 'harajuku', checked: false },
      { value: 'harajuku-gyaru', label: 'harajuku-gyaru', checked: false },
      { value: 'lolita-prep', label: 'lolita-prep', checked: false },
      { value: 'prep-hypebeast', label: 'prep-hypebeast', checked: false },
      { value: 'lolita-hypebeast', label: 'lolita-hypebeast', checked: false },
      { value: 'prep-harajuku', label: 'prep-harajuku', checked: false },
      {
        value: 'hypebeast-harajuku',
        label: 'hypebeast-harajuku',
        checked: false,
      },
      { value: 'lolita-harajuku', label: 'lolita-harajuku', checked: false },
    ],
  },
];

const settings = {
  apiKey: process.env.ALCHEMY_API,
  network: Network.ETH_MAINNET, // Replace with your network.
  maxRetries: 10,
};

const alchemy = new Alchemy(settings);

const miladyContract = {
  addressOrName: '0x5Af0D9827E0c53E4799BB226655A1de152A425a5',
};

async function fetchCollection({ pageParam = '0' }) {
  return alchemy.nft.getNftsForContract(miladyContract.addressOrName, {
    pageKey: pageParam,
    omitMetadata: false,
    pageSize: 12,
  });
}

async function fetchFoo(
  pageParam: string,
  contractAddress?: string,
  startToken?: string,
  filterOptions?: any
) {
  let bar = '';
  for (const [key, value] of Object.entries(filterOptions)) {
    bar += `${key}=${value}&`;
  }

  const data = await fetch(
    `/api/collection?` +
      `pageParam=${pageParam}&` +
      `contractAddress=${contractAddress}&` +
      `startToken=${startToken}&` +
      `limit=${12}&` +
      `${bar}`
  ).then((response) => response.json());
  return data;
}

export default function Gallery() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({});

  const { register, watch, getValues } = useForm();

  // const {
  //   data,
  //   isLoading,
  //   fetchNextPage: fetchNextFoo,
  // } = useInfiniteQuery(
  //   ['foo'],
  //   ({ pageParam = '0' }) =>
  //     fetchFoo(pageParam, miladyContract.addressOrName, '0', {
  //       Background: 'sunset',
  //     }),
  //   {
  //     getNextPageParam: (lastPage, pages) => lastPage.nextToken,
  //     refetchOnWindowFocus: false,
  //     enabled: false,
  //   }
  // );

  const {
    data: collection,
    isLoading: isLoadingCollection,
    fetchNextPage,
  } = useInfiniteQuery(['nftCollection'], fetchCollection, {
    getNextPageParam: (lastPage) => lastPage.pageKey,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const handleFormChange = () => {
    const [value] = getValues('Background');
    const newFilter = {
      value,
    };
    setFilterOptions(newFilter);
  };

  const renderCollection = () =>
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

  useEffect(() => {
    const DEBOUNCE_TIMER = 250;
    window.addEventListener(
      'scroll',
      debounce(function () {
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
          fetchNextPage();
        }
      }, DEBOUNCE_TIMER)
    );
  }, [fetchNextPage]);

  // if (isLoading) return <span>Loading...</span>;
  if (isLoadingCollection) return <span>Loading Collection...</span>;

  return (
    <>
      <Navbar />
      <div className="w-full">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 flex z-40">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                    <div className="px-4 flex items-center justify-between">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200">
                      {filters.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-t border-gray-200 px-4 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="w-full px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
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
                    <Menu.Items className="origin-top-left absolute left-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <a
                                href={option.href}
                                className={classNames(
                                  option.current
                                    ? 'font-medium text-gray-900'
                                    : 'text-gray-500',
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                {option.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View grid</span>
                  <ViewColumnsIcon className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                {/* Filters */}
                <form
                  onChange={handleFormChange}
                  className="sticky top-0 h-max hidden lg:block"
                >
                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                    {...register(`Background`)}
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>

                {/* Nft card grid */}
                <div className="lg:col-span-3">
                  <div className="h-full">
                    <div className="flex flex-wrap justify-around gap-3"></div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
