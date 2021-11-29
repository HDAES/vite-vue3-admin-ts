<template>
  <div>
    <BasicTable
      ref="tableRef"
      :tableConfig="tableConfig"
      :columns="columns"
      :get-data="getBlogSaying"
      :edit-add="handleEditAdd"
      :del-data="deleteBlogSaying"
      deleteName="author"
    />

    <el-dialog
      :title="dialog.type == 'edit' ? '编辑' : '添加'"
      v-model="dialog.visible"
      width="600px"
      top="20px"
      @closed="closed"
    >
      <el-form
        :model="formData"
        ref="formRef"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="ID：" v-if="formData.id">
          <el-input v-model="formData.id" disabled style="width: 300px" />
        </el-form-item>
        <el-form-item label="内容：" prop="content">
          <el-input v-model="formData.content" style="width: 300px" />
        </el-form-item>
        <el-form-item label="作者：" prop="author">
          <el-input v-model="formData.author" style="width: 300px" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button>取 消</el-button>
          <el-button type="primary" @click="handleDetermine">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
 
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import {
  BasicTable,
  TableActionType,
  TableColumns,
  UpDateType,
} from "@/components/BasicTable";
import {
  getBlogSaying,
  postBlogSaying,
  putBlogSaying,
  SayingType,
  deleteBlogSaying,
} from "@/api/blog/saying";
import { ElEForm } from "@/elemntPlus";

export default defineComponent({
  components: { BasicTable },
  setup() {
    const dialog = reactive({ visible: false, type: "" });
    const formRef = ref<ElEForm | null>(null);
    const tableRef = ref<Nullable<TableActionType>>(null);
    const formData = ref<SayingType>({
      content: "",
      author: "",
    });

    const handleEditAdd = (type: UpDateType, row: SayingType) => {
      dialog.visible = true;
      dialog.type = type;
      if (type == "edit") {
        formData.value = row;
      }
    };

    const handleDetermine = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          Promise.all(
            dialog.type == "add"
              ? [postBlogSaying(formData.value)]
              : [putBlogSaying(formData.value)]
          ).then((res) => {
            dialog.visible = false;
            tableRef.value?.handleRefresh();
          });
        } else {
          return false;
        }
      });
    };

    const closed = () =>{
        formData.value = {
            content: "",
            author: "",
        }
    }
    return {
      dialog,
      closed,
      formData,
      formRef,
      tableRef,
      deleteBlogSaying,
      handleEditAdd,
      handleDetermine,
      getBlogSaying,
      rules: {
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
        author: [{ required: true, message: "请输入作者", trigger: "blur" }],
      },
      columns: <TableColumns[]>[
        {
          title: "内容",
          dataIndex: "content",
        },
        {
          title: "作者",
          width: 200,
          dataIndex: "author",
        },
        {
          title: "创建时间",
          width: 200,
          dataIndex: "createTime",
        },
        {
          title: "修改时间",
          width: 200,
          dataIndex: "updateTime",
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
    };
  },
});
</script>