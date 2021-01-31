<template>
    <div>
        <Card v-for="(item,index) in assemblyData" :key="index" class="CaedClassStyle">
            <div class="rootClassderty">
                <div>
                    <span>订单编号：</span>
                    {{ item.OrderNumber }}
                </div>
                <div class="xiaoyuerClass">
                    <div class="xiaoyuerLeft">
                        <span class="letimgspan">
                            <img class="imgCladdss" v-if="item.adminUrl" :src="item.adminUrl" alt />
                            <div class="imgCladdss" v-else>暂无图片</div>
                        </span>
                        <span class="leftcountClass">
                            <div class="paddiongset">
                                <p class="ClassPclass">
                                    <span class="nameClass">{{ item.xyName }}</span>
                                    <span>{{ item.job }}</span>
                                </p>
                                <p class="ClassPclass">{{ item.company }}</p>
                                <p class="ClassPclass">
                                    <span>{{ item.pricefa }}</span>
                                    <span class="redCLassfontsize">{{ item.price }}</span>
                                </p>
                            </div>
                        </span>
                        <div class="middleClass">
                            <p class="ClassPclass colorClass">{{ item.ask }}</p>
                            <p class="coundfClsaa">{{ item.sign2 }}</p>
                        </div>
                    </div>
                    <div class="rightClasssDivxs">
                        <div class="rightClass">
                            <p class="ClassPclass teshuClass">订单内容及数量：</p>
                        </div>
                        <div class="ClassPclassdf">
                            <p class="ClassPclass" v-for="(item2,index) in item.sign3" :key="index">
                                {{ item2.sidelineTypeName }}
                                <span v-if="item2.accomplishedNum">
                                    <span class="xiaoyuerAddClass">
                                        <span class="xiaoyuerAddClass02">
                                            <Progress
                                                :percent="parseInt(item2.accomplishedNum / item2.totalNum * 100)"
                                                :stroke-width="8"
                                            />
                                            <!-- text-inside -->
                                        </span>
                                    </span>
                                    <span>{{'以上传'+item2.accomplishedNum+'张'}}</span>
                                </span>
                                <span class="teskClassstyle">{{'共'+ item2.totalNum +'张'}}</span>
                            </p>
                            <Button class="orderText" size="small" v-if="item.status ==1 ">查看订单内容</Button>
                        </div>
                    </div>
                </div>
                <div class="xiaoyuerJsStyle">
                    <div class="xiaoyuerJsStyleSon1">
                        <div class="decondClassRow">
                            <p>
                                {{ item.ordreTitle }}
                                {{ item.orderTime }}
                                <span>&nbsp;</span>
                                <!-- {{ item.TmTime1 }} -->
                                <!-- <span>&nbsp;</span>——
                                <span>&nbsp;</span>
                                {{ item.TmTime2 }}
                                <span>&nbsp;</span>12:00-->
                                <span class="sgengyuTimeClass">{{ item.surplus }}</span>
                            </p>
                        </div>
                        <div class="decondClassRowcd">
                            <p>
                                {{ item.CreationTime }}
                                <span>&nbsp;</span>
                                {{ item.TMdata }}
                            </p>
                        </div>
                    </div>
                    <!-- 兼职人员 -->
                    <div class="xiaoyuerJsStyleSon2">
                        <div class="xiaoyuerJsStyleSon3">
                            <div class="xiaoyuerJsStyleSon4">
                                <img v-if="item.imgSrcUrl" :src="item.imgSrcUrl" />
                                <span v-else>暂无图片</span>
                            </div>
                            <div class="xiaoyuerJsStyleSon4">
                                <div class="xiaoyuerJsStyleSon5">
                                    姓名：
                                    <span class="xiaoyuerJsStyleSon6">{{item.jobName}}</span>
                                </div>
                                <div class="xiaoyuerJsStyleSon5">
                                    职位：
                                    <span class="xiaoyuerJsStyleSon6">{{item.sellerCareer}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btnClassxiaoyuer">
                    <Button
                        :type="item.BtnData=='查看订单详情'?'primary':item.BtnData=='删除'?'error':'warning'"
                        @click="closeDel(item)"
                    >{{ item.BtnData }}</Button>
                </div>
            </div>
        </Card>
    </div>
</template>

<script>
export default {
    props: [
        /**判断 */
        'check',
        /**未付款 */
        'assemblyData1',
        /**交易失败 */
        'assemblyData2',
        // 进行中
        'DataInProgress1',
        // 已完成
        'DataInProgress2'
    ],
    data() {
        return {
            assemblyData: []
        };
    },
    created() {
        // this.RenderPage();
    },
    mounted() {
        this.RenderPage();
    },
    watch: {
        // 未付款
        assemblyData1: {
            handler(newData) {
                this.assemblyData1 = newData;
                // console.log(this.assemblyData1);
                // this.assemblyData = this.assemblyData1;
                this.$nextTick(() => {
                    this.RenderPage();
                });
            },
            deep: true,
            immediate: true
        },
        // 交易失败
        assemblyData2: {
            handler(newData) {
                this.assemblyData2 = newData;
                this.$nextTick(() => {
                    this.RenderPage();
                });
            },
            deep: true,
            immediate: true
        },
        // 进行中
        DataInProgress1: {
            handler(newData) {
                this.DataInProgress1 = newData;
                this.$nextTick(() => {
                    this.RenderPage();
                });
            },
            deep: true,
            immediate: true
        },
        DataInProgress2: {
            handler(newData) {
                this.DataInProgress2 = newData;
                this.$nextTick(() => {
                    this.RenderPage();
                });
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        // 页面渲染
        RenderPage() {
            if (this.check == 1) {
                // 未付款
                this.assemblyData = this.assemblyData1;
            } else if (this.check == 2) {
                // 交易失败
                this.assemblyData = this.assemblyData2;
            } else if (this.check == 3) {
                // 进行中
                this.assemblyData = this.DataInProgress1;
            } else if (this.check == 4) {
                // 进行中
                this.assemblyData = this.DataInProgress2;
            }
        },
        //关闭订单和删除
        closeDel(item) {
            if (this.check == 1) {
                // 未付款
                this.$parent.closeOrder(item);
            } else if (this.check == 2) {
                // 交易失败
                this.$parent.delOrder(item);
            } else if (this.check == 3) {
                // 交易失败
                this.$parent.closeOrder(item);
            }
        }
    }
};
</script>

<style scope>
@import './forUnpaidPage.css';
</style>