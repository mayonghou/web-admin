<template>
    <div>
        <Card style="min-height:188px">
            <div class="xiaoyuerClass">
                <span class="spanClassgr">
                    <div class="xiaoyuert">
                        <p class="sonCls">平台转化率</p>
                        <p class="sonCls">{{this.conversionRate}}%</p>
                        <div class="xiaoyuGdd">
                            <!-- <div class="xiaoyufg">&nbsp;</div> -->
                            <Progress
                                :percent="parseInt(this.conversionRate)"
                                :stroke-width="10"
                                hide-info
                            />
                        </div>
                    </div>
                </span>
                <span class="spanClassgr vdisplayClass">
                    <div class="xiaoyuert">
                        <p class="sonCls">平台复购率</p>
                        <p class="sonClss">{{this.repeatRate}}%</p>
                    </div>
                    <div class="sdeondClass">
                        <i-circle :percent="parseInt(this.repeatRate)" :size="100"></i-circle>
                    </div>
                </span>
            </div>
        </Card>
    </div>
</template>

<script>
var echarts = require('echarts');
export default {
    props: [
        'conversionRate', //转化率
        'repeatRate' //复购率
    ],
    data() {
        return {
            repeatRatedas: parseInt(this.repeatRate)
        };
    },
    mounted() {}
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
    /* background-color: #f2f2f7; */
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