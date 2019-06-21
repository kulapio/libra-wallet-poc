<template>
  <div class="Wallet">
    <section class="hero is-medium is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="user title">
            Wallet info
          </h1>

          <div>
            <div id="qrcode_box">
              <qrcode-vue :value="$store.state.userAddress" :size="size" background="#FFFFFF" level="H"></qrcode-vue>
            </div>
          </div>

          <h2 class="subtitle">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">
                  Your public Address
                </p>
                <a href="#" class="card-header-icon" aria-label="more options">
                  <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </a>
              </header>
              <div class="card-content">
                <div class="content">
                  <strong>{{ $store.state.userAddress }}</strong>
                </div>
              </div>
              <footer class="card-footer">
                <a class="card-footer-item" @click="copyAddress">Copy Address</a>
                <a class="card-footer-item" @click="copyPublicLink">Copy Public Link</a>
                <social-sharing :url="shareUrl"
                  class="card-footer-item share"
                  title="Hi there, this's my Libra Wallet!"
                  description="Hi there, this's my Libra Wallet!"
                  quote="Hi there, this's my Libra Wallet!"
                  hashtags="Libra,Blockchain,Kulap"
                  twitter-user="kulap"
                  inline-template>
                  <div>
                    <network network="facebook">
                      <i class="fa fa-facebook"></i>Share
                    </network>
                  </div>
                </social-sharing>
              </footer>
            </div>
          </h2>

           <b-field><!-- Label left empty for spacing -->
            <p id="action_area" class="control">
              <button id="back_button" class="button is-large is-info" @click="back">
                Back
              </button>
            </p>
          </b-field>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Toast } from 'buefy'
import router from '../router'
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'Wallet',
  data () {
    return {
      shareUrl: 'https://dev.kulap.io/libra',
      size: 300
    }
  },
  computed: {
  },
  components: {
    QrcodeVue
  },
  async created () {
  },
  methods: {
    back () {
      router.push({ name: 'Wallet' })
    },
    copyAddress () {
      this.copyText(this.$store.state.userAddress)
    },
    copyText (text) {
      this.$copyText(text).then(function (e) {
        Toast.open({
          message: 'Copied!',
          position: 'is-bottom',
          type: 'is-success'
        })
      }, function (e) {
        Toast.open({
          duration: 5000,
          message: 'Can\'t copy',
          position: 'is-bottom',
          type: 'is-danger'
        })
      })
    },
    copyPublicLink () {
      this.copyText(this.shareUrl)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.byteLength {
  float: right;
}

.hero.is-primary .subtitle a:not(.button), .hero.is-primary .subtitle strong {
  color: #7957d5;
}

.card {
  margin-top: 25px;
}

.linkTable {
  margin-top: 25px;
}

.fileUpload {
  margin: 60px;
}

.dropFileLabel {
  font-size: 32px;
}

.uploading {
  margin: 80px;
}

.subtitle {
  margin-top: 20px !important;
}

#qrcode_box {
  width: fit-content;
  margin: 0 auto;
  background: white;
  padding: 17px;
}
</style>

<style>
.label {
  color: white !important;
}
.card {
  margin-top: 25px;
}
.card-footer-item.share {
  padding: 0px;
}
.card-footer-item.share span {
  width: 100%;
  height: 100%;
  padding: 12px;
  color: #7957d5;
  cursor: pointer;
}
#back_button {
  margin-left: 0px;
}

._7zme ._7zoh {
    height: 100%;
    width: 100%;
}
._7zoh {
    height: 15px;
    width: 15px;
}
._7zo5 {
    display: inline-block;
    height: 100%;
    width: 100%;
}
._7zme {
    display: inline-block;
    height: 24px;
    line-height: 20px;
    width: 24px;
}

.user {
  color: #ffffff6b !important;
}

#refresh {
  margin-left: 10px;
  /* display: none; */
  display: inline-block;
}

#action_area {
  margin: 50px auto 0px auto;
  width: fit-content;
}
</style>
