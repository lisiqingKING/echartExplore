
/**
 * 柱状图的配置选项设置默认表单
 */

import { Ref } from 'vue'
import { FormItems } from '../../types/chartForm'

// 引导模式的选项
export const GuideTypeOption: CommonOption = [
    { label: '无限制模式', value: 'any' },
    { label: '垂直柱状图', value: 'vertical' },
    { label: '水平柱状图', value: 'level' },
]



// 引导模式下的数据
// 切换引导时 修改某些数据完成调整 还是修改全部数据
export const GuideTypeDefaultValue: Record<string, CommonObject> = {
    vertical: {
        xAxis: {
            type: 'category',
        },
        yAxis: {
            type: 'value',
        }
    },
    level: {
        xAxis: {
            type: 'value',
        },
        yAxis: {
            type: 'category',
        }
    },
    any: {

    }
}

export const ChartGuide: ChartGuide = {
    option: GuideTypeOption,
    defaultValues: GuideTypeDefaultValue
}

// 柱状图type的选项
export const BarTypeOption: CommonOption = [
    { label: 'category', value: 'category' },
    { label: 'value', value: 'value' },
]

// 柱状图columns
export const TableColumnsMap: Record<ChartBarEditItem, TableColumns> = {
    'xAxis': [
      { label: '属性', prop: 'name' },
      { label: '使用', prop: 'note' }
    ],
    'yAxis': [
        { label: '类型', prop: 'type', note: '',  },
        { label: '数目', prop: 'length', note: '' },
        { label: '显示', prop: 'display', note: '' },
        { label: '数据', prop: 'data' },
    ],
    'series': [
        { label: '数目', prop: 'length', note: '',  },
        { label: '数据', prop: 'data', note: '',  },
        { label: '标签', prop: 'label', note: '',  },
    ]
}

// 柱状图可以配置的属性
export const FormsItemsMap: { [propName: string]: FormItems } = {
    'xAxis.type': [
        {
            label: '类型',
            type: 'select',
            option: BarTypeOption,
            key: 'type',
            defaultValue: 'category',
            note: '设置类型',
            disabled: function (curGuideValue: string, form: CommonObject) {
                console.log('---------------------', curGuideValue, form)
                if (curGuideValue !== 'any') {
                    return true
                } else {
                    return false
                }
    
            }
        }
    ],
    'xAxis.length': [
        { 
            label: 'xAxis系类数目', 
            type: 'input-number', 
            key: 'length',
            defaultValue: 1,
            note: '设置长度'
        }
    ],
    'xAxis.show':   [
        { 
            label: 'xAxis是否显示', 
            type: 'radio-group', 
            key: 'show',
            defaultValue: true,
            note: '是否显示x轴'
        }
    ],
    'xAxis.data':   [
        { 
            label: 'xAxis数据', 
            type: 'input', 
            key: 'data', 
            defaultValue: "['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']",
            note: 'x轴数据',
            rules: [
                { 
                    validator: function (rule: any, value:any, callback: any) {
                        if (!(value as string).includes('[') ) {
                            callback(new Error('请输入数组字符串'))
                        } else {
                            callback()
                        }
                    },
                    
                }
            ]
        }
    ],
    'yAxis.length': [
        { 
            label: 'yAxis系类数目', 
            type: 'input-number', 
            key: 'length',
            defaultValue: 1,
            note: '数目设置'
        }
    ],
    'yAxis.type': [
        {
            label: '类型',
            type: 'select',
            option: BarTypeOption,
            key: 'type',
            defaultValue: 'value',
            note: '类型设置'
        }
    ],
    'yAxis.show':   [
        { 
            label: 'yAxis是否显示', 
            type: 'radio-group', 
            key: 'show', 
            defaultValue: true,
            note: '是否显示y轴'
        }
    ],
    'yAxis.data':   [
        { 
            label: 'yAxis数据', 
            type: 'input', 
            key: 'data', 
            defaultValue: "[]",
            note: 'y轴数据设置'
        }
    ],
    'series.length': [
        { 
            label: 'series系类数目', 
            type: 'input-number', 
            key: 'length',
            defaultValue: 1,
            note: '渲染数据系列长度'
        }
    ],
    'series.data':  [
        { 
            label: 'series数据', 
            type: 'input', 
            key: 'data',
            defaultValue: '[120, 200, 150, 80, 70, 110, 130]',
            note: '渲染数据设置'
        }
    ],
    'series.label': [
        { 
          label: 'series标签', 
          type: 'form', 
          key: 'label', 
          note: '渲染数据标签设置',
          children: [
            { 
                label: '标签是否展示', 
                type: 'radio-group', 
                key: 'show',
                defaultValue: false,
            },
            { 
                label: '标签旋转角度', 
                type: 'input-number', 
                key: 'rotate',
                defaultValue: 0
            },
            { 
                label: '标签颜色', 
                type: 'input', 
                key: 'color',
                defaultValue: 'black'
            },
          ] 
        }
    ]
}