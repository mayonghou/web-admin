<template>
    <Card>
        <table class="TableClassxi">
            <thead>
                <th
                    colspan="2"
                    class="ThClassTanle"
                >{{this.status==1?'订单情况：':this.status==2?'商品情况':'商家情况'}}</th>
            </thead>
            <tbody>
                <tr class="TrClassTable">
                    <td>{{this.status==1?'待支付订单：':this.status==2?'待审核商品：':'正在进行中活动数量：'}}</td>
                    <td
                        class="AlignClass"
                    >{{this.status==1? this.orderCountssituation.noPayCount : this.status==2? this.goodsCountssituation.noVerifyCount : this.ConsumerCountssituation.activityCount}}</td>
                </tr>
                <tr class="TrClassTable">
                    <td>{{this.status==1?'待发货订单：':this.status==2?'上架商品：':'商家团队名片总量：'}}</td>
                    <td
                        class="AlignClass"
                    >{{this.status==1?this.orderCountssituation.noReceiveCount : this.status==2?this.goodsCountssituation.upCount : this.ConsumerCountssituation.cardCount}}</td>
                </tr>
                <tr class="TrClassTable">
                    <td>{{this.status==1?'待收货订单：':this.status==2?'下架商品：':'今日活跃：'}}</td>
                    <td
                        class="AlignClass"
                    >{{this.status==1?this.orderCountssituation.noSendCount : this.status==2?this.goodsCountssituation.dnCount :this.ConsumerCountssituation.activeCount}}</td>
                </tr>
                <tr class="TrClassTable">
                    <td>{{this.status==1?'已成交订单：':this.status==2?' ':' '}}</td>
                    <td
                        class="AlignClass"
                    >{{this.status==1?this.orderCountssituation.successCount : this.status==2?' ':' '}}</td>
                </tr>
                <tr class="TrClassTable">
                    <td>{{this.status==1?'交易失败订单：':this.status==2?' ':' '}}</td>
                    <td
                        class="AlignClass"
                    >{{this.status==1?this.orderCountssituation.failCount : this.status==2?' ':' '}}</td>
                </tr>
            </tbody>
        </table>
    </Card>
</template>
<script>
export default {
    props: [
        'status',
        // 订单
        'orderCountssituation',
        // 商品
        'goodsCountssituation',
        // 商家
        'ConsumerCountssituation'
    ]
};
</script>

<style scope>
.TableClassxi {
    width: 100%;
}
.ThClassTanle {
    background: #f6f6f7;
    text-align: left;
    padding: 8px 10px;
}
.TrClassTable {
    display: block;
    padding: 8px 0px;
    border-bottom: #e4e7ed 1px solid;
    position: relative;
    border-radius: 3px;
    height: 42px;
}
.TrClassTable:hover {
    background-color: #f6f6f7;
}
.AlignClass {
    position: absolute;
    right: 0;
    top: 25%;
    text-align: right;
    color: #55ca7d;
}
</style>