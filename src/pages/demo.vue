<script setup lang="ts">
import Chart from '../components/Chart.vue';
import forms from './forms.vue';
</script>

<template>
    <div class="container">
        <div class="left">
            <forms />
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
        flex: 1;
        .edit-form-edit {
            height: 30px;
            line-height: 30px;
            display: flex;
            margin: 20px 0;
            > div {
                margin-right: 20px;
                display: flex;
            }
        }
        .edit-form {
            height: calc(100% - 30px - 30px) ;
            padding: 15px;
        }
    }

    .right {
        flex: 1
    }
}
</style>
