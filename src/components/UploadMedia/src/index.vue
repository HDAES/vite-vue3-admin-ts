<template>
  <div class="upload-media">
    <el-popover ref="popoverRef" placement="bottom-start" popper-class="upload-media-popover" :tabindex="510" :width="700" trigger="click" @show="popoverShow" @hide="popoverHide">
      <template #reference>
        <el-button>上传文件</el-button>
      </template>
      <el-tabs id="upload-media-tabs" v-model="activeName" type="border-card" @tab-click="handleTabClick">
        <el-tab-pane label="本地上传" name="local">
          <el-upload drag :action="action" :headers="headers" multiple :on-success="localSuccess">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
            </template>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="网络图片" name="url">
          <div class="url">
            <el-row :gutter="20">
              <el-col :span="21">
                <el-input v-model="url" placeholder="请输入内容">
                  <template #prepend>
                    <i class="el-icon-cloudy"></i>
                  </template>
                </el-input>
              </el-col>
              <el-col :span="2">
                <el-button type="primary" @click="handleImageClick(url)">确定</el-button>
              </el-col>
            </el-row>
      
            <el-image
              style="width: 120px; height: 120px;margin-top: 10px;"
              :src="url"
              fit="scale-down"
            ></el-image>
          </div>
        </el-tab-pane>
        <el-tab-pane label="媒体库" name="media">
          <div
            class="media-list"
            v-infinite-scroll="load"
            :infinite-scroll-immediate="false"
            style="overflow:auto"
          >
            <div
              class="media-item"
              v-for="item in mediaList"
              :key="item.id.toString()"
              @contextmenu.prevent="openMask(item)"
            >
              <!-- 图片展示框 -->
              <div class="box">
                <img :src="item.fullPath" :alt="item.name" @click="handleImageClick(item.fullPath)"/>
              </div>

              <!-- 遮罩层 -->
              <div class="mask" v-if="item.id == showMaskId">
                <i class="el-icon-s-promotion si" @click="handleCopy(item)"></i>
                <el-tooltip
                  effect="dark"
                  :content="'图片名称:'+item.name +'图片尺寸:' + item.width + 'x' + item.height+'图片大小:' + item.size"
                  placement="top"
                >
                  <i class="el-icon-warning-outline si"></i>
                </el-tooltip>
                <i class="el-icon-delete si" @click="handleDel(item)"></i>
              </div>
            </div>

            <div class="upload-item">
              <div class="upload-box" @click="fileInput?.click">
                <i class="el-icon-plus icon"></i>
                <input ref="fileInput" type="file" class="file" @change="handleFileChange" />
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-popover>
  
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watchEffect } from "vue";
import { setUploadSign } from '@/utils/http/sign'
import { getFileList, delelteFile, postFile } from '@/api/file/index'
import { FileType } from "../media.type";
import  useClipboard from '@/utils/clipboard3'
import { ElMessage } from "element-plus";
import { ElEPopover } from "@/elemntPlus";
export default defineComponent({
  setup(props,context) {
    const activeName = ref("local")
    const fileInput = ref<HTMLInputElement>()
    const popoverRef = ref<ElEPopover | null>(null)
    const mediaList = ref<FileType[]>([])
    const mediaNext = ref<Boolean>(true)
    const showMaskId = ref<Number>()
    const action = ref(import.meta.env.VITE_GLOB_API_URL + '/file/oss')
    const url = ref<string>('')
    const headers = reactive(setUploadSign())
    const params = reactive({page: 1,size: 10})
    const { toClipboard } = useClipboard(null)
  

    watchEffect(() =>{
      if(showMaskId.value){
        document.body.addEventListener('click', () =>showMaskId.value = 0)
        document.getElementById('upload-media-tabs')?.addEventListener('click', () =>showMaskId.value = 0)

      }else{
        document.body.removeEventListener('click', () =>showMaskId.value = 0)
        document.getElementById('upload-media-tabs')?.removeEventListener('click', () =>showMaskId.value = 0)
      }
    })

    //首次加载
    const popoverShow = () => {
      getFileList(params).then(res => {
        mediaList.value = [...mediaList.value, ...res.list]
        mediaNext.value = res.page < res.pages
      })
    }
    // 关闭触发
    const popoverHide = () =>{
      params.page = 1
      params.size = 10
      mediaNext.value = false
      mediaList.value = []
    }

    // 本地上传成功
    const localSuccess = () => refresheThisPage()

    //删除图片
    const handleDel = (row: FileType) => {
      delelteFile({ ids: row.id }).then(res => {
        const tempList: FileType[] = []
        mediaList.value.forEach(item => {
          if (item.id != row.id) {
            tempList.push(item)
          }
        })
        mediaList.value = tempList
      })
    }


    //加载更多
    const load = () => {
      params.page += 1
      if (mediaNext.value) {
        popoverShow()
      }
    }

    const handleTabClick = () => {

    }

    //上传文件
    const handleFileChange = () => {
      let uploadfile: any = fileInput.value?.files
      if (uploadfile) {
        const formData = new FormData()
        formData.append('file', uploadfile[0])
        //上传文件
        postFile(formData).then(res => {
          refresheThisPage()
        })
      }
    }

    const openMask = (item: FileType) => {
      showMaskId.value = item.id
    }

    const handleImageClick = (url: string) =>{
      context.emit('update:url', url)
    
    }

    //刷新当前页
    const refresheThisPage = () => {
      getFileList(params).then(res => {
        mediaList.value = [...mediaList.value.slice(0, (params.page - 1) * params.size), ...res.list]
      })
    }

  
    //复制地址
    const handleCopy = async (item: FileType) =>{
      try{
          await toClipboard(item.fullPath)
          ElMessage.success('复制成功！')
      }catch(e){
          ElMessage.error('复制失败')
      }
    }

    //打开popover
    //打开Ref
    const openPopover = () => {
      popoverRef.value?.show()
    }
    return {
      url,
      load,
      openPopover,
      fileInput,
      action,
      headers,
      popoverRef,
      showMaskId,
      handleImageClick,
      handleTabClick,
      handleFileChange,
      localSuccess,
      popoverHide,
      handleCopy,
      openMask,
      mediaList,
      handleDel,
      popoverShow,
      activeName,
    };
  },
});
</script>
<style lang="scss">
.media-list {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  max-height: 320px;
  .media-item,
  .upload-item {
    position: relative;
    flex-basis: 20%;
    height: 120px;
    margin-bottom: 10px;
    cursor: pointer;
    .box {
      border: 1px dashed #ccc;
      border-radius: 5px;
      width: 120px;
      height: 120px;
      img {
        height: 120px;
        width: 120px;
        object-fit: contain;
        border-radius: 5px;
      }
    }
    .mask {
      position: absolute;
      top: 0;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      border-radius: 5px;
      width: 120px;
      height: 120px;
      transition: all 0.1s;
      background-color: rgba(0, 0, 0, 0.6);
      .si {
        font-size: 24px;
        color: #fff;
      }
      .si:hover {
        color: #e6a23c;
      }
    }
    .upload-box {
      border: 1px dashed #ccc;
      border-radius: 5px;
      width: 120px;
      height: 120px;
      line-height: 120px;
      text-align: center;
      cursor: pointer;
      .icon {
        font-size: 24px;
      }
      .file {
        display: none;
      }
    }
    .upload-box:hover {
      border-color: #0960bd;
    }
  }
  .contextImage {
    position: absolute;
    top: 20px;
    display: flex;
    flex-direction: column;
    z-index: 999;
    background-color: #fff;

    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
}

.url{
  display: flex;
  flex-direction: column;
  .preview{
    width: 120px;
    height: 120px;
    object-fit: contain;
  }
}
</style>