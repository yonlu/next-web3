import { createContext, ReactNode, useContext, useState } from 'react';
import { Result } from 'ethers/lib/utils';
import { NFTData } from '@web3-ui/components';
import base64 from 'base-64';

interface PreviewProviderProps {
  children: ReactNode;
}

interface PreviewContextData {
  metadata: NFTData | undefined;
  fetchMetadata(readData: Result): void;
}

const PreviewContext = createContext({} as PreviewContextData);

const PreviewProvider = ({ children }: PreviewProviderProps) => {
  const [metadata, setMetadata] = useState<NFTData | undefined>(undefined);
  const [tokenId, setTokenId] = useState<string | null>(null);

  const fetchMetadata = (readData: Result) => {
    const [, base64Metadata] = readData.split(',');
    const { image: imageUrl, name } = JSON.parse(base64.decode(base64Metadata));

    const responseMetadata = {
      tokenId: '1',
      imageUrl,
      name,
      assetContractSymbol: 'SQUARE',
      assetContractName: 'SquareNFT',
    };

    console.log('Preview metadata: ', responseMetadata);
    setMetadata(responseMetadata);
  };

  return (
    <PreviewContext.Provider
      value={{
        metadata,
        fetchMetadata,
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
};

const usePreview = () => {
  const context = useContext(PreviewContext);

  return context;
};

export { PreviewProvider, usePreview };
