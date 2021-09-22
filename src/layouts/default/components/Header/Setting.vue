<template>
    <el-icon class="h-icon" :size="18" color="#333">
        <SettingOutlined @click="drawer = true"/>
    </el-icon>
    <el-drawer title="我是标题" v-model="drawer" :with-header="false" :size="300">
        <span>我来啦!</span>
    </el-drawer>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue"
import { SettingOutlined } from '@ant-design/icons-vue'
export default defineComponent({
    components: { SettingOutlined },
    setup(){
        const drawer = ref(false)
        
        return {
            drawer
        }
    }
})
</script>