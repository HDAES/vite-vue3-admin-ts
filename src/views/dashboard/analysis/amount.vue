<!--
 * @Descripttion: 数据统计
 * @Author: Hades
 * @Date: 2021-09-02 20:49:03
-->

<template>
  <el-row :gutter="16" class="analysis-amount">
    <el-col :span="6">
      <el-card class="hades-card"> 
        <template #header>
          <div class="card-header">
            <span class="title">访问数</span>
            <div class="date moon">月</div>
          </div>
        </template>

        <div class="single">
          <CountTo :startVal='0' :endVal='1000' :duration='500' prefix="$" style="font-size: 22px"/>
          <svg-icon name="visit-count" size="40"/>
        </div>
        <div class="all">
          <div>总访问数</div>
          <CountTo :startVal='0' :endVal='1000' :duration='500' prefix="$"/>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="hades-card"> 
        <template #header>
          <div class="card-header">
            <span class="title">成交额</span>
            <div class="date moon1">月</div>
          </div>
        </template>
        <div class="single">
          <CountTo :startVal='0' :endVal='1000' :duration='500' prefix="$" style="font-size: 22px"/>
          <svg-icon name="total-sales" size="40"/>
        </div>
        <div class="all">
          <div>总成交额</div>
          <CountTo :startVal='0' :endVal='1000' :duration='500' prefix="$"/>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="hades-card">
        <template #header>
          <div class="card-header">
            <span class="title">下载数</span>
            <div class="date week">周</div>
          </div>
        </template>
        <div class="single">
          <CountTo :startVal='0' :endVal='1000' :duration='500' prefix="$" style="font-size: 22px"/>
          <svg-icon name="download-count" size="40"/>
        </div>
        <div class="all">
          <div>总下载数</div>
          <CountTo :startVal='0' :endVal='1000' :duration='500' prefix="$"/>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="hades-card">
        <template #header>
          <div class="card-header">
            <span class="title">成交数</span>
            <div class="date year">年</div>
          </div>
        </template>
        <div class="single">
          <CountTo :startVal='0' :endVal='1000' :duration='500' prefix="$" style="font-size: 22px"></CountTo>
          <svg-icon name="transaction" size="40"/>
        </div>
        <div class="all">
          <div>总成交数</div>
          <CountTo :startVal='0' :endVal='1000' :duration='500' prefix="$" />
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import  CountTo  from '@/components/CountTo/index.vue';
import { defineComponent } from 'vue'
export default defineComponent({
  components: { CountTo }
})
</script>

<style lang="scss" scoped>
.analysis-amount{
  font-size: 14px;
  .date{
    border: 1px solid #666;
    padding: 0 7px;
    border-radius: 3px;
  }
  .moon{
    color: #389e0d;
    background: #f6ffed;
    border-color: #b7eb8f;
  }
  .moon1{
    color: #096dd9;
    background: #e6f7ff;
    border-color: #91d5ff;
  }
  .week{
    color: #d46b08;
    background: #fff7e6;
    border-color: #ffd591;
  }
  .year{
    color: #531dab;
    background: #f9f0ff;
    border-color: #d3adf7;
  }
  .single{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
  }
  .all{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
  }
  .amount-svg{
    width: 40px!important;
    height: 40px!important;
  }
}
</style>
