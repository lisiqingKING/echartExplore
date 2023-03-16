import { ElInput, ElInputNumber, ElRadioGroup } from 'element-plus';
import { Ref, ref, reactive, computed, watch } from 'vue'
import {produceAttrJoinObject } from '../utils/forEchart'

export const itemFormItemMap: { [propName: string]: FormItems } = {
    'xAxis.length': [{ label: 'xAxis系类数目', type: 'input-number', key: 'length' }],
    'xAxis.show':   [{ label: 'xAxis是否显示', type: 'radio-group', key: 'show' }],
    'xAxis.data':   [{ label: 'xAxis数据', type: 'input', key: 'data'}],
    'yAxis.length': [{ label: 'xAxis系类数目', type: 'input-number', key: 'length' }],
    'yAxis.show':   [{label: 'yAxis是否显示', type: 'radio-group', key: 'show' }],
    'series.length': [{ label: 'series系类数目', type: 'input-number', key: 'length' }],
    'series.data':  [{ label: 'series数据', type: 'input', key: 'data'}],
    'series.label': [
        { 
          label: 'series标签', 
          type: 'form', 
          key: 'label', 
          children: [
            { label: '标签是否展示', type: 'radio-group', key: 'show' },
            { label: '标签旋转角度', type: 'input-number', key: 'rotate' },
            { label: '标签颜色', type: 'input', key: 'color' },
          ] 
        }
    ]
    // 'series.color': [{ label: 'series颜色', type: 'input', key: 'series.color' }]
}

export const CommonentMap = {
    'input': ElInput,
    'input-number': ElInputNumber,
    'radio-group': ElRadioGroup,
}

export const TableColumns: Array<AxisTableColumn> = [
    { label: '属性', prop: 'name',  },
    { label: '声明', prop: 'note',  },
    { label: '操作', prop: 'operate',  slotName: 'operate' },
]

export const defaultXAxisTemplate = {
    type: 'category'
}

export const defaultYAxisTemplate = {
    type: 'value'
}

export const defaultSeriesTemplate = {
    type: 'bar'
}

export const howToProduceChartArgs = (forms: CommonObject) => {
    /**
     *  {
     *   series.label: any,
     *   
     *  }
     */
//    const _forms = produceAttrJoinObject('', forms)
    return {
        type: 'bar',
        ...forms
    }
}

export const initData = () => {
    const xAxisTableData: Ref<Array<TableRow>> = ref([
        {
            name: 'xAxis.length',
            note: 'x系列长度',
            data: {
                'length': 1,
            },
            reflectFormItemKey: 'xAxis.length'
        },
        {
            name: 'show',
            note: 'X轴是否显示',
            data: {
                'show': true
            },
            reflectFormItemKey:'xAxis.show'
        },
        {
            name: 'data',
            note: 'X轴数据',
            data: {
                'data': "['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
            },
            reflectFormItemKey: 'xAxis.data'
        },
    ])
    
    
    const yAxisTableData: Ref<Array<TableRow>> = ref([
        {
            name: 'yAxis.length',
            note: 'y系列长度',
            data: {
                'length': 1,
            },
            reflectFormItemKey: 'yAxis.length'
        },
        {
            name: 'show',
            note: 'X轴是否显示',
            data: {
                'show': true
            },
            reflectFormItemKey: 'yAxis.show'
        }
    ])
    
    const seriesTableData: Ref<Array<TableRow>> = ref([
        {
            name: 'series.length',
            note: 'series系列长度',
            data: {
                'length': 1,
            },
            reflectFormItemKey: 'series.length'
        },
        {
            name: 'data',
            note: '渲染数据',
            data: {
                'data': '[120, 200, 150, 80, 70, 110, 130]'
            },
            reflectFormItemKey: 'series.data'
        },
        // {
        //     name: 'color',
        //     note: 'series颜色',
        //     data: {
        //         'series.color': 'blue'
        //     },
        //     reflectFormItemKey: 'series.color'
        // },
        {
            name: 'label',
            note: 'series标签颜色',
            data: {
                label: {
                    // 'series.label.show': false,
                    // 'series.label.rotate': 0,
                    // 'series.label.color': 'black'
                    show: false,
                    rotate: 0,
                    color: 'black'
                }
            },
            reflectFormItemKey: 'series.label'
        }
    ])
    
    
    const forms = computed(() => {
        let _value: CommonObject = {};
        // const topKeysIndex: Array<string> = ['xAxis', 'yAxis', 'series'];
        // [...xAxisTableData.value, ...yAxisTableData.value, ...seriesTableData.value].forEach((item, index) => {
        //     _value = { ..._value, ...produceAttrJoinObject(topKeysIndex[index], item.data) }
        // })

        // xAxisTableData.value.forEach(item => {
        //     _value = { ..._value, ...produceAttrJoinObject('xAxis', item.data) }
        // })
        // yAxisTableData.value.forEach(item => {
        //     _value = { ..._value, ...produceAttrJoinObject('yAxis', item.data) }
        // })
        // seriesTableData.value.forEach(item => {
        //     _value = { ..._value, ...produceAttrJoinObject('series', item.data) }
        // })
        /**
         * {
         *   xAxis: {},
         *   yAxis: {},
         *   series: {}
         * }
         */

        let _x = {}
         xAxisTableData.value.forEach(item => {
            _x = { ..._x, ...item.data }
        })
        let _y = {}
        yAxisTableData.value.forEach(item => {
            _y = { ..._y, ...item.data }
        })
        let _s = {}
        seriesTableData.value.forEach(item => {
            _s = { ..._s, ...item.data }
        })

        _value = { xAxis: _x, yAxis: _y, series: _s }
        return _value
    })

    
    return {
        xAxisTableData,
        yAxisTableData,
        seriesTableData,
        forms
    }
}