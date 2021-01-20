<template>
    <Table border :columns="ModalTable" :data="ModalTableData" footer-hide="true"></Table>
</template>

<script>
export default {
    props: ['ModalTableData'],
    data() {
        return {
            ModalTable: [
                {
                    title: '序号',
                    key: 'key0',
                    type: 'index',
                    width: 70,
                    align: 'center'
                },
                {
                    title: '订单编号',
                    key: 'orderSn',
                    align: 'center'
                },
                {
                    title: '客户名',
                    key: 'userName',
                    align: 'center'
                },
                {
                    title: '订单金额',
                    key: 'payAmount',
                    align: 'center'
                },
                {
                    title: '客服来源',
                    key: 'sourceUserName',
                    align: 'center'
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index);
                                        }
                                    }
                                },
                                '查看详情'
                            )
                        ]);
                    }
                }
            ]
        };
    },
    created() {},
    methods: {
        show(index) {
            this.$router.push({
                path: './details',
                query: {}
            });
        }
    }
};
</script>

<style scoped>
</style>