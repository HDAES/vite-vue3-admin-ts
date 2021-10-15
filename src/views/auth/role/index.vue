<template>
  <div>
    <BasicTable :columns="columns" :getData="getRoleList" :cellClick="handleCellClick" :haveSlot="true">

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
                >保存</el-button
              >
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
          >
          </el-tree>
        </el-card>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
import { defineComponent,ref, onMounted } from "vue";
import { BasicTable } from "@/components/BasicTable";
import { getRoleList } from "@/api/system/role";
import { getPermissionTree } from '@/api/system/menu'
export default defineComponent({
  components: { BasicTable },
  setup() {
    
    const optionsTree = ref([])
    const cellId = ref<string>('')
    const treeRef = ref('')


    onMounted(() =>{
        getPermissionTree({}).then(res =>{
            optionsTree.value = res.data
        })
    })
    const hanldeSavePermissionIds = () =>{

    }

    //单列点击事件
    const handleCellClick = (e) =>{
        cellId.value = e.id
        let temp: string[] = []
        e.permissions.forEach(item =>{
            temp.push(item.id)
        })
        treeRef.value.setCheckedKeys(temp)
    }
    return {
        treeRef,
        optionsTree,
      getRoleList,
      hanldeSavePermissionIds,
      handleCellClick,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      columns: [
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
    };
  },
});
</script>
