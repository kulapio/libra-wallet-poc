<template>
  <div ref="avatar"/>
</template>

<script>
import { createIcon } from '@download/blockies'

export default {
  name: 'Avatar',
  props: {
    seed: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 10
    }
  },
  created () {
    const icon = createIcon({
      seed: this.seed,
      size: this.size
    })
    icon.style.borderRadius = '50%'
    this.$nextTick(() => {
      this.$refs.avatar.appendChild(icon)
    })
  }
}
</script>
