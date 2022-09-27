import Link from 'next/link';

interface GalleryGridProps {
  nftCollection: any;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ nftCollection }) => {
  return (
    <div className="lg:col-span-3">
      <div className="h-full">
        <div className="flex flex-wrap justify-around gap-3">
          {nftCollection &&
            nftCollection?.map((token: any) => {
              return (
                <Link
                  href={`tokens/${token?.id}`}
                  key={`${token?.contract?.address} - ${token?.id}`}
                >
                  <a>
                    <div className="max-w-[16rem] bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                      <div>
                        <img src={token['img_src']} alt="" />
                      </div>
                      <div className="px-4 py-3 sm:p-2">
                        <div className="w-[80%]">{token?.title}</div>
                      </div>
                    </div>
                  </a>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export { GalleryGrid };
