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
        <tablea v-if="Datar15 != ''" :pageid="pageid" :Datar15="Datar15"></tablea>
        <!-- 分页 -->
        <el-pagination
            class="pagintion"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="20"
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
                    width: 65,
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

            page: 1,
            limit: 20,
            counts: this.counts || 1,
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
            model1: '',
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
    methods: {
        // 分页
        handleSizeChange(val) {
            this.limit = val;
        },
        handleCurrentChange(val) {
            this.page = val;
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
        CouponDataQuery() {
            //查询
            var url = 'admin/admin/company/selectAllDynamic';
            var data = {
                articleType: this.model1 || -1,
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
                    if (res.status == 200 && res.data.code == 200) {
                        var AjaxData15 = res.data.data;
                        this.$nextTick(() => {
                            this.Datar15 = AjaxData15;
                        });
                    } else {
                        alert(res.data.msg);
                    }
                })
                .catch(() => {});
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
