<!--
 * @Descripttion: 走势图
 * @Author: Hades
 * @Date: 2021-09-02 21:42:59
-->
<template>
  <el-card style="margin-top: 16px;">
    <el-tabs v-model="activeName">
      <el-tab-pane label="流量趋势" name="flow" :lazy="true">
        <v-chart class="chart" :option="option" />
      </el-tab-pane>
      <el-tab-pane label="访问量" name="views" :lazy="true">
        <v-chart class="chart" :option="option1"  />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
import { ref } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart, BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import VChart from "vue-echarts";

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);
export default {
  components: { VChart },
  setup() {
    const activeName = ref("flow");

    const option = ref({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          lineStyle: {
            width: 1,
            color: "#019680",
          },
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [
          "6:00",
          "7:00",
          "8:00",
          "9:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
          "22:00",
          "23:00",
        ],
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            type: "solid",
            color: "rgba(226,226,226,0.5)",
          },
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: [
        {
          type: "value",
          max: 80000,
          splitNumber: 4,
          axisTick: {
            show: false,
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ["rgba(255,255,255,0.2)", "rgba(226,226,226,0.2)"],
            },
          },
        },
      ],
      grid: {
        left: "1%",
        right: "1%",
        top: "2  %",
        bottom: 0,
        containLabel: true,
      },
      series: [
        {
          smooth: true,
          data: [
            111, 222, 4000, 18000, 33333, 55555, 66666, 33333, 14000, 36000,
            66666, 44444, 22222, 11111, 4000, 2000, 500, 333, 222, 111,
          ],
          type: "line",
          areaStyle: {},
          itemStyle: {
            color: "#5ab1ef",
          },
        },
        {
          smooth: true,
          data: [
            33, 66, 88, 333, 3333, 5000, 18000, 3000, 1200, 13000, 22000, 11000,
            2221, 1201, 390, 198, 60, 30, 22, 11,
          ],
          type: "line",
          areaStyle: {},
          itemStyle: {
            color: "#019680",
          },
        },
      ],
    });

    const option1 = ref({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          lineStyle: {
            width: 1,
            color: "#019680",
          },
        },
      },
      grid: {
        left: "1%",
        right: "1%",
        top: "2  %",
        bottom: 0,
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ],
      },
      yAxis: {
        type: "value",
        max: 8000,
        splitNumber: 4,
      },
      series: [
        {
          data: [
            3000, 2000, 3333, 5000, 3200, 4200, 3200, 2100, 3000, 5100, 6000,
            3200, 4800,
          ],
          type: "bar",
          barMaxWidth: 80,
        },
      ],
    });
    return {
      activeName,
      option,
      option1,
    };
  },
};
</script>

<style scoped>
.chart {
  height: 280px;
  width: 100%;
}
</style>