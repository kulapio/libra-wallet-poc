<template>
  <div class="wallet-container">
    <div class="card">
      <qrcode-vue
        :value="userAddress"
        :size="size"
        background="#FFFFFF"
        level="H"
      />
      <div class="address content">
        {{ userAddress }}
      </div>
      <div class="button-box">
        <b-button
          icon-left="content-copy"
          @click="copyAddress"
        >
          {{ $t('copyToClipboard') }}
        </b-button>
        <social-sharing
          :url="shareUrl"
          :title="shareText"
          :description="shareText"
          :quote="shareText"
          class="card-footer-item share"
          hashtags="Libra,Blockchain,Kulap"
          twitter-user="kulap"
          inline-template
        >
          <div>
            <network
              network="facebook"
              class="share-facebook-btn"
            >
              <b-button icon-left="facebook">
                {{ $t('shareYourWallet') }}
              </b-button>
            </network>
          </div>
        </social-sharing>
        <b-button
          icon-left="arrow-left"
          @click="back"
        >
          {{ $t('back') }}
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
      size: 260
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
.wallet-container {
  min-height: calc(100vh - 230px);
  width: 100%;
  margin: 0 auto;
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
