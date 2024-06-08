import { Connector, Transaction } from '../types';
import { ethers } from 'ethers';

export class EthereumConnector implements Connector {
  private provider: ethers.providers.Web3Provider;

  constructor(provider: ethers.providers.Web3Provider) {
    this.provider = provider;
  }

  async connect(): Promise<void> {
    await this.provider.send("eth_requestAccounts", []);
  }

  async disconnect(): Promise<void> {
    // Ethereum doesn't have a standard way to disconnect
  }

  async sendTransaction(tx: Transaction): Promise<string> {
    const signer = this.provider.getSigner();
    const transaction = await signer.sendTransaction({
      to: tx.to,
      value: ethers.utils.parseEther(tx.amount.toString())
    });
    return transaction.hash;
  }
}
