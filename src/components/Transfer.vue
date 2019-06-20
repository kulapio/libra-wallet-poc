<template>
  <div class="Wallet">
    <section class="hero is-medium is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="user title">
            Transfer
          </h1>

          <section>
            <b-field label="To">
                <b-input v-model="toAddress" placeholder="receiver address"></b-input>
            </b-field>

            <b-field label="Amount">
              <b-input placeholder="amount to transfer"
                v-model="amount"
                type="number"
                min="1"
                max="10000000000000">
              </b-input>
            </b-field>
          </section>

           <b-field><!-- Label left empty for spacing -->
            <p id="action_area" class="control">
              <button class="button is-large is-success" @click="saveToEthereum">
                Confirm
              </button>

              <button id="back_button" class="button is-large is-info" @click="back">
                Back
              </button>
            </p>
          </b-field>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Eth from '@/eth'
import { Toast } from 'buefy'
import router from '../router'

export default {
  name: 'Wallet',
  data () {
    return {
      eth: null,
      network: null,
      message: '',
      byteLength: '',
      transactionHash: '',
      toAddress: '',
      amount: '10'
    }
  },
  computed: {
    etherscanLink () {
      return this.getEtherscanLink()
    }
  },
  async created () {
    this.eth = new Eth()
    await this.eth.init()

    // Validate Metamask
    if (this.validate() === false) {
      return
    }

    this.network = this.eth.networkName
  },
  methods: {
    back () {
      router.push({ name: 'Wallet' })
    },
    validate () {
      if (this.eth.web3 === null) {
        this.alertNoWeb3Wallet()
        return false
      }
      if (this.eth.userAddress === '') {
        this.alertWeb3Login()
        return false
      }
      return true
    },
    alertNoWeb3Wallet () {
      Toast.open({
        message: 'No MetaMask installed!',
        position: 'is-bottom',
        type: 'is-danger',
        duration: '600000'
      })
    },
    alertWeb3Login () {
      Toast.open({
        message: 'Please Login on MetaMask!',
        position: 'is-bottom',
        type: 'is-danger',
        duration: '600000'
      })
    },
    getEtherscanLink () {
      let url = ''
      switch (this.eth.networId) {
        case 1:
          url = `https://etherscan.io/tx/${this.transactionHash}`
          break
        case 3:
          url = `https://ropsten.etherscan.io/tx/${this.transactionHash}`
          break
        case 4:
          url = `https://rinkeby.etherscan.io/tx/${this.transactionHash}`
          break
        case 42:
          url = `https://kovan.etherscan.io/tx/${this.transactionHash}`
          break
        default:
          url = `https://etherscan.io/tx/${this.transactionHash}`
      }
      return url
    },
    openEtherScan () {
      window.open(this.etherscanLink, '_blank')
    }
  },
  watch: {
    message (newValue) {
      this.byteLength = this.eth.textToByteLength(newValue)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.byteLength {
  float: right;
}
</style>

<style>
.label {
  color: white !important;
}
.card {
  margin-top: 25px;
}
.card-footer-item.share {
  padding: 0px;
}
.card-footer-item.share span {
  width: 100%;
  height: 100%;
  padding: 12px;
  color: #7957d5;
  cursor: pointer;
}
#back_button {
  margin-left: 60px;
}

._7zme ._7zoh {
    height: 100%;
    width: 100%;
}
._7zoh {
    height: 15px;
    width: 15px;
}
._7zo5 {
    display: inline-block;
    height: 100%;
    width: 100%;
}
._7zme {
    display: inline-block;
    height: 24px;
    line-height: 20px;
    width: 24px;
}

.user {
  color: #ffffff6b !important;
}

#refresh {
  margin-left: 10px;
  /* display: none; */
  display: inline-block;
}

#action_area {
  margin: 50px auto 0px auto;
  width: fit-content;
}
</style>
