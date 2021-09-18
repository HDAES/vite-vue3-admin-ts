<template>
    <el-container style="height:100%">
        <Sidebar />
        <el-container>
            <el-header style="height: 48px">
                123123
            </el-header>
            <AppMain />
        </el-container>
    </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain/index.vue'
export default defineComponent({
    components: { Sidebar, AppMain }
})

</script>