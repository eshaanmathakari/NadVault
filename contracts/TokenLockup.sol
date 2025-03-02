// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract TokenLockup {
    struct Deposit {
        address user;
        uint256 amount;
        uint256 lockupEnd;
        string note;
        bool withdrawn;
    }
    
    IERC20 public token;
    uint256 public yieldRate; // e.g., yield rate in basis points
    uint256 public depositCount;
    mapping(uint256 => Deposit) public deposits;
    
    event Deposited(uint256 depositId, address indexed user, uint256 amount, uint256 lockupEnd, string note);
    event Withdrawn(uint256 depositId, address indexed user, uint256 amount, uint256 yield);
    
    constructor(address tokenAddress, uint256 _yieldRate) {
        token = IERC20(tokenAddress);
        yieldRate = _yieldRate;
    }
    
    // User deposits tokens with an attached note and specified lockup period.
    function deposit(uint256 amount, uint256 lockupPeriod, string calldata note) external {
        require(amount > 0, "Deposit must be greater than 0");
        require(lockupPeriod > 0, "Lockup period must be > 0");
        
        // Ensure user has approved the token transfer.
        require(token.transferFrom(msg.sender, address(this), amount), "Token transfer failed");
        
        deposits[depositCount] = Deposit({
            user: msg.sender,
            amount: amount,
            lockupEnd: block.timestamp + lockupPeriod,
            note: note,
            withdrawn: false
        });
        
        emit Deposited(depositCount, msg.sender, amount, block.timestamp + lockupPeriod, note);
        depositCount++;
    }
    
    // Withdraw after the lockup period. Simple yield calculation is applied.
    function withdraw(uint256 depositId) external {
        Deposit storage dep = deposits[depositId];
        require(msg.sender == dep.user, "Not deposit owner");
        require(block.timestamp >= dep.lockupEnd, "Lockup period not ended");
        require(!dep.withdrawn, "Already withdrawn");
        
        // Simple yield calculation (this can be enhanced as needed).
        uint256 yieldAmount = (dep.amount * yieldRate) / 10000;
        uint256 totalAmount = dep.amount + yieldAmount;
        dep.withdrawn = true;
        
        require(token.transfer(dep.user, totalAmount), "Token transfer failed");
        emit Withdrawn(depositId, dep.user, dep.amount, yieldAmount);
    }
}
