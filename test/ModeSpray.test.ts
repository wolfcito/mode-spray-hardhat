// import { ethers, upgrades } from 'hardhat'
// // import { ContractFactory, Contract, Signer } from 'ethers'

// import { expect } from 'chai'
// import { ModeSpray } from '../typechain-types'

// // let ModeSpray: ContractFactory
// // let modeSpray: Contract
// // let accounts: Signer[]

// describe('ModeSpray', function () {
//   // beforeEach('Setup', async function () {
//   //   const accounts = await ethers.getSigners()
//   //   const ModeSpray = await ethers.getContractFactory('ModeSpray')
//   //   const modeSpray = (await upgrades.deployProxy(
//   //     ModeSpray,
//   //     [
//   //       accounts[1].getAddress(),
//   //       // '0x4246FF0452B95780122E84bdFfe5Ba9371E1d7a2'
//   //     ],
//   //     {
//   //       initializer: 'initialize',
//   //     }
//   //   )) as Contract

//   //   // await modeSpray.deployed()
//   // })

//   it('should disperse Ether to recipients', async function () {
//     const accounts = await ethers.getSigners()
//     const ModeSpray = await ethers.getContractFactory('ModeSpray')
//     const modeSpray =
//       // (
//       await upgrades.deployProxy(
//         ModeSpray,
//         [
//           accounts[1].getAddress(),
//           '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
//         ],
//         {
//           initializer: 'initialize',
//         }
//       )
//     // ) as Contract

//     await modeSpray.waitForDeployment()

//     console.log(`ModeSpray(Proxy) deployed to: ${modeSpray.target}`)

//     const recipients = [accounts[1].getAddress(), accounts[2].getAddress()]
//     const values = [ethers.parseEther('1'), ethers.parseEther('2')]

//     // console.log('1', accounts[1].getAddress())
//     // console.log('2', accounts[2].getAddress())
//     // console.log('accounts', { accounts })

//     const initialBalances = await Promise.all(
//       recipients.map(async (acc) => await ethers.provider.getBalance(acc))
//     )

//     // await modeSpray.disperseEther(recipients, values, { value: 300 })

//     // const finalBalances = await Promise.all(
//     //   recipients.map(async (acc) => await ethers.provider.getBalance(acc))
//     // )

//     // for (let i = 0; i < recipients.length; i++) {
//     //   expect(finalBalances[i].sub(initialBalances[i])).to.equal(values[i])
//     // }
//   })

//   it('should disperse tokens to recipients', async function () {
//     const accounts = await ethers.getSigners()
//     const ModeSpray = await ethers.getContractFactory('ModeSpray')
//     const modeSpray =
//       // (
//       await upgrades.deployProxy(
//         ModeSpray,
//         [
//           // accounts[1].getAddress(),
//           '0x4246FF0452B95780122E84bdFfe5Ba9371E1d7a2',
//         ],
//         {
//           initializer: 'initialize',
//         }
//       )
//     // ) as Contract

//     await modeSpray.waitForDeployment()

//     console.log(`ModeSpray(Proxy) deployed to: ${modeSpray.target}`)

//     // const accounts = await ethers.getSigners()
//     const tokenAddress = '0xd7dE2D2525A81A007FdFc8004DD8dbE7d60AF0c6' // Reemplaza con la dirección real de tu token
//     const token = await ethers.getContractAt('USDCCoin', tokenAddress) // Reemplaza con el nombre real de tu contrato de token
//     const recipients = [accounts[1].getAddress(), accounts[2].getAddress()]
//     const values = [ethers.parseEther('1'), ethers.parseEther('2')]

//     // console.log('1', accounts[1].getAddress())
//     // console.log('2', accounts[2].getAddress())
//     // console.log('accounts', accounts)

//     // Asegúrate de que el contrato ModeSpray tenga suficientes tokens para dispersar
//     await token.transfer(modeSpray.address, 500)

//     const initialBalances = await Promise.all(
//       recipients.map(async (acc) => await token.balanceOf(acc))
//     )

//     await modeSpray.disperseToken(token.address, recipients, values)

//     const finalBalances = await Promise.all(
//       recipients.map(async (acc) => await token.balanceOf(acc))
//     )

//     for (let i = 0; i < recipients.length; i++) {
//       expect(finalBalances[i].sub(initialBalances[i])).to.equal(values[i])
//     }
//   })
// })
