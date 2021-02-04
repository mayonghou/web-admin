<template>
    <Card style="min-height:529px">
        <div class="rightClass">
            <DatePicker
                type="month"
                placeholder="选择日期"
                style="width: 200px"
                @on-change="timeChange"
            ></DatePicker>
        </div>
        <div ref="main03" style="width: 100%; height:400px" v-show="iSshowData"></div>
    </Card>
</template>

<script>
var echarts = require('echarts');
export default {
    props: ['status'],
    data() {
        return {
            startTime: '',
            endTime: '',
            iSshowData: true
        };
    },
    mounted() {
        this.EcharseXiaoyuer1();
    },
    methods: {
        timeChange(value) {
            this.startTime = value + '-01';
            this.endTime = value + '-31';
            this.EcharseXiaoyuer1();
        },
        EcharseXiaoyuer1() {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            if (month.toString().length < 2) {
                month = '0' + month;
            }
            this.startTime = year + '-' + month + '1';
            this.endTime = year + '-' + month + '31';
            let datas = {
                endDate: this.endTime,
                startDate: this.startTime
            };
            if (this.status == 1) {
                this.$axios.post('admin/job/dataCenter/getAdminJobDataByMonth', datas).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            var data1 = [];
                            var data2 = [];
                            var xAxisData = [];
                            data.data.data.forEach(function (val, index) {
                                data1[index] = val.connectCount;
                                data2[index] = val.views;
                                xAxisData[index] = val.today;
                            });
                            var myChart = echarts.init(this.$refs.main03);
                            // 指定图表的配置项和数据

                            // var data3 = [];
                            // var data4 = [];
                            // for (var i = 1; i < 31; i++) {
                            //     xAxisData.push(i);
                            //     data1.push((Math.random() * 2).toFixed(2));
                            //     data2.push((Math.random() * 5).toFixed(2));
                            //     data3.push((Math.random() + 0.3).toFixed(2));
                            //     data4.push(-Math.random().toFixed(2));
                            // }
                            var emphasisStyle = {
                                itemStyle: {
                                    shadowBlur: 31,
                                    shadowColor: 'rgba(0,0,0,0.2)'
                                }
                            };
                            var option = {
                                title: {
                                    text: '平台职位浏览量以及沟通量',
                                    // subtext: '（点击右边按钮可单独查看）',
                                    left: '7%'
                                },
                                legend: {
                                    data: ['沟通量', '浏览量'],
                                    left: '85%'
                                },
                                tooltip: {},
                                xAxis: {
                                    data: xAxisData,
                                    name: '天数'
                                },
                                yAxis: {},
                                series: [
                                    {
                                        name: '沟通量',
                                        type: 'bar',
                                        stack: 'one',
                                        emphasis: emphasisStyle,
                                        data: data1,
                                        barWidth: '10',
                                        color: '#FF9502 '
                                    },
                                    {
                                        name: '浏览量',
                                        type: 'bar',
                                        stack: 'one',
                                        emphasis: emphasisStyle,
                                        data: data2,
                                        barWidth: '10',
                                        color: '#00BB7A'
                                    }
                                ]
                            };
                            // 使用刚指定的配置项和数据显示图表。
                            myChart.setOption(option);
                        }
                    }
                });
            } else {
                this.$axios.post('admin/renting/dataCenter/adminHouseDataByMonth', datas).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            var data1 = [];
                            var data2 = [];
                            var xAxisData = [];
                            data.data.data.forEach(function (val, index) {
                                data1[index] = val.connectCount;
                                data2[index] = val.views;
                                xAxisData[index] = val.today;
                            });
                            var myChart = echarts.init(this.$refs.main03);
                            // 指定图表的配置项和数据
                            var emphasisStyle = {
                                itemStyle: {
                                    shadowBlur: 31,
                                    shadowColor: 'rgba(0,0,0,0.2)'
                                }
                            };
                            var option = {
                                title: {
                                    text: '平台房源浏览量以及沟通量',
                                    // subtext: '（点击右边按钮可单独查看）',
                                    left: '7%'
                                },
                                legend: {
                                    data: ['沟通量', '浏览量'],
                                    left: '85%'
                                },
                                tooltip: {},
                                xAxis: {
                                    data: xAxisData,
                                    name: '天数'
                                },
                                yAxis: {},
                                series: [
                                    {
                                        name: '沟通量',
                                        type: 'bar',
                                        stack: 'one',
                                        emphasis: emphasisStyle,
                                        data: data1,
                                        barWidth: '10',
                                        color: '#FF9502 '
                                    },
                                    {
                                        name: '浏览量',
                                        type: 'bar',
                                        stack: 'one',
                                        emphasis: emphasisStyle,
                                        data: data2,
                                        barWidth: '10',
                                        color: '#00BB7A'
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
    }
};
</script>

<style scope>
.rightClass {
    padding: 10px 15px;
}
</style>