import { ref, Ref, computed, watch } from 'vue'
import { getFormsItemsDefaultData, produceTableDataMap, translateArrayOrObjectToSelf } from '../utils/forEchart'
import { cloneDeep } from 'lodash'

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

export const useChartDataInit = (formItemsMap: FormItemsMap, guideOption: ChartGuide) => {

    // 用于类型引导选项
    const { option, curSelectValue, defaultValue } = useGuidOption(guideOption)

    // 用于表单编辑
    const forms: Ref<CommonObject> = ref(getFormsItemsDefaultData(formItemsMap));
    // 用于传给图表的props
    const formsForChart = computed(() => {
        return translateArrayOrObjectToSelf(forms.value)
    })
    watch(curSelectValue, () => {
        forms.value = defaultValue
    })

    // 用于表格
    const tableDataMap: ChartTableDataMap = produceTableDataMap(formItemsMap)

    // 动态表单属性 用于表单项是否可以修改 
    const formsItemsMap: Ref<Record<string, FormItems>> = ref(cloneDeep(formItemsMap))

    return {
        option,
        curSelectValue,
        defaultValue,
        forms,
        tableDataMap,
        formsItemsMap,
        propsForChart: formsForChart
    }
}