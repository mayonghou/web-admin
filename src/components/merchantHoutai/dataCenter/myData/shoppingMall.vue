<template>
    <!-- 商城数据 -->
    <div class="mydatas" id="mydatas">
        <!-- 导航 -->
        <!--  @click="tabqiuehuan" -->
        <div class="button">
            <div
                class="but"
                ref="buttab"
                :class="item.index == 0?'active':''"
                v-for="item in navlist"
                :key="item.index"
                @click="navTab(item)"
            >{{item.name}}</div>
            <!-- <div @click="zhaopiData" class="but">招聘数据</div>
            <div class="but">房源数据</div>-->
        </div>

        <!-- 商城数据 -->
        <div class="shoppingmall tab-list" v-show="this.activeIndex == 0">
            <!-- 头部总数 -->
            <div class="shoppingmall-top">
                <div class="top-text">
                    <img class="img" src="../../../../assets/img/dataCenter/jiaoyi.png" />
                    <div class="top-countNum">
                        <div class="countNum-top">￥{{this.shangcheng.saleTotal}}</div>
                        <div class="countNum-bottom">今日销售总额</div>
                    </div>
                </div>
                <div class="top-text">
                    <img class="img" src="../../../../assets/img/icon/dingdandanjuwenjian.png" />
                    <div class="top-countNum">
                        <div class="countNum-top">{{this.shangcheng .orderTotal}}</div>
                        <div class="countNum-bottom">今日订单量</div>
                    </div>
                </div>
                <div class="top-text">
                    <img class="img" src="../../../../assets/img/dataCenter/chuhuo.png" />
                    <div class="top-countNum">
                        <div class="countNum-top">{{this.shangcheng.sendGoodsTotal}}</div>
                        <div class="countNum-bottom">今日出货量</div>
                    </div>
                </div>
                <div class="top-text top-browse">
                    <img class="img" src="../../../../assets/img/dataCenter/liulan.png" />
                    <div class="top-countNum">
                        <div class="countNum-top">{{this.shangcheng.viewTotal}}</div>
                        <div class="countNum-bottom">今日浏览量</div>
                    </div>
                </div>
            </div>
            <!-- 客户和商品统计 -->
            <div class="kehuShoppCount">
                <!-- 客户统计 -->
                <strong></strong>
                <div class="kehuCount">
                    <el-card class="box-card">
                        <div slot="header" class="kehu-card">
                            <div style="color: #2D353E; font-size: 22px;">客户统计</div>
                            <div>单位（个）</div>
                        </div>
                        <div class="text item">
                            <div>
                                <div style="font-size: 36px;">{{this.shoppCountsData.toDayAdd}}</div>
                                <div style="font-size: 18px;">今日新增</div>
                            </div>
                            <div>
                                <div style="font-size: 36px;">{{this.shoppCountsData.yesDayAdd}}</div>
                                <div style="font-size: 18px;">昨日新增</div>
                            </div>
                            <div>
                                <div style="font-size: 36px;">{{this.shoppCountsData.monthAdd}}</div>
                                <div style="font-size: 18px;">本月新增</div>
                            </div>
                            <div>
                                <div style="font-size: 36px;">{{this.shoppCountsData.total}}</div>
                                <div style="font-size: 18px;">客户总数</div>
                            </div>
                        </div>
                    </el-card>
                </div>
                <!-- 商品统计 -->
                <div class="shoppingCount">
                    <el-card class="box-card">
                        <div slot="header" class="kehu-card">
                            <div style="color: #2D353E; font-size: 22px;">商品统计</div>
                            <div>单位（件）</div>
                        </div>
                        <div class="text item">
                            <div>
                                <div style="font-size: 36px;">{{this.goodsCountsData.total}}</div>
                                <div style="font-size: 18px;">商品总数</div>
                            </div>
                            <div>
                                <div style="font-size: 36px;">{{this.goodsCountsData.endorsement}}</div>
                                <div style="font-size: 18px;">代言企业</div>
                            </div>
                            <div>
                                <div style="font-size: 36px;">{{this.goodsCountsData.toDayUp}}</div>
                                <div style="font-size: 18px;">今日上架</div>
                            </div>
                            <div>
                                <div style="font-size: 36px;">{{this.goodsCountsData.toDayDn}}</div>
                                <div style="font-size: 18px;">今日下架</div>
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
            <!-- 情况和排名 -->
            <div class="situationRanking">
                <!-- 情况 -->
                <div class="SR-Left">
                    <div class="left-top">
                        <div class="leftData left">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>订单情况</span>
                                </div>
                                <div class="text item">
                                    <div class="text-item">
                                        <div style="color: #101010; font-size: 13px;">待支付订单：</div>
                                        <div
                                            style="color:#55CA7D;"
                                        >{{this.orderCountssituation.noPayCount}}</div>
                                    </div>
                                    <div class="text-item">
                                        <div style="color: #101010; font-size: 13px;">待发货订单：</div>
                                        <div
                                            style="color:#55CA7D;"
                                        >{{this.orderCountssituation.noSendCount}}</div>
                                    </div>
                                    <div class="text-item">
                                        <div style="color: #101010; font-size: 13px;">待收货订单：</div>
                                        <div
                                            style="color:#55CA7D;"
                                        >{{this.orderCountssituation.noReceiveCount}}</div>
                                    </div>
                                    <div class="text-item">
                                        <div style="color: #101010; font-size: 13px;">已成交订单数：</div>
                                        <div
                                            style="color:#55CA7D;"
                                        >{{this.orderCountssituation.successCount}}</div>
                                    </div>
                                    <div class="text-item">
                                        <div style="color: #101010; font-size: 13px;">交易失败：</div>
                                        <div
                                            style="color:#55CA7D;"
                                        >{{this.orderCountssituation.failCount}}</div>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                        <div class="leftData center">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>商品情况</span>
                                </div>
                                <div class="text item">
                                    <div class="text-item">
                                        <div style="color: #101010; font-size: 13px;">待审核商品：</div>
                                        <div
                                            style="color:#55CA7D;"
                                        >{{this.goodsCountssituation.noVerifyCount}}</div>
                                    </div>
                                    <div class="text-item">
                                        <div style="color: #101010; font-size: 13px;">库存警告商品：</div>
                                        <div
                                            style="color:#55CA7D;"
                                        >{{this.goodsCountssituation.stockWarnCount}}</div>
                                    </div>
                                    <div class="text-item">
                                        <div style="color: #101010; font-size: 13px;">上架商品：</div>
                                        <div
                                            style="color:#55CA7D;"
                                        >{{this.goodsCountssituation.upCount}}</div>
                                    </div>
                                    <div class="text-item">
                                        <div style="color: #101010; font-size: 13px;">下架商品：</div>
                                        <div
                                            style="color:#55CA7D;"
                                        >{{this.goodsCountssituation.dnCount}}</div>
                                    </div>
                                    <div class="text-item">
                                        <div style="color: #101010; font-size: 13px;">已售商品数量：</div>
                                        <div
                                            style="color:#55CA7D;"
                                        >{{this.goodsCountssituation.saleCount}}</div>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                        <div class="leftData right">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>客户情况</span>
                                </div>
                                <div class="text item">
                                    <div class="text-item">
                                        <div style="color: #101010;">潜在客户：</div>
                                        <div
                                            style="color:#55CA7D;"
                                        >{{this.ConsumerCountssituation.potentialCount}}</div>
                                    </div>
                                    <div class="text-item">
                                        <div style="color: #101010;">客服数量：</div>
                                        <div
                                            style="color:#55CA7D;"
                                        >{{this.ConsumerCountssituation.serviceCount}}</div>
                                    </div>
                                    <div class="text-item">
                                        <div style="color: #101010;">今日活跃：</div>
                                        <div
                                            style="color:#55CA7D;"
                                        >{{this.ConsumerCountssituation.todayActiveCount}}</div>
                                    </div>
                                    <div class="text-item"></div>
                                    <div class="text-item"></div>
                                </div>
                            </el-card>
                        </div>
                    </div>
                    <div class="left-bottom">
                        <div class="bottom bottom-left">
                            <el-card class="box-card">
                                <div class="text">
                                    <span>今日转换率</span>
                                </div>
                                <div class="baifengbi">{{this.conversionRate}}%</div>
                                <el-progress
                                    :show-text="false"
                                    :stroke-width="20"
                                    :percentage="conversionRate"
                                ></el-progress>
                            </el-card>
                        </div>
                        <div class="bottom bottom-right">
                            <el-card class="box-card fugoulv">
                                <div class="box-text" style=" padding:0 20px;">
                                    <div class="text">复购率</div>
                                    <div class="baifengbi">{{this.repeatRate}}%</div>
                                </div>
                                <!-- style="margin-left: 80px;" -->
                                <el-progress
                                    type="circle"
                                    :show-text="false"
                                    color="#34C758"
                                    stroke-linecap="square"
                                    :stroke-width="20"
                                    :percentage="repeatRate"
                                ></el-progress>
                            </el-card>
                        </div>
                    </div>
                </div>
                <!-- 排名 -->
                <div class="SR-Right">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <img
                                width="20"
                                height="20"
                                src="../../../../assets/img/antOutline-riseCopy.svg"
                            />
                            <span
                                style="font-size: 16px; font-weight: bolder;margin-left: 5px;"
                            >销售额排名(元)</span>
                        </div>
                        <div
                            v-for="(item,index) in this.productList"
                            :key="index"
                            class="text item"
                        >
                            <div :class="'index'+ (index + 1)" class="index">{{index + 1}}</div>
                            <div class="sole">
                                <div>{{item.name}}</div>
                                <div>{{item.value / 100}}</div>
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
            <!-- 订单销售统计 -->
            <div class="orderCount">
                <!-- 统计表 -->
                <div class="orderMarket">
                    <!-- 订单统计 -->
                    <div class="ordermeter">
                        <el-card>
                            <div class="meter">
                                <label @click="statTimeType1" class="meterspan">七天</label>
                                <label @click="statTimeType2" class="meterspan">一月</label>
                                <label @click="statTimeType3" class="meterspan">一年</label>
                                <el-date-picker
                                    v-model="value1"
                                    type="date"
                                    placeholder="选择日期"
                                    value-format="yyyy-MM-dd"
                                    @change="changeTime"
                                ></el-date-picker>
                            </div>
                            <div
                                id="orderChart"
                                ref="orders"
                                :style="{width: '850px', height: '300px',}"
                            ></div>
                        </el-card>
                    </div>
                    <!-- 销售统计 -->
                    <div class="Marketmeter">
                        <el-card>
                            <div class="meter">
                                <label @click="timeType1" class="meterspan">七天</label>
                                <label @click="timeType2" class="meterspan">一月</label>
                                <label @click="timeType3" class="meterspan">一年</label>
                                <el-date-picker
                                    v-model="value2"
                                    type="date"
                                    placeholder="选择日期"
                                    value-format="yyyy-MM-dd"
                                    @change="changeTime2"
                                ></el-date-picker>
                            </div>
                            <div id="marketChart" :style="{width: '850px', height: '300px',}"></div>
                        </el-card>
                    </div>
                </div>
                <!-- 前十订单 -->
                <div class="orderforefront">
                    <el-card>
                        <div class="order-top-a">
                            <img width="16" src="../../../../assets/img/antOutline-riseCopy.svg" />
                            订单量前十的商品
                        </div>
                        <ul class="orderUl">
                            <li class="orderLi" v-for="(item,i) in this.orderList" :key="i">
                                <div :class="'orderIndex'+ (i+1)" class="orderIndex">{{i+1}}</div>
                                <div class="orderText">
                                    <div class="shoppName">{{item.name}}</div>
                                    <div class="orderAmount">
                                        <div class="progress">
                                            <el-progress
                                                :show-text="false"
                                                :percentage="item.value"
                                            ></el-progress>
                                        </div>
                                        <div class="commit">{{item.value}}</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </el-card>
                </div>
            </div>
        </div>
        <!-- 招聘数据 -->
        <div class="recruitment tab-list" v-show="this.activeIndex == 1">
            <!-- 关键指标 -->
            <div class="recruitment-top">
                <div class="indicator">
                    <label style="margin-left: 20px;">关键指标</label>
                </div>
                <div class="indicator-data">
                    <div class="indicator-list">
                        <div>职位被收藏次数</div>
                        <div
                            style="font-size: 30px;font-weight: bold;"
                        >{{this.hzibiaoData.collection}}</div>
                    </div>
                    <div class="indicator-list">
                        <div>沟通过</div>
                        <div
                            style="font-size: 30px;font-weight: bold;"
                        >{{this.hzibiaoData.totalConnect}}</div>
                    </div>
                    <div class="indicator-list">
                        <div>在招职位</div>
                        <div
                            style="font-size: 30px;font-weight: bold;"
                        >{{this.hzibiaoData.groundingPosition}}</div>
                    </div>
                    <div class="indicator-list">
                        <div>累计浏览量</div>
                        <div
                            style="font-size: 30px;font-weight: bold;"
                        >{{this.hzibiaoData.totalViews}}</div>
                    </div>
                </div>
            </div>
            <!-- 在招职位浏览量及沟通量 -->
            <div class="recrutment-echarts">
                <div class="echarts-select">
                    <el-select
                        class="select"
                        v-model="selectName"
                        @change="selectNamedata"
                        clearable
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                    <el-date-picker
                        class="data-picker"
                        v-model="methed"
                        type="month"
                        placeholder="选择月"
                        value-format="yyyy-MM"
                        @change="timeData"
                    ></el-date-picker>
                </div>
                <div style="width: 100%;text-align:center;" v-if="this.postTList != []">
                    <img src="../../../../assets/img/marketingqianlima/zhanwuData.png" alt />
                </div>
                <div id="positionEcharts" v-else :style="{width: '1587px', height: '300px',}"></div>
            </div>
            <!-- 招聘简历的平台数据 -->
            <div class="resumeData">
                <div class="echartsPie">
                    <el-select
                        class="pie-select"
                        v-model="echartPie"
                        @change="resumepingtai"
                        clearable
                    >
                        <el-option
                            v-for="item in industryData"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                    <div
                        style="width: 100%;text-align:center;"
                        v-if="this.educationDataDTOList != []"
                    >
                        <img src="../../../../assets/img/marketingqianlima/zhanwuData.png" alt />
                    </div>
                    <div
                        id="resumeDataPie"
                        class="resumeDataPie"
                        :style="{width:'590px',height:'300px',}"
                    ></div>
                </div>
                <div class="echartstable">
                    <el-table :data="tableData">
                        <el-table-column type="index" label="排名" align="center"></el-table-column>
                        <el-table-column prop="experience" label="工作经验" align="center"></el-table-column>
                        <el-table-column prop="proportion" label="占比%" width="300" align="center">
                            <template slot-scope="scope">
                                <el-progress
                                    :text-inside="true"
                                    :stroke-width="12"
                                    :percentage="parseInt(scope.row.proportion)"
                                ></el-progress>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <!-- 房源数据 -->
        <div class="housing tab-list" v-show="this.activeIndex == 2">
            <!-- 关键指标 -->
            <div class="recruitment-top">
                <div class="indicator">
                    <label style="margin-left: 20px;">关键指标</label>
                </div>
                <div class="indicator-data">
                    <div class="indicator-list">
                        <div>上架房源</div>
                        <div
                            style="font-size: 30px;font-weight: bold;"
                        >{{this.houserdataList.groundingHouse}}</div>
                    </div>
                    <div class="indicator-list">
                        <div>被收藏的房源</div>
                        <div
                            style="font-size: 30px;font-weight: bold;"
                        >{{this.houserdataList.collection}}</div>
                    </div>
                    <div class="indicator-list">
                        <div>累计沟通</div>
                        <div
                            style="font-size: 30px;font-weight: bold;"
                        >{{this.houserdataList.totalConnect}}</div>
                    </div>
                    <div class="indicator-list">
                        <div>累计浏览量</div>
                        <div
                            style="font-size: 30px;font-weight: bold;"
                        >{{this.houserdataList.totalViews}}</div>
                    </div>
                </div>
            </div>
            <!-- 在招房源浏览量及沟通量 -->
            <div class="recrutment-echarts">
                <div class="echarts-select">
                    <el-select
                        class="select"
                        v-model="selecthousing"
                        placeholder="全部在租房源"
                        clearable
                        @change="fangyuanchange"
                    >
                        <el-option
                            v-for="item in fangyuanList"
                            :key="item.id"
                            :label="item.houseTitle"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                    <el-date-picker
                        class="data-picker"
                        v-model="monthed"
                        type="month"
                        placeholder="选择月"
                        @change="houseDate"
                    ></el-date-picker>
                </div>
                <div style="width: 100%;text-align:center;" v-if="this.posdsadasList != []">
                    <img src="../../../../assets/img/marketingqianlima/zhanwuData.png" alt />
                </div>
                <div id="housingecharts" style="width:100%;height: 300px;"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'mydatas',
    data() {
        return {
            postTList: [],
            navlist: [
                {
                    index: 0,
                    name: '商城数据'
                },
                {
                    index: 1,
                    name: '招聘数据'
                },
                {
                    index: 2,
                    name: '租房数据'
                }
            ],
            activeIndex: 0,
            hzibiaoData: {},
            value1: '',
            value2: '',
            selectName: '',
            orderC: '',
            mark: '',
            posEchart: '',
            methed: '',
            job: '',
            echartPie: '',
            selecthousing: '',
            monthed: '',
            tableData: [],
            educationDataDTOList: [],
            shoppCountsData: {}, // 数据中心商城数据客户统计
            goodsCountsData: {}, // 数据中心商场数据商品统计
            goodsCountssituation: {}, //数据中心商城数据 商品情况
            orderCountssituation: {}, //数据中心商城数据 订单情况
            ConsumerCountssituation: {}, //数据中心商城数据 客户情况
            conversionRate: this.conversionRate, //转化率
            repeatRate: this.repeatRate, //复购率
            productList: [], // 销售额排名
            orderList: [],
            statTimeType: 3,
            statTimeTypes: 3,
            shangcheng: {},
            posdsadasList: [],
            houserdataList: {},
            options: [],
            zhiweiName: '',
            startDate: '',
            endDate: '',
            houseStartTime: '',
            houseEndTime: '',
            positionName: '',
            industryData: [],
            valueindustry: '',
            fangyuanList: [],
            fangyaunid: ''
        };
    },
    mounted() {
        this.orderEcharts();
        this.marketEcharts();
        this.getAdminConsumerDataStat();
        this.getAdminProductDataStat();
        this.getAdminDataCenterOrder();
        this.getAdminDataCenterConsumer();
        this.getAdminDataCenterPageMiddle();
        this.getQueryPageHeaderData();
        this.getAdminDataCenterProduct();
    },
    methods: {
        // 导航切换
        navTab(item) {
            if (item.index == 0) {
                this.orderEcharts();
                this.marketEcharts();
                this.getAdminConsumerDataStat();
                this.getAdminProductDataStat();
                this.getAdminDataCenterOrder();
                this.getAdminDataCenterConsumer();
                this.getAdminDataCenterPageMiddle();
                this.getQueryPageHeaderData();
                this.getAdminDataCenterProduct();
            } else if (item.index == 1) {
                // 招聘数据
                this.getJobData();
                this.getDateTime();
                this.getindustryList();
                this.getpositionList();
                this.positionEchartData();
                this.resumeJobPie();
            } else {
                //租房数据
                this.gethouseDatalist();
                this.gethouseDateTime();
                this.queryDataPost();
                this.housingechartpar();
                this.getzaixianFangyuan();
            }

            for (let i = 0; i < this.$refs.buttab.length; i++) {
                if (item.index == i) {
                    this.activeIndex = i;
                    this.$refs.buttab[i].classList.add('active');
                } else {
                    this.$refs.buttab[i].classList.remove('active');
                }
            }
        },

        zhaopiData() {},
        // 招聘指标
        getJobData() {
            this.$axios.post('admin/job/manage/jobData').then((res) => {
                console.log(res);
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.hzibiaoData = data.data.data;
                    }
                }
            });
        },
        // 数据中心商城数据客户统计
        getAdminConsumerDataStat() {
            this.$axios.get('admin/mall/dataCenter/getAdminConsumerDataStat').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.shoppCountsData = data.data;
                    }
                }
            });
        },
        // 数据中心商场数据商品统计
        getAdminProductDataStat() {
            this.$axios.get('admin/mall/dataCenter/getAdminProductDataStat').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.goodsCountsData = data.data;
                    }
                }
            });
        },
        // 数据中心商城数据 商品情况
        getAdminDataCenterProduct() {
            this.$axios.get('admin/mall/dataCenter/getAdminDataCenterProduct').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.goodsCountssituation = data.data;
                    }
                }
            });
        },
        // 数据中心商城数据 订单情况
        getAdminDataCenterOrder() {
            this.$axios.get('admin/mall/dataCenter/getAdminDataCenterOrder').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.orderCountssituation = data.data;
                    }
                }
            });
        },
        // 数据中心商城数据 客户情况
        getAdminDataCenterConsumer() {
            this.$axios.get('admin/mall/dataCenter/getAdminDataCenterConsumer').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.ConsumerCountssituation = data.data;
                    }
                }
            });
        },
        // 转化率，复购率，top排行 销售额排行 订单量排行
        getAdminDataCenterPageMiddle() {
            this.$axios.get('admin/mall/dataCenter/getAdminDataCenterPageMiddle').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.conversionRate = parseInt(data.data.conversionRate);
                        this.repeatRate = parseInt(data.data.repeatRate);
                        this.productList = data.data.productList;
                        this.orderList = data.data.orderList;
                    }
                }
            });
        },
        // 数据中心 、商城数据
        getQueryPageHeaderData() {
            this.$axios.get('admin/mall/queryPageHeaderData').then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        console.log(data);
                        this.shangcheng = data.data;
                        this.shangcheng.saleTotal = data.data.saleTotal / 100;
                    }
                }
            });
        },

        statTimeType1() {
            this.statTimeType = 0;
            this.orderEcharts();
        },
        statTimeType2() {
            this.statTimeType = 1;
            this.orderEcharts();
        },
        statTimeType3() {
            this.statTimeType = 2;
            this.orderEcharts();
        },
        changeTime(value) {
            this.value1 = value;
            this.statTimeType = 3;
            this.orderEcharts();
        },
        // 订单统计
        orderEcharts() {
            let data = {
                statTimeType: parseInt(this.statTimeType),
                statDate: this.value1,
                statType: 0
            };
            this.$axios.post('admin/mall/dataCenter/getOrderTimeline', data).then((res) => {
                if (res.status == 200) {
                    let datas = res.data;
                    if (datas.code == 200) {
                        var name = [];
                        var value = [];
                        datas.data.forEach(function (val, index) {
                            name[index] = val.name;
                            value[index] = val.value;
                        });
                        // 基于准备好的dom，初始化echarts实例
                        this.orderC = document.getElementById('orderChart');
                        let order = this.$echarts.init(this.orderC);
                        // 绘制图表
                        order.setOption({
                            title: {
                                text: '订单统计'
                            },
                            tooltip: {},
                            xAxis: {
                                // data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子","衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                                data: name
                            },
                            grid: {
                                left: '0%',
                                right: '0%',
                                bottom: 0,
                                containLabel: true
                            },
                            yAxis: {},
                            series: [
                                {
                                    name: '销量',
                                    type: 'line',
                                    color: '#f6d393',
                                    // data: [5, 20, 36, 10, 10, 20,30,40,50,60,90,70]
                                    data: value
                                }
                            ]
                        });
                    }
                }
            });
        },

        timeType1() {
            this.statTimeTypes = 0;
            this.marketEcharts();
        },
        timeType2() {
            this.statTimeTypes = 1;
            this.marketEcharts();
        },
        timeType3() {
            this.statTimeTypes = 2;
            this.marketEcharts();
        },
        changeTime2(value) {
            this.value2 = value;
            this.statTimeTypes = 3;
            this.marketEcharts();
        },
        // 销售统计
        marketEcharts() {
            let datac = {
                statTimeType: parseInt(this.statTimeTypes),
                statDate: this.value2,
                statType: 1
            };
            this.$axios.post('admin/mall/dataCenter/getOrderTimeline', datac).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        var names = [];
                        var values = [];
                        data.data.forEach(function (val, index) {
                            names[index] = val.name;
                            values[index] = val.value;
                        });
                        // 基于准备好的dom，初始化echarts实例
                        let mark = document.getElementById('marketChart');
                        let market = this.$echarts.init(mark);
                        // 绘制图表
                        market.setOption({
                            title: {
                                text: '销售统计'
                            },
                            tooltip: {},
                            xAxis: {
                                data: names
                            },
                            yAxis: {},
                            grid: {
                                left: '0%',
                                right: '0%',
                                bottom: 0,
                                containLabel: true
                            },
                            series: [
                                {
                                    name: '销量',
                                    type: 'line',
                                    color: '#f6d393',
                                    // data: [5, 20, 36, 10, 10, 20,30,40,50,60,90,70],
                                    data: values
                                }
                            ]
                        });
                    }
                }
            });
        },
        // 获取当前时间
        getDateTime() {
            let date = new Date();
            let yyyy = date.getFullYear();
            let MM = date.getMonth() + 1;
            if (MM.toString().length == 1) {
                var mouth = '0' + MM;
            }
            this.endDate = yyyy + '-' + mouth + '-31';
            this.startDate = yyyy + '-' + mouth + '-01';
        },
        // 在招职位浏览量及沟通量统计
        positionEchartData() {
            let data = {
                jobName: this.zhiweiName,
                endDate: this.endDate,
                startDate: this.startDate
            };
            this.$axios.post('admin/job/dataCenter/jobDataByMonth', data).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        let today = [];
                        let connectCount = [];
                        let views = [];
                        this.postTList = data.data.data;
                        data.data.data.forEach(function (val, index) {
                            today[index] = val.toDay;
                            connectCount[index] = val.connectCount;
                            views[index] = val.views;
                        });
                        var positionEchartsdata = document.getElementById('positionEcharts');
                        // var resizeMyChartContainer = function () {
                        // positionEchartsdata.style.height = window.innerHeight * 0.65 + 'px';
                        //     positionEchartsdata.style.width = window.innerWidth * 0.75 + 'px';
                        // };
                        // // 设置容器高和宽
                        // resizeMyChartContainer();
                        var positionE = this.$echarts.init(positionEchartsdata);
                        positionE.setOption({
                            title: {
                                text: '平台职位浏览量及沟通量'
                            },
                            tooltip: {},
                            grid: {
                                top: '15%',
                                right: '2%',
                                left: '3%',
                                bottom: '12%'
                            },
                            legend: {
                                x: '1400', //水平方向的位置'left'，'center'，'right'
                                y: '50',
                                width: 0, //组件的宽和高
                                height: 0,
                                orient: 'vertical', //组件与文字的排列方式，默认横向，纵向为'vertical'
                                itemGap: 12, //每个图例之间的间隔
                                textStyle: {
                                    //图例文字属性设置
                                    fcolor: '#ffffff',
                                    fontFamily: 'Microsoft YaHei',
                                    ontSize: '16'
                                },
                                tooltip: {
                                    //在legend里的tooltip，在鼠标滑到图例上时，展示自定义的内容
                                    show: true
                                },
                                data: ['浏览量', '沟通量']
                            },
                            xAxis: {
                                // data: []
                                data: today
                            },
                            yAxis: {},
                            series: [
                                {
                                    name: '沟通量',
                                    type: 'bar',
                                    barWidth: 7,
                                    stack: 'one',
                                    color: '#5FA5C1',
                                    data: connectCount
                                },
                                {
                                    name: '浏览量',
                                    type: 'bar',
                                    barWidth: 7,
                                    stack: 'one',
                                    color: '#FFCC48',
                                    data: views
                                }
                            ]
                        });
                    }
                }
            });
        },
        // 获取职位数据
        getpositionList() {
            var daTassdsad = {
                companyId: 1,
                limit: 1000,
                page: 1
            };
            this.$axios
                .get('admin/company/positions?companyId=' + localStorage.getItem('loginData') + '&limit=1000' + '&page=1')
                .then((res) => {
                    if (res.status == 200) {
                        let datas = res.data;
                        if (datas.code == 200) {
                            this.options = datas.data;
                        }
                    }
                });
        },
        // 拿到职位名称
        selectNamedata(value) {
            let obj = {};
            obj = this.options.find((item) => {
                return item.id === value;
            });
            this.zhiweiName = obj.name;
            this.positionEchartData();
        },
        // 招聘月数的改变
        timeData(value) {
            if (value != null) {
                this.endDate = value + '-31';
                this.startDate = value + '-01';
            } else {
                let date = new Date();
                let yyyy = date.getFullYear();
                let MM = date.getMonth() + 1;
                if (MM.toString().length == 1) {
                    var mouth = '0' + MM;
                }
                this.endDate = yyyy + '-' + mouth + '-31';
                this.startDate = yyyy + '-' + mouth + '-01';
            }
            this.positionEchartData();
        },

        // 获取所有行业
        getindustryList() {
            this.$axios.get('admin/industry/list').then((res) => {
                if (res.status == 200) {
                    let datas = res.data;
                    if (datas.code == 200) {
                        this.industryData = datas.data;
                    }
                }
            });
        },
        // 招聘简历的数据
        resumepingtai(value) {
            console.log(value);
            this.valueindustry = value;
            this.resumeJobPie();
        },
        // 招聘简历的品台数据
        resumeJobPie() {
            let datas = {
                industryId: this.valueindustry
            };
            this.$axios.post('admin/job/dataCenter/getAdminResume', datas).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        let dataListss = [];
                        this.educationDataDTOList = data.data.data.educationDataDTOList;
                        data.data.data.educationDataDTOList.forEach(function (val, index) {
                            dataListss[index] = val;
                            dataListss[index].value = val.count;
                            dataListss[index].name = val.education;
                        });
                        this.tableData = data.data.data.resumeDataDTOList;
                        this.job = document.getElementById('resumeDataPie');
                        var jobpie = this.$echarts.init(this.job);
                        jobpie.setOption({
                            title: {
                                text: '招聘简历的平台数据'
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: '{b}:{c}<br />{d}%'
                            },
                            series: [
                                {
                                    type: 'pie',
                                    name: '',
                                    type: 'pie',
                                    radius: '55%',
                                    center: ['50%', '60%'],
                                    data: dataListss
                                }
                            ]
                        });
                    }
                }
            });
        },

        //获取当前月份
        gethouseDateTime() {
            let date = new Date();
            let yyyy = date.getFullYear();
            let MM = date.getMonth() + 1;
            if (MM.toString().length == 1) {
                var mouth = '0' + MM;
            }

            this.houseEndTime = yyyy + '-' + mouth + '-31';
            this.houseStartTime = yyyy + '-' + mouth + '-01';
        },
        // 获取房源时间
        houseDate(value) {
            if (value != null) {
                this.houseEndTime = value + '-31';
                this.houseStartTime = value + '-01';
            } else {
                let date = new Date();
                let yyyy = date.getFullYear();
                let MM = date.getMonth() + 1;
                if (MM.toString().length == 1) {
                    var mouth = '0' + MM;
                }
                this.houseEndTime = yyyy + '-' + mouth + '-31';
                this.houseStartTime = yyyy + '-' + mouth + '-01';
                this.housingechartpar();
            }
        },
        // 获取房源
        gethouseDatalist() {
            let data = {
                company: '',
                houseTitle: '',
                page: 0,
                pushEndDate: 0,
                pushStartDate: 0,
                status: '',
                typeName: ''
            };
            this.$axios.post('admin/renting/manage/search', data).then((res) => {
                // console.log(res);
            });
        },

        // 获取所有的在线房源
        getzaixianFangyuan() {
            this.$axios.get('admin/renting/dataCenter/getAllHouse/' + localStorage.getItem('loginData')).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.fangyuanList = data.data.data;
                    }
                }
            });
        },
        fangyuanchange(value) {
            this.fangyaunid = value;
            this.housingechartpar();
        },
        // 在租房源浏览量及沟通量
        housingechartpar() {
            let data = {
                id: this.fangyaunid,
                endTime: this.houseEndTime,
                startTime: this.houseStartTime
            };
            this.$axios.post('admin/renting/dataCenter/houseDataByMonth', data).then((res) => {
                if (res.status == 200) {
                    let dataList = res.data;
                    if (dataList.code == 200) {
                        let today = [];
                        let connectCount = [];
                        let views = [];
                        this.posdsadasList = dataList.data.data;
                        dataList.data.data.forEach(function (val, index) {
                            console.log();
                            today[index] = val.toDay;
                            connectCount[index] = val.connectCount;
                            views[index] = val.views;
                        });

                        let housimgcahets = document.getElementById('housingecharts');
                        // var resizeMyChartContainer = function () {
                        //     housimgcahets.style.height = window.innerHeight * 0.7 + 'px';
                        //     housimgcahets.style.width = window.innerWidth * 0.8 + 'px';
                        // };
                        // 设置容器高和宽
                        // resizeMyChartContainer();

                        // 基于准备好的dom，初始化echarts实例
                        let myChart = this.$echarts.init(housimgcahets);

                        // 绘制图表
                        myChart.setOption({
                            title: { text: '在租房源浏览量及沟通量' },
                            tooltip: {},
                            xAxis: {
                                // 天数
                                data: today
                            },
                            grid: {
                                top: '15%',
                                right: '2%',
                                left: '3%',
                                bottom: '12%'
                            },
                            yAxis: {},
                            legend: {
                                x: '1380', //水平方向的位置'left'，'center'，'right'
                                y: '50',
                                width: 0, //组件的宽和高
                                height: 0,
                                orient: 'vertical', //组件与文字的排列方式，默认横向，纵向为'vertical'
                                itemGap: 12, //每个图例之间的间隔
                                textStyle: {
                                    //图例文字属性设置
                                    fcolor: '#ffffff',
                                    fontFamily: 'Microsoft YaHei',
                                    ontSize: '16'
                                },
                                tooltip: {
                                    //在legend里的tooltip，在鼠标滑到图例上时，展示自定义的内容
                                    show: true
                                },
                                data: ['浏览量', '沟通量']
                            },
                            series: [
                                {
                                    name: '沟通量',
                                    type: 'bar',
                                    barWidth: 7,
                                    stack: 'one',
                                    color: '#5FA5C1',
                                    data: connectCount
                                },
                                {
                                    name: '浏览量',
                                    type: 'bar',
                                    barWidth: 7,
                                    stack: 'one',
                                    color: '#FFCC48',
                                    data: views
                                }
                            ]
                        });
                    }
                }
            });
        },
        // 租房指标
        queryDataPost() {
            this.$axios.post('admin/renting/dataCenter/houseData').then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.houserdataList = data.data.data;
                    }
                }
            });
        }
    }
};
</script>

<style>
.mydatas {
    box-sizing: border-box;
    padding: 20px;
}

.mydatas .button {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: stretch;
}

.mydatas .button .but {
    width: 90px;
    height: 100%;
    border: 1px solid #c1c1c1;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
}

.mydatas .button .but:hover {
    color: #42a7ff;
    border: 1px solid #42a7ff;
}

.mydatas .button .but.active {
    color: #42a7ff;
    border: 1px solid #42a7ff;
}

.shoppingmall-top {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-content: space-around;
}

.shoppingmall-top .top-text {
    width: 24%;
    height: 180px;
    border-radius: 4px 0px 0px 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

.shoppingmall-top .img {
    width: 100%;
    height: 100%;
}

.shoppingmall-top .top-countNum {
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 80px;
    color: #fff;
    text-align: right;
}

.top-countNum .countNum-top {
    font-size: 36px;
}

.top-countNum .countNum-bottom {
    font-size: 22px;
}

.kehuShoppCount {
    display: flex;
    justify-content: space-between;
    padding: 20px;
}

.kehuShoppCount .kehuCount {
    width: 49%;
}
.kehuShoppCount .el-card__header {
    height: 50px;
    line-height: 15px;
    background-color: #f6f6f7;
    font-size: 14px;
    font-weight: bold;
}
.kehuShoppCount .kehu-card {
    display: flex;
    justify-content: space-between;
}
.kehuShoppCount .el-card__body .text {
    display: flex;
    justify-content: space-between;
}
.kehuShoppCount .shoppingCount {
    width: 49%;
}
.shoppingmall .situationRanking {
    padding: 20px;
    display: flex;
    justify-content: space-between;
}
.situationRanking .SR-Left {
    width: 70%;
    height: 500px;
    display: flex;
    flex-direction: column;
}
.situationRanking .SR-Left .left-top {
    width: 100%;
    display: flex;
    justify-content: space-around;
}
.situationRanking .SR-Left .leftData {
    width: 32%;
}
.situationRanking .SR-Left .el-card__header {
    height: 40px;
    line-height: 0px;
    background-color: #f6f6f7;
    font-size: 14px;
    font-weight: bold;
}
.situationRanking .SR-Left .el-card__body {
    padding: 0;
}
.situationRanking .SR-Left .el-card__body .text {
    display: flex;
}
.SR-Left .el-card__body .text {
    display: flex;
    flex-direction: column;
}
.SR-Left .el-card__body .text .text-item {
    display: flex;
    padding: 0;
    justify-content: space-between;
    border-bottom: 1px solid #f7f7f7;
    padding-left: 5px;
    padding-right: 5px;
    height: 37px;
    line-height: 37px;
}
.SR-Left .el-card__body .text .text-item:nth-child(5) {
    border-bottom: 0;
}
.situationRanking .SR-Left .left-bottom {
    width: 100%;
    display: flex;
    margin-top: 20px;
    justify-content: space-around;
}
.situationRanking .SR-Left .left-bottom .bottom {
    width: 49%;
}
.SR-Left .left-bottom .bottom-left .box-card {
    padding: 40px;
}
.SR-Left .left-bottom .bottom-left .text {
    font-size: 22px;
    color: #aeaeb2;
    display: flex;
    justify-content: space-between;
}
.SR-Left .left-bottom .bottom-left .baifengbi {
    font-size: 48px;
    color: #1890ff;
}
.situationRanking .SR-Left .left-bottom .bottom-right {
    width: 49%;
    display: flex;
    justify-content: space-between;
}
.left-bottom .bottom-right .box-text .text {
    font-size: 22px;
    color: #aeaeb2;
}
.left-bottom .bottom-right .box-text .baifengbi {
    font-size: 48px;
    color: #34c758;
}
.left-bottom .bottom-right .el-card__body {
    display: flex;
    justify-content: space-between;
    padding: 20px;
}
.situationRanking .SR-Right {
    width: 28%;
}
.situationRanking .SR-Right .text {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #e5e5ea;
    line-height: 40px;
}
.situationRanking .SR-Right .text:nth-child(1) {
    border-top: 0;
}
.SR-Right .index {
    width: 20px;
    height: 20px;
    background-color: #c7c7cc;
    color: #fff;
    line-height: 22px;
    text-align: center;
    border-radius: 50%;
}
.SR-Right .text .index1 {
    background-color: #ff3a30;
}
.SR-Right .text .index2 {
    background-color: #ff9502;
}
.SR-Right .text .index3 {
    background-color: #00bb7a;
}
.SR-Right .sole {
    width: 90%;
    display: flex;
    justify-content: space-between;
}
.shoppingmall .orderCount {
    display: flex;
    justify-content: space-between;
    padding: 20px;
}
.shoppingmall .orderCount .orderMarket {
    width: 60%;
    display: flex;
    /* margin-top: 80px; */
    flex-direction: column;
}
.shoppingmall .orderCount .orderMarket .ordermeter {
    width: 100%;
    position: relative;
}
.orderCount .orderMarket .ordermeter .meter {
    position: absolute;
    right: 0px;
    top: 17px;
    z-index: 1;
}
.meter .meterspan {
    margin-left: 10px;
    cursor: pointer;
}
.meter .meterspan:nth-child(3) {
    margin-right: 10px;
}
.meter .el-date-editor {
    width: 136px;
    margin-right: 20px;
}
.shoppingmall .orderCount .orderMarket .Marketmeter {
    width: 100%;
    position: relative;
    margin-top: 40px;
}
.orderCount .orderMarket .meter {
    position: absolute;
    right: 0px;
    top: 17px;
    z-index: 1;
}
.shoppingmall .orderCount .orderforefront {
    width: 40%;
    padding-left: 20px;
    /* margin-top: 80px; */
}
.orderforefront .order-top-a {
    border-bottom: 1px solid #e5e5ea;
    font-size: 16px;
    line-height: 40px;
    font-weight: bolder;
}
.orderforefront .orderLi {
    list-style: none;
    display: flex;
    line-height: 65px;
    justify-content: space-between;
    align-items: center;
}
.orderforefront .orderLi:nth-child(2n) {
    background-color: #e6f5fd;
}
.orderforefront .orderLi .orderIndex {
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    background-color: #9ad1f0;
    color: #fff;
    border-radius: 50%;
}
.orderforefront .orderLi .orderIndex1 {
    background-color: #ff3a30;
}
.orderforefront .orderLi .orderIndex2 {
    background-color: #ff9502;
}
.orderforefront .orderLi .orderIndex3 {
    background-color: #00bb7a;
}
.orderforefront .orderLi .orderText {
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.orderText .orderAmount {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
}
.orderText .orderAmount .progress {
    width: 100%;
    height: 7px;
}
.orderAmount .progress .progress-data {
    width: 100px;
    height: 100%;
    background-color: #0000ff;
    border-radius: 50px;
}
.orderAmount .commit {
    width: 100px;
    margin-left: 10px;
}

/* 招聘数据 */
.recruitment {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
}
.recruitment-top {
    width: 100%;
    height: 200px;
    border: 1px solid #eeeeee;
}
.recruitment-top .indicator {
    height: 40px;
    background-color: #eeeeee;
    font-size: 16px;
    line-height: 40px;
    color: #101010;
}
.recruitment-top .indicator-data {
    display: flex;
    justify-content: space-between;
    height: 160px;
}
.recruitment-top .indicator-data .indicator-list {
    border-right: 1px solid #eeeeee;
    border-top: 1px solid #eeeeee;
    width: 25%;
    height: 100%;
    padding: 30px;
    color: #101010;
}
.recrutment-echarts {
    width: 100%;
    margin-top: 50px;
}
.recrutment-echarts .echarts-select {
    position: relative;
}
.recrutment-echarts .echarts-select .select {
    position: absolute;
    top: 0px;
    left: 220px;
    z-index: 1;
}
.recrutment-echarts .echarts-select .data-picker {
    position: absolute;
    right: 110px;
    z-index: 1;
}
.recruitment .resumeData {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    width: 100%;
}
.resumeData .echartsPie {
    width: 50%;
    height: 300px;
    position: relative;
}

.resumeData .echartsPie .pie-select {
    position: absolute;
    top: 30px;
    z-index: 1;
}
.resumeData .echartstable {
    width: 50%;
    height: 300px;
}
.housing {
    padding: 20px;
    width: 100%;
}
.housingecharts {
    width: 100%;
    height: 300px;
    background: violet;
}
.orderText,
.shoppName {
    width: 100%;
}
.el-card {
    height: 100%;
}
.fugoulv {
    display: flex;
    justify-content: space-between;
}
.fugoulv.el-card {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.fugoulv.el-card .el-card__body {
    width: 100%;
    padding: 0 15%;
    min-height: 250px;
    display: flex;
    align-items: center;
}
</style>
