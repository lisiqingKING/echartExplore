<script setup lang="ts">
import Chart from './Charts.vue'
import ChartForm from './ChartForm.vue'

</script>

<template>
    <div class="container">
        <div class="left">
            <ChartForm />
        </div>
        <div class="right">
            <Chart />
        </div>
    </div>
</template>

<style lang="scss" moudle>
.container {
    display: flex;
    box-sizing: border-box;
    height: 100%;
    .left, .right {
        height: 100%;
    }

    .left {
        flex: 1
    }

    .right {
        flex: 1
    }
}
</style>
