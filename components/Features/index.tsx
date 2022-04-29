const Features = () => {
  return (
    <section id="features">
      <div className="container relative mx-auto flex flex-col-reverse bg-repeat heropattern-topography-gray-700 lg:grid lg:grid-cols-2">
        <div className="absolute -bottom-44 -left-4 h-72 w-72 animate-blob rounded-full bg-sky-500/30 mix-blend-overlay blur-2xl filter" />
        <div className="animation-delay-2000 absolute top-0 -right-4 h-96 w-96 animate-blob rounded-full bg-yellow-200/20 mix-blend-overlay blur-2xl filter" />
        <div className="animation-delay-4000 absolute top-44 left-44 h-72 w-72 animate-blob rounded-full bg-indigo-300/30 mix-blend-overlay blur-2xl filter" />
        <div className="flex flex-1 flex-col justify-center">
          <h3 className="mb-4 text-center text-3xl font-semibold underline decoration-indigo-500/80 lg:text-left xl:text-4xl">
            1000+ Figures Collection
          </h3>
          <p className="text-center text-gray-300 lg:text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="relative my-10 mx-auto h-[10rem] w-full transition-transform duration-300 hover:-translate-y-3 lg:h-[18rem] lg:w-[18rem]">
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
              alt="1000+ FIgures Collection Image"
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
      </div>
      <div className="container relative mx-auto flex flex-col lg:grid lg:grid-cols-2">
        <div className="relative my-10 h-[10rem] w-full transition-transform duration-300 hover:-translate-y-3 lg:h-[18rem] lg:w-[18rem]">
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
            <img
              alt="Unique Attributes Image"
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
            />
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <h3 className="mb-4 text-center text-3xl font-semibold underline decoration-indigo-500/80 lg:text-left xl:text-4xl">
            Unique Attributes
          </h3>
          <p className="text-center text-gray-300 lg:text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </section>
  );
};

export { Features };
