import { Fragment, useState, useEffect, useCallback, useRef } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  ViewColumnsIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { classNames } from '../utils/helpers';
import { GalleryGrid, Navbar, SkeletonCard } from '../components';

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

async function postMultipleNft() {
  await axios.post('/api/test');
}

async function fetchMiladies(key: any, attributesFilter?: any) {
  const response = await axios.get('/api/filter', {
    params: {
      Background: attributesFilter.Background,
      Core: attributesFilter.Core,
      pageParam: key ?? 0,
    },
  });
  return response.data;
}

const Gallery = () => {
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const myRef = useRef<HTMLElement>(null);

  const { register, getValues, watch } = useForm();

  const { data, isLoading, fetchStatus, fetchNextPage } = useInfiniteQuery(
    ['nfts', filterOptions],
    ({ queryKey, pageParam = 0 }) => fetchMiladies(pageParam, queryKey[1]),
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    }
  );

  const handleFilterActive = useCallback((filters: any) => {
    let active = false;
    for (const k in filters) {
      if (filters[k]?.length !== 0 || filters[k] !== 'undefined') {
        active = true;
      }
    }
    setIsFilterActive(active);
  }, []);

  const handleFormChange = () => {
    const values = getValues();
    setFilterOptions(values);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setIsVisible(entry.isIntersecting);
    });

    if (myRef.current !== null) {
      observer.observe(myRef.current);
    }
  }, []);

  useEffect(() => {
    handleFilterActive(filterOptions);
  }, [filterOptions, handleFilterActive]);

  useEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [isVisible, fetchNextPage]);

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
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                {/* Filters */}
                <form
                  onChange={handleFormChange}
                  className="sticky top-0 h-max hidden lg:block overflow-y-scroll max-h-screen"
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
                                    {...register(`${section.name}`)}
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
                {isLoading && fetchStatus === 'fetching' ? (
                  <SkeletonCard />
                ) : (
                  <GalleryGrid nftCollection={data} />
                )}
              </div>
            </section>
          </main>

          <footer ref={myRef}>Footer</footer>
        </div>
      </div>
    </>
  );
};

export default Gallery;
