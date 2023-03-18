<script setup lang="ts">
import { Ref, ref, toRefs } from 'vue'
import simpleTable from './simpleTable.vue';
import attrTree from '../pages/attrTree.vue'


const emits = defineEmits(['updateForms'])
const props = defineProps<{
    forms: CommonObject,
    tableDataMap: ChartTableDataMap,
    // tableColumnsMap: ChartTableColumns,
    formsItemsMap: FormsItemsMap
}>()
const { forms, tableDataMap, formsItemsMap } = toRefs(props)
const activeName: Ref<string> = ref(Object.keys(tableDataMap.value)[0])


</script>

<template>
    <div class="forms-container">
        <el-tabs v-model="activeName" class="demo-tabs">
             <el-tab-pane  
                v-for="(value, key) in tableDataMap"
                :key="key"
                :label="key" 
                :name="key"
             >
                <simpleTable :data="value">
                    <template #operate="scope" >
                        <attrTree 
                            v-model="forms[key]" 
                            :formItems="formsItemsMap[scope.row.name]" 
                        />
                    </template>
                </simpleTable>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style lang="scss" moudle>
.forms-container {
   width: 100%;
   .demo-tabs {
    width: 100%;
   }
}
</style>
