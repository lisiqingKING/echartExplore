
import { cloneDeep, isNil, merge } from 'lodash'
import { FormItem, FormItems } from '../types/chartForm'


export const setAttr = (target: CommonObject, attr: string, value: any, isMerge: Boolean = false) => {
    // 设置目标值的某个属性: 可以是合并 也可以是覆盖
    // 属性可能是深层的
    /**
     *  a.b.c.d = 100     => obj[a][b][c][d] = 100
     *  a.h[3].x = 100    => obj[a][h][3][x] = 100
     *  a.h[3].x[4] = 100 => obj[a][h][3][x][4] = 100
     */
    const handleArrayAttr = (strs: string): string => {
        return strs.replaceAll(/\[/g, '.').replaceAll(/\]/g, '')
    }

    if (!attr.includes('.')) {
        target[attr] = value
    } else {
        const attrArray: Array<string> = handleArrayAttr(attr).split('.')
        let count:number = 0
        let tempValue: any = target
        while(count < attrArray.length - 1) {
            tempValue = tempValue[attrArray[count]]
            count += 1
        }
        let targetAttr = attrArray[attrArray.length - 1]
        if (isMerge) {
            tempValue[targetAttr] = merge(tempValue[targetAttr], value)
        } else {
            tempValue[targetAttr] = value
        }
    }
}

export const setFormByFormItems = (formItems: AttrFormItems, form: CommonObject = {}) => {
    /**
     *  [ { label: '样式', type: ' } ]
     */
    formItems.forEach(item => {
        if (item.children) {
            form[item.key] = { }
            setFormByFormItems(item.children, form[item.key])
        } else {
            form[item.key] = undefined
        }
    })
}


export const produceReflectDisplayObject = (data: CommonObject) => {
    const _value: CommonObject = {}

    const fn = (d: CommonObject, level: number = 1) => {
        Object.keys(d).forEach(key => {
            _value[key] = {
                level,
                display: level === 1
            }
            // console.log('@_value[key]', _value[key])
            if (d[key]?.constructor === Object) {
                fn(d[key], level + 1)
            }
        })
    }
    fn(data)

    return _value
}

export const produceAttrJoinObject = (parentAttr: string, obj: CommonObject) => {
    const _value: CommonObject = {}
    
    function fn (parentAttr: string, obj: CommonObject){
        Object.keys(obj).forEach(key => {
            // console.log('@', key, obj[key])
            let newKey = parentAttr ? parentAttr + '.' + key : key
            // console.log('@newkey', newKey)
            _value[newKey] = obj[key]
            // console.log(_value)
            _value[newKey]?.constructor === Object && produceAttrJoinObject(newKey, _value[newKey])
        })
    }
    fn(parentAttr, obj)

    return _value
}

export const getFormsItemsDefaultData = (data: FormsItemsMap) => {

    /**
     * 
     * @param data 一份关于某个类型下顶级属性的深层层次配置表单
     * @returns result 返回一份对应的顶级属性表单数据的集合
     * 
     * 
     */

    // const abstractFormItemDefaultValue = (item: FormItem) => {
    //     if (item.type !== 'form') {
    //         return cloneDeep(item.defaultValue)
    //     } else {
    //         return setDefaultItemsData(item.children as FormItems)
    //     }
    // }

    const setDefaultItemsData = (target: CommonObject, formItems: Array<FormItem>) => {
        // console.log('debug-@', target, formItems)
        formItems.forEach(formItem => {
            // target[formItem.key] = abstractFormItemDefaultValue(formItem)
            if (formItem.type !== 'form') {
                target[formItem.key] = cloneDeep(formItem.defaultValue)
            } else {
                !target[formItem.key] && (target[formItem.key] = {})
                setDefaultItemsData(target[formItem.key], formItem.children as FormItems)
            }
        })
        // return target
    }

    let result: CommonObject = {}
    Object.keys(data).forEach(key => {
        const [topkey] = key.split('.')
        // console.log('@topKey', topkey)
        isNil(result[topkey]) && (result[topkey] = {})
        // result[topkey][secondkey] = getItemsDefaultData(data[key])
        setDefaultItemsData(result[topkey], data[key])
    })

    return result
}

export const produceTableDataMap = (data: FormsItemsMap) => {
    /**
     *  生成 tableData:
     * 
     */
    let tableData: ChartTableDataMap = {}
     Object.keys(data).forEach(key => {
        const [topkey] = key.split('.')
        !tableData[topkey] && (tableData[topkey] = [])
        const { note, key: itemKey } = data[key][0]
        tableData[topkey].push({
            name: key,
            note,
            key: itemKey,
            // slotName: 'operate' // 默认插槽
        })
     })

     return tableData
}

// 将字符串形式的数组或者对象转化为真正的数组或者对象
export const translateArrayOrObjectToSelf = (treeData: CommonObject) => {
    const isExecEval = (v: any) => {
        
        if (typeof v === 'string') {
            return v.includes('[') || v.includes('{')
        } 
        return false
    }

    Object.keys(treeData).forEach(item => {
        if (treeData[item].constructor === Object) {
            translateArrayOrObjectToSelf(treeData[item])
        } else {
           treeData[item] = isExecEval(treeData[item]) ? eval(treeData[item]) : treeData[item]
        }
        // console.log('@item', treeData[item])
    })

    return treeData

}

// 将数组或者对象转化为字符串形式
export const translateObjectOrArrayToStr = (data: CommonObject) => {
    
}

// 将对象转为数组结构
export const abstractAndtranslateToArray = (flag: string, data: Record<string, FormItems>): FormItems => {
    let _result: FormItems = []

    Object.keys(data).forEach(key => {
        const [topKey] = key.split('.')
        topKey === flag && (
            _result = [..._result, ...data[key]]
        )
    })

    return _result
}

// 验证单项值是否通过
export const validateValue = () => {

}

// 验证编辑完的整个表单
export const validateForm = () => {

}
