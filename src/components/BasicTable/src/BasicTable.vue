<template>
  <div class="basic-table">
    <div class="table-header">
      <el-space wrap>
        <el-button icon="el-icon-plus" :disabled="(typeof editAdd) == 'undefined'" @click="editAdd('add')">新增</el-button>
        <el-button icon="el-icon-edit" :disabled="selectList.length != 1">修改</el-button>
        <el-button icon="el-icon-delete" :disabled="selectList.length == 0" @click="handleDelBtn('multiple',[])">删除</el-button>
        <el-button icon="el-icon-download" @click="dialogExeclVisible = true" :loading="exportLoading">导出</el-button>
      </el-space>
      <el-button-group>
        <el-button icon="el-icon-search"></el-button>
        <el-tooltip effect="dark" content="刷新列表" placement="top-start">
          <el-button icon="el-icon-refresh-right" :loading="loading" @click="handleRefresh"/>
        </el-tooltip>
        
        <ColumnSetting v-model:columns="columns" v-model:tableConfig="tableConfig"/>

        <el-popover placement="bottom-start" :width="300" trigger="click">
          <template #reference>
            <el-button icon="el-icon-setting" />
          </template>
          <div class="table-setting">
            <div class="setting-item">
              <span class="label">尺寸：</span>
              <el-radio-group v-model="tableConfig.size">
                <el-radio label="medium">默认</el-radio>
                <el-radio label="small">中等</el-radio>
                <el-radio label="mini">紧凑</el-radio>
              </el-radio-group>
            </div>
            <div class="setting-item">
              <span class="label">斑马线：</span>
              <el-switch v-model="tableConfig.stripe" active-color="#13ce66" inactive-color="#ff4949" />
            </div>
            <div class="setting-item">
              <span class="label">边框：</span>
              <el-switch v-model="tableConfig.border" active-color="#13ce66" inactive-color="#ff4949" />
            </div>
            <div class="setting-item">
              <span class="label">头部：</span>
              <el-switch v-model="tableConfig.showHeader" active-color="#13ce66" inactive-color="#ff4949" />
            </div>
            <div class="setting-item">
              <span class="label">序号：</span>
              <el-switch v-model="tableConfig.index" active-color="#13ce66" inactive-color="#ff4949" />
            </div>
          </div>
        </el-popover>
      </el-button-group>
    </div>
    

    <el-row :gutter="24" style="margin-top: 15px;">
        <el-col :span="haveSlot?18:24">
          <el-card :header="tableConfig.name" shadow="never" >
            <el-table 
              :data="tableData" 
              v-bind="tableConfig" 
              v-loading="loading"
              ref="table"
              row-key="id"
              :key="tableConfig.name"
              @selection-change="handleSelectionChange"
              @cell-click="handleCellClick"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
              header-row-class-name="hades-table-header">
              <el-table-column v-if="tableConfig.selection" type="selection" width="55" align="center"/>
              <el-table-column v-if="tableConfig.index&&pagination.total>0"  type="index" width="100" align="center" :index="1" :label="tableConfig.indexName || '序号'"></el-table-column>
              <template v-for="(item,index) in columns" :key="index">
                <el-table-column
                  v-if="item.show != false"
                  :label="item.title"
                  :prop="item.dataIndex"
                  :sortable="item.sortable || false" 
                  :align="item.align || 'left'"
                  :width="item.width"
                  :formatter="item.formatter"
                  >
                    <template v-if="!item.formatter" #default="scope">
                      <template v-if="item.slotname">
                        <template v-if="item.slotname == 'operate'">
                          <el-button v-if="!customOperate" type="text" @click.stop="editAdd('edit',scope.row)">编辑</el-button>
                          <slot :name="item.slotname" :row="scope.row" />
                          <el-button v-if="!customOperate" type="text" style="color:#f00" @click.stop="handleDelBtn('single',scope.row)">删除</el-button>
                        </template>
                        <slot v-else :name="item.slotname" :row="scope.row" />
                      </template>
                      <span v-else>{{scope.row[item.dataIndex] }}</span>
                    </template>
                  </el-table-column>
              </template>
            </el-table>
          <el-pagination 
            v-if="pagination.total>0"
            style="margin-top:20px"
            :background="true"
            :total="pagination.total" 
            layout="total,->, sizes, prev, pager, next, jumper"
            v-model:currentPage="pagination.currentPage" 
            v-model:pageSize="pagination.pageSize"/>
          </el-card>
        </el-col>
        <el-col :span="6" v-if="haveSlot">
          <slot name="card"/>
        </el-col>
    </el-row>


    <!-- 导出弹窗 -->
    <el-dialog
      title="导出表格"
      width="760px"
      v-model="dialogExeclVisible"
      >
        <el-row>
          <el-col :span="12">
             <draggable v-model="exportColumns" item-key="id" >
                <template #item="{element}" >
                    <div class="item" style="line-height:25px"> 
                        <i class="el-icon-rank" style="margin-right:10px"/>
                        <el-checkbox v-model="element.show">{{element.title}}</el-checkbox>
                    </div>
                </template>
            </draggable>
          </el-col>
          <el-col :span="12">
              <el-form label-width="100px">
                <el-form-item label="文件名：">
                  <el-input v-model="exportConfig.name" placeholder="请输入文件名"/>
                </el-form-item>
                <el-form-item label="导出条数：">
                  <el-input v-model="exportConfig.exprotNum" :max="pagination.total" placeholder="请输入文件名"/>
                </el-form-item>
                <el-form-item >
                  <el-button type="primary" @click="handleExport">导出</el-button>
                </el-form-item>
              </el-form>
          </el-col>
        </el-row>
      </el-dialog>
  </div>
</template>

<script lang="ts">
import { ref, reactive, watchEffect, onMounted, PropType } from 'vue';
import { ElMessageBox } from 'element-plus';
import { ElMessage } from 'element-plus';
import ColumnSetting from './ColumnSetting.vue';
import draggable from 'vuedraggable';
import ExportJsonExcel from '@/utils/exportExecl';
import type { TableConfig, TableColumns, DeleletType,ExportConfig } from '../table.type'
export default {
  components: { ColumnSetting, draggable },
  props:{
    columns: {
      type: Array as PropType<TableColumns[]>,
      default: (): TableColumns[] => []
    },
    getData: {
      type: Function,
      default: () => {}
    },
    delData: {
      type: Function,
      default: () => {}
    },
    tableConfig: {
      type: Object as PropType<TableConfig>
    },
    //编辑或者新增 事件
    editAdd: {
      type: Function,
    },
    //删除时 主键id
    deleteKey: {
      type: String,
      default: 'id'
    },
    //删除时 主键name
    deleteName: {
      type: String,
      default: 'name'
    },
    haveSlot: {
      type: Boolean,
      default: false
    },
    //单元格点击事件
    cellClick: {
      type: Function
    },
    //自定义操作
    customOperate:{
      type: Boolean,
      default: false
    }
  },
  setup(props ){
    const defaultConfig = {
      name: '默认名字',
      stripe: true,
      border: false,
      size: 'small',
      showHeader: true,
      index: true,
      selection: true
    } as TableConfig

    const tableConfig = reactive<TableConfig>({...defaultConfig,...props.tableConfig})
    const table = ref<any>(null)
    const selectList = ref<any[]>([])
    const columns = ref<TableColumns[]>(props.columns)
    const loading = ref<boolean>(false)
    const refresh = ref<boolean>(false)
    const dialogExeclVisible = ref<boolean>(false) //导出
    const exportColumns = ref<TableColumns[]>([]) //导出列
    const exportLoading = ref<boolean>(false) //导出等待
    const exportConfig = reactive<ExportConfig>({
      name: props.tableConfig?.name,
      exprotNum: 10
    })
    const exportColunmsFun = reactive({})
    const tableData = ref<any[]>([])
    const tempFormData = reactive({})
    const pagination = reactive({
      total: 0,
      currentPage: 1,
      pageSize: 10
    })
    watchEffect(() =>{
      loading.value = true
      refresh.value 

      props.getData({
          page: pagination.currentPage,
          size: pagination.pageSize,
          ...tempFormData
      }).then(res =>{
        if(res.data instanceof Array){
          tableData.value = res.data
        }else{
          pagination.total = res.total
          pagination.currentPage = res.page
          pagination.pageSize = res.size
          tableData.value = res.list
        }
        loading.value = false
      })
    })
    onMounted(() =>{
      let tempColumns: TableColumns[] = []
   
      columns.value.forEach(item =>{
        item.show = true
        tempColumns.push(item)
        if(item.formatter){
          exportColunmsFun[item.dataIndex] = item.formatter
        }
      })
      exportColumns.value = JSON.parse(JSON.stringify(tempColumns))
    })
    //table选状态改变
    const handleSelectionChange = (val:any): void =>{
      selectList.value = val
    }
    //删除按钮点击
    const handleDelBtn = (type : DeleletType, row: []): void =>{
      let title = <any>[]
      let ids = <any>[]
      if(type == 'single'){
        title = row[props.deleteName]
        ids = [row[props.deleteKey]]
      }else if(type == 'multiple'){
        selectList.value.forEach(item => {
          ids.push(item[props.deleteKey])
          title.push(item[props.deleteName])
        })
      }
      ElMessageBox.confirm(`此操作将永久删除 ${title} , 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        props.delData({ids: ids.toString()}).then(res =>{
          table.value.clearSelection();
          handleRefresh();
        })
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消'
        })
      })
    }
    //刷新列表
    const handleRefresh = () =>{
      refresh.value = ! refresh.value 
    }
    
    //导出按钮
    const handleExport = () =>{
      exportLoading.value = true
      let options = <TableColumns[]>[]
      
      exportColumns.value.forEach(item =>{
        if(item.show){
          options.push(item)
        }
      })
      //请求数据
      props.getData({
          page: 1,
          size: exportConfig.exprotNum,
          ...tempFormData
        }).then(res =>{
          let data: any[] = res.list
          data.map(item =>{
            for(let key  in exportColunmsFun){
              if(key in item){
                item[key] = exportColunmsFun[key](item)
              }
            }
          })
          ExportJsonExcel(options,data,exportConfig.name)
          exportLoading.value = false
          dialogExeclVisible.value = false
        })
    }
    return {
      table,
      columns,
      tableData,
      selectList,
      loading,
      tableConfig,
      pagination,
      handleRefresh,
      handleDelBtn,
      exportColumns,
      exportConfig,
      handleExport,
      exportLoading,
      handleSelectionChange,
      dialogExeclVisible,
      editAdd: props.editAdd,
      handleCellClick: props.cellClick,
      haveSlot: props.haveSlot
      
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-table{
  background-color: #fff;
  padding: 10px;
  .table-header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
  }
}
</style>