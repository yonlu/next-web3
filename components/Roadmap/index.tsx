const Roadmap = () => {
  return (
    <section id="roadmap" className="container relative mx-auto py-12">
      <h3 className="mb-8 text-center text-3xl font-semibold underline decoration-indigo-500/80 lg:text-left xl:text-4xl">
        Roadmap
      </h3>
      <div className="relative flex flex-col">
        <div className="absolute left-[50%] h-full w-[2px] rounded-full bg-indigo-300/60 blur-sm lg:left-[44px]" />
        <div className="my-3 flex flex-col items-center space-x-4 space-y-4 rounded-xl bg-gray-900 px-4 py-6 shadow-lg transition duration-300 hover:shadow-2xl lg:flex-row">
          <div className="z-50 rounded-full bg-teal-600 px-6 text-xl font-semibold shadow-lg shadow-teal-500/30">
            <span>1</span>
          </div>
          <div>
            <h3 className="mb-2 text-center text-2xl font-semibold lg:text-left">
              20% ETH Donation
            </h3>
            <p className="text-center text-gray-300 lg:text-left">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit
            </p>
          </div>
        </div>
        <div className="my-3 flex flex-col items-center space-x-4 space-y-4 rounded-xl bg-gray-900 px-4 py-6 shadow-lg transition duration-300 hover:shadow-2xl lg:flex-row">
          <div className="z-50 rounded-full bg-teal-600 px-6 text-xl font-semibold shadow-lg shadow-teal-500/30">
            <span>2</span>
          </div>
          <div>
            <h3 className="mb-2 text-center text-2xl font-semibold lg:text-left">
              Sending ETH to other projects
            </h3>
            <p className="text-center text-gray-300 lg:text-left">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit
            </p>
          </div>
        </div>
        <div className="my-3 flex flex-col items-center space-x-4 space-y-4 rounded-xl bg-gray-900 px-4 py-6 shadow-lg transition duration-300 hover:shadow-2xl lg:flex-row">
          <div className="rounded-full bg-teal-600 px-6 text-xl font-semibold shadow-lg shadow-teal-500/30">
            <span>3</span>
          </div>
          <div>
            <h3 className="mb-2 text-center text-2xl font-semibold lg:text-left">
              All NFTs Sold
            </h3>
            <p className="text-center text-gray-300 lg:text-left">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Roadmap };
