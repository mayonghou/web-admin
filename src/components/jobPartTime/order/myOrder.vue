<template>
    <div class="myOrder" id="myOrder">
        <div class="retuenZhuye">
            <el-button type="text" @click="returnHomePage">返回主页</el-button>
        </div>
        <ul class="myOrderNav">
            <li
                class="myOrderNavList"
                v-for="item in navList"
                @click="tabNav(item)"
                :key="item.index"
                :class="item.index == 0?'active':''"
                ref="myOrderNavList"
            >
                <div>{{item.name}}</div>
            </li>
        </ul>
        <div class="queryCondition">
            <h2>订单查询</h2>
            <div class="condition">
                <el-input style="width: 200px;" v-model="merchantName" placeholder="请输入商家名称"></el-input>
                <el-date-picker
                    v-model="orderTime"
                    type="daterange"
                    unlink-panels
                    style="margin-left: 10px;"
                    range-separator="——"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                ></el-date-picker>
                <el-button class="queryBtn">查询</el-button>
            </div>
        </div>
        <ul class="orderUl">
            <li class="orderLi">
                <el-card class="elCard-li">
                    <div>订单编号：44643548961563789645746</div>
                    <div class="orderMessage">
                        <div class="personageMessage">
                            <div class="avatar">
                                <img class="img" src="../../../assets/nan.png" />
                                <img class="img" src="../../../assets/nv.png" />
                                <el-avatar :size="80" :src="avatarUrl"></el-avatar>
                            </div>
                            <div class="avatarMessage">
                                <p style="font-size: 20px;">高成立</p>
                                <p style="margin-left: 30%; margin-top: -10px;">管理员</p>
                                <p style="font-size: 16px;">贵州万疆烽火科技有限公司</p>
                                <p class style="font-size: 16px;">
                                    <span>成交价：</span>
                                    <span style="color: #FF0000;">300/￥</span>
                                </p>
                            </div>
                        </div>
                        <div class="orderRequire">
                            <div>订单要求：</div>
                            <p style="text-indent: 30px;">sadjksajdoisajdiosjhoidjhsaoihui</p>
                        </div>
                        <div class="orderText">
                            <div class="ordertitle">订单内容及数量：</div>
                            <div class="renwuNumber">
                                <div class="renwuList">
                                    <div>图片任务：</div>
                                    <div style="width: 30%;height: 20px;" v-if="this.navIndex == 1">
                                        <el-progress
                                            style="width: 100%;"
                                            v-if="this.navIndex == 1"
                                            :text-inside="true"
                                            :stroke-width="15"
                                            :percentage="70"
                                        ></el-progress>
                                    </div>
                                    <div v-if="this.navIndex == 1" style="color: #2450D2;">共10张</div>
                                    <div style="color: #FF8D00; margin-left: 10px;">共10张</div>
                                </div>
                                <div class="renwuList">
                                    <div>视频任务：</div>
                                    <div style="width: 30%;height: 20px;" v-if="this.navIndex == 1">
                                        <el-progress
                                            style="width: 100%;"
                                            v-if="this.navIndex == 1"
                                            :text-inside="true"
                                            :stroke-width="15"
                                            :percentage="70"
                                        ></el-progress>
                                    </div>
                                    <div v-if="this.navIndex == 1" style="color: #2450D2;">共10张</div>
                                    <div style="color: #FF8D00; margin-left: 10px;">共10张</div>
                                </div>
                                <div class="renwuList">
                                    <div>文档任务：</div>
                                    <div style="width: 30%;height: 20px;" v-if="this.navIndex == 1">
                                        <el-progress
                                            style="width: 100%;"
                                            v-if="this.navIndex == 1"
                                            :text-inside="true"
                                            :stroke-width="15"
                                            :percentage="70"
                                        ></el-progress>
                                    </div>
                                    <div v-if="this.navIndex == 1" style="color: #2450D2;">共10张</div>
                                    <div style="color: #FF8D00; margin-left: 10px;">共10张</div>
                                </div>
                                <div class="uploadBtn" v-if="this.navIndex == 1">
                                    <el-button class="upload" @click="uploadRenwu(item)">上传任务作品</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="renwuDeadline">
                        <span>任务期限：</span>
                        <span>2020.02.03 24:00 —— 2020.03.20 24:00</span>
                        <span style="color: #FF8D00; margin-left: 10px;">剩余30天,请尽快完成任务</span>
                    </div>
                    <div class="orderCreateTime">
                        <span>订单创建时间：</span>
                        <span>2020.02.03 24:00</span>
                    </div>
                    <div class="anniuBtn">
                        <el-button
                            class="elBTn"
                            @click="applyFor(item)"
                            v-if="this.navIndex == 1"
                        >申请延长时间</el-button>
                    </div>
                </el-card>
            </li>
            <li class="orderLi">
                <el-card>
                    <div>订单编号：44643548961563789645746</div>
                    <div class="orderMessage">
                        <div class="personageMessage">
                            <div class="avatar">
                                <img class="img" src="../../../assets/nan.png" />
                                <img class="img" src="../../../assets/nv.png" />
                                <el-avatar :size="80" :src="avatarUrl"></el-avatar>
                            </div>
                            <div class="avatarMessage">
                                <p style="font-size: 20px;">高成立</p>
                                <p style="margin-left: 30%; margin-top: -10px;">管理员</p>
                                <p style="font-size: 16px;">贵州万疆烽火科技有限公司</p>
                                <p class style="font-size: 16px;">
                                    <span>成交价：</span>
                                    <span style="color: #FF0000;">300/￥</span>
                                </p>
                            </div>
                        </div>
                        <div class="orderRequire">
                            <div>订单要求：</div>
                            <p style="text-indent: 30px;">sadjksajdoisajdiosjhoidjhsaoihui</p>
                        </div>
                        <div class="orderText">
                            <div class="ordertitle">订单内容及数量：</div>
                            <div class="renwuNumber">
                                <div class="renwuList">
                                    <div>图片任务：</div>
                                    <div style="color: #FF8D00;">共10张</div>
                                </div>
                                <div class="renwuList">
                                    <div>视频任务：</div>
                                    <div style="color: #FF8D00;">共10张</div>
                                </div>
                                <div class="renwuList">
                                    <div>文档任务：</div>
                                    <div style="color: #FF8D00;">共10张</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="renwuDeadline">
                        <span>任务期限：</span>
                        <span>2020.02.03 24:00 —— 2020.03.20 24:00</span>
                        <span style="color: #FF8D00; margin-left: 10px;">剩余30天,请尽快完成任务</span>
                    </div>
                    <div class="orderCreateTime">
                        <span>订单创建时间：</span>
                        <span>2020.02.03 24:00</span>
                    </div>
                    <div class="anniuBtn">
                        <el-button
                            class="elBTn"
                            v-if="this.navIndex == 2"
                            @click="lookOrderText"
                        >查看订单内容</el-button>
                        <!-- <span style="height: 30px;">请在“进行中的订单”中上传任务作品</span> -->
                    </div>
                </el-card>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            merchantName: '', //商家名称
            orderTime: '', //条件时间
            avatarUrl: require('../../../assets/logo.png'), //头像
            navIndex: 0,
            // 头部导航
            navList: [
                {
                    index: 0,
                    name: '未付款'
                },
                {
                    index: 1,
                    name: '进行中'
                },
                {
                    index: 2,
                    name: '已完成'
                },
                {
                    index: 3,
                    name: '交易失败'
                }
            ]
        };
    },
    mounted() {},
    methods: {
        // 返回主页
        returnHomePage() {
            this.$router.push({
                path: './partTimer'
            });
        },
        // 查看已完成的订单内容
        lookOrderText() {
            this.$router.push({
                path: './offTheStocks'
            });
        },
        // tab切换
        tabNav(item) {
            this.navIndex = item.index;
            let myOrderNavList = this.$refs.myOrderNavList;
            for (let i = 0; i < myOrderNavList.length; i++) {
                if (item.index == i) {
                    myOrderNavList[i].classList.add('active');
                } else {
                    myOrderNavList[i].classList.remove('active');
                }
            }
        },
        // 进行中的订单申请延长时间
        applyFor(item) {
            this.$router.push({
                path: './orderProlong'
            });
        },
        // 进行中作品上传任务内容
        uploadRenwu(item) {
            this.$router.push({
                path: './uploadWorks'
            });
        }
    }
};
</script>

<style scoped>
.myOrder {
    box-sizing: border-box;
    background-color: #f5f7fc;
    padding: 20px;
}
.myOrderNav {
    width: 95%;
    margin: 0 auto;
    background-color: #edf8ee;
    height: 42px;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.myOrderNav .myOrderNavList {
    list-style: none;
    width: 200px;
    height: 100%;
    cursor: pointer;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}
.myOrderNav .myOrderNavList.active {
    background-color: #1fb054;
    color: #fff;
}
.myOrderNav .myOrderNavList:hover {
    background-color: #1fb054;
    color: #fff;
}
.queryCondition {
    width: 95%;
    margin: 0 auto;
    background-color: #fafbfa;
    margin-top: 15px;
    padding: 10px;
}
.queryCondition .condition {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 15px;
}
.condition .queryBtn {
    width: 150px;
    height: 30px;
    background-color: #2450d2;
    color: #fff;
    padding: 0;
    border-radius: 4px;
    margin-left: 10px;
}
.orderUl .orderLi {
    list-style: none;
    width: 95%;
    margin: 0 auto;
    margin-top: 20px;
}
.orderUl .orderLi:hover {
    box-shadow: 0 0 10px #080808;
}
.orderLi .orderMessage {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;
}
/* 	.orderMessage .dOrmessage{
		width: 30%;
		height: 150px;
	} */
.orderMessage .personageMessage {
    display: flex;
    justify-content: space-between;
    /* padding: 20px; */
    padding-top: 10px;
    width: 20%;
    height: 150px;
}
.orderMessage .personageMessage .avatar {
    position: relative;
    width: 35%;
}
.orderMessage .personageMessage .avatar .img {
    position: absolute;
    top: 0;
    left: 60px;
}
.orderMessage .personageMessage .avatarMessage {
    width: 65%;
    border-right: 1px solid #ff8d00;
}
.orderMessage .orderRequire {
    width: 50%;
    height: 150px;
    padding: 20px;
}
.orderMessage .orderText {
    width: 30%;
    height: 150px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
}
.orderText .ordertitle {
    width: 25%;
}
.orderMessage .orderText .renwuNumber {
    display: flex;
    width: 75%;
    flex-direction: column;
    box-sizing: border-box;
}
.orderText .renwuNumber .renwuList {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
}
.orderText .renwuNumber .renwuList:nth-child(1) {
    margin-top: 0;
}
.orderLi .renwuDeadline {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
}
.orderLi .orderCreateTime {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
}
.orderLi .anniuBtn {
    width: 100%;
    text-align: center;
}
.anniuBtn .elBTn {
    width: 127px;
    height: 30px;
    background-color: #3a9df4;
    color: #fff;
    padding: 0;
}
.anniuBtn .elBTn.yichuli {
    background-color: #979497;
}
.retuenZhuye {
    width: 100%;
    text-align: right;
}
.elCard-li {
    width: 100%;
}
.uploadBtn {
    width: 100%;
    text-align: center;
}
.uploadBtn .upload {
    width: 100px;
    height: 30px;
    background-color: #42a7ff;
    color: #fff;
    padding: 0;
    margin-top: 10px;
}
</style>
