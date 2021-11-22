<template>
    <div >
         <UploadMedia />

        <!-- <BasicTable 
         :columns="columns" 
        :getData="getBlogSort"
        :edit-add="handleEditAdd"
        />

        <el-dialog
      :title="dialog.type== 'edit'?'编辑':'添加'"
      v-model="dialog.visible"
      width="600px"
      @closed="closed"
      >
      </el-dialog> -->

     
    </div>
</template>
 
<script lang="ts">
import { defineComponent,reactive } from "vue";
import { BasicTable, TableActionType, TableColumns, UpDateType } from '@/components/BasicTable'
import { getBlogSort, postBlogSort } from '@/api/blog/sort'
import { UploadMedia } from "@/components/UploadMedia"
export default defineComponent({
    components: { BasicTable,UploadMedia },
    setup() {

        const dialog = reactive({
            visible: false,
            type: ''
        })


        const handleEditAdd =  (type: UpDateType, row) =>{
            dialog.visible = true
            dialog.type = type

            if(type == 'edit'){
                
            }
        }
        //关闭弹窗
        const closed = () =>{

        }
        return {
            closed,
            dialog,
            handleEditAdd,
            getBlogSort,
            columns:  <TableColumns[]>[{
                title: '名字',
                dataIndex: 'name'
            },{
                title: '图标',
                dataIndex: 'icon'
            },{
                title: '图片',
                dataIndex: 'image'
            },{
                title: '类型',
                dataIndex: 'type'
            },{
                title: '删除状态',
                dataIndex: 'deleted'
            }]
        }
    }
});
</script>
 
<style lang="scss" scoped>
</style>
