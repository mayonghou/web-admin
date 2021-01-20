<template>
    <Card>
        <div class="xiaoyuerClass">
            <span class="spanClassgr">
                <div class="xiaoyuert">
                    <p class="sonCls">平台转化率</p>
                    <p class="sonCls">84%</p>
                    <div class="xiaoyuGdd">
                        <div class="xiaoyufg">&nbsp;</div>
                    </div>
                </div>
            </span>
            <span class="spanClassgr vdisplayClass">
                <div class="xiaoyuert">
                    <p class="sonCls">平台复购率</p>
                    <p class="sonClss">50%</p>
                </div>
                <div class="sdeondClass">
                    <div id="main" style="width: 100px;height:100px;"></div>
                </div>
            </span>
        </div>
    </Card>
</template>

<script>
var echarts = require('echarts');
export default {
    data() {
        return {};
    },
    mounted() {
        var myChart = echarts.init(document.getElementById('main'));
        let option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '12',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 335, name: '直接访问' },
                        { value: 310, name: '邮件营销' }
                    ]
                }
            ]
        };
        myChart.setOption(option);
    }
};
</script>

<style scope>
.xiaoyuerClass {
    display: flex;
    align-items: center;
    justify-content: center;
}
.xiaoyuerClass .spanClassgr {
    padding: 15px;
}
.xiaoyuerClass .spanClassgr:nth-child(2) {
    height: 100%;
}
.xiaoyuerClass .spanClassgr .sonCls {
    padding: 8px 0;
}
.xiaoyuerClass .spanClassgr .sonClss {
    padding: 18px 40px 8px 8px;
    font-size: 28px;
    font-weight: 600;
}
.xiaoyuerClass .spanClassgr .sdeondClass {
    padding: 10px;
}
.xiaoyuerClass .spanClassgr .sonCls:nth-child(1) {
    color: #aeaeb2;
}
.xiaoyuerClass .spanClassgr .sonCls:nth-child(2) {
    font-size: 28px;
    font-weight: 600;
}
.xiaoyuerClass .spanClassgr .xiaoyuGdd {
    width: 200px;
    background-color: #f2f2f7;
    height: 10px;
    border-radius: 10px;
    padding: 0px;
}
.xiaoyuerClass .spanClassgr .xiaoyuGdd .xiaoyufg {
    width: 80%;
    height: 10px;
    background-color: #1890ff;
    border-radius: 10px;
}
.xiaoyuerClass .spanClassgr .xiaoyuert {
    border-bottom: solid 1px #bbb;
    padding: 20px 0;
    padding-top: 0;
}
.xiaoyuerClass .vdisplayClass {
    display: flex;
}
.xiaoyughty {
    height: 10px;
}
</style>