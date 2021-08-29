require("dotenv").config();
/* Truffle build-in Wallet */
const HDWalletProvider = require('@truffle/hdwallet-provider');
/* Getting the Mnemonic */
const mnemonic = require("./secrets.json").mnemonic;
const node = process.env.ROPSTEN_NODE;

module.exports = {
    // Configure Networks
    networks: {
        development: {
            host: "127.0.0.1",     // Localhost (default: none)
            port: 8545,            // Standard Ethereum port (default: none)
            network_id: "*",       // Any network (default: none)
        },
        ropsten: {
            provider: () => new HDWalletProvider(mnemonic, node),
            network_id: 3,       // Ropsten's id
            networkCheckTimeout: 1000000,
            gas: 5500000,        // Ropsten has a lower block limit than mainnet
            confirmations: 2,    // # of confs to wait between deployments. (default: 0)
            timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
            skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
        },
    },
    // Configure Output of Build
    contracts_directory: './src/contracts/',
    contracts_build_directory: './src/abis/',
    // Configure your compilers
    compilers: {
        solc: {
            version: "0.8.4",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200
                },
            }
        }
    },
};
