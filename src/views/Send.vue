<template>
  <div class="home">
    <img src="../assets/logo.png" width="400">
    <Transfer/>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Transfer from '@/components/Transfer'
import Footer from '@/components/Footer'

export default {
  name: 'home',
  components: {
    Transfer,
    Footer
  }
}
</script>
