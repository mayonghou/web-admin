<template>
    <!-- 视频列表 -->
    <div class="table_css_xiaoyuer">
        <div class="top-compo">
            <Row style="width: 100%">
                <Col span="12">
                    <Input
                        v-model="value01"
                        placeholder="输入视频名称..."
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
                        v-model="model2"
                        style="width:150px; margin-right:10px;"
                        placeholder="视频状态不限"
                    >
                        <Option
                            v-for="item in cityList2"
                            :value="item.value"
                            :key="item.value"
                        >{{ item.label }}</Option>
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
        <tablea v-if="Datar5 != ''" :pageid="pageid" :Datar5="Datar5" :statusCode="statusCode"></tablea>
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
            Datar5: [],
            // 数据发散
            pageid: [
                { pageid: 5 },
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '视频标题',
                    slot: 'dataTanle',
                    align: 'center'
                },
                {
                    title: '发布企业',
                    key: 'col1',
                    align: 'center'
                },
                {
                    title: '发布人',
                    key: 'col2',
                    align: 'center'
                },
                {
                    title: '关联商品名称',
                    key: 'col3',
                    align: 'center'
                },
                {
                    title: '视频状态',
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
                    width: 250,
                    align: 'center'
                },
                {
                    dataTanle: '大玉儿',
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
            model2: '',
            cityList2: [
                {
                    value: '上架',
                    label: '上架'
                },
                {
                    value: '下架',
                    label: '下架'
                }
            ],
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
        Datar5: {
            handler(newdata, oldata) {
                this.Datar5 = newdata;
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
        this.CouponDataQuery();
    },
    components: {
        tablea
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
            var url = 'admin/company/video/sys/list';
            var data = {
                companyNameLike: this.value02,
                limit: this.limit,
                page: this.page,
                status: this.model2,
                timeEnd: this.end,
                timeStart: this.start,
                titleLike: this.value01
            };
            this.$axios
                .post(url, data)
                .then((res) => {
                    if (res.status == 200) {
                        const statusCode = res.data.code;
                        this.statusCode = statusCode;
                        if (res.data.code == 200) {
                            var AjaxData = res.data.list;
                            this.counts = res.data.total;
                            var DataAjax5 = [];
                            AjaxData.forEach(function (val, index) {
                                DataAjax5[index] = val;
                                DataAjax5[index].dataTanle = val.title;
                                DataAjax5[index].col1 = val.companyName;
                                DataAjax5[index].col2 = val.publisher;
                                if (val.productInfo != null) {
                                    DataAjax5[index].col3 = val.productInfo.name; //关联商品名称
                                }
                                if (val.status == 2) {
                                    DataAjax5[index].col4 = '上架';
                                } else if (val.status == 3) {
                                    DataAjax5[index].col4 = '下架';
                                }
                                var date = new Date(val.publishAtTime);
                                var time1 =
                                    date.getFullYear() +
                                    '-' +
                                    (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                                    '-' +
                                    date.getDate();
                                DataAjax5[index].col5 = time1;
                            });
                            this.$nextTick(() => {
                                this.Datar5 = DataAjax5;
                            });
                        } else {
                            this.$nextTick(() => {
                                this.Datar5 = [{ name: '暂无数据！' }];
                            });
                        }
                        if (!res.data.list || res.data.list.length == 0) {
                            this.$nextTick(() => {
                                this.Datar5 = [{ name: '暂无数据！' }];
                            });
                        }
                    }
                })
                .catch(() => {
                    this.$nextTick(() => {
                        this.Datar5 = [{ name: '暂无数据！' }];
                    });
                });
        },
        // 删除与下架
        DeletDataforVideo(spId, status) {
            const url = 'admin/company/video/update_status';
            const data = {
                id: spId,
                newStatus: status
            };
            this.$axios
                .post(url, data)
                .then((res) => {
                    if (res.status == 200) {
                        const data = res.data;
                        if (data.status == 200) {
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
        BatchDeleteForvideo(id) {
            const url = 'admin/company/video/batch_remove';
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
