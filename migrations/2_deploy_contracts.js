var PasswordManager = artifacts.require("./PasswordManager.sol");

module.exports = function(deployer) {
  deployer.deploy(PasswordManager);
};
