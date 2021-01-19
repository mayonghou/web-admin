<template>
    <!-- 财务管理列表 -->
    <div class="financeNum" id="moneyNumber">
        <div class="caiwu-top">
            <div class="jiluchaxun">
                <label style="display: block;">记录查询</label>
                <div class="search-tinajian">
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
                    ></el-date-picker>
                    <el-button class="chaxunbtn">查询</el-button>
                </div>
            </div>
        </div>
        <div style="height: 30px;"></div>
        <el-table :data="tableData" style="width: 100%;" border>
            <el-table-column type="index" prop label="序号" align="center" width="80"></el-table-column>
            <el-table-column type="seleection" prop label="序号" align="center" width="80"></el-table-column>
            <el-table-column prop="withAccount" label="提现金额" align="center"></el-table-column>
            <el-table-column prop="handlename" label="提现状态" align="center"></el-table-column>
            <el-table-column prop="createTime" label="申请时间" align="center"></el-table-column>
            <el-table-column prop="handleTime" label="处理时间" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button @click="lookdetailmoney(scope.row)" class="lookdetail" round>查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 页码 -->
        <el-pagination
            class="pagintion"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="20"
            layout="total, sizes, prev, pager, next, jumper"
            :total="counts"
        ></el-pagination>
    </div>
</template>

<script>
export default {
    name: 'moneyNumber',
    data() {
        return {
            time: '',
            tableData: [],
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
                            console.log('jdsifojdsoi');
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
    margin-top: 10px;
}
.search-tinajian {
    margin-top: 10px;
}
.search-tinajian .chaxunbtn {
    width: 150px;
    height: 30px;
    background: #2450d2;
    color: #ffffff;
    margin-left: 40px;
    border-radius: 8px;
}
</style>
