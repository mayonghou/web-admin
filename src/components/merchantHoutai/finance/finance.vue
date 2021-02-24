<template>
    <!-- 财务管理列表 -->
    <div class="finance" id="finance">
		<div class="finance-top">
			<div class="money">
				<i style="font-size: 80px; color: #fff;" class="el-icon-view"></i>
				<div class="">
					<h2>4530</h2>
					<p>入账金额</p>
				</div>
			</div>
			<div class="money">
				<i style="font-size: 80px; color: #fff;" class="el-icon-view"></i>
				<div class="">
					<h2>3000</h2>
					<p>押金金额</p>
				</div>
			</div>
		</div>
        <div class="caiwu-top">
            <div class="jiluchaxun">
                <label style="display: block;">记录查询</label>
                <div class="search-tinajian">
                    <el-input class="searchinput" v-model="orderSn" clearable placeholder="输入订单编号"></el-input>
                    <i
                        style="font-size: 22px;color: #2494D2;margin-left: 38px;margin-top: 5px; margin-right: 38px;"
                        class="el-icon-date"
                    ></i>
                    <!-- align="right" -->
                    <el-date-picker
                        v-model="time"
                        type="daterange"
                        unlink-panels
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
            <el-table-column prop="orderSn" label="流水号" align="center"></el-table-column>
            <el-table-column prop="orderSn" label="订单编号" align="center">
				<template slot-scope="scope">
					<span style="color: #42A7FF; cursor: pointer;" @click="lookOrderDetail(scope.row)">{{scope.row.orderSn}}</span>
				</template>
			</el-table-column>
            <el-table-column prop="totalAmount" label="平台扣除(3%)" align="center"></el-table-column>
            <el-table-column prop="totalAmount" label="代言客服扣除(3%)" align="center"></el-table-column>
            <el-table-column prop="totalAmount" label="代言企业扣除(3%)" align="center"></el-table-column>
            <el-table-column prop="totalAmount" label="入账金额" align="center"></el-table-column>
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
            moneydatasdda: 10, //平台服务费占比 10%
            tixianNumber: {
                money: '',
                realitymoney: ''
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
        // this.getmoney();
    },
    methods: {
		// 查看订单详情
		lookOrderDetail(row){
			
		},
        // 计算实际到账金额
        realityMoney(value) {
            this.$axios.get('admin/financialManagement/accountBalance').then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        let moneyData = data.data / 100;
                        if (value > moneyData) {
                            return this.$message({
                                showClose: true,
                                message: '提现金额不能大于余额',
                                type: 'error'
                            });
                        } else {
                            this.tixianNumber.realitymoney = this.tixianNumber.money - (value * this.moneydatasdda) / 100;
                            console.log(value);
                            console.log((value * 10) / 100);
                        }
                    }
                }
            });
        },
        tixianjilu() {
            this.$router.push({
                path: './moneyNumber'
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
    /* padding: 20px; */
    /* background: #fafafa; */
}
.caiwu-top {
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
    width: 100%;
}
.account-num .shoppyee {
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
.search-tinajian {
    display: flex;
    align-items: center;
}
.search-tinajian .chaxunbtn {
    width: 150px;
    height: 30px;
    background: #2450d2;
    color: #ffffff;
    border-radius: 8px;
    padding: 0;
    margin-left: 10px;
}
.search-tinajian .searchinput {
    width: 300px;
}
.number {
    color: #000;
}
.promptMessage {
    width: 100%;
    /* margin-left: 43%; */
    text-align: right;
    color: #ff8d00;
    padding-right: 11%;
}
/* .realitymoney .el-input__inner {

} */
.realitymoney.is-disabled .el-input__inner {
    background: #fff;
    color: #000;
    border: 0;
}
.prMessage {
    width: 100%;
    text-align: right;
    color: #ff8d00;
}
.el-input__inner {
    height: 30px;
    line-height: 30px;
}
.el-date-editor .el-range-separator {
    line-height: 24px;
}
.finance-top{
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.finance-top .money{
	width: 20%;
	height: 90px;
	min-width: 260px;
	background-color: #42A7FF;
	border-radius: 4px;
	display: flex;
	align-items: center;
	color: #fff;
	justify-content: space-around;
}
</style>
