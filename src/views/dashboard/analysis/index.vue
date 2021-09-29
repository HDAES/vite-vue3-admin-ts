<template>
  <div class="analysis">
    <Amount />
    <Trend />
    <Analyze />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Amount from './amount.vue'
import Trend from './trend.vue'
import Analyze from './analyze.vue'
export default defineComponent({
  name: 'analysis',
  components: { Amount, Trend, Analyze }
})
</script>
