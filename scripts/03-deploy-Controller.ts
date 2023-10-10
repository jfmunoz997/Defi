import { ethers } from "hardhat";

async function main() {


  const controller = await ethers.deployContract("Controller",["0xf37cb1c6577d2e332271699ED6Cd8FEbE364Ae46", "0x94acA81D940e0230D766b31fEa5f93B3c851EbdC"] );
  await controller.waitForDeployment();
  console.log( "Controller contract:" + controller.target);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});