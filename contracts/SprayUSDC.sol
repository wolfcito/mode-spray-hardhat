// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @custom:security-contact wolfcito.learn+serc20@gmail.com
contract USDCSpray is ERC20, Ownable {
    constructor(
        address recipient,
        address initialOwner
    ) ERC20("USDC Spray", "USDCs") Ownable(initialOwner) {
        _mint(recipient, 10000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function decimals() public pure override returns (uint8) {
        return 6;
    }
}
