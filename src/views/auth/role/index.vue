<template>
  <div>
    <BasicTable
      ref="tableRef"
      :columns="columns"
      :edit-add="handleEditAdd"
      :getData="getRoleList"
      :delData="deleteRole"
      :cellClick="handleCellClick"
      :tableConfig="tableConfig"
      :haveSlot="true"
    >
      <template v-slot:card>
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>菜单分配</span>
              <el-button
                class="button"
                size="mini"
                :disabled="cellId == ''"
                type="primary"
                @click="hanldeSavePermissionIds"
              >保存</el-button>
            </div>
          </template>

          <el-tree
            ref="treeRef"
            :data="optionsTree"
            show-checkbox
            node-key="id"
            check-strictly
            :props="defaultProps"
            empty-text="加载中,请稍等"
          ></el-tree>
        </el-card>
      </template>
    </BasicTable>

      <el-dialog
      title="添加角色"
      v-model="dialog.visible"
      width="600px"
      @closed="closed"
      >
      <el-form :model="ruleForm" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item v-if="dialog.type == 'edit'" label="ID：">
          <el-input v-model="ruleForm.id" disabled placeholder="请输入角色名"/>
        </el-form-item>
        <el-form-item label="角色名：" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入角色名"/>
        </el-form-item>
        <el-form-item label="描述：" prop="description">
          <el-input v-model="ruleForm.description" placeholder="请输入描述"/>
        </el-form-item>
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
import { defineComponent, ref, reactive, onMounted } from "vue";
import { BasicTable, TableActionType, TableColumns, UpDataType } from "@/components/BasicTable";
import { getRoleList, putPermission, postRoleAdd, putRole, deleteRole } from "@/api/system/role";
import { getPermissionTree } from '@/api/system/menu'
import { ElTree, ElForm } from 'element-plus'

type ElETree = InstanceType<typeof ElTree>
type ElEForm = InstanceType<typeof ElForm>

type RuleForm = {
  id?: string
  name: string
  description: string
}
type Dialog = {
  visible: boolean
  type: UpDataType
}

export default defineComponent({
  components: { BasicTable },
  setup() {
    const optionsTree = ref([])
    const cellId = ref<string>('')
    const treeRef = ref<ElETree | null>(null)
    const tableRef = ref<Nullable<TableActionType>>(null)
    const formRef = ref<ElEForm | null>(null)
    const dialog = reactive<Dialog>({
      visible: false,
      type: 'add'
    })
    const ruleForm = ref<RuleForm>({
      name: '',
      description: ''
    })

    onMounted(() => {
      getPermissionTree({}).then(res => {
        optionsTree.value = res.data
      })
    })

    //保存菜单
    const hanldeSavePermissionIds = () => {
      putPermission({
        id: cellId.value,
        permissionIds: treeRef.value?.getCheckedKeys(false)
      }).then(res =>{
        tableRef.value?.handleRefresh()
      })
    }

    //添加或者编辑按钮点击
    const handleEditAdd = (type: UpDataType, row: any) =>{
      dialog.visible = true
      dialog.type = type
      if(type == 'edit'){
        ruleForm.value = {
          name: row.name,
          description: row.description,
          id: row.id
        }
      }
    }

    //添加或者编辑保存按钮
    const handleDetermine = () =>{
      formRef.value?.validate( valid =>{
        if (valid) {
          if(dialog.type == 'add'){
            postRoleAdd(ruleForm.value).then(res =>{
              dialog.visible = false
              tableRef.value?.handleRefresh()
            })
          }else{
            putRole(ruleForm.value).then(res =>{
              dialog.visible = false
              tableRef.value?.handleRefresh()
            })
          }
        }else{
          return false
        }
      })
    }

    const closed = () =>{
      ruleForm.value ={
        name: '',
        description: '' 
      }
    }

    const deleteRole = () =>{

    }
    //单列点击事件
    const handleCellClick = (e) => {
      cellId.value = e.id
      let temp: string[] = []
      e.permissions.forEach(item => {
        temp.push(item.id)
      })
      treeRef.value?.setCheckedKeys(temp, false)
    }
    return {
      dialog,
      cellId,
      ruleForm,
      formRef,
      treeRef,
      tableRef,
      optionsTree,
      closed,
      deleteRole,
      getRoleList,
      handleEditAdd,
      handleDetermine,
      hanldeSavePermissionIds,
      handleCellClick,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      columns: <TableColumns[]>[
        {
          title: "角色名",
          dataIndex: "name",
        },
        {
          title: "描述",
          dataIndex: "description",
        },
        {
          title: "创建时间",
          dataIndex: "createTime",
        },
        {
          title: "更新时间",
          dataIndex: "updateTime",
        },
        {
          title: "操作",
          width: 150,
          align: "center",
          slotname: "operate",
        },
      ],
      rules: { 
        name: [
          { required: true, message: '请输入角色名', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      },
      tableConfig:{
        name: '角色管理'
      }
    };
  },
});
</script>
