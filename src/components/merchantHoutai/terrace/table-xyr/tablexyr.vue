<template>
    <div>
        <div class="topInput">
            <p class="topClassp">企业查询</p>
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
        <!-- 分页 -->
        <el-pagination
            class="pagintion"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30,40]"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="counts"
        ></el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: '',
            value2: [],
            TimeRub: '',
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
                    title: '合作企业',
                    key: 'cole4',
                    align: 'center',
                    render: (h, p) => {
                        return h('div', [
                            h(
                                'span',
                                {
                                    props: {},
                                    style: {
                                        color: '#2450D2',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            alert('待编辑');
                                        }
                                    }
                                },
                                p.row.cole4
                            )
                        ]);
                    }
                },
                {
                    title: '企业类型',
                    key: 'businessType',
                    align: 'center'
                },
                {
                    title: '达成时间',
                    key: 'time',
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
                                                path: './tablexyrCopy',
                                                query: {
                                                    id: params.row.company.id
                                                }
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
                    name: '',
                    legal: '',
                    serverPhone: '',
                    cole4: '',
                    businessType: '',
                    time: ''
                }
            ]
        };
    },
    components: {},
    created() {},
    mounted() {
        this.requestData();
    },
    methods: {
        // 页码
        handleSizeChange(val) {
            this.limit = val;
            this.requestData();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.requestData();
        },
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
        btnData() {
            //查询数据
            this.requestData();
        },
        // table // $ajax
        requestData() {
            const url = 'admin/company/common/list';
            let data = {
                beginTime: this.beginTime,
                endTime: this.endTime,
                // industryId: this.$route.query.id,
                limit: this.limit,
                name: this.value,
                page: this.page
            };
            this.$axios
                .post(url, data)
                .then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            let Dataer = data.data;
                            let nerDataer = [];
                            this.counts = res.data.totalCount;
                            Dataer.forEach((val, ind) => {
                                nerDataer[ind] = val;
                                nerDataer[ind].name = val.company.name;
                                nerDataer[ind].legal = val.company.legal;
                                nerDataer[ind].serverPhone = val.company.serverPhone;
                                nerDataer[ind].cole4 = val.partners.length + '家'; //render
                                if (val.company.businessType == 0) {
                                    val.company.businessType = '企业单位';
                                } else if (val.company.businessType == 1) {
                                    val.company.businessType = '事业单位';
                                } else if (val.company.businessType == 2) {
                                    val.company.businessType = '社会团体';
                                } else if (val.company.businessType == 3) {
                                    val.company.businessType = '个体经营';
                                } else if (val.company.businessType == 4) {
                                    val.company.businessType = '其他';
                                }
                                nerDataer[ind].businessType = val.company.businessType;
                                var date = new Date(val.company.time);
                                var time1 =
                                    date.getFullYear() +
                                    '-' +
                                    (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                                    '-' +
                                    date.getDate();
                                nerDataer[ind].time = time1;
                            });
                            this.DataList1 = nerDataer;
                        }
                    }
                })
                .catch((err) => {});
        }
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
