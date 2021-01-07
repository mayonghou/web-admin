<template>
<!-- 招聘列表 -->
    <div class="table_css_xiaoyuer">
        <div class="top-compo">
            <Row style="width: 100%">
                <Col span="12">
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
                    <el-select v-model="model2" style="width:150px; margin-right:10px;" @change="changeStatus" placeholder="全部行业">
                        <el-option v-for="item in cityList2" :value="item.id" :label="item.name" :key="item.id"></el-option>
                    </el-select>
                    <Select v-model="model3" style="width:150px; margin-right:10px;" placeholder="行业职位">
                        <Option v-for="item in cityList3" :value="item.id" :label="item.jobName" :key="item.id"></Option>
                    </Select>
                    <Select v-model="model4" style="width:150px; margin-right:10px;" placeholder="状态">
                        <Option v-for="item in cityList4" :value="item.id" :label="item.name" :key="item.id"></Option>
                    </Select>
                    <Button  @click="CouponDataQuery" type="primary" style="padding-left: 40px; padding-right: 40px">查询</Button>
                </Col>
            </Row>
        </div>
        <!-- 表格 -->
        <tablea v-if="Datar4 != ''" :pageid="pageid" :Datar4='Datar4'></tablea>
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
    data() {
        return {
            Datar4:'',
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
                    width:110,
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
            limit: 20,
            counts: this.counts || 1,
            // value2: ['2016-01-01', '2016-02-15'],
            value02: '',
            value03: '',
            model2: '',
            model3: '',
            model4:'',

            cityList2: [//全部行业
                {
                    id: '0',
                    name: '行业1'
                },
                {
                    id: '1',
                    name: '行业2'
                }
            ],
            cityList3: [  //职位
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

            cityList4: [  //状态
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
        // AJAXquery
        fgetLocalTime() {//将时间转换成时间撮
            let date = new Date(this.value2[0]);
            let start = date.getTime(date);
            this.start = start;
            let date1 = new Date(this.value2[1]);
            let end = date1.getTime(date1);
            this.end = end;
        },
        CouponDataQuery(){  //查询表格
            var url = 'admin/job/manage/getList';
            if(this.model4 == '上架'){
                this.model4 = 2;
            }else if(this.model4 == '下架'){
                this.model4 = 3;
            }
            var data = {
                "company": this.value02,
                "industryId": this.model2 || 0,
                "jobName": this.model3,
                "limit": this.limit,
                "page": this.page,
                "pushEndDate": this.end  || 0,
                "pushStareDate": this.start  || 0,
                "status": this.model4,
            }
            this.$axios.post(url,data).then((res)=>{
                var AjaxData4 = res.data.data.data.jobDetailDTOS;
                this.$nextTick(() => {
                    this.Datar4 = AjaxData4;
                })
            }).catch(()=>{

            })
        },
        changeStatus(value){
            console.log(value);
            this.getzhiwei(value);
        },
        Queryindustry(){  // 查询行业
            this.$axios.get('admin/industry/list').then((res) => {
                this.cityList2 = res.data.data;
            });
        },
        getzhiwei(value){  //查询职位
            this.$axios.get('admin/job/manage/getPositionList/'+ value).then((res)=>{
                this.cityList3 = res.data.data;
                console.log(this.cityList3);
            })
        },
    },
    mounted(){
        this.Queryindustry();
        this.CouponDataQuery();//查询表格
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
