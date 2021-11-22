<template>
  <div>
    <el-popover placement="bottom-start" :width="850" trigger="click">
      <template #reference>
        <el-button>click 激活</el-button>
      </template>
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="本地上传" name="local">
          <el-upload
            drag
            action="http://127.0.0.1:8090/upload/oss"
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

             <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :show-file-list="false"
                >
                <i class="el-icon-plus"></i>
             </el-upload>

            <el-button type="primary">确定</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { setUploadSign } from '@/utils/http/sign'
export default defineComponent({
  setup() {
    const activeName = ref("local")
    const headers = reactive(setUploadSign())
    
    const handleClick = (tab, event) => {
      console.log(tab, event);
    };
    return {
      headers,
      handleClick,
      activeName,
    };
  },
});
</script>