<template>
    <!-- 退回列表 -->
    <div class="salesreturnList" id="salesreturnList">
        <div class="salesreturn-top">
            <h3>订单查询</h3>
            <div class="querytiaojiao">
                <el-input v-model="orderSn" class="el-input" placeholder="输入订单编号" clearable></el-input>
                <el-date-picker
                    v-model="value1"
                    class="el-date-picker"
                    type="daterange"
                    range-separator="—"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    @change="timeDate"
                ></el-date-picker>
                <el-select v-model="status" placeholder="全部申请状态" clearable>
                    <el-option
                        v-for="(item,index) in this.options"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <el-button @click="queryData" class="queryBnt">查询</el-button>
            </div>
        </div>
        <div style="width: 100%; height: 20px;"></div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="logisticsSn" align="center" label="退货单号" width="235"></el-table-column>
            <el-table-column prop="refundSn" label="退货编号" align="center" width="235"></el-table-column>
            <el-table-column prop="userName" label="客户名" align="center"></el-table-column>
            <el-table-column prop="refundMoney" label="退款金额" align="center"></el-table-column>
            <el-table-column prop="payType" label="支付方式" align="center"></el-table-column>
            <el-table-column prop="refStatus" label="申请状态" align="center"></el-table-column>
            <el-table-column prop="selRMethod" label="订单类型" align="center"></el-table-column>
            <el-table-column prop="createTime" label="申请时间" align="center"></el-table-column>
            <el-table-column label="操作" width="150" align="center">
                <template slot-scope="scope">
                    <el-button
                        @click="tuiKuanchulil(scope.row)"
                        v-if="scope.row.refundStatus == 0 || scope.row.refundStatus == 1 || scope.row.refundStatus == 2"
                        class="tab_button"
                        round
                    >退款处理</el-button>
                    <el-button v-else class="tab_button" @click="chulijieguo(scope.row)" round>处理结果</el-button>
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
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="counts"
        ></el-pagination>
    </div>
</template>


<script>
export default {
    name: 'salesreturnList',
    data() {
        return {
            orderSn: '',
            value1: '',
            status: '',
            timeStart: '',
            timeEnd: '',
            options: [
                {
                    value: 0,
                    label: '全部'
                },
                {
                    value: 1,
                    label: '待处理'
                },
                {
                    value: 2,
                    label: '退货中'
                },
                {
                    value: 3,
                    label: '已完成'
                },
                {
                    value: 4,
                    label: '已拒绝'
                }
            ],
            tableData: [],
            page: 1,
            limit: 10,
            counts: 0
        };
    },
    mounted() {
        this.getQueryTableData();
    },
    methods: {
        // 查看处理结果
        chulijieguo(row) {
            console.log(row);
            if (row.selfRaisingMethod == 2) {
                this.$router.push({
                    path: './returnMoneywuliu',
                    query: {
                        id: row.orderId,
                        status: row.refundStatus
                    }
                });
            } else {
                if (row.refundStatus == 3) {
                }
                this.$router.push({
                    path: './returnMoney',
                    query: {
                        id: row.orderId,
                        status: row.refundStatus
                    }
                });
            }
        },
        // 退款处理
        tuiKuanchulil(row) {
            if (row.selfRaisingMethod == 2) {
                this.$router.push({
                    path: './returnMoneywuliu',
                    query: {
                        id: row.orderId,
                        status: row.refundStatus
                    }
                });
            } else {
                if (row.refundStatus == 3) {
                }
                this.$router.push({
                    path: './returnMoney',
                    query: {
                        id: row.orderId,
                        status: row.refundStatus
                    }
                });
            }
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
            this.getQueryTableData();
        },
        handleSizeChange(val) {
            this.limit = val;
            this.getQueryTableData();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getQueryTableData();
        },
        getQueryTableData() {
            let data = {
                endTime: this.timeEnd || 0,
                limit: this.limit,
                no: this.orderSn,
                page: this.page,
                startTime: this.timeStart || 0,
                status: this.status || 0
            };
            console.log(data);
            this.$axios.post('admin/order/adminRefundRecordList', data).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        let tabList = [];
                        data.data.forEach((val, index) => {
                            tabList[index] = val;
                            let date = new Date(parseInt(val.createTime));
                            let time1 =
                                date.getFullYear() +
                                '-' +
                                (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                                '-' +
                                date.getDate();
                            tabList[index].createTime = time1;
                            tabList[index].refundMoney = '￥' + val.refundAmount / 100;
                            switch (val.refundStatus) {
                                case 0:
                                    tabList[index].refStatus = '待处理';
                                    break;
                                case 1:
                                    tabList[index].refStatus = '退货中';
                                    break;
                                case 2:
                                    tabList[index].refStatus = '已收货';
                                    break;
                                case 3:
                                    tabList[index].refStatus = '已收货';
                                    break;
                                case 4:
                                    tabList[index].refStatus = '已拒绝';
                                    break;
                            }
                            if (val.selfRaisingMethod == 0) {
                                tabList[index].selRMethod = '自提带走';
                            } else if (val.selfRaisingMethod == 1) {
                                tabList[index].selRMethod = '店内消费';
                            } else if (val.selfRaisingMethod == 2) {
                                tabList[index].selRMethod = '配送';
                            }
                        });
                        this.tableData = tabList;
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
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            });
        }
    }
};
</script>


<style scoped>
.salesreturnList {
    box-sizing: border-box;
    padding: 20px;
}
.salesreturn-top {
    width: 100%;
    height: 120px;
    background: #fafbfa;
    padding-left: 20px;
    padding-top: 20px;
}
.querytiaojiao {
    display: flex;
    align-items: center;
    flex-direction: row;
}
.el-input {
    width: 300px;
}
.el-date-picker {
    width: 300px;
    margin-left: 10px;
}
.querytiaojiao .queryBnt {
    width: 150px;
    height: 30px;
    background: #2450d2;
    color: #fff;
    margin-left: 10px;
}
.el-table .tab_button {
    background: #2450d2;
    color: #fff;
}
</style>