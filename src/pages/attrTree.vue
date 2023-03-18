<script setup>
import { toRefs } from 'vue'
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  formItems: {
    type: Array,
    default: () => ([
      { label: '标题', type: 'input', key: 'name', id: 0 },
      {
        label: '信息',
        type: 'form',
        key: 'info',
        id: 1,
        children: [
          { label: '名字', type: 'input', key: 'name', id: 2 },
          { label: '年龄', type: 'input', key: 'age', id: 3 },
          {
            label: '班级',
            type: 'form',
            key: 'grade',
            id: 4,
            children: [
              { label: '年级', type: 'input', key: 'no', id: 5 },
              { label: '班号', type: 'input', key: 'class', id: 2 },
            ],
          },
        ],
      },
    ]),
  },
  displayObject: {
    type: Object,
    default: ()=> ({})
  },
})
const { modelValue, formItems } = toRefs(props)

const emits = defineEmits(['update:displayObject'])
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
    v-model="modelValue"
    style="padding: 20px; width: 400px;"
    labelPosition="left"
  >
    <ElFormItem
      v-for="item in formItems"
      :key="item.id"
      :label="item.label"
      style="margin-bottom: 10px"
    >
      <template v-if="item.type === 'input'">
        <ElInput v-model="modelValue[item.key]" />
      </template>
      <template v-else-if="item.type === 'radio-group'">
        <el-radio-group v-model="modelValue[item.key]">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </template>
      <template v-else-if="item.type === 'input-number'">
        <el-input-number v-model="modelValue[item.key]" />
      </template>
      <template v-else-if="item.type === 'select'">
        <el-select v-model="modelValue[item.key]">
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
        <div style="height:22px; width:100%">
          <!-- <ElButton @click="() => handle(displayObject[item.key])">
            {{ displayObject[item.key].display ? '收起' : '展开' }}
          </ElButton> -->
        </div>
        <Formx
          v-model="modelValue[item.key]"
          :formItems="item.children"
        />
      </template>
    </ElFormItem>
  </ElForm>
</template>
