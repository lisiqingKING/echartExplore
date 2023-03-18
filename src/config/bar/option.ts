import { cloneDeep } from "lodash"

type AxisUnit = { 
    type: 'category' | 'value' | 'bar',
    length?: number,
    show?: boolean,
    data?: Array<any>
}
type SeriesUnit = {
    type: 'bar',
    length?: number,
    data?: Array<any>,
    label?: CommonObject
    // color: Array<string> | string
}
type Axis = Array<AxisUnit>
type Series = Array<SeriesUnit>
type TwoDimensionArray = Array<Array<any>>

const to2DArray = (data: Array<any>) => {
    if (Array.isArray(data[0])) {
        return data
    } else {
        return [data]
    }
}

const handleHandlezXAxis = (props: Props, option: CommonObject) => {
    // console.log('@bar:xAxis', props.option)
    const { 
        'length': xAxisLength, 
        'show': xAxisShow, 
        'data': xAxisData
    } = props.option.xAxis
    
    let _value: Axis = []

    let _xAxisData: TwoDimensionArray = to2DArray(xAxisData)

    // 整体设置
    for (let i = 0; i < xAxisLength; i++) {
        _value.push({
            type: 'category',
            show: xAxisShow,
            data: _xAxisData[i]
        })
    }

    // 独立设置
    // console.log('@_value:xAxis', _value)

    option.xAxis = _value
}

const handleHandlezYAxis = (props: Props, option: CommonObject) => {
    // console.log('@bar:yAxis')
    const { 
        'length': yAxisLength,
        'show': yAxisShow, 
    } = props.option.yAxis

    let _value: Axis = []

    // 整体设置
    for (let i = 0; i < yAxisLength; i++) {
        _value.push({
            type: 'value',
            show: yAxisShow,
        })
    }

    // 独立设置

    option.yAxis = _value
    
}

const handleSeries = (props: Props, option: CommonObject) => {
    // console.log('@bar:series')
    const { 
        'length': seriesLength,
        'data': seriesData,
        'label': seriesLabel
        // 'color': seriesColor,
    } = props.option.series

    let _value: Series = []

    let _seriesData: TwoDimensionArray = to2DArray(seriesData)
    // let _seriesColor: TwoDimensionArray = to2DArray(seriesColor)
    // 整体设置
    for (let i = 0; i < seriesLength; i++) {
        _value.push({
           type: 'bar',
           data: _seriesData[i],
           label: seriesLabel
        //    color: _seriesColor[i],
        })
    }

    // 独立设置

    option.series = _value
}

const TodoPropsList: Array<string> = ['xAxis', 'yAxis', 'series']

const itemHandleMap: { [propName: string]: Function } = {
    xAxis: handleHandlezXAxis,
    yAxis: handleHandlezYAxis,
    series: handleSeries
}
const barOptionHanlde = (props: Props, option: CommonObject) => {
    // const needToDoItems = Object.keys(props).filter(item => TodoPropsList.find(toDoItem => toDoItem === item) )
    // needToDoItems.forEach(item => {
    //     itemHandleMap[item](props, option)
    // })
    // console.log('enter--------', cloneDeep(props))
    Object.keys(itemHandleMap).forEach(key => {
        // console.log('exec func', props, option)
        itemHandleMap[key](props, option)
    })
} 

export default {
    initOption: barOptionHanlde,
    expose: {

    }
}