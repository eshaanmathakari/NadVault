// frontend/src/config.js
const NADVAULT_ADDRESS = "0x35B9f2Cedd475beABD82dc91Bd09a6B83D069B1a"; //0xYourNadVaultContractAddress
const MYSTERYBOX_ADDRESS = "0xA8C6320Ef2820d053879EBfE0147B7D8504643F8"; //0xYourMysteryBoxContractAddress

const NADVAULT_ABI = [
  // Minimal ABI: Add any functions you plan to use.
  "function lockCount() public view returns (uint256)",
  "function lockMedia(string memory mediaHash, uint256 durationInMonths) public payable"
];

const MYSTERYBOX_ABI = [
  // Minimal ABI: Add functions for interaction.
  "function openMysteryBox() public payable"
];

export default {
  NADVAULT_ADDRESS,
  MYSTERYBOX_ADDRESS,
  NADVAULT_ABI,
  MYSTERYBOX_ABI,
};
