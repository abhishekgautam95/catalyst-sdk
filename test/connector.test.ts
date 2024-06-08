import { EthereumConnector } from '../src/connectors/EthereumConnector';
import { SolanaConnector } from '../src/connectors/SolanaConnector';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum: any;
  }
}

// Create a mock Ethereum provider
const mockEthereumProvider = {
  isMetaMask: true,
  request: jest.fn().mockResolvedValue(['0x0']),
  on: jest.fn(),
  removeListener: jest.fn(),
};

test('EthereumConnector should connect', async () => {
  // Mock the window.ethereum object
  window.ethereum = mockEthereumProvider;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const connector = new EthereumConnector(provider);
  await connector.connect();
  expect(provider.connection).toBeTruthy();
});

test('SolanaConnector should connect', async () => {
  const wallet = { connect: jest.fn(), disconnect: jest.fn() };  // Mock wallet
  const connector = new SolanaConnector(wallet);
  await connector.connect();
  expect(wallet.connect).toHaveBeenCalled();
});
