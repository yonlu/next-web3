import ethers from 'ethers';
import { InjectedConnector } from '@web3-react/injected-connector';
import getLibrary from '../utils/getLibrary';

export const injected = new InjectedConnector({
  supportedChainIds: [4],
});
