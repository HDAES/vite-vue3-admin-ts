<template>
  <div>
    <BasicTable
      :columns="columns"
      :getData="getBlogSort"
      :edit-add="handleEditAdd"
    />

    <el-dialog
      :title="dialog.type == 'edit' ? '编辑' : '添加'"
      v-model="dialog.visible"
      width="600px"
      @closed="closed"
    >
        <el-form label-width="100px">
            <el-form-item label="分类名称：">
                <el-input placeholder="请输入分类名称" style="width: 300px;"/>
            </el-form-item>
            <el-form-item label="图标：">
                <el-input placeholder="请输入分类名称" style="width: 300px;"/>
            </el-form-item>
            <el-form-item label="类型：">
                <el-radio-group v-model="formData.type">
                    <el-radio :label="1">pc端</el-radio>
                    <el-radio :label="2">微信小程序</el-radio>
                    <el-radio :label="3">pc和小程序</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>

    </el-dialog>
  </div>
</template>
 
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { BasicTable, TableColumns,UpDateType} from "@/components/BasicTable";
import { getBlogSort, postBlogSort } from "@/api/blog/sort";
import { UploadMedia } from "@/components/UploadMedia";
export default defineComponent({
  components: { BasicTable, UploadMedia },
  setup() {
    const dialog = reactive({
      visible: false,
      type: "",
    });
    const formData = reactive({
        type: 3
    })


    const handleEditAdd = (type: UpDateType, row) => {
      dialog.visible = true;
      dialog.type = type;

      if (type == "edit") {
      }
    };
    //关闭弹窗
    const closed = () => {};
    return {
      closed,
      dialog,
      formData,
      handleEditAdd,
      getBlogSort,
      columns: <TableColumns[]>[
        {
          title: "名字",
          dataIndex: "name",
        },
        {
          title: "图标",
          dataIndex: "icon",
        },
        {
          title: "图片",
          dataIndex: "image",
        },
        {
          title: "类型",
          dataIndex: "type",
        },
        {
          title: "删除状态",
          dataIndex: "deleted",
        },
      ],
    };
  },
});
</script>
 
<style lang="scss" scoped>
</style>
