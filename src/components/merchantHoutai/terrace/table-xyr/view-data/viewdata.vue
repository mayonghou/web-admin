<template>
    <div class="countDataroot">
        <div class="countData">
            <h3 class="ClassTop">与贵州万疆烽火互联网科技有限公司合作的数据</h3>
            <Button type="primary" class="returnBtn" @click="returnRouter">返回</Button>
        </div>
        <div class="chapDatalist">
            <div class="fifleTitle">关键指标</div>
            <ul>
                <li>
                    <p>浏量</p>
                    <h1>{{ this.currentCompany.viewCount }}</h1>
                </li>
                <li>
                    <P>购买用户</P>
                    <h1>{{ this.currentCompany.userCount }}</h1>
                </li>
                <li>
                    <p>销售额</p>
                    <h1>{{ this.currentCompany.totalSales }}</h1>
                </li>
                <li>
                    <p>订单量</p>
                    <h1>{{ this.currentCompany.orderCount }}</h1>
                </li>
            </ul>
        </div>
        <div class="echarpClasss">
            <div>
                <h2>代言企业销售额TOP101商品</h2>
                <div class="bgClass">
                    <div class="BgcountClass">
                        <echarts v-if="companyId != ''" :companyId="companyId"></echarts>
                    </div>
                </div>
            </div>
            <div>
                <h2 class="title-dy">对方企业代言数据对比</h2>
                <div class="bgClassv">
                    <div class="BgcountClassv">
                        <echartsb v-if="companyId != ''" :companyId="companyId"></echartsb>
                    </div>
                </div>
            </div>
        </div>
        <!-- 弹窗 -->
        <div>
            <Modal
                v-model="modalData1"
                title="关联优惠券"
                @on-ok="ok"
                @on-cancel="cancel"
                width="80%"
                :footer-hide="true"
            >
                <ModalTable :ModalTableData="ModalTableData"></ModalTable>
                <!-- 分页 -->
                <el-pagination
                    class="pagintion"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-sizes="[5, 10, 20, 30]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="counts"
                ></el-pagination>
            </Modal>
        </div>
        <div class="btnClass">
            <Button type="primary" @click="modalData1Click">查看订单</Button>
        </div>
    </div>
</template>
<script>
import echarts from '../components/echarts.vue';
import echartsb from '../components/echartsb.vue';
import ModalTable from '../components/ModalTable.vue';
export default {
    data() {
        return {
            currentCompany: {},
            modalData1: false,
            page: 1,
            limit: 10,
            counts: 0,
			companyId:'',
            ModalTableData: [
                //ModalTable
                // {
                //     orderSn: '',
                //     userName: ' ',
                //     payAmount: '',
                //     sourceUserName: '',
                //     createTime: ''
                // }
            ]
        };
    },
    components: {
        echarts,
        echartsb,
        ModalTable
    },
    methods: {
        returnRouter() {
            this.$router.push({
                path: './tablexyrCopy'
            });
        },
        ok() {
            this.$Message.info('你点击了确认');
        },
        cancel() {
            this.$Message.info('表格已隐藏');
        },
        //查看订单
        modalData1Click() {
            this.modalData1 = true;
            this.RequestDataForOrder();
        },
        // 页码
        handleSizeChange(val) {
            this.limit = val;
            this.RequestDataForOrder();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.RequestDataForOrder();
        },
        // $ajax//公司合作的数据
        getdataList() {
			this.companyId = this.$route.query.id;
            const url = 'admin/company/queryCompanyData?partnerCompanyId=' + this.$route.query.id;
            this.$axios.get(url).then((res) => {
                if (res.status == 200) {
                    let datat = res.data;
                    if (datat.code == 200) {
                        this.currentCompany = datat.data.currentCompany;
                    } else {
                        this.$message({
                            showClose: true,
                            message: datat.msg,
                            type: 'error'
                        });
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            });
        },
        //查看订单    ModalTable
        RequestDataForOrder() {
            const url = 'admin/company/adminQueryProductOrder';
            let data = {
                limit: this.limit,
                page: this.page,
                partnerCompanyId: this.$route.query.id
            };
            this.$axios //分页totalCount
                .post(url, data)
                .then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            let dataLsit = [];
                            data.data.forEach((val, index) => {
                                dataLsit[index] = val;
                                dataLsit[index].orderSn = val.orderSn;
                                dataLsit[index].userName = val.userName;
                                dataLsit[index].payAmount = val.payAmount;
                                dataLsit[index].sourceUserName = val.sourceUserName;
                                dataLsit[index].createTime = val.createTime;
                            });
                            this.ModalTableData = dataLsit;
                            this.counts = data.totalCount;
                        } else {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'error'
                            });
                        }
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                })
                .catch((err) => {});
        }
    },
    mounted() {
        this.getdataList();
    }
};
</script>
<style scoped>
.ClassTop {
    margin-top: 40px;
}

.countData {
    display: flex;
    justify-content: space-between;
    margin: 40px 0 0 0;
}

.countDataroot {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px 50px;
}

.fifleTitle {
    width: 100%;
    height: 36px;
    background-color: #2f24d2;
    color: #fff;
    padding-left: 20px;
    display: flex;
    align-items: center;
}

.chapDatalist {
    width: 100%;
    height: auto;
    margin: 20px 0px;
}

.chapDatalist ul {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
}

.chapDatalist ul li {
    width: 100%;
    height: 150px;
    border: solid 1px #e9e9e9;
    list-style-type: none;
    padding: 30px 30px;
}

.chapDatalist ul li:nth-child(2),
.chapDatalist ul li:nth-child(3),
.chapDatalist ul li:nth-child(4) {
    border-left: 0;
}

.echarpClasss {
    display: flex;
    justify-content: space-between;
    margin-top: 86px;
}

.echarpClasss div:nth-child(1) {
    width: 100%;
    min-height: 360px;
    height: auto;
}

.echarpClasss div:nth-child(2) {
    width: 100%;
    min-height: 360px;
    height: auto;
}

.title-dy {
    text-align: center;
}

.bgClass {
    padding: 20px 36px 20px 0px;
}

.BgcountClass {
    width: 100%;
    height: 100%;
}

.bgClassv {
    padding: 20px 0px 20px 36px;
}

.BgcountClassv {
    width: 100%;
    height: 100%;
}

.btnClass {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px 0px;
}
</style>