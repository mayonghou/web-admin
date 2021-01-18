<template>
    <!-- 商品详情 -->
    <div
        class="goodsDetail"
        id="goodsDetail"
        v-loading="fullscreenLoading"
        :element-loading-text="loadingText"
        element-loading-background="rgba(0, 0, 0, 0.7)"
    >
        <div class="goodsDetail-top">
            <label>查看商品信息</label>
        </div>
        <div class="textnext">
            <el-form :model="goodsDetailList">
                <el-form-item label="封面:" :label-width="labelwidth">
                    <img class="img" :src="goodsDetailList.imgSrc" />
                </el-form-item>
                <el-form-item label="商品视频:" :label-width="labelwidth">
                    <video
                        ref="videoPlayer"
                        v-if="goodsDetailList.fileUrl"
                        controls
                        :src="goodsDetailList.fileUrl"
                        controlslist="nodownload"
                        @play="toPlays"
                        @timeupdate="updateTime"
                        @pause="toPause"
                        class="video"
                    ></video>
                </el-form-item>
                <el-form-item label="商品名称:" :label-width="labelwidth">
                    <el-input class="goodinput" v-model="goodsDetailList.shoppName" readonly></el-input>
                </el-form-item>
                <el-form-item label="商品主图:" :label-width="labelwidth">
                    <div v-for="(item, index) in this.goodsDetailList.imgSrcList" :key="index">
                        <img class="img" :src="item" />
                    </div>
                </el-form-item>
                <el-form-item label="商品详情:" :label-width="labelwidth">
                    <div class="dsadsadsa">
                        <div class="dsad" v-html="goodsDetailList.label"></div>
                    </div>
                </el-form-item>
                <el-form-item label="商品库存:" :label-width="labelwidth">
                    <el-input class="goodinput" v-model="goodsDetailList.shoppkucun" readonly></el-input>
                </el-form-item>
                <el-form-item label="库存预警值:" :label-width="labelwidth">
                    <el-input class="goodinput" v-model="goodsDetailList.kucunzhi" readonly></el-input>
                </el-form-item>
                <el-form-item label="商品售价:" :label-width="labelwidth">
                    <el-input class="goodinput" v-model="goodsDetailList.price" readonly></el-input>
                </el-form-item>
                <el-form-item label="限购数量:" :label-width="labelwidth">
                    <label style="color: #A4A4A4;">（限每人购买的数量）</label>
                    <el-input class="goodinput" v-model="goodsDetailList.number" readonly></el-input>
                </el-form-item>
                <el-form-item label="商品单位:" :label-width="labelwidth">
                    <el-input class="goodinput" v-model="goodsDetailList.danwei" readonly></el-input>
                </el-form-item>
                <el-form-item label="商品货号:" :label-width="labelwidth">
                    <el-input class="goodinput" v-model="goodsDetailList.huohao" readonly></el-input>
                </el-form-item>
                <el-form-item label="商品参数:" :label-width="labelwidth">
                    <label style="width: 100%;height: 30px; display: block;"></label>
                    <div v-for="(item,index) in this.goodsDetailList.canshu" :key="index">
                        <el-form-item :label="'参数'+(index + 1)+'名称:'" :label-width="labelw">
                            <el-input class="goodinput" v-model="item.paramKey" readonly></el-input>
                        </el-form-item>
                        <el-form-item
                            style="margin-left: 30px;"
                            :label="'参数'+(index+1)+'详情:'"
                            :label-width="labelw"
                        >
                            <el-input class="goodinput" v-model="item.paramValue" readonly></el-input>
                        </el-form-item>
                    </div>
                </el-form-item>
                <el-form-item label="商品规格:" :label-width="labelwidth">
                    <label style="width: 100%;height: 30px; display: block;"></label>
                    <el-form-item label="主规格标题:" :label-width="labelwi">
                        <el-input class="goodinput" v-model="goodsDetailList.zhutotle" readonly></el-input>
                        <div v-for="(item,index) in this.prodAttrList" :key="index">
                            <el-form-item :label="'主规格'+(index+1)+'名称:'" label-width="120px">
                                <el-input class="goodinput" v-model="item.name" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="单价:" label-width="120px">
                                <el-input class="goodinput" v-model="item.price / 100" readonly></el-input>
                            </el-form-item>
                        </div>
                    </el-form-item>
                    <el-form-item
                        :label="'副规格'+(index+1)+'标题:'"
                        v-for="(item, index) in this.prodAttrSubList"
                        :key="index"
                        :label-width="labelwi"
                    >
                        <el-input class="goodinput" v-model="item.subTitle" readonly></el-input>
                        <el-form-item
                            :label="'副规格'+(ind+1)+'名称:'"
                            v-for="(i,ind) in item.subName"
                            :key="ind"
                            label-width="105px"
                        >
                            <el-input class="goodinput" v-model="i.name" readonly></el-input>
                        </el-form-item>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="保障描述:" :label-width="labelwidth">
                    <el-input class="goodinput" v-model="goodsDetailList.baozhang" readonly></el-input>
                </el-form-item>
                <el-form-item label="商品配送:" :label-width="labelwidth">
                    <el-input class="goodinput" v-model="goodsDetailList.peisong" readonly></el-input>
                </el-form-item>
                <el-form-item label="是否包邮:" :label-width="labelwidth">
                    <el-input class="goodinput" v-model="goodsDetailList.baoyou" readonly></el-input>
                </el-form-item>
                <el-form-item label="商品准备时间:" :label-width="labelwidth">
                    <label style="margin-left: 0px;">{{goodsDetailList.time}}分钟</label>
                </el-form-item>
            </el-form>
            <el-button @click="returnBtnGood" class="returnBtn">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'goodsDetail',
    data() {
        return {
            fullscreenLoading: true,
            loadingText: '加载中...',
            labelwidth: '220px',
            labelwi: '120px',
            labelw: '100px',
            goodsDetailList: {
                imgSrc: '',
                fileUrl: '',
                shoppName: '',
                imgSrcList: '',
                shoppDetail: '',
                shoppkucun: '',
                price: '',
                number: '',
                danwei: '',
                huohao: '',
                canshudetail: '',
                zhutotle: '',
                danjia: '',
                futotle: '',
                fucanshu1: '',
                baozhang: '',
                peisong: '',
                baoyou: '',
                time: '',
                kucunzhi: '',
                canshu: '',
                label: ``,
                imgUrl: ''
            },
            prodAttrList: [],
            prodAttrSubList: [],
            status: ''
        };
    },
    watch: {
        $route: 'getGoodsDetailList'
    },
    mounted() {
        this.getGoodsDetailList();
    },
    methods: {
        updateTime(e) {
            this.currentTime = e.target.currentTime;
        },
        // 视频播放
        toPlays(e) {},
        // 视频暂停
        toPause(e) {},
        returnBtnGood() {
            var status = this.$route.query.status;
            if (status == 0) {
                this.$router.push({
                    path: './xiajiagoods' //下架商品列表
                });
            } else if (status == 1) {
                this.$router.push({
                    path: './goodsList' //上架商品列表
                });
            } else if (status == 3) {
                this.$router.push({
                    path: './detailLocalgroup' //同城团购详情
                });
            } else if (status == 4) {
                this.$router.push({
                    path: './detailseckill' //秒杀详情
                });
            } else if (status == 5) {
                this.$router.push({
                    path: './detaildiscount' //秒杀详情
                });
            } else if (status == 6) {
                this.$router.push({
                    path: './detailCouponCon' //优惠券详情
                });
            } else if (status == 7) {
                this.$router.push({
                    path: './flashSaleDetail' //限时抢购
                });
            }
        },
        getGoodsDetailList() {
            let id = this.$route.query.id;
            this.$axios.get('admin/product/adminQueryProductInfo?productId=' + id).then((res) => {
                this.fullscreenLoading = false;
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        var goodsDetail = data.data.productDTO;
                        this.status = goodsDetail.publishStatus;
                        var aaas = /^(https):\/\/.+$/;
                        var imgList = [];
                        goodsDetail.albumPics.split(',').forEach(function (val, index) {
                            if (aaas.test(val)) {
                                imgList[index] = val;
                            } else {
                                imgList[index] = localStorage.getItem('imgUrl') + val;
                            }
                        });
                        this.goodsDetailList.imgSrcList = imgList;
                        if (aaas.test(goodsDetail.pic)) {
                            this.goodsDetailList.imgSrc = goodsDetail.pic;
                        } else {
                            this.goodsDetailList.imgSrc = localStorage.getItem('imgUrl') + goodsDetail.pic;
                        }
                        if (goodsDetail.videoUrl) {
                            if (aaas.test(goodsDetail.videoUrl)) {
                                this.goodsDetailList.fileUrl = goodsDetail.videoUrl;
                            } else {
                                this.goodsDetailList.fileUrl = localStorage.getItem('imgUrl') + goodsDetail.videoUrl;
                            }
                        } else {
                            this.goodsDetailList.fileUrl == '';
                        }
                        this.goodsDetailList.shoppName = goodsDetail.name;
                        this.goodsDetailList.time = goodsDetail.makeTime;
                        this.goodsDetailList.shoppkucun = goodsDetail.stock;
                        this.goodsDetailList.kucunzhi = goodsDetail.lowStock;
                        this.goodsDetailList.price = goodsDetail.price / 100 + '元';
                        this.goodsDetailList.peisong = goodsDetail.logisticsIds;
                        var aaa = [];
                        goodsDetail.logisticsIds.split(',').forEach(function (val, index) {
                            if (val == 1) {
                                aaa.push('可自提');
                            } else if (val == 2) {
                                aaa.push('可到店消费');
                            } else if (val == 3) {
                                aaa.push('可配送');
                            }
                        });
                        this.goodsDetailList.peisong = aaa.join('       ');
                        var ddd = [];
                        goodsDetail.serviceIds.split(',').forEach(function (val, index) {
                            if (val == 1) {
                                ddd.push('假一赔十');
                            } else if (val == 2) {
                                ddd.push('极速退款');
                            } else if (val == 3) {
                                ddd.push('无忧退货');
                            }
                        });
                        this.goodsDetailList.baozhang = ddd.join('       ');
                        this.goodsDetailList.baoyou = goodsDetail.freeShipping == 0 ? '否' : '是';
                        this.goodsDetailList.number = goodsDetail.count == 0 ? '无限制' : goodsDetail.count;
                        this.goodsDetailList.danwei = goodsDetail.unit;
                        this.goodsDetailList.huohao = goodsDetail.sn;
                        this.goodsDetailList.zhutotle = goodsDetail.specTitle;
                        this.goodsDetailList.label = goodsDetail.detailHtml;
                        this.goodsDetailList.imgUrl = localStorage.getItem('imgUrl') + goodsDetail.detailHtml;
                        this.goodsDetailList.canshu = JSON.parse(goodsDetail.parameter);
                        this.prodAttrList = data.data.prodAttrList;
                        if (data.data.prodAttrSubList != '') {
                            var subNList = [];
                            data.data.prodAttrSubList.forEach(function (val, index) {
                                subNList[index] = val;
                                subNList[index].subName = JSON.parse(val.subName);
                            });
                            this.prodAttrSubList = subNList;
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
.goodsDetail {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
}
.goodsDetail-top {
    width: 100%;
    height: 45px;
    line-height: 45px;
    padding-left: 20px;
    background-color: #fafbfa;
    margin-top: 20px;
}
.textnext {
    margin-top: 20px;
}
.img {
    width: 148px;
    height: 148px;
    margin-left: 10px;
    float: left;
}
.video {
    width: 300px;
    height: 160px;
}
.detail {
    padding-top: 50px;
    display: flex;
}
.goodsDetail .returnBtn {
    width: 90px;
    height: 30px;
    background-color: #2482d2;
    padding: 0;
    color: #fff;
    margin-left: 50%;
}
.el-form-item .el-form-item__label {
    text-align: right;
}
.goodinput {
    width: 100%;
}
.goodinput .el-input__inner {
    border: 0;
}
.goodsDetail .ql-editor img {
    width: 200px;
    height: auto;
}
.dsadsadsa .dsad img {
    display: inline-block;
    float: left;
    margin-left: 10px;
    width: 200px;
}
</style>
