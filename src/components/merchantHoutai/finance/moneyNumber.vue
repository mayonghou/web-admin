<template>
    <!-- 财务管理列表 -->
    <div class="financeNum" id="moneyNumber">
        <div class="caiwu-top">
            <div class="jiluchaxun">
                <label style="display: block;">记录查询</label>
                <div class="search-tinajian">
					<el-input v-model="liushuihao" style="width:200px;" placeholder="请输入流水号"></el-input>
					<el-input v-model="companyName" style="width:200px;margin-left: 10px;" placeholder="请输入企业名称"></el-input>
					<span style="margin-left: 10px;">退款时间：</span>
                    <el-date-picker
                        v-model="time"
                        type="daterange"
                        unlink-panels
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        @change="timeDate"
                    ></el-date-picker>
                   <!-- <el-select
                        v-model="optionsStatus"
                        style="margin-left:20px;"
                        placeholder="请选择提现状态"
                        clearable
                    >
                        <el-option
                            v-for="(item, index) in options"
                            :key="index"
                            :label="item.name"
                            :value="item.index"
                        ></el-option>
                    </el-select> -->
                    <el-button @click="queryData" class="chaxunbtn">查询</el-button>
                </div>
            </div>
        </div>
        <div style="height: 30px;"></div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" prop label="序号" align="center" width="80"></el-table-column>
            <el-table-column prop="withAccount" label="流水号" align="center"></el-table-column>
            <el-table-column prop="withAccount" label="订单编号" align="center"></el-table-column>
            <el-table-column prop="withAccount" label="企业" align="center"></el-table-column>
            <el-table-column prop="withAccount" label="金额" align="center"></el-table-column>
            <el-table-column prop="serviceCharge" label="退款用户" align="center"></el-table-column>
            <el-table-column prop="handleTime" label="处理时间" align="center"></el-table-column>

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
       <!-- <el-dialog title="提现申请详情" :visible.sync="dialogFormVisible">
            <el-form :model="tixianNumber">
                <el-form-item label="提现企业:" prop="company" :label-width="formLabelWidth">
                    <label>{{tixianNumber.company}}</label>
                </el-form-item>
                <el-form-item label="提现金额:" prop="money" :label-width="formLabelWidth">
                    <label>{{tixianNumber.money}}</label>
                </el-form-item>
                <el-form-item label="状态:" prop="status" :label-width="formLabelWidth">
                    <label>{{tixianNumber.status}}</label>
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
        </el-dialog> -->
    </div>
</template>

<script>
export default {
    name: 'moneyNumber',
    data() {
        return {
            time: '',
            tableData: [],
			liushuihao:'',
			companyName:'',
            page: 1,
            limit: 10,
            counts: 0,
            formLabelWidth: '300px',
            optionsStatus: '',
            dialogFormVisible: false,
            companyData: {},
            options: [
                {
                    index: 0,
                    name: '全部'
                },
                {
                    index: 1,
                    name: '审核中'
                },
                {
                    index: 2,
                    name: '已提现'
                },
                {
                    index: 3,
                    name: '未通过'
                }
            ],
            tixianNumber: {
                company: '',
                money: '',
                status: ''
            },
            timeStart: '',
            timeEnd: ''
        };
    },
    mounted() {
        this.getFinanceDataList();
    },

    methods: {
        // 查看详情
        lookdetailmoney(row) {
            this.tixianNumber.company = row.accountName;
            this.tixianNumber.money = row.withAccount;
            this.tixianNumber.status = row.handlename;
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
        // 页面
        handleCurrentChange(val) {
            this.page = val;
            this.getFinanceDataList();
        },
        handleSizeChange(val) {
            this.limit = val;
            this.getFinanceDataList();
        },
        timeDate(value) {
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
        queryData() {
            this.page = 1;
            this.getFinanceDataList();
        },
        getFinanceDataList() {
            let data = {
                companyName: '',
                endTime: this.timeEnd || 0,
                flowNo: '',
                limit: this.limit,
                page: this.page,
                startTime: this.timeStart || 0,
                status: this.optionsStatus || 0,
                type: 1
            };
            this.$axios.post('admin/financialManagement/withdrawalRecord', data).then((res) => {
                this.fullscreenLoading = false;
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.tableData = data.data;
                        let tabData = [];
                        data.data.forEach((val, index) => {
                            tabData[index] = val;
                            tabData[index].withAccount = '￥' + val.withdrawAccount / 100;
                            tabData[index].serviceCharge = '￥' + val.serviceCharge / 100;
                            tabData[index].incomeAccount = '￥' + val.incomeAccount / 100;
                            if (val.handleStatus == 0) {
                                tabData[index].handlename = '处理中';
                            } else if (val.handleStatus == 1) {
                                tabData[index].handlename = '通过';
                            } else if (val.handleStatus == 2) {
                                tabData[index].handlename = '拒绝';
                            }
                            let date = new Date(parseInt(val.createTime));
                            var time1 =
                                date.getFullYear() +
                                '-' +
                                (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                                '-' +
                                date.getDate();
                            tabData[index].createTime = time1;
                            let date2 = new Date(parseInt(val.entryTime));
                            var time2 =
                                date2.getFullYear() +
                                '-' +
                                (date2.getMonth() + 1 < 10 ? '0' + (date2.getMonth() + 1) : date2.getMonth() + 1) +
                                '-' +
                                date2.getDate();
                            tabData[index].handleTime = time2;
                        });
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
.financeNum {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
}
.financeNum .caiwu-top {
    width: 100%;
    height: 110px;
    background-color: #faffe0;
    margin-top: 20px;
    padding-top: 20px;
}
.account {
    width: 100%;
    height: 120px;
    background-color: #f1fafd;
    text-align: center;
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
    font-size: 18px;
    color: #101010;
    padding-top: 10px;
}
.number {
    font-size: 14px;
    color: #ff8d00;
    line-height: 58px;
}
.account .tixian {
    width: 95px;
    height: 80px;
    color: #fff;
    padding: 0;
    background-color: #2450d2;
    border-radius: 8px;
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
	
    padding-left: 20px;
}
.search-tinajian{
	display: flex;
	flex-direction: row;
	align-items: center;
}

.search-tinajian .chaxunbtn {
    width: 150px;
    height: 30px;
    background: #2450d2;
    color: #ffffff;
    margin-left: 40px;
    border-radius: 8px;
	padding: 0;
}
.el-table .lookdetail {
    background: #4985f0;
    color: #fff;
}
.el-input__inner {
    height: 30px;
    line-height: 30px;
}
.el-date-editor .el-range-separator {
    line-height: 24px;
}
</style>
