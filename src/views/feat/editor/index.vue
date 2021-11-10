<template>
  <div>
    <div ref='editor'></div>
    <button @click='syncHTML'>同步内容</button>
    <div :innerHTML='content.html'></div>
  </div>
</template>

<script lang="ts">
import { onMounted, onBeforeUnmount, ref, reactive } from 'vue';
import WangEditor from 'wangeditor';
import { isPhone } from '@/utils/utils'
// https://www.wangeditor.com/doc/
// tinymce
export default {
    name: 'edit',
    setup() {
        const editor = ref();
        const content = reactive({
            html: '',
            text: '',
        });
        let instance;
        onMounted(() => {
            instance = new WangEditor(editor.value);
            Object.assign(instance.config, {
                onchange() {
                    console.log('change');
                },
            });
            instance.create();
        });
        onBeforeUnmount(() => {
            instance.destroy();
            instance = null;
        });
        const syncHTML = () => {
            content.html = instance.txt.html();
        };
        return {
            syncHTML,
            editor,
            content,
        };
    },
};
</script>