export interface Connector {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

export interface Transaction {
  from: string;
  to: string;
  amount: number;
  txHash: string;
}
