<template>
  <div>
    <el-card header="正则表达式">
      <el-form label-width="120px">
        <el-form-item label="判断类型：">
          <el-select v-model="form.reg" placeholder="请选择" style="width: 220px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="正则函数：">
          <el-input type="textarea" :rows="2" v-model="form.reg" disabled style="width: 220px" />
        </el-form-item>
        <el-form-item label="判断的值：">
          <el-input v-model="form.value" style="width: 220px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleCheck">校验</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { phoneReg, idCardReg } from "@/utils/utils";
import { ElMessage } from 'element-plus'
interface formState {
    reg: RegExp | null,
    value: any
}
export default defineComponent({
  setup() {
    const form = reactive<formState>({
      reg: null,
      value: null,
    });
    const handleCheck = () => {
        if(form.reg == null){
          return ElMessage.error('请先选择判断类型')
        }
        if(form.value == null){
          return ElMessage.error('请先输入要判断的值')
        }

        if(form.reg.test(form.value)){
            ElMessage.success('验证成功！')
        }else{
            ElMessage.warning('验证失败！')
        }

    };
    return {
      form,
      handleCheck,
      options: [
        {
          value: phoneReg,
          label: "手机号码的校验",
        },
        {
          value: idCardReg,
          label: "身份证的校验",
        },
      ],
    };
  },
});
</script>
