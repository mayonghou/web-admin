<template>
    <div>
        <div class="appearActiveClass">
            <div class="AppeartiveClssa">
                <Input v-model="value1" placeholder="请输入公司名称..." style="width: 200px" />
            </div>
            <div class="AppeartiveClssa">
                <Input v-model="value2" placeholder="请输入兼职人员姓名..." style="width: 200px" />
            </div>
            <div class="AppeartiveClssa">
                <DaTapickers @Date="getTimes"></DaTapickers>
            </div>
            <div class="AppeartiveClssa">
                <Button type="primary" @click="queryBtn" style="padding: 0px 36px">查询</Button>
            </div>
        </div>
    </div>
</template>

<script>
import DaTapickers from './DaTapickers.vue';
export default {
    props: ['check'],
    data() {
        return {
            value1: '',
            value2: '',
            startTime: '',
            endTime: ''
        };
    },
    methods: {
        axiuaoyuer(msg) {
            console.log(msg, this.value1, this.value1);
        }
    },
    components: {
        DaTapickers
    },
    methods: {
        getTimes(value) {
            if (value) {
                let date = new Date(value[0]);
                let date1 = new Date(value[1]);
                this.startTime = date.getTime();
                this.endTime = date1.getTime();
            } else {
                this.startTime = '';
                this.endTime = '';
            }
        },
        queryBtn() {
            if (this.check == 1) {
                let data = {
                    companyName: this.value1,
                    sidelineUserName: this.value2,
                    timeEnd: this.endTime,
                    timeStart: this.startTime
                };
                this.$parent.getDatas(data);
            } else if (this.check == 2) {
                let data = {
                    companyName: this.value1,
                    sidelineUserName: this.value2,
                    timeEnd: this.endTime,
                    timeStart: this.startTime
                };
                this.$parent.getData(data);
            } else if (this.check == 3) {
                let data = {
                    companyName: this.value1,
                    sidelineUserName: this.value2,
                    timeEnd: this.endTime,
                    timeStart: this.startTime
                };
                this.$parent.getData(data);
            } else if (this.check == 4) {
                let data = {
                    companyName: this.value1,
                    sidelineUserName: this.value2,
                    timeEnd: this.endTime,
                    timeStart: this.startTime
                };
                this.$parent.getData(data);
            }
        }
    }
};
</script>

<style scope="scope">
.appearActiveClass {
    display: flex;
}
.AppeartiveClssa {
    padding: 0 5px;
}
.AppeartiveClssa:first-child {
    padding-left: 0;
}
</style>