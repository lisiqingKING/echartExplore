declare type FormCommonentName = 'input' | 'input-number' | 'radio-group' | 'form'
declare type CommonObject = { [propName: string]: any }
declare type tabName = 'xAxis' | 'yAxis'
declare type AxisTableColumn = {
    label: string,
    prop: string,
    width?: number,
    slotName?: string
}
declare type TableRow = {
    name: string,
    note: string,
    data: any,
    reflectFormItemKey: string
}
declare type FormItem = {
    label: string,
    key: string,
    type: FormCommonentName,
    props?: {},
    option?: Array<{ label: string, value: any }>,
    children?: Array<FormItem>
}
declare type FormItems = Array<FormItem>