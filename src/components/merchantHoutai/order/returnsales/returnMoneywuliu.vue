<template>
    <!-- 退货处理 -->
    <div class="reuturnsteps" id="reuturnsteps">
        <div class="returnTitles" v-if="this.active == 0">
            <h2>用户发起退款，请及时处理</h2>
            <p class="shengyutime">还剩{{this.timelistData}}</p>
            <p class="shengyucolor">请及时处理退款信息，若超时未处理，将自动进行退货退款流程。请和买家确认退货事宜，若拒绝，请备注拒绝原由。</p>
        </div>
        <div class="returnTitles" v-if="this.active == 1">
            <h2>已同意退款，等待买家退货</h2>
            <p class="shengyutime">还剩{{this.timelistData}}</p>
            <p class="shengyucolor">请与买家保持沟通一致，若买家超时未寄回，退款将自动取消。</p>
        </div>
        <div class="returnTitles" v-if="this.active == 2">
            <h2>买家退货已寄出，请注意查收并确认收货</h2>
            <p class="shengyutime">还剩{{this.timelistData}}</p>
            <p class="shengyucolor">请与买家保持沟通一致，若买家超时未寄回，退款将自动取消，若超时未确认收货，将自动进入下个流程。</p>
        </div>
        <div class="returnTitles" v-if="this.active == 3">
            <h2>您已确认寄回，请发起退款</h2>
            <p class="shengyutime">还剩{{this.timelistData}}</p>
            <p class="shengyucolor">如果您超时未处理，将自动退款给买家。如果您拒绝退款，则买家修改退款申请后需要继续退款。</p>
        </div>
        <div class="returnTitles" v-if="this.active ==4">
            <h2>退货成功</h2>
            <p class="shengyutime">将按以下流程退回 se**** 的微信账户</p>
            <p class="shengyucolor">
                <span>卖家退款 —— 银行处理 —— 退款成功</span>
            </p>
        </div>
        <div>
            <el-steps
                :active="active"
                finish-status="success"
                v-if="this.active != 4"
                align-center
                process-status="finish"
            >
                <el-step title="提交申请"></el-step>
                <el-step title="商家处理"></el-step>
                <el-step title="确认寄回"></el-step>
                <el-step title="商家退款"></el-step>
                <el-step title="退款成功"></el-step>
            </el-steps>
        </div>

        <div class="returnAddress">
            <h2>退货商品</h2>
            <span style="margin-left: 20px; color:#409EFF;">{{this.activename}}</span>
        </div>
        <div class="tableList">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="imgUrl" label="商品图片" align="center">
                    <template slot-scope="scope">
                        <img :src="scope.row.imgUrl" width="80" height="80" />
                    </template>
                </el-table-column>
                <el-table-column prop="productDTO.name" label="商品名称" align="center"></el-table-column>
                <el-table-column prop="price" label="原价" align="center">
                    <template slot-scope="scope">
                        <span>￥{{scope.row.productDTO.price / 100}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="属性" align="center"></el-table-column>
                <el-table-column prop="buyNum" label="数量" align="center"></el-table-column>
                <el-table-column prop="address" label="总金额" align="center">
                    <template slot-scope="scope">
                        <span>￥{{scope.row.totalAmount / 100}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="returnAddress">
            <h2>退货地址设置</h2>
        </div>
        <div class="BusinessAddressdddd">
            <div class="busadd">
                <div class="consignee">
                    <span style="font-size:24px; font-weight: bold;">收货人：</span>
                    <span style="font-size:24px;">{{this.consignee.receiver}}</span>
                </div>
                <div class="consignee">
                    <span style="font-size:24px; font-weight: bold;">联系电话：</span>
                    <span style="font-size:24px;">{{this.consignee.phone}}</span>
                </div>
                <div class="consignee">
                    <span style="font-size:24px; font-weight: bold;">收货地址：</span>
                    <span style="font-size:24px;">{{this.consignee.detailedAddress}}</span>
                </div>
                <el-button
                    type="text"
                    v-if="this.active == 0 && this.consignee.receiver == ''"
                    class="editAddress"
                    @click="editAddress"
                >编辑收货地址</el-button>
            </div>

            <el-card class="el-cards" v-if="this.active != 0">
                <div v-if="this.active == 1" class="tuihuodada">
                    <div style="font-size: 20px;">等待买家退货</div>
                    <div style="font-size: 12px;">暂无物流单号</div>
                </div>
                <div v-if="this.active > 1" class="tuihuodatta">
                    <div class="dsdsadsadsa">
                        <div style="font-size: 20px;">买家已寄回</div>
                        <div style="font-size: 12px;">
                            <span>物流单号：</span>
                            <span>156498354834445</span>
                        </div>
                    </div>
                    <el-button class="lookdetailddd" @click="lookDateilwuliu" round>查看详情</el-button>
                </div>
            </el-card>
        </div>
        <div class="returnAddress">
            <h2>退款信息</h2>
        </div>
        <el-form :model="tuikuanginfo">
            <el-form-item label="货物状态：" label-width="200px">
                <label>{{tuikuanginfo.huowustatus ==0?'未收到货物':'已收到货物'}}</label>
            </el-form-item>
            <el-form-item label="退款原因：" label-width="200px">
                <label>{{tuikuanginfo.huowuyuanyin}}</label>
            </el-form-item>
            <el-form-item label="退款数量：" label-width="200px">
                <label>{{tuikuanginfo.numberret}}</label>
            </el-form-item>
            <el-form-item label="退款金额：" label-width="200px">
                <label>{{tuikuanginfo.huowuMoney / 100}}</label>
            </el-form-item>
            <el-form-item label="退款凭证：" label-width="200px">
                <img width="280" height="180" :src="tuikuanginfo.goodsPic" />
            </el-form-item>
        </el-form>
        <div class="returnAddress">
            <h2>订单信息</h2>
        </div>
        <el-form :model="orderinfo">
            <el-form-item label="订单编号：" label-width="200px">
                <label>{{orderinfo.orderSn}}</label>
            </el-form-item>
            <el-form-item label="退款编号：" label-width="200px">
                <label>{{orderinfo.tuiKuangSn}}</label>
            </el-form-item>
            <el-form-item label="客户名：" label-width="200px">
                <label>{{orderinfo.userName}}</label>
            </el-form-item>
            <el-form-item label="联系电话：" label-width="200px">
                <label>{{orderinfo.phone}}</label>
            </el-form-item>
            <el-form-item label="申请时间：" label-width="200px">
                <label>{{orderinfo.applyTime}}</label>
            </el-form-item>
        </el-form>
        <div class="returnmoneyBtn" v-if="this.active == 0">
            <el-button class="jujuetuikuan" @click="refusetuikuang">拒绝退货</el-button>
            <el-button class="quedingtuikuan" @click="confirmBtn">确认退货</el-button>
        </div>
        <div class="returnmoneyBtn" v-if="this.active == 2">
            <el-button class="jujuetuikuan" @click="yangchangTime">延长收货时间</el-button>
            <el-button class="quedingtuikuan" @click="quedingshouhuo">确认收货</el-button>
        </div>
        <div class="returnmoneyBtn" v-if="this.active == 3">
            <el-button class="jujuetuikuan" @click="refuseBtn">拒绝退款</el-button>
            <el-button class="quedingtuikuan" @click="faqituikuan">发起退款</el-button>
        </div>

        <el-dialog title="编辑退货地址" :visible.sync="dialogVisible" width="50%">
            <el-form :model="addressdata">
                <el-form-item label="收货人：" label-width="300px">
                    <el-input
                        class="el-inputdata"
                        v-model="addressdata.receiver"
                        placeholder="请输入收货人姓名"
                    ></el-input>
                </el-form-item>
                <el-form-item label="联系电话：" label-width="300px">
                    <el-input
                        class="el-inputdata"
                        v-model="addressdata.phone"
                        placeholder="请输入联系电话"
                    ></el-input>
                </el-form-item>
                <el-form-item label="收货地址：" label-width="300px">
                    <el-input
                        class="el-inputdata"
                        v-model="addressdata.detailedAddress"
                        placeholder="请输入收货地址"
                    ></el-input>
                </el-form-item>
                <el-form-item label-width="350px">
                    <el-button class="el-buttonRetrun" @click="baocunaddress">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="拒绝退款" :visible.sync="dialogVisiblerefuse" width="50%">
            <el-form :model="refuseData" :rules="rules">
                <el-form-item label-width="200px" label="填写拒绝原因：" prop="refuseCause ">
                    <el-input
                        v-model="refuseData.refuseCause"
                        type="textarea"
                        class="textarealist"
                        placeholder="请填写拒绝原因"
                    ></el-input>
                </el-form-item>
                <el-form-item label-width="350px">
                    <el-button class="jujuetuikuanlist" @click="refundBtn">拒绝退款</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="拒绝退款" :visible.sync="dialogVisiblerefusedata" width="50%">
            <el-form :model="refuseDatalist" :rules="rules">
                <el-form-item label-width="200px" label="填写拒绝原因：" prop="refuseCause ">
                    <el-input
                        v-model="refuseDatalist.refuseCause"
                        type="textarea"
                        class="textarealist"
                        placeholder="请填写拒绝原因"
                    ></el-input>
                </el-form-item>
                <el-form-item label-width="350px">
                    <el-button class="jujuetuikuanlist" @click="refundBtndata">拒绝退款</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="延长收货时间" :visible.sync="dialogVisibleDate" width="50%">
            <div class="yangcbabe">
                <div style="font-size: 20px;">延长收货时间</div>
                <div>只能延长1次，时间为3天</div>
                <div class="yanchangTimeBtn">
                    <el-button type="primary" @click="dialogVisibleDate = false">取消</el-button>
                    <el-button type="primary" @click="quedingyanshi">确定延长</el-button>
                </div>
            </div>
        </el-dialog>
        <el-dialog title="查看物流" :visible.sync="dialogVisiblewuliu" width="50%">
            <el-form :model="liuliuxinxi">
                <el-form-item label="物流单号：" label-width="300px">
                    <span>{{liuliuxinxi.logisticsSn}}</span>
                </el-form-item>
                <el-form-item label="物流公司：" label-width="300px">
                    <span>{{liuliuxinxi.logisticsCompany}}</span>
                </el-form-item>
                <el-form-item label="联系电话：" label-width="300px">
                    <span>{{liuliuxinxi.telephone}}</span>
                </el-form-item>
                <el-form-item label="退货备注：" label-width="300px">
                    <span>{{liuliuxinxi.refundExplain}}</span>
                </el-form-item>
                <el-form-item label="上传凭证：" label-width="300px">
                    <img width="280" height="150" :src="liuliuxinxi.voucherPic" />
                </el-form-item>
                <el-form-item label-width="380px">
                    <el-button type="primary" @click="dialogVisiblewuliu = false">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'reuturnsteps',
    data() {
        return {
            active: 0,
            tableData: [],
            dialogVisible: false,
            dialogVisiblerefuse: false,
            dialogVisibleDate: false,
            dialogVisiblewuliu: false,
            dialogVisiblerefusedata: false,
            orderId: '',
            createTime: '',
            timeLimit: '',
            timelistData: '',
            type: '',
            refuseData: {
                refuseCause: ''
            },
            refuseDatalist: {
                refuseCause: ''
            },
            rules: {
                refuseCause: [
                    {
                        required: true,
                        message: '请输入退款原因',
                        trigger: 'blur'
                    }
                ]
            },
            tuikuanginfo: {
                huowustatus: '',
                huowuyuanyin: '',
                numberret: '',
                huowuMoney: ''
            },
            orderinfo: {
                orderSn: '',
                tuiKuangSn: '',
                userName: '',
                applyTime: '',
                phone: ''
            },
            addressdata: {
                receiver: '',
                phone: '',
                detailedAddress: ''
            },
            // 查看物流信息
            liuliuxinxi: {
                logisticsSn: '',
                logisticsCompany: '',
                telephone: '',
                refundExplain: '',
                voucherPic: '',
                id: ''
            },
            consignee: {},
            refundAddressId: '',
            tuikuanId: '',
            timer: ''
        };
    },
    mounted() {
        if (this.$route.query.status == 0) {
            this.active = 0;
            this.activename = '待处理';
        } else if (this.$route.query.status == 1) {
            this.active = 1;
            this.activename = '退款中';
        } else if (this.$route.query.status == 2) {
            this.active = 2;
            this.activename = '退款中';
        } else if (this.$route.query.status == 3) {
            this.active = 3;
            this.activename = '退款成功';
        } else if (this.$route.query.status == 4) {
            this.active = 4;
            this.activename = '已拒绝';
        }
        this.getOrderInfo();
        this.timer = setInterval(this.getDay, 1000);
    },
    methods: {
        // 发起退款
        faqituikuan() {
            this.$confirm('是否确定发起退款?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: '保存中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let datas = {
                    opinion: 1,
                    orderId: this.orderId,
                    refuseExplain: this.refuseDatalist.refuseCause
                };
                this.$axios.post('admin/order/orderRefundHandle', datas).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.active = 3;
                            this.getOrderInfo();
                            this.$message({
                                showClose: true,
                                message: '退款成功',
                                type: 'success'
                            });
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
        },
        // 拒绝退款
        refuseBtn() {
            this.dialogVisiblerefusedata = true;
        },
        refundBtndata() {
            this.$confirm('是否确定拒绝退款?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: '保存中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let datas = {
                    opinion: 0,
                    orderId: this.orderId,
                    refuseExplain: this.refuseDatalist.refuseCause
                };
                this.$axios.post('admin/order/orderRefundHandle', datas).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.active = 4;
                            this.getOrderInfo();
                            this.$message({
                                showClose: true,
                                message: '拒绝成功退货',
                                type: 'success'
                            });
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
        },
        // 查看物流信息
        lookDateilwuliu() {
            this.dialogVisiblewuliu = true;
        },
        // 确定收货
        quedingshouhuo() {
            this.$confirm('是否确定收货?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: '保存中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios.post('admin/order/orderRefundSendBack', this.liuliuxinxi).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.active = this.active + 1;
                            this.$message({
                                showClose: true,
                                message: '货物已寄回',
                                type: 'success'
                            });
                            this.getOrderInfo();
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
        },
        // 延长收货时间
        yangchangTime() {
            this.dialogVisibleDate = true;
        },
        quedingyanshi() {
            this.$confirm('是否确定延长收货时间?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: '保存中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios.get('admin/order/orderRefundDelayedReceived?id=' + this.tuikuanId).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.getOrderInfo();
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
        },
        // 拒绝退货
        refusetuikuang() {
            this.dialogVisiblerefuse = true;
        },
        refundBtn() {
            this.$confirm('是否确定拒绝退货?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: '保存中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let datas = {
                    addrId: this.refundAddressId,
                    agreeOrRefuse: 2,
                    id: this.tuikuanId,
                    refuseExplain: this.refuseData.refuseCause
                };
                this.$axios.post('admin/order/orderRefundAgreeOrRefuse', datas).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.active = 4;
                            this.getOrderInfo();
                            this.$message({
                                showClose: true,
                                message: '拒绝成功退货',
                                type: 'success'
                            });
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
        },
        // 确定退货
        confirmBtn() {
            this.$confirm('是否确定退货?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: '保存中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let datas = {
                    addrId: this.refundAddressId,
                    agreeOrRefuse: 1,
                    id: this.tuikuanId,
                    refuseExplain: ''
                };
                this.$axios.post('admin/order/orderRefundAgreeOrRefuse', datas).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.active = this.active + 1;
                            this.getOrderInfo();
                            this.$message({
                                showClose: true,
                                message: '同意退货',
                                type: 'success'
                            });
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
        },
        // 编辑退货地址信息
        editAddress() {
            this.dialogVisible = true;
        },
        // 保存收货地址
        baocunaddress() {
            this.$confirm('是否确定保存编辑地址?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let data = {
                    companyId: parseInt(localStorage.getItem('loginData')),
                    detailedAddress: this.addressdata.detailedAddress,
                    id: this.refundAddressId,
                    phone: this.addressdata.phone,
                    receiver: this.addressdata.receiver
                    // region: 'string'
                };
                const loading = this.$loading({
                    lock: true,
                    text: '保存中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios.post('admin/order/orderRefundAddressAdd', data).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: res.data.msg,
                                type: 'success'
                            });
                            this.dialogVisible = false;
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
        },
        // 查询收货地址
        getAddress() {
            this.$axios.get('admin/order/orderRefundAddress?id=' + this.refundAddressId).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        if (data.data != null) {
                            this.consignee = data.data;
                            this.addressdata = data.data;
                        }
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
        },
        // 查询订单详情
        getOrderInfo() {
            this.$axios.get('admin/order/orderRefundInfo?orderId=' + this.$route.query.id).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.tuikuanId = data.data.id;

                        // 商品信息
                        let tableList = [];
                        let https = /^https:.+$/;
                        data.data.postOrderInfo.orderProductDTOList.forEach((val, index) => {
                            tableList[index] = val;
                            if (https.test(val.productDTO.pic)) {
                                tableList[index].imgUrl = val.productDTO.pic;
                            } else {
                                tableList[index].imgUrl = localStorage.getItem('imgUrl') + val.productDTO.pic;
                            }
                        });
                        this.tableData = tableList;

                        // 退货地址id
                        this.refundAddressId = data.data.refundAddressId;
                        this.getAddress();
                        //  退款信息
                        this.tuikuanginfo.huowustatus = data.data.goodsStatus;
                        this.tuikuanginfo.numberret = data.data.postOrderInfo.orderProductDTOList[0].buyNum;
                        this.tuikuanginfo.huowuyuanyin = data.data.refundCause;
                        this.tuikuanginfo.numberre = data.data.postOrderInfo.orderProductDTOList[0].buyNum;
                        this.tuikuanginfo.huowuMoney = data.data.refundAmount;
                        this.tuikuanginfo.goodsPic = data.data.goodsPic;
                        // 订单消息
                        this.timeLimit = data.data.timeLimit;
                        this.orderinfo.orderSn = data.data.postOrderInfo.orderSn;
                        this.orderinfo.tuiKuangSn = data.data.refundSn;
                        this.orderinfo.userName = data.data.postOrderInfo.user.name;
                        this.orderinfo.phone = data.data.postOrderInfo.user.phoneNumber;
                        let date = new Date(parseInt(data.data.createTime));
                        let time1 =
                            date.getFullYear() +
                            '-' +
                            (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                            '-' +
                            date.getDate();
                        this.orderinfo.applyTime = time1;
                        this.orderId = data.data.postOrderInfo.orderId;
                        this.createTime = parseInt(data.data.createTime);
                        this.timeLimit = data.data.timeLimit;

                        // 物流信息
                        this.liuliuxinxi.id = data.data.id;
                        this.liuliuxinxi.logisticsSn = data.data.logisticsSn;
                        this.liuliuxinxi.logisticsCompany = data.data.logisticsCompany;
                        this.liuliuxinxi.telephone = data.data.telephone;
                        this.liuliuxinxi.refundExplain = data.data.problemDes;
                        if (https.test(data.data.voucherPic)) {
                            this.liuliuxinxi.voucherPic = data.data.voucherPic;
                        } else {
                            this.liuliuxinxi.voucherPic = localStorage.getItem('imgUrl') + data.data.voucherPic;
                        }
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
        },
        getDay() {
            let n = this.timeLimit;
            let d = this.createTime;

            if (d) {
                d = new Date(this.createTime);
            } else {
                d = new Date();
            }
            let year = d.getFullYear();
            let mon = d.getMonth() + 1;
            let day = d.getDate();
            if (day <= n) {
                if (mon > 1) {
                    mon = mon - 1;
                } else {
                    year = year - 1;
                    mon = 12;
                }
            }
            d.setDate(d.getDate() + n);
            year = d.getFullYear();
            mon = d.getMonth() + 1;
            day = d.getDate();
            let h = d.getHours();
            let m = d.getMinutes();
            let s = d.getSeconds();
            let today = year + '-' + (mon < 10 ? '0' + mon : mon) + '-' + (day < 10 ? '0' + day : day) + ' ' + h + ':' + m + ':' + s;
            let datesd = new Date(today);
            let asdas = new Date();
            let shijiancha = datesd - asdas;
            if (shijiancha > 0) {
                let day = Math.floor(shijiancha / 1000 / 60 / 60 / 24); //天数我没用到，暂且写上
                let dayh = Math.floor((shijiancha / 1000 / 60 / 60) % 24);
                let daym = Math.floor((shijiancha / 1000 / 60) % 60);
                let days = Math.floor((shijiancha / 1000) % 60);
                this.timelistData = day + '天' + dayh + '时' + daym + '分' + days + '秒';
                this.$route.query.status;
            } else {
                clearInterval(this.timer);
            }
        }
    }
};
</script>

<style>
.reuturnsteps {
    box-sizing: border-box;
    padding: 20px;
}
.returnTitles {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}
.shengyutime {
    line-height: 40px;
}
.shengyucolor {
    color: #f7716e;
    line-height: 40px;
}
.returnAddress {
    background: #e4eeff;
    height: 60px;
    margin-top: 30px;
    display: flex;
    padding-left: 20px;
    align-items: center;
}
.tableList .el-table__header-wrapper th {
    background: #fff !important;
}

.BusinessAddressdddd .busadd {
    display: flex;
    width: 80%;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 0 20px;
}

.BusinessAddressdddd .editAddress {
    font-size: 24px;
}
.returnmoneyBtn {
    width: 100%;
    text-align: center;
}
.returnmoneyBtn .jujuetuikuan {
    width: 110px;
    height: 30px;
    background: #ff0000;
    color: #fff;
}
.returnmoneyBtn .quedingtuikuan {
    width: 110px;
    height: 30px;
    background: #2450d2;
    color: #fff;
    margin-left: 150px;
}
.el-dialog__header {
    background: #f9f9fa;
}
.el-inputdata {
    width: 300px;
}
.el-form .el-buttonRetrun {
    width: 100px;
    height: 30px;
    background: #2450d2;
    color: #fff;
}
.el-cards {
    width: 80%;
    margin: 0 auto;
    height: 130px;
}
.tuihuodada {
    width: 100%;
    text-align: center;
    line-height: 40px;
}
.tuihuodatta {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
.dsdsadsadsa {
    line-height: 40px;
}
.tuihuodatta .lookdetailddd {
    background: #516bfc;
    color: #fff;
    margin-left: 80px;
}
.textarealist {
    width: 500px;
}
.textarealist .el-textarea__inner {
    height: 100px;
}
.jujuetuikuanlist {
    background: #516bfc;
    width: 110px;
    height: 30px;
    color: #fff;
}
.yangcbabe {
    width: 100%;
    text-align: center;
    line-height: 50px;
}
.yanchangTimeBtn {
    width: 50%;
    margin: 0 auto;
    margin-top: 80px;
    display: flex;
    justify-content: space-around;
}
</style>
