<template>
<!-- 千里马人员管理 -->
    <div class="table_css_xiaoyuer">
        <div class="top-compo">
            <Row style="width: 100%">
                <Col span="12">
                    <Input v-model="value01" placeholder="输入姓名..." clearable style="width: 200px; margin-right: 10px" />
                    <Select v-model="model1" style="width:150px; margin-right:10px;" placeholder="兼职类型">
                        <Option v-for="item in cityList" :value="item.value" :label="item.label" :key="item.value"></Option>
                    </Select>
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
                    <Button @click="CouponDataQuery" type="primary" style="padding-left: 40px; padding-right: 40px">查询</Button>
                </Col>
            </Row>
        </div>
        <!-- 表格 -->
        <tablea v-if="Datar19 != ''" :pageid="pageid" :Datar19='Datar19'></tablea>
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
            Datar19:'',
            // 数据发散
            pageid: [
                { pageid: 19 },
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '序号',
                    slot: 'dataTanle',
                    align: 'center',
                    type:'index'
                },
                {
                    title: '姓名',
                    key: 'col1',
                    align: 'center'
                },
                {
                    title: '职业',
                    key: 'col2',
                    align: 'center'
                },
                {
                    title: '手机号',
                    key: 'col3',
                    align: 'center'
                },
                {
                    title: '用户名',
                    key: 'col4',
                    align: 'center'
                },
                {
                    title: '订单量',
                    key: 'col5',
                    align: 'center'
                },
                {
                    title: '兼职类型',
                    key: 'col6',
                    align: 'center'
                },
                {
                    title: '最近登录',
                    key: 'col7',
                    width: 120,
                    align: 'center'
                },
                {
                    title: '加入时间',
                    key: 'col8',
                    width: 120,
                    align: 'center'
                },
                {
                    title: '开放接单',
                    key: 'col9',
                    align: 'center'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 250,
                    align: 'center'
                },
                {
                    dataTanle: '1',
                    col1: '万江烽火',
                    col2: '小鱼儿',
                    col3: '化妆DGDF套装',
                    col4: '播放中',
                    col5: '播放中',
                    col6: '播放中',
                    col7: '2020.20.20',
                    col8: '播放中',
                    col9: '播放中',
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
                    value: '0',
                    label: '如文制作'
                },
                {
                    value: '1',
                    label: '视频制作'
                },
                {
                    value: '2',
                    label: '文本制作'
                },
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
        //copy
        fgetLocalTime() {//将时间转换成时间撮
            let date = new Date(this.value2[0]);
            let start = date.getTime(date);
            this.start = start;
            let date1 = new Date(this.value2[1]);
            let end = date1.getTime(date1);
            this.end = end;
        },
        CouponDataQuery(){//查询
            var url = 'admin/sideline/management/list_user';
            var data = {
                "limit": this.limit,
                "management": true,
                "page": this.page,
                "sidelineType": this.model1,
                "timeEnd": this.end,
                "timeStart": this.start,
                "usernameLike": this.value01,
            }
            this.$axios.post(url,data).then((res)=>{
                if(res.status == 200 && res.data.code == 200){
                    var AjaxData19 = res.data.list;
                    this.$nextTick(() => {
                        this.Datar19 = AjaxData19;
                    })
                }else{
                    alert(this.data.msg)
                }
            }).catch(()=>{

            })
        },
    },
    mounted(){
        this.CouponDataQuery()
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
