<template>
    <div class="table_css_xiaoyuer">
        <!-- 订单列表 -->
        <div class="top-compo">
            <Row style="width:100%;">
                <Col span="12">
                    <Input
                        v-model="value01"
                        placeholder="输入订单号..."
                        clearable
                        style="width: 200px; margin-right:10px;"
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
                        placeholder="全部订单状态"
                    >
                        <Option
                            v-for="item in cityList"
                            :value="item.value"
                            :key="item.value"
                        >{{ item.label }}</Option>
                    </Select>

                    <Select
                        v-model="model2"
                        style="width:150px; margin-right:10px;"
                        placeholder="全部订单类型"
                    >
                        <Option
                            v-for="itema in cityLista"
                            :value="itema.valuea"
                            :key="itema.valuea"
                        >{{ itema.labela }}</Option>
                    </Select>

                    <Button
                        @click="CouponDataQuery"
                        type="primary"
                        style="padding-left:40px; padding-right:40px;"
                    >查询</Button>
                </Col>
            </Row>
        </div>
        <!-- 表格 -->
        <tablea v-if="Datar1 != ''" :pageid="pageid" :Datar1="Datar1"></tablea>
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
import tablea from '../conponents/table/tablea/tablea.vue';
export default {
    components: {
        tablea
    },
    data() {
        return {
            Datar1: '',
            // 数据发散
            pageid: [
                { pageid: 1 },
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '序号',
                    slot: 'dataTanle',
                    width: 70,
                    type: 'index',
                    align: 'center'
                },
                {
                    title: '订单编号',
                    key: 'col1',
                    align: 'center'
                },
                {
                    title: '买家',
                    key: 'col2',
                    align: 'center'
                },
                {
                    title: '卖家',
                    key: 'col3',
                    align: 'center'
                },
                {
                    title: '订单来源',
                    key: 'col4',
                    align: 'center'
                },
                {
                    title: '支付方式',
                    key: 'col5',
                    align: 'center'
                },
                {
                    title: '订单状态',
                    key: 'col6',
                    align: 'center'
                },
                {
                    title: '订单金额',
                    key: 'col7',
                    align: 'center'
                },
                {
                    title: '下单时间',
                    key: 'col8',
                    align: 'center',
                    width: 140
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 180,
                    align: 'center'
                },
                {
                    dataTanle: '1',
                    age: 18,
                    col1: 'ASD345',
                    col2: '大宝',
                    col3: '大玉儿',
                    col4: '1.5亿',
                    col5: '微信',
                    col6: '已支付',
                    col7: '8000',
                    col8: '2020-12-23'
                }
            ],

            page: 1,
            limit: 20,
            counts: this.counts || 1,
            // value2: ['2016-01-01', '2016-02-15'],
            value01: '',
            value02: '',

            cityList: [
                //订单状态
                {
                    value: '待付款',
                    label: '待付款'
                },
                {
                    value: '待发货',
                    label: '待发货'
                },
                {
                    value: '已发货',
                    label: '已发货'
                },
                {
                    value: '已完成',
                    label: '已完成'
                },
                {
                    value: '已关闭',
                    label: '已关闭'
                },
                {
                    value: '无效订单',
                    label: '无效订单'
                }
            ],
            model1: '',

            cityLista: [
                //订单类型
                {
                    valuea: '配送',
                    labela: '配送'
                },
                {
                    valuea: '到店消费',
                    labela: '到店消费'
                },
                {
                    valuea: '自行带走',
                    labela: '自行带走'
                }
            ],
            model2: '',
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
            value2: ''
            // 传递到orderlist
        };
    },
    methods: {
        //  分页
        handleSizeChange(val) {
            this.limit = val;
        },
        handleCurrentChange(val) {
            this.page = val;
            console.log();
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
            var url = 'admin/order/adminQueryOrderList';
            var data = {
                limit: this.limit,
                page: this.page,
                endTime: this.end,
                startTime: this.start,
                orderSn: this.value01,
                orderStatus: this.model1,
                orderType: this.model2
            };
            this.$axios
                .post(url, data)
                .then((res) => {
                    var AjaxData1 = res.data.data.dataList;
                    this.$nextTick(() => {
                        this.Datar1 = AjaxData1;
                    });
                })
                .catch(() => {});
        }
    },
    mounted() {
        this.CouponDataQuery();
    }
};
</script>

<style scope>
</style>
