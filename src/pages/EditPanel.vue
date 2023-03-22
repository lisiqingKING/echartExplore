<template>
    <div>
        <div>
            <span>输入编辑框</span>
            <el-button>格式化</el-button>
        </div>
        <el-input 
            v-model="innerModelValue"
            type="textarea" 
            :autosize="{ minRows: 20, maxRows: 99 }"
         />

        <div v-html="text"></div>
    </div>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash';
import { toRefs, computed, Ref, ref, watch } from 'vue';
import { isStringArrayOrStringObject } from '@/utils/rule'

const emits = defineEmits(['update'])
const props = defineProps<{
    modelValue: string
}>()
const { modelValue } = toRefs(props)
const innerModelValue: Ref<string> = ref('')


watch(modelValue, (val) => {
    innerModelValue.value = cloneDeep(val)
}, { immediate: true })

watch(innerModelValue, (val) => {
    emits('update', val)
})

const textFormat = (target: string) => {

    const produceElementStr = (str: string, left: number) => {
        return `<div style="margin-left:${left}px;text-align:left">${str},</div>`
    }

    const fn = (str: string, offsetLeft: number = 0, span: number = 20) => {

       if(!isStringArrayOrStringObject(str)) {
        return str
       }

       let _temp: string = ''

       const startStr = str[0]
       const endStr = str[str.length - 1]
       const str_collect: Array<string> = str.substring(1, str.length - 1).split(',')
       _temp += produceElementStr(startStr, span * offsetLeft)
       offsetLeft += 1
       str_collect.forEach(item => {
           _temp += isStringArrayOrStringObject(item) ? fn(item, offsetLeft, span) : produceElementStr(item, span * offsetLeft)
       })
       offsetLeft -=1
       _temp += produceElementStr(endStr, span * offsetLeft - 1)

       return _temp
    }

    return fn(target)
}

const text = computed(() => {
    return textFormat(innerModelValue.value)
})
</script>