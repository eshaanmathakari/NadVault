// scripts/deploy.js
async function main() {
  // Get the contract factory
  const NadVault = await ethers.getContractFactory("NadVault");
  const MysteryBox = await ethers.getContractFactory("MysteryBox");

  // Deploy NadVault contract
  const nadVault = await NadVault.deploy();
  await nadVault.deployed();
  console.log("NadVault deployed to:", nadVault.address);

  // Define initial NFTs for the MysteryBox (example URIs)
  const initialNFTs = [
      "ipfs://QmExample1",
      "ipfs://QmExample2",
      "ipfs://QmExample3"
  ];
  const mysteryBox = await MysteryBox.deploy(initialNFTs);
  await mysteryBox.deployed();
  console.log("MysteryBox deployed to:", mysteryBox.address);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});
