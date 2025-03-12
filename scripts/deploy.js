// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  console.log("Deploying contracts to", network.name);

  // Deploy MysteryBoxLaunchpad
  const MysteryBoxLaunchpad = await hre.ethers.getContractFactory("MysteryBoxLaunchpad");
  const mysteryBoxLaunchpad = await MysteryBoxLaunchpad.deploy();
  await mysteryBoxLaunchpad.deployed();

  console.log("MysteryBoxLaunchpad deployed to:", mysteryBoxLaunchpad.address);

  // Deploy TimeLockVault
  const TimeLockVault = await hre.ethers.getContractFactory("TimeLockVault");
  const timeLockVault = await TimeLockVault.deploy();
  await timeLockVault.deployed();

  console.log("TimeLockVault deployed to:", timeLockVault.address);

  // Save contract addresses to a file for reference
  const fs = require("fs");
  const contractAddresses = {
    MysteryBoxLaunchpad: mysteryBoxLaunchpad.address,
    TimeLockVault: timeLockVault.address,
    network: network.name,
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync(
    "frontend/src/contracts/addresses.json",
    JSON.stringify(contractAddresses, null, 2)
  );

  console.log("Contract addresses saved to frontend/src/contracts/addresses.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
