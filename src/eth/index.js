import Web3 from 'web3'

class Eth {
  constructor () {
    this.web3 = null
    this.networId = 0
    this.networkName = ''
    this.userAddress = ''
  }

  async init () {
    this.web3 = this.createWeb3()
    if (this.web3 != null) {
      this.userAddress = await this.getUserAddress()
      this.networkName = await this.getNetwork()
    }
  }

  createWeb3 () {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      // if (window.web3 === 'bypass') {
      // Use Mist/MetaMask's provider
      return new Web3(window.web3.currentProvider)
    } else {
      console.log('No web3? You should consider trying MetaMask!')
      // return new Web3('ws://localhost:8545')
      return null
    }
  }

  async getUserAddress () {
    let accounts = await this.web3.eth.getAccounts()
    if (accounts.length === 0) {
      return ''
    }
    return accounts[0]
  }

  async getNetwork () {
    this.networId = await this.web3.eth.net.getId()
    let networkName = 'Unknown'

    switch (this.networId) {
      case 1:
        networkName = 'Main'
        break
      case 2:
        networkName = 'Morden'
        break
      case 3:
        networkName = 'Ropsten'
        break
      case 4:
        networkName = 'Rinkeby'
        break
      case 42:
        networkName = 'Kovan'
        break
      default:
        networkName = 'Unknown'
    }
    return networkName
  }

  async saveToEthereum (message) {
    // Estimate gas
    let esimateGasUsed = await this.estimateGas(message)
    esimateGasUsed = (parseInt(esimateGasUsed) + 20000).toString()
    console.log(`Estimate Gas Used: ${esimateGasUsed}`)

    let options = {
      from: this.userAddress,
      to: this.userAddress,
      data: this.web3.utils.utf8ToHex(message),
      value: '1000000000000000',
      gasPrice: '1000000000',
      gasLimit: esimateGasUsed
    }

    return new Promise((resolve, reject) => {
      this.web3.eth
        .sendTransaction(options)
        .on('error', function (error) {
          console.error(error)
          reject(error)
        })
        .on('transactionHash', function (transactionHash) {
          resolve(transactionHash)
        })
    })
  }

  textToByteLength (message) {
    let bytesLength = this.web3.utils.utf8ToHex(message).length / 2 - 1
    return this.humanFileSize(bytesLength)
  }

  async estimateGas (message) {
    let gasUsed = await this.web3.eth.estimateGas({
      to: this.userAddress,
      data: this.web3.utils.utf8ToHex(message)
    })
    return gasUsed
  }

  // Helper
  humanFileSize (bytes, si = true) {
    var thresh = si ? 1000 : 1024
    if (Math.abs(bytes) < thresh) {
      return bytes + ' bytes'
    }
    var units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
    var u = -1
    do {
      bytes /= thresh
      ++u
    } while (Math.abs(bytes) >= thresh && u < units.length - 1)
    return bytes.toFixed(1) + ' ' + units[u]
  }
}

export default Eth
