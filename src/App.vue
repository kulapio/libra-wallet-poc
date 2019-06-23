<template>
  <div id="app">
    <router-link to="/">
      <img
        src="@/assets/img/logo.png"
        class="header-image"
      >
    </router-link>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    Footer
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.header-image {
  height: 70px;
  cursor: pointer;
}
</style>
