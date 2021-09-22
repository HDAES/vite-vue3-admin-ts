<template>
    <el-dropdown class="h-dropdown" trigger="click">
        <el-icon class="h-icon" :size="18" color="#333">
                <TranslationOutlined />
            </el-icon>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>简体中文</el-dropdown-item>
                <el-dropdown-item>English</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TranslationOutlined } from '@ant-design/icons-vue'
export default defineComponent({
    name: 'SelectLang',
    components: { TranslationOutlined }
})
</script>