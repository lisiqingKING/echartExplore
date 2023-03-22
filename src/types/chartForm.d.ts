import type { FormItemRule } from 'element-plus'
import { ComputedRef } from 'vue'

declare type DisabledFunction = (curGudieValue: string, forms: CommonObject) =>boolean

declare type FormItem = {
    label: string,
    key: string,
    type: FormCommonentName,
    props?: {},
    option?: CommonOption,
    children?: Array<FormItem>,
    defaultValue?: string | number | boolean | Array | CommonObject,
    display?: boolean,
    rules?: FormItemRule,
    disabled?: boolean | DisabledFunction | ComputedRef,
    // for tableColumns
    note?: string,
    slotName?: string
}

declare type FormItems = Array<FormItem>
