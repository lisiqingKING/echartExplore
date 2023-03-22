<script setup>
import { toRefs, ref, watch } from 'vue'
import { cloneDeep, merge } from 'lodash'
import { useEditContent } from '@/store/index.ts'

const store = useEditContent()
const setCurEditContent = (target, key) => {
  console.log(`output-target, key`,target, key)
  store.setContent({ target, key})
}

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  formItems: {
    type: Array,
    default: () => ([]),
  },
  displayObject: {
    type: Object,
    default: ()=> ({})
  },
})
const { modelValue, formItems } = toRefs(props)
const emits = defineEmits(['update:displayObject', 'update:modelValue'])

console.log('formiTEMS', formItems)

const formRef = ref()
const form = ref(cloneDeep(modelValue.value))
const getUseFormData = () => {
  const _result = {}
  formItems.value.forEach(({ key }) => {
    console.log('@key')
    _result[key] = form.value[key]
  })
  return _result
}
watch(modelValue, (val) => {
  console.log('@modelValue', val)
  form.value = cloneDeep(val)
}, { deep: false })
watch(form, (val) => {
  console.log('@form', val)
  formRef.value?.validate((isVaild) => {
    console.log('验证:', isVaild, form.value, getUseFormData())
    isVaild && emits('update:modelValue', merge(modelValue.value, getUseFormData()) )
  })
}, { deep: true })

const handle = (item) => {
  const curLevel = item.level
  item.display = !item.display

  const treeSearch = (tree, func) => {
    Object.keys(tree).forEach((key) => {
      if (typeof tree[key] === 'object') {
        console.log('判断是否需要执行层级判断', tree[key])
        func(tree[key])
        const attrKeysWithObjectValue = Object.keys(tree[key]).filter(i => typeof tree[key][i] === 'object')
        if (attrKeysWithObjectValue?.length) {
          const _newTree = {}
          attrKeysWithObjectValue.forEach((i) => {
            _newTree[i] = tree[key][i]
          })

          treeSearch(_newTree, func)
        }
      }
    })
  }

  if (!item.display) {
    treeSearch(displayObject.value, (_item) => {
      console.log(_item.level, curLevel)
      if (_item.level > curLevel) {
        _item.display = false
      }
    })
  }
}


</script>

<script>
import {  defineComponent} from 'vue'
export default defineComponent({
  name: 'Formx',
})
</script>

<template>
  <ElForm
    ref="formRef"
    :model="form"
    :style="{ 
      padding: '20px',
      overflow: 'auto'
    }"
    labelPosition="left"
  >
    <ElFormItem
      v-for="item in formItems"
      :key="item.id"
      :label="item.label"
      :prop="item.key"
      style="margin-bottom: 10px"
      :rules="item.rules"
    >
      <template v-if="item.type === 'input'">
        <ElInput 
          v-model="form[item.key]" 
          @focus="() => setCurEditContent(form, item.key)"
        />
      </template>
      <template v-else-if="item.type === 'radio-group'">
        <el-radio-group v-model="form[item.key]">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </template>
      <template v-else-if="item.type === 'input-number'">
        <el-input-number :min="1" v-model="form[item.key]" style="min-width: 100px"/>
      </template>
      <template v-else-if="item.type === 'select'">
       
        <el-select v-model="form[item.key]"  :disabled="item.disabled">
          <el-option 
            v-for="item in item.option" 
            :key="item.value" 
            :value="item.value"
            :label="item.label"
            >
          </el-option>
        </el-select>
      </template>
      <template v-else>
        <!-- <div style="height:22px; width:100%"> -->
          <!-- <ElButton @click="() => handle(displayObject[item.key])">
            {{ displayObject[item.key].display ? '收起' : '展开' }}
          </ElButton> -->
        <!-- </div> -->
        <Formx
          v-model="form[item.key]"
          :formItems="item.children"
        />
      </template>
    </ElFormItem>
  </ElForm>
</template>
