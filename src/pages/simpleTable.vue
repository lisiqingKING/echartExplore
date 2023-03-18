<script setup lang="ts">
import { defineProps } from 'vue'
import { TableColumn } from '../constant/chart'
withDefaults(
    defineProps<{
        tableColumn: TableColumns
        }>(),
    { tableColumn: () => TableColumn }  
)

</script>

<template>
     <el-table v-model:data="$attrs.data" style="width: 100%;">
        <el-table-column
            v-for="item in tableColumn"
            :prop="item.prop" 
            :label="item.label" 
            :key="item.prop"
        >
            <template v-if="item.slotName" #default="scope">
                <slot :name="item.slotName" v-bind="scope"></slot>
            </template>
        </el-table-column>
    </el-table>
</template>