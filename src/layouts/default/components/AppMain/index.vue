<template>
    <el-scrollbar style="background-color: #F0F2F5">
        <Page />
    </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Page from '@/layouts/page/index.vue'
export default defineComponent({
    components: { Page }
})
</script>
