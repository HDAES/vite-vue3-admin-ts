<template>
  <el-row style="margin-top:16px">
      <el-col :span="18">
          <el-card header="快捷导航">
              <div class="quick">
                  <div class="item">
                      <i class="el-icon-menu"/>
                      <div>首页</div>
                  </div>
                  <div class="item">
                      <i class="el-icon-menu"/>
                      <div>首页</div>
                  </div>
                  <div class="item">
                      <i class="el-icon-menu"/>
                      <div>首页</div>
                  </div>
              </div>
          </el-card>
      </el-col>
  </el-row>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.quick{
    display: flex;
}
</style>