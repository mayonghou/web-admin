<template>
    <Card style="min-height:472px; margin-top:15px">
        <div>
            <div class="huoqushijian">
                <el-date-picker
                    v-model="value"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    @change="valueTime"
                ></el-date-picker>
                <span @click="yearData">一年</span>
                <span @click="monthData">一月</span>
                <span @click="todaysData">七天</span>
            </div>
            <div ref="main02" style="width: 100%; height:400px" v-show="iSshowDara"></div>
            <div ref="main0n" style="width: 100%; height:400px" v-show="iSshowDara == false">
                <img
                    class="imgClass"
                    src="../../../../../src/assets/img/queshengPage/ques1.png"
                    alt
                />
                <h3 style="text-align: center; color:#515a6e80">暂无数据</h3>
            </div>
        </div>
    </Card>
</template>

<script>
var echarts = require('echarts');
export default {
    data() {
        return {
            value: '',
            statTimeType: 0,
            iSshowDara: true
        };
    },
    mounted() {
        this.xiaoyuerEcharse();
    },
    methods: {
        yearData() {
            this.statTimeType = 2;
            this.xiaoyuerEcharse();
        },
        monthData() {
            this.statTimeType = 1;
            this.xiaoyuerEcharse();
        },
        todaysData() {
            this.statTimeType = 0;
            this.xiaoyuerEcharse();
        },
        valueTime(value) {
            this.value = value;
            this.xiaoyuerEcharse();
        },
        xiaoyuerEcharse() {
            let datas = {
                statDate: this.value,
                statTimeType: this.statTimeType,
                statType: 1
            };
            this.$axios.post('admin/mall/dataCenter/getOrderTimeline', datas).then((res) => {
                console.log(res);
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        let name = [];
                        let value = [];
                        if (data.data == '') {
                            this.iSshowDara = false;
                        } else {
                            this.iSshowDara = true;
                        }
                        data.data.forEach(function (val, index) {
                            name[index] = val.name;
                            value[index] = val.value / 100;
                        });
                        var myChart = echarts.init(this.$refs.main02);
                        // 指定图表的配置项和数据
                        var option = {
                            title: {
                                text: '销售额统计'
                            },
                            xAxis: {
                                type: 'category',
                                // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                                data: name
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [
                                {
                                    // data: [150, 230, 224, 218, 135, 147, 260],
                                    data: value,
                                    type: 'line',
                                    color: 'rgb(0, 187, 122)'
                                }
                            ]
                        };
                        // 使用刚指定的配置项和数据显示图表。
                        myChart.setOption(option);
                    }
                }
            });
        }
    }
};
</script>

<style scope>
.huoqushijian {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
}
.huoqushijian span {
    cursor: pointer;
    margin-right: 20px;
}
.imgClass {
    display: block;
    width: 100%;
    height: auto;
    padding-top: 50px;
}
</style>