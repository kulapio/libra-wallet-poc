<template>
  <div>
    <Wallet/>
    <div id="comp-jy5zp152inlineContent-gridContainer">
      <img id="comp-jy5zsjvkimgimage" style="object-position: 50% 50%; width: 30px; height: 30px; object-fit: cover;" alt="libracamp_mini_2x.png" data-type="image" itemprop="image" src="https://static.wixstatic.com/media/8caecf_8aebe5dd6d3e480cb054ade9d1b37502~mv2.png/v1/fill/w_60,h_60,al_c,lg_1,q_80/libracamp_mini_2x.webp">
      <span style="font-size:24px;vertical-align:super;margin-left:10px;">A Libracamp grant plan project.</span>
    </div>
  </div>
</template>

<script>
import Wallet from '@/components/Wallet'

export default {
  name: 'home',
  components: {
    Wallet
  }
}
</script>
<style scoped>
#comp-jy5zp152inlineContent-gridContainer {
    display: block;
    height: auto;
    width: 70%;
    min-height: auto;
    grid-template-rows: min-content min-content min-content min-content 1fr;
    grid-template-columns: 100%;
    margin: 0 auto;
    margin-top: 33px;
}
#comp-jy5zsjvk {
    position: relative;
    /* margin: 0px 0px 10px calc((100% - 980px) * 0.5); */
    /* left: -104px; */
    /* grid-area: 4 / 1 / 5 / 2; */
    /* justify-self: start; */
    /* align-self: start; */
}
#comp-jy5zxphb {
    position: relative;
    /* margin: 1px 0px 10px calc((100% - 980px) * 0.5); */
    /* left: -64px; */
    /* grid-area: 4 / 1 / 5 / 2; */
    /* justify-self: start; */
    /* align-self: start; */
}
.txtNew {
    word-wrap: break-word;
    text-align: start;
}
</style>
