const { ethers, JsonRpcProvider } = require('ethers');


const provider = new JsonRpcProvider(`http://172.29.128.1:7545`)

const account1 = '0x7dF63267EF2610440fbdB6774C46eBC3fea53d46'
const account2 = '0x291d8262da7B397C96140E8128C260BE84376841'
const account3 = '0x701eaFEdccb04760C09C2a064892105c348C2e6d'
const account4 = '0x0ec56330B64773205F11656126AdD7A52D329EFf'

const privateKey1 = '0x8f7029cb5611680edd97b4e5f2423248f86eefa3b802324cd4f959b47e10b405'
const privateKey2 = '0xc0dd8e72aed47a056f763a853dae9ffea5cdebd74df375ecd3829ca9a084cb3d'
const privateKey3 = '0xba3ec985951921311a9b3902f5e991cae33f0e93f55aec702356d965981070a2'
const privateKey4 = '0x4eff37d5f5eb46f4ce2d06a92db2fc3a5e72f21f81818b2703e9d43327632789'



const wallet = new ethers.Wallet(privateKey1, provider)
const wallet2 = new ethers.Wallet(privateKey2, provider)
const wallet3 = new ethers.Wallet(privateKey3, provider)
const wallet4 = new ethers.Wallet(privateKey4, provider)


const controller_ABI = [
    "function getPenguinToken() public view returns(address)",
    "function getIceToken() public view returns(address)",
    "function getStakers() public view returns(address[] memory)",
    "function stakeTokens(uint _amount) public",
    "function unstakeTokens() public",
    "function emitTokens() public",
    "function name() public view returns (string)",
    "function owner() public view returns (address)",
    "function stakers(uint256) public view returns (address)",
    "function stakingBalance(address) public view returns (uint)",
    "function hasStaked(address) public view returns (bool)",
    "function isStaking(address) public view returns (bool)"
];

const address = '0x79a506D287e8488AEB4E320E6ea4b414FB973fB4'
const contract = new ethers.Contract(address, controller_ABI, provider)

const penguinToken_ABI = [
    "function transfer(address _to, uint256 _value) public returns(bool success)",
    "function approve(address _spender, uint256 _value) public returns(bool success)",
    "function transferFrom(address _from ,address _to, uint256 _value) public returns(bool success)",
    "function decimals() public view returns (uint8)",
    "function totalSupply() public view returns (uint256)",
    "function symbol() public view returns (string)",
    "function name() public view returns (string)",
    "function balanceOf(address) public view returns (uint256)",
    "function allowance(address, address) public view returns (uint256)"
];

const addressPenguin = '0xD521287E67408bE253b6c581B7c75b5E1a271F0b'
const contractPenguin = new ethers.Contract(addressPenguin, penguinToken_ABI, provider)


const iceToken_ABI = [
    "function transfer(address _to, uint256 _value) public returns(bool success)",
    "function approve(address _spender, uint256 _value) public returns(bool success)",
    "function transferFrom(address _from ,address _to, uint256 _value) public returns(bool success)",
    "function decimals() public view returns (uint8)",
    "function totalSupply() public view returns (uint256)",
    "function symbol() public view returns (string)",
    "function name() public view returns (string)",
    "function balanceOf(address) public view returns (uint256)",
    "function allowance(address, address) public view returns (uint256)"
];

const addressIce = '0xf5a2336a282c4c4C102475f49e02A162f25F52eD'
const contractIce = new ethers.Contract(addressIce, iceToken_ABI, provider)

const main = async () => {

    const conection = contract.connect(wallet)
    
    const owner = await contract.owner();
    console.log("The owner is:" + owner);

    const penguinToken = await contract.getPenguinToken();
    console.log("The penguin is:" + penguinToken);

    const iceToken = await contract.getIceToken();
    console.log("The ice is:" + iceToken); 
    

    const stakers = await contract.getStakers();
    console.log("There are: " + stakers.length + " stakers");

    const stakingBalance = await contract.stakingBalance(account4);
    console.log("The staking balance is " + ethers.getBigInt(stakingBalance).toString());

    const hasStaked = await contract.hasStaked(account4);
    console.log("This account has staked: " + hasStaked);

    const isStaking = await contract.isStaking(account4);
    console.log("This account is staking: " + isStaking);

    const balancePenguin = await contractPenguin.balanceOf(account4);
    console.log("balance penguin: " + ethers.getBigInt(balancePenguin).toString());

    const balanceIce = await contractIce.balanceOf(account4);
    console.log("balance ice: " + ethers.getBigInt(balanceIce).toString());

    const balanceOfContractPenguin = await contractPenguin.balanceOf(address);
    console.log("balance of Contract (Penguin): " + ethers.getBigInt(balanceOfContractPenguin).toString());

    const balanceOfContractIce = await contractIce.balanceOf(address);
    console.log("balance of Contract (Ice): " + ethers.getBigInt(balanceOfContractIce).toString());




    console.log("Realizando conexión **********************************")

    const conection2 = contractPenguin.connect(wallet4)

    const conection3 = contract.connect(wallet4) 

/*
    //Approve the smart contract to be able to spend so that the user can staking
    const ap = await conection2.approve(address, 1000) 
    await ap.wait()
    console.log(ap) 
*/

    const apBalance = await contractPenguin.allowance(account4, address);
    console.log("allowance: " + ethers.getBigInt(apBalance).toString());
   
/*
    const tx = await conection3.stakeTokens(1000)
    await tx.wait()
    console.log(tx) 
*/    

/*
    const tx3 = await conection.emitTokens()
    await tx3.wait()
    console.log(tx3)
*/

 
    const tx2 = await conection3.unstakeTokens()
    await tx2.wait()
    console.log(tx2)




    const stakers2 = await contract.getStakers();
    console.log("There are: " + stakers2.length + " stakers");

    const stakingBalance2 = await contract.stakingBalance(account4);
    console.log("The staking balance is " + ethers.getBigInt(stakingBalance2).toString());

    const hasStaked2 = await contract.hasStaked(account4);
    console.log("This account has staked: " + hasStaked2);

    const isStaking2 = await contract.isStaking(account4);
    console.log("This account is staking: " + isStaking2);

    const balancePenguin2 = await contractPenguin.balanceOf(account4);
    console.log("balance penguin: " + ethers.getBigInt(balancePenguin2).toString());

    const balanceIce2 = await contractIce.balanceOf(account4);
    console.log("balance ice: " + ethers.getBigInt(balanceIce2).toString());

    const balanceOfContractPenguin2 = await contractPenguin.balanceOf(address);
    console.log("balance of Contract (Penguin): " + ethers.getBigInt(balanceOfContractPenguin2).toString());

    const balanceOfContractIce2 = await contractIce.balanceOf(address);
    console.log("balance of Contract (Ice): " + ethers.getBigInt(balanceOfContractIce2).toString());

}

main()