<template>
    <Card>
        <div class="Statisticsa">
            <div class="StatisticsaA staistic">
                <span class="StatisticsaB">{{this.merchked == 1?'商家统计':'商品统计'}}</span>
                <span>单位（{{this.merchked == 1?'个':'件'}}）</span>
            </div>
            <div class="StatisticsaA">
                <table class="tableClass">
                    <thead>
                        <tr>
                            <td>{{this.merchked == 1?this.merchantData.toDayAdd:this.shoppCountsData.total}}</td>
                            <td
                                style=" text-align: center;"
                            >{{this.merchked == 1?this.merchantData.yesDayAdd:this.shoppCountsData.endorsement}}</td>
                            <td
                                style=" text-align: center;"
                            >{{this.merchked == 1?this.merchantData.monthAdd:this.shoppCountsData.toDayUp}}</td>
                            <td
                                style=" text-align: right;"
                            >{{this.merchked == 1?this.merchantData.total:this.shoppCountsData.toDayDn }}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{this.merchked == 1?'今日新增':'商品总数'}}</td>
                            <td style=" text-align: center;">{{this.merchked == 1?'昨日新增':'代言企业'}}</td>
                            <td style=" text-align: center;">{{this.merchked == 1?'本月新增':'今日上架'}}</td>
                            <td style=" text-align: right;">{{this.merchked == 1?'商家总数':'今日下架'}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </Card>
</template>

<script>
export default {
    props: ['merchantData', 'merchked', 'shoppCountsData'],
    data() {
        return {};
    },
    mounted() {},
    methods: {}
};
</script>

<style scope>
.Statisticsa {
    width: 100%;
    height: auto;
}
.StatisticsaA {
    display: flex;
    padding: 10px;
    justify-content: space-between;
}
.StatisticsaB {
    font-weight: 600;
}
.tableClass {
    width: 100%;
}
.tableClass thead tr td {
    font-size: 28px;
}
.staistic {
    background-color: #f6f6f7;
    border-radius: 3px;
}
</style>