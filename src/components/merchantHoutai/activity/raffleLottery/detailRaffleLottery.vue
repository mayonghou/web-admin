<template>
    <div class="detailRaffleLottery" id="detailRaffleLottery">
        <div class="detail-top">
            <label style="margin-left: 30px;">抽奖活动信息</label>
        </div>
        <el-form :model="detailFrom">
            <el-form-item label="活动标题:" :label-width="labelwidth">
                <el-input
                    class="elinput"
                    placeholder="请输入活动的标题"
                    readonly
                    v-model="detailFrom.title"
                ></el-input>
            </el-form-item>
            <el-form-item label="活动奖品:" :label-width="labelwidth">
                <div
                    class="prizeItemList"
                    v-for="item in this.detailFrom.prizeItemList"
                    :key="item.prizeLevel"
                >
                    <div class="aaa grade">
                        <span class="abc">{{item.prizeLevel}}：</span>
                        <span class="color">{{item.couponTab}}</span>
                    </div>
                    <div class="aaa unclaimed">
                        <span class="abc">未领取：</span>
                        <span class>{{item.prizeCountLeft}}张</span>
                    </div>
                    <div class="aaa issue">
                        <span class="abc">发布数量：</span>
                        <span class>
                            <span>{{item.prizeNum}}张</span>
                        </span>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="每日抽奖机会:" :label-width="labelwidth">
                <label>{{detailFrom.chanceNumPerDay}}次</label>
            </el-form-item>
            <el-form-item label="总中奖概率:" :label-width="labelwidth">
                <label>{{detailFrom.winRate}}%</label>
            </el-form-item>
            <el-form-item label="总中奖机会:" :label-width="labelwidth">
                <label>{{detailFrom.maxChanceNum}}次</label>
            </el-form-item>
            <el-form-item label="活动规则:" :label-width="labelwidth">
                <el-input
                    class="elinput"
                    type="textarea"
                    placeholder="请输入活动的标题"
                    readonly
                    v-model="detailFrom.ruleDescription"
                ></el-input>
            </el-form-item>
            <el-form-item label="活动时间:" :label-width="labelwidth">
                <el-input class="elinput" placeholder="请输入活动的标题" readonly v-model="detailFrom.time"></el-input>
            </el-form-item>
            <el-form-item label="每人限购:" :label-width="labelwidth">
                <el-input class="elinput" placeholder="请输入活动的标题" readonly v-model="detailFrom.time"></el-input>
            </el-form-item>
        </el-form>
        <div class="buttonreturn">
            <el-button @click="returnBtnData" class="returnBtn">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'detailRaffleLottery',
    data() {
        return {
            labelwidth: '300px',
            detailFrom: {
                title: '秒杀就现在',
                prizeItemList: [],
                chanceNumPerDay: '',
                winRate: '',
                ruleDescription: '',
                time: ''
            }
        };
    },
    mounted() {
        this.getraffData();
    },
    methods: {
        returnBtnData() {
            this.$router.push({
                path: './raffleLottery'
            });
        },

        getraffData() {
            const prizeLevel = {
                1: '一',
                2: '二',
                3: '三',
                4: '四',
                5: '五',
                6: '六'
            };
            this.detailFrom = this.$route.query.data;
            let strinfer = this.$route.query.data.prizeItemList;
            for (let i in strinfer) {
                strinfer[i].prizeLevel = prizeLevel[strinfer[i].prizeLevel + ''] + '等奖';
                this.detailFrom.prizeItemList.prizeLevel = strinfer[i].prizeLevel;
            }
        }
    }
};
</script>

<style>
.detailRaffleLottery {
    box-sizing: border-box;
    padding: 20px;
    width: 100%;
}

.detail-top {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    background-color: #fafbfa;
    margin-bottom: 30px;
}

.detailRaffleLottery .elinput .el-input__inner {
    border: 0;
}

.el-form .el-form-item__label {
    font-weight: bold;
}

.el-form-item__content {
    line-height: 32px;
}

.prizeItemList {
    display: flex;
    justify-content: space-around;
}

.prizeItemList .abc {
    font-weight: bold;
}

.color {
    color: #2494d2;
    cursor: pointer;
}

.elinput .el-textarea__inner {
    width: 560px;
    border: 0;
    height: 80px;
}

.buttonreturn {
    width: 100%;
    text-align: center;
}

.detailRaffleLottery .returnBtn {
    width: 90px;
    height: 30px;
    background-color: #2482d2;
    color: #fff;
    padding: 0;
}
.detailRaffleLottery .el-form-item__label {
    text-align: right;
}
</style>
