<template>
  <div class="wallet-container">
    Payment success
    <div class="card">
      <div class="logo">
        <img src="@/assets/img/class-cafe/8-class-cafe-03.png"
          srcset="@/assets/img/class-cafe/8-class-cafe-03@2x.png 2x,
                  @/assets/img/class-cafe/8-class-cafe-03@3x.png 3x"
          class="-Class-Cafe_03">
      </div>
      <div class="receipt">
        <span class="receipt_label">Receipt ID : </span><span class="receipt_value">0012345</span>
      </div>
      <div class="payment_success">
        <img src="@/assets/img/check-circle-outline.svg" class="check-circle-outline" />
        <span class="payment_success_word">PAYMENT SUCCESS</span>
      </div>
      <div class="amount">
        <img src="@/assets/img/libra-icon/logo-libra-white-background.jpg"
          srcset="@/assets/img/libra-icon/logo-libra-white-background@2x.jpg 2x,
                  @/assets/img/libra-icon/logo-libra-white-background@3x.jpg 3x"
          class="logo-libra-payment">
        <span class="amount_value">{{ amount | numberWithCommas }}</span>
      </div>
      <div class="button-box">
        <b-button
          type="is-primary"
          @click="back"
        >
          Close
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Wallet',
  components: {
    QrcodeVue
  },
  data () {
    return {
      amount: '120.12'
    }
  },
  filters: {
    numberWithCommas (x) {
      let parts = x.toString().split('.')
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return parts.join('.')
    }
  },
  computed: {
    ...mapState({
      userAddress: state => state.userAddress
    }),
    shareUrl () {
      return `https://dev.kulap.io/libra/#/receive?address=${this.userAddress}`
    },
    shareText () {
      return `Hi there, this's my Libra Wallet!
      Please send Libra coin to me at address :
      ${this.userAddress}`
    }
  },
  created () {
    if (this.$route.query && this.$route.query.address) {
      this.updateUserAddress(this.$route.query.address)
    } else if (this.userAddress) {
      this.updateUserAddress(this.userAddress)
    } else {
      this.$router.push({ name: 'Wallet' })
    }
  },
  methods: {
    ...mapActions({
      updateUserAddress: 'updateUserAddress'
    }),
    back () {
      this.$router.push({ name: 'Wallet' })
    },
    copyAddress () {
      this.copyText(this.userAddress)
    },
    copyText (text) {
      this.$copyText(text).then((e) => {
        this.$toast.open({
          message: 'Copied!',
          position: 'is-bottom',
          type: 'is-success'
        })
      }, (e) => {
        this.$toast.open({
          duration: 5000,
          message: 'Can\'t copy',
          position: 'is-bottom',
          type: 'is-danger'
        })
      })
    },
    copyPublicLink () {
      this.copyText(this.shareUrl)
    }
  }
}
</script>

<style lang="scss">
.card-footer-item {
  padding: 0 !important;
  border: 0 !important;
}
.share-facebook-btn {
  width: 100%;
  button {
    width: 100%;
    max-width: 300px;
    height: 60px;
    margin-bottom: 20px;
  }
}
</style>

<style lang="scss" scoped>
.logo {
  margin-top: 20px;
}
.receipt {
  margin-top: 20px;
}
.receipt_label {
  font-family: Avenir;
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #0a0a0a;
}
.receipt_value {
  font-family: Avenir;
  font-size: 18px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #0a0a0a;
}
.check-circle-outline {
  width: 45px;
  height: 45px;
  object-fit: contain;
}
.payment_success {
  margin-top: 50px;
}
.payment_success_word {
  width: 215px;
  height: 30px;
  font-family: Avenir;
  font-size: 22px;
  font-weight: 900;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #43a047;
  display: inline-block;
  vertical-align: top;
  padding-top: 9px;
  margin-left: 7px;
}
.logo-libra-payment {
  width: 65px;
  height: 48px;
  object-fit: contain;
}
.amount {
  margin-top: 40px;
}
.amount_value {
  width: 138px;
  height: 48px;
  font-family: Avenir;
  font-size: 35px;
  font-weight: 900;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #41318c;
  display: inline-block;
  vertical-align: top;
  padding-top: 3px;
}
.wallet-container {
  min-height: calc(100vh - 230px);
  width: 100%;
  margin: 0 auto;
}
.card {
  width: 90%;
  margin: 0 auto;
  padding: 20px;
  border-radius: 3px;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.button-box {
  margin-top: 55px;
  padding: 0 30px;
  button {
    width: 100%;
    height: 60px;
    margin-bottom: 20px;
    max-width: 300px;
    font-size: 30px;
    padding-top: 6px;
  }
}
/* on desktop */
@media only screen and (min-width: 1025px) {
  .wallet-container {
    margin: 10px auto;
    width: 70%;
    border-radius: 3px;
  }
}
</style>
