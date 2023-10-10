import { ethers } from "hardhat";

async function main() {

  const penguin = await ethers.deployContract("PenguinToken");
  await penguin.waitForDeployment();
  console.log( "PenguinToken contract:" + penguin.target);

  const ice = await ethers.deployContract("IceToken");
  await ice.waitForDeployment();
  console.log( "IceToken contract:" + ice.target);

  const controller = await ethers.deployContract("Controller",[penguin.target, ice.target] );
  await controller.waitForDeployment();
  console.log( "Controller contract:" + controller.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
