<template>
    <div>
        <div class="setPadding">
            <div>
                <MallData :saleTotal="saleTotal"></MallData>
            </div>
            <div>
                <MallDatb :orderTotal="orderTotal"></MallDatb>
            </div>
            <div>
                <MallDatc :sendGoodsTotal="sendGoodsTotal"></MallDatc>
            </div>
            <div>
                <MallDatd :viewTotal="viewTotal"></MallDatd>
            </div>
        </div>
        <div class="secondCLass">
            <div class="OneClass">
                <Statisticsa v-if="merchantData != ''" :merchantData="merchantData" :merchked="1"></Statisticsa>
            </div>
            <div class="TwoClass">
                <Statisticsa
                    v-if="shoppCountsData !=''"
                    :merchked="2"
                    :shoppCountsData="shoppCountsData"
                ></Statisticsa>
            </div>
        </div>
        <div class="secondCLass">
            <div>
                <div class="loyadClass">
                    <!--  v-for="(item,index) in 3" :key="index" -->
                    <div class="three">
                        <listTable :status="1" :orderCountssituation="orderCountssituation"></listTable>
                    </div>
                    <div class="three">
                        <listTable :status="2" :goodsCountssituation="goodsCountssituation"></listTable>
                    </div>
                    <div class="three">
                        <listTable :status="3" :ConsumerCountssituation="ConsumerCountssituation"></listTable>
                    </div>
                </div>
                <div class="xiaoyuer-f">
                    <Echarse :conversionRate="conversionRate" :repeatRate="repeatRate"></Echarse>
                </div>
            </div>
            <div class="xiaoyuer-d">
                <rightcode v-if="productList != ''" :productList="productList"></rightcode>
            </div>
        </div>
        <div class="midliieClassStyle">
            <div class="firstChild">
                <div>
                    <LeftEcharse></LeftEcharse>
                </div>
                <div>
                    <BottomEcharse></BottomEcharse>
                </div>
            </div>
            <div class="secondChild">
                <rightList :orderList="orderList"></rightList>
            </div>
        </div>
    </div>
</template>

<script>
import MallData from './components/MallData.vue';
import MallDatb from './components/MallDatb.vue';
import MallDatc from './components/MallDatc.vue';
import MallDatd from './components/MallDatd.vue';
import Statisticsa from './components/Statisticsa.vue';
import listTable from './components/listTable.vue';
import Echarse from './components/Echarse.vue';
import rightcode from './components/rightcode.vue';
import rightList from './components/rightList.vue';
import LeftEcharse from './components/LeftEcharse.vue';
import BottomEcharse from './components/bottomEcharse.vue';
export default {
    data() {
        return {
            merchantData: [],
            shoppCountsData: [],
            goodsCountssituation: [],
            orderCountssituation: [],
            ConsumerCountssituation: [],
            orderTotal: '',
            saleTotal: '',
            sendGoodsTotal: '',
            viewTotal: '',
            conversionRate: '', //平台转化率
            repeatRate: '', //复购率
            orderList: [], //订单量排行
            productList: [] //销售额排行
        };
    },
    components: {
        MallData,
        MallDatb,
        MallDatc,
        MallDatd,
        Statisticsa,
        listTable,
        Echarse,
        rightcode,
        rightList,
        LeftEcharse,
        BottomEcharse
    },
    mounted() {
        this.getqueryPageHeaderData(); // 商城首页-头部4个
        this.getAdminBusinessDataStat(); // 商家统计
        this.getAdminProductDataStat(); // 商品统计
        this.getAdminDataCenterOrder(); // 订单情况
        this.getAdminDataCenterProduct(); //  商品情况
        this.getAdminDataCenterOrder(); //  商品情况
        this.getAdminDataCenterBusinessData(); //  商家情况
        this.getAdminDataCenterPageMiddle(); // 转化率，复购率，订单、销售排行
    },
    methods: {
        // 商城首页-头部4个
        getqueryPageHeaderData() {
            this.$axios.get('admin/mall/queryPageHeaderData').then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if ((data.code = 200)) {
                        this.orderTotal = data.data.orderTotal;
                        this.saleTotal = data.data.saleTotal / 100;
                        this.sendGoodsTotal = data.data.sendGoodsTotal;
                        this.viewTotal = data.data.viewTotal;
                    }
                }
            });
        },
        // 商家统计
        getAdminBusinessDataStat() {
            this.$axios.get('admin/mall/dataCenter/getAdminBusinessDataStat').then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$nextTick(() => {
                            this.merchantData = data.data;
                        });
                    }
                }
            });
        },
        // 商品统计
        getAdminProductDataStat() {
            this.$axios.get('admin/mall/dataCenter/getAdminProductDataStat').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.$nextTick(() => {
                            this.shoppCountsData = data.data;
                        });
                    }
                }
            });
        },
        //  商品情况
        getAdminDataCenterProduct() {
            this.$axios.get('admin/mall/dataCenter/getAdminDataCenterProduct').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.goodsCountssituation = data.data;
                    }
                }
            });
        },
        //  订单情况
        getAdminDataCenterOrder() {
            this.$axios.get('admin/mall/dataCenter/getAdminDataCenterOrder').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.orderCountssituation = data.data;
                    }
                }
            });
        },
        //  商家情况
        getAdminDataCenterBusinessData() {
            this.$axios.get('admin/mall/dataCenter/getAdminDataCenterBusinessData').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.ConsumerCountssituation = data.data;
                    }
                }
            });
        },
        // 转化率，复购率，订单、销售排行
        getAdminDataCenterPageMiddle() {
            this.$axios.get('admin/mall/dataCenter/getAdminDataCenterPageMiddle').then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$nextTick(() => {
                            this.repeatRate = data.data.repeatRate; //复购率
                            this.conversionRate = data.data.conversionRate; //转化率
                            this.productList = data.data.productList;
                            this.orderList = data.data.orderList;
                        });
                    }
                }
            });
        }
    }
};
</script>

<style scope>
@import '../Data-center.css';
.setPadding {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.setPadding div {
    flex-grow: 1;
    margin: 0 5px;
    margin: 5px;
}
.secondCLass {
    padding: 0px 30px 15px 30px;
    display: flex;
    justify-content: space-between;
}
.secondCLass div {
    width: 100%;
}
.secondCLass .OneClass {
    padding-right: 10px;
}
.secondCLass .TwoClass {
    padding-left: 10px;
}
.loyadClass {
    display: flex;
}
.loyadClass .three:nth-child(2) {
    padding: 0 10px;
}
.secondCLass .xiaoyuer-d {
    height: auto;
    width: 350px;
    padding-left: 10px;
}
.xiaoyuer-f {
    padding: 10px 0;
    height: auto;
}
.midliieClassStyle {
    width: 100%;
    box-sizing: border-box;
    padding: 0px 30px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 72px;
}
.midliieClassStyle .firstChild {
    flex-grow: 1;
}
.midliieClassStyle .secondChild {
    width: 320px;
    box-sizing: border-box;
    margin-left: 10px;
}
</style>