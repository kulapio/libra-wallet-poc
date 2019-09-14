<template>
  <div>
    <section class="main-section" data-responsive="true" data-is-screen-width="true" data-col-margin="0" data-row-margin="0" id="comp-jy6084vv">
      <div style="position:relative;width:calc(100% - 0px);" id="comp-jy6084vvinlineContent" class="strc1inlineContent">
        <div style="position:relative;width:100%;left:0;flex:980;margin-left:0;top:0;margin-top:0;margin-bottom:0;height:;display:flex;bottom:;right:" data-content-width="980" data-is-mesh="true" class="mc1" id="comp-jy6084xp">
          <div style="position:relative;height:100%;width:100%" id="comp-jy6084xpcontainer" class="mc1container">
            <div id="comp-jy6084xpinlineContentParent" class="mc1inlineContentParent">
              <div class="mc1inlineContent" style="width:100%;position:relative;top:0;bottom:0" id="comp-jy6084xpinlineContent">
                <div id="comp-jy6084xpinlineContent-gridWrapper" data-mesh-internal="true">
                  <div id="comp-jy6084xpinlineContent-gridContainer" data-mesh-internal="true">
                    <div style="width: 340px; height: 72px;" v-bind:style= "[window.width > 600 ? {'left': '0'} : {'left': '20px'}]"  title="" data-is-responsive="false" data-display-mode="fill" data-content-padding-horizontal="0" data-content-padding-vertical="0" data-exact-height="72" class="ca1" id="comp-jy67342h">
                      <div style="width: 340px; height: 72px;" id="comp-jy67342hlink" class="ca1link">
                        <div style="width: 340px; height: 72px; position: relative; top: 0px; left: 0px;" data-has-bg-scroll-effect="" data-style="" data-image-info="{&quot;imageData&quot;:{&quot;type&quot;:&quot;Image&quot;,&quot;id&quot;:&quot;dataItem-jy67346y&quot;,&quot;metaData&quot;:{&quot;pageId&quot;:&quot;mainPage&quot;,&quot;isPreset&quot;:false,&quot;schemaVersion&quot;:&quot;2.0&quot;,&quot;isHidden&quot;:false},&quot;title&quot;:&quot;&quot;,&quot;uri&quot;:&quot;8caecf_fef9994faa4846dd98306be083510876~mv2.png&quot;,&quot;description&quot;:&quot;&quot;,&quot;width&quot;:685,&quot;height&quot;:145,&quot;alt&quot;:&quot;libracamp logo_2x.png&quot;,&quot;name&quot;:&quot;libracamp logo_2x.png&quot;},&quot;displayMode&quot;:&quot;fill&quot;}" class="ca1img" id="comp-jy67342himg">
                          <img id="comp-jy67342himgimage" style="object-position: 50% 50%; width: 340px; height: 72px; object-fit: cover;" alt="libracamp logo_2x.png" data-type="image" itemprop="image" src="@/assets/img/libra-camp/libracamp logo_2x.png">
                        </div>
                      </div>
                    </div>
                    <div data-packed="true" v-bind:style= "[window.width > 600 ? {'width': '498px', 'padding': '10px 0 10px 0'} : { width: '100vw', 'padding': '15px 30px 10px 30px' }]" id="comp-jy675381">
                      <h1 class="font_0" style="font-size:18px; line-height:1.5em;">
                        <span style="color:#3E2C8F;">
                          <span style="font-weight:bold;">
                            <span style="font-size:18px;">
                              <span style="font-family:roboto-thin,roboto,sans-serif;">{{ $t('libracampGrantPlan') }}</span>
                            </span>
                          </span>
                        </span>
                      </h1>
                    </div>
                    <div data-packed="true" v-bind:style= "[window.width > 600 ? {'width': '498px', 'padding': '15px 0 30px 0'} : { width: '100vw', 'padding': '15px 30px 0 30px' }]" id="comp-jy67613u">
                      <h1 class="font_0" style="font-size:18px; line-height:1.5em;">
                        <span style="color:#464646;">
                          <span style="font-size:18px;">
                            <span style="font-family:roboto-thin,roboto,sans-serif;">{{ $t('libracampGrantPlanDesc') }}</span>
                          </span>
                        </span>
                      </h1>
                      <h1 class="font_0" style="font-size:18px; line-height:1.5em;">&nbsp;</h1>
                      <h1 class="font_0" style="font-size:18px; line-height:1.5em;">
                        <span style="color:#464646;">
                          <span style="font-size:18px;">
                            <span style="font-family:roboto-thin,roboto,sans-serif;">{{ $t('libracampDesc') }}</span>
                          </span>
                        </span>
                      </h1>
                      <h1 class="font_0" style="font-size:18px; line-height:1.5em;">
                        <span style="color:#4A4A4A;">
                          <span style="font-size:18px;">
                            <span style="font-family:roboto-thin,roboto,sans-serif;">{{ $t('visit') }}</span>
                          </span>
                        </span>
                        <span style="color:#0076D1;">
                          <span style="font-size:18px;">
                            <span style="font-family:roboto-thin,roboto,sans-serif;">
                              <a href="https://www.libracamp.com/" target="_blank" data-type="external" rel="undefined">&nbsp;libracamp.com&nbsp;</a>
                            </span>
                          </span>
                        </span>
                        <span style="color:#4A4A4A;">
                          <span style="font-size:18px;">
                            <span style="font-family:roboto-thin,roboto,sans-serif;">{{ $t('toLearnMore') }}</span>
                          </span>
                        </span>
                      </h1>
                    </div>
                    <div id="comp-jy6084xpinlineContent-wedge-3" data-mesh-internal="true">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'LibraGrantProgram',
  data () {
    return {
      window: {
        width: 0,
        height: 0
      }
    }
  },
  async created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize () {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    }
  }
}
</script>

<style scoped>
#comp-jy67342h {
    position: relative;
    margin: 40px 0px 20px 0;
    /* left: 20px; */
    grid-area: 1 / 1 / 2 / 2;
    justify-self: start;
    align-self: start;
}
.main-section {
  left: 0;
  width: fit-content;
  height: auto;
  margin: 0 auto;
  text-align: left;
}
.txtNew {
  padding: 10px 30px 15px 30px;
}
.description-container {
  padding: 15px 30px 30px 30px;
}
</style>
