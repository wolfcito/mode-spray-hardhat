import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
require('hardhat-deploy')
import '@openzeppelin/hardhat-upgrades'

import * as dotenv from 'dotenv'
dotenv.config()

const { DEPLOYER_PRIVATE_KEY, ETHERSCAN_API_KEY, DEPLOYER_BASE_PRIVATE_KEY } =
  process.env
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
    'base-': {
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
    ],
  },
}

export default config
