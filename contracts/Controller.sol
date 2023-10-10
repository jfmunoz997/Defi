  // SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.4;
import "./PenguinToken.sol";
import "./IceToken.sol";

  /**
   @title PenguinToken
   @dev PenguinToken for DeFi platform
   @custom:dev-run-script scripts/deploy_with_ethers.ts
   */

contract Controller{

    //Declarations
    string public name = "Controller";
    address public owner;
    PenguinToken public penguinToken;
    IceToken public iceToken;

    //Data Structures
    address [] public stakers;
    mapping (address => uint) public stakingBalance;
    mapping (address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(PenguinToken _penguinToken, IceToken _iceToken){
        penguinToken =_penguinToken;
        iceToken = _iceToken;
        owner = msg.sender;
    }

   function getStakers() public view returns(address[] memory) {
        return stakers;
    }

   function getPenguinToken() public view returns(address) {
        return address(penguinToken);
    }

   function getIceToken() public view returns(address) {
        return address(iceToken);
    }  

    function stakeTokens(uint _amount) public {
        require(_amount > 0, "La cantidad no puede ser menor a 0");
        //send tokens to the main smart contract (Controller)
        penguinToken.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] += _amount;
        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
        } 

        //update staking data
        hasStaked[msg.sender] = true;
        isStaking[msg.sender] = true;
    }

    function unstakeTokens() public{
        uint balance = stakingBalance[msg.sender];
        require(balance > 0, "The balance is 0");

        penguinToken.transfer(msg.sender, balance);
        stakingBalance[msg.sender] = 0;
        isStaking[msg.sender] = false;
    }

    function emitTokens() public{
        require(msg.sender == owner, "You aren't the owner");
        for(uint i=0; i < stakers.length; i++){
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            if(balance > 0){
                iceToken.transfer(recipient,balance);
            }
        }
    }
 

    



}