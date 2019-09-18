<template>
  <div id="app">
    <div id="nav" style="display: flex; justify-content: center;">
      <div class="menu-container">
        <router-link to="/">{{ $t('home') }}</router-link> |
        <router-link to="/stats">{{ $t('stats') }}</router-link> |
        <router-link to="/about">{{ $t('about') }}</router-link> |
        <router-link v-bind:to="`/blog?locale=${locale}`">{{ $t('blog') }}</router-link>
      </div>
      <b-dropdown
        style="margin-left: auto;"
        aria-role="list"
        position="is-bottom-left"
      >
        <div slot="trigger" class="dropdown-container">
          <span>{{ locale.toUpperCase() }}</span>
          <b-icon icon="menu-down"></b-icon>
        </div>
        <b-dropdown-item aria-role="listitem" @click="switchLocale('en')">English (EN)</b-dropdown-item>
        <b-dropdown-item aria-role="listitem" @click="switchLocale('th')">ไทย (TH)</b-dropdown-item>
      </b-dropdown>
    </div>
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
  },
  data () {
    return {
      locale: localStorage.getItem('locale') || 'en'
    }
  },
  created () {
    this.$i18n.locale = this.locale
  },
  methods: {
    switchLocale (locale) {
      this.locale = locale
      this.$i18n.locale = locale
      localStorage.setItem('locale', locale)
    }
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
#nav {
  padding: 30px 5px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
.header-image {
  height: 70px;
  cursor: pointer;
}
.menu-container {
  display: inline-table;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
.dropdown-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}

/* on desktop */
@media only screen and (min-width: 1025px) {
  #nav {
    padding: 30px;
  }
}
</style>
