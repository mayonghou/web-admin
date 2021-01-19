<template>
    <!-- 营销订单的确认 -->
    <div class="orderConfirm" id="orderConfirm">
        <div class="order-message">
            <div class="message-top">
                <span class="message-titles">确定订单消息</span>
                <span class="message-bb">请在2小时内完成支付，否则订单会被自动取消</span>
            </div>
            <div class="message-order">
                <el-avatar :size="size" :src="this.sellerAvatar"></el-avatar>
                <div class="message-zhangzhao">
                    <div class="account">购买账号：{{this.dataList.payUser}}</div>
                    <div class="zhuyishixiang">注意：购买后不支持退款，在设置期限内未完成您的订单，将自动退款。请确认任务期限时间后再提交订单</div>
                </div>
            </div>
            <div class="zhifufangshi">
                <h2>支付方式</h2>
                <span>{{this.dataList.payChannel}}</span>
            </div>
            <div class="goumaineirong">
                <h2>购买内容</h2>
                <div class="goumeiMessage">
                    <div class="goumaiBanner">
                        <el-carousel height="114px">
                            <el-carousel-item v-for="(item, ind) in this.imgUrl" :key="ind">
                                <img width="100%" height="100%" :src="item" />
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div class="message-geren">
                        <div class="message-avatar">
                            <el-avatar :size="size" :src="this.goumairenavatar"></el-avatar>
                            <!-- <i style="color: ;" class="iconfont icon-nan"></i>性别 -->
                            <span style="margin-left: 10px;">{{this.dataList.sellerName}}</span>
                        </div>
                        <div class="hangyejingyan">
                            <span class="sssss">{{this.dataList.sellerCareer}}</span>
                            <span class="sssss">{{this.dataList.sellerWorkExp}}</span>
                        </div>
                    </div>
                </div>
                <div class="orderyaoqiu">
                    <div
                        style="margin-left: 10px; line-height: 40px; font-size: 14px; color: #010101;"
                    >订单要求:</div>
                    <div
                        style="margin-left: 40px; line-height: 40px;"
                    >{{this.dataList.requirements}}</div>
                    <div class="ordernumber">
                        <span>订单内容及数量：</span>
                        <div
                            style="margin-left: 10px;"
                            v-for="(item, index) in this.dataList.taskList"
                            :key="index"
                        >
                            <span class="spantupan">{{item.sidelineTypeName}}</span>
                            <span style="margin-left: 10px;">x{{item.totalNum}}</span>
                        </div>
                    </div>
                    <div class="renwuqixian">
                        <span>订单任务期限：</span>
                        <span>{{this.Times}}</span>
                        <span style="margin-left: 10px; color: #FF8D00;">共{{this.dayDiff}}天</span>
                    </div>
                    <div class="chengjiaoPrice">
                        <span style="font-size: 14px;">成交价格：</span>
                        <span
                            style="font-size: 18px; color: #010101;"
                        >￥{{this.dataList.actualTotalPrice / 100}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="liqizhifgu">
            <div>
                <span>实付：</span>
                <span
                    style="color: #F86501; font-size: 26px; font-weight: bold;"
                >￥{{this.dataList.actualTotalPrice / 100}}</span>
            </div>
            <el-button @click="priceBtn" class="shifuBtn">立即支付</el-button>
        </div>
        <el-dialog title="请支付" :visible.sync="dialogVisible" width="30%">
            <img class="imgdialog" :src="'data:image/jpg;base64,'+imgBase64" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'orderConfirm',
    data() {
        return {
            imgBase64: '',
            size: 50,
            dataList: {},
            imgUrl: [],
            sellerAvatar: '',
            Times: '',
            dayDiff: '', //天数
            goumairenavatar: '',
            dialogVisible: false
        };
    },
    mounted() {
        this.getDataorder();
    },
    methods: {
        priceBtn() {
            this.dialogVisible = true;
        },
        getDataorder() {
            console.log('sjafikj');
            let id = this.$route.query.data;
            this.$axios.post('admin/sideline/order/query/' + id).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.dataList = data.data;
                        this.imgBase64 = this.dataList.qrCodeBase64;
                        let date = new Date(data.data.submitTime);
                        let date1 = new Date(data.data.endTime);
                        let time =
                            date.getFullYear() +
                            '-' +
                            (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                            '-' +
                            date.getDate();
                        let time1 =
                            date1.getFullYear() +
                            '-' +
                            (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() + 1) +
                            '-' +
                            date1.getDate();
                        this.Times = time + ' --- ' + time1;

                        var dateDiff = date1.getTime() - date.getTime(); //时间差的毫秒数
                        this.dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
                        console.log(this.dayDiff);

                        var https = /^https:\/\/.+$/;

                        if (https.test(localStorage.getItem('avatar'))) {
                            this.goumairenavatar = localStorage.getItem('avatar');
                        } else {
                            this.goumairenavatar = localStorage.getItem('imgUrl') + localStorage.getItem('avatar');
                        }

                        let img = [];
                        if (https.test(data.data.sellerAvatar)) {
                            this.sellerAvatar = data.data.sellerAvatar;
                        } else {
                            this.sellerAvatar = localStorage.getItem('imgUrl') + data.data.sellerAvatar;
                        }
                        data.data.sellerWorksPictures.split(';').forEach(function (val, index) {
                            if (https.test(val)) {
                                img[index] = val;
                            } else {
                                img[index] = localStorage.getItem('imgUrl') + val;
                            }
                        });
                        this.imgUrl = img;
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

<style>
.orderConfirm {
    box-sizing: border-box;
    width: 100%;
    padding: 20px 100px;
    background-color: #f5f7fc;
}
.order-message {
    background-color: #ffffff;
    padding: 20px;
}
.message-top {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;
    line-height: 50px;
}
.message-titles {
    font-size: 20px;
    color: #101010;
    display: inline-block;
}
.message-bb {
    color: #8f8e94;
    margin-left: 24px;
    display: inline-block;
}
.message-order {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
}
.message-order .img {
    width: 35px;
    height: 35px;
}
.message-zhangzhao {
    margin-left: 20px;
    font-family: SourceHanSansSC-regular;
}
.message-zhangzhao .account {
    color: #101010;
    font-size: 16px;
}
.message-zhangzhao .zhuyishixiang {
    color: #8f8e94;
    font-size: 12px;
}
.zhifufangshi {
    margin-top: 20px;
}
.goumaineirong {
    margin-top: 20px;
    padding-bottom: 30px;
}
.goumaiBanner {
    margin-top: 10px;
    height: 114px;
    width: 230px;
    border: 1px solid #c1c1c1;
}
.goumeiMessage {
    display: flex;
    flex-direction: row;
}
.goumeiMessage .message-geren {
    margin-left: 20px;
}
.message-avatar {
    display: flex;
    flex-direction: row;
}
.hangyejingyan {
    display: flex;
    align-items: center;
}
.hangyejingyan span:nth-child(2) {
    margin-left: 20px;
    font-size: 14px;
}
.ordernumber {
    line-height: 40px;
    display: flex;
    align-items: center;
}
.spantupan {
    width: 90px;
    display: inline-block;
    height: 25px;
    border: 1px solid #ff8d00;
    color: #ff8d00;
    text-align: center;
    line-height: 25px;
}
.chengjiaoPrice {
    float: right;
}
.liqizhifgu {
    margin-top: 20px;
    background-color: #fefcef;
    padding: 20px;
    text-align: right;
}
.liqizhifgu .shifuBtn {
    width: 160px;
    height: 40px;
    background-color: #f86501;
    color: #fff;
    font-size: 18px;
}
.el-carousel__button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
}
.imgdialog {
    width: 100%;
}
</style>
