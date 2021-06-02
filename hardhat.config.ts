import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

import { HardhatUserConfig } from "hardhat/types";

import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-etherscan";
// TODO: reenable solidity-coverage when it works
// import "solidity-coverage";
import { task } from "hardhat/config";


const local: HardhatUserConfig = {
  solidity: "0.6.12",
  networks: {
    hardhat: {
    },
  },
};

const ALCHEMY_MAINNET_RPC_URL = process.env.ALCHEMY_MAINNET_RPC_URL ? process.env.ALCHEMY_MAINNET_RPC_URL : ""

const with_kovan: HardhatUserConfig = {
  solidity: "0.6.12",
  networks: {
    hardhat: {
      forking: {
        url:  ALCHEMY_MAINNET_RPC_URL
      }
    },
    kovan: {
      url: process.env.ALCHEMY_KOVAN_RPC_URL,
      accounts: [`0x${process.env.KOVAN_PRIVATE_KEY}`]
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};

const config = process.env.ALCHEMY_KOVAN_RPC_URL ? with_kovan : local;

export default config;

task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});