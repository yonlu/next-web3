import dynamic from 'next/dynamic';
import { Fragment, useState, useEffect, useCallback, useRef } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  FunnelIcon,
  ViewColumnsIcon,
} from '@heroicons/react/20/solid';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import axios from 'axios';

import { classNames } from '../utils/helpers';
import { Navbar, SidebarFilter, SkeletonCard } from '../components';

const sortOptions = [
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
];

async function fetchMiladies(key: any, attributesFilter?: any) {
  return axios
    .get('/api/filter', {
      params: {
        Background: attributesFilter.Background,
        Core: attributesFilter.Core,
        Hair: attributesFilter.Hair,
        'Drip Grade': attributesFilter['Drip Grade'],
        Earring: attributesFilter.Earring,
        pageParam: key ?? 0,
      },
    })
    .then((res) => res.data);
}

interface GalleryGridProps {
  nftCollection: any;
}

const GalleryGridNoSSR = dynamic<GalleryGridProps>(
  () =>
    import('../components/GalleryGrid').then((module) => module.GalleryGrid),
  {
    ssr: false,
  }
);

const FilterBadge = ({ activeFilters }: any) => {
  const [filters, setFilters] = useState<{ name: string; options: any }[]>([]);

  const parseFilters = useCallback(() => {
    const parsedFilters = [];

    for (const [key, value] of Object.entries(activeFilters)) {
      parsedFilters.push({
        name: key,
        options: value,
      });
    }
    setFilters(parsedFilters);
  }, [activeFilters]);

  useEffect(() => {
    parseFilters();
  }, [activeFilters, parseFilters]);

  return (
    <>
      {filters?.map((filter) =>
        filter.options?.map((option: any) => (
          <span
            key={option}
            className="inline-flex items-center rounded-lg bg-gray-100 px-5 py-3 text-base font-semibold text-gray-800"
          >
            {`${filter.name}: ${option}`}
          </span>
        ))
      )}
    </>
  );
};

const Gallery = ({ data }: any) => {
  const [filterOptions, setFilterOptions] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const myRef = useRef<HTMLElement>(null);

  const methods = useForm();

  const {
    data: nfts,
    isLoading,
    fetchStatus,
    fetchNextPage,
  } = useInfiniteQuery(
    ['nfts', filterOptions],
    ({ queryKey, pageParam = 0 }) => fetchMiladies(pageParam, queryKey[1]),
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
      initialData: data,
    }
  );

  const resetField = () => {
    methods.resetField('Background');
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
    if (isVisible) {
      fetchNextPage();
    }
  }, [isVisible, fetchNextPage]);

  useEffect(() => {
    const subscription = methods.watch((value) => setFilterOptions(value));
    return () => subscription.unsubscribe();
  }, [methods, methods.watch, filterOptions]);

  return (
    <>
      <Navbar />

      <div className="w-full">
        <pre>{JSON.stringify(methods.watch())}</pre>
      </div>
      <div className="w-full">
        <button onClick={resetField}>Reset Background</button>
      </div>
      <div className="w-full">
        <div>
          {/* Mobile filter dialog */}

          <main className="w-full sm:px-6">
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
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <div className="flex w-full">
                {/* Filters */}
                <FormProvider {...methods}>
                  <SidebarFilter />
                </FormProvider>

                {/* Nft card grid */}
                <div className="flex flex-col w-full ml-4">
                  <div className="flex flex-wrap mb-4 gap-2">
                    <FilterBadge activeFilters={filterOptions} />
                  </div>
                  {isLoading && fetchStatus === 'fetching' ? (
                    <SkeletonCard />
                  ) : (
                    <GalleryGridNoSSR nftCollection={nfts} />
                  )}
                </div>
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

export async function getStaticProps() {
  const { data } = await axios.get('http://localhost:3000/api/filter', {
    params: {
      pageParam: 0,
    },
  });

  return { props: { data } };
}
