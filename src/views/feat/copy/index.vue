<template>
  <div>
      <el-card header="粘贴板">
           <el-input placeholder="请输入内容" v-model="text">
                <template #append>
                    <el-button icon="el-icon-s-claim" @click="handleCopy"></el-button>
                </template>
            </el-input>
      </el-card>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue' 
import  useClipboard from '@/utils/clipboard3'
import { ElMessage } from 'element-plus'
export default defineComponent({
    setup(){
        const text = ref('')
        const { toClipboard } = useClipboard(null)
        const handleCopy = async () =>{
            try{
                await toClipboard(text.value)
                ElMessage.success('复制成功！')
            }catch(e){
                ElMessage.error('复制失败')
            }
        }
        return {
            text,
            handleCopy
        }
    }
})
</script>