<template>
  <div class="home">
    <QRScanner/>
  </div>
</template>

<script>
// @ is an alias to /src
import QRScanner from '@/components/QRScanner'

export default {
  name: 'home',
  components: {
    QRScanner
  }
}
</script>
