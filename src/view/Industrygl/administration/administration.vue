<template>
    <!-- 行业中的管理 -->
    <div class="table_css_xiaoyuer">
        <div class="top-compo">
            <Row style="width: 100%">
                <Col span="12">
                    <Input
                        v-model="value01"
                        placeholder="输入房源名称..."
                        clearable
                        style="width: 200px; margin-right: 10px"
                    />
                    <Button type="primary" style="padding-left: 40px; padding-right: 40px">查询</Button>
                </Col>
            </Row>
        </div>
        <!-- 表格 -->
        <tablea
            v-if="Datar21 != ''"
            :pageid="pageid"
            :Datar21="Datar21"
            @adminiDataB="glDatafromchild"
        ></tablea>
        <!-- 分页 -->
        <el-pagination
            class="pagintion"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="counts"
        ></el-pagination>
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
            Datar21: '',
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
                    align: 'center',
                    type: 'index'
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
                    col1: '万江烽火'
                }
            ],

            page: 1,
            limit: 10,
            counts: this.counts,
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
            modal2model: false
        };
    },
    mounted() {
        this.RestHttpsData();
    },
    components: {
        tablea
    },
    methods: {
        // 分页
        handleSizeChange(val) {
            this.limit = val;
            this.RestHttpsData();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.RestHttpsData();
        },
        //弹窗
        glDatafromchild() {
            this.modal2model = !this.modal2model;
        },
        ok() {
            this.$Message.info('你点击了确定');
        },
        cancel() {
            this.$Message.info('你点击了取消');
        },
        // $ajax
        RestHttpsData() {
            const url = 'admin/job/manage/getPositionList/' + this.$route.query.id;
            this.$axios
                .get(url)
                .then((res) => {
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            const dataAjax = res.data.data;
                            const newDataAjax = [];
                            dataAjax.forEach((val, index) => {
                                newDataAjax[index] = val;
                                newDataAjax[index].col1 = val.jobName;
                            });
                            this.Datar21 = dataAjax;
                        }
                    }
                })
                .catch((err) => {});
        }
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
.PClass-model {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
}
.PClass-model span {
    text-align: center;
    padding: 10px 20px;
}
.PClass-model span:nth-child(1) {
    font-weight: 600;
}
.PClass-model span:nth-child(2) {
    padding: 10px 25px;
    border-bottom: #c1c1c1 solid 1px;
}
</style>
