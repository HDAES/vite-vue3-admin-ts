<template>
  <div>
    <BasicTable
      ref="tableRef"
      :tableConfig="tableConfig"
      :columns="columns"
      :get-data="getBlogDetails"
      :edit-add="handleEditAdd"
      :del-data="deleteBlogDetails"
      :pagination="pagination"
      deleteName="title"
    >
    
        <template #image="scope">
            <el-image :src="scope.row.fullImage" style="width: 150px;height: 100px;" fit="scale-down"/>
        </template>
        <template #operate="scope">
          <el-button type="text" @click="handleContent(scope.row)">文章</el-button>
        </template>
    </BasicTable>


    <el-dialog
      :title="dialog.type == 'edit' ? '编辑' : '添加'"
      v-model="dialog.visible"
      width="800px"
      top="20px"
      @closed="closed"
    >
      <el-form
        :model="formData"
        ref="formRef"
        :rules="rules"
        label-width="100px"
      >
       <el-row>
           <el-col :span="12">
                <el-form-item label="分类：">
                    <el-select v-model="formData.sid" placeholder="请选择分类" @change="sortChange" style="width: 250px">
                        <el-option 
                            v-for="item in sortList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
           </el-col>
            <el-col :span="12">
               <el-form-item label="标签：">
                    <el-select v-model="formData.tid" placeholder="请选择标签"  style="width: 250px">
                        <el-option 
                            v-for="item in tagsList"
                            :key="item.id"
                            :label="item.tname"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
           </el-col>
           <el-col :span="12">
                <el-form-item label="标题：">
                    <el-input v-model="formData.title" placeholder="请输入标题" style="width: 250px"/>
                </el-form-item>
           </el-col>
            <el-col :span="12">
                 <el-form-item label="描述：">
                    <el-input v-model="formData.des" placeholder="请输入描述" style="width: 250px"/>
                </el-form-item>
           </el-col>
            <el-col :span="12">
                 <el-form-item label="来源：">
                    <el-radio-group v-model="formData.source">
                        <el-radio :label="0">原创</el-radio>
                        <el-radio :label="1">转载</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="排序：">
                    <el-input-number placeholder="请输入顺序号" v-model="formData.orderIn"/>
                </el-form-item>
           </el-col>
            <el-col :span="24">
                <el-form-item label="类型：">
                    <el-radio-group v-model="formData.type">
                        <el-radio :label="0">pc和小程序 </el-radio>
                        <el-radio :label="1">微信小程序</el-radio>
                        <el-radio :label="2">pc</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="图片：">
                    <el-image :src="formData.fullImage" style="width: 150px;height: 150px;" fit="scale-down"/>
                    <UploadMedia v-model:url="formData.fullImage" ref="UploadMediaRef"/>
                </el-form-item>
            </el-col>
       </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button>取 消</el-button>
          <el-button type="primary" @click="handleDetermine">确 定</el-button>
        </span>
      </template>
    </el-dialog>
 

    <el-dialog
      title="文章编辑"
      custom-class="dialog-p-10"
      v-model="contentDialog.visible"
      width="900px"
      top="20px"
      >
        
          <el-upload
            ref="upload"
            :action="action"
            :headers="headers"
            :on-success="successUpload"
          >
            <el-button size="small" type="primary">选取文件</el-button>
          </el-upload>
        
        <md-editor v-model="contentForm.content" height="400px" preview-theme="github"></md-editor>
        
        <template #footer>
        <span class="dialog-footer">
          <el-button>取 消</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </span>
      </template>
    </el-dialog>
    
 
  </div>
</template>
 
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import {BasicTable,TableActionType,TableColumns,UpDateType,} from "@/components/BasicTable";
import { getBlogDetails,postBlogDetails, DetailsType,putBlogDetails,deleteBlogDetails, SortType, TagType } from '@/api/blog/details'
import { ContentType, getBlogContent, postBlogContent, putBlogContent} from '@/api/blog/content'
import { getBlogSortAll } from '@/api/blog/sort'
import { getBlogTagsByID } from '@/api/blog/tags'
import { ElEForm } from "@/elemntPlus";
import { UploadMedia } from '@/components/UploadMedia'
import { setUploadSign } from "@/utils/http/sign";

import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default defineComponent({
  components: { BasicTable, UploadMedia, MdEditor },
  setup() {
    const dialog = reactive({ visible: false, type: "" });
    const contentDialog = reactive({visible: false, type: "" })
    const formRef = ref<ElEForm | null>(null);
    const tableRef = ref<Nullable<TableActionType>>(null);
   
    const sortList = ref<SortType[]>([])
    const tagsList = ref<TagType[]>([])
    const formData = ref<DetailsType>({
        sid: "",
        tid: "",
        title: "",
        des: "",
        fullImage: "",
        source: 0,
        type: 0,
        orderIn: 0,
    });
    const contentForm = ref<ContentType>({
      id: "",
      content: "",
      likeCount: 0,
      readCount: 0,
      path: ""
    })

    const handleEditAdd = async(type: UpDateType, row: DetailsType) => {
      dialog.visible = true;
      dialog.type = type;
      if (type == "edit") {
        
        formData.value = row;
        getBlogTagsByID({id: row.sid}).then(res =>{
          tagsList.value = res.data 
        })
      }
      //获取分类
      const { data } = await getBlogSortAll()
      sortList.value = data
    };
    
   
    //分类改变方法
    const sortChange = (sid: string) =>{
      getBlogTagsByID({id: sid}).then(res =>{
        tagsList.value = res.data 
      })
    }


    const handleDetermine = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          Promise.all(
            dialog.type == "add"
              ? [postBlogDetails(formData.value)]
              : [putBlogDetails(formData.value)]
          ).then((res) => {
            dialog.visible = false;
            tableRef.value?.handleRefresh();
          });
        } else {
          return false;
        }
      });
    };


    const handleContent = (row: DetailsType) =>{
      contentDialog.visible = true
      contentForm.value.id = row.id
      getBlogContent({id: row.id}).then(res =>{
        if(res.data){
          contentDialog.type = "edit"
          contentForm.value.content = res.data.content
          contentForm.value.path =  res.data.content
        }else{
          contentDialog.type = "add"
        }
      })
    }

    const successUpload = (e) =>{
      console.log(e)
      if(e.code == 200){
        contentForm.value.path = e.data.url
      }
    }
    // 文章保存
    const handleSave = () =>{
      Promise.all(
        contentDialog.type == "add"
          ? [postBlogContent(contentForm.value)]
          : [putBlogContent(contentForm.value)]
      ).then((res) => {
        contentDialog.visible = false;
      });
    }
    const closed = () =>{
        formData.value = {
            title: "",
            des: "",
            fullImage: "",
            source: 0,
            type: 0,
            orderIn: 0,
        }
    }
    return {
      contentForm,
      contentDialog,
      dialog,
      sortList,
      tagsList,
      formData,
      formRef,
      tableRef,
      closed,
      handleSave,
      sortChange,
      handleContent,
      successUpload,
      deleteBlogDetails,
      handleEditAdd,
      handleDetermine,
      getBlogDetails,
      headers :setUploadSign(),
      action: import.meta.env.VITE_GLOB_API_URL + '/file/oss',
      rules: {
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
        author: [{ required: true, message: "请输入作者", trigger: "blur" }],
      },
      columns: <TableColumns[]>[
       {
           title: "分类名字",
           dataIndex: "name"
       },{
           title: "标签名字",
           dataIndex: "tname"
       },{
           title: "标题",
           dataIndex:"title"
       },{
           title: "描述",
           dataIndex: "des",
           showOverflowTooltip: true
       },{
            title: "图片",
            dataIndex: "fullImage",
            slotname: "image",
       },{
           title: "来源",
           dataIndex: "source",
           width: 50,
           formatter: ({source})=>{
                return source == 0? "原创":"转载"
            }
       },{
           title: "类型",
           dataIndex: "type",
           width: 100,
            formatter: ({type})=>{
                return type == 0? "pc和小程序": (type == 1?'pc端':'小程序')
            }
       },{
           title: "排序",
           dataIndex: "orderIn",
            width: 50,
       },
        {
          title: "创建时间",
          width: 100,
          dataIndex: "createTime",
          showOverflowTooltip:true
        },
        {
          title: "修改时间",
          width: 100,
          dataIndex: "updateTime",
          showOverflowTooltip:true
        },
        {
          title: "操作",
          width: 150,
          align: "center",
          slotname: "operate",
        },
      ],
      tableConfig: {
        name: "名言管理",
      },
      pagination: {
        pageSize: 5
      }
    };
  },
});
</script>