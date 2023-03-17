

declare type ChartType = 'bar' | 'line' | 'pie'

declare type EditFormItemType = 'form' | 'input' | 'radio' | 'input-number' | 'select' | 'checkbox'

declare type CommonOptionType = Array<{ label: string, value: any }>

declare type EditFormitem = {
    type: EditFormItemType & 'form',
    rules: Array<any>,
    label: String,
    key: String,
    children: Array<EditFormItemType | []>
}

// option属性编辑表单
declare type AttrFormItems = Array<{
    label: string,
    type: EditFormItemType,
    key: string,
    children?: AttrFormItems,
    props?: {},
    others?: { [propName: string]: any }
    options?: CommonOptionType
}>

// option下的第一项属性
declare interface AttrOption {
    name: string,
    key: string,
    formItems: AttrFormItems
}

// 图表类型
declare interface ChartOption {
    label: string,
    value: ChartType, 
    attrs:  Array<AttrOption>
}

interface Props  {
    type: ChartType,
    isResize: Boolean,
    [propName: string]: any,
} 

declare type CommonObject = {
    [propName: string]: any,
  }

declare type ChartTypeOptionConfig = {
    initOption: (props: Props, option: CommonObject) => {},
    expose: CommonObject
}

declare type FormItemsMap = Record<string, FormItems>