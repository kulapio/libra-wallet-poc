import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userAddress: '',
    userAddressShort: '',
    balance: '',
    mnemonic: '',
    toAddress: '',
    AMOUNT_TO_MINT: '1000'
  },
  actions: {
    updateUserData ({ commit }, { userAddress, userAddressShort, balance, mnemonic }) {
      commit('updateUserData', { userAddress, userAddressShort, balance, mnemonic })
    },
    updateBalance ({ commit }, balance) {
      commit('updateBalance', balance)
    },
    updateUserAddress ({ commit }, address) {
      commit('updateUserAddress', address)
    }
  },
  mutations: {
    updateUserData (state, { userAddress, userAddressShort, balance, mnemonic }) {
      state.userAddress = userAddress
      state.userAddressShort = userAddressShort
      state.balance = balance
      state.mnemonic = mnemonic
    },
    updateBalance (state, payload) {
      state.balance = payload
    },
    updateUserAddress (state, payload) {
      state.userAddress = payload
    }
  }
})
