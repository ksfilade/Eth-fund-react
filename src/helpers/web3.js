var Web3 = require('web3')

var web3 = new Web3(window['ethereum'] || window.web3.currentProvider)
var cABI = [{ "constant": false, "inputs": [{ "name": "fundAddress", "type": "address" }], "name": "send", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "message", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "initialMessage", "type": "string" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }, { "indexed": true, "name": "_to", "type": "address" }], "name": "Deposit", "type": "event" }];
var ADDRESS = '0xB665C09C7CD243Cb82049e03B91CA0656D96530f';

export async function payWithEth(walletAddress, amount) {
    let provider = window['ethereum'] || window.web3.currentProvider;
    await provider.enable()

    let contract = new web3.eth.Contract(cABI, ADDRESS)
    let account = await web3.eth.getAccounts()
    contract.methods.send(walletAddress).send
    (
        {
            from: account[0],
            value: web3.utils.toWei(amount, 'ether')
        },
    )
}
export async function checkAddress(walletAddress) {
    return web3.utils.isAddress(walletAddress)
}
