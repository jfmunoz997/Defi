import { ethers } from "hardhat";

async function main() {

  const penguin = await ethers.deployContract("PenguinToken");
  await penguin.waitForDeployment();
  console.log( "PenguinToken contract:" + penguin.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});