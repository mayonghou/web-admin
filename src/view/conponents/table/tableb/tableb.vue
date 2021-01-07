<template>
    <div>
        <Table :columns="dataentrance" :data="orderInfo" border></Table>
    </div>
</template>
<script>
export default {
    props: ['dataer'],
    data() {
        return {
            dataentrance: [
                {
                    title: '订单编号', // orderInfo=>orderSn
                    key: 'orderSn',
                    align: 'center'
                },
                {
                    title: '客户姓名', //   orderInfo=>  memberName
                    key: 'memberName',
                    align: 'center'
                },
                {
                    title: '订单金额', //  orderInfo=> payAmount
                    key: 'payAmount',
                    align: 'center'
                },
                {
                    title: '客服姓名', // orderInfo=>consumerService
                    key: 'consumerService',
                    align: 'center'
                },
                {
                    title: '配送类型', //  orderInfo=>selfRaisingMethod
                    key: 'selfRaisingMethod',
                    align: 'center'
                }
            ],
            orderInfo: [
                {
                    orderSn: '',
                    memberName: '',
                    payAmount: '',
                    consumerService: '',
                    selfRaisingMethod: ''
                }
            ]
        };
    },
    methods: {
        dataprocessing() {
            this.orderInfo.forEach((item, index) => {
                item.orderSn = this.dataer.orderInfo.orderSn;
                item.memberName = this.dataer.orderInfo.memberName;
                item.payAmount = this.dataer.orderInfo.payAmount;
                item.consumerService = this.dataer.orderInfo.consumerService;
                item.selfRaisingMethod = this.dataer.orderInfo.selfRaisingMethod;
            });
        }
    },
    mounted() {
        this.dataprocessing();
    }
};
</script>

<style scoped>
</style>