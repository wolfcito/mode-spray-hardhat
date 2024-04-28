import { ethers, upgrades } from 'hardhat'

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying contracts with the account:', deployer.address)

  const balance = await ethers.provider.getBalance(deployer.address)
  console.log('Account balance:', balance.toString())

  const OpSpray = await ethers.getContractFactory('OpSpray')

  const opSpray = await OpSpray.deploy(deployer.address)

  await opSpray.waitForDeployment()

  console.log(`ModeSpray deployed to: ${await opSpray.getAddress()}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
