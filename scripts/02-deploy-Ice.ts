import { ethers } from "hardhat";

async function main() {

  const ice = await ethers.deployContract("IceToken");
  await ice.waitForDeployment();
  console.log( "IceToken contract:" + ice.target);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});