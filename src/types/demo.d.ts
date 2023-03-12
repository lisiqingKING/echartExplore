declare type FormCommonentName = 'input' | 'input-number' | 'radio-group'
declare type CommonObject = { [propName: string]: any }
declare type tabName = 'xAxis' | 'yAxis'
declare type AxisTableColumn = {
    label: string,
    prop: string,
    width?: number,
    slotName?: string
}
declare type AxisTableRow = {
    name: string,
    note: string,
    data: any,
}
declare type FormItems = Array<{
    label: string,
    key: string,
    type: FormCommonentName,
    props?: {},
    option?: Array<{ label: string, value: any }>
}>