<template>
    <Row>
        <Col span="12">
            <Input
                v-model="value"
                placeholder="请输入企业、法人名称..."
                style="width: 200px;margin-right:20px"
            />
            <el-date-picker
                v-model="value2"
                type="datetimerange"
                range-separator="——"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="fgetLocalTime"
            ></el-date-picker>
            <Button type="primary" class="bTnClass">查询</Button>
        </Col>
    </Row>
</template>

<script>
export default {
    data() {
        return {
            value: '',
            value2: []
        };
    },
    methods: {
        fgetLocalTime() {}
    }
};
</script>

<style scoped>
.bTnClass {
    padding: 0px 50px;
}
</style>