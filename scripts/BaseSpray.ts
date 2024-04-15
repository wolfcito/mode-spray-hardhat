import { ethers, upgrades } from 'hardhat'

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying contracts with the account:', deployer.address)

  const balance = await ethers.provider.getBalance(deployer.address)
  console.log('Account balance:', balance.toString())

  const BaseSpray = await ethers.getContractFactory('BaseSpray')

  const baseSpray = await BaseSpray.deploy(deployer.address)

  await baseSpray.waitForDeployment()

  console.log(`ModeSpray deployed to: ${await baseSpray.getAddress()}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
