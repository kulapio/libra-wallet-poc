<template>
  <div id="app">
    <div class="localize-container">
      <b-dropdown
        style="margin-left: auto;"
        aria-role="list"
        position="is-bottom-left"
      >
        <div slot="trigger" class="dropdown-container">
          <span id="localize">{{ locale.toUpperCase() }}</span>
          <b-icon icon="menu-down"></b-icon>
        </div>
        <b-dropdown-item aria-role="listitem" @click="switchLocale('en')">English (EN)</b-dropdown-item>
        <b-dropdown-item aria-role="listitem" @click="switchLocale('th')">ไทย (TH)</b-dropdown-item>
      </b-dropdown>
    </div>
    <div id="nav" style="display: flex; justify-content: center;">
      <div class="menu-container">
        <router-link to="/">{{ $t('wallet') }}</router-link> |
        <router-link to="/merchant">{{ $t('merchant') }}</router-link> |
        <router-link to="/stats">{{ $t('stats') }}</router-link> |
        <router-link to="/about">{{ $t('about') }}</router-link> |
        <router-link v-bind:to="`/blog?locale=${locale}`">{{ $t('blog') }}</router-link>
      </div>
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
  margin-top: 10px;
  margin-bottom: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
#localize {
  font-size: 12px;
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
.localize-container {
  display: flex;
  padding: 5px 5px 0px 5px;
}

/* on desktop */
@media only screen and (min-width: 1025px) {
  #nav {
    margin-top: 10px;
    margin-bottom: 30px;
  }
  #localize {
    font-size: 1vw;
  }
  .localize-container {
    display: flex;
    padding: 10px 20px 0px 20px;
  }
}
</style>
