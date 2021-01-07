<template>
    <div class="table_css_xiaoyuer">
        <!-- 订单详情-->
        <div class="top-compo">
            <h4 class="spanTexttitle">订单详情</h4>
            <div class="dindzt">
                <span class="fontcolor">订单状态：未支付</span>
            </div>
            <div class="jbxiButton">
                <span class="fontweight">基本信息</span>
                <button class="returnbutton" @click="returnddlb">返回</button>
            </div>
            <div class="padding-tabeler">
                <tableb v-if="this.dataer != ''" :dataer="dataer"></tableb>
            </div>
            <div class="padding-tabeler">
                <tablec v-if="this.dataer != ''" :dataer="dataer"></tablec>
            </div>
            <div class="jbxiButton2">
                <span class="fontweight">发货信息</span>
            </div>
            <tabled v-if="this.dataer != ''" :dataer="dataer"></tabled>
            <div class="jbxiButton3">
                <span class="fontweight">商品信息</span>
            </div>
            <tableh v-if="this.dataer != ''" :dataer="dataer"></tableh>
            <div class="jbxiButton3">
                <span class="fontweight">费用信息</span>
            </div>
            <div class="endtable">
                <div class="padding-tabeler">
                    <tablef v-if="this.dataer != ''" :dataer="dataer"></tablef>
                </div>
                <div class="padding-tabeler">
                    <tableg v-if="this.dataer != ''" :dataer="dataer"></tableg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import tableb from '../../conponents/table/tableb/tableb';
import tablec from '../../conponents/table/tablec/tablec';
import tabled from '../../conponents/table/tabled/tabled';
import tablef from '../../conponents/table/tablef/tablef';
import tableg from '../../conponents/table/tableg/tableg';
import tableh from '../../conponents/table/tableh/tableh';
export default {
    data() {
        return {
            dataer: ''
        };
    },
    components: {
        tableb,
        tablec,
        tabled,
        tablef,
        tableg,
        tableh
    },
    methods: {
        returnddlb() {
            this.$router.push({
                path: './orderlistb'
            });
        },
        GetDataFunction() {
            let url = 'admin/order/adminQueryOrderInfo' + '?orderId=' + this.$route.query.id;
            this.$axios
                .get(url)
                .then((res) => {
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            let gettersData = res.data.data;
                            this.$nextTick(() => {
                                this.dataer = gettersData;
                            });
                        }
                    }
                })
                .then((err) => {});
        }
    },
    mounted() {
        this.GetDataFunction();
    }
};
</script>

<style scoped>
.dindzt {
    display: flex;
    flex-direction: row-reverse;
}
.jbxiButton {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.fontcolor {
    color: #ff8d00;
}
.returnbutton {
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    background-color: #2450d2;
    width: 94px;
    height: 32px;
    color: #fff;
    border: #2450d2;
    border-radius: 5px;
}
.fontweight {
    font-weight: 600;
}
.jbxiButton {
    padding: 30px 0px 13px 0px;
}
.jbxiButton2 {
    padding: 44px 0px 13px 0px;
}
.jbxiButton3 {
    padding: 34px 0px 13px 0px;
}
.endtable {
    margin-bottom: 50px;
}
.padding-tabeler {
    box-sizing: border-box;
    padding: 10px 0;
}
</style>