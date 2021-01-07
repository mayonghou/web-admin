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
                    title: '收货人', //   orderInfo=>receiverName
                    key: 'receiverName',
                    align: 'center'
                },
                {
                    title: '手机号', //   orderInfo=>receiverPhone
                    key: 'receiverPhone',
                    align: 'center'
                },
                {
                    title: '收货地址', //   orderInfo=>receiverDetailAddress
                    key: 'receiverDetailAddress',
                    align: 'center'
                }
            ],
            dataSource: [
                {
                    receiverName: '小鱼儿',
                    receiverPhone: '12345678912',
                    receiverDetailAddress: '花果园大街'
                }
            ]
        };
    },
    methods: {
        dataSourcerceder() {
            let DataRequest = this.dataer.orderInfo;
            this.dataSource.forEach((val, index) => {
                val.receiverName = DataRequest.receiverName;
                val.receiverPhone = DataRequest.receiverPhone;
                val.receiverDetailAddress = DataRequest.receiverDetailAddress;
            });
        }
    },
    mounted() {
        this.dataSourcerceder();
    }
};
</script>

<style scoped>
</style>