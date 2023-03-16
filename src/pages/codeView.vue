<script setup lang="ts">
import { defineProps, computed, toRefs } from 'vue'
const props = defineProps<{
    formData: CommonObject
}>()

const { formData } = toRefs(props)

const returnValueStr = (v: any) => {
    if (Array.isArray(v)) {
        return `[${v}]`
    } else if (typeof v === 'object') {
        return `{${JSON.stringify(v)}}`
    } else if( typeof v === 'string'){
        return `'${v}'`
    } else {
        return v
    }
}
const code = computed(() => {
    let varsDefine: string = ''
    let codeComponent = ''
    const codeStrStart: string = '<SimpleChart'
    const codeStrEnd: string = '/>'
    Object.keys(formData.value).forEach(key => {
        let _tempKey = key.replaceAll(/\./g, '_')
        codeComponent += `<span style="margin-left: 40px">:${key} = "${_tempKey}<span>"<br>`
        varsDefine += `const ${_tempKey} = ref(${returnValueStr(formData.value[key])})<br>`
    })
   
    return {
        varsDefine,
        codeStrStart,
        codeComponent,
        codeStrEnd
    }

})
</script>

<template>
    <div class="code-container">
      <h3>组件代码查看</h3>
      <div class="code">
        <div v-html="code.varsDefine"></div>
        <div style="margin-top: 20px">{{  code.codeStrStart  }}</div>
        <div v-html="code.codeComponent"></div>
        <div>{{ code.codeStrEnd  }}</div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
.code-container {
  color: #fff;
  background: black; 

  .code {
    text-align: left;
    padding: 20px;
  }
}
</style>
