<template>
  <div class="SaveToEth">
    <section class="hero is-medium is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Save Message on Ethereum
          </h1>
          <h2 class="subtitle">
            (Permanently)
          </h2>

          <section>
            <b-field label="">
              <b-input
                placeholder="Your message will be saved permanently on Ethereum"
                type="textarea"
                v-model="message"
              ></b-input>
            </b-field>
            <div class="byteLength">
              {{ byteLength }}
            </div>

            <b-field><!-- Label left empty for spacing -->
              <p class="control">
                <button class="button is-success" @click="saveToEthereum">
                  Save permanently
                </button>
              </p>
            </b-field>
          </section>

          <div v-if="transactionHash" class="card">
            <header class="card-header">
              <p class="card-header-title">
                View on Etherscan
              </p>
              <a href="#" class="card-header-icon" aria-label="more options">
                <span class="icon">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </a>
            </header>
            <div class="card-content">
              <div class="content">
                <strong>
                  <a class="card-footer-item" @click="openEtherScan">{{ etherscanLink }}</a>
                </strong>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Eth from '@/eth'
import { Toast } from 'buefy'

export default {
  name: 'SaveToEth',
  data () {
    return {
      eth: null,
      network: null,
      message: '',
      byteLength: '',
      transactionHash: ''
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
    async saveToEthereum () {
      // Validate Metamask
      if (this.validate() === false) {
        return
      }

      this.transactionHash = await this.eth.saveToEthereum(this.message)
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
</style>
