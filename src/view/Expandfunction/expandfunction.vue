<template>
    <!-- <h1>平台公告管理</h1> -->
    <div class="table_css_xiaoyuer">
        <div class="top-compo">
            <Row style="width: 100%">
                <Col span="12">
                    <Input
                        v-model="value01"
                        placeholder="公告标题..."
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
                    <Button
                        @click="CouponDataQuery"
                        type="primary"
                        style="padding-left: 40px; padding-right: 40px"
                    >查询</Button>
                </Col>
            </Row>
        </div>
        <!-- 表格 -->
        <tablea v-if="Datar20 != ''" :pageid="pageid" :Datar20="Datar20" :statusCode="statusCode"></tablea>
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
import tablea from '../conponents/table/tablea/tablea.vue';
export default {
    data() {
        return {
            Datar20: '',
            // 数据发散
            pageid: [
                { pageid: 20 },
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: 'ID',
                    slot: 'dataTanle',
                    width: 55
                },
                {
                    title: '公告标题',
                    key: 'col1',
                    align: 'center'
                },
                {
                    title: '公告范围',
                    key: 'col2',
                    align: 'center'
                },
                {
                    title: '公告详情',
                    key: 'col3',
                    align: 'center'
                },
                {
                    title: '浏览量',
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
                    width: 210,
                    align: 'center'
                },
                {
                    dataTanle: '1',
                    col1: '万江烽火',
                    col2: '小鱼儿',
                    col3: '化妆DGDF套装',
                    col4: '播放中',
                    col5: '播放中'
                }
            ],
            page: 1,
            limit: 10,
            counts: this.counts,
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
            start: '',
            end: '',
            statusCode: ''
        };
    },
    watch: {
        Datar20: {
            handler(newdata, oldata) {
                this.Datar20 = newdata;
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
        fgetLocalTime(value) {
            if (value != null) {
                let date = new Date(this.value[0]);
                let start = date.getTime(date);
                this.start = start;
                let date1 = new Date(this.value[1]);
                let end = date1.getTime(date1);
                this.end = end;
            } else {
                this.start = '';
                this.end = '';
            }
        },
        //查询list
        CouponDataQuery() {
            var url = 'admin/platform/list';
            var data = {
                endDate: this.end || 0,
                limit: this.limit,
                page: this.page,
                startDate: this.start || 0,
                title: this.value01
            };
            this.$axios
                .post(url, data)
                .then((res) => {
                    if (res.status == 200) {
                        const statusCode = res.data.code;
                        this.statusCode = statusCode;
                        let data = res.data;
                        if (data.code == 200) {
                            let AjaxData = data.data.dataList;
                            let AjaxData20 = [];
                            this.counts = data.data.totalCount;
                            AjaxData.forEach((val, index) => {
                                AjaxData20[index] = val;
                                AjaxData20[index].dataTanle = val.id;
                                AjaxData20[index].col1 = val.title;
                                if (val.noticeRange == 0) {
                                    AjaxData20[index].col2 = '全平台';
                                } else if (val.noticeRange == 1) {
                                    AjaxData20[index].col2 = '商家会员';
                                } else if (val.noticeRange == 2) {
                                    AjaxData20[index].col2 = '普通会员';
                                } else if (val.noticeRange == 3) {
                                    AjaxData20[index].col2 = '兼职会员';
                                }
                                AjaxData20[index].col3 = val.detail;
                                AjaxData20[index].col4 = val.viewCount;
                                AjaxData20[index].col5 = val.time;
                            });
                            this.$nextTick(() => {
                                this.Datar20 = AjaxData20;
                            });
                        } else {
                            this.$nextTick(() => {
                                this.Datar20 = [{ name: '暂无数据！' }];
                            });
                        }
                        if (!res.data.list || res.data.list.length == 0) {
                            this.$nextTick(() => {
                                this.Datar19 = [{ name: '暂无数据！' }];
                            });
                        }
                    }
                })
                .catch((err) => {
                    this.$nextTick(() => {
                        this.Datar20 = [{ name: '暂无数据！' }];
                    });
                });
        },
        // 删除
        DeletDataBtn(idData) {
            const url = 'admin/platform/delete';
            this.$axios
                .post(url, idData)
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
        BatchDeleteData(ids) {
            const url = 'admin/platform/delete';
            const data = ids;
            this.$axios
                .post(url, data)
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
