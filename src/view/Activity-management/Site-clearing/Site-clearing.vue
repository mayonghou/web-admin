<template>
<!-- 清仓处理管理 -->
    <div class="table_css_xiaoyuer">
        <div class="top-compo">
            <Row style="width: 100%">
                <Col span="12">
                    <Input v-model="value01" placeholder="发布企业..." clearable style="width: 200px; margin-right: 10px" />
                    <!-- <Input v-model="value02" placeholder="输入发布企业..." clearable style="width: 200px; margin-right: 10px" /> -->
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
                    >
                    </el-date-picker>
                    <Select v-model="model1" style="width:150px; margin-right:10px;" placeholder="全部订单状态">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Button @click="GetDataAjax" type="primary" style="padding-left: 40px; padding-right: 40px">查询</Button>
                </Col>
            </Row>
        </div>
        <!-- 表格 -->
        <tablea v-if="Datar11 != ''" :pageid="pageid" :Datar11='Datar11'></tablea>
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
import tablea from '../../conponents/table/tablea/tablea.vue';
export default {
    data() {
        return {
            Datar11:'',
            // 数据发散
            pageid: [
                { pageid: 11 },
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
                    title: '发布时间',
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
                    title: '关联商品',
                    key: 'col4',
                    align: 'center'
                },
                {
                    title: '活动时间',
                    key: 'col5',
                    align: 'center',
                    width:230,
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 230,
                    align: 'center'
                },
                {
                    dataTanle: '1',
                    col1: '万江烽火',
                    col2: '小鱼儿',
                    col3: '化妆DGDF套装',
                    col4: '播放中',
                    col5: '2020.20.20',
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
            model1:'',
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
        fgetLocalTime() {//将时间转换成时间撮
            let date = new Date(this.value2[0]);
            let start = date.getTime(date);
            this.start = start;
            let date1 = new Date(this.value2[1]);
            let end = date1.getTime(date1);
            this.end = end;
        },
        //  $Ajax
        GetDataAjax(){
            // /*
            var url = 'admin/admin/clearance/getClearanceList';
            var data = {
                "companyNameLike": this.value01,
                "limit": this.limit,
                "page": this.page,
                "status": 1,
                "timeEnd": this.end,
                "timeStart": this.start,
            }
            this.$axios.post(url,data).then((res)=>{
                var AjaxData11 = res.data.data;
                this.$nextTick(() => {
                    this.Datar11 = AjaxData11;
                })
            }).catch((err)=>{

            })
            // */
        }
    },
    mounted(){
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
