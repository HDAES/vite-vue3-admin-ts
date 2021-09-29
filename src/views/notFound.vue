<template>
  <div>404
    <el-button @click="handleTo">click</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup(){
    const router = useRouter()
    const handleTo = () =>{
      router.push({path: '/'})
    }

    return {
      handleTo
    }
  }
})
</script>