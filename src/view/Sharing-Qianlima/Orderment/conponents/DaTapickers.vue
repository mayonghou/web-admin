<template>
    <div>
        <DatePicker
            type="daterange"
            placement="bottom-end"
            placeholder="请选择日期......"
            separator="    ——    "
            format="yyyy-MM-dd"
            style="width: 250px"
            @on-change="ChangeDate"
        ></DatePicker>
    </div>
</template>

<script>
export default {
    methods: {
        // 日期发生变化时触发
        ChangeDate(value) {
            this.$emit('Date', value);
        }
    }
};
</script>

<style>
</style>