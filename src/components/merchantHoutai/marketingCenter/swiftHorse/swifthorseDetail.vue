<template>
    <!-- 千里马详情 -->
    <div class="swifthorseDetail" id="swifthorseDetail">
        <div class="swDetail">
            <div class="returnBtn">
                <el-button style="font-size: 14px;" @click="returnswifthorse" type="text">返回列表</el-button>
            </div>
            <div class="swDetail-top-b">
                <div class="banner">
                    <el-carousel height="240px" v-if="this.imgUrl != ''">
                        <el-carousel-item v-for="(item,index) in this.imgUrl" :key="index">
                            <img width="100%" height="100%" :src="item" />
                        </el-carousel-item>
                    </el-carousel>
                    <img
                        v-else
                        width="100%"
                        height="100%"
                        src="../../../../assets/img/marketingqianlima/zhangwutuipian.png"
                    />
                </div>
                <div class="personaDdetails">
                    <div class="persona">
                        <el-avatar :size="65" :src="this.avatarUrl"></el-avatar>
                        <div class="personaXinxi">
                            <span style="font-size: 30px;font-weight: bolder;">{{this.name}}</span>
                            <div class="zhiweijinyang">
                                <span>{{this.basicInfos.sidelineTypeName}}</span>
                                <span
                                    style="margin-left: 15px;"
                                >{{this.basicInfos.workExperiences}}经验</span>
                            </div>
                            <div class="pingfen">
                                <span>
                                    <span
                                        style="font-size: 14px; color: #FF8400;"
                                    >{{this.detailInfos.countOrder}}人</span>找过他
                                </span>
                                <el-rate
                                    style="margin-left: 10px;"
                                    v-model="value"
                                    disabled
                                    text-color="#ff9900"
                                    score-template="{value}"
                                ></el-rate>
                                <span>
                                    按时完成率
                                    <span style="color: #409EFF;">{{this.baifengbi}}%</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="persona-b">
                        <i style="color: #FF8400;" class="el-icon-phone-outline"></i>
                        <span>联系方式</span>
                        <span style="margin-left: 20px;">{{this.basicInfos.phoneNumber}}</span>
                        <i
                            style="cursor: pointer;"
                            @click="phoho"
                            v-show="yangStuts ==0"
                            class="el-icon-view"
                        ></i>
                        <i
                            style="cursor: pointer;"
                            v-show="yangStuts ==1"
                            @click="phohoguabu"
                            class="iconfont icon-biyan"
                        ></i>
                    </div>
                    <div class="price">
                        <span class="span">指导价：</span>
                        <span
                            class="span"
                            style="color: #FF0000;"
                        >{{this.basicInfos.sysRecommendPrice}}￥/张</span>
                    </div>
                    <div class="price">
                        <el-button @click="xiaOrder()" class="priceOrder">立即下单</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="worksData">
            <div class="wordcheck">
                <div class="workdirection" v-if="this.dataspan != ''">
                    <div style="font-size: 20px;">作品方向</div>
                    <div class="tag">
                        <span v-for="(item,index) in dataspan" :key="index">{{item}}</span>
                    </div>
                    <!-- <img
                        width="100%"
                        height="auto"
                        v-else
                        src="../../../../assets/img/marketingqianlima/zhanwuData.png"
                    />-->
                </div>
                <div class="Self-introduction">
                    <div style="font-size: 20px;">个人介绍</div>
                    <div class="Self-introduction-img"></div>
                    <p
                        class="text"
                        v-if="this.detailInfos.introduction != ''"
                    >{{this.detailInfos.introduction}}</p>
                    <img
                        class="jieshaoimg"
                        width="70%"
                        height="auto"
                        v-else
                        src="../../../../assets/img/marketingqianlima/zhanwujieshao.png"
                    />
                </div>
                <div class="workpane" v-if="this.detailInfos.styleDescription !=''">
                    <div style="font-size: 20px;">个人及作品方格</div>
                    <ul class="workpaneUL">
                        <li class="workpaneLI">
                            <span>{{this.detailInfos.styleDescription}}</span>
                            <!-- <img
                                width="100%"
                                height="100%"
                                src="../../../../assets/img/marketingqianlima/zhanwuanli.png"
                            />-->
                        </li>
                    </ul>
                </div>
            </div>
            <div class="wordlist">
                <div class="wordlist-top">
                    <div class="zuopinji">作品集</div>
                    <div class="zuoyoufenye">
                        <i class="el-icon-arrow-left"></i>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </div>
                <ul class="wordlist-ul" v-if="this.dataworks != ''">
                    <li class="wordlist-li" v-for="item in this.dataworks" :key="item.id">
                        <div class="li-left">
                            <video class="video" :src="item.video" controls="controls"></video>
                        </div>
                        <div class="li-right">
                            <div>{{item.name}}</div>
                            <div style="font-size: 12px; margin-top: 25px;">{{item.description}}</div>
                        </div>
                    </li>
                </ul>
                <img
                    width="100%"
                    height="auto"
                    src="../../../../assets/img/marketingqianlima/zhanwuanli.png"
                />
            </div>
        </div>

        <el-dialog title="设置订单" :visible.sync="dialogVisibleake" width="40%">
            <div class="iconEnlorder" @click="enlarge">
                <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                    <i class="iconfont icon-quanping"></i>
                </el-tooltip>
            </div>
            <el-form :model="order" :rules="rules" ref="lijifahuo">
                <el-form-item label="输入订单要求:" prop="orderEequire" :label-width="formLabelWidth">
                    <el-input
                        class="elInpiut"
                        v-model="order.orderEequire"
                        type="textarea"
                        maxlength="300"
                        show-word-limit
                        placeholder="请输入订单要求"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    prop="orderTextList"
                    label="设置订单内容:"
                    :label-width="formLabelWidth"
                    required
                >
                    <el-form-item
                        type="data"
                        v-for="(item,index) in this.order.orderTextList"
                        :key="index"
                    >
                        <el-select v-model="item.sidelineType">
                            <el-option
                                v-for="val in item.dataTypeList"
                                :key="val.id"
                                :label="val.name"
                                :value="val.id"
                            ></el-option>
                        </el-select>
                        <label style="margin-left: 20px;">数量：</label>
                        <el-input v-model.number="item.totalNum" style="width: 100px;"></el-input>
                        <el-button
                            type="text"
                            @click="delorderTextList(item)"
                            class="delete el-icon-remove-outline"
                            style="color: #FF0000;margin-left: 30px;"
                        >删除</el-button>
                    </el-form-item>
                    <el-button
                        type="text"
                        @click="addclick"
                        class="addorder el-icon-circle-plus-outline"
                    >添加</el-button>
                </el-form-item>
                <el-form-item label="设置订单时间:" prop="dataValue" :label-width="formLabelWidth">
                    <el-date-picker
                        class="el-date-picker"
                        v-model="order.dataValue"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        @change="timeValue"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="约定成交价格:" prop="orderPrice" :label-width="formLabelWidth">
                    <el-input
                        v-model="order.orderPrice"
                        class="inputPrice"
                        oninput="value=value.replace(/[^0-9.]/g,'')"
                        placeholder="请输入约定价格"
                    ></el-input>
                    <div>
                        <i class="el-icon-warning-outline" style="color: #D61F21;"></i>参考价格仅提供参考，最终价格由你和设计师约定价格
                    </div>
                </el-form-item>
            </el-form>
            <div class="dialog-footer">
                <el-button @click="OrderSubmit" class="submitOrder">提交订单</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'swifthorseDetail',
    data() {
        return {
            value: 5,
            formLabelWidth: '130px',
            dialogVisibleake: false,
            fullscreen: '',
            dataspan: [],
            phohonumber: '',
            yangStuts: 0,
            order: {
                orderEequire: '',
                orderTextList: [
                    {
                        sidelineType: '',
                        totalNum: '',
                        dataTypeList: this.dataTypeLists,
                        sysRecommendPrice: this.sysRecommendPrices,
                        actualPrice: this.sysRecommendPrices
                    }
                ],
                dataValue: [],
                orderPrice: ''
            },
            rules: {
                orderEequire: [{ required: true, message: '请输入订单内容', trigger: 'blur' }],
                orderTextList: [{ required: true, message: '请选择订单sss', trigger: 'blur' }],
                dataValue: [{ required: true, message: '请选择日期', trigger: 'blur' }],
                orderPrice: [{ required: true, message: '请输入约定价格', trigger: 'blur' }]
            },
            index: 0,
            imgUrl: [],
            avatarUrl: '',
            name: '',
            basicInfos: {},
            detailInfos: {},
            dataworks: [],
            dataTypeLists: [],
            startTime: '',
            endTime: '',
            sidelineUserId: '',
            sysRecommendPrices: '',
            baifengbi: 100
        };
    },
    mounted() {
        this.getProfile();
        this.getListSidelineType();
    },
    methods: {
        timeValue(value) {
            if (value != null) {
                let datatime = new Date(value[0]);
                this.startTime = datatime.getTime(datatime);
                let datatime1 = new Date(value[1]);
                this.endTime = datatime1.getTime(datatime1);
            } else {
                (this.startTime = ''), (this.endTime = '');
            }
        },
        OrderSubmit() {
            this.$refs.lijifahuo.validate((valid) => {
                if (valid) {
                    let datalistsss = {
                        actualTotalPrice: this.order.orderPrice * 100,
                        startTime: this.startTime,
                        endTime: this.endTime,
                        taskList: this.order.orderTextList,
                        sidelineUserId: this.sidelineUserId,
                        industryId: parseInt(localStorage.getItem('industryId')),
                        requirements: this.order.orderEequire
                    };
                    this.$axios.post('admin/sideline/order/create', datalistsss).then((res) => {
                        if (res.status == 200) {
                            let data = res.data;
                            if (data.code == 200) {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'success'
                                });
                                this.dialogVisibleake = false;
                                this.$router.push({
                                    path: './orderConfirm',
                                    query: {
                                        data: data.data.id
                                    }
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
                }
            });
        },
        getListSidelineType() {
            this.$axios.get('admin/sideline/list_sideline_type').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.$set(this.order.orderTextList[0], 'dataTypeList', data.data);
                        this.dataTypeLists = data.data;
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
        },
        xiaOrder() {
            this.dialogVisibleake = true;
        },
        enlarge() {},
        addclick() {
            this.getListSidelineType();
            this.order.orderTextList.push({
                sidelineType: '',
                totalNum: '',
                sysRecommendPrice: this.sysRecommendPrices,
                dataTypeList: this.dataTypeLists,
                actualPrice: this.sysRecommendPrices
            });
        },
        delorderTextList(item) {
            var index = this.order.orderTextList.indexOf(item);
            if (index != -1) {
                this.order.orderTextList.splice(index, 1);
            }
        },
        phoho() {
            this.yangStuts = 1;
            this.basicInfos.phoneNumber = this.phohonumber;
            return this.basicInfos.phoneNumber;
        },
        phohoguabu() {
            this.yangStuts = 0;
            let start = this.phohonumber.slice(0, 3);
            let end = this.phohonumber.slice(-4);
            this.basicInfos.phoneNumber = start + '****' + end;
            return this.basicInfos.phoneNumber;
        },
        returnswifthorse() {
            this.$router.push({
                path: './swifthorse'
            });
        },
        getProfile() {
            let id = this.$route.query.id;
            this.$axios.post('admin/sideline/personal/get_profile/' + id).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        let dataLists = data.data;
                        this.basicInfos = data.data.basicInfo;
                        this.phohonumber = data.data.basicInfo.phoneNumber;
                        this.detailInfos = data.data.detailInfo;
                        let start = data.data.basicInfo.phoneNumber.slice(0, 3);
                        let end = data.data.basicInfo.phoneNumber.slice(-4);
                        this.basicInfos.phoneNumber = start + '****' + end;

                        let bbbb =
                            ((data.data.basicInfo.orderNum - data.data.detailInfo.countDelayOrder) / data.data.detailInfo.countOrder) * 100;
                        this.baifengbi = 100;
                        if (parseInt(bbbb) > 0 && parseInt(bbbb) < 21) {
                            this.value = 1;
                        } else if (parseInt(bbbb) > 20 && parseInt(bbbb) < 41) {
                            this.value = 2;
                        } else if (parseInt(bbbb) > 40 && parseInt(bbbb) < 61) {
                            this.value = 3;
                        } else if (parseInt(bbbb) > 60 && parseInt(bbbb) < 71) {
                            this.value = 4;
                        } else if (parseInt(bbbb) > 80) {
                            this.value = 5;
                        }

                        this.$set(this.order.orderTextList[0], 'sysRecommendPrice', data.data.basicInfo.sysRecommendPrice);
                        this.$set(this.order.orderTextList[0], 'actualPrice', data.data.basicInfo.sysRecommendPrice);
                        this.sysRecommendPrices = data.data.basicInfo.sysRecommendPrice;
                        let dataworks = [];
                        var https = /^https:\/\/.+$/;
                        // this.sidelineUserId = dataLists.works[0].sidelineUserId;
                        this.sidelineUserId = dataLists.detailInfo.sidelineUserId;
                        dataLists.works.forEach(function (val, index) {
                            dataworks[index] = val;
                            if (https.test(val.content)) {
                                dataworks[index].video = val.content;
                            } else {
                                dataworks[index].video = localStorage.getItem('imgUrl') + val.content;
                            }
                            if (https.test(val.cover)) {
                                dataworks[index].imgCover = val.cover;
                            } else {
                                dataworks[index].imgCover = localStorage.getItem('imgUrl') + val.cover;
                            }
                        });
                        this.dataworks = dataworks;
                        if (dataLists.detailInfo.worksTabs != '') {
                            this.dataspan = dataLists.detailInfo.worksTabs.split(';');
                        }

                        var imgUrls = [];
                        this.dataLists = dataLists.basicInfo.workExperiences;
                        this.name = dataLists.basicInfo.userName;
                        if (dataLists.detailInfo.worksPictures) {
                            dataLists.detailInfo.worksPictures.split(';').forEach(function (val, index) {
                                if (https.test(val)) {
                                    imgUrls[index] = val;
                                } else {
                                    imgUrls[index] = localStorage.getItem('imgUrl') + val;
                                }
                            });
                            this.imgUrl = imgUrls;
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
.swifthorseDetail {
    box-sizing: border-box;
    padding: 20px;
    background-color: #f5f7fc;
}
.swDetail {
    width: 100%;
    background-color: #fff;
    padding: 20px;
}
.swDetail .returnBtn {
    width: 100%;
    text-align: right;
    margin-top: -20px;
}
.swDetail .swDetail-top-b {
    display: flex;
    flex-direction: row;
}
.swDetail-top-b .banner {
    width: 30%;
    height: 240px;
}
.el-carousel__indicator .el-carousel__button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-top: 10px;
}
.swDetail-top-b .personaDdetails {
    width: 60%;
    margin-left: 50px;
}
.swDetail-top-b .personaDdetails .persona {
    display: flex;
    flex-direction: row;
}
.personaDdetails .persona .personaXinxi {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
}
.personaXinxi .pingfen {
    display: flex;
    justify-content: space-between;
    color: #333333;
    font-size: 12px;
}
.zhiweijinyang {
    font-size: 22px;
    color: #999999;
}
.persona-b {
    margin-top: 20px;
    font-size: 20px;
    margin-left: 88px;
}
.persona-b i {
    color: #1fb054;
    margin-right: 10px;
}
.price {
    margin-left: 88px;
}
.price .span {
    font-size: 20px;
}
.price .priceOrder {
    font-size: 16px;
    background-color: #298377;
    color: #fff;
    width: 135px;
    height: 45px;
    border-radius: 4px;
}
.worksData {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
}
.worksData .wordcheck {
    width: 60%;
    padding: 20px 10px;
    background-color: #ffffff;
}
.wordcheck .workdirection .tag {
    display: flex;
    flex-direction: row;
}
.wordcheck .workdirection .tag span {
    width: 92px;
    height: 30px;
    border: 1px solid #ff8d00;
    text-align: center;
    line-height: 30px;
    color: #ff8d00;
    margin-left: 25px;
    margin-top: 10px;
    border-radius: 4px;
}
.Self-introduction-img {
    display: flex;
    align-items: flex-start;
    margin-top: 10px;
    margin-left: 50px;
}
.Self-introduction-img img {
    margin-left: 10px;
}
.Self-introduction {
    margin-top: 10px;
}
.Self-introduction .text {
    text-indent: 25px;
    padding: 10px 80px 0 80px;
}
.workpane {
    margin-bottom: 50px;
}
.workpane .workpaneLI {
    list-style: none;
    font-size: 14px;
    padding: 10px 80px 0 80px;
}
.workpane .workpaneLI .shouhangsoujin {
    text-indent: 25px;
}
.worksData .wordlist {
    width: 30%;
    background-color: #ffffff;
    padding: 10px;
}
.wordlist .wordlist-top {
    display: flex;
    justify-content: space-between;
}
.zuoyoufenye i {
    width: 24px;
    height: 24px;
    cursor: pointer;
}
.wordlist-ul .wordlist-li {
    list-style: none;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 2px solid #ff8d00;
}
.wordlist-ul .wordlist-li:nth-child(3) {
    border-bottom: 0;
}
.li-left {
    width: 40%;
    background-color: #0000ff;
    height: 165px;
}
.li-left .video {
    width: 100%;
    height: 100%;
}
.li-right {
    width: 60%;
    height: 20px;
    padding: 0 10px 10px 10px;
}
.iconEnlorder {
    position: relative;
}
.iconEnlorder .iconfont {
    position: absolute;
    top: -65px;
    right: 30px;
}
.elInpiut {
    width: 80%;
    height: 100px;
}
.el-textarea__inner {
    height: 100px;
}
.delete {
    color: #ff0000;
    font-size: 20px;
}
.delete:before {
    color: #ff0000;
}
.delete:active {
    color: #ff0000;
}
.addorder {
    font-size: 20px;
    margin-left: 27%;
}
.inputPrice {
    width: 80%;
}
.dialog-footer {
    width: 100%;
    text-align: center;
}
.dialog-footer .submitOrder {
    width: 300px;
    height: 60px;
    background-color: #4985f0;
    color: #fff;
    margin: 0 auto;
    padding: 0;
    font-size: 24px;
}
.el-date-editor--daterange.el-input__inner {
    width: 80%;
}
.el-dialog__header {
    background-color: #f0f0f0;
}
</style>
