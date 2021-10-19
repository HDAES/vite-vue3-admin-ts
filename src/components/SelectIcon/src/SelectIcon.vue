<template>
  <el-popover
    placement="bottom"
    :width="400"
    trigger="click"
  >
    <template #reference>
       <el-input 
        v-model="iconName" 
        placeholder="请输入图标名" 
        clearable 
        @change="$emit('update:icon', iconName)" 
        @clear="$emit('update:icon', '')">
          <template #prepend>
            <i :class="iconName" />
          </template>
       </el-input>
    </template>
    <el-scrollbar max-height="200px">
      <el-row>
        <el-col :span="12" v-for="(item,index) in list" :key="index" @click="handleSelect(item)">
          <el-button :icon="item" size="mini" circle ></el-button>
          <span style="cursor: pointer">{{item}}</span>
        </el-col>
      </el-row>
    </el-scrollbar>
  </el-popover>
</template>

<script>
import { ref } from 'vue'
import list from './list'
export default {
  props: {
    icon: {
      type: String
    }
  },
  setup(props,context){
    const iconName = ref(props.icon)
    const handleSelect = (name) =>{
      iconName.value = name
      context.emit('update:icon', name)
    }
    
    return {
      iconName,
      list,
      handleSelect
    }
  }
}
</script>