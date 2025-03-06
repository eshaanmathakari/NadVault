// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TokenLockup is ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _vaultIds;

    struct Vault {
        uint256 vaultId;
        address owner;
        address token;
        uint256 amount;
        uint256 lockTime;
        uint256 unlockTime;
        string memoryURI;
        bool isActive;
        uint256 subscriptionFee;
        uint256 yieldRate;
    }

    struct Memory {
        string note;
        string imageURI;
        uint256 timestamp;
    }

    mapping(uint256 => Vault) public vaults;
    mapping(uint256 => Memory[]) public vaultMemories;
    mapping(address => uint256[]) public userVaults;
    mapping(address => uint256) public userSubscriptionFees;

    event VaultCreated(uint256 indexed vaultId, address indexed owner, uint256 amount);
    event MemoryAdded(uint256 indexed vaultId, address indexed owner);
    event VaultUnlocked(uint256 indexed vaultId, address indexed owner);
    event SubscriptionPaid(address indexed user, uint256 amount);

    constructor() Ownable(msg.sender) {}

    function createVault(
        address _token,
        uint256 _amount,
        uint256 _lockTime,
        string memory _memoryURI,
        uint256 _subscriptionFee,
        uint256 _yieldRate
    ) external nonReentrant returns (uint256) {
        require(_amount > 0, "Amount must be greater than 0");
        require(_lockTime > 0 && _lockTime <= 365 days, "Lock time must be between 0 and 365 days");
        require(_yieldRate <= 100, "Yield rate must be less than or equal to 100");

        IERC20(_token).transferFrom(msg.sender, address(this), _amount);

        _vaultIds.increment();
        uint256 newVaultId = _vaultIds.current();

        vaults[newVaultId] = Vault({
            vaultId: newVaultId,
            owner: msg.sender,
            token: _token,
            amount: _amount,
            lockTime: block.timestamp,
            unlockTime: block.timestamp + _lockTime,
            memoryURI: _memoryURI,
            isActive: true,
            subscriptionFee: _subscriptionFee,
            yieldRate: _yieldRate
        });

        userVaults[msg.sender].push(newVaultId);

        emit VaultCreated(newVaultId, msg.sender, _amount);
        return newVaultId;
    }

    function addMemory(
        uint256 _vaultId,
        string memory _note,
        string memory _imageURI
    ) external nonReentrant {
        Vault storage vault = vaults[_vaultId];
        require(vault.owner == msg.sender, "Not vault owner");
        require(vault.isActive, "Vault is not active");

        vaultMemories[_vaultId].push(Memory({
            note: _note,
            imageURI: _imageURI,
            timestamp: block.timestamp
        }));

        emit MemoryAdded(_vaultId, msg.sender);
    }

    function paySubscription() external payable {
        require(msg.value > 0, "Subscription fee must be greater than 0");
        userSubscriptionFees[msg.sender] += msg.value;
        emit SubscriptionPaid(msg.sender, msg.value);
    }

    function unlockVault(uint256 _vaultId) external nonReentrant {
        Vault storage vault = vaults[_vaultId];
        require(vault.owner == msg.sender, "Not vault owner");
        require(vault.isActive, "Vault is not active");
        require(block.timestamp >= vault.unlockTime, "Vault is still locked");
        require(userSubscriptionFees[msg.sender] >= vault.subscriptionFee, "Insufficient subscription fee");

        vault.isActive = false;
        userSubscriptionFees[msg.sender] -= vault.subscriptionFee;

        uint256 yield = (vault.amount * vault.yieldRate) / 100;
        uint256 totalAmount = vault.amount + yield;

        IERC20(vault.token).transfer(msg.sender, totalAmount);

        emit VaultUnlocked(_vaultId, msg.sender);
    }

    function getVault(uint256 _vaultId) external view returns (Vault memory) {
        return vaults[_vaultId];
    }

    function getVaultMemories(uint256 _vaultId) external view returns (Memory[] memory) {
        return vaultMemories[_vaultId];
    }

    function getUserVaults(address _user) external view returns (uint256[] memory) {
        return userVaults[_user];
    }

    function getUserSubscriptionFee(address _user) external view returns (uint256) {
        return userSubscriptionFees[_user];
    }
}
