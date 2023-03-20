<script setup lang="ts">
import Chart from '@/components/Chart.vue';
import TableS from './TableS.vue';
import codeView from './codeView.vue';
import { ChartGuide, FormsItemsMap, TableColumnsMap } from '@/config/bar/static'
import { useChartDataInit } from '@/hooks/chart'
import { ElOption, ElSelect } from 'element-plus';
// import EditPanel from './EditPanel.vue';
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
                    :value="item.value"
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
