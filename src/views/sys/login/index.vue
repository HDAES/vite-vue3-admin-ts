<template>
  <div class="login relative w-full h-full px-4">
    <div class="container relative h-full py-20 mx-auto sm:px-10">
      <div class="flex h-full">
        <div class="hidden min-h-full pl-4 mr-4 xl:flex xl:flex-col xl:w-6/12">
          <div class="logo -enter-x">
            <div class="truncate">Todo admin</div>
          </div>

          <div class="auto">
            <img class="w-1/2 -enter-x" src="@/assets/svg/login-box-bg.svg" alt="">

            <div class="mt-10 font-medium text-white -enter-x">
              <span class="inline-block mt-4 text-3xl">后台管理系统</span>
            </div>

            <div class="mt-5 font-normal text-white text-md dark:text-gray-500 -enter-x">
              输入您的个人详细信息开始使用！
            </div>
          </div>
        </div>

        <div class="flex w-full h-full py-5 xl:h-auto xl:py-0 xl:my-0 xl:w-6/12">
          <div class=" 
            login-form
            relative 
            w-full 
            px-5 
            py-8 
            mx-auto 
            my-auto 
            rounded-md 
            shadow-md 
            xl:ml-16 
            xl:bg-transparent
            sm:px-8
            xl:p-4 xl:shadow-none
            sm:w-3/4
            lg:w-2/4
            xl:w-auto
            enter-x
            ">
              <h2 class="mb-3 text-2xl font-bold text-center xl:text-3xl enter-x xl:text-left">
                登录
              </h2>

              <el-form class="enter-x" :model="form" ref="ruleForm" :rules="rules" >
                <el-form-item class="enter-x" prop="username">
                  <el-input v-model="form.username" placeholder="账号" size="medium"/>
                </el-form-item>
                <el-form-item class="enter-x" prop="password">
                  <el-input v-model="form.password" placeholder="密码" size="medium" show-password />
                </el-form-item>
                <el-form-item class="enter-x code-item" prop="code">
                  <el-input v-model="form.code" size="medium" autocomplete="off" placeholder="请输入验证码"/>
                  <img style="width:100px;margin-left:20px" :src="verifyImageBase64" alt="code" @click="getVerify" />
                </el-form-item>
                <el-form-item class="enter-x form-item-sb">
                  <el-checkbox v-model="form.rememberMe">记住密码</el-checkbox>
                  <el-button type="text" size="medium">忘记密码</el-button>
                </el-form-item>
                <el-form-item class="enter-x">
                  <el-button type="primary" size="medium" style="width:100%" @click="submitForm">登录</el-button>
                </el-form-item>
              </el-form>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue'
import { getVerifyCode } from '@/api/system/login'
import { useUserStore } from '@/store/modules/user'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const ruleForm = ref()
    const verifyImageBase64 = ref('')
    const userStore = useUserStore()
    const router = useRouter()
    const form = reactive({
      username: process.env.NODE_ENV == "development"?'hades': '',
      password: process.env.NODE_ENV == "development"?'123456': '',
      code: '',
      verify: '',
      rememberMe: true
    })
    onMounted( () =>getVerify())

    const submitForm = () =>{
      ruleForm.value.validate((valid) => {
        if (valid) {
          userStore.login(form).then(res =>{
            router.push({ path: "/dashboard/analysis" })
          }).catch(error  =>{
            getVerify()
            form.code = ''
          })
        } else {
          return false;
        }
      })
    }

    const getVerify = () =>{
      getVerifyCode().then(res =>{
        form.verify = res.data.verify
        verifyImageBase64.value = 'data:image/jpg;base64,' + res.data.imageBase64
      })
    }
    return {
      form,
      ruleForm,
      getVerify,
      submitForm,
      verifyImageBase64,
      rules:reactive({
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  height: 100%;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-image: url(@/assets/svg/login-bg.svg);
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    content: '';
    @media (max-width: $screen-xl) {
      background-image: url(@/assets/svg/login-bg-dark.svg);
    }

  }
  .container{
    .logo{
      .truncate{
        font-size: 24px;
        color: #fff;
      }
    }
    .auto{
      height: 350px;
      margin-top: auto;
      margin-bottom: auto;
    }

    .login-form{
      width: 400px;
    }
  }
}
</style>