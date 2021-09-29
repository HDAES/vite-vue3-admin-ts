<template>
  <div class="workbench">
  
    <Header />
    <QuickNavigation />
  </div>
</template>

<script>
import Header from './header.vue'
import QuickNavigation from './quickNavigation.vue'
export default {
  components: { Header, QuickNavigation }
}
</script>
