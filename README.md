# Catalyst SDK

Catalyst SDK for cross-chain transfers using Wormhole Connect.

## Installation

```bash
npm install catalyst-sdk
```

## Usage

### Ethereum Connector

```typescript
import { EthereumConnector } from 'catalyst-sdk';
import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const ethConnector = new EthereumConnector(provider);

await ethConnector.connect();
```

### Solana Connector

```typescript
import { SolanaConnector } from 'catalyst-sdk';

const wallet = /* instance of a Solana wallet adapter like Phantom */;
const solConnector = new SolanaConnector(wallet);

await solConnector.connect();
```
# catalyst-sdk
