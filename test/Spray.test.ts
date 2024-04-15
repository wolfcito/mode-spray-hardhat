// import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers'
// import { expect } from 'chai'
// import { ethers } from 'hardhat'
// import { ERC20__factory } from '../typechain-types'
// import { Contract } from 'ethers'

// describe('ModeSpray', function () {
//   // let owner: HardhatEthersSigner
//   // let recipient1: HardhatEthersSigner
//   // let recipient2: HardhatEthersSigner
//   // let token: ERC20__factory,
//   // let modeSpray: Contract

//   beforeEach(async function () {
//     const [owner, recipient1, recipient2] = await ethers.getSigners()

//     const Token = await ethers.getContractFactory('ERC20')
//     const token = await Token.deploy('Test Token', 'TST', 18)

//     const ModeSpray = await ethers.getContractFactory('Spray')
//     modeSpray = await ModeSpray.deploy(owner.address)

//     // Asignar tokens al owner
//     await token.transfer(owner.address, 1000)

//     // Aprobar el contrato para gastar tokens
//     await token.approve(modeSpray.address, 1000)
//   })

//   it('should disperse tokens to multiple recipients', async function () {
//     const amounts = [100, 200]
//     const recipients = [recipient1.address, recipient2.address]

//     await modeSpray.sprayToken(token.address, recipients, amounts)

//     const balance1 = await token.balanceOf(recipient1.address)
//     const balance2 = await token.balanceOf(recipient2.address)

//     expect(balance1).to.equal(amounts[0])
//     expect(balance2).to.equal(amounts[1])
//   })

//   it('should revert if number of recipients and amounts mismatch', async function () {
//     const amounts = [100]
//     const recipients = [recipient1.address, recipient2.address]

//     await expect(
//       modeSpray.sprayToken(token.address, recipients, amounts)
//     ).to.be.revertedWith(
//       'Número de destinatarios no coincide con las cantidades'
//     )
//   })

//   it('should revert if total amount is zero', async function () {
//     const amounts = [0, 0]
//     const recipients = [recipient1.address, recipient2.address]

//     await expect(
//       modeSpray.sprayToken(token.address, recipients, amounts)
//     ).to.be.revertedWith('Cantidad debe ser mayor a 0')
//   })

//   it('should revert if not enough tokens approved', async function () {
//     const amounts = [1000, 1000]
//     const recipients = [recipient1.address, recipient2.address]

//     await expect(
//       modeSpray.sprayToken(token.address, recipients, amounts)
//     ).to.be.revertedWith('No hay suficientes tokens aprobados')
//   })

//   it('should emit TokenDispersed event', async function () {
//     const amounts = [100, 200]
//     const recipients = [recipient1.address, recipient2.address]

//     await expect(modeSpray.sprayToken(token.address, recipients, amounts))
//       .to.emit(modeSpray, 'TokenDispersed')
//       .withArgs(owner.address, recipients, amounts)
//   })
// })
