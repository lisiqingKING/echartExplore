import { ref, Ref, computed } from 'vue'
import { FormsItemsMap, GuideTypeDefaultValue, GuideTypeOption } from './static'

import { getFormsItemsDefaultData, produceTableDataMap, translateArrayOrObjectToSelf } from '../../utils/forEchart'
import { useGuidOption } from '../../hooks/chart'
import { cloneDeep } from 'lodash'

export const useInit = (formItemsMap: FormItemsMap, guideOption: ChartGuide) => {

    const { option, curSelectValue, defaultValue } = useGuidOption(guideOption)

    // 用于表单编辑
    const forms: Ref<CommonObject> = ref(getFormsItemsDefaultData(formItemsMap));

    // 用于传给图表的props
    const formsForChart = computed(() => {
        return translateArrayOrObjectToSelf(forms.value)
    })

    // 用于表格
    const tableDataMap: ChartTableDataMap = produceTableDataMap(formItemsMap)

    // 动态表单属性 用于表单项是否可以修改 
    const formsItemsMap: Ref<Record<string, FormItems>> = ref(cloneDeep(FormsItemsMap))

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

