const Faq = () => {
  return (
    <section id="faq" className="container relative mx-auto py-12">
      <h3 className="mb-14 text-center text-3xl font-semibold underline decoration-indigo-500/80 lg:text-left xl:text-4xl">
        Frequently Asked Questions
      </h3>
      <div className="my-6">
        <div className="rounded-t-2xl bg-violet-700/80 flex w-full cursor-pointer select-none items-center justify-between border-2 border-teal-600/30 px-4 py-4 text-gray-300 transition duration-300 hover:border-teal-600/80 hover:text-white">
          <h4 className="text-lg font-medium">What is Natured Developers?</h4>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 448 512"
            height={22}
            width={22}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
        </div>
        <div className="inline-flex w-full rounded-b-2xl border-x-2 border-b-2 border-dashed border-neutral-900/30 px-4 py-4 text-gray-600">
          <h5>
            Natured Developers is a collection of 1000+ amazing figures with
            different attributes and styles hosted on Ethereum.
          </h5>
        </div>
      </div>
      <div className="my-6">
        <div className="rounded-t-2xl bg-violet-700/80 flex w-full cursor-pointer select-none items-center justify-between border-2 border-gray-900/30 px-4 py-4 text-gray-300 transition duration-300 hover:border-teal-600/80 hover:text-white">
          <h4 className="text-lg font-medium">
            How much does it cost to mint?
          </h4>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 448 512"
            height={22}
            width={22}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
        </div>
        <div className="inline-flex w-full rounded-b-2xl border-x-2 border-b-2 border-dashed border-teal-600/30 px-4 py-4 text-gray-600">
          <h5>0.01 Ether</h5>
        </div>
      </div>
    </section>
  );
};

export { Faq };
