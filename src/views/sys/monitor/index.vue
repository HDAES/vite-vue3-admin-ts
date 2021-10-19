<template>
    <div>
        <BasicTable
            ref="tableRef"
            :columns="columns"
            :getData="getOnline"
            :tableConfig="tableConfig"
            :customOperate="true"
        >
            <template #status="scope">
                <el-switch
                    v-model="scope.row.status"
                    :active-value="1"
                    :inactive-value="0"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="switchChange(scope.row)"
                />
            </template>
            <template #operate="scope">
                <el-button @click="handleKickOut(scope.row)" style="color:#f00" type="text">踢出</el-button>
            </template>
        </BasicTable>
    </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'
import { BasicTable, TableActionType, TableColumns } from '@/components/BasicTable'
import { getOnline, deleteKickout } from '@/api/system/sys'
import { putUserStatus } from '@/api/system/user'
import { ElMessageBox } from 'element-plus'
import { ElMessage } from 'element-plus';
export default defineComponent({
    components: { BasicTable },
    setup() {

        const tableRef = ref<Nullable<TableActionType>>(null)
        const switchChange = (row : any) => {
            if(row.id!=null){
                putUserStatus({secUserId:row.id,status: row.status})
            }
         }
        //提出
        const handleKickOut = (row : any) => {
            ElMessageBox.confirm(`是否踢出 ${row.username}?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    deleteKickout({ ids: row.id }).then(res => {
                        tableRef.value?.handleRefresh()
                    })
                })
                .catch(() => {
                    ElMessage({ type: 'info', message: '已取消删除' });
                })
        }

        return {
            tableRef,
            getOnline,
            switchChange,
            handleKickOut,
            columns: <TableColumns[]>[{
                title: '角色名',
                dataIndex: 'username',
            }, {
                title: '昵称',
                dataIndex: 'nickname'
            }, {
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
                formatter: ({ sex }) => sex == 1 ? '男' : sex == 2 ? '女' : '未知'
            },
            {
                title: '状态',
                slotname: 'status'
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
            },
            {
                title: '更新时间',
                dataIndex: 'updateTime'
            }, {
                title: '操作',
                width: 150,
                align: 'center',
                slotname: 'operate'
            }],
            tableConfig: {
                name: '管理员管理'
            },
        }
    }
})
</script>