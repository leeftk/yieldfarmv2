const Kibble = artifacts.require("Kibble");
const MasterChef = artifacts.require("MasterChef");
const Web3 = require('Web3');

module.exports = function (deployer) {
  deployer.then(async () => {
    try {
      await deployer.deploy(Kibble);
      const sushiToken = await Kibble.deployed();
      const blockNumber = await web3.eth.getBlockNumber();
      const accounts = await web3.eth.getAccounts();
      const devAddress = accounts[0];
      const bonusBlock = blockNumber + 100
      await deployer.deploy(MasterChef, sushiToken.address, devAddress, 100, 1)
      await sushiToken.transferOwnership(MasterChef.address);
    } catch (error) {
      console.log(error)
    }
  })
};





