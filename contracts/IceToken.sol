  // SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.4;

  /**
   @title PenguinToken
   @dev PenguinToken for DeFi platform
   @custom:dev-run-script scripts/deploy_with_ethers.ts
   */

contract IceToken{

    //Declarations
    string public name = "IceToken";
    string public symbol = "ICE";
    uint256 public totalSupply = 1000000000000000000000000;
    uint8 public decimals = 18;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    //Data Structures
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;


    //Constructor
    constructor(){
        balanceOf[msg.sender] = totalSupply;
    }

    //functions

    //transfer tokens to an adrress
    function transfer(address _to, uint256 _value) public returns(bool success){
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    //approve the transfer of tokens from a third party
    function approve(address _spender, uint256 _value) public returns(bool success){
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    //transfer tokens froam an adrres to another
    function transferFrom(address _from ,address _to, uint256 _value) public returns(bool success){
        require(balanceOf[_from] >= _value);
        require(allowance[_from][msg.sender]>= _value);

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

}