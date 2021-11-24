<template>
  <div class="upload-media">
    <el-popover placement="bottom-start" :width="700" trigger="click" @show="popoverShow">
      <template #reference>
        <el-button>click 激活</el-button>
      </template>
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleTabClick">
        <el-tab-pane label="本地上传" name="local">
          <el-upload
            drag
            :action="action"
            :headers="headers"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                只能上传 jpg/png 文件，且不超过 500kb
              </div>
            </template>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="网络图片" name="url">

            <el-input placeholder="请输入内容" >
                <template #prepend>
                   <i class="el-icon-cloudy"></i>
                </template>
            </el-input>

        </el-tab-pane>
        <el-tab-pane label="媒体库" name="media">
         
            <div class="media-list" v-infinite-scroll="load" :infinite-scroll-immediate="false" style="overflow:auto">
              <div class="media-item" v-for="item in mediaList" :key="item.id.toString()">
                <div class="box">
                  <img :src="item.fullPath" alt="" @click="handleDel(item)">
                </div>
              </div>

              <div class="upload">
                <div class="box">
                   <i class="el-icon-plus icon"></i>
                </div>
              </div>
              
               
            </div>
            <el-button type="primary">确定</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-popover>

    <div style="width:700px">

      <div class="media-list" v-infinite-scroll="load" :infinite-scroll-immediate="false" style="overflow:auto">
      <div class="media-item" v-for="item in mediaList" :key="item.id.toString()">
        <div class="box">
          <img :src="item.fullPath" alt="" @click="handleDel(item)">
        </div>
      </div>

      <div class="upload">
        <div class="upload-box" @click="fileInput.click">
            <i class="el-icon-plus icon"></i>
            <input ref="fileInput" type="file" class="file" @change="handleFileChange"/>
        </div>
      </div>
    </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { setUploadSign } from '@/utils/http/sign'
import { getFileList,delelteFile ,postFile } from '@/api/file/index'
import { FileType } from "../media.type";
export default defineComponent({
  setup() {
    const activeName = ref("local")
    const fileInput = ref<HTMLInputElement>(new HTMLInputElement())
    const mediaList = ref<FileType[]>([])
    const mediaNext = ref<Boolean>(true)
    const action = ref(import.meta.env.VITE_GLOB_API_URL + '/file/oss') 
    const params = reactive({
      page: 1,
      size: 10
    })
    const headers = reactive(setUploadSign())
    
    

    //首次加载
    const popoverShow =  () =>{
      getFileList(params).then(res =>{
        console.log(res)
        mediaList.value = [...mediaList.value,...res.list]
        mediaNext.value = res.page < res.pages
      })
      
    }
    popoverShow()
    //删除图片
    const handleDel = (row: FileType) =>{
      delelteFile({ids: row.id}).then(res =>{
        const tempList: FileType[] =  []
        mediaList.value.forEach(item =>{
          if(item.id != row.id){
            tempList.push(item)
          }
        })
        mediaList.value = tempList
      })
    }


    //加载更多
    const load = () =>{
      params.page +=1
      if(mediaNext.value){
        popoverShow()
      }
    }
    
    const handleTabClick = () =>{

    }

   


    const handleFileChange = () =>{
      let uploadfile: FileList | null = fileInput.value.files

      if(uploadfile){
        const formData = new FormData()
        formData.append('file',uploadfile[0])
        //上传文件
        postFile(formData)
      }
    }
    return {
      load,
      fileInput,
      action,
      headers,
      handleTabClick,
      handleFileChange,
      mediaList,
      handleDel,
      popoverShow,
      activeName,
    };
  },
});
</script>
<style lang="scss">
.media-list{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    max-height: 320px;
    .media-item,.upload{
      flex-basis:20%;
      height: 120px;
      margin-bottom: 10px;
     .box{
        border: 1px dashed #ccc;
        border-radius: 5px;
        width: 120px;
        height: 120px;
        
        img{
          height: 120px;
          width: 120px;
          object-fit: contain;
          border-radius: 5px;
        }
        
      }
      .upload-box{
        border: 1px dashed #ccc;
        border-radius: 5px;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
        cursor: pointer;
        .icon{
          font-size: 24px;
        }
        .file{
          display: none;
        }
      }
      .upload-box:hover{
        border-color: #0960BD;
      }
    }
    
    
  }
</style>