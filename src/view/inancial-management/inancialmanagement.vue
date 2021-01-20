<template>
    <div class="table_css_xiaoyuer">
        <!-- 财务列表 -->
        <div class="top-compo inancialmanagement">
            <div class="inancialman">
                <h2 class="centerText">当前余额</h2>
                <div class="inputcenter">
                    <inputa v-if="DataDataA != ''" :DataDataA="DataDataA"></inputa>
                </div>
                <div class="inputcenter">
                    <Badge :count="1000" :overflow-count="this.counts">
                        <button href="#" class="demo-badge buttontjsq">提现申请</button>
                    </Badge>
                </div>
            </div>
            <Row style="width:100%;">
                <Col span="12">
                    <Input
                        v-model="value01"
                        placeholder="输入流水号..."
                        clearable
                        style="width: 200px; margin-right:10px; margin-left:20px;"
                    />
                    <Input
                        v-model="value02"
                        placeholder="输入企业名称..."
                        clearable
                        style="width: 200px; margin-right:10px; margin-left:5px;"
                    />审批时间：
                    <el-date-picker
                        v-model="value2"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="——"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions"
                        @change="changeTime"
                        value-format="yyyy-MM-dd"
                    ></el-date-picker>
                    <Button
                        type="primary"
                        @click="queryBtn"
                        style="padding-left:40px; padding-right:40px;"
                    >查询</Button>
                </Col>
            </Row>
        </div>
        <!-- 表格 -->
        <tablea v-if="Datar2 != ''" :pageid="pageid" :Datar2="Datar2" :statusCode="statusCode"></tablea>
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
    </div>
</template>

<script>
import tablea from '../conponents/table/tablea/tablea.vue';
import inputa from '../conponents/input/inputa/inputa.vue';
export default {
    components: {
        tablea,
        inputa
    },
    data() {
        return {
            Datar2: '',
            // 数据发散
            pageid: [
                { pageid: 2 },
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
                    type: 'index'
                },
                {
                    title: '流水号',
                    key: 'col1',
                    align: 'center'
                },
                {
                    title: '企业名称',
                    key: 'col2',
                    align: 'center'
                },
                {
                    title: '金额',
                    key: 'col3',
                    align: 'center'
                },
                {
                    title: '入账方式',
                    key: 'col4',
                    align: 'center'
                },
                {
                    title: '入账时间',
                    key: 'col5',
                    align: 'center'
                },
                {
                    dataTanle: '1',
                    age: 18,
                    col1: 'ASD345',
                    col2: '123SD',
                    col3: '微信',
                    col4: '推广',
                    col5: '622401789465621'
                }
            ],
            page: 1,
            limit: 10,
            counts: this.counts,
            value01: '',
            value02: '',
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
            value2: '',
            start: '',
            end: '',
            DataDataA: '',
            statusCode: ''
        };
    },
    watch: {
        Datar2: {
            handler(newdata, oldata) {
                this.Datar2 = newdata;
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
        this.RequestDataforinancial();
        this.CurrentBalance();
    },
    methods: {
        //  分页
        handleSizeChange(val) {
            this.limit = val;
            this.RequestDataforinancial();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.RequestDataforinancial();
        },
        // 查询
        queryBtn() {
            this.page = 1;
            this.RequestDataforinancial();
        },
        //将时间转换成时间撮
        changeTime(valuea) {
            if (valuea != null) {
                let date = new Date(valuea[0]);
                let start = date.getTime(date);
                this.start = start;
                let date1 = new Date(valuea[1]);
                let end = date1.getTime(date1);
                this.end = end;
            } else {
                this.start = '';
                this.end = '';
            }
        },
        // List查询
        RequestDataforinancial() {
            const url = 'admin/financialManagement/orderList';
            const data = {
                companyName: this.value02,
                limit: this.limit,
                no: this.value01,
                page: this.page,
                startDate: this.start || 0,
                endDate: this.end || 0
            };
            this.$axios
                .post(url, data)
                .then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        const statusCode = res.data.code;
                        this.statusCode = statusCode;
                        if (data.code == 200) {
                            let newData = data.data;
                            this.counts = res.data.totalCount;
                            let DataAjax2 = [];
                            newData.forEach(function (val, index) {
                                DataAjax2[index] = val;
                                DataAjax2[index].col1 = val.orderSn;
                                DataAjax2[index].col2 = val.companyName;
                                DataAjax2[index].col3 = '￥' + val.payAmount / 100;
                                if (val.payType == 0) {
                                    val.payType = '未支付';
                                } else if (val.payType == 1) {
                                    val.payType = '支付宝';
                                } else if (val.payType == 2) {
                                    val.payType = '微信';
                                }
                                DataAjax2[index].col4 = val.payType;
                                var date = new Date(parseInt(val.createTime));
                                var time1 =
                                    date.getFullYear() +
                                    '-' +
                                    (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                                    '-' +
                                    date.getDate();
                                DataAjax2[index].col5 = time1;
                            });
                            this.Datar2 = DataAjax2;
                        } else {
                            this.$nextTick(() => {
                                this.Datar2 = [{ name: '暂无数据！' }];
                            });
                        }
                        if (!res.data.data || res.data.data.length == 0) {
                            this.$nextTick(() => {
                                this.Datar2 = [{ name: '暂无数据！' }];
                            });
                        }
                    }
                })
                .catch((err) => {
                    this.$nextTick(() => {
                        this.Datar2 = [{ name: '暂无数据！' }];
                    });
                });
        },
        //当前余额
        CurrentBalance() {
            const url = 'admin/financialManagement/accountBalance';
            this.$axios
                .get(url)
                .then((res) => {
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            const data = res.data.data / 100;
                            this.$nextTick(() => {
                                this.DataDataA = data;
                            });
                        } else {
                            alert(res.data.msg);
                        }
                    }
                })
                .catch((err) => {});
        }
    }
};
</script>

<style scope>
.inancialmanagement {
    width: 100%;
    height: 256px;
    background-color: #faffe0;
    padding: 15px 0px 20px 0px;
}
.inancialman {
    width: 100%;
    height: 160px;
    background-color: #f1fafd;
    margin-bottom: 36px;
}
.centerText {
    text-align: center;
    padding: 10px 0px;
}
.inputcenter {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0px;
}
.txsq-button-xiaoyuer {
    padding: 5px 30px;
    outline: none;
    border: 0;
}
.buttontjsq {
    padding: 5px 30px;
    background-color: #2450d2;
    color: #fff;
    outline: none;
    border: 0;
    border-radius: 5px;
}
.buttontjsq:hover {
    background-color: #2d8cf0;
}
.buttontjsq:active {
    background-color: #3669ff;
}
</style>
