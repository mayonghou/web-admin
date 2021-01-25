<template>
    <div>
        <Page
            :total="total"
            :page-size="limit"
            :page-size-opts="[10,20,30,40]"
            @on-change="PageChanges"
            @on-page-size-change="TotalChanges"
            size="small"
            show-total
            show-elevator
            show-sizer
            class-name="ClassName"
        />
    </div>
</template>

<script>
export default {
    props: ['total', 'judge', 'check'],
    data() {
        return {
            limit: 10,
            page: 1
        };
    },
    methods: {
        // 页码改变的回调，返回改变后的页码
        PageChanges(val) {
            this.page = val;
            if (this.judge.name == 1) {
                this.$parent.getDataList(val, this.limit);
            } else if (this.judge.name == 2) {
                this.$parent.getDatalist(val, this.limit, '');
            } else if (this.judge.name == 3) {
                this.$parent.getDatalists(val, this.limit, '');
            }
            if (this.check != '') {
                if (this.check == 1) {
                    // this.$emit('functionFny', this.page, this.limit);
                }
            }
        },
        // 切换每页条数时的回调，返回切换后的每页条数
        TotalChanges(limit) {
            this.limit = limit;
            if (this.judge.name != '') {
                if (this.judge.name == 1) {
                    this.$parent.getDataList(this.page, limit);
                } else if (this.judge.name == 2) {
                    this.$parent.getDatalist(this.page, limit, '');
                } else if (this.judge.name == 3) {
                    this.$parent.getDatalists(this.page, limit, '');
                }
            }
            // if (this.check != '') {
            if (this.check == 1) {
                this.$emit('functionFny', this.limit);
            }
            // }
        }
    }
};
</script>

<style scope>
</style>