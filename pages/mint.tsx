import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Link,
  Spinner,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import { ConnectWallet, useWallet, useWriteContract } from '@web3-ui/core';
import { BigNumber, BigNumberish, ethers } from 'ethers';
import base64 from 'base-64';
import Image from 'next/image';
import { Address, NFTCard, NFTData } from '@web3-ui/components';

import styles from '../styles/Home.module.css';
import twitterLogo from '../assets/twitter-logo.svg';
import myEpicNft from '../utils/myEpicNft.json';
import { TransactionResponse } from '@ethersproject/providers';

const TWITTER_HANDLE = 'lsallada';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const CONTRACT_ADDRESS = '0x683C127679e3DceB7d876f8E8729BFB50164ae83';
const OPENSEA_LINK =
  'https://testnets.opensea.io/collection/squarenft-ehklsoebyt';

const Home: NextPage = () => {
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [metadata, setMetadata] = useState();
  const [balance, setBalance] = useState<string>('');
  const [mintedTokenIds, setMintedTokenIds] = useState([1, 2, 3]);

  const { connection, connected, readOnlyProvider } = useWallet();

  const [mintContract, isReady] = useWriteContract(
    CONTRACT_ADDRESS,
    myEpicNft.abi
  );

  const nftData: NFTData = {
    tokenId: '1',
    imageUrl: metadata,
    name: 'Test name',
    assetContractName: 'Test asset contract name',
    assetContractSymbol: 'TEST',
  };

  const getBalance = useCallback(async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      if (connection.userAddress) {
        const balance = await ethereum
          .request({
            method: 'eth_getBalance',
            params: [connection.userAddress, 'latest'],
          })
          .then((userBalance: BigNumberish) =>
            ethers.utils.formatEther(userBalance).substring(0, 5)
          );
        setBalance(balance);
      }
    } catch (error) {
      console.log(error);
    }
  }, [connection.userAddress]);

  const setupEventListener = async () => {
    if (connected && isReady) {
      mintContract?.on('NewEpicNFTMinted', async (from, tokenId: BigNumber) => {
        if (from === connection.userAddress) {
          console.log(from, tokenId.toNumber());
          fetchMetaData(tokenId.toNumber());
        }
      });
    }
  };

  const mint = async () => {
    try {
      setupEventListener();
      const response: TransactionResponse = await mintContract?.makeAnEpicNFT();
      setIsMinting(true);
      await response.wait();

      console.log(
        `Mined, see transaction: https://rinkeby.etherscan.io/tx/${response.hash}`
      );
      setIsMinting(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMetaData = async (tokenURI: number) => {
    if (isReady) {
      try {
        const response = await mintContract?.tokenURI(tokenURI);
        const [, base64Metadata] = response.split(',');
        const obj = JSON.parse(decodeBase64(base64Metadata));
        setMetadata(obj.image);

        console.log(obj.image);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const decodeBase64 = (input: string) => {
    return base64.decode(input);
  };

  // Render functions

  const renderLoadingUI = () => (
    <Flex justifyContent="center">
      <Spinner
        w="128px"
        h="128px"
        speed="0.75s"
        color="green.400"
        emptyColor="gray.700"
      />
    </Flex>
  );

  const renderBalanceUI = () => (
    <Flex
      alignItems="center"
      bg="rgb(25, 27, 31)"
      borderRadius="1rem"
      height="40px"
    >
      <Box pl="0.75rem" pr="0.5rem">
        {balance ?? '0.00'} ETH
      </Box>
      <Button
        bg="rgb(33, 35, 41)"
        border="1px solid rgb(33, 36, 41)"
        color="rgb(255, 255,  255)"
        _hover={{ bg: 'rgb(39, 41, 47)' }}
      >
        <Address value={`${connection.userAddress}`} shortened />
      </Button>
    </Flex>
  );

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <Flex color="white" justifyContent="space-between" p="1rem" w="100%">
          <Heading>My NFT Collection</Heading>
          {connected ? (
            renderBalanceUI()
          ) : (
            <ButtonGroup colorScheme="green">
              <ConnectWallet />
            </ButtonGroup>
          )}
        </Flex>
        <div className={styles['header-container']}>
          <p className={`${styles.header} ${styles['gradient-text']}`}>
            My NFT Collection
          </p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          {connected ? (
            <Button onClick={mint} colorScheme="green">
              Mint
            </Button>
          ) : null}
        </div>
        {/* <Image
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHByZXNlcnZlQXNwZWN0UmF0aW89J3hNaW5ZTWluIG1lZXQnIHZpZXdCb3g9JzAgMCAzNTAgMzUwJz48c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDI0cHg7IH08L3N0eWxlPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9JyM4MEZGREInLz48dGV4dCB4PSc1MCUnIHk9JzUwJScgY2xhc3M9J2Jhc2UnIGRvbWluYW50LWJhc2VsaW5lPSdtaWRkbGUnIHRleHQtYW5jaG9yPSdtaWRkbGUnPlRpbWlkIFNjYWxhIE1vYmlsZS1EZXZlbG9wZXI8L3RleHQ+PC9zdmc+"
            width="313px"
            height="313px"
            alt="NFT"
          /> */}
        {isMinting ? renderLoadingUI() : null}
        {metadata && !isMinting ? <NFTCard data={nftData} size="sm" /> : null}
        <div className={styles['footer-container']}>
          <Flex alignItems="center">
            <Image
              alt="Twitter Logo"
              className={styles['twitter-logo']}
              src={twitterLogo}
              width="32px"
              height="32px"
            />
            <a
              className={styles['footer-text']}
              href={TWITTER_LINK}
              target="_blank"
              rel="noreferrer"
            >{`built by @${TWITTER_HANDLE}`}</a>
          </Flex>
          <Link
            href={OPENSEA_LINK}
            color="white"
            fontSize="16px"
            fontWeight="700"
          >
            🌊 View Collection on OpenSea
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
