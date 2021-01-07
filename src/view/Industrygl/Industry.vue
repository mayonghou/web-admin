<template>
    <!-- 行业管理 -->
    <div class="table_css_xiaoyuer">
        <div class="top-compo">
            <Row style="width: 100%">
                <Col span="12">
                    <Input v-model="value01" placeholder="输入行业名称..." clearable style="width: 200px; margin-right: 10px" />
                    <Button @click="CouponDataQuery" type="primary" style="padding-left: 40px; padding-right: 40px">查询</Button>
                </Col>
            </Row>
        </div>
        <!-- 表格 -->
        <tablea v-if="Datar17 != ''" :pageid="pageid" :Datar17='Datar17' @adminiDataA='xgDatafromchild'></tablea>
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
        <!-- 弹窗 -->
        <div>
            <Modal
                v-model="modal1model"
                title="修改行业"
                @on-ok="ok"
                @on-cancel="cancel"
                @click="modal1model = true"
                >
                <p class="PClass-model">
                    <span>行业全称</span>
                    <span>电商</span>
                </p>
                <p class="PClass-model">
                    <span>行业简称</span>
                    <span>电商</span>
                </p>
            </Modal>
        </div>
    </div>
</template>

<script>
import tablea from '../conponents/table/tablea/tablea.vue';
export default {
    data() {
        return {
            Datar17:'',
            // 数据发散
            pageid: [
                { pageid: 17 },
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '序号',
                    slot: 'dataTanle',
                    width: 70,
                    align: 'center',
                    type:'index'
                },
                {
                    title: '行业全称',
                    key: 'col1',
                    align: 'center'
                },
                {
                    title: '行业简称',
                    key: 'col2',
                    align: 'center'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 300,
                    align: 'center'
                },
                {
                    dataTanle: '1',
                    col1: '万江烽火',
                    col2: '小鱼儿'
                }
            ],

            page: 1,
            limit: 20,
            counts: this.counts || 1,
            // value2: ['2016-01-01', '2016-02-15'],
            value01: '',
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
            modal1model: false,
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
        xgDatafromchild(){//弹窗
            this.modal1model = !this.modal1model;
        },
        ok () {//弹窗
            this.$Message.info('你点击了确定');
        },
        cancel () {//弹窗
            this.$Message.info('你点击了取消');
        },
        CouponDataQuery(){//查询
            var url = 'admin/industry/list' +'?pag='+ this.page +'&limit='+ this.limit +'&name='+ this.value01;
            this.$axios.get(url).then((res)=>{
                var AjaxData17 = res.data.data;
                this.$nextTick(() => {
                    this.Datar17 = AjaxData17;
                })

            }).catch(()=>{

            })
        },
    },
    mounted(){
        this.CouponDataQuery()
    },
    components: {
        tablea,
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
  .PClass-model{
    box-sizing: border-box;
    display: flex;
    justify-content: center;
  }
  .PClass-model span{
    text-align: center;
    padding: 10px 20px;
  }
  .PClass-model span:nth-child(1){
    font-weight: 600;
  }
  .PClass-model span:nth-child(2){
    padding: 10px 25px;
    border-bottom: #C1C1C1 solid 1px;
  }
</style>
