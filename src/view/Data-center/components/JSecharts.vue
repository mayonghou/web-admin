<template>
    <div>
        <Card id="jsEcharts" style="min-height:545px">
            <div class="echatsDatatitle">
                <span>{{this.IndustyName}}业成交量</span>
                <div>
                    <span class="font">●</span>
                    <span>订单量</span>
                </div>
            </div>
            <div id="main" v-show="this.isShow" class="EchatsData" ></div>
			<div style="width: 100%; height: 100%; text-align: center;" v-show="this.isShow == false">
				<img width="100%" height="100%" src="../../../assets/img/marketingqianlima/qiushengye(2).png" />
				<h3 style="color: rgb(203 207 210);">暂无数据</h3>
			</div>
        </Card>
    </div>
</template>

<script>
import bus from '../../../components/common/bus.js';
var echarts = require('echarts');
export default {
    data() {
        return {
            IndustyName: '',
            TimeData: '',
            IndustyId: '',
			isShow:false
        };
    },
    created() {
        // 拿到bus传的行业数据
        bus.$on('Industrydata', (msg) => {
            this.IndustyName = msg.name;
            this.IndustyId = msg.id;
            this.xiaoyuer();
        });
        // 拿到时间
        bus.$on('timeData', (msg) => {
            this.TimeData = msg;
            this.xiaoyuer();
        });
    },
    mounted() {
        // 获取当前时间
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (month.toString().length < 10) {
            month = '0' + month;
        }
        this.TimeData = year + '-' + month;
        this.xiaoyuer();
    },
    methods: {
        xiaoyuer() {
            this.$axios
                .get('admin/mall/dataCenter/getAdminDataCenterAllOrder?dateStr=' + this.TimeData + '&industryId=' + this.IndustyId)
                .then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            let today = [];
                            let value = [];
							if(data.data == ''){
								this.isShow = false;
							} else {
								this.isShow = true;
							}
                            data.data.forEach(function (val, index) {
                                today[index] = val.name;
                                value[index] = val.value;
                            });
							let jsEcharts = document.getElementById('jsEcharts');
							let mian = document.getElementById('main');
							mian.style.width = jsEcharts.offsetWidth + 'px';
                            var myChart = echarts.init(mian);
                            let option = {
                                xAxis: {
                                    type: 'category',
                                    // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                                    data: today
                                },
                                yAxis: {
                                    type: 'value'
                                },
                                series: [
                                    {
                                        //柱状
                                        // data: [120, 200, 150, 80, 70, 110, 130],
                                        data: value,
                                        color: '#358DFF',
                                        barWidth: 12,
                                        type: 'bar',
                                        itemStyle: {
                                            normal: {
                                                //柱形图圆角，初始化效果
                                                barBorderRadius: [15, 15, 0, 0]
                                            }
                                        }
                                    },
                                    {
                                        //折线
                                        // data: [130, 210, 160, 90, 80, 120, 140],
                                        data: value,
                                        type: 'line',
                                        barWidth: 12,
                                        color: '#00EAFF'
                                    }
                                ]
                            };
                            myChart.setOption(option);
                        }
                    }
                });
        }
    }
};
</script>

<style scope>
.echatsDatatitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 50px 60px 20px 60px;
    border-bottom: solid 1px #f3f3f3;
}
.EchatsData {
    width: 100%;
    height: 400px;
}
.font {
    color: #00eaff;
    margin-right: 10px;
}
</style>