<template>
  <div class="home">
    <img src="../assets/logo.png" width="400">
    <SaveToEth/>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import SaveToEth from '@/components/SaveToEth'
import Footer from '@/components/Footer'

export default {
  name: 'home',
  components: {
    SaveToEth,
    Footer
  }
}
</script>
