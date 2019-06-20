<template>
  <div class="home">
    <img src="../assets/logo.png" width="400">
    <Wallet/>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Wallet from '@/components/Wallet'
import Footer from '@/components/Footer'

export default {
  name: 'home',
  components: {
    Wallet,
    Footer
  }
}
</script>
