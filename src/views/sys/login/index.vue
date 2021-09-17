<template>
  <div>
    <el-button type="primary">登录</el-button>
    登录
  </div>
</template>

<script>
import { getVerifyCode,getVerifyCodes } from '@/api/system/login'
export default {

  setup() {
    getVerifyCode()
    getVerifyCode()
    getVerifyCode()
    getVerifyCode()
    getVerifyCodes()
  }
}
</script>