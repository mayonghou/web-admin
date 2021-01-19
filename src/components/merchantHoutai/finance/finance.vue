<template>
    <!-- 财务管理列表 -->
    <div class="finance" id="finance">
        <div class="caiwu-top">
            <div class="accounttitle">
                <!-- <el-button class="tixianRecord" @click="tixianjilu" type="text">提现记录</el-button> -->
                <div class="account-num">
                    <div class="shoppyee">
                        <label>商户当前余额</label>
                    </div>
                    <div class="numbermoney">
                        <label style="width: 100px;">￥{{momeyData}}</label>
                        <i
                            style="margin-left: 10px; cursor: pointer; font-size: 40px;"
                            @click="lookmoney"
                            class="iconfont icon-yanjing"
                            v-if="moneyboolean == false"
                        ></i>
                        <i
                            v-else
                            style="margin-left: 10px; cursor: pointer; font-size: 40px;"
                            @click="lookmoneylist"
                            class="iconfont icon-biyan1"
                        ></i>
                    </div>
                    <el-button @click="tixannum" class="tixiansss" round>提现</el-button>
                </div>
            </div>
            <div class="jiluchaxun">
                <label style="display: block;">记录查询</label>
                <div class="search-tinajian">
                    <el-input class="searchinput" v-model="orderSn" clearable placeholder="输入订单编号"></el-input>
                    <i
                        style="font-size: 22px;color: #2494D2;margin-left: 38px;margin-top: 5px; margin-right: 38px;"
                        class="el-icon-date"
                    ></i>
                    <el-date-picker
                        prefix-icon="md-date_range"
                        v-model="time"
                        type="daterange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        @change="timeData"
                    ></el-date-picker>
                    <el-button @click="queryData" class="chaxunbtn">查询</el-button>
                </div>
            </div>
        </div>
        <div style="height: 30px;"></div>
        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column type="index" prop label="序号" align="center" width="80"></el-table-column>
            <el-table-column type="selection" prop label="序号" align="center" width="80"></el-table-column>
            <el-table-column prop="orderSn" label="流水号" align="center"></el-table-column>
            <el-table-column prop="totalAmount" label="金额" align="center"></el-table-column>
            <el-table-column prop="payTypeList" label="支付平台" align="center"></el-table-column>
            <el-table-column prop="createTime" label="入账时间" align="center"></el-table-column>
        </el-table>
        <!-- 页码 -->
        <el-pagination
            class="pagintion"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="counts"
        ></el-pagination>

        <!-- 提现弹框 -->
        <el-dialog title="提现" :visible.sync="dialogFormVisible">
            <div class="iconEqan" @click="enlarge">
                <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                    <i class="iconfont icon-quanping"></i>
                </el-tooltip>
            </div>
            <el-form :model="tixianNumber" :rules="rules" ref="tixianNumber">
                <el-form-item label="输入提现金额:" prop="money" :label-width="formLabelWidth">
                    <el-input v-model="tixianNumber.money" placeholder="请输入金额"></el-input>
                </el-form-item>
            </el-form>
            <div class="account-xinxi">
                <div class="tixian-xinxi">提现信息:</div>
                <div class="jibenxinxi">
                    <div class="bank">
                        <label class="bank-name">开户银行：</label>
                        <label class="bank-text">{{this.companyData.depositBank}}</label>
                    </div>
                    <div class="bank">
                        <label class="bank-name">开户网点：</label>
                        <label class="bank-text">{{this.companyData.branch}}</label>
                    </div>
                    <div class="bank">
                        <label class="bank-name">账号名称：</label>
                        <label class="bank-text">{{this.companyData.name}}</label>
                    </div>
                    <div class="bank">
                        <label class="bank-name">收款账号：</label>
                        <label class="bank-text">{{this.companyData.bankNumber}}</label>
                    </div>
                </div>
            </div>
            <div class="baocunfinance">
                <el-button class="finbtn" @click="tixianBaocun">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'finance',
    data() {
        return {
            dialogFormVisible: false,
            fullscreen: '',
            formLabelWidth: '300px',
            orderSn: '',
            time: '',
            tableData: [],
            page: 1,
            limit: 10,
            counts: 0,
            momeyData: '',
            timeStart: '',
            timeEnd: '',
            companyData: {},
            momeyDataList: '',
            moneyboolean: '',
            tixianNumber: {
                money: ''
            },
            rules: {
                money: [
                    {
                        required: true,
                        message: '提现数量不能为空',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    mounted() {
        this.getFinanceData();
        this.getmoney();
    },
    methods: {
        tixianjilu() {
            this.$router.push({
                path: './moneyNumber'
            });
        },
        lookmoney() {
            this.moneyboolean = true;
            this.momeyData = this.momeyDataList;
        },
        lookmoneylist() {
            this.moneyboolean = false;
            let nbs = [];
            for (let i = 0; i < this.momeyData.length; i++) {
                nbs[i] = this.momeyData[i].replace(this.momeyData[i], '*');
            }
            this.momeyData = nbs.join('');
        },

        // 余额
        getmoney() {
            this.$axios.get('admin/financialManagement/accountBalance').then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.momeyDataList = data.data / 100 + '';
                        let money = data.data / 100 + '';
                        let nbs = [];
                        for (let i = 0; i < money.length; i++) {
                            nbs[i] = money[i].replace(money[i], '*');
                        }
                        this.momeyData = nbs.join('');
                    }
                }
            });
        },
        tixannum() {
            this.dialogFormVisible = true;
            this.$axios.get('admin/company/info/' + localStorage.getItem('loginData')).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.companyData = data.data;
                    }
                }
            });
        },
        // 提现保存
        tixianBaocun() {
            this.$refs.tixianNumber.validate((valid) => {
                if (valid) {
                    this.$confirm('是否确定提现金额【 ' + this.tixianNumber.money + '】', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let data = {
                            account: parseInt(this.tixianNumber.money) * 100
                        };
                        const loading = this.$loading({
                            lock: true,
                            text: '提现中 ...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        console.log(data);
                        this.$axios.post('admin/financialManagement/postWithdrawal', data).then((res) => {
                            loading.close();
                            if (res.status == 200) {
                                let datas = res.data;
                                if (datas.code == 200) {
                                    this.$message({
                                        showClose: true,
                                        message: data.msg,
                                        type: 'success'
                                    });
                                    this.getmoney();
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
                                    message: res.data.msg,
                                    type: 'error'
                                });
                            }
                        });
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 全屏事件
        enlarge() {},
        // 页面
        handleCurrentChange(val) {
            this.page = val;
            this.getFinanceData();
        },
        handleSizeChange(val) {
            this.limit = val;
            this.getFinanceData();
        },
        queryData() {
            this.page = 1;
            this.getFinanceData();
        },
        timeData(value) {
            if (value != null) {
                var date = new Date(value[0]);
                var startTime = date.getTime(date);
                var date1 = new Date(value[1]);
                var endTime = date1.getTime(date1);
                this.timeStart = startTime;
                this.timeEnd = endTime;
            } else if (value == null) {
                this.timeStart = '';
                this.timeEnd = '';
            }
        },
        getFinanceData() {
            let data = {
                companyName: '',
                endDate: this.timeEnd || 0,
                limit: this.limit,
                no: this.orderSn,
                page: this.page,
                startDate: this.timeStart || 0
            };
            this.$axios.post('admin/financialManagement/orderList', data).then((res) => {
                this.fullscreenLoading = false;
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.tableData = data.data;
                        let tableList = [];
                        data.data.forEach((val, index) => {
                            tableList[index] = val;
                            if (val.payType == 0) {
                                tableList[index].payTypeList = '未支付';
                            } else if (val.payType == 1) {
                                tableList[index].payTypeList = '支付宝';
                            } else if (val.payType == 2) {
                                tableList[index].payTypeList = '微信';
                            }
                            let date = new Date(parseInt(val.createTime));
                            var time1 =
                                date.getFullYear() +
                                '-' +
                                (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                                '-' +
                                date.getDate();
                            tableList[index].createTime = time1;
                            tableList[index].totalAmount = '￥' + val.totalAmount / 100;
                        });
                        this.tableData = tableList;
                        this.counts = data.totalCount;
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

<style>
.finance {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    background: #fafafa;
}
.caiwu-top {
    width: 100%;
    width: 100%;
}
.accounttitle {
    width: 100%;
    height: 317px;
    text-align: center;
    background: url('../../../assets/img/caiwu.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 40px 0;
    padding: 40px 0;
}
.el-input {
    width: 200px;
}
.tixianRecord {
    float: right;
    margin-right: 10px;
}
.account-num {
    text-align: center;
    width: 200px;
    margin: 0 auto;
}
.shoppyee {
    font-size: 24px;
    color: #fff;
    padding-top: 50px;
}
.account-num .numbermoney {
    font-size: 40px;
    color: #fff;
    line-height: 100px;
}
.accounttitle .tixiansss {
    background-color: #fff;
    width: 210px;
    height: 50px;
    color: #2450d2;
    font-size: 30px;
    padding: 0;
    border-radius: 50px;
    border: 3px solid #3b58ff;
}
.iconEqan {
    position: relative;
}
.iconEqan .el-tooltip {
    position: absolute;
    right: 40px;
    top: -64px;
}
.baocunfinance .finbtn {
    width: 151px;
    height: 30px;
    background: #2450d2;
    color: #ffffff;
    margin-left: 40%;
    border-radius: 8px;
    margin-top: 30px;
}

.account-xinxi .tixian-xinxi {
    margin-left: 124px;
}
.account-xinxi .jibenxinxi {
    margin-left: 200px;
}
.bank {
    margin-top: 20px;
}
.bank .bank-name {
    font-size: 14px;
    font-weight: bold;
}
.bank .bank-text {
    margin-left: 100px;
}
.jiluchaxun {
    padding-left: 30px;
    margin-top: 10px;
}

.search-tinajian .chaxunbtn {
    width: 150px;
    height: 30px;
    background: #2450d2;
    color: #ffffff;
    border-radius: 8px;
}
.search-tinajian .searchinput {
    width: 300px;
}
</style>
