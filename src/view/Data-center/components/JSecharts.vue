<template>
    <div>
        <div class="echatsDatatitle">
            <span>餐饮业成交量</span>
            <div>
                <span class="font">●</span>
                <span>订单量</span>
            </div>
        </div>
        <div id="main" class="EchatsData"></div>
    </div>
</template>

<script>
var echarts = require('echarts');
export default {
    data() {
        return {
            TimeData: '2020年12月01日'
        };
    },
    methods: {
        xiaoyuer() {
            var myChart = echarts.init(document.getElementById('main'));
            let option = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        //柱状
                        data: [120, 200, 150, 80, 70, 110, 130],
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
                        data: [130, 210, 160, 90, 80, 120, 140],
                        type: 'line',
                        barWidth: 12,
                        color: '#00EAFF'
                    }
                ]
            };
            myChart.setOption(option);
        }
    },
    mounted() {
        this.xiaoyuer();
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