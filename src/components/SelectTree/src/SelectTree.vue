<template>
  <el-select v-model="statusData" popper-class="select-tree">
    <el-option :value="statusData" :label="statusValueData" style="height: auto">
        <el-tree node-key="id" :default-checked-keys="[statusData]" :data="options" :props="defaultProps" @node-click="handleNodeClick" ></el-tree>
    </el-option>
  </el-select>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
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
        const statusValueData = ref<string>('')
        
        onMounted(() =>{
            deepOptions(props.parentId, props.options)
        })

        const deepOptions = (id,options) =>{
            options.forEach(item => {
                if(item.children.length>0){
                    deepOptions(id, item.children)
                }
                if(item.id == id){
                    statusValueData.value = item.name
                }
            });
        }
        const handleNodeClick = (data) =>{
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