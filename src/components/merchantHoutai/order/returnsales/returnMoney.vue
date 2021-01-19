<template>
    <!-- 退货处理 -->
    <div class="reuturnsteps" id="reuturnsteps">
        <div class="returnTitles" v-if="this.activetype < 3  ">
            <h2>用户发起退款，请及时处理</h2>
            <p class="shengyutime">还剩{{this.timelistData}}</p>
            <p class="shengyucolor">请及时处理退款信息，若超时未处理，将自动进行退货退款流程。请和买家确认退货事宜，若拒绝，请备注拒绝原由。</p>
        </div>
        <div class="returnTitles" v-if="this.activetype == 3">
            <h2>退货成功</h2>
            <p class="shengyutime">将按以下流程退回{{this.userNameData}}的微信账户</p>
            <p class="shengyucolor">
                <span>卖家退款 —— 银行处理 —— 退款成功</span>
            </p>
        </div>
        <div class="returnTitles" v-if="this.activetype == 4 ">
            <h2>退货失败</h2>
            <p class="shengyucolor">
                <span>退货失败原因：{{this.ressdata.jujueyuanyin}}</span>
            </p>
        </div>
        <div>
            <el-steps
                :active="activetype"
                v-show="activetype < 3"
                finish-status="success"
                align-center
                process-status="finish"
            >
                <el-step title="提交申请"></el-step>
                <el-step title="商家处理"></el-step>
                <el-step title="退款成功"></el-step>
            </el-steps>
        </div>

        <div class="returnAddress">
            <h2>退货商品</h2>
            <span style="margin-left: 20px; color:#409EFF;">{{this.successname}}</span>
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
        <div class="returnmoneyBtn" v-if="this.activetype == 2">
            <el-button class="jujuetuikuan" @click="jujuetuikuana">拒绝退款</el-button>
            <el-button class="quedingtuikuan" @click="confirmBtn">确认退款</el-button>
        </div>
        <el-dialog title="拒绝退款" :visible.sync="dialogVisiblerefuse" width="50%">
            <el-form :model="ressdata">
                <el-form-item label="填写拒绝原因：" label-width="200px">
                    <el-input
                        class="el-textareadada"
                        v-model="ressdata.jujueyuanyin"
                        type="textarea"
                        placeholder="请输入拒绝原因"
                    ></el-input>
                </el-form-item>

                <el-form-item label-width="350px">
                    <el-button class="el-buttonRetrun" @click="refusetuiKuan">拒绝退款</el-button>
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
            activetype: 0,
            timeLimit: '',
            tableData: [],
            dialogVisible: false,
            dialogVisiblerefuse: false,
            successname: '',
            type: '',
            timelistData: '',
            createTime: '',
            userNameData: '',
            orderId: '',
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
                pohne: '',
                detailedAddress: ''
            },
            ressdata: {
                jujueyuanyin: ''
            },
            consignee: {},
            refundAddressId: '',
            tuikuanId: '',
            timer: ''
        };
    },
    mounted() {
        if (this.$route.query.status == 0) {
            this.activetype = 2;
        } else if (this.$route.query.status == 1) {
            this.activetype = 2;
        } else if (this.$route.query.status == 2) {
            this.activetype = 2;
        } else if (this.$route.query.status == 3) {
            this.activetype = 3;
        } else if (this.$route.query.status == 4) {
            this.activetype = 4;
        }
        this.getOrderInfo();
        this.timer = setInterval(this.getDay, 1000);
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    methods: {
        // 拒绝退款
        jujuetuikuana() {
            this.dialogVisiblerefuse = true;
        },
        refusetuiKuan() {
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
                    refuseExplain: this.ressdata.jujueyuanyin
                };
                this.$axios.post('admi/order/orderRefundHandle', datas).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.activetype = 4;
                            this.dialogVisiblerefuse = false;
                            this.getOrderInfo();
                        } else {
                            his.$message({
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
        // 确定退款
        confirmBtn() {
            this.$confirm('是否确定退款?', '温馨提示', {
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
                    refuseExplain: ''
                };
                this.$axios.post('admin/order/orderRefundHandle', datas).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: '退款成功',
                                type: 'error'
                            });
                            this.activetype = 3;
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

        // 查询订单详情
        getOrderInfo() {
            this.$axios.get('admin/order/orderRefundInfo?orderId=' + this.$route.query.id).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.tuikuanId = data.data.id;
                        if (data.data.successStatus == 0) {
                            this.successname = '退款中';
                        } else if (data.data.successStatus == 1) {
                            this.successname = '退款成功';
                        } else if (data.data.successStatus == 2) {
                            this.successname = '退款失败';
                        } else {
                            this.successname = '其他';
                        }
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
                        // this.getAddress();
                        console.log(data);
                        //  退款信息
                        this.tuikuanginfo.huowustatus = data.data.goodsStatus;
                        this.tuikuanginfo.numberret = data.data.postOrderInfo.orderProductDTOList[0].buyNum;
                        this.tuikuanginfo.huowuyuanyin = data.data.refundCause;
                        this.tuikuanginfo.numberre = data.data.postOrderInfo.orderProductDTOList[0].buyNum;
                        this.tuikuanginfo.huowuMoney = data.data.refundAmount;
                        this.tuikuanginfo.goodsPic = data.data.goodsPic;
                        this.orderId = data.data.postOrderInfo.orderId;
                        this.userNameData = data.data.postOrderInfo.receiverName;
                        // 订单消息

                        this.orderinfo.orderSn = data.data.postOrderInfo.orderSn;
                        this.orderinfo.tuiKuangSn = data.data.refundSn;
                        this.orderinfo.userName = data.data.postOrderInfo.user.name;
                        this.orderinfo.phone = data.data.postOrderInfo.user.phoneNumber;
                        this.createTime = parseInt(data.data.createTime);
                        let date = new Date(parseInt(data.data.createTime));
                        let time1 =
                            date.getFullYear() +
                            '-' +
                            (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                            '-' +
                            date.getDate() +
                            ' ' +
                            date.getHours() +
                            ':' +
                            date.getMinutes() +
                            ':' +
                            date.getSeconds();
                        this.orderinfo.applyTime = time1;
                        this.timeLimit = data.data.timeLimit;
                        // this.getDay(data.data.timeLimit, time1);
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
.BusinessAddress {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    height: 60px;
    align-items: center;
    padding: 0 20px;
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
.ell-textareadada {
    width: 300px;
}
</style>
