<template>
  <div>
    <Transactions/>
  </div>
</template>

<script>
// @ is an alias to /src
import Transactions from '@/components/Transactions'

export default {
  name: 'home',
  components: {
    Transactions
  }
}
</script>
