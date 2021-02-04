<template>
    <!-- 团购管理 -->
    <div class="table_css_xiaoyuer">
        <div class="top-compo">
            <Row style="width: 100%">
                <Col span="12">
                    <Input
                        v-model="value01"
                        placeholder="输入标题名称..."
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
                        value-format="yyyy-MM-dd"
                        @change="timeget"
                    ></el-date-picker>
                    <Button
                        type="primary"
                        @click="queryData"
                        style="padding-left: 40px; padding-right: 40px; margin-left:10px"
                    >查询</Button>
                </Col>
            </Row>
        </div>
        <!-- 表格 -->
        <tablea v-if="Datar8 != ''" :pageid="pageid" :Datar8="Datar8" :statusCode="statusCode"></tablea>
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
            Datar8: '',
            // 数据发散
            pageid: [
                { pageid: 8 },
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '序号',
                    slot: 'dataTanle',
                    type: 'index',
                    width: 70,
                    align: 'center'
                },
                {
                    title: '团购名称',
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
                    title: '活动已售',
                    key: 'col4',
                    align: 'center'
                },
                {
                    title: '团购价',
                    key: 'col5',
                    align: 'center'
                },
                {
                    title: '原价',
                    key: 'col6',
                    align: 'center'
                },
                {
                    title: '活动时间',
                    key: 'col7',
                    width: 220,
                    align: 'center'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 220,
                    align: 'center'
                },
                {
                    dataTanle: '1',
                    col1: '万江烽火',
                    col2: '小鱼儿',
                    col3: '化妆DGDF套装',
                    col4: '播放中',
                    col5: '播放中',
                    col6: '播放中',
                    col7: '2020.20.20'
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
            startTime: '',
            endTime: '',
            statusCode: ''
        };
    },
    watch: {
        Datar8: {
            handler(newdata, oldata) {
                this.Datar8 = newdata;
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        // 分页
        handleSizeChange(val) {
            this.limit = val;
            this.getDatar8();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getDatar8();
        },
        timeget(value) {
            if (value != null) {
                let start = new Date(value[0]);
                this.startTime = start.getTime();
                let end = new Date(value[1]);
                this.endTime = start.getTime();
            } else {
                this.startTime = '';
                this.endTime = '';
            }
        },
        queryData() {
            this.page = 1;
            this.getDatar8();
        },
        // 查询
        getDatar8() {
            let data = {
                activityTitleLike: this.value01,
                companyNameLike: this.value02,
                limit: this.limit,
                page: this.page,
                status: 1,
                timeEnd: this.endTime,
                timeStart: this.startTime
            };
            const url = 'admin/company/activity/sys/group/list';
            this.$axios
                .post(url, data)
                .then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        const statusCode = res.data.code;
                        this.statusCode = statusCode;
                        if (data.code == 200) {
                            let DataAjax8 = [];
                            data.list.forEach((val, index) => {
                                DataAjax8[index] = val;
                                DataAjax8[index].col1 = val.productName;
                                DataAjax8[index].col2 = val.companyName;
                                DataAjax8[index].col3 = val.publisher;
                                DataAjax8[index].col4 = val.countSale;
                                DataAjax8[index].col5 = val.activityPrice / 100 + '￥';
                                DataAjax8[index].col6 = val.productPrice / 100 + '￥';
                                let startDate = new Date(val.startTime);
                                var time1 =
                                    startDate.getFullYear() +
                                    '-' +
                                    (startDate.getMonth() + 1 < 10 ? '0' + (startDate.getMonth() + 1) : startDate.getMonth() + 1) +
                                    '-' +
                                    startDate.getDate();
                                var endDate = new Date(val.endTime);
                                var time2 =
                                    endDate.getFullYear() +
                                    '-' +
                                    (endDate.getMonth() + 1 < 10 ? '0' + (endDate.getMonth() + 1) : endDate.getMonth() + 1) +
                                    '-' +
                                    endDate.getDate();
                                DataAjax8[index].col7 = time1 + '——' + time2;
                            });
                            this.counts = data.total;
                            this.$nextTick(() => {
                                this.Datar8 = DataAjax8;
                            });
                        } else {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'error'
                            });
                            this.$nextTick(() => {
                                this.Datar8 = [{ name: '暂无数据！' }];
                            });
                        }
                        if (!res.data.list || res.data.list.length == 0) {
                            this.$nextTick(() => {
                                this.Datar8 = [{ name: '暂无数据！' }];
                            });
                        }
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                })
                .catch((err) => {
                    this.$nextTick(() => {
                        this.Datar8 = [{ name: '暂无数据！' }];
                    });
                });
        },
        // 删除
        deleDataGroupbuy(acId, ntype, statu) {
            const url = 'admin/company/activity/all/update_status';
            const data = {
                activityId: acId,
                activityType: ntype,
                newStatus: statu
            };
            this.$axios
                .put(url, data)
                .then((res) => {
                    if (res.status == 200) {
                        const data = res.data;
                        if (data.code == 200) {
                            alert(data.msg);
                            this.getDatar8();
                        } else {
                            alert(data.msg);
                            this.getDatar8();
                        }
                    }
                })
                .catch((err) => {});
        },
        // 批量删除
        BatchDeleteForcoup(id, activ) {
            const url = 'admin/company/activity/all/batch_remove?activityType=' + activ;
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
        this.getDatar8();
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
