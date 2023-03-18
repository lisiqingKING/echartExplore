declare type FormCommonentName = 'input' | 'input-number' | 'radio-group' | 'form' | 'select'
declare type CommonObject = { [propName: string]: any }
declare type tabName = 'xAxis' | 'yAxis'
declare type CommonOption = Array<{ label: string, value: string }>

declare type TableColumn = {
    label: string,
    prop: string,
    width?: number,
    slotName?: string,
    note?: string
}
declare type TableColumns = Array<TableColumn>
declare type ChartTableColumns = Record<string, TableColumns>


declare type TableRow = {
    name: string,
    note?: string,
    key: string,
    slotName?: string
}
declare type FormItem = {
    label: string,
    key: string,
    type: FormCommonentName,
    props?: {},
    option?: CommonOption,
    children?: Array<FormItem>,
    defaultValue?: string | number | boolean | Array | CommonObject,
    disabled?: boolean,
    display?: boolean,
    rules?: Array<Function>,
    // for tableColumns
    note?: string,
    slotName?: string
}
declare type FormItems = Array<FormItem>

declare type ChartTableDataMap = Record<string, Array<TableRow>>

declare type Tree = Record<string, CommonObject & { children?: Array<Tree> }>

declare type ChartGuide = {
    option: CommonOption,
    defaultValues: Record<string, CommonObject>
}

declare type ChartBarEditItem = 'xAxis' | 'yAxis' | 'series'

