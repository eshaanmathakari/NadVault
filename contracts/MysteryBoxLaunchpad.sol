// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MysteryBoxLaunchpad is ERC721URIStorage, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _boxIds;
    Counters.Counter private _tokenIds;

    struct MysteryBox {
        uint256 id;
        address creator;
        uint256 floorPrice;
        uint256 startTime;
        uint256 endTime;
        uint256 totalSupply;
        uint256 remainingSupply;
        string metadataURI;
        bool active;
    }

    struct Auction {
        uint256 boxId;
        address highestBidder;
        uint256 highestBid;
        bool ended;
    }

    mapping(uint256 => MysteryBox) public mysteryBoxes;
    mapping(uint256 => Auction) public auctions;
    mapping(address => uint256[]) public userCollections;

    event MysteryBoxCreated(uint256 indexed boxId, address indexed creator, uint256 floorPrice);
    event BidPlaced(uint256 indexed boxId, address indexed bidder, uint256 amount);
    event AuctionEnded(uint256 indexed boxId, address indexed winner, uint256 amount);
    event TokenMinted(uint256 indexed boxId, uint256 indexed tokenId, address indexed owner);

    constructor() ERC721("NadVault Mystery Box", "NVBOX") Ownable() {}

    function createMysteryBox(
        uint256 _floorPrice,
        uint256 _duration,
        uint256 _totalSupply,
        string memory _metadataURI
    ) external returns (uint256) {
        require(_floorPrice > 0, "Floor price must be greater than 0");
        require(_duration > 0, "Duration must be greater than 0");
        require(_totalSupply > 0, "Supply must be greater than 0");

        _boxIds.increment();
        uint256 boxId = _boxIds.current();

        mysteryBoxes[boxId] = MysteryBox({
            id: boxId,
            creator: msg.sender,
            floorPrice: _floorPrice,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration,
            totalSupply: _totalSupply,
            remainingSupply: _totalSupply,
            metadataURI: _metadataURI,
            active: true
        });

        auctions[boxId] = Auction({
            boxId: boxId,
            highestBidder: address(0),
            highestBid: 0,
            ended: false
        });

        emit MysteryBoxCreated(boxId, msg.sender, _floorPrice);
        return boxId;
    }

    function placeBid(uint256 _boxId) external payable nonReentrant {
        MysteryBox storage box = mysteryBoxes[_boxId];
        Auction storage auction = auctions[_boxId];

        require(box.active, "Mystery box is not active");
        require(block.timestamp <= box.endTime, "Auction has ended");
        require(msg.value >= box.floorPrice, "Bid amount below floor price");
        require(msg.value > auction.highestBid, "Bid amount too low");

        // Refund previous highest bidder
        if (auction.highestBidder != address(0)) {
            payable(auction.highestBidder).transfer(auction.highestBid);
        }

        auction.highestBidder = msg.sender;
        auction.highestBid = msg.value;

        emit BidPlaced(_boxId, msg.sender, msg.value);
    }

    function endAuction(uint256 _boxId) external nonReentrant {
        MysteryBox storage box = mysteryBoxes[_boxId];
        Auction storage auction = auctions[_boxId];

        require(box.active, "Mystery box is not active");
        require(block.timestamp > box.endTime, "Auction has not ended yet");
        require(!auction.ended, "Auction already ended");
        require(auction.highestBidder != address(0), "No bids were placed");

        auction.ended = true;
        box.remainingSupply -= 1;
        
        if (box.remainingSupply == 0) {
            box.active = false;
        }

        // Mint NFT to winner
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        _mint(auction.highestBidder, tokenId);
        _setTokenURI(tokenId, box.metadataURI);
        
        userCollections[auction.highestBidder].push(tokenId);

        // Transfer funds to creator
        payable(box.creator).transfer(auction.highestBid);

        emit AuctionEnded(_boxId, auction.highestBidder, auction.highestBid);
        emit TokenMinted(_boxId, tokenId, auction.highestBidder);
    }

    function getUserCollection(address _user) external view returns (uint256[] memory) {
        return userCollections[_user];
    }
    
    function getActiveBoxes() external view returns (uint256[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i <= _boxIds.current(); i++) {
            if (mysteryBoxes[i].active) {
                count++;
            }
        }
        
        uint256[] memory activeBoxIds = new uint256[](count);
        uint256 index = 0;
        for (uint256 i = 1; i <= _boxIds.current(); i++) {
            if (mysteryBoxes[i].active) {
                activeBoxIds[index] = i;
                index++;
            }
        }
        
        return activeBoxIds;
    }
} 