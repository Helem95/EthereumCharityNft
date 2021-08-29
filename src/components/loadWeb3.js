import Web3 from "web3";

export const loadWeb3 = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.request({
            method: "eth_requestAccounts"
        })
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        window.alert("Non-Ethereum Browser detected. You should using the MetaMask Extension");
    }
}

export default loadWeb3;