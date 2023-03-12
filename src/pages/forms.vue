<script setup lang="ts">
import { ElInput, ElInputNumber, ElRadioGroup } from 'element-plus';
import { cloneDeep } from 'lodash';
import { Ref, ref, reactive, computed } from 'vue'
import simpleTable from './simpleTable.vue';
//--- 默认数据

const defaultXAxisTemplate = {
    type: 'category'
}

const defaultYAxisTemplate = {
    type: 'value'
}

const defaultSeriesTemplate = {
    type: 'bar'
}



const itemFormItemMap: { [propName: string]: FormItems } = {
    'xAxis.length': [{ label: 'xAxis系类数目', type: 'input-number', key: 'xAxisLength' }],
    'show': [{ label: 'xAxis是否显示', type: 'radio-group', key: 'show' }],
    'data': [
        { label: 'xAxis数据', type: 'input', key: 'xAxisData'}
    ]
}

const CommonentMap = {
    'input': ElInput,
    'input-number': ElInputNumber,
    'radio-group': ElRadioGroup,
}

const activeName: Ref<tabName> = ref('xAxis')

const xAxisTableColumns: Array<AxisTableColumn> = [
    { label: '属性', prop: 'name', width: 120 },
    { label: '声明', prop: 'note', width: 300 },
    { label: '操作', prop: 'operate', width: 100, slotName: 'operate' },
]

const xAxisTableData: Ref<Array<AxisTableRow>> = ref([
    {
        name: 'xAxis.length',
        note: 'x系列长度',
        data: {
            xAxisLength: 1,
        },
       
    },
    {
        name: 'show',
        note: 'X轴是否显示',
        data: {
            show: true
        },
      
    },
    {
        name: 'data',
        note: 'X轴数据',
        data: {
            xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        
    },
])

const yAxisTableColumns: Array<AxisTableColumn> = [
    { label: '属性', prop: 'name', width: 100 },
    { label: '声明', prop: 'note', width: 300 },
    { label: '操作', prop: 'operate', width: 100, slotName: 'operate' },
]

const yAxisTableData: Ref<Array<AxisTableRow>> = ref([
    {
        name: 'show',
        note: 'X轴是否显示',
        data: true,
    }
])


const forms = computed(() => {
    let _value = {};
    [...xAxisTableData.value, ...yAxisTableData.value].forEach(item => {
        _value = { ..._value, ...eval(item.data) }
    })
    return _value
})
const dialog = reactive<{
    visible: boolean,
    title: string,
    form:  CommonObject,
    formItems: FormItems
}>({
    visible: false,
    title: 'xAxis',
    form: {},
    formItems: []
})

const curRow: Ref<AxisTableRow|null> = ref(null)
const openXDialog = (title: string, row: AxisTableRow) => {
    curRow.value = row
    dialog.visible = true
    dialog.title = title + row.name + '编辑'
   
    dialog.formItems = itemFormItemMap[row.name]
    dialog.form = cloneDeep(row.data)
}
const handleSave = () => {
    dialog.visible = false;
    (curRow.value as AxisTableRow).data = dialog.form
    console.log('@see form: ', dialog.form)
    console.log('@see we want form:', forms.value)
}


</script>

<template>
    <div class="container">
        <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane label="xAxis" name="xAxis">
                <simpleTable v-model:data="xAxisTableData" :table-columns="xAxisTableColumns">
                    <template #operate="{ row }"  >
                        <el-button @click="() => openXDialog('xAxis', row)">编辑</el-button>
                    </template>
                </simpleTable>
            </el-tab-pane>
            <el-tab-pane label="yAxis" name="yAxis">
                <simpleTable v-model:data="yAxisTableData" :table-columns="yAxisTableColumns">
                    <template #operate="{ row }"  >
                        <el-button @click="() => openXDialog('xAxis', row)">编辑</el-button>
                    </template>
                </simpleTable>
            </el-tab-pane>
        </el-tabs>
        <el-dialog 
            v-model="dialog.visible"
            :title="dialog.title"
        >
           <el-form v-model="dialog.form" label-width="120px" label-position="left">
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
           </el-form>
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
.container {
   width: 100%;
}
</style>
