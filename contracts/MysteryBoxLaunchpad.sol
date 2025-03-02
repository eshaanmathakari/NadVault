// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MysteryBoxLaunchpad {
    struct Box {
        address creator;
        uint256 floorPrice;
        uint256 currentBid;
        address highestBidder;
        bool sold;
    }
    
    mapping(uint256 => Box) public boxes;
    uint256 public boxCount;
    
    event BoxCreated(uint256 indexed boxId, address indexed creator, uint256 floorPrice);
    event NewBid(uint256 indexed boxId, address indexed bidder, uint256 bidAmount);
    
    // Creators can create multiple boxes with a fixed floor price.
    function createBoxes(uint256 numberOfBoxes, uint256 floorPrice) external {
        require(numberOfBoxes > 0, "Must create at least one box");
        for (uint256 i = 0; i < numberOfBoxes; i++) {
            boxes[boxCount] = Box({
                creator: msg.sender,
                floorPrice: floorPrice,
                currentBid: floorPrice,
                highestBidder: address(0),
                sold: false
            });
            emit BoxCreated(boxCount, msg.sender, floorPrice);
            boxCount++;
        }
    }
    
    // Users can bid on a box. The bid must be higher than the current bid.
    function bid(uint256 boxId) external payable {
        Box storage box = boxes[boxId];
        require(!box.sold, "Box already sold");
        require(msg.value > box.currentBid, "Bid must be higher than current bid");
        
        // Refund previous bidder if applicable.
        if (box.highestBidder != address(0)) {
            payable(box.highestBidder).transfer(box.currentBid);
        }
        
        box.currentBid = msg.value;
        box.highestBidder = msg.sender;
        emit NewBid(boxId, msg.sender, msg.value);
    }
    
    // Finalize the auction, transferring funds to the creator.
    function finalizeBox(uint256 boxId) external {
        Box storage box = boxes[boxId];
        require(!box.sold, "Already finalized");
        require(msg.sender == box.creator || msg.sender == box.highestBidder, "Not authorized");
        
        box.sold = true;
        payable(box.creator).transfer(box.currentBid);
    }
}
