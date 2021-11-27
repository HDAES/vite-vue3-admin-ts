<template>
  <div>
    <BasicTable
      ref="tableRef"
      :tableConfig="tableConfig"
      :columns="columns"
      :getData="getBlogSort"
      :edit-add="handleEditAdd"
      :del-data="deleteBlogSort"
    >
      <template #status="scope">
         <el-switch 
          v-model="scope.row.status" 
          :active-value="1" 
          :inactive-value="0" 
          active-color="#13ce66" 
          inactive-color="#ff4949"
          @change="switchChange(scope.row)"
          />
      </template>
    </BasicTable>

    
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
        <el-form-item label="分类名称：" prop="name">
            <el-input v-model="formData.name" placeholder="请输入分类名称" style="width: 300px;"/>
        </el-form-item>
        <el-form-item label="图标：" prop="icon">
            <el-input v-model="formData.icon" placeholder="请输入分类名称" style="width: 300px;"/>
        </el-form-item>
        <el-form-item label="类型：" prop="type">
          <el-radio-group v-model="formData.type">
              <el-radio :label="1">pc端</el-radio>
              <el-radio :label="2">微信小程序</el-radio>
              <el-radio :label="0">pc和小程序</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="图片："  prop="fullImg">
          <el-image :src="formData.fullImg" style="width: 150px;height: 150px;" fit="scale-down"/>
          <UploadMedia v-model:url="formData.fullImg" ref="UploadMediaRef"/>
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
import { defineComponent, reactive,ref } from "vue";
import { BasicTable, TableActionType, TableColumns,UpDateType} from "@/components/BasicTable";
import { getBlogSort, postBlogSort,putBlogSort,deleteBlogSort } from "@/api/blog/sort";
import { UploadMedia, UploadMediaType } from "@/components/UploadMedia";
import { SortType } from "@/api/blog/blog.type";
import { ElEForm } from "@/elemntPlus";
export default defineComponent({
  components: { BasicTable, UploadMedia },
  setup() {
    const dialog = reactive({visible: false,type: ""});
    const sortRef = ref<ElEForm | null>(null)
    const tableRef = ref<Nullable<TableActionType>>(null)
    const UploadMediaRef = ref<Nullable<UploadMediaType>>(null)
    const formData = ref<SortType>({
        name: '',
        type: 0,
        status: 0,
        fullImg: null
    })

   

    const handleEditAdd = (type: UpDateType, row: SortType) => {
      dialog.visible = true;
      dialog.type = type;
      if (type == "edit") {
        formData.value = row
      }
    };
    //关闭弹窗
    const closed = () => {
      formData.value ={
        name: '',
        type: 0,
        status: 0,
        fullImg: null
      }
    };

    //弹窗确认按钮
    const handleDetermine = () =>{
      sortRef.value?.validate( valid =>{
        if(valid){
          if(dialog.type == "add"){
            postBlogSort(formData.value).then(res =>{
              dialog.visible = false
              tableRef.value?.handleRefresh()
            })
          }else if (dialog.type == "edit"){
              putBlogSort(formData.value).then(res =>{
                dialog.visible = false
                tableRef.value?.handleRefresh()
              })
          }
        }else{
          return false
        }
      })
    }

    const switchChange = (row: SortType) =>{
      if(row.id!=null){
        putBlogSort(row)
      }
    }
    return {
      closed,
      dialog,
      formData,
      sortRef,
      tableRef,
      UploadMediaRef,
      deleteBlogSort,
      switchChange,
      handleEditAdd,
      handleDetermine,
      getBlogSort,
      rules:{
        name: [ { required: true, message: '请输入名称', trigger: 'blur' }],
        icon: [ { required: true, message: '请输入分类icon', trigger: 'blur' }],
        type: [ { required: true, message: '请现在分类类型', trigger: 'blur' }],
        fullImg: [ { required: true, message: '请上传或选择图片', trigger: 'blur' }],
      },
      columns: <TableColumns[]>[
        {
          title: "名字",
          width: 100,
          dataIndex: "name",
        },
        {
          title: "图标",
          width: 150,
          dataIndex: "icon",
        },
        {
          title: "图片",
          dataIndex: "fullImg",
        },
        {
          title: "类型",
          dataIndex: "type",
          width: 100,
          formatter: ({type})=>{
            return type == 0? "pc和小程序": (type == 1?'pc端':'小程序')
          }
        },
        // {
        //   title: "状态",
        //   dataIndex: "deleted",
        //   slotname: "status",
        // },
        {
          title: "操作",
          width: 150,
          align: "center",
          slotname: "operate",
        }
      ],
      tableConfig:{
         name: "博客分类管理",
      }
    };
  },
});
</script>
 
<style lang="scss" scoped>
</style>
