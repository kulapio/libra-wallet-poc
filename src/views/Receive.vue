<template>
  <div class="home">
    <img src="../assets/logo.png" width="400">
    <WalletInfo/>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import WalletInfo from '@/components/WalletInfo'
import Footer from '@/components/Footer'

export default {
  name: 'home',
  components: {
    WalletInfo,
    Footer
  }
}
</script>
