<template>
    <!-- 租房列表 -->
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
                    <Select
                        v-model="model2"
                        style="width:150px; margin-right:10px;"
                        placeholder="房源类型不限"
                    >
                        <Option
                            v-for="item in cityList2"
                            :value="item.value"
                            :key="item.value"
                        >{{ item.label }}</Option>
                    </Select>
                    <Select
                        v-model="model3"
                        style="width:150px; margin-right:10px;"
                        placeholder="房源状态不限"
                    >
                        <Option
                            v-for="item in cityList3"
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
        <tablea v-if="Datar3 != ''" :pageid="pageid" :Datar3="Datar3" :statusCode="statusCode"></tablea>
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
            Datar3: '',
            // 数据发散
            pageid: [
                { pageid: 3 },
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
                    title: '房源名称',
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
                    title: '房源类型',
                    key: 'col4',
                    align: 'center'
                },
                {
                    title: '房源状态',
                    key: 'col5',
                    align: 'center'
                },
                {
                    title: '发布时间',
                    key: 'col6',
                    width: 110,
                    align: 'center'
                },
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center',
                    width: 230
                },
                {
                    dataTanle: '1',
                    age: 18,
                    col1: '花果园金融大厦A栋',
                    col2: '小鱼儿',
                    col3: '大玉儿',
                    col4: '精装修',
                    col5: '已经出售',
                    col6: '2020.20.20'
                }
            ],

            page: 1,
            limit: 10,
            counts: this.counts,
            // value2: ['2016-01-01', '2016-02-15'],
            value01: '',
            value02: '',
            value03: '',
            model2: '',
            model3: '',
            cityList2: [
                {
                    value: '住房',
                    label: '住房'
                },
                {
                    value: '公寓',
                    label: '公寓'
                },
                {
                    value: '写字楼',
                    label: '写字楼'
                },
                {
                    value: '底商',
                    label: '底商'
                }
            ],
            cityList3: [
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
        Datar3: {
            handler(newdata, oldata) {
                this.Datar3 = newdata;
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
        //
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
            var url = 'admin/renting/manage/search';
            var data = {
                company: this.value02,
                houseTitle: this.value01,
                limit: this.limit,
                page: this.page,
                pushEndDate: this.end,
                pushStartDate: this.start,
                status: this.model3,
                typeName: this.model2
            };
            this.$axios
                .post(url, data)
                .then((res) => {
                    var AjaxData = res.data.data.data;
                    this.counts = res.data.data.total;
                    const statusCode = res.data.code;
                    this.statusCode = statusCode;
                    var DataAjax3 = [];
                    AjaxData.forEach(function (val, index) {
                        DataAjax3[index] = val;
                        DataAjax3[index].dataTanle = val.order;
                        DataAjax3[index].col1 = val.houseTitle;
                        DataAjax3[index].col2 = val.userCompanyDTO.company.name;
                        DataAjax3[index].col3 = val.publisher;
                        DataAjax3[index].col4 = val.typeName;
                        if (val.status == 2) {
                            val.status = '上架';
                        } else if (val.status == 3) {
                            val.status = '下架';
                        }
                        DataAjax3[index].col5 = val.status;
                        var date = new Date(val.createTime);
                        var time1 =
                            date.getFullYear() +
                            '-' +
                            (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                            '-' +
                            date.getDate();
                        DataAjax3[index].col6 = time1;
                    });
                    this.$nextTick(() => {
                        this.Datar3 = DataAjax3;
                    });
                })
                .catch(() => {
                    this.$nextTick(() => {
                        this.Datar3 = [{ name: '暂无数据！' }];
                    });
                });
        },
        // 删除
        DeletrentalData(dataId) {
            const url = 'admin/renting/manage/delete/' + dataId;
            this.$axios
                .get(url)
                .then((res) => {
                    if (res.status == 200) {
                        const data = res.data;
                        if (data.code == 200) {
                            const idData = data.data;
                            alert(idData.msg);
                            this.CouponDataQuery();
                        } else {
                            const idData = data.data;
                            alert(idData.msg);
                            this.CouponDataQuery();
                        }
                    }
                })
                .catch((err) => {});
        },
        // 批量删除
        BatchDeleteForRental(id) {
            const url = 'admin/renting/manage/delete/bathDelete';
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
        },
        // 下架
        Goodsoffshelvesren(spID, status) {
            const url = 'admin/renting/manage/update/status?id=' + spID + '&status=' + status;
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
