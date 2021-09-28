<template>
    <div class="hades-header">
        <div class="collapse-breadcrumb">
            <el-icon class="h-icon " :size="18" color="#333">
                <MenuUnfoldOutlined v-if="collapse" @click="changeCollapse"/> 
                <MenuFoldOutlined v-else @click="changeCollapse"/>
            </el-icon>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="sys-tools">
            <el-icon class="h-icon" :size="18" color="#333">
                <SearchOutlined />
            </el-icon>
            <el-icon class="h-icon" :size="18" color="#333">
                <el-badge is-dot class="badge">
                    <BellOutlined />
                </el-badge>   
            </el-icon>
            <FullScreen />
            <SelectLang />
            <Me />
            <Setting />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAppSetting } from '@/hooks/app/useAppStore'
import FullScreen from '@/components/FullScreen/index.vue'
import SelectLang from '@/components/SelectLang/index.vue'
import Me from './Me.vue'
import Setting from './Setting.vue'
import { MenuUnfoldOutlined, MenuFoldOutlined, SearchOutlined, BellOutlined } from '@ant-design/icons-vue'
export default defineComponent({
    name: "hades-header",
    components: { MenuUnfoldOutlined, MenuFoldOutlined, SearchOutlined, BellOutlined, FullScreen, SelectLang, Me, Setting },
    setup(){
        const { collapse, changeCollapse } = useAppSetting()
        return {
            collapse,
            changeCollapse
        }
    }
})
</script>

<style lang="scss" scoped>
.hades-header{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    .collapse-breadcrumb{
        display: flex;
        align-items: center;
        height: 100%;
    }
    .sys-tools{
        display: flex;
        align-items: center;
        height: 100%;
        padding-right: 20px;
        .badge{
            position: relative;
          height: 18px;
          line-height: 18px;
          top: -4px;
        }
    }
}
</style>