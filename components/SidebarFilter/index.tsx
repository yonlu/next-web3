import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { useFormContext } from 'react-hook-form';
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Fragment, useState } from 'react';

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
      { value: 'nagano', label: 'nagano', checked: false },
      { value: 'yashima', label: 'yashima', checked: false },
      { value: 'streets', label: 'streets', checked: false },
      { value: 'tennis', label: 'tennis', checked: false },
      { value: 'bjork', label: 'bjork', checked: false },
      { value: 'harajuku', label: 'harajuku', checked: false },
      { value: 'train', label: 'train', checked: false },
      { value: 'xp', label: 'xp', checked: false },
    ],
  },
  {
    id: 'core',
    name: 'Core',
    options: [
      { value: 'gyaru', label: 'gyaru', checked: false },
      { value: 'prep', label: 'prep', checked: false },
      { value: 'hypebeast', label: 'hypebeast', checked: false },
      { value: 'prep-gyaru', label: 'prep-gyaru', checked: false },
      { value: 'lolita', label: 'lolita', checked: false },
      { value: 'hypebeast-gyaru', label: 'hypebeast-gyaru', checked: false },
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
  {
    id: 'drip-grade',
    name: 'Drip Grade',
    options: [
      { value: 'normal', label: 'normal', checked: false },
      { value: 'b-drip', label: 'b-drip', checked: false },
      { value: 'c-drip', label: 'c-drip', checked: false },
      { value: 'a-drip', label: 'a-drip', checked: false },
      { value: 's-drip', label: 's-drip', checked: false },
      { value: 'ss-drip', label: 'ss-drip', checked: false },
    ],
  },
  {
    id: 'earring',
    name: 'Earring',
    options: [
      {
        value: 'loop chain earring',
        label: 'loop chain earring',
        checked: false,
      },
      { value: 'cherry earring', label: 'cherry earring', checked: false },
      {
        value: 'double safety pins',
        label: 'double safety pins',
        checked: false,
      },
    ],
  },
  {
    id: 'hair',
    name: 'Hair',
    options: [
      { value: 'bowl brown', label: 'bowl brown', checked: false },
      { value: 'tuft green', label: 'tuft green', checked: false },
      { value: 'bowl slate', label: 'bowl slate', checked: false },
      { value: 'og orange', label: 'og orange', checked: false },
      { value: 'bowl green', label: 'bowl green', checked: false },
      { value: 'tuft dark', label: 'tuft dark', checked: false },
      { value: 'bowl dark', label: 'bowl dark', checked: false },
      { value: 'og black', label: 'og black', checked: false },
      { value: 'og blonde', label: 'og blonde', checked: false },
    ],
  },
];

const SidebarFilter = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { register } = useFormContext();

  return (
    <div className="w-80">
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
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
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
      <form className="sticky top-0 h-max hidden lg:block overflow-y-scroll max-h-screen">
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
                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-6">
                  <div className="space-y-4">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.value} className="flex items-center">
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
    </div>
  );
};

export { SidebarFilter };
