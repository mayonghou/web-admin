<template>
    <div class="navTem">
        <div class="topInput">
            <p class="topClassp">企业查询</p>
            <Button type="primary" class="returnBtn" @click="returnRouter">返回</Button>
        </div>
        <div class="navTop">
            <Row>
                <Col span="12">
                    <Input
                        v-model="value"
                        placeholder="请输入企业、法人名称..."
                        style="width: 200px;margin-right:20px"
                    />
                    <el-date-picker
                        v-model="value2"
                        type="daterange"
						class="eldateeditor"
                        range-separator="——"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        @change="fgetLocalTime"
                    ></el-date-picker>
                    <Button type="primary" class="bTnClass" @click="btnData">查询</Button>
                </Col>
            </Row>
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
export default {
    data() {
        return {
            value: '',
            value2: [],
            beginTime: '',
            endTime: '',
            page: 1,
            limit: 10,
            counts: this.counts,
            columnsData1: [
                {
                    title: '企业名称',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '法人姓名',
                    key: 'legal',
                    align: 'center'
                },
                {
                    title: '手机号码',
                    key: 'serverPhone',
                    align: 'center'
                },
                {
                    title: '达成合作时间',
                    key: 'time',
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
                                                path: './viewdata',
                                                query: {
                                                    id: params.row.company.id
                                                }
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
                    name: '',
                    legal: 18,
                    serverPhone: '',
                    time: 18
                }
            ]
        };
    },
    created() {},
    mounted() {
        this.requestData();
    },
    components: {},
    methods: {
        returnRouter() {
            this.$router.push({
                path: './businessmanage'
            });
        },
        // 页码
        handleSizeChange(val) {
            this.limit = val;
            this.requestData();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.requestData();
        },
        btnData() {},
        fgetLocalTime(value) {
            //时间段选择
            if (value != null) {
                let date = new Date(value[0]);
                let beginTime = date.getTime(date);
                this.beginTime = beginTime;
                let date1 = new Date(value[1]);
                let endTime = date1.getTime(date1);
                this.endTime = endTime;
            } else {
                this.beginTime = '';
                this.endTime = '';
            }
        },
        // $ajax
        requestData() {
            const url =
                'admin/company/teamwork/list?beginTime=' +
                this.beginTime +
                '&endTime=' +
                this.endTime +
                '&companyId=' +
                this.$route.query.id +
                '&name=' +
                this.value +
                '&page=' +
                this.page +
                '&limit=' +
                this.limit;
            this.$axios
                .get(url)
                .then((res) => {
                    if (res.status == 200 && res.data.code == 200) {
                        this.counts = res.data.totalCount;
                        let newDatw = [];
                        res.data.data.forEach((val, index) => {
                            newDatw[index] = val;
                            newDatw[index].name = val.company.name;
                            newDatw[index].legal = val.company.legal;
                            newDatw[index].serverPhone = val.company.serverPhone;
                            let date = new Date(val.time);
                            let time1 =
                                date.getFullYear() +
                                '-' +
                                (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                                '-' +
                                date.getDate();
                            newDatw[index].time = time1;
                        });
                        this.DataList1 = newDatw;
                    }
                })
                .catch((err) => {});
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
.eldateeditor {
    border: 1px solid #dcdee2 ;
}
.bTnClass{
	margin-left: 10px;
}
</style>