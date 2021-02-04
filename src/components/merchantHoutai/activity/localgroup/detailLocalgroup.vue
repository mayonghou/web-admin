<template>
    <div class="detailLocalgroup" id="detailLocalgroup">
        <div class="coupon-top">
            <label>同城团购活动信息</label>
        </div>
        <el-form :model="detaillocal" ref="detaillocal">
            <el-form-item label="活动商品:" :label-width="labelWidth">
                <label
                    @click="shoppDeatil"
                    style="font-size: 14px; cursor: pointer; color: #2494D2; margin-left: 15px;"
                >{{this.detaillocal.actTitle}}</label>
            </el-form-item>
            <el-form-item label="拼团人数:" prop="teamSize" :label-width="labelWidth">
                <el-tag effect="plain" type="info">{{this.detaillocal.teamSize}}人团</el-tag>
            </el-form-item>
            <el-form-item label="团购价:" :label-width="labelWidth">
                <label>{{this.detaillocal.number}}元</label>
            </el-form-item>
            <el-form-item label="活动时间:" :label-width="labelWidth">
                <label>{{this.detaillocal.actTime}}</label>
            </el-form-item>
            <el-form-item label="模拟成团:" :label-width="labelWidth">
                <label>{{this.detaillocal.automatic == true ? '已开启':'未开启'}}</label>
            </el-form-item>
        </el-form>
        <div class="addcouponBtn">
            <el-button @click="returnbtn" class="buttonr mL">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'detailLocalgroup',
    data() {
        return {
            labelWidth: '230px',
            detaillocal: {
                actTitle: '',
                selhdcoupon: '',
                number: '',
                actTime: '',
                teamSize: '',
                automatic: ''
            },
            productId: ''
        };
    },
    mounted() {
        this.getgroupLists();
    },
    methods: {
        shoppDeatil() {
            this.$router.push({
                path: './goodsDetail',
                query: {
                    id: this.productId,
                    status: 3
                }
            });
        },
        // 获取从列表返回的数据
        getgroupLists() {
            var data = this.$route.query.data;
            console.log(data);
            if (data != undefined) {
                this.detaillocal.teamSize = data.teamSize;
                this.detaillocal.actTitle = data.productName;
                this.detaillocal.selhdcoupon = data.productNum;
                this.detaillocal.tdynamicTags = data.activityTabs.split(',');
                this.detaillocal.number = data.activityPrice;
                this.productId = data.productId;
                var date = new Date(data.startTime);
                var date1s = new Date(data.endTime);
                var time1 =
                    date.getFullYear() +
                    '-' +
                    (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                    '-' +
                    date.getDate();

                var date1 = new Date(data.endTime);
                var time2 =
                    date1s.getFullYear() +
                    '-' +
                    (date1s.getMonth() + 1 < 10 ? '0' + (date1s.getMonth() + 1) : date1s.getMonth() + 1) +
                    '-' +
                    date1s.getDate();
                this.detaillocal.actTime = time1 + '----' + time2;
                this.detaillocal.automatic = data.automatic;
            }
        },
        returnbtn() {
            this.$router.push({
                path: './localgroup'
            });
        }
    }
};
</script>

<style>
.detailLocalgroup {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
}

.eltag {
    margin-left: 20px;
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

.inputEl {
    border: 0;
    border-bottom: 1px solid #c1c1c1;
    border-radius: 0;
    width: 340px;
}

.seleLabel .el-input__inner {
    border: 0;
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
    /* color: #2450D2; */
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
    padding: 0;
}
.el-form-item__label {
    text-align: right;
}
</style>
