<template>
    <el-input 
        v-model="$attrs.modelValue"
        type="textarea" 
        :autosize="{ minRows: 20, maxRows: 99 }"
    />
</template>