<template>
  <section class="wallet-container hero is-medium is-primary is-bold">
    <div class="wallet-body">
      <div class="widget-container">
         <b-button
            @click="openfromHWWallet"
            style="margin-right: 10px;"
            rounded
            size="is-small"
            icon-left="cast"
          >
            {{ $t('hardwareWallet') }}
        </b-button>
        <b-tooltip :label="$t('hardwareWalletInfo')" :position="tooltipPosition">
          <div
            style="display: flex; alignItems: center; cursor: pointer;"
            @click="openHardwareRepo"
          >
          <b-icon
            style="font-size: 20px;"
            icon="alert-circle-outline"
            size="is-small"
          />
          </div>
        </b-tooltip>
      </div>
      <div
        v-if="!userAddress"
        class="creating-wallet"
      >
        <span>
          {{ $t('creatingWallet') }}
        </span>
        <vue-loading
          type="bars"
          color="#7957d5"
          :size="{ width: '50px', height: '50px' }"
        />
      </div>
      <div v-else>
        <Avatar
          :seed="userAddress"
          :size="20"
        />
        <div class="wallet-address is-dots">
          <div class="wallet-content" @click="onCopy">
            {{ $t('wallet') }}: {{ shortUserAddr }}
            <b-icon
              style="margin-left: 5px;"
              icon="content-copy"
              size="is-small"
            />
          </div>
        </div>
        <div v-if="balance" class="balance">
          <img src="@/assets/img/libra-ic.png">
          <span>{{ balance | numberWithCommas }}</span>
        </div>
        <div v-else class="balance">
          <span>{{ $t('loading') }}</span>
        </div>
        <div class="refresh">
          <a @click="refreshBalance">
            <b-icon
              icon="refresh"
              size="is-small"
            />
            {{ isQueryBalance ? $t('refreshing') : $t('clickToRefresh') }}
          </a>
        </div>
        <div class="button-box">
          <b-button
            icon-left="send"
            @click="openSend"
          >
            {{ $t('send') }}
          </b-button>
          <b-button
            icon-left="qrcode"
            @click="openReceive"
          >
            {{ $t('receive') }}
          </b-button>
          <b-button
            icon-left="history"
            @click="openTransaction"
          >
            {{ $t('transactionHistory') }}            
          </b-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import axios from 'axios'

import config from '@/config.json'
import recordStat from '@/service/record_stat'
import Avatar from '@/components/Avatar.vue'
import LibraService from '@/service/libra_service'
import UserDataPersistance from '@/userData/persistance'

export default {
  name: 'Wallet',
  components: {
    Avatar
  },
  filters: {
    numberWithCommas (x) {
      let parts = x.toString().split('.')
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return parts.join('.')
    }
  },
  data () {
    return {
      network: null,
      message: '',
      byteLength: '',
      transactionHash: '',
      userData: null,
      updateingBalance: false,
      isQueryBalance: false,
      libra: new LibraService(),
      tooltipPosition: window.innerWidth >= 1366 ? 'is-top' : 'is-left'
    }
  },
  async created () {
    // Load from local storage
    this.userData = new UserDataPersistance()

    // User already have a wallet
    if (this.userData.userAddress) {
      this.updateUserData({
        userAddress: this.userData.userAddress,
        userAddressShort: this.userData.userAddress.substring(0, 5),
        balance: this.userData.balance,
        mnemonic: this.userData.mnemonic
      })
      await this.queryBalance()

      // Mint if balance = 0
      try {
        if (parseInt(this.balance) === 0) {
          console.log('balance is 0')
          await this.mint('100', this.userAddress)

          setTimeout(async () => {
            await this.queryBalance()
          }, 1000)
        }
      } catch (error) {
        console.log(error)
      }
      // Creating a new wallet
    } else {
      const data = await this.createNewWallet()
      await this.updatePersistance(data.address, data.balance, data.mnemonic)
    }
  },
  computed: {
    ...mapState({
      userAddress: state => state.userAddress,
      balance: state => state.balance,
      mnemonic: state => state.mnemonic,
      AMOUNT_TO_MINT: state => state.AMOUNT_TO_MINT
    }),
    shortUserAddr () {
      if (!this.userAddress) return 'Loading...'
      const first = this.userAddress.substr(0, 7)
      const last = this.userAddress.substr(this.userAddress.length - 7, this.userAddress.length)
      return `${first}...${last}`
    }
  },
  methods: {
    ...mapActions({
      updateUserData: 'updateUserData',
      updateBalance: 'updateBalance'
    }),
    async createNewWallet () {
      try {
        // Record stat
        recordStat(['transactions', 'wallets'])

        // Create wallet
        const createdResult = await this.libra.createWallet()
        console.log('createdResult', createdResult)

        // Minting coins
        const { data } = await this.mint(this.AMOUNT_TO_MINT, createdResult.address)
        console.log(data)

        this.updateUserData({
          userAddress: createdResult.address,
          userAddressShort: createdResult.address.substring(0, 5),
          balance: '0',
          mnemonic: createdResult.mnemonic + ';1'
        })

        // Refresh balance, sometime faucet is slow
        setTimeout(async () => {
          await this.queryBalance()
        }, 1000)

        const wallet = {
          address: createdResult.address,
          mnemonic: createdResult.mnemonic + ';1',
          balance: this.AMOUNT_TO_MINT.toString(10)
        }

        // Fire event to google analytic
        this.$ga.event({
          eventCategory: 'Wallet',
          eventAction: 'Create'
        })

        return wallet
      } catch (error) {
        console.log(error)
      }
    },
    async refreshBalance () {
      this.isQueryBalance = true
      await this.queryBalance()
      this.isQueryBalance = false
    },
    async mint (amount, address) {
      const { data } = await axios.post(config.api + '/mint', { address: address, amount: amount })
      return data
    },
    async queryBalance () {
      const { data } = await axios.post(config.api + '/getBalance', { address: this.userAddress })
      this.updateBalance(data.balance)
      this.userData.updateUserBalance(data.balance)
      return data
    },
    async updatePersistance (userAddress, balance, mnemonic) {
      this.userData.update(userAddress, balance, mnemonic)
      this.userData.save()
    },
    openHardwareRepo () {
      window.location.href = 'https://github.com/iyawat/M5Stack_libra_hw_wallet'
    },
    openSend () {
      this.$ga.event({
        eventCategory: 'Wallet',
        eventAction: 'Transfer'
      })
      this.$router.push({ name: 'ScanQR' })
    },
    openReceive () {
      this.$ga.event({
        eventCategory: 'Wallet',
        eventAction: 'Receive'
      })
      this.$router.push({ name: 'Receive', query: { address: this.userAddress } })
    },
    openTransaction () {
      this.$ga.event({
        eventCategory: 'Wallet',
        eventAction: 'History'
      })
      this.$router.push({ name: 'Transactions', query: { address: this.userAddress } })
    },
    async doUpdateBalance () {
      this.updateingBalance = true
      this.$toast.open('Updating balance....')
      let response = await this.queryBalance()
      if (response) {
        this.updateingBalance = false
      }
    },
    onCopy () {
      this.$copyText(this.userAddress).then((e) => {
        this.$toast.open({
          message: this.$t('copy'),
          position: 'is-bottom',
          type: 'is-success'
        })
      }, (e) => {
        this.$toast.open({
          duration: 5000,
          message: this.$t('cantCopy'),
          position: 'is-bottom',
          type: 'is-danger'
        })
      })
    },
    async openfromHWWallet () {
      let serviceUuid = 'c03e7090-7ce0-46f0-98dd-a2aba8367741'
      let characteristicUuid = '26e2b12b-85f0-4f3f-9fdd-91d114270e6e'
      let device = null
      let resultfromHW = ''

      try {
        console.log('Requesting Bluetooth Device...')
        device = await navigator.bluetooth.requestDevice({
          filters: [
            { services: [serviceUuid] },
            { name: ['libra-hw-wallet'] }
          ]
        })

        console.log('Connecting to GATT Server...')
        const server = await device.gatt.connect()

        console.log('Getting Service...')
        const service = await server.getPrimaryService(serviceUuid)

        console.log('Getting Characteristics...')
        const characteristics = await service.getCharacteristics(characteristicUuid)

        if (characteristics.length > 0) {
          const myCharacteristic = characteristics[0]

          console.log('Reading Characteristics...')
          const value = await myCharacteristic.readValue()
          const decoder = new TextDecoder('utf-8')
          console.log(decoder.decode(value))

          const encoder = new TextEncoder('utf-8')
          const text = 'SignOn!!\n Please press B Button.'
          await myCharacteristic.writeValue(encoder.encode(text))

          await myCharacteristic.startNotifications()
          myCharacteristic.addEventListener('characteristicvaluechanged', (event) => {
            const value = event.target.value
            const decoder = new TextDecoder('utf-8')
            console.log(decoder.decode(value))
            resultfromHW = decoder.decode(value).split('|')
            console.log(resultfromHW)
          })

          console.log('Waiting 5 seconds to receive data from the device...')
          await this.sleep(5 * 1000)

          this.updateUserData({
            userAddress: resultfromHW[0],
            userAddressShort: resultfromHW[0].substring(0, 5),
            balance: this.queryBalance(),
            mnemonic: resultfromHW[1]
          })
          await this.updatePersistance(resultfromHW[0], this.queryBalance(), resultfromHW[1])
        }
      } catch (error) {
        console.log('Argh! ' + error)
      }

      if (device) {
        if (device.gatt.connected) {
          device.gatt.disconnect()
          console.log('disconnect')
          // Refresh balance, sometime faucet is slow
          setTimeout(async () => {
            await this.queryBalance()
          }, 1000)
        }
      }
    },
    async sleep (ms) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, ms)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wallet-container {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  // min-height: calc(100vh - 170px);
  width: 100%;
  margin: 0 auto;
}
.wallet-body {
  padding-bottom: 2rem;
  // padding-top: 2rem;
}
.widget-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem 0.5rem 2rem 0.5rem;
  width: 100%;
}
.beta-badge {
  margin-left: 5px;
  font-size: 9px;
  background-color: red;
  border-radius: 10px;
  width: 30px;
  color: white;
  height: 14px;
}

.creating-wallet {
  padding-top: 50px;

  span {
    font-weight: bold;
    font-size: 21px;
    margin-bottom: 20px;
    display: block;
  }
}
.wallet-address {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  color: #f7f7f76b;
}
.balance {
  margin-top: 25px;
  img {
    width: 35px;
    height: 35px;
    margin-right: 10px;
    vertical-align: middle;
  }
  span {
    font-size: 40px;
    font-weight: bold;
    vertical-align: middle;
  }
}
.refresh {
  a {
    color: #f7f7f76b;
    font-size: 13px;
  }
}
.copy-clipboard {
  a {
    color: #f7f7f76b;
    font-size: 13px;
  }
}
.button-box {
  margin-top: 25px;
  padding: 0 30px;
  button {
    width: 100%;
    height: 60px;
    margin-bottom: 20px;
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
    // padding-top: 6rem;
  }
  .widget-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0.5rem 1rem 6rem 1rem;
    width: 100%;
  }
  .button-box {
    margin-top: 60px;
    button {
      width: 40%;
      height: 60px;
      max-width: 300px;
    }
    button:first-child {
      margin-right: 15px;
    }
    button:last-child {
      margin-left: 15px;
    }
  }
  .wallet-content {
    margin-left: 5px;
    cursor: pointer;
  }
}
</style>
