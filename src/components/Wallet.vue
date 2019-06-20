<template>
  <div class="Wallet">
    <section class="hero is-medium is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="user title">
            #user{{ $store.state.userAddressShort }}
          </h1>

          <h1 class="title">
            <div class="_7zme">
              <svg viewBox="0 0 300 297" class="_7zo5 _7zoh"><g stroke="none" fill="#FFFFFF" stroke-width="1" fill-rule="evenodd"><path d="M32.7250157,292.431818 C21.9974295,285.270376 11.2171787,278.073197 0.462319749,270.893887 C23.1297179,230.872571 56.8632602,207.860031 96.6974295,210.935266 C112.085831,212.123041 126.400251,217.036834 139.72627,224.645925 C150.594922,230.852821 161.128777,237.64373 171.921254,243.987931 C182.559498,250.240909 193.815611,254.650627 206.395862,255.06348 C221.233166,255.549687 234.364514,250.95094 245.031912,240.87884 C252.940063,233.411755 259.750721,224.784169 267.648527,216.008934 C277.699937,222.718025 288.667335,230.037461 299.918746,237.546865 C282.237555,265.669749 261.104013,288.593887 227.130658,295.197649 C205.258871,299.449373 184.391473,295.710188 164.742884,285.653135 C155.012163,280.673511 145.743197,274.768495 136.388652,269.079781 C126.195235,262.882288 115.948213,256.776019 104.066708,254.467241 C83.2717241,250.426176 65.2068339,255.978527 50.496489,271.176019 C44.2294044,277.65094 38.8773668,285.010815 32.7250157,292.431818"></path><path d="M299.920345,27.824953 C282.241034,55.9262069 261.125361,78.8531661 227.156708,85.4682132 C205.2821,89.7274608 184.419404,85.9910972 164.767994,75.9415674 C155.035392,70.9647649 145.765486,65.0616301 136.41094,59.3719749 C126.219404,53.1726019 115.973323,47.0625705 104.093699,44.7500313 C83.3034169,40.7033229 65.2310031,46.2359248 50.5159561,61.4334169 C44.2469906,67.909279 38.8911912,75.2682132 32.7275549,82.6995611 C22.1993417,75.6754232 11.325047,68.4208777 0.471442006,61.1794984 C23.5958934,20.2816928 57.6501254,-1.96062696 97.1391536,1.24438871 C112.51627,2.4923511 126.806238,7.49266458 140.115329,15.1337304 C150.834451,21.2870219 161.244169,27.9782445 171.897461,34.2509718 C182.390878,40.4315361 193.502163,44.8205643 205.897147,45.3293417 C221.078652,45.9519122 234.462038,41.2130408 245.363605,30.8663323 C252.12348,24.4506583 257.721912,16.8077116 263.804671,9.68388715 C264.791191,8.52808777 265.583041,7.20583072 266.688997,5.64564263 C277.848245,13.0939185 288.731944,20.3578683 299.920345,27.824953"></path><path d="M267.251567,110.887618 C277.871944,117.977586 288.64373,125.168182 299.962853,132.724608 C296.569749,137.733386 293.515204,142.613323 290.095768,147.224295 C277.179781,164.641223 261.741536,179.080721 240.944671,186.548746 C214.526803,196.034953 188.803918,193.076332 164.169122,180.500784 C153.323041,174.96442 143.110815,168.182915 132.625862,161.943103 C122.223668,155.752194 111.567555,150.359718 99.2722571,148.853135 C82.2446708,146.766301 67.0847962,151.072571 54.6023511,162.671003 C47.7841693,169.00674 42.2496865,176.726803 36.173511,183.853448 C35.187931,185.009248 34.3951411,186.330564 33.2666144,187.923668 C22.1233542,180.479154 11.2528213,173.215204 0.000470219436,165.697335 C18.4989028,136.828683 40.1826019,112.94906 75.7170846,106.991379 C96.7189655,103.470376 116.582915,107.670376 135.19326,117.481034 C145.835266,123.090752 155.740909,130.095141 166.37163,135.72931 C175.571944,140.604545 184.960345,145.859718 194.915831,148.427116 C215.826489,153.822414 234.311755,147.673824 249.318339,132.228056 C255.602351,125.759718 260.980721,118.412069 267.251567,110.887618"></path></g></svg>
            </div>
            {{ $store.state.balance }}
            <div id="refresh">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="#FFFFFF" d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" />
              </svg>
            </div>
          </h1>

          <b-field><!-- Label left empty for spacing -->
            <p id="action_area" class="control">
              <button class="button is-large is-success" @click="openSend">
                Send
              </button>

              <button id="receive_button" class="button is-large is-info" @click="openReceive">
                Receive
              </button>
            </p>
          </b-field>

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
import { Toast } from 'buefy'
import router from '../router'
import config from '../config'
import axios from 'axios'

export default {
  name: 'Wallet',
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
    console.log(config.api)

    axios.post(config.api + '/createWallet', {
    }).then(response => {
      console.log(response.data)
      this.$store.state.userAddress = response.data.address
      this.$store.state.userAddressShort = response.data.address.substring(0, 5)
      this.$store.state.balance = response.data.balance
      this.$store.state.mnemonic = response.data.mnemonic
    }).catch(error => {
      console.log(error)
    })
    // this.eth = new Eth()
    // await this.eth.init()

    // // Validate Metamask
    // if (this.validate() === false) {
    //   return
    // }

    // this.network = this.eth.networkName
  },
  methods: {
    openSend () {
      router.push({ name: 'Send' })
    },
    openReceive () {
      router.push({ name: 'Receive' })
    },
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
#receive_button {
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
  margin: 88px auto 0px auto;
  width: fit-content;
}
</style>
