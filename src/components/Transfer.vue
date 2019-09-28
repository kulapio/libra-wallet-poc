<template>
  <div class="Wallet">
    <VueElementLoading
      :active="isTransfering"
      spinner="bar-fade-scale"
      color="#9b67df"
      :text="$t('transfering')"
      is-full-screen
    />
    <section class="wallet-container hero is-medium is-primary is-bold">
      <div class="wallet-body">
        <div v-if="labelHead !== ''" class="input-box">
          <b-field :label="labelHead">
            <b-input :disabled="!editable"
              v-model="labelValue"
              :placeholder="$t('destinationAddress')"
            />
          </b-field>
        </div>
        <div v-else class="input-box">
          <b-field :label="$t('destinationAddress')">
            <b-input :disabled="!editable"
              v-model="address"
              :placeholder="$t('destinationAddress')"
            />
          </b-field>
        </div>
        <div class="input-box">
          <b-field :label="$t('amount')">
            <b-input :disabled="!editable"
              v-model="amount"
              step="0.000001"
              :placeholder="$t('amount')"
              type="number"
            />
          </b-field>
        </div>
        <div class="button-box">
          <b-button
            type="is-success"
            @click="transfer"
          >
            {{ $t('confirm') }}
          </b-button>
          <b-button @click="back">
            {{ $t('cancel') }}
          </b-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import VueElementLoading from 'vue-element-loading'
import LibraService from '@/service/libra_service'
import recordStat from '@/service/record_stat'

export default {
  name: 'Wallet',
  data () {
    return {
      address: '',
      amount: '10',
      labelHead: '',
      labelValue: '',
      editable: true,
      isTransfering: false,
      libra: new LibraService()
    }
  },
  components: {
    VueElementLoading
  },
  created () {
    if (!this.mnemonic) {
      this.$router.push({ name: 'Wallet' })
    }
    if (this.$route.query) {
      if (this.$route.query.to) {
        this.address = this.$route.query.to
        this.updateUserAddress(this.$route.query.to)
      }
      if (this.$route.query.amount) {
        this.amount = this.$route.query.amount
      }
      if (this.$route.query.editable !== undefined) {
        this.editable = this.$route.query.editable
      }
      if (this.$route.query.labelHead !== undefined) {
        this.labelHead = this.$route.query.labelHead
      }
      if (this.$route.query.labelValue !== undefined) {
        this.labelValue = this.$route.query.labelValue
      }
    }
  },
  computed: {
    ...mapState({
      userAddress: state => state.userAddress,
      mnemonic: state => state.mnemonic
    })
  },
  methods: {
    ...mapActions({
      updateUserAddress: 'updateUserAddress'
    }),
    back () {
      this.$router.push({ name: 'Wallet' })
    },
    async transfer () {
      // Record stat
      recordStat(['transactions', 'transfers'])

      this.isTransfering = true
      try {
        const mnemonic = this.mnemonic.split(';')[0]
        const toAddress = this.address
        await this.libra.transfer(mnemonic, toAddress, this.amount)
        // Fire event to Google Analytic
        this.$ga.event({
          eventCategory: 'Transaction',
          eventAction: 'Transfer'
        })
        // For peer to peer transfer
        if (this.labelHead === '') {
          this.$router.push({ name: 'Wallet' })

        // For payment
        } else {
          this.$router.push({ name: 'PaymentSuccess' })
          this.$router.push({
            name: 'PaymentSuccess',
            query: {
              address: this.address,
              amount: this.amount,
              receiptId: this.address.substr(0, 7),
              merchant: this.labelValue
            }
          })
        }
      } catch (e) {
        console.log(e)
        this.$toast.open({
          type: 'is-danger',
          duration: 5000,
          message: 'Something went wrong.'
        })
      }
      this.isTransfering = false
    }
  }
}
</script>

<style lang="scss">
.input-box {
  text-align: left;
  margin-bottom: 20px;
  .field {
    label {
      color: #fff;
    }
  }
}
</style>

<style>
.input[disabled] {
  color: #1f1f1f !important;
  background-color:white !important;
  opacity: 0.9;
}
</style>

<style lang="scss" scoped>
.wallet-container {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  min-height: calc(100vh - 170px);
  width: 100%;
  margin: 0 auto;
}
.wallet-body {
  padding: 20px;
}
.button-box {
  margin-top: 55px;
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
    padding: 50px;
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
