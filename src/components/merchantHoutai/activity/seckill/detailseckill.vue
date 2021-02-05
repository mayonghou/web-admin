<template>
    <div class="detailseckill" id="detailseckill">
        <div class="coupon-top">
            <label>秒杀活动信息</label>
        </div>
        <el-form :model="detailseckill" ref="detailseckill">
            <el-form-item label="活动标题:" :label-width="labelWidth">
                <el-input v-model="detailseckill.title" readonly class="inputText"></el-input>
            </el-form-item>
            <el-form-item label="活动商品:" :label-width="labelWidth">
                <el-button
                    v-model="detailseckill.goods"
                    @click="goodDetail"
                    type="text"
                    class="inputText"
                >{{detailseckill.goods}}</el-button>
            </el-form-item>
            <el-form-item label="发布数量:" :label-width="labelWidth">
                <el-input v-model="detailseckill.number" readonly class="inputText"></el-input>
            </el-form-item>
            <el-form-item label="活动标签:" :label-width="labelWidth">
                <el-tag
                    effect="plain"
                    type="info"
                    :key="item"
                    v-for="item in this.detailseckill.tdynamicTags"
                    v-model="detailseckill.tdynamicTags"
                    class="eltag"
                >{{item}}</el-tag>
            </el-form-item>
            <el-form-item label="秒杀价:" :label-width="labelWidth">
                <el-input v-model="detailseckill.seckillPrice" readonly class="inputText"></el-input>
            </el-form-item>
            <el-form-item label="秒杀时间:" :label-width="labelWidth">
                <el-input v-model="detailseckill.time" readonly class="inputText"></el-input>
            </el-form-item>
            <el-form-item label="每人限购:" :label-width="labelWidth">
                <el-input v-model="detailseckill.limitation" readonly class="inputText"></el-input>
            </el-form-item>
        </el-form>
        <div class="addcouponBtn">
            <el-button @click="returnBtn" class="buttonr mL">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'detailseckill',
    data() {
        return {
            labelWidth: '230px',
            detailseckill: {
                title: '',
                goods: '',
                number: '',
                tdynamicTags: [],
                seckillPrice: '',
                time: '',
                limitation: ''
            },
            productId: ''
        };
    },
    mounted() {
        this.getSeckillList();
    },
    methods: {
        goodDetail() {
            this.$router.push({
                path: './goodsDetail',
                query: {
                    id: this.productId,
                    status: 4
                }
            });
        },
        getSeckillList() {
            var data = this.$route.query.data;
            this.productId = data.productId;
            this.detailseckill.title = data.title;
            this.detailseckill.goods = data.productName;
            this.detailseckill.number = data.productNum;
            this.detailseckill.tdynamicTags = data.activityTabs.split(',');
            this.detailseckill.seckillPrice = data.activityPrice + '元';
            var date = new Date(data.startTime);
            var time1 =
                date.getFullYear() +
                '-' +
                (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                '-' +
                date.getDate(); //+ ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            var date1 = new Date(data.endTime);
            var time2 =
                date1.getFullYear() +
                '-' +
                (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() + 1) +
                '-' +
                date1.getDate(); // + ' ' + date1.getHours() + ':' + date1.getMinutes() + ':' + date1.getSeconds();
            this.detailseckill.time = time1 + ' ---- ' + time2;
            this.detailseckill.limitation = data.numLimitation == 0 ? '不限' : data.numLimitation;
        },
        returnBtn() {
            this.$router.push({
                path: './seckill'
            });
        }
    }
};
</script>

<style>
.detailseckill {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
}
.coupon-top {
    width: 100%;
    height: 45px;
    line-height: 45px;
    background-color: #fafafa;
    margin-bottom: 20px;
    margin-top: 20px;
    padding-left: 20px;
}

.detailseckill .el-form-item__label {
    text-align: right;
}
.eltag {
    margin-left: 20px;
}
.inputText .el-input__inner {
    border: 0;
    width: 250px;
}
.seleLabel {
    width: 260px;
    display: block;
    text-align: center;
    float: left;
}
.couponhedong .selectBtn {
    width: 76px;
    height: 21px;
    background-color: #2450d2;
    color: #fff;
    padding: 0;
    border-radius: 8px;
}
.couponSel {
    width: 200px;
    height: 50px;
    border: 1px solid #2450d2;
    color: #2450d2;
}
.couponSel:hover {
    border: 1px solid #2450d2;
    color: #2450d2;
    background-color: #fff;
}
.danwei {
    position: absolute;
    left: 310px;
    top: 2px;
}
.el-date-editor {
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid #ccc;
}
.addcouponBtn {
    margin-left: 30%;
    margin-top: 100px;
}
.addcouponBtn .buttonr {
    width: 90px;
    height: 30px;
    border-radius: 8px;
    background-color: #2450d2;
    color: #fff;
}
</style>
