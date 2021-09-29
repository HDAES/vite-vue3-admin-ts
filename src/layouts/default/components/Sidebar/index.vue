<template>
    <el-scrollbar style="background-color: #001529">
    <el-menu
      class="sidebar-el-menu"
      :collapse="isCollapse"
      background-color="#001529"
      text-color="#ccc"
      active-text-color="#fff"
      :router="true"
    >
      <MenuItem
        v-for="(item, index) in sidebarRouters"
        :key="index"
        :path="item.path"
        :route="item"
        :havecChildren="item.children&&item.children.length>0"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import MenuItem from "./MenuItem.vue";
import { defineComponent } from "vue";
import { useAppSetting } from '@/hooks/app/useAppStore'
export default defineComponent({
  components: { MenuItem },
  setup() {
    const { collapse, sidebarRouters } = useAppSetting();
    return {
      collapse,
      sidebarRouters
    };
  },
});
</script>

<style lang="scss" scoped>
.side{
  display: flex;
  flex-direction: column;
  background-color: #001529;
  .logo{
    text-align: center;
    height: 48px;
    line-height: 48px;
  }
}
</style>