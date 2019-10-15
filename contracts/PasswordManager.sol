pragma solidity ^0.5.0;

contract PasswordManager {

  struct Person {
    string name;
    uint passwordCount;
    bool isMember;
    string checkHash;
  }

  mapping (address => Person) public users;
  mapping (address => mapping (uint => Password)) public passwords;

  struct Password {
    string password;
    string title;
    bool valid;
  }

  function addUser(string memory name, string memory myhash) public {
    require(users[msg.sender].isMember == false);
    Person memory new_person = Person(name, 0, true, myhash);
    users[msg.sender] = new_person;
  }

  function changeCheckHash(string memory checkhash) public onlyMember
  {
    users[msg.sender].checkHash = checkhash;
  }

  function addPassword(string memory password, string memory title) public onlyMember
  {
    Password memory new_password = Password(password, title, true);
    uint numPass = ++users[msg.sender].passwordCount;
    passwords[msg.sender][numPass] = new_password;
  }

  function deletePassword(uint n) public onlyMember passwordOkay(n)
  {
    delete passwords[msg.sender][n];
  }

  function getPassword(uint n) view public onlyMember passwordOkay(n) returns (string memory)
  {
    return passwords[msg.sender][n].password;
  }

  function changePassword(uint n, string memory password, string memory data) public onlyMember passwordOkay(n)
  {
    passwords[msg.sender][n].password = password;
    passwords[msg.sender][n].title = data;
  }

  modifier onlyMember() {
    require(users[msg.sender].isMember == true);
    _;
  }

  modifier passwordOkay(uint n) {
    require(users[msg.sender].passwordCount >= n);
    require(passwords[msg.sender][n].valid == true);
    _;
  }

}
