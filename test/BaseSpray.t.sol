// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {BaseSpray} from "../contracts/BaseSpray.sol";

contract BaseSprayTest is Test {
    BaseSpray baseSpray;
    address owner = address(0x55555);

    event TokenDispersed(
        address indexed sender,
        address[] recipients,
        uint256[] values,
        address token
    );

    function setUp() public {
        baseSpray = new BaseSpray(owner);
    }

    function test_initialOwner() public view {
        assertEq(baseSpray.owner(), owner, "El owner no coincide");
    }

    function test_disperseEtherWorks() public {
        address[] memory recipients = new address[](2);
        recipients[0] = address(0x00001);
        recipients[1] = address(0x00002);

        uint256[] memory amounts = new uint256[](2);
        amounts[0] = 1 ether;
        amounts[1] = 2 ether;

        vm.deal(address(this), 3 ether);
        baseSpray.disperseEther{value: 3 ether}(recipients, amounts);

        assertEq(recipients[0].balance, 1 ether, "Deberia tener 1 ether");
        assertEq(recipients[1].balance, 2 ether, "Deberia tener 2 ether");
    }

    function test_requireUnequalLengthsRecipientsAmounts() public {
        address[] memory recipients = new address[](2);
        recipients[0] = address(0x00003);
        recipients[1] = address(0x00004);

        uint256[] memory amounts = new uint256[](1);
        amounts[0] = 1 ether;

        vm.deal(address(this), 3 ether);
        vm.expectRevert(
            "Number of recipients must be equal to the number of corresponding values"
        );
        baseSpray.disperseEther{value: 3 ether}(recipients, amounts);
    }

    function test_requireRecipientsLengthGreaterThanZero() public {
        address[] memory recipients = new address[](2);
        recipients[0] = address(0x00005);
        recipients[1] = address(0x00006);

        uint256[] memory amounts = new uint256[](2);
        amounts[0] = 1 ether;
        amounts[1] = 2 ether;

        uint256 recipientsLength = recipients.length;

        vm.deal(address(this), 3 ether);
        baseSpray.disperseEther{value: 3 ether}(recipients, amounts);

        assertGt(recipientsLength, 0, "Recipients most be greater than 0");
    }

    function test_requireRecipientsLengthEqualToZero() public {
        address[] memory recipients = new address[](0);

        uint256[] memory amounts = new uint256[](0);

        vm.deal(address(this), 3 ether);
        vm.expectRevert("Recipients array cannot be empty");
        baseSpray.disperseEther{value: 3 ether}(recipients, amounts);
    }

    function test_forLoopTotalValue() public {
        address[] memory recipients = new address[](2);
        recipients[0] = address(0x00007);
        recipients[1] = address(0x00008);

        uint256[] memory amounts = new uint256[](2);
        amounts[0] = 1 ether;
        amounts[1] = 2 ether;

        uint256 totalValue = amounts[0] + amounts[1];

        vm.deal(address(this), 3 ether);
        assertEq(address(this).balance, totalValue);
    }

    function test_revertWhenBalanceLessThanTotalValue() public {
        address[] memory recipients = new address[](2);
        recipients[0] = address(0x00007);
        recipients[1] = address(0x00008);

        uint256[] memory amounts = new uint256[](2);
        amounts[0] = 1 ether;
        amounts[1] = 2 ether;

        vm.deal(address(baseSpray), 2 ether);
        vm.expectRevert("Insufficient balance");
        baseSpray.disperseEther{value: 3}(recipients, amounts);
    }

    function test_contractBalanceAfterTransaction() public {
        address[] memory recipients = new address[](2);
        recipients[0] = address(0x00001);
        recipients[1] = address(0x00002);

        uint256[] memory amounts = new uint256[](2);
        amounts[0] = 1 ether;
        amounts[1] = 2 ether;

        vm.deal(address(this), 3 ether);
        baseSpray.disperseEther{value: 3 ether}(recipients, amounts);

        uint256 balanceAfter = address(this).balance;

        assertEq(balanceAfter, 0 ether);
    }

    function test_TokenDispersedEvent() public {
        address[] memory recipients = new address[](2);
        recipients[0] = address(0x00011);
        recipients[1] = address(0x00012);

        uint256[] memory amounts = new uint256[](2);
        amounts[0] = 1 ether;
        amounts[1] = 2 ether;

        vm.deal(address(this), 3 ether);
        console.log("Ether dealt to baseSpray");

        vm.expectEmit();
        emit TokenDispersed(address(this), recipients, amounts, address(0));
        console.log("Expected emit set");

        baseSpray.disperseEther{value: 3 ether}(recipients, amounts);
        console.log("disperseEther called");
    }
}
