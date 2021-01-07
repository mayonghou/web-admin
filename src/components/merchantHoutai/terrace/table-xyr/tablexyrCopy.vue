<template>
    <div class="navTem">
        <div class="topInput">
            <p class="topClassp">企业查询</p>
            <Button type="primary" class="returnBtn" @click="returnRouter">返回</Button>
        </div>
        <div class="navTop">
            <tempnent></tempnent>
        </div>
        <Table border :columns="columnsData1" :data="DataList1"></Table>
        <div>
            <!-- 分页 -->
            <el-pagination
                class="pagintion"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[5, 10, 20, 30]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="counts"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import tempnent from './components/tempnent.vue';
export default {
    data() {
        return {
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
                    title: '达成合作时间',
                    key: 'cole4',
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 220,
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
                                        fontSize: '12px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                path: './viewdata'
                                            });
                                        }
                                    }
                                },
                                '查看数据'
                            ),
                            xyr(
                                'Button',
                                {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        fontSize: '12px'
                                    },
                                    on: {
                                        click: () => {
                                            alert('取消合作');
                                        }
                                    }
                                },
                                '取消合作'
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
                    cole4: 18
                }
            ],
            page: 1,
            limit: 10,
            counts: 0
        };
    },
    components: {
        tempnent
    },
    methods: {
        returnRouter() {
            this.$router.push({
                path: './businessmanage'
            });
        },
        // 页码
        handleSizeChange(val) {
            this.limit = val;
        },
        handleCurrentChange(val) {
            this.page = val;
        }
    }
};
</script>

<style scoped>
.navTem {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0px 50px;
}
.topClassp {
    margin-top: 44px;
}
.navTop {
    padding: 20px 0px;
}
.topInput {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
}
.returnBtn {
    padding: 0px 25px;
}
</style>