<template>
  <el-sub-menu :index="route.path" v-if="route.children && route.children.length > 0">
    <template #title>
      <i :class="route.meta.icon"></i>
      <span >{{ route.meta.title }}</span>
    </template>
    <MenuItem 
        v-for="(item,index) in route.children"
      :key="index"
      :route="item"
      :path="route.path"
      :havecChildren="havecChildren"
      />
  </el-sub-menu>
  <el-menu-item :index="(havecChildren?path:'') + '/' +route.path" :key-data="(havecChildren?path:'') + '/' +route.path" v-else>
    <i :class="route.meta.icon"></i>
    <template #title>
      {{ route.meta.title }}
    </template>
  </el-menu-item>
</template>

<script lang="ts">
export default {
name: "MenuItem",
  props: {
    route: {
      type: Object,
    },
    path:{
        type: String,
    },
    havecChildren: {
      type: Boolean
    }
  },
  setup(props) {
    return {
      route: props.route,
      path: props.path,
      havecChildren: props.havecChildren
    };
  },
};
</script>