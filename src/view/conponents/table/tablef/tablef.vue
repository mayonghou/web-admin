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
                    title: '商品合计',
                    key: 'totalAmount',
                    align: 'center'
                },
                {
                    title: '配送费',
                    key: 'freightAmount', //orderInfo=>freightAmount
                    align: 'center'
                },
                {
                    title: '优惠券', // orderInfo=>couponAmount
                    key: 'couponAmount',
                    align: 'center'
                }
            ],
            dataSource: [
                {
                    totalAmount: '',
                    freightAmount: '',
                    couponAmount: ''
                }
            ]
        };
    },
    methods: {
        dataSourcercedered() {
            this.dataSource.forEach((val, index) => {
                val.totalAmount = '￥' + this.dataer.orderInfo.totalAmount;
                val.freightAmount = '￥' + this.dataer.orderInfo.freightAmount;
                val.couponAmount = '-￥' + this.dataer.orderInfo.couponAmount;
            });
        }
    },
    mounted() {
        this.dataSourcercedered();
    }
};
</script>

<style scoped>
</style>