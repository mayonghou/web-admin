<template>
    <Card>
        <table class="TableClassxi">
            <thead>
                <th colspan="2" class="ThClassTanle">订单情况</th>
            </thead>
            <tbody>
                <tr class="TrClassTable">
                    <td>待支付订单</td>
                    <td class="AlignClass">33</td>
                </tr>
                <tr class="TrClassTable">
                    <td>待发货订单</td>
                    <td class="AlignClass">33</td>
                </tr>
                <tr class="TrClassTable">
                    <td>待收货订单</td>
                    <td class="AlignClass">33</td>
                </tr>
                <tr class="TrClassTable">
                    <td>已成交订单</td>
                    <td class="AlignClass">33</td>
                </tr>
                <tr class="TrClassTable">
                    <td>交易失败订单</td>
                    <td class="AlignClass">33</td>
                </tr>
            </tbody>
        </table>
    </Card>
</template>
<script>
export default {};
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