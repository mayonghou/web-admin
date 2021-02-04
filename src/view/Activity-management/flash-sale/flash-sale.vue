<template>
    <!-- 限时抢购管理 -->
    <div class="table_css_xiaoyuer">
        <div class="top-compo">
            <Row style="width: 100%">
                <Col span="12">
                    <Input
                        v-model="value01"
                        placeholder="输入房源名称..."
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
                    <Button
                        @click="GetDataAjax"
                        type="primary"
                        style="padding-left: 40px; padding-right: 40px; margin-left:10px;"
                    >查询</Button>
                </Col>
            </Row>
        </div>
        <!-- 表格 -->
        <tablea v-if="Datar13 != ''" :pageid="pageid" :Datar13="Datar13" :statusCode="statusCode"></tablea>
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
            Datar13: '',
            // 数据发散
            pageid: [
                { pageid: 13 },
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '序号',
                    slot: 'dataTanle',
                    width: 70,
                    align: 'center'
                },
                {
                    title: '发布人',
                    key: 'col1',
                    align: 'center'
                },
                {
                    title: '已售',
                    key: 'col2',
                    align: 'center'
                },
                {
                    title: '抢购价',
                    key: 'col3',
                    align: 'center'
                },
                {
                    title: '关联商品',
                    key: 'col4',
                    align: 'center'
                },
                {
                    title: '活动时间',
                    key: 'col5',
                    width: 220,
                    align: 'center'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 170,
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
            statusCode: ''
        };
    },
    watch: {
        Datar13: {
            handler(newdata, oldata) {
                this.Datar13 = newdata;
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        // 分页
        handleSizeChange(val) {
            this.limit = val;
            this.GetDataAjax();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.GetDataAjax();
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
        //  $Ajax
        GetDataAjax() {
            var url = 'admin/admin/rushPurchase/getRushPurchaseList?system=true';
            var data = {
                activityTitleLike: this.value01,
                companyNameLike: this.value02,
                limit: this.limit,
                page: this.page,
                status: 1,
                timeEnd: this.end,
                timeStart: this.start
            };
            this.$axios
                .post(url, data)
                .then((res) => {
                    if (res.data.code == 200) {
                        const statusCode = res.data.code;
                        this.statusCode = statusCode;
                        if (statusCode == 200) {
                            var AjaxData = res.data.data;
                            this.counts = res.data.total;
                            var DataAjax13 = [];
                            AjaxData.forEach((val, index) => {
                                DataAjax13[index] = val;
                                DataAjax13[index].dataTanle = val.order;
                                DataAjax13[index].col1 = val.publishUser;
                                DataAjax13[index].col2 = val.countSale + '件';
                                DataAjax13[index].col3 = val.activityPrice / 100 + '￥';
                                DataAjax13[index].col4 = val.productId;
                                var date = new Date(val.startTime);
                                var time1 =
                                    date.getFullYear() +
                                    '-' +
                                    (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                                    '-' +
                                    date.getDate();
                                var date1 = new Date(val.endTime);
                                var time2 =
                                    date1.getFullYear() +
                                    '-' +
                                    (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() + 1) +
                                    '-' +
                                    date1.getDate();
                                DataAjax13[index].col5 = time1 + '——' + time2;
                            });
                            this.$nextTick(() => {
                                this.Datar13 = DataAjax13;
                            });
                        } else {
                            this.$nextTick(() => {
                                this.Datar13 = DataAjax13;
                            });
                        }
                        if (!res.data.data || res.data.data.length == 0) {
                            this.$nextTick(() => {
                                this.Datar13 = DataAjax13;
                            });
                        }
                    }
                })
                .catch((err) => {
                    this.$nextTick(() => {
                        this.Datar13 = [{ name: '暂无数据！' }];
                    });
                });
        },
        // 删除
        deleteLuckFlash(acId, ntype, statu) {
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
                            this.GetDataAjax();
                        } else {
                            alert(data.msg);
                            this.GetDataAjax();
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
                            this.GetDataAjax();
                        } else {
                            alert(dataert.msg);
                            this.GetDataAjax();
                        }
                    }
                })
                .catch((err) => {});
        }
    },
    mounted() {
        this.GetDataAjax();
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
