<template>
  <div class="Wallet">
    <VueElementLoading
      :active="isTransfering"
      spinner="bar-fade-scale"
      color="#9b67df"
      text="Transfering ..."
      is-full-screen
    />
    <section class="wallet-container hero is-medium is-primary is-bold">
      <div class="wallet-body">
        <div class="input-box">
          <b-field label="Destination Address">
            <b-input
              v-model="address"
              placeholder="Destination address"
            />
          </b-field>
        </div>
        <div class="input-box">
          <b-field label="Amount">
            <b-input
              v-model="amount"
              step="0.000001"
              placeholder="Amount"
              type="number"
            />
          </b-field>
        </div>
        <div class="button-box">
          <b-button
            type="is-success"
            @click="transfer"
          >
            Confirm
          </b-button>
          <b-button @click="back">
            Cancel
          </b-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import config from '../config'
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import VueElementLoading from 'vue-element-loading'

export default {
  name: 'Wallet',
  data () {
    return {
      address: '',
      amount: '10',
      isTransfering: false
    }
  },
  components: {
    VueElementLoading
  },
  created () {
    if (!this.mnemonic) {
      this.$router.push({ name: 'Wallet' })
    }
    if (this.$route.query && this.$route.query.to) {
      this.address = this.$route.query.to
      this.updateUserAddress(this.$route.query.to)
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
      this.isTransfering = true
      try {
        await axios.post(config.api + '/transfer', {
          fromAddress: this.userAddress,
          mnemonic: this.mnemonic,
          toAddress: this.address,
          amount: this.amount
        })
        this.$router.push({ name: 'Wallet' })
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
