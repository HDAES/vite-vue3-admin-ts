<template>
  <div class="upload-media">
    <el-popover placement="bottom-start" :width="850" trigger="click"  @show="popoverShow">
      <template #reference>
        <el-button>click 激活</el-button>
      </template>
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="本地上传" name="local">
          <el-upload
            drag
            action="http://127.0.0.1:8090/file/oss"
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
              <div class="media-item" v-for="item in mediaList" :key="item.id">
                  <img :src="item.fullPath" alt="" @click="handleDel(item)">
              </div>
              
            </div>
           
            <el-button type="primary">确定</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { setUploadSign } from '@/utils/http/sign'
import { getFileList,delelteFile } from '@/api/file/index'
import { FileType } from "../media.type";
export default defineComponent({
  setup() {
    const activeName = ref("local")
    const mediaList = ref<FileType[]>([])
    const mediaNext = ref<Boolean>(true)
    const params = reactive({
      page: 1,
      size: 10
    })
    const headers = reactive(setUploadSign())
    
    const handleClick = (tab, event) => {
      console.log(tab, event);
    };

    const popoverShow =  () =>{
      if(mediaNext.value){
        getFileList(params).then(res =>{
          mediaList.value = [...mediaList.value,...res.list]
          mediaNext.value = res.page < res.pages
        })
      }
    }

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

    const load = () =>{
      console.log('12312')
      params.page +=1
      popoverShow()
    }
    
    return {
      load,
      headers,
      mediaList,
      handleDel,
      handleClick,
      popoverShow,
      activeName,
    };
  },
});
</script>
<style lang="scss" scoped>
.upload-media{
  
}
</style>