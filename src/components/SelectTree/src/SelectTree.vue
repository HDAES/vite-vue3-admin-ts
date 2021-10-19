<template>
  <el-select v-model="statusData" popper-class="select-tree">
    <el-option :value="statusData" :label="statusValueData" style="height: auto">
        <el-tree :data="options" :props="defaultProps" @node-click="handleNodeClick" ></el-tree>
    </el-option>
  </el-select>
</template>

<script>
import { ref } from 'vue'
export default {
    props:{
        parentId: {
            type: String
        },
        options: {
            type: Array,
            default: []
        },
        defaultProps: {
            type: Object,
            default:  {
                children: 'children',
                label: 'name'
            }
        }
    },
    setup(props,context){
        
        const statusData = ref(props.parentId)
        const statusValueData = ref(0)
        
      
        const handleNodeClick = (data) =>{
            console.log(data.id)
            statusValueData.value = data.name
            statusData.value = data.id
            context.emit('update:parentId', data.id)
        }
        return {
            statusData,
            statusValueData,
            handleNodeClick,
            defaultProps: props.defaultProps,
            options: props.options
        }
    }
}
</script>