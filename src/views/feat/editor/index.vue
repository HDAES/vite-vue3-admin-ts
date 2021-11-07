<template>
  <div class="">
  <editor
       api-key="no-api-key"
       :init="{
         height: 500,
         menubar: false,
         plugins: [
           'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount'
         ],
         toolbar:
           'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help'
       }"
     />
  </div>
</template>
 
<script lang="ts">
import { defineComponent} from "vue";
import Editor from '@tinymce/tinymce-vue';
export default defineComponent({
  components: { Editor },
  setup() {
    return {
    }
  }
});
</script>
 
<style lang="scss" scoped>
</style>