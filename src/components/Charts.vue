<script setup lang="ts">
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts';
import { onMounted, Ref, ref } from 'vue';

const chartDomRef: Ref<HTMLElement|undefined> = ref(undefined)
const option: Ref<EChartsOption|undefined> = ref(undefined)

const render = (option: EChartsOption) => {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(chartDomRef.value as HTMLElement);

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}

onMounted(() => {
  option.value = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
  render(option.value as EChartsOption)
})


</script>

<template>
  <div
    ref="chartDomRef"
    style="height:100%;width:100%"
  >
  </div>
</template>

<style scoped>
</style>
