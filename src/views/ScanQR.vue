<template>
  <div class="home">
    <img src="../assets/logo.png" width="400">
    <QRScanner/>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import QRScanner from '@/components/QRScanner'
import Footer from '@/components/Footer'

export default {
  name: 'home',
  components: {
    QRScanner,
    Footer
  }
}
</script>
