<template>
    <!-- 首页 -->
    <div class="indexshouye" id="indexshouye">
        <!-- 头部 -->
        <div class="indextop">
            <ul class="indextopUl">
                <li class="indextopUlLi qingshe">
                    <div>
                        <p style="font-size: 20px;">企业人数(人)</p>
                        <h1>{{this.qiyechangdu}}</h1>
                    </div>
                    <img class="imgmmm" src="../../assets/img/img.jpg" />
                </li>
                <li class="indextopUlLi huangshe">
                    <div>
                        <p style="font-size: 20px;">职位(个)</p>
                        <h1>{{this.zhiweiLengthsdsa}}</h1>
                    </div>
                    <img class="imgmmm" src="../../assets/img/img.jpg" />
                </li>
                <li class="indextopUlLi redShe">
                    <div>
                        <p style="font-size: 20px;">今日订单(单)</p>
                        <h1>{{this.orderTotal}}</h1>
                    </div>
                    <img class="imgmmm" src="../../assets/img/img.jpg" />
                </li>
                <li class="indextopUlLi lvShe">
                    <div>
                        <p style="font-size: 20px;">今日销售额(元)</p>
                        <h1>{{this.saleTotal}}</h1>
                    </div>
                    <img class="imgmmm" src="../../assets/img/img.jpg" />
                </li>
            </ul>
        </div>
        <!-- 统计图和公告 -->
        <div class="StatisticsBulletin">
            <!-- 统计图 -->
            <div class="Statistics">
                <el-card class="box-card">
                    <div class="statisticspar" id="statisticspar"></div>
                </el-card>
            </div>
            <!-- 平台公告 -->
            <div class="Bulletin">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>平台公告</span>
                        <span @click="gonggaoList" class="spanfont">更多 >></span>
                    </div>
                    <div
                        v-for="(item,index) in this.pintaigonggao"
                        :key="index"
                        class="text item"
                        @click="gonggaoxianghqing(item)"
                    >{{ item.title }}</div>
                </el-card>
            </div>
        </div>
        <!-- 公司成员 -->
        <div class="company-staff">
            <el-card class="box-card">
                <el-card class="company-card companyCard">
                    <span>{{this.companyName}}</span>
                </el-card>
                <div class="hengxian">
                    <div class="hengxian-top"></div>
                    <div class="hengxian-zhong"></div>
                    <div class="hengxain-buttom">
                        <div class="buttomxian"></div>
                        <div class="buttomxian"></div>
                        <div class="buttomxian"></div>
                        <div class="buttomxian"></div>
                        <div class="buttomxian"></div>
                    </div>
                </div>
                <div class="company-main">
                    <el-card class="main-card">
                        <div class="card-body">
                            <div class="company-zhiwei">
                                <div class="company-text">
                                    <span
                                        style="font-size: 20px; color: #3D7EFF; display: block;"
                                    >{{this.dataList0.name}}</span>
                                    <div class="positionzhiwei">{{this.dataList0.rank}}</div>
                                </div>
                                <div class="company-img">
                                    <el-avatar
                                        width="100%"
                                        height="100%"
                                        :size="80"
                                        :src="this.dataList0.avatar"
                                    ></el-avatar>
                                </div>
                            </div>
                        </div>
                        <div class="card-buttom">
                            <span class="aabb el-icon-arrow-left"></span>
                            <span class="aabb el-icon-arrow-right"></span>
                        </div>
                    </el-card>
                    <el-card class="main-card">
                        <div class="card-body">
                            <div class="company-zhiwei" v-for="item in dataList1" :key="item.id">
                                <div class="company-text">
                                    <span
                                        style="font-size: 20px; color: #3D7EFF; display: block;"
                                    >{{item.name}}</span>
                                    <div class="positionzhiwei">{{item.rank}}</div>
                                </div>
                                <div class="company-img">
                                    <el-avatar
                                        width="100%"
                                        :size="80"
                                        height="100%"
                                        :src="item.avatar"
                                    ></el-avatar>
                                </div>
                            </div>
                        </div>
                        <div class="card-buttom">
                            <span class="aabb el-icon-arrow-left"></span>
                            <span class="aabb el-icon-arrow-right"></span>
                        </div>
                    </el-card>
                    <el-card class="main-card">
                        <div class="card-body">
                            <div class="company-zhiwei" v-for="item in dataList2" :key="item.id">
                                <div class="company-text">
                                    <span
                                        style="font-size: 20px; color: #3D7EFF; display: block;"
                                    >{{item.name}}</span>
                                    <div class="positionzhiwei">{{item.rank}}</div>
                                </div>
                                <div class="company-img">
                                    <el-avatar
                                        width="100%"
                                        :size="80"
                                        height="100%"
                                        :src="item.avatar"
                                    ></el-avatar>
                                </div>
                            </div>
                        </div>
                        <div class="card-buttom">
                            <span class="aabb el-icon-arrow-left"></span>
                            <span class="aabb el-icon-arrow-right"></span>
                        </div>
                    </el-card>
                    <el-card class="main-card">
                        <div class="card-body">
                            <div class="company-zhiwei" v-for="item in dataList3" :key="item.id">
                                <div class="company-text">
                                    <span
                                        style="font-size: 20px; color: #3D7EFF; display: block;"
                                    >{{item.name}}</span>
                                    <div class="positionzhiwei">{{item.rank}}</div>
                                </div>
                                <div class="company-img">
                                    <el-avatar
                                        width="100%"
                                        :size="80"
                                        height="100%"
                                        :src="item.avatar"
                                    ></el-avatar>
                                </div>
                            </div>
                        </div>
                        <div class="card-buttom">
                            <span class="aabb el-icon-arrow-left"></span>
                            <span class="aabb el-icon-arrow-right"></span>
                        </div>
                    </el-card>
                    <el-card class="main-card">
                        <div class="card-body">
                            <div class="company-zhiwei" v-for="item in dataList4" :key="item.id">
                                <div class="company-text">
                                    <span
                                        style="font-size: 20px; color: #3D7EFF; display: block;"
                                    >{{item.name}}</span>
                                    <div class="positionzhiwei">{{item.rank}}</div>
                                </div>
                                <div class="company-img">
                                    <img width="100%" height="100%" :src="item.avatar" />
                                </div>
                            </div>
                        </div>
                        <div class="card-buttom">
                            <span class="aabb el-icon-arrow-left"></span>
                            <span class="aabb el-icon-arrow-right"></span>
                        </div>
                    </el-card>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'indexshouye',
    data() {
        return {
            statPar: '',
            zhiweiLengthsdsa: 0,
            qiyechangdu: 0,
            pintaigonggao: [],
            orderTotal: 0,
            saleTotal: 0,
            companyName: '',
            dataList0: [],
            dataList1: [],
            dataList2: [],
            dataList3: [],
            dataList4: []
        };
    },
    mounted() {
        this.statisticsparData();
        this.getpintaigonggao();
        this.getposition();
        this.getCountsData();
    },
    methods: {
        //今日订单和今日销售额
        getCountsData() {
            this.$axios.get('admin/mall/queryPageHeaderData').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.orderTotal = data.data.orderTotal;
                        this.saleTotal = data.data.saleTotal / 100;
                    }
                }
            });
        },
        // 统计图
        statisticsparData() {
            this.$axios.get('admin/company/teams?page=1' + '&companyId=' + localStorage.getItem('loginData') + '&limit=-1').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.dataList0 = data.data[0];
                        var https = /^https:\/\/.+$/;
                        if (https.test(data.data[0])) {
                            this.dataList0.avatar = data.data[0].avatar;
                        } else {
                            this.dataList0.avatar = localStorage.getItem('imgUrl') + data.data[0].avatar;
                        }
                        let dataList1a = [];
                        data.data.slice(1, 5).forEach(function (val, index) {
                            dataList1a[index] = val;
                            if (https.test(val.avatar)) {
                                dataList1a[index].avatars = val.avatar;
                            } else {
                                dataList1a[index].avatars = localStorage.getItem('imgUrl') + val.avatar;
                            }
                        });
                        this.dataList1 = dataList1a;
                        let dataList1b = [];
                        data.data.slice(5, 10).forEach(function (val, index) {
                            dataList1b[index] = val;
                            if (https.test(val.avatar)) {
                                dataList1b[index].avatars = val.avatar;
                            } else {
                                dataList1b[index].avatars = localStorage.getItem('imgUrl') + val.avatar;
                            }
                        });
                        this.dataList2 = dataList1b;
                        let dataList1c = [];
                        data.data.slice(10, 15).forEach(function (val, index) {
                            dataList1c[index] = val;
                            if (https.test(val.avatar)) {
                                dataList1c[index].avatars = val.avatar;
                            } else {
                                dataList1c[index].avatars = localStorage.getItem('imgUrl') + val.avatar;
                            }
                        });
                        this.dataList3 = dataList1c;
                        let dataList1d = [];
                        data.data.slice(15, 20).forEach(function (val, index) {
                            dataList1d[index] = val;
                            if (https.test(val.avatar)) {
                                dataList1d[index].avatars = val.avatar;
                            } else {
                                dataList1d[index].avatars = localStorage.getItem('imgUrl') + val.avatar;
                            }
                        });
                        this.dataList4 = dataList1d;
                        this.companyName = data.data[0].companyName;
                        this.qiyechangdu = data.data.length;
                        var genders = [];
                        var nan = [];
                        var nv = [];
                        data.data.forEach(function (val, index) {
                            if (val.gender == '保密') {
                                genders.push(val.gender);
                            } else if (val.gender == '男') {
                                nan.push(val.gender);
                            } else {
                                nv.push(val.gender);
                            }
                        });
                        this.statPar = document.getElementById('statisticspar');
                        var staticpar = this.$echarts.init(this.statPar);
                        staticpar.setOption({
                            title: {
                                text: '员工人数占比%'
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: '{b}:{c}<br />{d}%'
                            },
                            legend: {
                                orient: 'value',
                                left: 'right',
                                y: '30%',

                                data: ['男', '女', '保密']
                            },
                            series: [
                                {
                                    name: '面积模式',
                                    type: 'pie',
                                    radius: [50, 100],
                                    center: ['35%', '50%'],
                                    roseType: 'area',
                                    trigger: 'item',
                                    data: [
                                        { value: nan.length, name: '男' },
                                        { value: nv.length, name: '女' },
                                        { value: genders.length, name: '保密' }
                                    ]
                                    // data: gender
                                }
                            ]
                        });
                    }
                }
            });
        },
        //平台公告
        getpintaigonggao() {
            let datss = { page: 1 };
            this.$axios.post('admin/platform/list', datss).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.pintaigonggao = data.data.dataList;
                    }
                }
            });
        },
        // 平台公告列表页
        gonggaoList() {},
        // 跳转到平台公告详情
        gonggaoxianghqing(item) {
            localStorage.setItem('pingtaiId', item.id);
            this.$router.push({
                path: './pintaigonggaodetail',
                params: {
                    id: item.id || localStorage.getItem('pingtaiId')
                }
            });
        },
        // 查询所有职位
        getposition() {
            this.$axios
                .get('admin/company/positions?limit=-1' + '&companyId=' + localStorage.getItem('loginData') + '&page=1')
                .then((res) => {
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.code == 200) {
                            this.zhiweiLengthsdsa = data.data.length;
                        }
                    }
                });
        }
    }
};
</script>

<style>
.indexshouye {
    box-sizing: border-box;
    width: 100%;
    padding: 20px;
    background-color: #f1f2f7;
}
.indextop .indextopUl {
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.indextop .indextopUl .indextopUlLi {
    list-style: none;
    width: 23%;
    height: 150px;
    padding: 0 40px;
    border-radius: 8px 0 0 8px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.indextopUlLi .imgmmm {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.StatisticsBulletin {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding: 0 20px;
}
.StatisticsBulletin .Statistics {
    width: 49%;
}
.Statistics .statisticspar {
    width: 80%;
    height: 300px;
}

.StatisticsBulletin .Statistics .echarts {
    width: 100%;
    height: 400px;
}

.StatisticsBulletin .Bulletin {
    width: 49%;
    font-size: 18px;
    line-height: 30px;
    height: 340px;
    overflow: hidden;
}
.StatisticsBulletin .Bulletin .el-card__header .clearfix {
    display: flex;
    justify-content: space-between;
}
.Bulletin .el-card__header .spanfont {
    font-size: 18px;
    color: #888f97;
    cursor: pointer;
}
.Bulletin .el-card__body {
    height: 339px;
}
.Bulletin .el-card__body .text {
    cursor: pointer;
}
.company-staff {
    margin-top: 20px;
}
.company-staff .company-card {
    width: 40%;
    margin: 0 auto;
}
.company-staff .company-card.companyCard .el-card__body {
    height: 50px;
    padding: 0;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
}
.hengxian {
    width: 80%;
    margin: 0 auto;
}
.hengxian .hengxian-top {
    width: 2px;
    height: 40px;
    background-color: #4f6cfe;
    margin: 0 auto;
}
.hengxian .hengxian-zhong {
    width: 100%;
    border-bottom: 2px solid #0000ff;
}
.hengxian .hengxain-buttom {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
}
.hengxain-buttom .buttomxian {
    width: 2px;
    height: 100%;
    background-color: #0000ff;
}

.company-main {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.company-main .main-card {
    width: 18%;
    height: 473px;
}
.card-body {
    width: 100%;
    height: 400px;
    overflow: hidden;
}
.company-zhiwei {
    width: 100%;
    height: 70px;
    margin: 0 auto;
    position: relative;
    margin-top: 30px;
}
.company-zhiwei:nth-child(1) {
    margin-top: 0;
}
.company-zhiwei .company-img {
    width: 30%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    left: 0;
}
.company-zhiwei .company-img img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.company-zhiwei .company-text {
    width: 100%;
    height: 90%;
    background-color: #f6f7fc;
    border-radius: 50px;
    position: absolute;
    right: 0;
    top: 5px;
    padding: 2px;
    padding-left: 50%;
}
.positionzhiwei {
    width: 80px;
    height: 23px;
    background-color: #f5a470;
    text-align: center;
    font-size: 14px;
    line-height: 23px;
    border-radius: 50px;
    margin-top: 3px;
}

.main-card .card-buttom {
    width: 60%;
    margin: 0 auto;
    height: 30px;
    padding-left: 15px;
}
.main-card .card-buttom .aabb {
    display: inline-block;
    background-color: #f1f2f7;
    color: #c1c1c1;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 23px;
    cursor: pointer;
    margin-left: 10px;
}
.main-card .card-buttom .aabb:nth-child(2) {
    margin-left: 20px;
}
</style>
