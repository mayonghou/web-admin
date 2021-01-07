<template>
    <div
        id="order"
        class="order"
        v-loading="fullscreenLoading"
        :element-loading-text="loadingText"
        element-loading-background="rgba(0, 0, 0, 0.7)"
    >
        <div class="order-top">
            <div class="rent-top">
                <label>订单查询</label>
            </div>
            <div class="reat-search">
                <el-input v-model="input" class="input-width" placeholder="输入订单编号"></el-input>
                <i
                    style="font-size: 22px;color: #2494D2;margin-left: 20px;margin-top: 5px; margin-right: 20px;"
                    class="el-icon-date"
                ></i>
                <el-date-picker
                    prefix-icon="md-date_range"
                    v-model="time"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    @change="templateTime"
                ></el-date-picker>
                <el-select class="select-el" v-model="value" placeholder="全部订单状态" clearable>
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <el-select class="select-el" v-model="reatState" placeholder="全部配送类型" clearable>
                    <el-option
                        v-for="item in reatStates"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <el-button @click="orderChaxun" class="query">查询</el-button>
            </div>
        </div>
        <div class="text-button"></div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" align="center" label="序号"></el-table-column>
            <el-table-column prop="orderSn" label="订单编号" align="center" width="260"></el-table-column>
            <el-table-column prop="userName" label="客户名" align="center"></el-table-column>
            <el-table-column prop="payAmount" label="订单金额" align="center">
                <template slot-scope="scope">
                    <label>￥{{scope.row.payAmount / 100}}</label>
                </template>
            </el-table-column>
            <el-table-column prop="payType" label="支付方式" align="center"></el-table-column>
            <el-table-column prop="groupDTO" label="订单类型" align="center">
                <template slot-scope="scope">
                    <label>{{scope.row.groupDTO == null?'普通订单':scope.row.groupDTO.status == 1? '团购订单(未成团)':'团购订单(已成团)'}}</label>
                </template>
            </el-table-column>
            <el-table-column prop="statusName" label="订单状态" align="center"></el-table-column>
            <el-table-column prop="pickupMethodName" label="配送类型" align="center"></el-table-column>
            <el-table-column prop="createTime" label="下单时间" align="center"></el-table-column>
            <el-table-column label="操作" width="220" align="center">
                <template slot-scope="scope">
                    <el-button @click="btn_detail(scope.row)" class="tab_button">查看详情</el-button>
                    <el-button
                        @click="del_enterprise(scope.row)"
                        v-if="scope.row.status == 3 || scope.row.status == 4 || scope.row.status == 5"
                        class="del_button"
                    >删除</el-button>
                    <el-button
                        @click="lijifahuodata(scope.row)"
                        v-if="scope.row.pickupMethodName != '自提带走' && scope.row.status == 1"
                        class="bj_button"
                    >立即发货</el-button>
                    <el-button
                        @click="chakanwuliu(scope.row)"
                        v-if="scope.row.status == 2 && scope.row.pickupMethodName != '自提带走' && scope.row.pickupMethod == 1"
                        class="bj_button"
                    >查看物流</el-button>
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
        <!-- 立即发货 -->
        <el-dialog title="立即发货" :visible.sync="dialogVisibleake" width="50%">
            <div class="iconEnlorder" @click="enlarge">
                <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                    <i class="iconfont icon-quanping"></i>
                </el-tooltip>
            </div>
            <el-form :model="lijifahuo" :rules="rules" ref="lijifahuo">
                <el-form-item label="选择发货方式:" prop="radio" :label-width="formLabelWidth">
                    <el-radio v-model="lijifahuo.radio" label="0" value="0">商家自送</el-radio>
                    <el-radio v-model="lijifahuo.radio" label="1" value="1">物流配送</el-radio>
                </el-form-item>
                <el-form-item
                    label="输入该订单的发货物流单号:"
                    v-if="lijifahuo.radio == 1"
                    prop="wuliupeisong"
                    :label-width="formLabelWidth"
                >
                    <el-input v-model="lijifahuo.wuliupeisong" placeholder="物流单号"></el-input>
                </el-form-item>
                <el-form-item
                    label="备注信息:"
                    v-if="lijifahuo.radio == 1"
                    prop="beizuxinxi"
                    :label-width="formLabelWidth"
                >
                    <el-input v-model="lijifahuo.beizuxinxi" type="textarea" placeholder="物流单号"></el-input>
                </el-form-item>
            </el-form>
            <div class="dialog-footer">
                <el-button @click="addkehuleixingsz" class="fahuo">发货</el-button>
            </div>
        </el-dialog>
        <!-- 查看物流 -->
        <el-dialog title="查看物流" :visible.sync="dialogVisibleakechakanwuliu" width="50%">
            <div class="iconEnlorder" @click="enlarge">
                <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                    <i class="iconfont icon-quanping"></i>
                </el-tooltip>
            </div>
            <div class="divwuliu">
                <label>物流单号：</label>
                <label>{{this.deliverySn}}</label>
                <i @click="copy" class="copy iconfont icon-shuji"></i>
            </div>
            <div class="divwuliu">
                物流状态：
                <el-timeline>
                    <el-timeline-item
                        v-for="(activity, index) in activities"
                        :key="index"
                        :icon="activity.icon"
                        :type="activity.type"
                        :color="activity.color"
                        :size="activity.size"
                        :timestamp="activity.timestamp"
                    >{{activity.content}}</el-timeline-item>
                </el-timeline>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'order',
    data() {
        return {
            input: '',
            time: '',
            value: '',
            formLabelWidth: '200px',
            reatState: '',
            dialogVisibleakechakanwuliu: false,
            fullscreenLoading: true,
            loadingText: '加载中...',
            activities: [
                {
                    content: '支持使用图标',
                    timestamp: '2018-04-12 20:46',
                    size: 'large',
                    type: 'primary',
                    icon: 'el-icon-more'
                },
                {
                    content: '支持自定义颜色',
                    timestamp: '2018-04-03 20:46',
                    color: '#0bbd87'
                },
                {
                    content: '支持自定义尺寸',
                    timestamp: '2018-04-03 20:46',
                    size: 'large'
                },
                {
                    content: '默认样式的节点',
                    timestamp: '2018-04-03 20:46'
                }
            ],
            fullscreen: '',
            dialogVisibleake: false,
            tableData: [],
            lijifahuo: {
                radio: '',
                wuliupeisong: '',
                beizuxinxi: ''
            },
            rules: {
                fahuofangshe: [
                    {
                        required: true,
                        message: '请选择发货方式',
                        trigger: 'change'
                    }
                ],
                radio: [
                    {
                        required: true,
                        message: '请选择发货方式',
                        trigger: 'change'
                    }
                ],
                wuliupeisong: [
                    {
                        required: true,
                        message: '请输入物流单号',
                        trigger: 'change'
                    }
                ],
                beizuxinxi: [
                    {
                        required: true,
                        message: '请输入物流单号',
                        trigger: 'change'
                    }
                ]
            },
            reatStates: [
                {
                    value: 0,
                    label: '物流配送'
                },
                {
                    value: 1,
                    label: '到店消费'
                },
                {
                    value: 2,
                    label: '自提带走'
                },
                {
                    value: 3,
                    label: '商家自送'
                }
            ],
            options: [
                {
                    value: 0,
                    label: '未支付'
                },
                {
                    value: 1,
                    label: '待发货'
                },
                {
                    value: 2,
                    label: '待收货'
                },
                {
                    value: 3,
                    label: '待核销'
                },
                {
                    value: 4,
                    label: '待消费'
                },
                {
                    value: 5,
                    label: '交易成功'
                },
                {
                    value: 6,
                    label: '申请退款'
                },
                {
                    value: 7,
                    label: '退款中'
                },
                {
                    value: 8,
                    label: '已退款'
                },
                {
                    value: 9,
                    label: '订单关闭'
                }
            ],
            page: 1,
            limit: 10,
            counts: this.counts,
            ordersId: '',
            userName: '',
            startTime: '',
            endTime: '',
            deliverySn: ''
        };
    },
    mounted() {
        this.postAdminQueryOrderList();
    },
    methods: {
        enlarge() {},
        lijifahuodata(row) {
            this.dialogVisibleake = true;
            this.ordersId = row.orderId;
            this.userName = row.userName;
        },
        // 查看详情
        btn_detail(row) {
            this.$router.push({
                path: './orderDetail',
                query: {
                    id: row.orderId,
                    data: row
                }
            });
        },
        templateTime(value) {
            if (value != null) {
                this.startTime = value[0];
                this.endTime = value[1];
            } else if (value == null) {
                this.startTime = '';
                this.endTime = '';
            }
        },
        // 删除订单
        del_enterprise(row) {
            this.$confirm('是否确定删除 【 ' + row.userName + ' 】 的订单?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    let data = {
                        id: row.I_RNID
                    };
                    const loading = this.$loading({
                        lock: true,
                        text: '删除中...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.$axios.get('admin/order/order/delOrder?orderId=' + row.orderId).then((res) => {
                        loading.close();
                        if (res.status == 200) {
                            var data = res.data;
                            if (data.code == 200) {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'success'
                                });
                                this.postAdminQueryOrderList();
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
                })
                .catch((err) => {});
        },
        // 页码
        handleSizeChange(val) {
            this.limit = val;
            this.postAdminQueryOrderList();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.postAdminQueryOrderList();
        },
        // 发货按钮
        addkehuleixingsz() {
            this.$refs.lijifahuo.validate((valid) => {
                if (valid) {
                    this.$confirm('是否确定对客户 【 ' + this.userName + ' 】 的订单进行发货?', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                        .then(() => {
                            let data = {
                                sendGoodsType: this.lijifahuo.radio,
                                orderId: this.ordersId,
                                note: this.lijifahuo.beizuxinxi,
                                sendGoodsNo: this.lijifahuo.wuliupeisong
                            };
                            const loading = this.$loading({
                                lock: true,
                                text: '发货中...',
                                spinner: 'el-icon-loading',
                                background: 'rgba(0, 0, 0, 0.7)'
                            });
                            this.$axios.post('admin/order/order/sendGoods', data).then((res) => {
                                loading.close();
                                if (res.status == 200) {
                                    var data = res.data;
                                    if (data.code == 200) {
                                        this.$message({
                                            showClose: true,
                                            message: data.msg,
                                            type: 'success'
                                        });
                                        this.dialogVisibleake = false;
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
                        })
                        .catch((err) => {});
                }
            });
        },
        copy() {
            document.execCommand('Copy');
            if (document.execCommand('Copy')) {
                this.$message({
                    showClose: true,
                    message: '复制成功',
                    type: 'success'
                });
            } else {
                this.$message({
                    showClose: true,
                    message: '复制失败',
                    type: 'error'
                });
            }
        },
        // 查看物流
        chakanwuliu(row) {
            this.$axios.get('admin/order/adminQueryOrderInfo?orderId=' + row.orderId).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.deliverySn = data.data.orderInfo.deliverySn;
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
            this.dialogVisibleakechakanwuliu = true;
        },
        // 查询按钮
        orderChaxun() {
            this.page = 1;
            this.postAdminQueryOrderList();
        },
        // 查询订单管理列表
        postAdminQueryOrderList() {
            let data = {
                startTime: this.startTime,
                endTime: this.endTime,
                limit: this.limit,
                page: this.page,
                orderSn: this.input,
                orderStatus: this.value,
                orderType: this.reatState
            };
            this.$axios.post('admin/order/adminQueryOrderList', data).then((res) => {
                this.fullscreenLoading = false;
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        var ListAd = [];
                        var ddd = '';
                        data.data.dataList.forEach(function (val, index) {
                            ListAd[index] = val;
                            switch (val.payType) {
                                case 0:
                                    ddd = '未支付';
                                    break;
                                case 1:
                                    ddd = '支付宝';
                                    break;
                                case 2:
                                    ddd = '微信';
                                    break;
                            }
                            ListAd[index].groupDTO = val.groupDTO;
                            ListAd[index].payType = ddd;
                        });
                        this.tableData = ListAd;
                        this.counts = data.data.totalCount;
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
.order {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
}
.divwuliu {
    margin-top: 20px;
    margin-left: 20%;
}

.order-top .query {
    width: 150px;
    height: 30px;
    background-color: #2450d2;
    color: #fff;
    margin-left: 10px;
}
.copy {
    cursor: pointer;
}
.el-select {
    margin-left: 10px;
}

.select-el .el-input__inner {
    width: 200px;
}

.el-timeline {
    margin-left: 10%;
}

.iconEnlorder {
    position: relative;
}

.iconEnlorder .iconfont {
    position: absolute;
    top: -65px;
    right: 30px;
}
.order .dialog-footer {
    width: 100%;
    text-align: center;
}
.order .dialog-footer .fahuo {
    width: 151px;
    height: 30px;
    color: #ffffff;
    border-radius: 8px;
    background: #2450d2;
    margin-top: 50px;
}

.order-top {
    width: 100%;
    height: 114px;
    margin: 0 auto;
    background-color: #fafbfa;
    padding-left: 20px;
    line-height: 40px;
}

.order-top .rent-top {
    font-size: 14px;
}

.reat-search .search {
    width: 220px;
    height: 30px;
    float: left;
}

.reat-search .time {
    float: left;
    margin-left: 38px;
}

.reat-search .select {
    float: left;
}

.input-width {
    width: 200px;
}

.el-date-editor {
    width: 260px;
}

.select .el-select {
    width: 131px;
    margin-left: 10px;
}

.reat-search .button {
    float: left;
    width: 150px;
    height: 30px;
    margin-left: 10px;
}

.button .el-button {
    width: 150px;
    background-color: #2450d2;
    border-radius: 8px;
}

.text-button {
    margin-top: 8px;
    margin-bottom: 10px;
}

.text-button .button {
    text-align: right;
    padding: 0;
    margin: 0;
}

.text-button .button .el-button {
    width: 104px;
}

.el-table .el_button {
    font-size: 10px;
}

.order .el-table .tab_button {
    background-color: #2450d2;
    width: auto;
    height: 30px;
    font-size: 14px;
    color: #fff;
    line-height: 0px;
    font-size: 8px;
    border-radius: 30px;
    padding: 0 15px;
}

.el-table .bj_button {
    background-color: #109955;
    width: auto;
    height: 30px;
    font-size: 14px;
    color: #fff;
    font-size: 8px;
    border-radius: 30px;
    padding: 0 15px;
}

.el-table .del_button {
    background-color: #ff0000;
    width: auto;
    height: 30px;
    font-size: 14px;
    color: #fff;
    line-height: 0px;
    font-size: 8px;
    border-radius: 30px;
    padding: 0 15px;
}

.el-textarea__inner {
    width: 500px;
    height: 150px;
}
</style>
