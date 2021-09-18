<template>
  <el-scrollbar style="background-color: #001529">
    <div class="logo">
      logo
    </div>
    <el-menu
      class="sidebar-el-menu"
      background-color="#001529"
      text-color="#ccc"
      active-text-color="#fff"
      :collapse="false"
    >
      <el-sub-menu index="1">
        <template #title>
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template #title>分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title>选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <template #title>导航二</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <template #title>导航三</template>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <template #title>导航四</template>
      </el-menu-item>


    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const isCollapse = ref(false);
    
    return {
      isCollapse
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