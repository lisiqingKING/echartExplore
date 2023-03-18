import type { FormItemRule } from 'element-plus'

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
    rules?: FormItemRule,
    // for tableColumns
    note?: string,
    slotName?: string
}

declare type FormItems = Array<FormItem>
