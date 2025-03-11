// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NadVault {
    struct Lock {
        address owner;
        string mediaHash;      // Could be an IPFS hash or similar reference
        uint256 lockTime;      // Timestamp when locked
        uint256 duration;      // Duration in months
        uint256 feePaid;       // Total fee paid (dummy compounding model)
    }
    
    mapping(uint256 => Lock) public locks;
    uint256 public lockCount;
    uint256 public feeRate = 0.1 ether; // Dummy rate: 0.1 Mon per month

    event MediaLocked(uint256 indexed lockId, address owner, uint256 duration, string mediaHash);
    
    // User locks media by paying fee based on duration (dummy model; later can include compounding logic)
    function lockMedia(string memory mediaHash, uint256 durationInMonths) public payable {
        uint256 fee = feeRate * durationInMonths; // Simple fee model; replace with compound logic later
        require(msg.value >= fee, "Insufficient fee provided");
        
        locks[lockCount] = Lock(msg.sender, mediaHash, block.timestamp, durationInMonths, msg.value);
        emit MediaLocked(lockCount, msg.sender, durationInMonths, mediaHash);
        lockCount++;
    }
    
    // After lock period expires, the user can withdraw (logic can be expanded as needed)
    function withdrawMedia(uint256 lockId) public {
        Lock storage userLock = locks[lockId];
        require(msg.sender == userLock.owner, "You are not the owner");
        require(block.timestamp >= userLock.lockTime + (userLock.duration * 30 days), "Lock period not expired");
        
        // For a real-world scenario, additional logic to securely reveal media can be added.
        delete locks[lockId];
    }
}
