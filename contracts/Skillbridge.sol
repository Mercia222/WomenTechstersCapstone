// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IintERC20 { 

    function totalSupply() external view returns(uint);


    function balanceOf(address account) external view returns(uint); 

    function transfer(address recipient, uint amount) external returns(bool); 
    function allowance(address owner, address spender) external view returns(uint);
    function approve(address spender, uint amount) external returns(bool); 

    function transferFrom(address sender, address recipient, uint amount) external returns(bool);

    event Transfer(address indexed from, address indexed to, uint amount); 

    event Approved(address indexed owner, address indexed spender, uint amount);
}


contract Skill is IintERC20 {

uint public override totalSupply; 
mapping(address => uint) public override balanceOf;
mapping(address => mapping(address => uint)) public override allowance; 

string public name = "Skillbridge Token"; 
string public symbol = "SKBG"; 
uint public decimals = 18; 

function transfer(address recipient, uint amount) external override returns (bool){
    balanceOf[msg.sender] -= amount;
    balanceOf[recipient] += amount; 

    emit Transfer(msg.sender, recipient, amount); 

    return true;  
}

function approve(address spender, uint amount) external override returns (bool){
    allowance[msg.sender][spender] = amount; 

    emit Approved(msg.sender, spender, amount); 

    return true; 
}

function transferFrom(address sender, address recipient, uint amount) external override returns (bool){
    allowance[sender][msg.sender] -= amount; 
    balanceOf[sender] -= amount; 
    balanceOf[recipient] += amount; 

    emit Transfer(sender, recipient, amount); 

    return true; 
}

function mint(uint amount) public{
    balanceOf[msg.sender] += amount; 
    totalSupply += amount; 

    emit Transfer (address(0), msg.sender, amount); 
}

function burn(uint amount) public{
    balanceOf[msg.sender] -= amount; 
    totalSupply -= amount; 

    emit Transfer (msg.sender, address(0), amount); 
} 

}
