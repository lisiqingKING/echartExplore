<script setup lang="ts">
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts';
import { onMounted, Ref, ref } from 'vue';

/**
 * ----------------------------------------------------------------
 * 
 * 说明: 
 * 本组件为核心组件 + 类型图表组件配置
 * 
 * ----------------------------------------------------------------
 * 
 *  本组件需要做的事:
 *  1. 进行通用选项设置
 *     1.1 图表容器及大小
 *     1.2 图例 legend
 *     1.3 标题 title
 *     1.4 提示 tooltip
 *  
 *  2. 完成统一的对位暴露方法的出口
 *     2.1 本组件暴露的方法
 *     2.2 类型组件暴露的方法
 * 
 *  3. 提供不同类型图表生成 option的入口
 * 
 *  4. 提供动画
 * 
 *  5. 提供交互
 * 
 * ----------------------------------------------------------------
 * 
 *  类型组件要完成的事
 *   # 类型图表组件的选项和本组件冲突 可以选择覆盖或者合并
 *     目前的组件计划：柱状图\饼图\折线图\3维立体 
 * 
 *   1.1 类型组件特定的暴露方法
 * 
 *   1.2 类型组件
 * 
 * ----------------------------------------------------------------
 * 
 *   思路：
 *      #父组件为本组件也就是核心组件， 子组件为类型组件选项配置
 * 
 *      父组件拿到 props 先自己生成通用的选项
 *      父组件通过一个入口将生成的选项和props传递给子组件
 *      子组件拿到 props 和 option 进行处理, 子组件处理完后扔会给父组件 
 *      父组件拿到这个 option, 可以做修改(避免设置通用项目的时候需要提前设置某些需要在子组件设置的属性)
 *      这里表现为父组件会设置一个 prop 接受一个函数 该函数就是用来完成对子组件返回的option进行最后一步修改
 * 
 *      子组件的大概形式:
 *      <name>.js
 *       export default function (props, option) {
 *        # fake code:
 *        const initOption = () => {
 *          const setTitle: (option, config) => { }
 *          const setXAxis: Function       
 * 
 *           const listObj = { 
 *              title: setTitle
 *              xAxis: setXAxis
 *           }
 *           const needList = Object.keys(listObj).filter(item => Object.keys(props).includes(item))
 *           needList.forEach(item => {
 *             listObj[item]()
 *           })
 *        }
 * 
 *            const exposeFunc = Function
 *            const exposeMethods = { exposeFunc }
 *        
 *            return {
 *              initOption,
 *              exposeMethods
 *            }
 *         
 *      }
 * 
 * ----------------------------------------------------------------
 * 
 * 
 *  工具函数:
 *   1.对于一些特定的属性可以单独抽出形成hook
 *     1.1 富文本标签, 即样式 & 格式化
 * 
 *   2. 批量设置、独立设置、深度设置
 * 
 * ----------------------------------------------------------------
 *  
 *  需要实现什么
 *     1. 批量设置属性
 *     2. 独立设置属性
 *     3. 按照echart的方式设置属性
 *     4. 提供一个属性或者方法可以直接设置某个层级很深的属性
 *     5. 提供一个终极选项option 完全覆盖本组件和类型组件生成的选项
 *
 * ----------------------------------------------------------------
 * 
 *  需要注意什么
 *     1. 图表选项的设置先后冲突(不设置A属性 无法设置B属性)
 *     2. 图表选项设置的优先级(全局字体样式为 A, 给某个属性设置样式 B)
 * 
 * ----------------------------------------------------------------
 */

const props = defineProps<{
  title: 
}>()

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
