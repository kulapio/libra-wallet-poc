import lcstore from 'store'

class UserDataPersistance {
  constructor () {
    // Load from local storage
    if (lcstore.get('userAddress') !== undefined) {
      this.userAddress = lcstore.get('userAddress')
      this.balance = lcstore.get('balance')
      this.mnemonic = lcstore.get('mnemonic')
    } else {
      this.userAddress = ''
      this.balance = ''
      this.mnemonic = ''
    }
  }

  update (userAddress, balance, mnemonic) {
    this.userAddress = userAddress
    this.balance = balance
    this.mnemonic = mnemonic
  }

  save () {
    lcstore.set('userAddress', this.userAddress)
    lcstore.set('balance', this.balance)
    lcstore.set('mnemonic', this.mnemonic)
  }

  updateUserBalance (balance) {
    this.balance = balance
    lcstore.set('balance', this.balance)
  }
}

export default UserDataPersistance
