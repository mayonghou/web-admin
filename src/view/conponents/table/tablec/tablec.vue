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
                    title: '支付方式', // orderInfo=>payType
                    key: 'payType',
                    align: 'center'
                },
                {
                    title: '订单类型', // orderInfo=>orderType
                    key: 'orderType',
                    align: 'center'
                },
                {
                    title: '创建时间', // orderInfo=>createTime
                    key: 'createTime',
                    align: 'center'
                },
                {
                    title: '发货单号', // orderInfo=>deliverySn
                    key: 'deliverySn',
                    align: 'center'
                },
                {
                    title: '活动信息', // orderInfo=>promotionInfo
                    key: 'promotionInfo',
                    align: 'center'
                }
            ],
            dataSource: [
                {
                    payType: '',
                    orderType: '',
                    createTime: '',
                    deliverySn: '',
                    promotionInfo: ''
                }
            ]
        };
    },
    methods: {
        dataSourcerer() {
            this.dataSource.forEach((val, ind) => {
                let methodsflash = this.dataer.orderInfo.payType;
                if (methodsflash == 0) {
                    methodsflash = '未支付';
                } else if (methodsflash) {
                    methodsflash = '支付宝';
                } else if (methodsflash) {
                    methodsflash = '微信';
                }
                val.payType = methodsflash;
                // 订单类型：0->正常订单；1->活动订单
                let orderethod = this.dataer.orderInfo.orderType;
                if (orderethod == 0) {
                    orderethod = '正常订单';
                } else if (orderethod == 1) {
                    orderethod = '活动订单';
                }
                val.orderType = orderethod;
                val.createTime = this.dataer.orderInfo.createTime;
                val.deliverySn = this.dataer.orderInfo.deliverySn;
                val.promotionInfo = this.dataer.orderInfo.promotionInfo;
            });
        }
    },
    mounted() {
        this.dataSourcerer();
    }
};
</script>

<style scoped>
</style>