<template>
    <el-dropdown class="h-dropdown" trigger="click">
        <div class="me">
            <img class="avatar" src="@/assets/images/avatar.jpg" alt="avatar">
            <div class="name"> HADES</div>
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item >
                    <GithubOutlined />
                    Github
                </el-dropdown-item>
                <el-dropdown-item :divided="true">
                    <LockOutlined />
                    锁定屏幕
                </el-dropdown-item>
                 <el-dropdown-item :divided="true">
                    <PoweroffOutlined />
                    退出系统
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import { GithubOutlined, LockOutlined, PoweroffOutlined } from '@ant-design/icons-vue'
export default defineComponent({
    components: { GithubOutlined, LockOutlined, PoweroffOutlined }
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
</style>