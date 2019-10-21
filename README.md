# DApp Password Manager
A decentralized password manager on Ethereum local network using Truffle Framework.

## Team members 
Shrutesh Patil (170050013)

## Description
User have to remember a master password using which all passwords are encrypted in the contract

User can view, add, change or delete passwords


## Usage
1. Install dependencies from package.json 
```bash
    npm install 
```
2. Install [Metamask extension](https://metamask.io/) and [Ganache](https://www.trufflesuite.com/ganache)

3. Open Ganache and create new workspace using *truffle-config.js*

4. Create Metamask account and add a Private Network with ip http://127.0.0.1:7545 

5. Import the 1st account from Ganache in Metamask

6. Compile and deploy contract using truffle
```
  truffle compile
  truffle deploy
```

7. Run dapp
```
  npm run dev
```
