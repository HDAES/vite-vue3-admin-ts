<template>
    <el-dropdown class="h-dropdown" trigger="click" @command="handleCommand">
        <div class="me">
            <img class="avatar" src="@/assets/images/avatar.jpg" alt="avatar">
            <div class="name">{{firstLetterToUpperCase(userName) }}</div>
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item >
                    <div class="dropdown-item">
                        <GithubOutlined />
                        Github
                    </div>
                </el-dropdown-item>
                <el-dropdown-item :divided="true" command="lock">
                    <div class="dropdown-item">
                        <LockOutlined />
                        锁定屏幕
                    </div>
                </el-dropdown-item>
                 <el-dropdown-item :divided="true" command="loginOut">
                    <div class="dropdown-item">
                        <PoweroffOutlined />
                        退出系统
                    </div>
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>

    <el-dialog
        title="锁定屏幕"
        v-model="visible"
        width="30%"
        >
        
        <div class="lock-dialog">
            <img class="avatar" src="@/assets/images/avatar.jpg" alt="avatar">
            <div class="name">{{firstLetterToUpperCase(userName)}} {{firstLetterToUpperCase(roles.toString())}}</div>

            <el-form ref="formRef" :model="formData" :rules="rules" class="lock-form" label-position="top">
                <el-form-item label="锁屏密码" prop="lockPassWord">
                    <el-input @keyup.enter="handleLock" v-model="formData.lockPassWord" placeholder="请输入锁屏密码" show-password />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width:100%" @click="handleLock">锁定</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>

</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue"
import { GithubOutlined, LockOutlined, PoweroffOutlined } from '@ant-design/icons-vue'
import { useUser } from "@/hooks/user/index"
import { firstLetterToUpperCase } from '@/utils/utils'
import { useLockStore } from '@/store/modules/lock'
import { ElEForm } from "@/elemntPlus"
import md5 from "md5"
type FormData = {
    lockPassWord: string
}
export default defineComponent({
    components: { GithubOutlined, LockOutlined, PoweroffOutlined },
    setup(){
        const visible = ref<boolean>(false)
        const formRef = ref<ElEForm>()
        const useLock = useLockStore()
        const { loginOut, userName, roles } = useUser()

        const formData = reactive<FormData>({
            lockPassWord: ''
        })

        const handleCommand = (command: string) =>{
            if(command == 'loginOut'){
                loginOut().then(res =>{
                    location.href = '/login';
                })
            }else if(command == 'lock'){
                visible.value = true
            }
        }
         
        //锁定
        const handleLock = () =>{
            formRef.value?.validate((valid) =>{
                if (valid) {
                    useLock.setLockInfo({
                        pwd: md5(formData.lockPassWord),
                        isLock: true
                    })
                    visible.value = false
                } else {
                    return false
                }
            })
        }
        return {
            formRef,
            roles,
            visible,
            userName,
            formData,
            handleLock,
            firstLetterToUpperCase,
            handleCommand,
            rules: {
                lockPassWord: [
                    { required: true,message: '请输入锁屏密码',trigger: 'blur',}
                ]
            }
        }
    }
})
</script>
<style lang= "scss" scoped>
    .me{
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 10px;
        cursor: pointer;
        .avatar{
            width: 36px;
            height: 36px;
            border-radius: 50%;
        }
        .name{
            margin-left: 10px;
            font-size: 14px;
        }
    }
    .me:hover{
        background-color: #f6f6f6;
    }
    .dropdown-item{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .lock-dialog{
        display: flex;
        flex-direction: column;
        align-items: center;
        .avatar{
            width: 100px;
            border-radius: 50%;
        }
        .name{
            margin-top: 10px;
        }
        .lock-form{
            margin-top: 20px;
            width: 100%;
            padding: 0 20px;
        }
    }

</style>