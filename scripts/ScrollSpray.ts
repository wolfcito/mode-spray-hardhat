import { ethers, upgrades } from 'hardhat'

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying contracts with the account:', deployer.address)

  const balance = await ethers.provider.getBalance(deployer.address)
  console.log('Account balance:', balance.toString())

  const ScrollSpray = await ethers.getContractFactory('ScrollSpray')

  const scrollSpray = await ScrollSpray.deploy(deployer.address)

  await scrollSpray.waitForDeployment()

  console.log(`ModeSpray deployed to: ${await scrollSpray.getAddress()}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
