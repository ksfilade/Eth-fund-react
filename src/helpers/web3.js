var Web3 = require('web3')
var axios = require('axios')
var web3 = new Web3(window['ethereum'] || window.web3.currentProvider)
// var cABI = [{ "constant": false, "inputs": [{ "name": "fundAddress", "type": "address" }], "name": "send", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "message", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "initialMessage", "type": "string" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }, { "indexed": true, "name": "_to", "type": "address" }], "name": "Deposit", "type": "event" }];
// var ADDRESS = '0xB665C09C7CD243Cb82049e03B91CA0656D96530f';
var cABI = [{"constant":true,"inputs":[],"name":"message","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"fundAddress","type":"address"},{"name":"fromId","type":"string"},{"name":"toId","type":"string"}],"name":"send","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[{"name":"initialMessage","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"fromId","type":"string"},{"indexed":false,"name":"toId","type":"string"}],"name":"Deposit","type":"event"}]
var ADDRESS = '0xDAD225222C3D87d608e86BA73F92b919F57e0ED9';

export async function payWithEth(walletAddress, amount, user, donateTo) {
    console.log(user);
    let provider = window['ethereum'] || window.web3.currentProvider;
    await provider.enable()

    let contract = new web3.eth.Contract(cABI, ADDRESS)
    let account = await web3.eth.getAccounts()
    let res = await contract.methods.send(walletAddress, 'anonymous',donateTo).send
        (
            {
                from: account[0],
                value: web3.utils.toWei(amount, 'ether')
            },
        ).then(() => {
            return true
        }).catch((err) => {
            return false
        })
    let data = {
        donationFrom: user === '' ? 'anonymous' : user,
        donationTo: donateTo,
        amount: parseFloat(amount),
    }
    if (res)
        await axios.post('https://enigmatic-fortress-52205.herokuapp.com/fundrisers/donation', data, { headers: { 'Content-Type': 'application/json' } })

    return res

}
export async function checkAddress(walletAddress) {
    return web3.utils.isAddress(walletAddress)
}
export async function getBallance(walletAddress) {

    const BN = web3.utils.BN
    if (await checkAddress(walletAddress))
        return await web3.utils.fromWei(new BN(await web3.eth.getBalance(walletAddress)).toString())

    return 0

}
