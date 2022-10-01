const SkeletonCard: React.FC = () => {
  return (
    <div className="lg:col-span-3">
      <div className="h-full">
        <div className="flex flex-wrap justify-around gap-3">
          <a className="bg-gray-300 h-[361px]">
            <div className="w-[16rem] overflow-hidden shadow rounded-lg divide-y ">
              <div>
                <img src="#" alt="" />
              </div>
              <div className="px-4 py-3 sm:p-2">
                <div className="w-[80%]"></div>
              </div>
            </div>
          </a>
          <a className="bg-gray-300">
            <div className="w-[16rem] overflow-hidden shadow rounded-lg divide-y ">
              <div>
                <img src="#" alt="" />
              </div>
              <div className="px-4 py-3 sm:p-2">
                <div className="w-[80%]"></div>
              </div>
            </div>
          </a>
          <a className="bg-gray-300 h-14">
            <div className="w-[16rem] overflow-hidden shadow rounded-lg divide-y ">
              <div>
                <img src="#" alt="" />
              </div>
              <div className="px-4 py-3 sm:p-2">
                <div className="w-[80%]"></div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export { SkeletonCard };
