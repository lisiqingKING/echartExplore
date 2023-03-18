<script setup lang="ts">
import { cloneDeep } from 'lodash';
import Chart from '../components/Chart.vue';
import {howToProduceChartArgs, initData } from './about'
import TableS from './TableS.vue';
import { Ref, ref, watch} from 'vue'
import codeView from './codeView.vue';

// const { forms, xAxisTableData, yAxisTableData, seriesTableData } = initData()
// // console.log('@init-forms', forms, cloneDeep(forms.value))
// const isEval = (v: any) => {
//     console.log('@v', typeof v, v)
//     if (typeof v === 'string') {
//         console.log('v:', v, v.includes('[') || v.includes('{'))
//         return v.includes('[') || v.includes('{')
//     } else {
//         return false
//     }
// }
// const chartProps: Ref<(CommonObject & { type: ChartType }) | {}> = ref({})
// const updateChartFormData = (data: CommonObject) => {
//     const _data: CommonObject = cloneDeep(data)

//     const fn = (tree: CommonObject) => {
//         Object.keys(tree).forEach(item => {
//             tree[item] = isEval(tree[item]) ? eval(tree[item]) : tree[item]
//             typeof tree[item] === 'object' && fn(tree[item])
//         })
//     }
//     fn(_data)
//     // Object.keys(_data).forEach(item => {
//     //     _data[item] = isEval(_data[item]) ? eval(_data[item]) : _data[item]
//     // })

//     chartProps.value = howToProduceChartArgs(_data)
//     console.log('@转化-1',data, chartProps.value)
// }
// watch(forms, updateChartFormData, {immediate: true })

import { ChartGuide, FormsItemsMap, TableColumnsMap } from '../config/bar/static'
import { useChartDataInit } from '../hooks/chart'
import { ElOption, ElSelect } from 'element-plus';

const { forms, tableDataMap, option, curSelectValue, propsForChart, formsItemsMap, tableColumnsMap   } = useChartDataInit(FormsItemsMap, ChartGuide, TableColumnsMap)
console.log('forms', forms)
console.log('tableDataMap', tableDataMap)
console.log('option', option)
console.log('formsItemsMap', formsItemsMap)
console.log('propsForChart', propsForChart)

</script>

<template>
    <div class="container">
        <div class="left">

            <ElSelect class="guide-select" v-model="curSelectValue">
                <ElOption 
                    v-for="item in option" 
                    :label="item.label" 
                    :value="item.label"
                >{{ item.label  }}
                </ElOption>
            </ElSelect>

            <TableS
               class="forms"
              :forms="forms"
              :tableDataMap="tableDataMap"
              :tableColumnsMap="tableColumnsMap"
              :formsItemsMap="formsItemsMap"
            />
        </div>
        <div class="right">
            <div class="chart">
                <Chart 
                  type="bar"
                  :option="propsForChart" 
                />
            </div>
            <codeView
              class="codeView"
              :formData="propsForChart" 
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    box-sizing: border-box;
    height: 100%;
    .left, .right {
        height: 100%;
    }

    .left {
        flex: 1;
        .edit-form-edit {
            height: 30px;
            line-height: 30px;
            display: flex;
            margin: 20px 0;
            > div {
                margin-right: 20px;
                display: flex;
            }
        }
        .edit-form {
            height: calc(100% - 30px - 30px) ;
            padding: 15px;
        }
    }

    .right {
        display: flex;
        flex: 1;
        flex-direction: column;
        .chart {
            flex: 2;
        }
        .codeView {
            flex: 1
        }
    }
}
</style>
