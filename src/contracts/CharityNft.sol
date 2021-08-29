// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CharityNft is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address public owner;
    address payable public charityAddress;

    mapping(address => uint) public balance;

    modifier _ownerOnly() {
        require(msg.sender == owner, "Only Owner of Contract can call this Function");
        _;
    }

    constructor(address payable _charityAddress) ERC721("CharityNFT", "CHARITY") {
        owner = msg.sender;
        charityAddress = _charityAddress;
    }

    function setCharityAddress(address payable _charityAddress) _ownerOnly public {
        charityAddress = _charityAddress;
    }

    function mintToken(string memory tokenURI) public payable returns (uint256) {
        require(msg.value >= (0.01 * (10**18)), "Charity Amount have to be greater than 0.01 ETH");
        balance[charityAddress] += msg.value;
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    function withdrawCharity() _ownerOnly public payable {
        require(charityAddress != address(0x0), "Charity Address can not be the Zero Address");
        charityAddress.transfer(balance[charityAddress]);
        balance[charityAddress] = 0;
    }

    // This fallback function will send all Ether to given Charity Address
    receive() external payable {
        charityAddress.transfer(msg.value);
    }
}
