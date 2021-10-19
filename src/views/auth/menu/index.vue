<template>
  <div>
    <BasicTable
      ref="tableRef"
      :getData="getPermissionTree"
      :columns="columns"
      :tableConfig="tableConfig"
      :delData="deletePermission"
      :edit-add="handleEditAdd"
    />

    <el-dialog
      title="编辑菜单"
      width="600px"
      v-model="dialog.visible"
      @close="handleColse"
    >
      <el-form label-width="110px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单类型：">
              <el-radio-group v-model="formData.type">
                <el-radio-button :label="0">目录</el-radio-button>
                <el-radio-button :label="1">菜单</el-radio-button>
                <el-radio-button :label="2">按钮</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formData.type == 2">
            <el-form-item label="按钮名称：">
              <el-input v-model="formData.name" placeholder="请输入按钮名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-else>
            <el-form-item label="名称：">
              <el-input v-model="formData.name" placeholder="请输入名称" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="菜单图标：" v-if="formData.type != 2">
              <SelectIcon v-model:icon="formData.icon" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权限标识：">
              <el-input
                v-model="formData.permission"
                placeholder="请输入权限标识"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序：">
              <el-input-number
                v-model="formData.sort"
                controls-position="right"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formData.type == 2">
            <el-form-item label="路径：">
              <el-select v-model="formData.method" placeholder="请选择">
                <el-option label="GET" value="GET"></el-option>
                <el-option label="POST" value="POST"></el-option>
                <el-option label="PUT" value="PUT"></el-option>
                <el-option label="DELETE" value="DELETE"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formData.type == 2">
            <el-form-item label="请求地址：">
              <el-input v-model="formData.path" placeholder="接口请求地址" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-else>
            <el-form-item label="路由地址：">
              <el-input v-model="formData.path" placeholder="请输入路由地址" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formData.type == 1">
            <el-form-item label="组件地址：">
              <el-input
                v-model="formData.component"
                placeholder="请输入组件地址"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="上级目录：" v-if="formData.type != 0">
              <SelectTree
                v-model:parentId="formData.parentId"
                :options="options"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialog.visible = false">取 消</el-button>
          <el-button type="primary" @click="handleDetermine">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { SelectIcon } from '@/components/SelectIcon'
import { SelectTree } from '@/components/SelectTree'
import { BasicTable,TableActionType, TableColumns, UpDateType } from "@/components/BasicTable";
import { getPermissionTree, deletePermission, postPermissionAdd, putPermissionEdit } from "@/api/system/menu";

type Dialog = {
  visible: boolean;
  type: UpDateType;
};

type FormData = {
    id?: string;
  type: number;
  name: string;
  icon: string;
  permission: string;
  sort: number;
  path: string;
  parentId: string;
  method: string;
  component?: any
};
export default defineComponent({
  components: { BasicTable, SelectIcon, SelectTree },

  setup() {
    const options = ref<[]>([])
    const tableRef = ref<Nullable<TableActionType>>(null)
    const dialog = reactive<Dialog>({
      visible: false,
      type: "add",
    });
    const formData = ref<FormData>({
      type: 0,
      name: "",
      icon: "",
      permission: "",
      sort: 0,
      path: "",
      parentId: "",
      method: "",
    })

    const handleEditAdd = (type: UpDateType, row: any) =>{
      getPermissionTree({}).then(res =>{
        options.value = res.data
        dialog.visible = true
        dialog.type = type
        if(type == 'edit'){
          formData.value = {
            name: row.name,
            path: row.path,
            method: row.method,
            component: row.component,
            type: row.type,
            permission: row.permission,
            icon: row.icon,
            sort: row.sort,
            parentId: row.parentId,
            id: row.id
          }
        }
      })
    }
    //关闭按钮
    const handleColse = () => {
      formData.value = {
        type: 0,
        name: '',
        icon: '',
        permission: '',
        sort: 0,
        path: '',
        parentId: '',
        method: ''
      }
    };

    const handleDetermine = () => {
      if(dialog.type == 'add'){
        if(formData.value.type == 0){
          formData.value.parentId =  '0'
          formData.value.component = 'Layout'
        }
        postPermissionAdd(formData.value).then(res =>{
          dialog.visible = false
          tableRef.value?.handleRefresh()
        })
      }else{
        putPermissionEdit(formData.value).then(res =>{
          dialog.visible = false
          tableRef.value?.handleRefresh()
        })
      }
    };
    return {
      dialog,
      options,
      tableRef,
      formData,
      handleColse,
      handleEditAdd,
      handleDetermine,
      deletePermission,
      getPermissionTree,
      columns: <TableColumns[]>[
        {
          title: "权限管理",
          dataIndex: "name",
        },
        {
          title: "图标",
          dataIndex: "icon",
        },
        {
          title: "排序",
          dataIndex: "sort",
        },
        {
          title: "权限标识",
          dataIndex: "permission",
        },
        {
          title: "组件路径",
          dataIndex: "component",
        },
        {
          title: "请求方式",
          dataIndex: "method",
        },
        {
          title: "地址",
          dataIndex: "path",
        },
        {
          title: "类型",
          dataIndex: "type",
          formatter: ({ type }) =>
            type == 0 ? "目录" : type == 1 ? "页面" : "按钮",
        },
        {
          title: "操作",
          width: 150,
          align: "center",
          slotname: "operate",
        },
      ],
      tableConfig: {
        name: "菜单管理",
      },
    };
  },
});
</script>



