<script setup lang="ts">
import { computed, ref, Ref, watch } from 'vue';
import  BarAttrsOption from '../config/bar/attrs'
import '../types/chart.d.ts'

const options: Array<ChartOption> = [
    BarAttrsOption
]
const emits = defineEmits(['attrFormItems'])

const chartType: Ref<string> = ref('bar')
const attrsTabs = computed(() => options.find(item => item.value === chartType.value)?.attrs)
const curTabName: Ref<string|undefined> = ref(attrsTabs.value?.[0]?.name)
const attrFormItems = computed(() => attrsTabs.value?.find((item) => item.name === curTabName.value )?.formItems)


watch(attrFormItems, (val) => {
    console.log('val', val)
    emits('attrFormItems', val)
}, { immediate: true })
const handleClickTab = (item: AttrOption) => {
    curTabName.value = item.name
}
</script>

<template>
  <div class="container">
    <el-select v-model="chartType" size="large">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
    </el-select>
    <span 
        v-for="item in attrsTabs" 
        :key="item.name"
        @click="() => handleClickTab(item)"
        :class="{
            'cur-tab' : item.name === curTabName,
            'common-tab': true
        }"
    >
        {{ item.name  }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    >* {
        flex: 1;
        max-width: 200px;
    }
    .common-tab {
        color: black;
        border: 1px solid grey;
        margin-left: 20px;
    }

    .cur-tab {
        color: lightblue;
        border: 1px solid lightblue;
    }
}

</style>
