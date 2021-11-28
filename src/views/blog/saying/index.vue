<template>
    <div>
        <BasicTable 
            :tableConfig="tableConfig"
            :columns="columns"
            :get-data="getBlogSaying"
        />

        <el-dialog
      :title="dialog.type == 'edit' ? '编辑' : '添加'"
      v-model="dialog.visible"
      width="600px"
      top="20px"
      @closed="closed"
    >
      <el-form :model="formData" ref="sortRef" :rules="rules" label-width="100px">
        <el-form-item label="ID：" v-if="formData.id">
            <el-input v-model="formData.id" disabled style="width: 300px;"/>
        </el-form-item>
        <el-form-item label="内容：" >
            <el-input v-model="formData.content" disabled style="width: 300px;"/>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button >取 消</el-button>
          <el-button type="primary" @click="handleDetermine">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    </div>
</template>
 
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { BasicTable, TableColumns } from "@/components/BasicTable";
import { getBlogSaying, SayingType }  from '@/api/blog/saying'

export default defineComponent({
    components: { BasicTable },
    setup() {

        const dialog = reactive({visible: false,type: ""});
        const formData = ref<SayingType>({
            content: '',
            author: ''
        })


        const handleDetermine = ( )=>{

        }

        return {
            dialog,
            formData,
            handleDetermine,
            getBlogSaying,
            rules:{},
            columns: <TableColumns[]>[{
                title: "内容",
                dataIndex: "content"
            },{
                title: "作者",
                width: 200,
                dataIndex: "author"
            },{
                title: "创建时间",
                 width: 200,
                dataIndex: "createTime"
            },{
                title: "修改时间",
                 width: 200,
                dataIndex: "updateTime"
            },{
                title: "操作",
                width: 150,
                align: "center",
                slotname: "operate",
            }],
            tableConfig: {
                name: '名言管理'
            }
        };
    }
    
});
</script>