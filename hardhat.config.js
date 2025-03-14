require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.8.1",
      },
      {
        version: "0.8.9",
      }
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      ensAddress: "0x0000000000000000000000000000000000000000"
    },
    monadTestnet: {
      url: "https://testnet-rpc.monad.xyz",
      chainId: 10143,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
};

// require("@nomiclabs/hardhat-ethers");
// require("dotenv").config();

// module.exports = {
//   solidity: "0.8.0",
//   defaultNetwork: "hardhat",
//   networks: {
//     hardhat: {
//       chainId: 31337,
//       // Provide a dummy ENS address to bypass real ENS resolution
//       ensAddress: "0x0000000000000000000000000000000000000000"
//     },
//     monadTestnet: {
//       url: "https://testnet-rpc.monad.xyz",
//       chainId: 10143,
//       accounts: [process.env.PRIVATE_KEY],
//       ensAddress: "0x0000000000000000000000000000000000000000"
//     },
//   },
// };

