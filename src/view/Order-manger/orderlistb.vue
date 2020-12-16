<template>
    <div class="table_css_xiaoyuer">
        <div class="top-compo">
            <Row style="width:100%;">
                <Col span="12">
                    <Input v-model="value01" placeholder="输入订单号..." clearable style="width: 200px; margin-right:10px;" />
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
                    
                    <Select v-model="model2" style="width:150px; margin-right:10px;" placeholder="全部订单类型">
                        <Option v-for="itema in cityLista" :value="itema.valuea" :key="itema.valuea">{{ itema.labela }}</Option>
                    </Select>

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
    export default {
        components: {
            tablea,
        },
        data() {
            return {
                // 数据发散
                pageid:[
                    { pageid:1 },
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '序号',
                        slot: 'name',
                        width: 70,
                    },
                    {
                        title: '订单编号',
                        key: 'col1'
                    },
                    {
                        title: '卖家',
                        key: 'col2'
                    },
                    {
                        title: '卖家',
                        key: 'col3'
                    },
                    {
                        title: '订单来源',
                        key: 'col4'
                    },
                    {
                        title: '支付方式',
                        key: 'col5'
                    },
                    {
                        title: '订单状态',
                        key: 'col6'
                    },
                    {
                        title: '订单金额',
                        key: 'col7'
                    },
                    {
                        title: '下单时间',
                        key: 'col8'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 250,
                        align: 'center'
                    },
                    {
                        name: '1',
                        age: 18,
                        col1: 'ASD345',
                        col2: '大宝',
                        col3: '大玉儿',
                        col4: '1.5亿',
                        col5: '微信',
                        col6: '已支付',
                        col7: '8000',
                        col8: '2020-12-23',
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
                model2: '',
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
                // 传递到orderlist
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
.table_css_xiaoyuer {
    box-sizing: border-box;
    padding: 20px;
}
.top-compo{
    box-sizing: border-box;
    padding: 0 20px;
    margin-top: 20px;
}
</style>
