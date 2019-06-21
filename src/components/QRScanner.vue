<template>
  <div class="Wallet">
    <section class="hero is-medium is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="user title">
            Scan your friend QR
          </h1>

          <qrcode-stream @decode="onDecode"></qrcode-stream>

          <h1 class="user title">
            {{ qrString }}
          </h1>

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
// import { Toast } from 'buefy'
import router from '../router'
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'

export default {
  name: 'Wallet',
  data () {
    return {
      qrString: ''
    }
  },
  computed: {
  },
  async created () {

  },
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
  },
  methods: {
    back () {
      router.push({ name: 'Wallet' })
    },
    onDecode (decodedString) {
      console.log('decodedString', decodedString)
      this.qrString = decodedString
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
  margin-left: 60px;
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

<style>
.label {
  color: white !important;
}
</style>
