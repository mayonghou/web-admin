<template>
    <div class="table_css_xiaoyuer">
        <div class="top-compo inancialmanagement">
            <div class="inancialman">
                <h2 class="centerText">当前余额</h2>
                <div class="inputcenter">
                    <inputa></inputa>
                </div>
                <div class="inputcenter">
                    <Badge :count="1000" overflow-count="999">
                        <button href="#" class="demo-badge buttontjsq">提现申请</button>
                    </Badge>
                </div>
            </div>
            <Row style="width:100%;">
                <Col span="12">
                    <Input v-model="value01" placeholder="输入订单号..." clearable style="width: 200px; margin-right:10px; margin-left:20px;" />审批时间：
                    <el-date-picker
                    v-model="value2"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="——"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    >
                    </el-date-picker>
                    <Select v-model="model1" style="width:150px; margin-right:10px;" placeholder="全部订单状态">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <!-- <Select v-model="model2" style="width:150px; margin-right:10px;" placeholder="全部订单类型">
                        <Option v-for="itema in cityLista" :value="itema.valuea" :key="itema.valuea">{{ itema.labela }}</Option>
                    </Select> -->
                    <Button type="primary" style="padding-left:40px; padding-right:40px;">查询</Button>
                </Col>
            </Row>
        </div>
        <!-- 表格 -->
        <tablea :pageid="pageid"></tablea>
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
        >
        </el-pagination>
    </div>
</template>

<script>
    import tablea from '../conponents/table/tablea/tablea.vue';
    import inputa from '../conponents/input/inputa/inputa.vue';
    export default {
        components: {
            tablea,
            inputa,
        },
        data() {
            return {
                // 数据发散
                pageid:[
                    { pageid:2 },
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
                        title: '流水号',
                        key: 'col1',
                        align: 'center'
                    },
                    {
                        title: '订单号',
                        key: 'col2',
                        align: 'center'
                    },
                    {
                        title: '支付平台',
                        key: 'col3',
                        align: 'center'
                    },
                    {
                        title: '订单来源',
                        key: 'col4',
                        align: 'center'
                    },
                    {
                        title: '收款账号',
                        key: 'col5',
                        align: 'center'
                    },
                    {
                        title: '账户名称',
                        key: 'col6',
                        align: 'center'
                    },
                    {
                        title: '类型',
                        key: 'col7',
                        align: 'center'
                    },
                    {
                        title: '审批时间',
                        key: 'col8',
                        align: 'center'
                    },
                     {
                        title: '入账时间',
                        key: 'col9',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 100,
                        align: 'center'
                    },
                    {
                        dataTanle: '1',
                        age: 18,
                        col1: 'ASD345',
                        col2: '123SD',
                        col3: '微信',
                        col4: '推广',
                        col5: '622401789465621',
                        col6: '建行',
                        col7: '8000',
                        col8: '2020-12-23',
                        col9: '2020-12-25',
                    },
                ],
                page: 1,
                limit: 20,
                counts: this.counts || 1,
                // value2: ['2016-01-01', '2016-02-15'],
                value01: '',
                value02: '',

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
                model1: '',

                cityLista: [
                    {
                        valuea: '上架',
                        labela: '上架'
                    },
                    {
                        valuea: '下架',
                        labela: '下架'
                    }
                ],
                // model2: '',
                // 时间段选择
                pickerOptions: {
                    shortcuts: [{
                    text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value1: '',
                value2: '',
                value18: '123456789',
            };
        },
        methods: {
            //  分页
            handleSizeChange(val) {
                this.limit = val;
            },
            handleCurrentChange(val) {
                this.page = val;console.log()
            }
        },
        mounted(){

        }
    };
</script>

<style scope>
    .inancialmanagement{
        width:100%;
        height: 256px;
        background-color: #FAFFE0 ;
        padding: 15px 0px 20px 0px;
    }
    .inancialman{
        width:100%;
        height: 160px;
        background-color:#F1FAFD;
        margin-bottom: 36px;
    }
    .centerText{
        text-align: center;
        padding:10px 0px;
    }
    .inputcenter{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 0px;
    }
    .txsq-button-xiaoyuer{
        padding: 5px 30px;
        outline: none;
        border: 0;
    }
    .buttontjsq{
        padding: 5px 30px;
        background-color: #2450D2;
        color: #fff;
        outline: none;
        border: 0;
        border-radius: 5px;
    }
    .buttontjsq:hover{
        background-color: #2d8cf0;
    }
    .buttontjsq:active{
        background-color: #3669ff;
    }
</style>
