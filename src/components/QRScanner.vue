<template>
  <div class="Wallet">
    <section class="wallet-container hero is-medium is-primary is-bold">
      <div class="wallet-body">
        <div class="qr-scanner">
          <qrcode-stream
            @init="onInit"
            @decode="onDecode"
          />
          <img
            v-if="!loading"
            src="@/assets/img/qr-scaner-border.png"
          >
        </div>
      </div>
      <div class="button-box">
        <b-button
            icon-left="pencil"
            @click="sendWithManualAddress"
          >
            {{ $t('sendManually') }}
          </b-button>
          <b-button
            icon-left="arrow-left"
            @click="back"
          >
            {{ $t('back') }}
          </b-button>
      </div>
    </section>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
  name: 'Wallet',
  components: {
    QrcodeStream
  },
  data () {
    return {
      qrString: '',
      loading: false
    }
  },
  methods: {
    sendWithManualAddress () {
      this.$router.push({ name: 'Send' })
    },
    back () {
      this.$router.push({ name: 'Wallet' })
    },
    async onInit (promise) {
      this.loading = true
      try {
        await promise
      } catch (error) {
        this.$toast.open({
          message: `QR scanner error.`,
          type: 'is-danger'
        })
      } finally {
        this.loading = false
      }
    },
    onDecode (decodedString) {
      console.log('decodedString', decodedString)
      // Libra address
      if (decodedString.length === 64) {
        this.$router.push({
          name: 'Send',
          query: {
            to: decodedString
          }
        })
      // Payment QR
      } else if (decodedString[0] === '{') {
        const decodedJson = JSON.parse(decodedString)
        console.log('decodedJson', decodedJson)
        // Peer-to-peer Payment
        if (decodedJson.type === 'peer_to_peer_payment') {
          this.$router.push({
            name: 'Send',
            query: {
              to: decodedJson.address,
              amount: decodedJson.amount,
              editable: false,
              labelHead: 'Pay to',
              labelValue: decodedJson.merchant
            }
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wallet-container {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  min-height: calc(100vh - 170px);
  width: 100%;
  margin: 0 auto;
}
.wallet-body {
  padding-bottom: 20px;
  padding-top: 20px;
}
.qr-scanner {
  padding: 20px;
  position: relative;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    max-width: 300px;
  }
}
.button-box {
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
  .button-box {
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
}
</style>
