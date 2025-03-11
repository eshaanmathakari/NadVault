// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MysteryBox {
    address public owner;
    uint256 public platformFeePercent = 1;
    string[] public nftCollection;  // Predefined collection of NFT URIs or token IDs

    event NFTAssigned(address indexed user, string nftURI);
    
    constructor(string[] memory initialNFTs) {
        owner = msg.sender;
        nftCollection = initialNFTs;
    }
    
    // Note: This is a dummy random function; do not use in production for randomness.
    function random(uint256 max) internal view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender))) % max;
    }
    
    // Users pay to open a mystery box and get a random NFT
    function openMysteryBox() public payable {
        // For simplicity, assume msg.value covers gas + fee; calculate platform fee
        uint256 fee = (msg.value * platformFeePercent) / 100;
        require(msg.value > fee, "Insufficient fee provided");
        
        uint256 index = random(nftCollection.length);
        string memory assignedNFT = nftCollection[index];
        
        // In a production contract, you might mint or transfer the NFT here
        emit NFTAssigned(msg.sender, assignedNFT);
    }
}
