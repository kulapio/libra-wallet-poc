<template>
  <div class="transaction-container">
    <div class="card">
      <div class="address content">
        <div v-if="!fetched">{{ $t('loadingTransactions') }}</div>
        <div v-if="fetched" class="align-center">
          <div
            v-for="(transaction, index) in transactions"
            v-bind:key="index"
            class="transactions-container"
          >
            <div class="transactions-header">
              <div>{{new Date(transaction.date).toUTCString()}}</div>
              <div class="explorer-container">
                <a v-bind:href="transaction.explorerLink" target="_blank">
                  <b-icon
                    icon="link"
                    size="is-small">
                  </b-icon>
                  Explorer link
                </a>
              </div>
            </div>
            <div class="transactions-body">
              <div v-bind:style= "[transaction.event === 'sent' ? {'color': '#483DB1'} : { 'color': '#55C81F' }]">
                {{ transaction.event === 'received' ? $t('received') : $t('sent')  }}
              </div>
              <div v-bind:style= "[transaction.event === 'sent' ? {'color': '#483DB1'} : { 'color': '#55C81F' }]">
                {{ Number(transaction.amount).toLocaleString() }} {{ $t('coins') }}
              </div>
            </div>
            <div v-if="window.width < 600" class="transactions-footer">
               <div style="color: #7957d5; padding-right: 5px;">
                {{ transaction.event === 'sent' ? `${$t('toAddress')}:` : `${$t('fromAddress')}:` }}
              </div>
              <div>
                {{ transaction.event === 'sent' ? shortAddress(transaction.toAddress) : shortAddress(transaction.fromAddress) }}
              </div>
            </div>
            <div v-if="window.width >= 600" class="transactions-footer">
              <div style="color: #7957d5; padding-right: 5px;">
                {{ transaction.event === 'sent' ? `${$t('toAddress')}:` : `${$t('fromAddress')}:` }}
              </div>
              <div>
                {{ transaction.event === 'sent' ? transaction.toAddress : transaction.fromAddress }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="button-box">
        <b-button icon-left="arrow-left" @click="back">{{ $t('back') }}</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import config from '@/config.json'
import axios from 'axios'
import UserDataPersistance from '@/userData/persistance'

export default {
  name: 'Wallet',
  data () {
    return {
      transactions: [],
      fetched: false,
      window: {
        width: 0,
        height: 0
      }
    }
  },
  computed: {
    ...mapState({
      userAddress: state => state.userAddress
    })
  },
  async created () {
    if (!this.userAddress) {
      this.userData = new UserDataPersistance()
    }

    this.getTransactions()

    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    ...mapActions({
      updateUserAddress: 'updateUserAddress'
    }),
    async getTransactions () {
      try {
        const payload = { address: this.userAddress || this.userData.userAddress }

        const { data } = await axios.post(config.api + '/transactionHistory', payload)

        console.log(data)
        this.transactions = data.transactions
        this.fetched = true
      } catch (error) {
        console.log(error)
      }
    },
    back () {
      this.$router.push({ name: 'Wallet' })
    },
    handleResize () {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    },
    shortAddress (address) {
      const first = address.substr(0, 7)
      const last = address.substr(address.length - 7, address.length)
      return `${first}...${last}`
    }
  }
}
</script>

<style lang="scss" scoped>
.transaction-container {
  min-height: calc(100vh - 310px);
  width: 100%;
  margin: 0 auto;
}

.transactions-container {
  display: flex;
  flex-direction: column;
  align-self: center;
  height: 60px;
  width: 100%;
  margin-bottom: 10px;
  background-color: #f7f7f7;
  border-radius: 4px;

  .transactions-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30%;
    width: 100%;
    padding-right: 10px;
    padding-left: 10px;
    font-size: 10px;

    .explorer-container {
      display: flex;
      align-items: center;
    }
  }

  .transactions-body {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-right: 10px;
    padding-left: 10px;
    height: 35%;
    width: 100%;
    font-size: inherit;
    font-weight: bold;
  }

  .transactions-footer {
    display: flex;
    align-items: center;
    padding-left: 10px;
    height: 35%;
    width: 100%;
    font-size: 11px;
  }
}

.wallet-body {
  padding-bottom: 2rem;
  padding-top: 2rem;
}

.card {
  width: 90%;
  margin: 0 auto;
  padding: 20px;
  border-radius: 3px;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.content {
  // max-height: calc(100vh - 450px);
  overflow: auto;

  .align-center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.address {
  margin-top: 10px;
  overflow-wrap: break-word;
}

.button-box {
  margin-top: 25px;
  padding: 0 30px;
  button {
    width: 100%;
    height: 60px;
    margin-bottom: 20px;
    max-width: 300px;
  }
}
/* on desktop */
@media only screen and (min-width: 1025px) {
  .wallet-container {
    margin: 10px auto;
    width: 70%;
    border-radius: 3px;
  }
  .wallet-body {
    padding-bottom: 6rem;
    padding-top: 6rem;
  }
}
</style>
