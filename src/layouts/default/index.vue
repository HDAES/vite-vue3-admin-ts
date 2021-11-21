<template>
    <el-container style="height:100%">
        <Feature />
        <Sidebar />
        <el-container>
            <el-header style="height: 48px">
               <Header />
            </el-header>
            <AppMain />
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain/index.vue'
import Header from './components/Header/index.vue'
import Feature from './feature/index.vue'
</script>