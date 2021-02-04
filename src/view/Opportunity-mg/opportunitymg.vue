<template>
    <!-- 商机列表 -->
    <div class="table_css_xiaoyuer">
        <div class="top-compo">
            <Row style="width: 100%">
                <Col span="12">
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
                        style="width:150px; margin-right:10px; margin-left:10px"
                        placeholder="全部类型"
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
        <tablea v-if="Datar6 != ''" :pageid="pageid" :Datar6="Datar6" :statusCode="statusCode"></tablea>
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
            Datar6: '',
            // 数据发散
            pageid: [
                { pageid: 6 },
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '项目名称',
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
                    title: '地区',
                    key: 'col3',
                    align: 'center'
                },
                {
                    title: '商机类型',
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
            counts: 0,
            // value2: ['2016-01-01', '2016-02-15'],
            value01: '',
            value02: '',
            value03: '',
            // model1: '',
            model2: '',
            cityList: [
                {
                    value: '上架',
                    label: '上架'
                },
                {
                    value: '下架',
                    label: '下架'
                }
            ],
            cityList2: [
                {
                    value: '闺蜜放',
                    label: '母子放'
                },
                {
                    value: '男人放',
                    label: '女人坊'
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
        Datar6: {
            handler(newdata, oldata) {
                this.Datar6 = newdata;
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
        fgetLocalTime() {
            //将时间转换成时间撮
            let date = new Date(this.value2[0]);
            let start = date.getTime(date);
            this.start = start;
            let date1 = new Date(this.value2[1]);
            let end = date1.getTime(date1);
            this.end = end;
        },
        //查询
        CouponDataQuery() {
            var url = 'admin/chance/chanceList';
            var data = {
                companyName: this.value02,
                endTime: this.end,
                limit: this.limit,
                name: this.value01,
                page: this.page,
                startTime: this.start,
                type: this.model2
            };
            this.$axios
                .post(url, data)
                .then((res) => {
                    if (res.status == 200) {
                        const statusCode = res.data.code;
                        this.statusCode = statusCode;
                        if (statusCode == 200) {
                            var AjaxData = res.data.data.dataList;
                            this.counts = res.data.data.totalCount;
                            var DataAjax6 = [];
                            AjaxData.forEach(function (val, index) {
                                DataAjax6[index] = val;
                                DataAjax6[index].dataTanle = val.title;
                                DataAjax6[index].col1 = val.companyName; //发布企业
                                DataAjax6[index].col2 = val.username;
                                DataAjax6[index].col3 = val.address;
                                DataAjax6[index].col4 = val.type;
                                var date = new Date(val.createTime);
                                var time1 =
                                    date.getFullYear() +
                                    '-' +
                                    (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                                    '-' +
                                    date.getDate();
                                DataAjax6[index].col5 = time1;
                            });
                            this.$nextTick(() => {
                                this.Datar6 = DataAjax6;
                            });
                        } else {
                            this.$nextTick(() => {
                                this.Datar6 = [{ name: '暂无数据！' }];
                            });
                        }
                        const lengthNew = res.data.data.dataList;
                        if (!lengthNew || lengthNew.length == 0) {
                            this.$nextTick(() => {
                                this.Datar6 = [{ name: '暂无数据！' }];
                            });
                        }
                    }
                })
                .catch(() => {
                    this.$nextTick(() => {
                        this.Datar6 = [{ name: '暂无数据！' }];
                    });
                });
        },
        // 删除
        opportunitymgDelet(sjId) {
            const url = 'admin/chance/chanceDelete?chanceId=' + sjId;
            console.log(url);
            this.$axios
                .get(url)
                .then((res) => {
                    console.log(res);
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
        BatchDeleteForoppo(id) {
            const url = 'admin/chance/chanceBatchDelete?chanceIds=' + id;
            this.$axios
                .get(url)
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
