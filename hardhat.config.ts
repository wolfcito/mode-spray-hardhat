import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
require('hardhat-deploy')
import '@openzeppelin/hardhat-upgrades'

import * as dotenv from 'dotenv'
dotenv.config()

const {
  DEPLOYER_PRIVATE_KEY,
  ETHERSCAN_API_KEY,
  DEPLOYER_BASE_PRIVATE_KEY,
  BASESCAN_API_KEY,
  OPSCAN_API_KEY,
} = process.env
const providerApiKey =
  process.env.ALCHEMY_API_KEY || 'oKxs-03sij-U_N0iOlrSsZFr29-IqbuF'

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${providerApiKey}`,
        enabled: process.env.MAINNET_FORKING_ENABLED === 'true',
      },
    },
    // mode chains
    modetest: {
      url: 'https://sepolia.mode.network',
      chainId: 919,
      accounts: [DEPLOYER_PRIVATE_KEY as string], //BE VERY CAREFUL, DO NOT PUSH THIS TO GITHUB
      gasPrice: 10000,
    },
    mode: {
      url: 'https://mainnet.mode.network',
      chainId: 34443,
      accounts: [DEPLOYER_PRIVATE_KEY as string], //BE VERY CAREFUL, DO NOT PUSH THIS TO GITHUB
      // gasPrice: 10000,
    },
    // base chains
    // for mainnet
    'base-mainnet': {
      url: 'https://mainnet.base.org',
      accounts: [DEPLOYER_BASE_PRIVATE_KEY as string],
      gasPrice: 1000000000,
    },
    // for testnet
    'base-sepolia': {
      url: 'https://sepolia.base.org',
      accounts: [DEPLOYER_BASE_PRIVATE_KEY as string],
      gasPrice: 1000000000,
    },
    // for local dev environment
    'base-local': {
      url: 'http://localhost:8545',
      accounts: [DEPLOYER_BASE_PRIVATE_KEY as string],
      gasPrice: 1000000000,
    },
    'optimism-sepolia': {
      url: 'https://sepolia.optimism.io',
      chainId: 11155420,
      accounts: [DEPLOYER_PRIVATE_KEY as string], //BE VERY CAREFUL, DO NOT PUSH THIS TO GITHUB
      gasPrice: 10000,
    },
    optimism: {
      url: 'https://mainnet.optimism.io',
      chainId: 10,
      accounts: [DEPLOYER_PRIVATE_KEY as string], //BE VERY CAREFUL, DO NOT PUSH THIS TO GITHUB
      // gasPrice: 10000,
    },
    'scroll-sepolia': {
      url: 'https://sepolia-rpc.scroll.io',
      chainId: 534351,
      accounts: [DEPLOYER_PRIVATE_KEY as string], //BE VERY CAREFUL, DO NOT PUSH THIS TO GITHUB
      gasPrice: 1000000000,
    },
    scroll: {
      url: 'https://rpc.scroll.io',
      chainId: 534352,
      accounts: [DEPLOYER_PRIVATE_KEY as string], //BE VERY CAREFUL, DO NOT PUSH THIS TO GITHUB
      gasPrice: 1000000000,
    },
  },
  solidity: {
    version: '0.8.20',
    settings: {
      // optimizer: {
      //   enabled: true,
      //   runs: 200,
      // },
      evmVersion: 'london',
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD',
  },
  sourcify: {
    enabled: true,
  },
  etherscan: {
    apiKey: {
      mode: ETHERSCAN_API_KEY as string,
      'base-mainnet': BASESCAN_API_KEY as string,
      optimism: OPSCAN_API_KEY as string,
    },
    customChains: [
      {
        network: 'modetest',
        chainId: 919,
        urls: {
          apiURL: 'https://sepolia.explorer.mode.network/api',
          browserURL: 'https://sepolia.explorer.mode.network/',
        },
      },
      {
        network: 'mode',
        chainId: 34443,
        urls: {
          apiURL: 'https://explorer.mode.network/api',
          browserURL: 'https://explorer.mode.network/',
        },
      },
      {
        network: 'base-sepolia',
        chainId: 84532,
        urls: {
          apiURL: 'https://api-sepolia.basescan.org/api',
          browserURL: 'https://sepolia.basescan.org',
        },
      },
      {
        network: 'base-mainnet',
        chainId: 8453,
        urls: {
          apiURL: 'https://api.basescan.org/api',
          browserURL: 'https://basescan.org',
        },
      },
      {
        network: 'optimism-sepolia',
        chainId: 11155420,
        urls: {
          apiURL: 'https://sepolia-optimistic.etherscan.io/api',
          browserURL: 'https://sepolia-optimistic.etherscan.io/',
        },
      },
      {
        network: 'optimism',
        chainId: 10,
        urls: {
          apiURL: 'https://optimistic.etherscan.io/api',
          browserURL: 'https://optimistic.etherscan.io/',
        },
      },
      {
        network: 'scroll-sepolia',
        chainId: 534351,
        urls: {
          apiURL: 'https://sepolia.scrollscan.com/api',
          browserURL: 'https://sepolia.scrollscan.com/',
        },
      },
      {
        network: 'scroll',
        chainId: 534352,
        urls: {
          apiURL: 'https://scrollscan.com/api',
          browserURL: 'https://scrollscan.com/',
        },
      },
    ],
  },
}

export default config
