<template>
    <div>
        <div class="topInput">
            <p class="topClassp">企业查询</p>
        </div>
        <div class="navTop">
            <tempnent></tempnent>
        </div>
        <Table border :columns="columnsData1" :data="DataList1"></Table>
    </div>
</template>

<script>
import tempnent from './components/tempnent.vue';
export default {
    data() {
        return {
            value: '',
            value2: [],
            columnsData1: [
                {
                    title: '企业名称',
                    key: 'cole1',
                    align: 'center'
                },
                {
                    title: '法人姓名',
                    key: 'cole2',
                    align: 'center'
                },
                {
                    title: '手机号码',
                    key: 'cole3',
                    align: 'center'
                },
                {
                    title: '合作企业',
                    key: 'cole4',
                    align: 'center'
                },
                {
                    title: '企业类型',
                    key: 'cole5',
                    align: 'center'
                },
                {
                    title: '达成时间',
                    key: 'cole6',
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (xyr, params) => {
                        return xyr('div', [
                            xyr(
                                'Button',
                                {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        fontSize: '12px',
                                        background: '#109955'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                path: './tablexyrCopy'
                                            });
                                        }
                                    }
                                },
                                '查看'
                            )
                        ]);
                    }
                }
            ],
            DataList1: [
                {
                    cole1: 'John Brown',
                    cole2: 18,
                    cole3: 'New York No. 1 Lake Park',
                    cole4: 18,
                    cole5: 18,
                    cole6: 18
                }
            ]
        };
    },
    components: {
        tempnent
    },
    methods: {
        fgetLocalTime() {}
    }
};
</script>

<style scoped>
.topClassp {
    margin-top: 64px;
}
.navTop {
    padding: 20px 0px;
}
.bTnClass {
    padding: 0px 50px;
}
</style>