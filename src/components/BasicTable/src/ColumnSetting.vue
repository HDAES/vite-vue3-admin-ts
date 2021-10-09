<template>
  <el-popover placement="bottom-start" :width="200" trigger="click">
    <template #reference>
        <el-button icon="el-icon-menu" />
    </template>
    <div class="column-setting">
        <div style="line-height: 40px">
            <el-checkbox v-model="tableConfig.selection">序号列</el-checkbox>
            <el-checkbox v-model="tableConfig.index">勾选项</el-checkbox>
        </div>
        <draggable v-model="columns" item-key="id" @change="$emit('update:columns', columns)">
            <template #item="{element}" >
                <div class="item" style="line-height:25px"> 
                    <i class="el-icon-rank" style="margin-right:10px"/>
                    <el-checkbox v-model="element.show">{{element.title}}</el-checkbox>
                </div>
            </template>
        </draggable>
    </div>
</el-popover>
</template>

<script>
import draggable from 'vuedraggable';
export default {
    components: { draggable},
    props: {
        columns: {
            type: Array
        },
        tableConfig: {
            type: Object
        }
    },
}
</script>
