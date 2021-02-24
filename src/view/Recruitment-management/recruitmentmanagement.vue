<template>
    <!-- 招聘列表 -->
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
						class="eldateeditor"
                        :picker-options="pickerOptions"
                        @change="fgetLocalTime"
                    ></el-date-picker>
                    <el-select
                        v-model="model2"
                        style="width:150px; margin-left:10px; margin-right:10px;"
                        @change="changeStatus"
                        placeholder="全部行业"
                    >
                        <el-option
                            v-for="item in cityList2"
                            :value="item.id"
                            :label="item.name"
                            :key="item.id"
                        ></el-option>
                    </el-select>
                    <Select
                        v-model="model3"
                        style="width:150px; margin-right:10px;"
                        placeholder="行业职位"
                    >
                        <Option
                            v-for="item in cityList3"
                            :value="item.id"
                            :label="item.jobName"
                            :key="item.id"
                        ></Option>
                    </Select>
                    <Select
                        v-model="model4"
                        style="width:150px; margin-right:10px;"
                        placeholder="状态"
                    >
                        <Option
                            v-for="item in cityList4"
                            :value="item.id"
                            :label="item.name"
                            :key="item.id"
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
        <tablea v-if="Datar4 != ''" :pageid="pageid" :Datar4="Datar4" :statusCode="statusCode"></tablea>
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
            Datar4: '',
            // 数据发散
            pageid: [
                { pageid: 4 },
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '职位名称',
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
                    title: '职位类型',
                    key: 'col3',
                    align: 'center'
                },
                {
                    title: '所属行业',
                    key: 'col4',
                    align: 'center'
                },
                {
                    title: '职位状态',
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
                    width: 230,
                    align: 'center'
                },
                {
                    dataTanle: '网课',
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
            counts: 0,
            // value2: ['2016-01-01', '2016-02-15'],
            value02: '',
            value03: '',
            model2: '',
            model3: '',
            model4: '',
            cityList2: [
                //全部行业
                {
                    id: '0',
                    name: '行业1'
                },
                {
                    id: '1',
                    name: '行业2'
                }
            ],
            cityList3: [
                //职位
                /*
                {
                    id: '0',
                    name: '职位1'
                },
                {
                    id: '1',
                    name: '职位2'
                }
                */
            ],
            cityList4: [
                //状态
                {
                    id: '0',
                    name: '上架'
                },
                {
                    id: '1',
                    name: '下架'
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
        Datar4: {
            handler(newdata, oldata) {
                this.Datar4 = newdata;
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
        this.Queryindustry();
        this.CouponDataQuery(); //查询表格
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
        //    $ajax //查询表格
        CouponDataQuery() {
            var url = 'admin/job/manage/getList';
            if (this.model4 == '上架') {
                this.model4 = 2;
            } else if (this.model4 == '下架') {
                this.model4 = 3;
            }
            var data = {
                company: this.value02,
                industryId: this.model2 || 0,
                jobName: this.model3,
                limit: this.limit,
                page: this.page,
                pushEndDate: this.end || 0,
                pushStareDate: this.start || 0,
                status: this.model4
            };
            this.$axios
                .post(url, data)
                .then((res) => {
                    if (res.status == 200) {
                        const statusCode = res.data.code;
                        this.statusCode = statusCode;
                        if (res.data.code == 200) {
                            var AjaxData = res.data.data.data.jobDetailDTOS;
                            this.counts = res.data.data.total;
                            var DataAjax4 = [];
                            AjaxData.forEach(function (val, index) {
                                DataAjax4[index] = val;
                                DataAjax4[index].dataTanle = val.jobName;
                                DataAjax4[index].col1 = val.companyName;
                                DataAjax4[index].col2 = val.contact;
                                DataAjax4[index].col3 = val.positionType;
                                DataAjax4[index].col4 = val.industryName;
                                if (val.status == 2) {
                                    DataAjax4[index].col5 = '上架';
                                } else if (val.status == 3) {
                                    DataAjax4[index].col5 = '下架';
                                }
                                var date = new Date(val.publishDate);
                                var time1 =
                                    date.getFullYear() +
                                    '-' +
                                    (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                                    '-' +
                                    date.getDate();
                                DataAjax4[index].col6 = time1;
                            });
                            this.$nextTick(() => {
                                this.Datar4 = DataAjax4;
                            });
                        } else {
                            this.$nextTick(() => {
                                this.Datar4 = [{ name: '暂无数据！' }];
                            });
                        }
                        const NewLeng = res.data.data.data;
                        if (!NewLeng || NewLeng.length) {
                            this.$nextTick(() => {
                                this.Datar4 = [{ name: '暂无数据！' }];
                            });
                        }
                    }
                })
                .catch(() => {
                    this.$nextTick(() => {
                        this.Datar4 = [{ name: '暂无数据！' }];
                    });
                });
        },
        // 删除
        DeletDataforRecruit(idData) {
            const url = 'admin/job/manage/delete/' + idData;
            this.$axios
                .get(url)
                .then((res) => {
                    if (res.status == 200) {
                        const data = res.data;
                        if (data.code == 200) {
                            const msger = data.data;
                            alert(msger.msg);
                            this.CouponDataQuery();
                        } else {
                            const msger = data.data;
                            alert(msger.msg);
                            this.CouponDataQuery();
                        }
                    }
                })
                .catch((err) => {});
        },
        // 批量删除
        BatchDeleteForrecruitt(id) {
            const url = 'admin/job/manage/delete/bathDelete';
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
        Goodsoffshelvesrenrec(spID, status) {
            const url = 'admin/job/manage/update/status?id=' + spID + '&status=' + status;
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
        changeStatus(value) {
            this.getzhiwei(value);
        },
        Queryindustry() {
            // 查询行业
            this.$axios.get('admin/industry/list').then((res) => {
                this.cityList2 = res.data.data;
            });
        },
        getzhiwei(value) {
            //查询职位
            this.$axios.get('admin/job/manage/getPositionList/' + value).then((res) => {
                this.cityList3 = res.data.data;
            });
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
.eldateeditor {
    border: 1px solid #dcdee2 ;
}
</style>
