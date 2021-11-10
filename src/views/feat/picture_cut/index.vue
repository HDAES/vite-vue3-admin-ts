<template>
    <div class="drawing-container">
        <div ref="tie" ></div>
          <el-button class="save" type="primary" size="small" @click="save">保存</el-button>
    </div>
</template>

<script lang="ts">
import { defineComponent,ref, onMounted  } from 'vue'
import "tui-image-editor/dist/tui-image-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import ImageEditor from "tui-image-editor";
import { locale_zh, customTheme }  from './locale_zh'
export default defineComponent({
    setup() {
        const tie = ref()
        
        let instance
        onMounted(() =>{
            instance = new ImageEditor(    
                tie.value,
                {
                    includeUI: {
                        loadImage: {
                            path: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1d7a1feb60346449c1a64893888989a~tplv-k3u1fbpfcp-watermark.image",
                            name: "image",
                        },
                        menu: ["resize", "crop", "rotate", "draw", "shape", "icon", "text", "filter"],
                        initMenu: "filter", // 默认打开的菜单项
                        menuBarPosition: "right", // 菜单所在的位置
                        locale: locale_zh, //本地化语言为中文
                        theme: customTheme, // 自定义样式
                    },
                    cssMaxWidth: 1000, // canvas 最大宽度
                    cssMaxHeight: 600, // canvas 最大高度
                }
            ); 
            
        
        })

        const save = () => {
            const base64String = instance.toDataURL() // base64 文件
            console.log(base64String)
            const data = window.atob(base64String.split(',')[1])
            const ia = new Uint8Array(data.length)
            for (let i = 0; i < data.length; i++) {
                ia[i] = data.charCodeAt(i)
            }
            const blob = new Blob([ia], { type: 'image/png' }) // blob 文件
            const form = new FormData()
            form.append('image', blob)
            //upload file
        }

        return {
            save,
            tie
        }
    }
})
</script>


<style lang="scss" scoped>
.drawing-container {
  height: 100%;
   position: relative;
  .save {
    position: absolute;
    left: 50px;
    top: 35px;
  }
}
</style>

