<template>
<!-- 限时抢购管理 -->
    <div class="table_css_xiaoyuer">
        <div class="top-compo">
            <Row style="width: 100%">
                <Col span="12">
                    <Input v-model="value01" placeholder="输入房源名称..." clearable style="width: 200px; margin-right: 10px" />
                    <Input v-model="value02" placeholder="输入发布企业..." clearable style="width: 200px; margin-right: 10px" />
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
                    <Button @click="GetDataAjax" type="primary" style="padding-left: 40px; padding-right: 40px">查询</Button>
                </Col>
            </Row>
        </div>
        <!-- 表格 -->
        <tablea v-if="Datar13 != ''" :pageid="pageid" :Datar13='Datar13'></tablea>
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
            Datar13:'',
            // 数据发散
            pageid: [
                { pageid: 13 },
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: '序号',
                    slot: 'dataTanle',
                    width: 65,
                    align: 'center',
                },
                {
                    title: '发布人',
                    key: 'col1',
                    align: 'center',
                },
                {
                    title: '已售',
                    key: 'col2',
                    align: 'center',
                },
                {
                    title: '抢购价',
                    key: 'col3',
                    align: 'center',
                },
                {
                    title: '关联商品',
                    key: 'col4',
                    align: 'center',
                },
                {
                    title: '活动时间',
                    key: 'col5',
                    width: 220,
                    align: 'center',
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
            value2: ''
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
            var url = 'admin/admin/rushPurchase/getRushPurchaseList';
            var data = {
                "activityTitleLike":  this.value01,
                "companyNameLike": this.value02,
                "limit": this.limit,
                "page": this.page,
                "status": 1,
                "timeEnd": this.end,
                "timeStart": this.start
            }
            this.$axios.post(url,data).then((res)=>{
                if(res.data.code == 200 && res.data.code == 200){
                    var AjaxData13 = res.data.data;
                    this.$nextTick(() => {
                        this.Datar13 = AjaxData13;
                    })
                }else{
                    alert(res.data.msg)
                }
            }).catch((err)=>{

            })
            // */
        }
    },
    mounted(){
        this.GetDataAjax()
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
