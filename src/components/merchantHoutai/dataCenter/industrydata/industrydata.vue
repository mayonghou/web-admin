<template>
    <!-- 行业数据 -->
    <div class="industrydata" id="industrydata">
        <el-tag>{{this.indusrtName}}业数据</el-tag>
        <div class="tubiao">
            <el-card class="elCard-time" id="elcardTime">
                <div class="timeCount">
                    <el-date-picker
                        v-model="valueTime"
                        type="month"
                        placeholder="选择日期"
                        value-format="yyyy-MM"
                        @change="timeV"
                    ></el-date-picker>
                </div>
                <div
                    id="myChart"
                    class="myChartsdada"
                    ref="myChart"
                    style="width: 100%; height: 300px;"
					v-show="isShowIndusty"
                ></div>
                <div style="width:100%; text-align:center;" v-show="isShowIndusty == false">
                    <img
                        width="100%"
						src="../../../../assets/img/marketingqianlima/qiushengye(2).png"
                    />
                        <!-- src="../../../../assets/img/marketingqianlima/qiushengye(2).png" -->
                    <p style="font-size:26px;">暂无数据</p>
                </div>
            </el-card>
        </div>
        <div class="dataMerchant">
            <div class="Merchant">
                <el-card>
                    <div class="Merchant-top">{{this.indusrtName}}业商家数据</div>
                    <el-timeline style="margin-top: 20px;">
                        <el-timeline-item class="timeLine1">
                            <div class="xiaoyuerClsdfsd">
                                <div class="yuerClassder"></div>
                                <div class="tiem-text">
                                    <div class="shangjiao"></div>
                                    <div class="text1">
                                        <p
                                            style="font-family: Source Han Sans CN Regular; font-size: 20px; font-weight: Regular;"
                                        >{{this.indusrtName}}业昨日浏览量</p>
                                        <p
                                            style="color: #1DABD1; font-size: 20px;"
                                        >{{this.yesDayViewCount}}</p>
                                    </div>
                                </div>
                            </div>
                        </el-timeline-item>
                        <el-timeline-item class="timeLine2">
                            <div class="xiaoyuerClsdfsd">
                                <div class="yuerClassder"></div>
                                <div class="tiem-text">
                                    <div class="shangjiao"></div>
                                    <div class="text1">
                                        <p
                                            style="font-family: Source Han Sans CN Regular; font-size: 20px; font-weight: Regular;"
                                        >{{this.indusrtName}}业昨日订单量</p>
                                        <p
                                            style="color: #1DABD1; font-size: 20px;"
                                        >{{this.yesDayOrderCount}}</p>
                                    </div>
                                </div>
                            </div>
                        </el-timeline-item>
                        <el-timeline-item class="timeLine3">
                            <div class="xiaoyuerClsdfsd">
                                <div class="yuerClassder"></div>
                                <div class="tiem-text">
                                    <div class="shangjiao"></div>
                                    <div class="text1">
                                        <p
                                            style="font-family: Source Han Sans CN Regular; font-size: 20px; font-weight: Regular;"
                                        >同行业转让商家数据</p>
                                        <p
                                            style="color: #FE4D9A; font-size: 20px;"
                                        >{{this.transferDataCount}}</p>
                                    </div>
                                </div>
                            </div>
                        </el-timeline-item>
                        <el-timeline-item class="timeLine4">
                            <div class="xiaoyuerClsdfsd">
                                <div class="yuerClassder"></div>
                                <div class="tiem-text">
                                    <div class="shangjiao"></div>
                                    <div class="text1">
                                        <p
                                            style="font-family: Source Han Sans CN Regular; font-size: 20px; font-weight: Regular;"
                                        >{{this.indusrtName}}业商家总数</p>
                                        <p
                                            style="color:#F3656C; font-size: 20px;"
                                        >{{this.industryDataCount}}</p>
                                    </div>
                                </div>
                            </div>
                        </el-timeline-item>
                        <el-timeline-item class="timeLine5">
                            <div class="xiaoyuerClsdfsd">
                                <div class="yuerClassder"></div>
                                <div class="tiem-text">
                                    <div class="shangjiao"></div>
                                    <div class="text1">
                                        <p
                                            style="font-family: Source Han Sans CN Regular; font-size: 20px; font-weight: Regular;"
                                        >{{this.indusrtName}}业平台联系次数</p>
                                        <p
                                            style="color: #FFA594; font-size: 20px;"
                                        >{{this.callBusinessCount}}</p>
                                    </div>
                                </div>
                            </div>
                        </el-timeline-item>
                    </el-timeline>
                </el-card>
            </div>
            <div class="sameMerchant">
                <el-card class="sameElCard">
                    <div class="sametop">
                        <div>贵阳市新入驻的同行业商家(近1个月)</div>
                    </div>
                    <el-table :data="tableData" style="width: 100%;">
                        <el-table-column label="企业名称" prop="name" align="center"></el-table-column>
                        <el-table-column label="商家所在区域" prop="address" align="center"></el-table-column>
                        <el-table-column label="浏览量" prop="viewCount" align="center"></el-table-column>
                        <el-table-column label="入驻日期" prop="date" align="center"></el-table-column>
                    </el-table>
                    <el-pagination
                        @prev-click="prev_click"
                        @next-click="next_click"
                        @current-change="current_change"
                        layout="prev, pager, next"
                        :page-size="10"
                        :total="counts"
                    ></el-pagination>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'industrydata',
    data() {
        return {
            valueTime: '',
            tableData: [],
            industyData: false,
            isShowIndusty: false,
            counts: 0,
            page: 1,
            limit: 10,
            myChart: '',
            indusrtName: localStorage.getItem('industryName'),
            callBusinessCount: '', // 平台联系次数
            industryDataCount: '', // 行业商家总数
            transferDataCount: '', //同行业商家转让数据
            yesDayOrderCount: '', //昨日订单量
            yesDayViewCount: '', // 行业昨日浏览量
            dataList: [] //订单量数据
        };
    },
    mounted() {
		let card = document.getElementById('elcardTime');
		let mypie = document.getElementById('myChart');
		mypie.style.width = card.offsetWidth + 'px';
        this.getAdminDataCenterIndustryNewBusiness();
        this.getAdminDataCenterIndustryBusiness();
        let Year = new Date().getFullYear();
        let mouth = new Date().getMonth() + 1;
        this.drawLine(Year + '-' + mouth);
    },
    methods: {
        timeV(value) {
            this.drawLine(value);
        },
        drawLine(value) {
            this.$axios.get('admin/mall/dataCenter/getAdminDataCenterIndustryOrder?dateStr=' + value).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.dataList = data.data;
                        var name = [];
                        var value = [];
                        if (data.data == '') {
                            this.isShowIndusty = false;
                        } else {
                            this.isShowIndusty = true;
                        }
                        data.data.forEach(function (val, index) {
                            name[index] = val.name;
                            value[index] = val.value;
                            // value1[index] = val.value + 2;
                        });
                        if (name == '') {
                            this.industyData = true;
                        }
                        // let myChart = this.$echarts.init(document.getElementById('myChart'));
                        this.myChart = this.$echarts.init(this.$refs.myChart);
                        // 绘制图表
                        this.myChart.setOption({
                            title: {
                                text: localStorage.getItem('industryName') + '业成交单量'
                            },
                            tooltip: {},
                            xAxis: {
                                // data: ["1", "3", "5", "7", "9", "11","13", "15", "18", "21", "23", "25", "27", "29"]
                                data: name
                            },
                            yAxis: {},
                            grid: {
                                left: '1%',
                                bottom: 0,
                                right: '5%',
                                containLabel: true
                            },
                            series: [
                                {
                                    name: '销量',
                                    color: '#358DFF',
                                    type: 'bar',
                                    barWidth: 12,
                                    itemStyle: {
                                        normal: {
                                            barBorderRadius: [12, 12, 0, 0]
                                        }
                                    },
                                    // data: [5, 20, 36, 10, 10, 20,30,40,50,60,90,70]
                                    data: value
                                },
                                {
                                    name: '销量',
                                    type: 'line',
                                    color: '#00EAFF',
                                    data: value
                                }
                            ]
                        });
                    }
                }
            });
        },
        prev_click(e) {
            this.page = e;
            this.getAdminDataCenterIndustryNewBusiness();
        },
        next_click(e) {
            this.page = e;
            this.getAdminDataCenterIndustryNewBusiness();
        },
        current_change(e) {
            this.page = e;
            this.getAdminDataCenterIndustryNewBusiness();
        },
        // 近一个月新入驻的商家
        getAdminDataCenterIndustryNewBusiness() {
            let datas = {
                page: this.page,
                industryId: parseInt(localStorage.getItem('industryId')),
                limit: this.limit
            };
            this.$axios.post('admin/mall/dataCenter/getAdminDataCenterIndustryNewBusiness', datas).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.tableData = data.data;
                        // this.counts = data.
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
            });
        },
        // 商家数据
        getAdminDataCenterIndustryBusiness() {
            this.$axios
                .get('admin/mall/dataCenter/getAdminDataCenterIndustryBusiness')
                .then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.callBusinessCount = data.data.callBusinessCount; // 联系平台次数
                            this.industryDataCount = data.data.industryDataCount; // 行业商家总量
                            this.transferDataCount = data.data.transferDataCount; // 转让商家数量
                            this.yesDayOrderCount = data.data.yesDayOrderCount; // 昨日订单总量
                            this.yesDayViewCount = data.data.yesDayViewCount; // 行业昨日浏览量
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
    }
};
</script>

<style>
.industrydata {
    box-sizing: border-box;
    padding: 20px;
    width: 100%;
    background-color: #f9f9f9;
}
.industrydata .tubiao {
    width: 100%;
}
.dataMerchant {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}
.dataMerchant .Merchant {
    width: 40%;
    height: auto;
}
.dataMerchant .sameMerchant {
    width: 59%;
    height: 300px;
    /* padding: 10px; */
}
.sametop {
    height: 30px;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
}
.sametopright {
    color: #1fb054;
}
.industrydata .el-pagination {
    text-align: center;
    margin-top: 10px;
}
.Merchant-top {
    font-size: 14px;
    font-weight: bolder;
}
.tubiao .elCard-time {
    position: relative;
}
.elCard-time .timeCount {
    position: absolute;
    right: 100px;
    z-index: 1;
}
.timeLine1 .el-timeline-item__node {
    margin-top: 20px;
    background-image: linear-gradient(#1099d0, #41dcd6);
}
.timeLine2 .el-timeline-item__node {
    margin-top: 20px;
    background-image: linear-gradient(#966ffa, #ff4c99);
}
.timeLine3 .el-timeline-item__node {
    margin-top: 20px;
    background-image: linear-gradient(#f3646c, #f6c988);
}
.timeLine4 .el-timeline-item__node {
    margin-top: 20px;
    background-image: linear-gradient(#7956fd, #a5c6fe);
}
.timeLine5 .el-timeline-item__node {
    margin-top: 20px;
    background-image: linear-gradient(#ffab96, #ff0f47);
}
.el-timeline-item__tail {
    margin-top: 20px;
}
.tiem-text {
    width: 80%;
}

.tiem-text .text1 {
    height: 100%;
    width: 95%;
    padding-left: 20px;
    border: 1px solid #e4e4e2;
}

.xiaoyuerClsdfsd {
    display: flex;
    align-items: center;
}
.yuerClassder {
    width: 0;
    height: 0;
    position: relative;
    border-top: 10px solid transparent;
    border-right: 14px solid #e4e4e2;
    border-bottom: 10px solid transparent;
}
.yuerClassder:after {
    content: '';
    position: absolute;
    top: -9px;
    left: 1px;
    border-top: 9px solid transparent;
    border-right: 14px solid #fff;
    border-bottom: 9px solid transparent;
}
.sameMerchant,
.sameElCard {
    min-height: 530px;
}
.myChartsdada div canvas {
    width: 100%;
}
</style>
