<template>
    <div class="lock">
        <div class="lock-unlock" @click="handleShowForm(false)" >
            <LockOutlined v-show="showDate"/>
            <span v-show="showDate">点击解锁</span>
        </div>

        <div class="time">
            <div class="hour-box">{{hour}}</div>
            <div class="minute-box">{{minute}}</div>

            <transition name="fade-slide">

                <div class="lock-enter" v-show="!showDate">
                    <img class="avatar enter-x" src="@/assets/images/avatar.jpg" alt="avatar">
                    <div class="name enter-x">{{firstLetterToUpperCase(userName)}} {{firstLetterToUpperCase(roles.toString())}}</div>
                    <el-input v-model="psw" class="enter-x" style="width: 250px" @keyup.enter="handleEnter" placeholder="请输入锁屏密码或者用户密码" show-password/>
                    <div class="btn enter-x" >
                        <el-button type="text" size="medium" @click="handleShowForm(true)">返回</el-button>
                        <el-button type="text" size="medium" @click="handleBackLogin">返回登录</el-button>
                        <el-button type="text" size="medium" @click="handleEnter">进入系统</el-button>
                    </div>
                </div>
            </transition>
        </div>

        <div class="date-time">
            <div class="dtime enter-x" v-show="!showDate">{{hour}}:{{minute}} {{meridiem}}</div>
            <div class="date enter-y">{{year}}/{{month}}/{{day}} 星期{{week}}</div>
        </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { LockOutlined } from '@ant-design/icons-vue'
import { firstLetterToUpperCase } from '@/utils/utils'
import { useUser } from '@/hooks/user';
import { useLockStore } from '@/store/modules/lock';
import { ElMessage } from 'element-plus';
import md5 from 'md5';
import { useNow } from './useNow'
export default defineComponent({
    components: { LockOutlined },
    setup(){
        const showDate = ref(true);
        const psw = ref<string>('')
        const { userName, roles, loginOut } = useUser()

        const useLock = useLockStore()
        const handleShowForm = (value) =>{
            showDate.value = value
        }
        
        const { year, month, day, hour, minute, week, meridiem } = useNow(true)
        //进入系统
        const handleEnter = () =>{
            if(!useLock.unLock( md5(psw.value))){
                ElMessage({
                    message: '锁屏密码不正确',
                    type: 'warning',
                })
            }
           
        }

        //返回登录
        const handleBackLogin = () =>{
            loginOut().then(() =>{
                location.href = '/#/login';
                useLock.resetLockInfo()
            })
        }
        return {
            year,
            month,
            day,
            hour,
            minute,
            week,
            meridiem,
            psw,
            roles,
            userName,
            showDate,
            handleEnter,
            handleShowForm,
            handleBackLogin,
            firstLetterToUpperCase,
            
        }
    }
})
</script>

<style lang= "scss" scoped>
.lock{
    position: fixed;
    width: 100%;
    height: 100%;
    padding: 20px 100px;
    color: #fff;
    background-color: #000;
    z-index: 999;
    .lock-unlock{
        font-size: 18px;
        height: 45px;
        display: flex;
        align-items: center;
        flex-direction: column;
        cursor: pointer;
    }
    .time{
        position: relative;
        top: 50px;
        display: flex;
        justify-content: space-between;
        .hour-box,.minute-box{
            font-size: 260px;
            font-weight: bold;
            flex-basis: 48%;
            height: 80vh;
            line-height: 80vh;
            text-align: center;
            color: #BABABA;
            background-color: #141313;
            border-radius: 30px;
        }

        .lock-enter{
            position: absolute;
            height: 80vh;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(8px);
            background-color: #00000080;
            .avatar{
                width: 50px;
                border-radius: 50%;
            }
            .name{
                color: #bababa;
                margin: 5px 0;
            }
            .btn{
                display: flex;
                width: 250px;
                margin-top: 5px;
                justify-content: space-between;
            }
        }
    }
    .date-time{
        position: relative;
        top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        height: 88px;
        text-align: center;
        .data{
            font-size: 24px;
            text-align: center;
            margin-bottom: 10px;
        }
        .dtime{
            font-size: 36px;
            text-align: center;
        }
    }
}
</style>