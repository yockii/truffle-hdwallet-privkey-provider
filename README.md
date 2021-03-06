# truffle-hdwallet-privkey-provider
HD Wallet-enabled Web3 provider. Use it to sign transactions for addresses derived from private keys.

## Install

```
$ npm install truffle-hdwallet-privkey-provider
```

## Requirements
```
Node >= 7.6
```

## General Usage

You can use this provider wherever a Web3 provider is needed (for version 0.x), not just in Truffle. For Truffle-specific usage, see next section.

```javascript
var HDWalletProvider = require("truffle-hdwallet-privkey-provider");
var privKeys = ['<Your Private Key>'];
var provider = new HDWalletProvider(privKeys, "http://localhost:8545");
```

Currently, the `HDWalletProvider` manages only one address at a time, but it can be easily upgraded to manage (i.e., "unlock") multiple addresses.

Parameters:

- `privKeys`: `string`. the private key array which addresses are created from.
- `provider_uri`: `string`. URI of Ethereum client to send all other non-transaction-related Web3 requests.
- `index`: `number`, optional. If specified, will tell the provider to manage the address at the index specified. Defaults to the first address (index `0`).

## Truffle Usage

You can easily use this within a Truffle configuration. For instance:

truffle.js
```javascript
var HDWalletProvider = require("truffle-hdwallet-privkey-provider");

var privKeys = ['<Your Private Key>'];

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      // must be a thunk, otherwise truffle commands may hang in CI
      provider: () =>
        new HDWalletProvider(privKeys, "https://ropsten.infura.io/<Your Infura Key>"),
      network_id: '3',
    }
  }
};
```
