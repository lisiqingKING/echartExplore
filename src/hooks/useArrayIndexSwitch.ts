// import { cloneDeep } from "lodash"
// import { ref, Ref, watch } from "vue"
// export const useOptionSwitch = (optionLength: number, templateForm: AttrForm) => {
//     const storeForms: Ref<Array<AttrForm> | []> = ref([])
//     const curForms: Ref<AttrForm|Array<any>> = ref([])
//     const curFormIndex: Ref<number> = ref(-1)
//     let options = []

//     let _temp: Array<AttrForm> = []
//     let _options: Array<{ label: string, value: number }> = []
//     for (let i = 0; i < optionLength; i++) {
//        _temp.push(cloneDeep(templateForm))
//        _options.push({ label: `第${i+1}个`, value: i })
//     }
//     storeForms.value = _temp
//     options = _options

//     watch(curFormIndex, (val) => {
//         curForms.value = storeForms.value[val]
//     })

    

//     return {
//         options,
//         curFormIndex,
//         curForms
//     }
// }

/**
 * 
 * 如何通过表单编辑 多个表单 以及多个表单下的具有数组属性的属性
 * 
 * 如何处理传入prop 进行原生设置 独立设置 全局设置
 * 
 * 表单是设置如何与内部属性设置联动
 * 
 * 
 * 1. 复合表单 解决问题1
 * 2. 
 * 
 * 
 * 
 * 表单项目 => 表单数据 => 传入组件的对象数据
 * for formItems
 * [ { 
 *      type: 'form', 
 *      lable:'文本样式设置', 
 *      key: 'textStyle',
 *      children:  [
 *          { type: 'input', label: '字体颜色 , key: 'color' }
 *          { type: 'form', label: '字体边框', key: 'border', children: [ { label: '边框颜色 , key: 'color', type: 'input' } ] }
 *      ]
 * } ]
 * 
 * 
 * => for form
 *  {
 *    textStyle: {
 *       color: '',
 *       border: { 
 *          color: ''
 *       }
 *    }
 * }
 * 
 * => for Chart
 *   
 *   form 
 *   + type   属性类型(基于图表option第一层 + 自定义属性)
 *   + option 属性数据哪一项 / 默认批量
 *   + number 属性数据长度
 * 
 *   => 
 *      curoPtion: 
 *      number => 
 * 
 *      如何设置独立属性 form-key字符串化
 *      如何设置全局配置属性
 * 
 *     :<attr>
 *     :<indepent-attr>
 */