import { ethers } from 'hardhat'
import { ModeSpray__factory } from '../typechain-types'

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log(`Deploying contracts with the account: ${deployer.address}`)

  const ModeSpray: ModeSpray__factory = await ethers.getContractFactory(
    'ModeSpray'
  )

  const modeSpray = await ModeSpray.deploy(deployer.address)

  await modeSpray.waitForDeployment()

  console.log(`ModeSpray deployed to: ${await modeSpray.getAddress()}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
