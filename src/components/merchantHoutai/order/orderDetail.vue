<template>
    <div class="orderDetailData" id="orderDetailData">
        <div class="order-top">
            <label class="ordert">
                订单详情
                <span
                    style="color: #FF8D00;"
                >{{this.groupDTO==null?'':this.groupDTO.status ==1?'团购订单('+this.groupDTO.countMemberNeed+'/'+this.groupDTO.teamSize+'未成团)':'团购订单('+ this.groupDTO.teamSize +'/'+this.groupDTO.teamSize+' 已成团)'}}</span>
            </label>
            <label class="orderstatus">订单状态：{{statusName}}</label>
        </div>
        <div class="ordertrue">
            <span v-if="this.groupDTO != null && this.groupDTO.status == 1">
                等待拼团完成，{{this.groupDTO.teamSize}}人团，还差
                <span
                    style="color: #FF3737;"
                >{{this.groupDTO.teamSize - this.groupDTO.countMemberNeed}}</span>人成团，成团后才可以出货，若拼团失败，将自动退款
            </span>

            <span v-if="this.groupDTO != null &&　this.status == 0">等待用户付款</span>
            <span
                v-if="this.groupDTO != null && this.groupDTO.status == 2 &&　this.selfRaisingMethod == '物流配送' &&　this.status == 1"
            >{{this.groupDTO.teamSize}}人拼团已完成，请尽快发货，7天内未发货将自动取消</span>
            <span
                v-if="this.groupDTO != null && this.groupDTO.status == 2 &&　this.selfRaisingMethod == '自提带走' && this.status == 1"
            >{{this.groupDTO.teamSize}}人拼团已完成，请自行联系买家自提时间，在手机端使用扫码出货</span>
            <span
                v-if="this.groupDTO != null && this.groupDTO.status == 2 &&　this.selfRaisingMethod == '到店消费' && this.status == 1 "
            >{{this.groupDTO.teamSize}}人拼团已完成，请自行联系买家自提时间，在手机端使用扫码核销</span>
            <span
                v-if="this.groupDTO != null && this.groupDTO.status == 2 &&　this.selfRaisingMethod == '物流配送' && this.status == 2 "
            >已发货，等待客户签收，发货15天后订单自动完成</span>
            <span
                v-if="this.groupDTO != null && this.groupDTO.status == 2 &&　this.selfRaisingMethod == '商家自送' && this.status == 2 "
            >以派送，等待客户扫码签收</span>
            <span v-if="this.groupDTO == null && this.status == 0 ">请等待用户付款</span>
            <span
                v-if="this.groupDTO == null && this.selfRaisingMethod == '自提带走' && this.status == 1"
            >请于17：50前备货，在手机端使用扫码出货</span>
            <span
                v-if="this.groupDTO == null && this.selfRaisingMethod == '到店消费' && this.status == 1"
            >与客户联系到店消费，在手机端使用扫码核销</span>
            <span
                v-if="this.groupDTO == null && this.selfRaisingMethod == '物流配送' && this.status == 1"
            >买家已付款，请尽快发货，7天内未发货将自动取消订单</span>
        </div>
        <div class="orderTabel">
            <div class="tabel-top clearfix">
                <div class="jbxx fl">基本信息：</div>
                <el-button class="returnOrd" @click="returnOrder">返回</el-button>
                <el-button
                    class="returnOrd"
                    v-if="this.status == 5 && this.status == 3 && this.status == 4"
                    @click="delorderSn"
                >删除订单</el-button>
                <el-button
                    class="lijifahuo"
                    v-if="this.status == 1 && this.groupDTO != null && this.groupDTO.status == 2 && this.selfRaisingMethod != '到店消费' && this.selfRaisingMethod != '自提带走'"
                    @click="atOnceDelivery"
                >立即发货</el-button>
                <el-button
                    class="lijifahuo"
                    v-if="this.status == 1 && this.groupDTO == null && this.selfRaisingMethod != '到店消费' && this.selfRaisingMethod != '自提带走'"
                    @click="atOnceDelivery"
                >立即发货</el-button>
                <el-button
                    class="lijifahuo"
                    v-show="this.status == 2 && this.selfRaisingMethod == '物流配送'"
                    @click="lookLogistics"
                >查看物流</el-button>
            </div>
            <ul class="detailUl">
                <li class="detailli width">
                    <div class="detail">订单编号</div>
                    <div class="detail active">{{orderSn}}</div>
                </li>
                <li class="detailli width">
                    <div class="detail">客户名</div>
                    <div class="detail active">{{this.userName}}</div>
                </li>
                <li class="detailli width">
                    <div class="detail width">订单金额</div>
                    <div class="detail active">￥{{this.payAmount / 100}}</div>
                </li>
                <li class="detailli width">
                    <div class="detail">客服名</div>
                    <div class="detail active">{{this.consumerService}}</div>
                </li>
                <li class="detailli width">
                    <div class="detail width">配送类型</div>
                    <div class="detail coilor active">{{this.selfRaisingMethod}}</div>
                </li>
            </ul>
            <ul class="detailUl">
                <li class="detailli width">
                    <div class="detail">支付方式</div>
                    <div class="detail active">{{payTypeName}}</div>
                </li>
                <li class="detailli width">
                    <div class="detail">订单类型</div>
                    <div class="detail coilor active">{{this.groupDTO == null?'普通订单': '团购定单' }}</div>
                </li>
                <li class="detailli width">
                    <div class="detail">创建时间</div>
                    <div class="detail active">{{createTime}}</div>
                </li>
                <li class="detailli width">
                    <div class="detail">发货单号</div>
                    <div class="detail active">{{deliverySn}}</div>
                </li>
                <li class="detailli width">
                    <div class="detail">活动信息</div>
                    <div class="detail active">{{promotionInfo}}</div>
                </li>
            </ul>

            <div class="tabel-top xx clearfix">
                <div class="shxx fl">收货信息：</div>
            </div>
            <ul class="detailUl">
                <li class="detailli shouhuo">
                    <div class="detail">收货人</div>
                    <div class="detail active">{{receiverName}}</div>
                </li>
                <li class="detailli shouhuo">
                    <div class="detail">手机号</div>
                    <div class="detail active">{{receiverPhone}}</div>
                </li>
                <li class="detailli shouhuo">
                    <div class="detail">收货地址</div>
                    <div class="detail active">{{receiverDetailAddress}}</div>
                </li>
            </ul>
            <div></div>
            <div class="tabel-top jj clearfix">
                <div class="shxx fl">商品信息：</div>
            </div>
            <el-table :data="tablelist" style="width: 100%">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="productPic" label="商品图片">
                    <template slot-scope="scope">
                        <img width="80" height="80" :src="scope.row.productPic" />
                    </template>
                </el-table-column>
                <el-table-column prop="productName" label="商品名称"></el-table-column>
                <el-table-column prop="promotionName" label="关联活动"></el-table-column>
                <el-table-column prop="price" label="原价">
                    <template slot-scope="scope">
                        <label>￥{{scope.row.price / 100}}</label>
                    </template>
                </el-table-column>
                <el-table-column prop="realAmount" label="活动价">
                    <template slot-scope="scope">
                        <label>￥{{scope.row.realAmount / 100}}</label>
                    </template>
                </el-table-column>
                <el-table-column prop="attr" label="属性"></el-table-column>
                <el-table-column prop="productQuantity" label="数量"></el-table-column>
                <el-table-column prop="subTotal" label="小计">
                    <template slot-scope="scope">
                        <label>￥{{scope.row.subTotal / 100}}</label>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <el-divider></el-divider> -->
            <div class="heji">
                <label>合计：</label>
                <label class="red">￥ {{countPrice / 100}}</label>
            </div>

            <div class="tabel-top jj clearfix">
                <div class="jbxx fl">费用信息：</div>
            </div>
            <ul class="detailUl">
                <li class="detailli shouhuo">
                    <div class="detail">商品合计</div>
                    <div class="detail active">￥{{shoppCount / 100}}</div>
                </li>
                <li class="detailli shouhuo">
                    <div class="detail">配送费</div>
                    <div class="detail active">￥{{this.peisongfei / 100}}</div>
                </li>
                <li class="detailli shouhuo">
                    <div class="detail">优惠券</div>
                    <div class="detail active">-￥{{youhuijuan}}</div>
                </li>
            </ul>
            <ul class="detailUl">
                <li class="detailli shouhuo">
                    <div class="detail">活动优惠</div>
                    <div class="detail active">-￥{{hedongyouhui}}</div>
                </li>
                <li class="detailli shouhuo">
                    <div class="detail">订单总金额</div>
                    <div class="detail red active">￥{{this.orderCountmeney / 100}}</div>
                </li>
                <li class="detailli shouhuo">
                    <div class="detail">应付款金额</div>
                    <div class="detail red active">￥{{this.yingfumenay / 100}}</div>
                </li>
            </ul>
        </div>
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
            <span class="dialog-footer">
                <el-button @click="addkehuleixingsz" class="fahuo">发货</el-button>
            </span>
        </el-dialog>
        <!-- 查看物流 -->
        <el-dialog title="查看物流" :visible.sync="dialogVisibwuliu" width="50%">
            <div class="iconEnlorder" @click="enlarge">
                <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                    <i class="iconfont icon-quanping"></i>
                </el-tooltip>
            </div>
            <div class="divwuliu">
                <label>物流单号：</label>
                <label>54651454563452313846</label>
                <i class="copy iconfont icon-shuji"></i>
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
    name: 'orderDetailData',
    data() {
        return {
            statusName: '',
            dialogVisibleake: false,
            dialogVisibwuliu: false,
            fullscreen: '',
            lijifahuo: {
                radio: '',
                wuliupeisong: '',
                beizuxinxi: ''
            },
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
            formLabelWidth: '200px',
            orderSn: '',
            payAmount: '',
            selfRaisingMethod: '',
            receiverName: '',
            payTypeName: '',
            status: '',
            createTime: '',
            deliverySn: '',
            promotionInfo: '',
            userName: '', //客户名
            receiverPhone: '',
            receiverDetailAddress: '',
            consumerService: '', //客服名
            countPrice: '',

            companyName: '',
            name: '',
            tsprice: '',

            tablelist: [],

            // 费用信息
            shoppCount: '',
            peisongfei: '',
            youhuijuan: '',
            hedongyouhui: '',
            orderCountmeney: '',
            yingfumenay: '',
            groupDTO: {}
        };
    },
    mounted() {
        this.getAdminQueryOrderInfo();
    },
    methods: {
        // 返回
        returnOrder() {
            this.$router.push({
                path: './order'
            });
        },
        // 查看物流
        lookLogistics() {
            this.dialogVisibwuliu = true;
        },
        // 立即发货按钮
        atOnceDelivery() {
            this.dialogVisibleake = true;
        },
        // 发货
        addkehuleixingsz() {
            this.$refs.lijifahuo.validate((valid) => {
                if (valid) {
                    this.$confirm('是否确定对客户 【 ' + this.receiverName + ' 】 的订单进行发货?', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
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
                    });
                }
            });
        },
        enlarge() {},
        // 删除订单
        delorderSn() {
            var id = this.$route.query.id;
            this.$confirm('是否确定删除 【 ' + this.receiverName + ' 】 的订单?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: '删除中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios.get('admin/order/order/delOrder?orderId=' + id).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.$router.push({
                                path: './order'
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
                            message: data.msg,
                            type: 'error'
                        });
                    }
                });
            });
        },
        // 查询接口
        getAdminQueryOrderInfo() {
            let orderId = this.$route.query.id;
            let orderDatas = this.$route.query.data;
            this.groupDTO = orderDatas.groupDTO;

            this.$axios.get('admin/order/adminQueryOrderInfo?orderId=' + orderId).then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        console.log(data);
                        let tableListData = data.data.orderInfo;
                        this.userName = tableListData.memberName;
                        this.orderSn = tableListData.orderSn;
                        this.payAmount = tableListData.totalAmount;
                        this.selfRaisingMethod = tableListData.selfRaisingMethod;
                        this.consumerService = tableListData.consumerService;
                        if (tableListData.pickupMethod == 0) {
                            if (tableListData.selfRaisingMethod == 0) {
                                this.selfRaisingMethod = '自提带走';
                            } else if (tableListData.selfRaisingMethod == 1) {
                                this.selfRaisingMethod = '到店消费';
                            } else {
                                this.selfRaisingMethod = '配送';
                            }
                        } else if (tableListData.pickupMethod == 1) {
                            this.selfRaisingMethod = '物流配送';
                        } else {
                            this.selfRaisingMethod = '商家自送';
                        }
                        this.payType = tableListData.payType;
                        this.status = tableListData.status;
                        this.createTime = tableListData.createTime;
                        this.deliverySn = tableListData.deliverySn;
                        this.promotionInfo = tableListData.promotionInfo;
                        this.receiverName = tableListData.receiverName;
                        this.receiverPhone = tableListData.receiverPhone;
                        this.receiverDetailAddress = tableListData.receiverDetailAddress;
                        var ddd = '';
                        switch (tableListData.payType) {
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
                        this.payTypeName = ddd;
                        switch (tableListData.status) {
                            case 0:
                                this.statusName = '未支付';
                                break;
                            case 1:
                                this.statusName = '待发货';
                                break;
                            case 2:
                                this.statusName = '已发货';
                                break;
                            case 3:
                                this.statusName = '已完成';
                                break;
                            case 4:
                                this.statusName = '已关闭';
                                break;
                            case 5:
                                this.statusName = '无效订单';
                                break;
                        }
                        // 商品信息
                        var list = [];
                        var subTotal = '';
                        var youhuijuan = '';
                        var shuliang = '';
                        data.data.productList.forEach(function (val, index) {
                            list[index] = val;
                            list[index].productPic = localStorage.getItem('imgUrl') + val.productPic;
                            list[index].attr = val.productAttr;
                            subTotal = val.subTotal;
                            youhuijuan = val.realAmount;
                            shuliang = val.productQuantity;
                        });
                        this.tablelist = list;
                        this.countPrice = subTotal;
                        this.youhuijuan = youhuijuan;
                        this.hedongyouhui = youhuijuan;
                        // 费用信息
                        this.shoppCount = this.countPrice; // 商品合计
                        this.shoppCount = subTotal;
                        this.peisongfei = tableListData.freightAmount; // 配送费
                        this.youhuijuan = youhuijuan; //优惠券
                        this.hedongyouhui = youhuijuan; // 活动价格
                        this.orderCountmeney = tableListData.totalAmount; // 订单总金额
                        this.yingfumenay = tableListData.payAmount; //应付款
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
.detailUl .detailli {
    list-style: none;
    border: 1px solid #f4f4f4;
    border-right: 0;
    float: left;
}
.detailUl .detailli:nth-child(5) {
    border-right: 1px solid #f4f4f4;
}
.detailli.width {
    width: 20%;
    height: 80px;
}
.detailli.shouhuo {
    width: 33.3%;
    height: 80px;
    padding: 0 auto;
}
.detailli.shouhuo:nth-child(3) {
    border-right: 1px solid #f4f4f4;
}
.detailli .detail {
    width: 100%;
    height: 38px;
    background-color: #fcfbfc;
    line-height: 38px;
    padding: 0;
    text-align: center;
}
.detail.active {
    border-top: 1px solid #f4f4f4;
    background-color: #ffffff;
    font-size: 10px;
}
.clearfix:after {
    clear: both;
    content: '';
    display: block;
}

.fl {
    float: left;
}
.fr {
    float: right;
}
.orderDetailData {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    font-size: 14px;
}
.orderDetailData .ordertrue {
    width: 100%;
    text-align: center;
    line-height: 50px;
    color: #979497;
}
.orderDetailData .order-top {
    height: 45px;
}
.orderstatus {
    float: right;
    color: #ff8d00;
}

.orderTabel {
    width: 98%;
    margin: 0 auto;
}

.orderTabel .tabel-top {
    margin-top: 15px;
    margin-bottom: 10px;
}
.orderTabel .tabel-top.xx {
    margin-top: 200px;
    margin-bottom: 10px;
}
.orderTabel .tabel-top.jj {
    margin-top: 100px;
    margin-bottom: 10px;
}
.orderTabel .tabel-top .returnOrd {
    float: right;
    width: 94px;
    height: 30px;
    background: #2450d2;
    color: #fff;
    border-radius: 8px;
    padding: 0;
}
.orderTabel .tabel-top .lijifahuo {
    float: right;
    width: 94px;
    height: 30px;
    background: #109955;
    color: #fff;
    border-radius: 8px;
}

.el-table--border:nth-child(1) {
    margin-top: 20px;
}

.cell {
    text-align: center;
}

.shxx {
    margin-top: 20px;
}
.heji {
    width: 100%;
    text-align: right;
    margin-top: 20px;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.iconEnlorder {
    position: relative;
}
.iconEnlorder .iconfont {
    position: absolute;
    top: -65px;
    right: 30px;
}
.orderDetailData .dialog-footer .fahuo {
    width: 151px;
    height: 30px;
    color: #ffffff;
    border-radius: 8px;
    background: #2450d2;
    margin-left: 40%;
    margin-top: 50px;
}
.divwuliu {
    margin-top: 20px;
    margin-left: 20%;
}
.detail.coilor {
    color: #ff8d00;
}
.orderDetailData .el-table .has-gutter th {
    background: #f4f4f4;
}
</style>
