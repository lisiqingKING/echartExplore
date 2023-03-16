
import { merge } from 'lodash'
type CommonObject = {
    [propName: string]: any
    
}


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
            console.log('@_value[key]', _value[key])
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
            console.log(_value)
            _value[newKey]?.constructor === Object && produceAttrJoinObject(newKey, _value[newKey])
        })
    }
    fn(parentAttr, obj)

    return _value
}