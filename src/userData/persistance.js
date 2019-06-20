import store from 'store'

class UserDataPersistance {
  constructor () {
    // Load from local storage
    if (store.get('userAddress') !== undefined) {
      this.userAddress = store.get('userAddress')
      this.balance = store.get('balance')
      this.mnemonic = store.get('mnemonic')
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
    store.set('userAddress', this.userAddress)
    store.set('balance', this.balance)
    store.set('mnemonic', this.mnemonic)
  }
}

export default UserDataPersistance
