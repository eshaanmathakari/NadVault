// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MysteryBoxLaunchpad is ERC721, ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _boxIds;
    Counters.Counter private _tokenIds;

    struct MysteryBox {
        uint256 boxId;
        address creator;
        uint256 floorPrice;
        uint256 startTime;
        uint256 endTime;
        uint256 totalSupply;
        uint256 currentSupply;
        bool isActive;
        string metadataURI;
    }

    struct Auction {
        uint256 boxId;
        address highestBidder;
        uint256 highestBid;
        uint256 endTime;
        bool ended;
    }

    mapping(uint256 => MysteryBox) public mysteryBoxes;
    mapping(uint256 => Auction) public auctions;
    mapping(uint256 => uint256) public boxToTokenId;
    mapping(address => uint256[]) public userBoxes;

    event MysteryBoxCreated(uint256 indexed boxId, address indexed creator, uint256 floorPrice);
    event BidPlaced(uint256 indexed boxId, address indexed bidder, uint256 amount);
    event AuctionEnded(uint256 indexed boxId, address indexed winner, uint256 amount);
    event MysteryBoxOpened(uint256 indexed boxId, uint256 indexed tokenId, address indexed owner);

    constructor() ERC721("NadVault Mystery Box", "NVMYST") Ownable(msg.sender) {}

    function createMysteryBox(
        uint256 _floorPrice,
        uint256 _duration,
        uint256 _totalSupply,
        string memory _metadataURI
    ) external returns (uint256) {
        require(_floorPrice > 0, "Floor price must be greater than 0");
        require(_duration > 0 && _duration <= 7 days, "Duration must be between 0 and 7 days");
        require(_totalSupply > 0, "Total supply must be greater than 0");

        _boxIds.increment();
        uint256 newBoxId = _boxIds.current();

        mysteryBoxes[newBoxId] = MysteryBox({
            boxId: newBoxId,
            creator: msg.sender,
            floorPrice: _floorPrice,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration,
            totalSupply: _totalSupply,
            currentSupply: 0,
            isActive: true,
            metadataURI: _metadataURI
        });

        auctions[newBoxId] = Auction({
            boxId: newBoxId,
            highestBidder: address(0),
            highestBid: 0,
            endTime: block.timestamp + _duration,
            ended: false
        });

        emit MysteryBoxCreated(newBoxId, msg.sender, _floorPrice);
        return newBoxId;
    }

    function placeBid(uint256 _boxId) external payable nonReentrant {
        MysteryBox storage box = mysteryBoxes[_boxId];
        Auction storage auction = auctions[_boxId];

        require(box.isActive, "Mystery box is not active");
        require(block.timestamp <= auction.endTime, "Auction has ended");
        require(msg.value > auction.highestBid, "Bid must be higher than current highest bid");
        require(msg.value >= box.floorPrice, "Bid must be at least floor price");

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

        require(box.isActive, "Mystery box is not active");
        require(block.timestamp > auction.endTime, "Auction has not ended");
        require(!auction.ended, "Auction already ended");

        auction.ended = true;
        box.isActive = false;

        if (auction.highestBidder != address(0)) {
            _mintMysteryBox(_boxId, auction.highestBidder);
            payable(box.creator).transfer(auction.highestBid);
        }

        emit AuctionEnded(_boxId, auction.highestBidder, auction.highestBid);
    }

    function _mintMysteryBox(uint256 _boxId, address _to) internal {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(_to, newTokenId);
        boxToTokenId[_boxId] = newTokenId;
        mysteryBoxes[_boxId].currentSupply++;
        userBoxes[_to].push(_boxId);

        emit MysteryBoxOpened(_boxId, newTokenId, _to);
    }

    function _baseURI() internal view override returns (string memory) {
        return mysteryBoxes[boxToTokenId[_tokenIds.current()]].metadataURI;
    }

    function getUserBoxes(address _user) external view returns (uint256[] memory) {
        return userBoxes[_user];
    }

    function getMysteryBox(uint256 _boxId) external view returns (MysteryBox memory) {
        return mysteryBoxes[_boxId];
    }

    function getAuction(uint256 _boxId) external view returns (Auction memory) {
        return auctions[_boxId];
    }
}
