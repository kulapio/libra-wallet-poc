<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <div class="title">
            <div v-if="!wallets">
              {{ $t('loading') }}
            </div>
            <div v-if="wallets">
              {{ Number(this.wallets).toLocaleString() }}
            </div>
          </div>
          <h2 class="subtitle">
            {{ $t('wallets') }}
          </h2>
        </div>
      </div>
    </section>
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            <div v-if="!transactions">
              {{ $t('loading') }}
            </div>
            <div v-if="transactions">
              {{ Number(this.transactions).toLocaleString() }}
            </div>
          </h1>
          <h2 class="subtitle">
            {{ $t('transactions') }}
          </h2>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import config from '@/config.json'
import axios from 'axios'

export default {
  name: 'Wallet',
  data () {
    return {
      wallets: '',
      transactions: ''
    }
  },
  async created () {
    this.getStats()
  },
  computed: {
  },
  methods: {
    async getStats () {
      try {
        const { data } = await axios.post(config.api + '/stats')
        console.log(data)
        this.wallets = data.wallets
        this.transactions = data.transactions
        return data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
