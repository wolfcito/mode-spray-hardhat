// import { ethers } from 'hardhat'
// import { expect } from 'chai'
// import { Contract, ContractFactory } from 'ethers'

// describe('BaseSpray', function () {
//   let baseSpray: Contract
//   let token: Contract

//   beforeEach(async function () {
//     const BaseSprayFactory: ContractFactory = await ethers.getContractFactory(
//       'BaseSpray'
//     )
//     baseSpray = await BaseSprayFactory.deploy(
//       ethers.utils.getAddress('0x123...')
//     )
//     await baseSpray.deployed()

//     const MockTokenFactory: ContractFactory = await ethers.getContractFactory(
//       'MockToken'
//     )
//     token = await MockTokenFactory.deploy()
//     await token.deployed()

//     // Transfer some tokens to baseSpray contract
//     await token.transfer(baseSpray.address, ethers.utils.parseEther('1000'))
//   })

//   it('should disperse Ether correctly', async function () {
//     const recipients = [
//       ethers.utils.getAddress('0x1'),
//       ethers.utils.getAddress('0x2'),
//     ]
//     const amounts = [100, 200]

//     await baseSpray.disperseEther(recipients, amounts, {
//       value: ethers.utils.parseEther('500'),
//     })

//     // Check if Ether has been dispersed correctly
//     expect(await ethers.provider.getBalance(baseSpray.address)).to.equal(
//       ethers.utils.parseEther('500')
//     )
//   })

//   it('should disperse tokens correctly', async function () {
//     const recipients = [
//       ethers.utils.getAddress('0x1'),
//       ethers.utils.getAddress('0x2'),
//     ]
//     const amounts = [100, 200]

//     await baseSpray.disperseToken(token.address, recipients, amounts)

//     // Check if tokens have been dispersed correctly
//     expect(await token.balanceOf(baseSpray.address)).to.equal(700)
//   })
// })
