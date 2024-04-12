// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Address.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

/// @custom:security-contact wolfcito.eth+security@gmail.com
contract ModeSpray is Ownable {
    address sfsAddress = 0x8680CEaBcb9b56913c519c069Add6Bc3494B7020;
    event TokenDispersed(
        address indexed sender,
        address[] recipients,
        uint256[] values
    );

    event SmsAllowed(uint256 allowed, uint256 total);

    constructor(address initialOwner) Ownable(initialOwner) {
        ISFS sfsContract = ISFS(sfsAddress);
        sfsContract.register(msg.sender);
    }

    function disperseEther(
        address[] memory _recipients,
        uint256[] memory _amounts
    ) external payable {
        require(
            _recipients.length == _amounts.length,
            'Number of recipients must be equal to the number of corresponding values'
        );

        require(_recipients.length > 0, 'Recipients array cannot be empty');

        uint256 totalValue = 0;

        for (uint256 i = 0; i < _recipients.length; i++) {
            totalValue += _amounts[i];
        }

        require(address(this).balance >= totalValue, 'Insufficient balance');

        for (uint256 i = 0; i < _recipients.length; i++) {
            Address.sendValue(payable(_recipients[i]), _amounts[i]);
        }

        emit TokenDispersed(msg.sender, _recipients, _amounts);
    }

    function disperseToken(
        address tokenAddress,
        address[] memory _recipients,
        uint256[] memory _amounts
    ) external {
        require(tokenAddress != address(0), 'Invalid token address');

        require(
            _recipients.length == _amounts.length,
            'Number of recipients must be equal to the number of corresponding values'
        );

        require(_recipients.length > 0, 'Recipients array cannot be empty');

        IERC20 token = IERC20(tokenAddress);

        uint256 total = 0;
        for (uint256 i = 0; i < _recipients.length; i++) {
            total += _amounts[i];
        }

        emit SmsAllowed(token.allowance(msg.sender, address(this)), total);

        require(
            token.allowance(msg.sender, address(this)) >= total,
            'Not enough tokens approved'
        );

        require(
            token.transferFrom(msg.sender, address(this), total),
            'TransferFrom failed'
        );

        for (uint256 i = 0; i < _recipients.length; i++) {
            require(
                token.transfer(_recipients[i], _amounts[i]),
                'Transfer failed'
            );
        }

        emit TokenDispersed(msg.sender, _recipients, _amounts);
    }
}

interface ISFS {
    function register(address _recipient) external returns (uint256 tokenId);
}
