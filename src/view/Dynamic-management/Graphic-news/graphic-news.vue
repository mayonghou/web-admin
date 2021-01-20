<template>
    <!-- 图文动态 -->
    <div class="table_css_xiaoyuer">
        <div class="top-compo">
            <Row style="width: 100%">
                <Col span="12">
                    <Input
                        v-model="value01"
                        placeholder="输入动态关键字..."
                        clearable
                        style="width: 200px; margin-right: 10px"
                    />
                    <Input
                        v-model="value02"
                        placeholder="输入发布企业..."
                        clearable
                        style="width: 200px; margin-right: 10px"
                    />
                    <el-date-picker
                        v-model="value2"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="——"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions"
                        @change="fgetLocalTime"
                    ></el-date-picker>
                    <Select
                        v-model="model1"
                        style="width:150px; margin-right:10px;"
                        placeholder="动态类型"
                    >
                        <Option
                            v-for="item in cityList"
                            :value="item.value"
                            :label="item.label"
                            :key="item.value"
                        ></Option>
                    </Select>
                    <Button
                        @click="CouponDataQuery"
                        type="primary"
                        style="padding-left: 40px; padding-right: 40px"
                    >查询</Button>
                </Col>
            </Row>
        </div>
        <!-- 表格 -->
        <tablea v-if="Datar15 != ''" :pageid="pageid" :Datar15="Datar15" :statusCode="statusCode"></tablea>
        <!-- 分页 -->
        <el-pagination
            class="pagintion"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="counts"
        ></el-pagination>
    </div>
</template>
<script>
import tablea from '../../conponents/table/tablea/tablea.vue';
export default {
    data() {
        return {
            Datar15: '',
            // 数据发散
            pageid: [
                { pageid: 15 },
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '序号',
                    slot: 'dataTanle',
                    width: 70,
                    align: 'center',
                    type: 'index'
                },
                {
                    title: '动态详情',
                    key: 'col1',
                    align: 'center'
                },
                {
                    title: '发布企业',
                    key: 'col2',
                    align: 'center'
                },
                {
                    title: '发布人',
                    key: 'col3',
                    align: 'center'
                },
                {
                    title: '动态类型',
                    key: 'col4',
                    align: 'center'
                },
                {
                    title: '发布时间',
                    key: 'col5',
                    align: 'center'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 180,
                    align: 'center'
                },
                {
                    dataTanle: '1',
                    col1: '万江烽火',
                    col2: '小鱼儿',
                    col3: '化妆DGDF套装',
                    col4: '播放中',
                    col5: '2020.20.20'
                }
            ],
            statusCode: '',
            page: 1,
            limit: 10,
            counts: this.counts,
            // value2: ['2016-01-01', '2016-02-15'],
            value01: '',
            value02: '',
            value03: '',
            // 时间段选择
            pickerOptions: {
                shortcuts: [
                    {
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }
                ]
            },
            value1: '',
            value2: '',
            model1: -1,
            cityList: [
                {
                    value: '0',
                    label: '官方动态'
                },
                {
                    value: '1',
                    label: '普通动态'
                }
            ]
        };
    },
    watch: {
        Datar15: {
            handler(newdata, oldata) {
                this.Datar15 = newdata;
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        // 分页
        handleSizeChange(val) {
            this.limit = val;
            this.CouponDataQuery();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.CouponDataQuery();
        },
        //将时间转换成时间撮
        fgetLocalTime() {
            let date = new Date(this.value2[0]);
            let start = date.getTime(date);
            this.start = start;
            let date1 = new Date(this.value2[1]);
            let end = date1.getTime(date1);
            this.end = end;
        },
        //查询
        CouponDataQuery() {
            var url = 'admin/admin/company/selectAllDynamic';
            var data = {
                articleType: parseInt(this.model1),
                limit: this.limit,
                page: this.page,
                pushEndDate: this.end || 0,
                pushStartDate: this.start || 0,
                search: this.value01,
                type: 2,
                company: this.value02
            };
            this.$axios
                .post(url, data)
                .then((res) => {
                    if (res.status == 200) {
                        const statusCode = res.data.code;
                        this.statusCode = statusCode;
                        if (statusCode == 200) {
                            var AjaxData = res.data.data;
                            this.counts = res.data.total;
                            var DataAjax15 = [];
                            AjaxData.forEach(function (val, index) {
                                DataAjax15[index] = val;
                                // DataAjax15[index].dataTanle = val.;
                                DataAjax15[index].col1 = val.details;
                                DataAjax15[index].col2 = val.companyName; // 发布企业
                                DataAjax15[index].col3 = val.pushName;
                                if (val.isOfficial == 0) {
                                    val.type = '普通动态';
                                } else if (val.isOfficial == 1) {
                                    val.type = '官方动态';
                                }
                                DataAjax15[index].col4 = val.type;
                                var date = new Date(val.pushTime);
                                var time1 =
                                    date.getFullYear() +
                                    '-' +
                                    (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                                    '-' +
                                    date.getDate();
                                DataAjax15[index].col5 = time1;
                            });
                            this.$nextTick(() => {
                                this.Datar15 = DataAjax15;
                            });
                        } else {
                            this.$nextTick(() => {
                                this.Datar15 = [{ name: '暂无数据！' }];
                            });
                        }
                        if (!res.data.data || res.data.data.length == 0) {
                            this.$nextTick(() => {
                                this.Datar15 = [{ name: '暂无数据！' }];
                            });
                        }
                    }
                })
                .catch(() => {
                    this.$nextTick(() => {
                        this.Datar15 = [{ name: '暂无数据！' }];
                    });
                });
        },
        // 删除
        deletDatagraphicNews(spid) {
            const url = 'admin/admin/company/delDynamicById?id=' + spid;
            this.$axios
                .get(url)
                .then((res) => {
                    if (res.status == 200) {
                        const data = res.data;
                        if (data.code == 200) {
                            alert(data.msg);
                            this.CouponDataQuery();
                        } else {
                            alert(data.msg);
                            this.CouponDataQuery();
                        }
                    }
                })
                .catch((err) => {});
        },
        // 批量删除
        BatchDeleteForcoup(id) {
            const url = 'admin/admin/company/delete/bathDelete';
            this.$axios
                .post(url, id)
                .then((res) => {
                    if (res.status == 200) {
                        const dataert = res.data;
                        if (dataert.cpde == 200) {
                            alert(dataert.msg);
                            this.CouponDataQuery();
                        } else {
                            alert(dataert.msg);
                            this.CouponDataQuery();
                        }
                    }
                })
                .catch((err) => {});
        }
    },
    mounted() {
        this.CouponDataQuery();
    },
    components: {
        tablea
    }
};
</script>
<style scope>
.table_css_xiaoyuer {
    box-sizing: border-box;
    padding: 20px;
}

.top-compo {
    box-sizing: border-box;
    padding: 0 20px;
    margin-top: 20px;
}
</style>