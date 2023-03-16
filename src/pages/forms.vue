<script setup lang="ts">
import { cloneDeep } from 'lodash';
import { Ref, ref, reactive, computed, watch, toRefs } from 'vue'
import simpleTable from './simpleTable.vue';
import { itemFormItemMap, CommonentMap, TableColumns } from './about'
import attrTree from '../pages/attrTree.vue'
import { produceReflectDisplayObject } from '../utils/forEchart'

const emits = defineEmits(['updateForms'])
const activeName: Ref<tabName> = ref('xAxis')

const props = defineProps<{
    forms: CommonObject,
    tableData: CommonObject
}>()
const { forms, tableData } = toRefs(props)

const dialog = reactive<{
    visible: boolean,
    title: string,
    form:  CommonObject,
    formItems: FormItems,
    displayObject: CommonObject,
}>({
    visible: false,
    title: 'xAxis',
    form: {},
    formItems: [],
    displayObject: {}
})

watch(forms, (val) => {
    emits('updateForms', val)
}, { immediate: true, deep: true })

const curRow: Ref<TableRow|null> = ref(null)
const openXDialog = (title: string, row: TableRow) => {
    curRow.value = row
    dialog.visible = true
    dialog.title = title + row.name + '编辑'
   
    dialog.formItems = itemFormItemMap[row.reflectFormItemKey]
    dialog.form = cloneDeep(row.data)
    dialog.displayObject = produceReflectDisplayObject(dialog.form)
    console.log('@dialog.displayObject', dialog.displayObject, dialog.form, dialog.formItems)
}
const handleSave = () => {
    dialog.visible = false;
    (curRow.value as TableRow).data = dialog.form
    console.log('@see form: ', dialog.form)
    // console.log('@see we want form:', forms.value)
}


</script>

<template>
    <div class="forms-container">
        <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane label="xAxis" name="xAxis">
                <simpleTable v-model:data="tableData.xAxisTableData" :table-columns="TableColumns">
                    <template #operate="{ row }"  >
                        <el-button @click="() => openXDialog('xAxis', row)">编辑</el-button>
                    </template>
                </simpleTable>
            </el-tab-pane>
            <el-tab-pane label="yAxis" name="yAxis">
                <simpleTable v-model:data="tableData.yAxisTableData" :table-columns="TableColumns">
                    <template #operate="{ row }"  >
                        <el-button @click="() => openXDialog('yAxis', row)">编辑</el-button>
                    </template>
                </simpleTable>
            </el-tab-pane>
            <el-tab-pane label="series" name="series">
                <simpleTable v-model:data="tableData.seriesTableData" :table-columns="TableColumns">
                    <template #operate="{ row }"  >
                        <el-button @click="() => openXDialog('series', row)">编辑</el-button>
                    </template>
                </simpleTable>
            </el-tab-pane>
        </el-tabs>
        <el-dialog 
            v-model="dialog.visible"
            :title="dialog.title"
        >
           <!-- <el-form v-model="dialog.form" label-width="120px" label-position="left">
            <el-form-item v-for="item in dialog.formItems" :key="item.key" :label="item.label">
                <component 
                    :is="CommonentMap[item.type]" 
                    v-model="dialog.form[item.key]"
                    v-bind="item.props" 
                >
                    <template v-if="item.type === 'radio-group'">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                    </template>
                </component>
            </el-form-item>
           </el-form> -->
           <!--how to use tips-->
          
            <attrTree 
                v-model="dialog.form" 
                v-model:displayObject="dialog.displayObject"
                :formItems="dialog.formItems" 
            />
          
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="() => dialog.visible = false">取消</el-button>
                    <el-button type="primary" @click="handleSave">保存</el-button>
                </span>
            </template>
        </el-dialog>
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
