<template>
    <Table border :columns="ModalTable" :data="ModalTableData" footer-hide="true"></Table>
</template>

<script>
export default {
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
                    key: 'key1',
                    align: 'center'
                },
                {
                    title: '客户名',
                    key: 'key2',
                    align: 'center'
                },
                {
                    title: '订单金额',
                    key: 'key3',
                    align: 'center'
                },
                {
                    title: '客户来源',
                    key: 'key4',
                    align: 'center'
                },
                {
                    title: '创建时间',
                    key: 'key5',
                    align: 'center'
                },
                {
                    title: 'Action',
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
            ],
            ModalTableData: [
                {
                    key1: 4567819891,
                    key2: '小鱼儿 ',
                    key3: '￥30000',
                    key4: ' BOSS直聘',
                    key5: ' 2020-10-20'
                },
                {
                    key1: 4567819891,
                    key2: '小鱼儿 ',
                    key3: '￥30000',
                    key4: ' BOSS直聘',
                    key5: ' 2020-10-20'
                },
                {
                    key1: 4567819891,
                    key2: '小鱼儿 ',
                    key3: '￥30000',
                    key4: ' BOSS直聘',
                    key5: ' 2020-10-20'
                },
                {
                    key1: 4567819891,
                    key2: '小鱼儿 ',
                    key3: '￥30000',
                    key4: ' BOSS直聘',
                    key5: ' 2020-10-20'
                }
            ]
        };
    },
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