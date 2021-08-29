const CharityNft = artifacts.require("CharityNft");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(CharityNft, accounts[1]);
};
