<template>
<!-- 行业中的管理 -->
    <div class="table_css_xiaoyuer">
        <div class="top-compo">
            <Row style="width: 100%">
                <Col span="12">
                    <Input v-model="value01" placeholder="输入房源名称..." clearable style="width: 200px; margin-right: 10px" />
                    <Button type="primary" style="padding-left: 40px; padding-right: 40px">查询</Button>
                </Col>
            </Row>
        </div>
        <!-- 表格 -->
        <tablea :pageid="pageid"  @adminiDataB='glDatafromchild'></tablea>
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
            v-model="modal2model"
            title="修改职位"
            @on-ok="ok"
            @on-cancel="cancel"
            @click="modal2model = true"
            >
              <p class="PClass-model">
                <span>职位全称</span>
                <span>UI设计师</span>
              </p>
              <p class="PClass-model">
                <span>职位全称</span>
                <span>UI设计师</span>
              </p>
              <p class="PClass-model">
                <span>职位全称</span>
                <span>UI设计师</span>
              </p>
              <p class="PClass-model">
                <span>职位全称</span>
                <span>UI设计师</span>
              </p>
            </Modal>
        </div>
    </div>
</template>

<script>
import tablea from '../../conponents/table/tablea/tablea.vue';
export default {
    data() {
        return {
            // 数据发散
            pageid: [
                { pageid: 21 },
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '序号',
                    slot: 'dataTanle',
                    width: 75,
                    align: 'center'
                },
                {
                    title: '职位名称',
                    key: 'col1',
                    align: 'center'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 200,
                    align: 'center'
                },
                {
                    dataTanle: '1',
                    col1: '万江烽火',
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
            modal2model: false,
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
        glDatafromchild(){//弹窗
          this.modal2model = !this.modal2model;
        },
        ok () {//弹窗
            this.$Message.info('你点击了确定');
        },
        cancel () {
            this.$Message.info('你点击了取消');
        }
    },
    mounted(){

    },
    components: {
        tablea
    },
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
