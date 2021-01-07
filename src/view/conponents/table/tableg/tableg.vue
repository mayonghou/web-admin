<template>
    <div>
        <Table :columns="colSource" :data="dataSource" border></Table>
    </div>
</template>

<script>
export default {
    props: ['dataer'],
    data() {
        return {
            colSource: [
                {
                    title: '活动优惠合计', // orderInfo=>promotionAmount
                    key: 'promotionAmount',
                    align: 'center'
                },
                {
                    title: '订单总额', //  orderInfo=>totalAmount
                    key: 'totalAmount',
                    align: 'center'
                },
                {
                    title: '应付款金额', //  orderInfo  => payAmount
                    key: 'payAmount',
                    align: 'center'
                }
            ],
            dataSource: [
                {
                    promotionAmount: '小鱼儿',
                    totalAmount: '￥1200',
                    payAmount: '万江烽火'
                }
            ]
        };
    },
    methods: {
        dataSouXiaoyu() {
            let DataReqwuerter = this.dataer.orderInfo;
            this.dataSource.forEach((val, index) => {
                val.promotionAmount = '-￥' + DataReqwuerter.promotionAmount;
                val.totalAmount = '￥' + DataReqwuerter.totalAmount;
                val.payAmount = '￥' + DataReqwuerter.payAmount;
            });
        }
    },
    mounted() {
        this.dataSouXiaoyu();
    }
};
</script>

<style scoped>
</style>