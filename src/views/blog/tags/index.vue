<!--
 * @Descripttion: 
 * @Author: Hades
 * @Date: 2021-11-27 22:14:08
-->
<template>
    <div>
        <BasicTable
            ref="tableRef"
            :tableConfig="tableConfig"
            :columns="columns"
            :get-data="getBlogTags"
            :del-data="deleteBlogTag"
            :edit-add="handleEditAdd"
        />
        <el-dialog
            :title="dialog.type == 'edit' ? '编辑' : '添加'"
            v-model="dialog.visible"
            width="600px"
            top="20px"
            @closed="closed"
        >
            <el-form :model="formData" ref="formRef" :rules="rules" label-width="100px">
                <el-form-item label="ID：" v-if="formData.id">
                    <el-input v-model="formData.id" disabled style="width: 300px;" />
                </el-form-item>
                <el-form-item label="分类名称：" prop="sid">
                    <el-select v-model="formData.sid" placeholder="请先选择分类" style="width: 300px;">
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标签名称：" prop="tname">
                    <el-input v-model="formData.tname" placeholder="请输入标签名称" style="width: 300px;" />
                </el-form-item>
                <el-form-item label="标签图标：" prop="ticon">
                    <el-input v-model="formData.ticon" placeholder="请输入标签图标：" style="width: 300px;" />
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
import { BasicTable, TableActionType, TableColumns, UpDateType } from "@/components/BasicTable";
import { getBlogTags, deleteBlogTag, postBlogTags, putBlogTags } from '@/api/blog/tags'
import { getBlogSortAll } from '@/api/blog/sort'
import { SortType, TagType } from "@/api/blog/blog.type";
import { ElEForm } from "@/elemntPlus";
export default defineComponent({
    components: { BasicTable },
    setup() {
        const dialog = reactive({ visible: false, type: "" });
        const options = ref<SortType[]>([])
        const formRef = ref<ElEForm | null>(null)
        const tableRef = ref<Nullable<TableActionType>>(null)
        const formData = ref<TagType>({
            sid: '',
            tname: '',
            ticon: ''
        })
        const handleEditAdd = (type: UpDateType, row: TagType) => {
            dialog.visible = true;
            dialog.type = type;
            if (type == "edit") {
                formData.value = row
            }
            getBlogSortAll().then(res => {
                options.value = res.data
            })
        }

        const closed = ( ) =>{
            formData.value = {
                sid: '',
                tname: '',
                ticon: ''
            }
        }

        const handleDetermine = () => {
            formRef.value?.validate( valid =>{
                if(valid){
                    if(dialog.type == "add"){
                        postBlogTags(formData.value).then(res =>{
                            dialog.visible = false
                            tableRef.value?.handleRefresh()
                        })
                    }else{
                        putBlogTags({...formData.value,name: null}).then(res =>{
                            dialog.visible = false
                            tableRef.value?.handleRefresh()
                        })
                    }
                   
                }else{
                    return false
                }
            })
        }
        return {
            dialog,
            formData,
            options,
            formRef,
            tableRef,
            closed,
            getBlogTags,
            deleteBlogTag,
            handleEditAdd,
            handleDetermine,
            rules: {
                sid: [{ required: true, message: '请选择标签分类', trigger: 'blur' }],
                tname: [{ required: true, message: '请输入标签名称', trigger: 'blur' }],
                ticon: [{ required: true, message: '请输入标签图标', trigger: 'blur' }],
            },
            columns: <TableColumns[]>[{
                title: "名字",
                dataIndex: "name",
            }, {
                title: '标签名字',
                dataIndex: 'tname'
            }, {
                title: '标签图标',
                dataIndex: 'ticon'
            }, {
                title: "操作",
                width: 150,
                align: "center",
                slotname: "operate",
            }],
            tableConfig: {
                name: '博客标签'
            }
        };
    },

});
</script>