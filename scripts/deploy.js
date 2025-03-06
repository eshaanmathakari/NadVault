const hre = require("hardhat");

async function main() {
  console.log("Deploying contracts...");

  // Deploy MysteryBoxLaunchpad
  const MysteryBoxLaunchpad = await hre.ethers.getContractFactory("MysteryBoxLaunchpad");
  const mysteryBoxLaunchpad = await MysteryBoxLaunchpad.deploy();
  await mysteryBoxLaunchpad.waitForDeployment();
  console.log("MysteryBoxLaunchpad deployed to:", await mysteryBoxLaunchpad.getAddress());

  // Deploy TokenLockup
  const TokenLockup = await hre.ethers.getContractFactory("TokenLockup");
  const tokenLockup = await TokenLockup.deploy();
  await tokenLockup.waitForDeployment();
  console.log("TokenLockup deployed to:", await tokenLockup.getAddress());

  console.log("All contracts deployed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 