<template>
    <div class="navClassStyle">
        <div class="nav-margin-right">
            <Input v-model="navData" placeholder="请输入关键词......" style="width: 200px" />
        </div>
        <div class="nav-margin-right">
            <!-- <span span="12"> -->
            <!-- <DatePicker
                    type="daterange"
                    placement="bottom-end"
                    placeholder="请选择日期......"
                    separator="    ——    "
                    format="yyyy-MM-dd"
                    style="width: 250px"
                    @on-change="ChangeDate"
            ></DatePicker>-->
            <!-- </span> -->
        </div>
        <div class="xiaoyuerCLass">
            <Button type="primary" @click="BtnCodeQuery">查询</Button>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ['judge'],
    data() {
        return {
            navData: ''
        };
    },
    mounted() {
        if (this.judge.name == 2) {
            this.$parent.getDatalist(1, 10, this.navData);
        } else if (this.judge.name == 3) {
            this.$parent.getDatalists(1, 10, this.navData);
        }
    },
    methods: {
        // 日期发生变化时触发
        ChangeDate() {},
        //查询
        BtnCodeQuery() {
            if (this.judge.name == 2) {
                this.$parent.getDatalist(1, 10, this.navData);
            } else if (this.judge.name == 3) {
                this.$parent.getDatalists(1, 10, this.navData);
            }
        }
    }
};
</script>

<style scope>
.navClassStyle {
    display: flex;
}
.nav-margin-right {
    margin-right: 20px;
}
.xiaoyuerCLass button {
    padding: 0px 30px;
}
</style>