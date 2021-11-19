<template>
  <div >
    <BasicTable 
      ref="table"
     :columns="columns" 
     :getData="getUserList"
     :delData="deleteUser"
     :edit-add="handleEditAdd"
     :tableConfig="tableConfig"
     deleteName="username"
    >
      <template #status="scope">
        <el-switch 
          v-has="'btn:auth:user:status'"
          v-model="scope.row.status" 
          :active-value="1" 
          :inactive-value="0" 
          active-color="#13ce66" 
          inactive-color="#ff4949"
          @change="switchChange(scope.row)"
          />
      </template>
      <template #operate="scope">
        <el-button @click="handleChangePassWord(scope.row)" v-has="'btn:auth:user:edit'" type="text">改密</el-button>
      </template>
    </BasicTable>

    <el-dialog
      :title="dialog.type== 'edit'?'编辑':'添加'"
      v-model="dialog.visible"
      width="600px"
      @closed="closed"
      >
      <el-form label-width="80px">
        <el-row>
          <el-col v-if="dialog.type == 'edit'" :span="12">
            <el-form-item label="ID：">
              <el-input v-model="formData.id" disabled placeholder="请输入用户名"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名：">
              <el-input v-model="formData.username" placeholder="请输入用户名"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称：">
              <el-input v-model="formData.nickname" placeholder="请输入昵称"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色：">
              <el-select multiple  v-model="formData.roleIds" placeholder="请选择角色" style="width:100%">
                <el-option 
                  v-for="(item,index) in roleOptions"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="dialog.type == 'add'">
            <el-form-item label="密码：">
              <el-input v-model="formData.password" placeholder="请输入密码" show-password/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialog.visible = false">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { BasicTable, TableActionType } from '@/components/BasicTable'
import { getUserList, postUserAdd, deleteUser, putUser,putUserStatus } from '@/api/system/user'
import { getAllRoleList } from '@/api/system/role'
import { ref, reactive, onMounted } from 'vue'
import { ElMessageBox } from 'element-plus';
import { ElMessage } from 'element-plus';
import Md5 from 'md5'
import { TableColumns, UpDateType } from '@/components/BasicTable/table.type';

interface RoleOptions {
  id: string
  name: string
}

interface List {
  id: string,
  username: string,
  nickname: string,
  roles: {
    id: string,
  }[]
}

interface FormData {
  id?: string,
  username: string,
  nickname: string,
  roleIds: string[],
  password?: string
}

export default {
  components: { BasicTable },
  setup(){
    const table = ref<Nullable<TableActionType>>(null)
    const roleOptions = ref<RoleOptions[]>([])
    const formData = ref<FormData>({
      username: '',
      nickname: '',
      roleIds: [],
      password: ''
    })
    const dialog = reactive({
      visible: false,
      type: ''
    })
    onMounted(() =>{
      getAllRoleList().then(res =>{
        roleOptions.value = res.data
      })
    })
    //新增或者编辑
    const handleEditAdd = (type: UpDateType, row: List) =>{
      dialog.visible = true
      dialog.type = type
      if(type == 'edit'){
        let roleIds: string[] = []
        row.roles.forEach(item =>roleIds.push(item.id))
        formData.value = {
          id: row.id,
          username: row.username,
          nickname: row.nickname,
          roleIds,
        }
      }
      
    }
    //添加
    const handleSubmit = () =>{
      if(dialog.type == 'add'){
        postUserAdd({
          ...formData.value,password: Md5(formData.value.password || '')
        }).then(res =>{
          dialog.visible = false
          table.value?.handleRefresh()
        })
      }else{
        putUser(formData.value).then( res =>{
          dialog.visible = false
          table.value?.handleRefresh()
        })
      }
    }
    const switchChange = (e) =>{
      if(e.id!=null){
        putUserStatus({secUserId:e.id,status: e.status})
      }
    }
    //修改密码
    const handleChangePassWord = row =>{
      ElMessageBox.prompt('请输入密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
         putUser({id: row.id,password: Md5(value)}).then(res =>{
          console.log(res)
        })
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消',
        })
      })
    }
    //关闭弹窗
    const closed = () =>{
      formData.value = {
        username: '',
        nickname: '',
        roleIds: [],
        password: ''
      }
    }


    return {
      table,
      dialog,
      formData,
      roleOptions,
      getUserList,
      deleteUser,
      closed,
      handleEditAdd,
      handleSubmit,
      handleChangePassWord,
      switchChange,
      columns: <TableColumns[]>[{
        title: '角色名',
        dataIndex: 'username',
      },{
        title: '昵称',
        dataIndex: 'nickname'
      },{
        title: '头像',
        dataIndex: 'avatar'
      },
      {
        title: '手机',
        dataIndex: 'phone'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        formatter: ({sex}) => sex == 1? '男': sex == 2? '女':'未知'
      },
      {
        title: '状态',
        dataIndex: 'status',
        slotname: 'status'
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        showOverflowTooltip: true
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        showOverflowTooltip: true
      },{
        title: '操作',
        width: 150,
        align: 'center',
        slotname: 'operate'
      }],
      tableConfig: {
        name: '管理员管理'
      } 
    }
  }
}
</script>