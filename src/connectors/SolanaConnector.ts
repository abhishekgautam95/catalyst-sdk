import { Connector, Transaction } from '../types';
import { Connection, PublicKey, clusterApiUrl, Transaction as SolanaTransaction, LAMPORTS_PER_SOL, SystemProgram } from '@solana/web3.js';

export class SolanaConnector implements Connector {
  private connection: Connection;
  private wallet: any;  // This would be an instance of a wallet adapter like Phantom

  constructor(wallet: any) {
    this.wallet = wallet;
    this.connection = new Connection(clusterApiUrl('mainnet-beta'));
  }

  async connect(): Promise<void> {
    await this.wallet.connect();
  }

  async disconnect(): Promise<void> {
    await this.wallet.disconnect();
  }

  async sendTransaction(tx: Transaction): Promise<string> {
    const transaction = new SolanaTransaction().add(
      SystemProgram.transfer({
        fromPubkey: this.wallet.publicKey,
        toPubkey: new PublicKey(tx.to),
        lamports: tx.amount * LAMPORTS_PER_SOL
      })
    );
    const { signature } = await this.wallet.sendTransaction(transaction, this.connection);
    return signature;
  }
}

