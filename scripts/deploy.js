// async function main() {
//     const [deployer] = await ethers.getSigners();
//     console.log("Deploying contracts with account:", deployer.address);
  
//     // Deploy MysteryBoxLaunchpad
//     const MysteryBoxLaunchpad = await ethers.getContractFactory("MysteryBoxLaunchpad");
//     const mysteryBox = await MysteryBoxLaunchpad.deploy();
//     await mysteryBox.deployed();
//     console.log("MysteryBoxLaunchpad deployed to:", mysteryBox.address);
  
//     // Deploy TokenLockup
//     const TokenLockup = await ethers.getContractFactory("TokenLockup");
//     // Replace "0xTokenAddressHere" with your actual ERC20 token address or deploy a dummy token for testing
//     const tokenLockup = await TokenLockup.deploy("0xTokenAddressHere", 500);
//     await tokenLockup.deployed();
//     console.log("TokenLockup deployed to:", tokenLockup.address);
//   }
  
//   main()
//     .then(() => process.exit(0))
//     .catch(error => {
//       console.error(error);
//       process.exit(1);
//     });
  
const { ethers } = require("hardhat");

// Override getResolver to bypass ENS resolution on networks that don't support it
ethers.provider.getResolver = async (name) => null;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy MysteryBoxLaunchpad
  const MysteryBoxLaunchpad = await ethers.getContractFactory("MysteryBoxLaunchpad");
  const mysteryBox = await MysteryBoxLaunchpad.deploy();
  await mysteryBox.deployed();
  console.log("MysteryBoxLaunchpad deployed to:", mysteryBox.address);

  // Deploy TokenLockup using a dummy token address for local testing
  const TokenLockup = await ethers.getContractFactory("TokenLockup");
  const tokenLockup = await TokenLockup.deploy("0x0000000000000000000000000000000000000000", 500);
  await tokenLockup.deployed();
  console.log("TokenLockup deployed to:", tokenLockup.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
