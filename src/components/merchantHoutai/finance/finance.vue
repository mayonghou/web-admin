<template>
    <!-- 财务管理列表 -->
    <div class="finance" id="finance">
        <div class="caiwu-top">
            <div class="account">
                <el-button class="tixianRecord" type="text">提现记录</el-button>
                <div class="account-num">
                    <div class="shoppyee">
                        <label>商户当前余额</label>
                    </div>
                    <div class="number">
                        <label>￥5200000520</label>
                        <i style="margin-left: 10px;" class="iconfont icon-ai-eye"></i>
                    </div>
                    <el-button @click="tixannum" class="tixian">提现</el-button>
                </div>
            </div>
            <div class="jiluchaxun">
                <label style="display: block;">记录查询</label>
                <div class="search-tinajian">
                    <el-input class v-model="orderSn" placeholder="输入订单编号"></el-input>
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
        <el-table :data="tableData" style="width: 1200px;margin: 0 auto;">
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
            :page-sizes="[5, 10, 15, 20]"
            :page-size="5"
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
                        <label class="bank-text">中国工商银行</label>
                    </div>
                    <div class="bank">
                        <label class="bank-name">开户网点：</label>
                        <label class="bank-text">贵州贵阳观山湖区支行</label>
                    </div>
                    <div class="bank">
                        <label class="bank-name">账号名称：</label>
                        <label class="bank-text">贵州万疆烽火科技有限公司</label>
                    </div>
                    <div class="bank">
                        <label class="bank-name">收款账号：</label>
                        <label class="bank-text">3256413189481894843452</label>
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
            limit: 20,
            counts: 0,
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
    mounted() {},
    methods: {
        tixannum() {
            this.dialogFormVisible = true;
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
        },
        handleSizeChange(val) {
            this.limit = val;
        }
    }
};
</script>

<style>
.finance {
    width: 1200px;
    margin: 0 auto;
}
.caiwu-top {
    width: 100%;
    height: 230px;
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
