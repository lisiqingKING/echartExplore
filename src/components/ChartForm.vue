<script setup lang="ts" name="EditChartAttrForm">
import { defineComponent } from 'vue';


const props = defineProps<{
  modelValue: CommonObject,
  formItems: AttrFormItems
}>()

defineEmits(['update:modelValue'])

const { modelValue, formItems } = props


</script>

<script lang="ts">
export default defineComponent({
  name: 'EditChartAttrForm'
})
</script>

<template>
  <el-form 
    :modelValue="modelValue" 
    @update:modelValue="() => $emit('update:modelValue', modelValue)"
    label-width="100px"
  >
    <el-form-item v-for="item in formItems" :label="item.label">
      <template v-if="item.type === 'form'">
        <EditChartAttrForm v-model="modelValue[item.key]" :formItems="item.children" />
      </template>
      <template v-else-if="item.type === 'input'">
        <el-input v-model="modelValue[item.key]" v-bind="item.props" />
      </template>
      <template v-else-if="item.type === 'input-number'">
        <el-input v-model="modelValue[item.key]" v-bind="item.props" />
      </template>
      <template v-else-if="item.type === 'radio'">
        <el-radio-group v-model="modelValue[item.key]">
          <el-radio 
            v-for="(_item, index) in item.options" 
            :key="index"
            :label="_item.value"
          >
            {{  item.label  }}
          </el-radio>
        </el-radio-group>
      </template>
      <template v-if="item.type === 'select'">
        <el-select v-model="modelValue[item.key]">
          <el-option 
            v-for="(_item, index) in item.options" 
            :key="index"
            :label="_item.label"
            :value="_item.value"
          />
        </el-select>
      </template>
    </el-form-item>
  </el-form>
</template>

<style scoped>
</style>
