# Mode Spray

Mode Spray is a smart contract that enables efficient distribution of ETH and ERC20 tokens to multiple recipients in a single transaction. This contract is deployed on Mode Network, providing a gas-efficient solution for batch token transfers.

## Features

- Distribute ETH to multiple recipients in a single transaction
- Distribute ERC20 tokens to multiple recipients in a single transaction
- Gas-efficient batch transfers
- OpenZeppelin security features
- Mode Network SFS (Sequencer Fee Sharing) integration

## Installation

1. Clone the repository:
```bash
git clone https://github.com/wolfcito/mode-spray-hardhat.git
cd mode-spray-hardhat
```

2. Install dependencies:
```bash
yarn install
```

## Usage

### Disperse ETH

```solidity
function disperseEther(
    address[] memory _recipients,
    uint256[] memory _amounts
) external payable
```

### Disperse ERC20 Tokens

```solidity
function disperseToken(
    address tokenAddress,
    address[] memory _recipients,
    uint256[] memory _amounts
) external
```

## Development

### Available Scripts

- `yarn flattenMode`: Flattens the ModeSpray contract
- `yarn flattenBase`: Flattens the BaseSpray contract

### Testing

```bash
npx hardhat test
```

## Deployment

### Testnet (Sepolia)

ModeSpray Sepolia deployed to: `0xDBA7D42BAC31Fa58A6Ab7ffE95D9FfA4bD398A0f`

### Mainnet

ModeSpray Mainnet deployed to: `0xd988097fb8612cc24eeC14542bC03424c656005f`

## Security

For security concerns, please contact: wolfcito.eth+security@gmail.com

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.