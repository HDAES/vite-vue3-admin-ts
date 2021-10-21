<template>
    <LayoutLockPage/>
</template>

<script lang="ts" >
import { defineAsyncComponent, defineComponent } from 'vue'
export default defineComponent({
    components: {
        LayoutLockPage: defineAsyncComponent(() => import('@/views/sys/lock/index.vue'))
    },
})


</script>
