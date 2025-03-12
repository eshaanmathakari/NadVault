// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TimeLockVault is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _vaultIds;

    struct Vault {
        uint256 id;
        address owner;
        address token;
        uint256 amount;
        uint256 lockTime;
        uint256 unlockTime;
        uint256 yieldRate; // in basis points (1% = 100)
        string memoryURI;
        bool active;
    }

    struct Memory {
        string note;
        string imageURI;
        uint256 timestamp;
    }

    mapping(uint256 => Vault) public vaults;
    mapping(uint256 => Memory[]) public vaultMemories;
    mapping(address => uint256[]) public userVaults;
    mapping(address => uint256) public subscriptionFees;

    event VaultCreated(uint256 indexed vaultId, address indexed owner, uint256 amount);
    event MemoryAdded(uint256 indexed vaultId, address indexed owner, string note);
    event VaultUnlocked(uint256 indexed vaultId, address indexed owner, uint256 amount);
    event SubscriptionPaid(address indexed user, uint256 amount);

    constructor() Ownable(msg.sender) {}

    function createVault(
        address _token,
        uint256 _amount,
        uint256 _lockDuration,
        uint256 _yieldRate,
        string memory _memoryURI
    ) external nonReentrant returns (uint256) {
        require(_amount > 0, "Amount must be greater than 0");
        require(_lockDuration > 0, "Lock duration must be greater than 0");
        require(_yieldRate <= 5000, "Yield rate cannot exceed 50%");

        // Transfer tokens from user to contract
        IERC20(_token).transferFrom(msg.sender, address(this), _amount);

        _vaultIds.increment();
        uint256 vaultId = _vaultIds.current();

        vaults[vaultId] = Vault({
            id: vaultId,
            owner: msg.sender,
            token: _token,
            amount: _amount,
            lockTime: block.timestamp,
            unlockTime: block.timestamp + _lockDuration,
            yieldRate: _yieldRate,
            memoryURI: _memoryURI,
            active: true
        });

        userVaults[msg.sender].push(vaultId);

        emit VaultCreated(vaultId, msg.sender, _amount);
        return vaultId;
    }

    function addMemory(
        uint256 _vaultId,
        string memory _note,
        string memory _imageURI
    ) external {
        require(vaults[_vaultId].owner == msg.sender, "Not vault owner");
        require(vaults[_vaultId].active, "Vault not active");

        vaultMemories[_vaultId].push(Memory({
            note: _note,
            imageURI: _imageURI,
            timestamp: block.timestamp
        }));

        emit MemoryAdded(_vaultId, msg.sender, _note);
    }

    function paySubscription() external payable {
        require(msg.value > 0, "Payment must be greater than 0");
        subscriptionFees[msg.sender] += msg.value;
        emit SubscriptionPaid(msg.sender, msg.value);
    }

    function unlockVault(uint256 _vaultId) external nonReentrant {
        Vault storage vault = vaults[_vaultId];
        
        require(vault.owner == msg.sender, "Not vault owner");
        require(vault.active, "Vault not active");
        require(block.timestamp >= vault.unlockTime, "Lock period not expired");
        require(subscriptionFees[msg.sender] >= 0.01 ether, "Insufficient subscription fee");

        // Calculate yield
        uint256 yieldAmount = (vault.amount * vault.yieldRate) / 10000;
        uint256 totalAmount = vault.amount + yieldAmount;

        // Deduct subscription fee
        subscriptionFees[msg.sender] -= 0.01 ether;

        // Mark vault as inactive
        vault.active = false;

        // Transfer tokens back to owner with yield
        IERC20(vault.token).transfer(msg.sender, totalAmount);

        emit VaultUnlocked(_vaultId, msg.sender, totalAmount);
    }

    function getVaultMemories(uint256 _vaultId) external view returns (Memory[] memory) {
        return vaultMemories[_vaultId];
    }

    function getUserVaults(address _user) external view returns (uint256[] memory) {
        return userVaults[_user];
    }

    function getVaultDetails(uint256 _vaultId) external view returns (
        address owner,
        address token,
        uint256 amount,
        uint256 lockTime,
        uint256 unlockTime,
        uint256 yieldRate,
        string memory memoryURI,
        bool active
    ) {
        Vault storage vault = vaults[_vaultId];
        return (
            vault.owner,
            vault.token,
            vault.amount,
            vault.lockTime,
            vault.unlockTime,
            vault.yieldRate,
            vault.memoryURI,
            vault.active
        );
    }

    function getSubscriptionFee(address _user) external view returns (uint256) {
        return subscriptionFees[_user];
    }
} 