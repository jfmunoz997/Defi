const { ethers, JsonRpcProvider } = require('ethers');


const provider = new JsonRpcProvider(`http://172.29.128.1:7545`)

const account1 = '0x7dF63267EF2610440fbdB6774C46eBC3fea53d46'
const account2 = '0x291d8262da7B397C96140E8128C260BE84376841'
const account3 = '0x701eaFEdccb04760C09C2a064892105c348C2e6d'
const account4 = '0x0ec56330B64773205F11656126AdD7A52D329EFf'

const privateKey1 = '0x8f7029cb5611680edd97b4e5f2423248f86eefa3b802324cd4f959b47e10b405'
const privateKey3 = '0xba3ec985951921311a9b3902f5e991cae33f0e93f55aec702356d965981070a2'


const wallet = new ethers.Wallet(privateKey1, provider)
const wallet3 = new ethers.Wallet(privateKey3, provider)


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

const address = '0xD521287E67408bE253b6c581B7c75b5E1a271F0b'
const contract = new ethers.Contract(address, penguinToken_ABI, provider)

const main = async () => {

    const decimals = await contract.decimals();
    console.log(decimals)

    const totalSupply = await contract.totalSupply();
    //console.log(ethers.BigNumber.from(totalSupply).toString())
    console.log(ethers.getBigInt(totalSupply).toString());

    const symbol = await contract.symbol();
    console.log(symbol)

    const name = await contract.name();
    console.log(name)

    const balanceOf = await contract.balanceOf(account1);
    //console.log(ethers.BigNumber.from(balanceOf).toString());
    console.log(ethers.getBigInt(balanceOf).toString());

    const balanceOf2 = await contract.balanceOf(account4);
    //console.log(ethers.BigNumber.from(balanceOf2).toString());
    console.log(ethers.getBigInt(balanceOf2).toString());
    

//------------------------- NORMAL TRANSFER


    const conection = contract.connect(wallet)
    const conection3 = contract.connect(wallet3)


    const tx = await conection.transfer(account4, 2000)
    await tx.wait()
    console.log(tx)

    const balanceOfAfter = await contract.balanceOf(account1);
    console.log(ethers.getBigInt(balanceOfAfter).toString());

    const balanceOfAfter2 = await contract.balanceOf(account4);
    console.log(ethers.getBigInt(balanceOfAfter2).toString());
    


//------------------------------ TRANSFER FROM

/*
    const ap = await conection.approve(account3, 500)
    await ap.wait()
    console.log(ap)

    const apBalance = await contract.allowance(account1, account3);
    console.log(ethers.BigNumber.from(apBalance).toString());


    const tx2 = await conection3.transferFrom(account1, account4, 500)
    await tx2.wait()
    console.log(tx2)

    const balanceOfAfter3 = await contract.balanceOf(account1);
    console.log(ethers.BigNumber.from(balanceOfAfter3).toString());

    const balanceOfAfter4 = await contract.balanceOf(account4);
    console.log(ethers.BigNumber.from(balanceOfAfter4).toString());
    */

}

main()