<script setup lang="ts">
import Chart from './Chart.vue'
import ChartForm from './ChartForm.vue'
import EditNav from './EditNav.vue';
import { Ref, ref, reactive, computed, watch } from 'vue'
import { cloneDeep } from 'lodash';
import { setFormByFormItems } from '../utils/forEchart'

// 当前属性的表单项
const editFormItems: Ref<AttrFormItems | null> = ref(null)
// 当前属性表单数据空模板
const templateEditForm: Ref<CommonObject> = ref({})
// 当前选中的表单
const form: Ref<CommonObject> = ref({})
// 当前的属性表单列表
const forms: Ref<Array<CommonObject>> = ref([])

// 表单列表信息
const formsInfo = reactive({
    total: 1,
    curFormsIndex: 0
})

// 更新当前属性的表单项
const updateFormItems = (item: AttrFormItems) => {
    editFormItems.value = cloneDeep(item)
    setFormByFormItems(editFormItems.value, templateEditForm.value)
    console.log('@see templateForm', templateEditForm.value, editFormItems.value)
}

// 属性表单的下拉选项
const editFormsOption = computed(() => {
    const _option: CommonOptionType = []
    for (let i = 0; i < formsInfo.total; i++) {
        _option.push({ label: `第${i+1}项`, value: i })
    }
    return _option
})

// watch([templateEditForm, () => formsInfo.total], () => {
//     const _forms = []
//     for (let i = 0; i < formsInfo.total ; i++) {
//         _forms.push(cloneDeep(templateEditForm.value))
//     }
//     forms.value = _forms
// }, { immediate: true })

// watch([templateEditForm, () => formsInfo.total], () => {
//     formsInfo.curFormsIndex = 0
// })

// watch(() => formsInfo.curFormsIndex, (val) => {
//     form.value = forms.value[val]
// }, { immediate: true })

</script>

<template>
    <div class="container">
        <div class="left">
            <EditNav class="edit-nav" @attr-form-items="updateFormItems" />
            <div class="edit-form-edit">
                <div>
                    <span>属性总数目</span>
                    <el-input-number v-model="formsInfo.total" />
                </div>
                <div>
                    <span>属性系列</span>
                    <el-select v-model="formsInfo.curFormsIndex">
                        <el-option 
                            v-for="item in editFormsOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </div>
            </div>
            <ChartForm 
                class="edit-form" 
                v-model="form"
                :form-items="editFormItems as AttrFormItems"
            />
        </div>
        <div class="right">
            <Chart   />
        </div>
    </div>
</template>

<style lang="scss" moudle>
.container {
    display: flex;
    box-sizing: border-box;
    height: 100%;
    .left, .right {
        height: 100%;
    }

    .left {
        flex: 1;
        .edit-nav {
            height: 30px;
            line-height: 30px;
            display: flex;
            align-items: center;
        }
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
        flex: 1
    }
}
</style>
