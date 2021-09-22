<template>
    <el-icon class="h-icon" :size="18" color="#333">
        <FullscreenExitOutlined v-if="isFullscreen" @click="handleClick"/>
        <FullscreenOutlined v-else @click="handleClick"/>
    </el-icon>
</template>

<script lang="ts">
import screenfull from 'screenfull'
import { ElMessage } from 'element-plus'
import { defineComponent, ref, onBeforeUnmount, onMounted } from 'vue'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue'
export default defineComponent({
    name: 'FullScreen',
    components: { FullscreenOutlined, FullscreenExitOutlined },
    setup(){
        const isFullscreen = ref(false)
        onMounted(() =>{
            if (screenfull.isEnabled) {
                screenfull.on('change', () => isFullscreen.value = screenfull.isEnabled)
            }
        })
        onBeforeUnmount(() =>{
            if (screenfull.isEnabled) {
                screenfull.off('change',  () => isFullscreen.value = screenfull.isEnabled)
            }
        })
        const handleClick = () =>{
            if (!screenfull.isEnabled) {
                ElMessage({ message: '你的浏览器不支持全屏', type: 'warning' })
                return false
            }
            screenfull.toggle()
        }
        return {
            isFullscreen,
            handleClick
        }
    }
})
</script>