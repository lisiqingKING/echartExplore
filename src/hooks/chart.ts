import { ref, Ref, computed, watch, ComputedGetter } from 'vue'
import { getFormsItemsDefaultData, produceTableDataMap, translateArrayOrObjectToSelf } from '../utils/forEchart'
import { cloneDeep, isNil, merge } from 'lodash'
import { DisabledFunction, FormItem, FormItems } from '@/types/chartForm'


// export const useFunctionToComputedValue = (formItemsMap: FormsItemsMap, curGudieValue: Ref<string>, forms: Ref<CommonObject>) => {
//     type DisbaledType = null | undefined | Function | boolean
//     type isSetComputedFunction = (v: DisbaledType) => boolean
//     const isSetComputed: isSetComputedFunction = (disabled: DisbaledType) => typeof disabled === 'function'
//     const fn = (target: Tree | Tree[]) => {
//         // 递归遍历整棵树 给 disbaled的函数变成 computed
//         if (Array.isArray(target)) {
//             target.forEach(item => {
//                 isSetComputed(item.disabled as DisbaledType) &&
//                 (item.disabled = computed(item.disabled))
//             })
//         } else if (target.constructor === Object) {
//             for (let key in formItemsMap) {
//                 formItemsMap[key].forEach((formItem: FormItem) => {
//                     if(isSetComputed(formItem.disabled as DisbaledType)) {
//                         console.log('@find', this)
                        
//                         formItem.disabled = computed(formItem.disabled)
//                     }
//                     target[key].children && fn(target[key].children as Tree[])
//                 })
//             }
//         }
//     }
//     fn(formItemsMap)
//     console.log(`output->formItemsMap`,formItemsMap)
//     return formItemsMap
// }

const setDisabled = (target: { [propName: string]: FormItems }, curValue: string, forms: CommonObject) => {
    const isFunction = (target: any) => typeof target === 'function'

    const handle = (targetlist: FormItems) => {
        // console.log('@test------------', targetlist)
        targetlist.forEach(item => {
            isFunction(item?.disabled) && (item.disabled = (item.disabled as DisabledFunction)(curValue, forms))
            item.type === 'form' && (handle(item.children as FormItems))
        })
    }
   
    for (let key in target) {
        // console.log('@test-key', key)
       handle(target[key])
    }
   
}

export const useGuidOption = (args: ChartGuide) => {
    const { option, defaultValues } = args

    const curSelectValue: Ref<string> = ref(option[0].value)
   
    const defaultValue = computed(() => defaultValues[curSelectValue.value])
    
    return {
        curSelectValue,
        option,
        defaultValue
    }
}

export const useChartDataInit = (formItemsMap: FormsItemsMap, guideOption: ChartGuide, tableColumnsMap: ChartTableColumns) => {

    // 用于类型引导选项
    const { option, curSelectValue, defaultValue } = useGuidOption(guideOption)

    // 用于表单编辑
    const forms: Ref<CommonObject> = ref(getFormsItemsDefaultData(formItemsMap));



    // 用于传给图表的props
    const formsForChart: Ref<CommonObject|undefined> = ref()
    watch(forms, (val) => {
        console.log('@watch forms', val)
         formsForChart.value = translateArrayOrObjectToSelf(cloneDeep(forms.value))
    }, { immediate: true, deep: true })



    watch(curSelectValue, () => {
        forms.value = cloneDeep(merge(forms.value, defaultValue.value))
    })

    const formsItemsMap: Ref<FormsItemsMap|null> = ref(null)
    watch(curSelectValue, (val) => {
        const _formItemsMap = cloneDeep(formItemsMap)
        setDisabled(_formItemsMap, val, forms.value)
        formsItemsMap.value = _formItemsMap
    }, { immediate: true })

    // 用于表格
    const tableDataMap: ChartTableDataMap = produceTableDataMap(formItemsMap)

    // 动态表单属性 用于表单项是否可以修改 
    // const formsItemsMap: FormsItemsMap = useFunctionToComputedValue(cloneDeep(formItemsMap))

    return {
        option,
        curSelectValue,
        defaultValue,
        forms,
        tableDataMap,
        formsItemsMap,
        propsForChart: formsForChart,
        tableColumnsMap
    }
}