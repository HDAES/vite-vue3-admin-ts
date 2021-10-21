<template>
  <div>
    <el-card>
     <template #header>
      <div class="card-header">
        <span>表格导出</span>
        <el-button size="mini" @click="dialogExeclVisible = true">一键导出</el-button>
      </div>
    </template>
      <el-table 
      :data="data.slice((pagination.currentPage -1)* pagination.pageSize,pagination.currentPage*pagination.pageSize)" 
      size="medium">
        <template v-for="(item,index) in columns" :key="index">
          <el-table-column 
            :label="item.title"
            :prop="item.dataIndex"
            :width="item.width"
            ></el-table-column>
        </template>
      </el-table>
      <el-pagination 
        style="margin-top:20px"
        :background="true"
        :total="pagination.total" 
        layout="total,->, sizes, prev, pager, next, jumper"
        v-model:currentPage="pagination.currentPage" 
        v-model:pageSize="pagination.pageSize"/>
    </el-card>

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
              <el-form label-width="80">
                <el-form-item label="文件名：">
                  <el-input v-model="exportConfig.name" placeholder="请输入文件名"/>
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
import { data, columns } from './data'
import { reactive, ref } from 'vue'
import draggable from 'vuedraggable';
import ExportJsonExcel from '@/utils/exportExecl'
export default {
  components: { draggable },
  setup(){
    
    const exportColumns = ref(columns)
    const dialogExeclVisible = ref(false)
    const exportConfig = reactive({
      name: ''
    })
    const pagination = reactive({
      total: data.length,
      currentPage: 1,
      pageSize: 10
    })
    //导出
    const handleExport = () =>{
      let options: any[] = []
      exportColumns.value.forEach(item =>{
        if(item.show){
          options.push(item)
        }
      })
      ExportJsonExcel(options,data,exportConfig.name)
    }
    return {
      dialogExeclVisible,
      pagination,
      exportColumns,
      exportConfig,
      handleExport,
      columns,
      data
    }
  }
}
</script>