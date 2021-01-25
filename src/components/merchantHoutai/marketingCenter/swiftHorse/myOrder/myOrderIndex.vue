<template>
    <!-- 营销中心订单 -->
    <div class="marketOrder" id="marketOrder">
        <div class="orderNav">
            <ul class="nav-ul">
                <li
                    class="nav-li"
                    :class="item.index == 0?'active':''"
                    v-for="item in navList"
                    :key="item.index"
                    @click="navBtn(item)"
                    ref="navListli"
                >
                    <span>{{item.name}}</span>
                </li>
            </ul>
        </div>
        <div class="searxh-title">
            <h3>订单查询</h3>
            <div class="search">
                <el-input v-model="jobName" class="jobName" placeholder="请输入兼职人员姓名" clearable></el-input>
                <el-date-picker
                    v-model="missionTime"
                    type="daterange"
                    range-separator="——"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="timeChange"
                ></el-date-picker>
                <el-button class="queryBtn" @click="queryBtn">查询</el-button>
            </div>
        </div>
        <div class="zanwushuju" v-if="orderDataList == ''">
            <span>暂无数据</span>
        </div>
        <div class="orderList" v-for="(item, index) in orderDataList" :key="index">
            <div class="orderSn">订单编号：{{item.orderNo}}</div>
            <div class="jobInformation">
                <div class="job-left">
                    <div class="jobLeft-avatar">
                        <el-avatar :size="size" :src="item.sellerAvatar"></el-avatar>
                    </div>
                    <div class="jobLeft-text">
                        <div>{{item.sellerName}}</div>
                        <div>
                            <span>{{item.sellerCareer}}</span>
                            <span style="margin-left: 10px;">{{item.sellerWorkExp}}经验</span>
                        </div>
                        <div>
                            <span>成交价:</span>
                            <span style="color:#ff0000;">￥{{item.actualTotalPrice / 100}}</span>
                        </div>
                    </div>
                </div>
                <div class="job-center">
                    <div>订单要求</div>
                    <div class="center-text">{{item.requirements}}</div>
                </div>
                <div class="job-right">
                    <div>订单内容及数量</div>
                    <div class="right-list">
                        <div class="renwe" v-for="(items, i) in item.taskList" :key="i">
                            <span>{{items.sidelineTypeName}}</span>
                            <el-progress
                                v-if="status != 0"
                                class="el-progress"
                                :text-inside="true"
                                :stroke-width="14"
                                :percentage="items.accomplishedNum / items.totalNum * 100"
                            ></el-progress>

                            <span
                                style="margin-left: 10px;"
                                v-if="status != 0"
                            >已上传{{items.accomplishedNum}}张</span>
                            <span class="listNumber" style="margin-left: 10px;">共{{items.totalNum}}张</span>
                        </div>
                        <div class="lookOrder">
                            <el-button
                                v-if="status == 1 && item.baifengbi[index] == 1"
                                class="confirm-but"
                                @click="lookOrder(item)"
                            >查看订单内容</el-button>
                            <el-button
                                v-if="status == 1 && item.baifengbi[index] != 1"
                                class="queding-but"
                            >查看订单内容</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="order-time">
                <div class>订单创建时间：{{item.submitTime}}</div>
                <div class>
                    <span>订单任务期限：{{item.startTime}} - {{item.endTime}}</span>
                    <span
                        v-if="status !=-1"
                        style="margin-left:15px; color: #FF6700;"
                    >剩余{{item.timeshaoma}}小时交易将自动关闭</span>
                    <span
                        v-else-if="status == -1"
                        style="margin-left:15px; color: #FF6700;"
                    >{{item.statusNote}}</span>
                </div>
            </div>
            <div class="confirm">
                <el-button @click="zhufuBtn(item)" v-if="status == 0" class="confirm-but">立即支付</el-button>
                <el-button v-if="status == 1 && item.baifengbi[index] != 1" class="queding-but">确定收货</el-button>
                <el-button
                    v-if="status == 1 && item.baifengbi[index] == 1"
                    @click="noManyi(item)"
                    class="confirm-but"
                >对作品不满意</el-button>
                <el-button
                    v-if="status == 1 && item.baifengbi[index] == 1"
                    @click="quedingshouhuo(item)"
                    class="confirm-but"
                >确定收货</el-button>
                <el-button v-if="status == 2 " @click="lookOrder(item)" class="confirm-but">查看订单内容</el-button>
            </div>
            <div
                class="yanqitixing"
                v-if="status == 1 && item.baifengbi[index] == 1 && item.delayApplication != null"
            >
                <div>
                    <span style="color:#D50B0B;">对方向你发起延期申请：延期{{item.delayApplication.days}}天</span>
                    <el-button class="trueBtn" @click="truebtn(item)">同意</el-button>
                    <el-button class="trueBtns" @click="jujueBtn(item)">拒绝</el-button>
                </div>
            </div>
        </div>

        <el-pagination
            class="elpaginations"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="counts"
        ></el-pagination>
        <el-dialog title="支付" :visible.sync="dialogVisible" width="30%">
            <img :src="'data:image/jpg;base64,'+imgbase64" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'marketOrder',
    data() {
        return {
            size: 70,
            percentage: 60,
            limit: 10,
            page: 1,
            status: 0,
            dialogVisible: false,
            imgbase64: '',
            counts: 0,
            jobName: '',
            missionTime: [],
            orderDataList: [],
            startTime: '',
            endTime: '',
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
    mounted() {
        this.getSwiftHorseorder();
    },
    methods: {
        truebtn(item) {
            this.$confirm('是否同意延期处理【' + item.delayApplication.days + '】天?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: '确定中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let data = {
                    accept: true,
                    orderId: item.id
                };
                this.$axios.post('admin/sideline/order/deal_with_delay', data).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        let datas = res.data;
                        if (datas.code == 200) {
                            this.$message({
                                showClose: true,
                                message: datas.msg,
                                type: 'success'
                            });
                            this.getSwiftHorseorder();
                        } else {
                            this.$message({
                                showClose: true,
                                message: datas.msg,
                                type: 'error'
                            });
                        }
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                });
            });
        },
        // 确定收货
        quedingshouhuo(item) {
            this.$confirm('是否确定收货?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: '确定中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let data = {
                    orderId: item.id,
                    status: 1,
                    userId: item.sidelineUserId
                };
                this.$axios.post('admin/sideline/order/update_status', data).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: '收货成功',
                                type: 'success'
                            });
                            this.status = 1;
                            this.getSwiftHorseorder();
                        } else {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'error'
                            });
                        }
                    } else {
                        this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'error'
                        });
                    }
                });
            });
        },
        // 查看订单内容
        lookOrder(item) {
            this.$router.push({
                path: './lookText',
                query: {
                    id: item.id
                }
            });
        },
        // noManyi 对作品不满意
        noManyi(item) {
            this.$router.push({
                path: './bumanyi',
                query: {
                    id: item.id
                }
            });
        },
        // 立即支付按钮
        zhufuBtn(item) {
            this.imgbase64 = item.qrCodeBase64;
            this.dialogVisible = true;
        },
        // 订单列表导航
        navBtn(item) {
            for (let i = 0; i < this.$refs.navListli.length; i++) {
                if (item.index == i) {
                    this.$refs.navListli[i].classList.add('active');
                    if (i == 3) {
                        this.status = -1;
                        this.getSwiftHorseorder();
                    } else {
                        this.status = i;
                        this.getSwiftHorseorder();
                    }
                } else {
                    this.$refs.navListli[i].classList.remove('active');
                }
            }
        },
        jujueBtn(item) {
            this.$confirm('是否同意延期处理【' + item.delayApplication.days + '】天?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: '确定中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let data = {
                    accept: false,
                    orderId: item.id
                };
                this.$axios.post('admin/sideline/order/deal_with_delay', data).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        let datas = res.data;
                        if (datas.code == 200) {
                            this.$message({
                                showClose: true,
                                message: datas.msg,
                                type: 'success'
                            });
                            this.getSwiftHorseorder();
                        } else {
                            this.$message({
                                showClose: true,
                                message: datas.msg,
                                type: 'error'
                            });
                        }
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                });
            });
        },
        handleSizeChange(val) {
            this.limit = val;
            this.getSwiftHorseorder();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getSwiftHorseorder();
        },
        // 筛选时间
        timeChange(value) {
            if (value) {
                let start = new Date(value[0]);
                this.startTime = start.getTime(start);
                let end = new Date(value[0]);
                this.endTime = end.getTime(end);
            } else {
                this.startTime = '';
                this.endTime = '';
            }
        },
        // queryBtn 查询筛选按钮
        queryBtn() {
            this.page = 1;
            this.getSwiftHorseorder();
        },
        // 查询订单列表
        getSwiftHorseorder() {
            let data = {
                companyId: parseInt(localStorage.getItem('loginData')),
                limit: this.limit,
                page: this.page,
                status: this.status,
                sidelineUserName: this.jobName,
                timeEnd: this.endTime || 0,
                timeStart: this.startTime || 0
            };
            this.$axios.post('admin/sideline/order/list', data).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        let datalist = [];
                        var https = /https:\/\/.+$/;
                        data.list.forEach(function (val, index) {
                            datalist[index] = val;
                            if (https.test(val.sellerAvatar)) {
                                datalist[index].sellerAvatar = val.sellerAvatar;
                            } else {
                                datalist[index].sellerAvatar = localStorage.getItem('imgUrl') + val.sellerAvatar;
                            }
                            var date = new Date(val.leftPayTime);
                            var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours();
                            var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + '' : date.getMinutes();
                            datalist[index].timeshaoma = h + m;
                            let bbb = [];
                            val.taskList.forEach(function (item, number) {
                                bbb[number] = item.accomplishedNum / item.totalNum;
                            });
                            datalist[index].baifengbi = bbb;
                            let submit = new Date(val.submitTime);
                            var submitTime =
                                submit.getFullYear() +
                                '-' +
                                (submit.getMonth() + 1 < 10 ? '0' + (submit.getMonth() + 1) : submit.getMonth() + 1) +
                                '-' +
                                submit.getDate();

                            let start = new Date(val.startTime);
                            var startTime =
                                start.getFullYear() +
                                '-' +
                                (start.getMonth() + 1 < 10 ? '0' + (start.getMonth() + 1) : start.getMonth() + 1) +
                                '-' +
                                start.getDate();
                            let end = new Date(val.endTime);
                            var endTime =
                                end.getFullYear() +
                                '-' +
                                (end.getMonth() + 1 < 10 ? '0' + (end.getMonth() + 1) : end.getMonth() + 1) +
                                '-' +
                                end.getDate();
                            datalist[index].startTime = startTime;
                            datalist[index].endTime = endTime;
                            datalist[index].submitTime = submitTime;
                        });
                        this.orderDataList = datalist;

                        this.counts = data.total;
                    } else {
                        this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'error'
                        });
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: data.msg,
                        type: 'error'
                    });
                }
            });
        }
    }
};
</script>

<style scoped>
.marketOrder {
    padding: 20px;
    box-sizing: border-box;
    background: #fafafa;
}
.orderNav {
    width: 100%;
    height: 50px;
    line-height: 50px;
}
.nav-ul {
    display: flex;
    flex-direction: row;
}
.nav-li {
    list-style: none;
    height: 100%;
    text-align: center;
    font-size: 20px;
    margin-left: 30px;
    cursor: pointer;
}
.nav-li.active {
    color: #3b58ff;
    border-bottom: 1px solid #3b58ff;
}
.orderList {
    padding: 10px;
    width: 100%;
    /* height: 300px; */
    background: #fff;
    /* margin-left: 20px; */
    margin-top: 60px;
    margin-bottom: 80px;
}
.orderList:hover {
    box-shadow: 0px 0px 5px 5px #c1c1c1;
}
.orderList .orderSn {
    padding: 0 40px;
    font-size: Source Han Sans CN Light;
    font-size: 14px;
    line-height: 40px;
}
.orderList .jobInformation {
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    height: 108px;
    margin-top: 20px;
    box-sizing: border-box;
}
.orderList .jobInformation .job-left {
    width: 20%;
    height: 100%;
    border-right: 1px solid #f4f4f4;
    display: flex;
    justify-content: space-between;
}
.orderList .jobInformation .job-left .jobLeft-text {
    width: 140px;
}
.orderList .jobInformation .job-center {
    width: 50%;
    height: 100%;
    padding: 0 20px;
}
.orderList .jobInformation .job-center .center-text {
    padding-left: 20px;
}
.orderList .jobInformation .job-right {
    width: 40%;
    height: 100%;
    border-left: 1px solid #f4f4f4;
    padding-left: 20px;
}

.listNumber {
    color: #3b58ff;
}
.order-time {
    display: flex;
    justify-content: space-between;
    padding: 0 40px 10px 40px;
}
.confirm {
    margin-top: 40px;
    width: 100%;
    text-align: center;
    padding-bottom: 20px;
}
.confirm .confirm-but {
    width: 120px;
    height: 40px;
    background: #516bfc;
    color: #fff;
    font-size: 16px;
    font-family: Source Han Sans CN Light;
}
.confirm .queding-but {
    width: 120px;
    height: 40px;
    background: #f9f9f9;
    color: #cccccc;
    font-size: 16px;
    font-family: Source Han Sans CN Light;
}
.el-progress {
    width: 50%;
    margin-left: 10px;
}
.renwe {
    display: flex;
    flex-direction: row;
    /* justify-content: space-between; */
}
.elpaginations {
    width: 100%;
    text-align: right;
    margin-top: 30px;
}
.lookOrder {
    width: 100%;
    text-align: center;
}
.lookOrder .queding-but {
    background: #f9f9f9;
}
.lookOrder .confirm-but {
    background: #516bfc;
    color: #fff;
}
.yanqitixing {
    width: 100%;
    height: 90px;
    background: #edf8ee;
    line-height: 90px;
    text-align: center;
}
.trueBtn {
    background: #1fb054;
    width: 100px;
    height: 30px;
    color: #fff;
}
.trueBtns {
    background: #d50b0b;
    width: 100px;
    height: 30px;
    color: #fff;
}
.searxh-title {
    width: 100%;
    height: 60px;
    padding: 25px;
}
.searxh-title .search {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.search .jobName {
    width: 15%;
    margin-right: 20px;
}
.search .queryBtn {
    width: 150px;
    height: 30px;
    color: #fff;
    background: #2450d2;
}
.zanwushuju {
    width: 100%;
    text-align: center;
    padding-top: 100px;
    font-size: 50px;
}
</style>
