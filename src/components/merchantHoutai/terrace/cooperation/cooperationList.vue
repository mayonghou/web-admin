<template>
    <div class="cooperationList" id="cooperationList">
        <div class="header_Top">
            <div class>
                <label>企业查询</label>
            </div>
            <div class="top_search">
                <el-input class="search" v-model="value" placeholder="输入企业名称、法人"></el-input>
                <i
                    style="font-size: 22px;color: #2494D2;margin-left: 30px; padding-right: 38px;padding-top: 5px;"
                    class="el-icon-date"
                ></i>
                <el-date-picker
                    prefix-icon="md-date_range"
                    value-format="yyyy-MM-dd"
                    v-model="timess"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="Datefunct"
                ></el-date-picker>
                <el-button @click="chanpinCX" class="button">查询</el-button>
            </div>
        </div>
        <div class="label-button">
            <div class="label">
                <label>{{this.names}}</label>
            </div>
            <div class="tab-button">
                <el-badge :value="valueNum" class="badgebut">
                    <el-button @click="cooperation" class="button">合作申请</el-button>
                </el-badge>
                <el-button @click="addCoopera" class="button">添加合作企业</el-button>
            </div>
        </div>
        <!-- 表格 -->
        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column prop="name" label="企业名称" align="center"></el-table-column>
            <el-table-column prop="legal" label="法人姓名" align="center"></el-table-column>
            <el-table-column prop="serverPhone" label="手机号码" align="center"></el-table-column>
            <el-table-column prop="time" label="达成合作时间" align="center"></el-table-column>
            <el-table-column label="操作" width="250" align="center">
                <template slot-scope="scope">
                    <el-button @click="lookData(scope.row)" class="tab_oragel button">查看数据</el-button>
                    <el-button @click="jiechuhezuo(scope.row)" class="tab_red button">解除合作</el-button>
                </template>
            </el-table-column>
        </el-table>
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
        <!-- 合作申请 -->
        <el-dialog
            title="合作申请"
            :show-close="showClose"
            :visible.sync="dialogVisibleCooperation"
            width="70%"
        >
            <div class="iconEn" @click="enlarge">
                <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                    <i class="iconfont icon-quanping"></i>
                </el-tooltip>
            </div>
            <el-table :data="hezuosqtable" border style="width: 100%; background: #F5F9F1;">
                <el-table-column prop="name" label="企业名称" width="250" align="center"></el-table-column>
                <el-table-column prop="legal" label="法人姓名" align="center"></el-table-column>
                <el-table-column prop="serverPhone" label="手机号码" width align="center"></el-table-column>
                <el-table-column prop="industry" label="所属行业" align="center"></el-table-column>
                <el-table-column prop="status" label="申请类型" align="center">
                    <template slot-scope="scope">
                        <label>{{scope.row.status == 0?'申请合作':'解除合作'}}</label>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button @click="tongyi(scope.row)" class="tab_green button">同意</el-button>
                        <el-button @click="jujue(scope.row)" class="tab_red button">拒绝</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <span class="dialog-footer">
                <el-button class="button" @click="dialogVisibleCooperation = false">返 回</el-button>
            </span>
        </el-dialog>

        <!-- 添加合作企业 -->
        <el-dialog title="添加合作企业" :visible.sync="dialogVisibleAddCooper" width="70%">
            <div class="iconEn" @click="enlarge">
                <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                    <i class="iconfont icon-quanping"></i>
                </el-tooltip>
            </div>
            <div class="dialogSearch">
                <el-input v-model="valueDialog" class="dasdasd" placeholder="搜索企业、法人"></el-input>
                <el-button class="el-icon-search" @click="searchBtn" type="text">搜索企业</el-button>
            </div>
            <el-table
                :data="tinajiaqiye"
                v-show="this.tinajiaqiye != ''"
                border
                style="width: 100%; background: #F5F9F1;"
            >
                <el-table-column prop="name" label="企业名称" align="center"></el-table-column>
                <el-table-column prop="legal" label="法人姓名" align="center"></el-table-column>
                <el-table-column prop="serverPhone" label="手机号码" align="center"></el-table-column>
                <el-table-column prop="industry" label="所属行业" align="center"></el-table-column>
                <el-table-column prop="businessType" label="企业类型" align="center"></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button @click="hezuoshengqing(scope.row)" class="tab_green button">合作申请</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="recommend" v-if="this.recommend != ''">
                <div style="font-size: 20px; font-weight: bold;">平台推荐:</div>
                <el-row>
                    <el-col :span="6" v-for="(item,index) in this.recommend" :key="index">
                        <div class="grid-content bg-purple">
                            <div class="recommend-detail">
                                <img class="logo" :src="item.logoUrl" />
                                <span class="companyName">{{item.name}}</span>
                            </div>
                            <el-button @click="recommendHezuo(item)" class="recommendBtn">申请合作</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <span class="dialog-footer">
                <el-button class="button" @click="dialogVisibleAddCooper = false">返 回</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'cooperationList',
    data() {
        return {
            value: '',
            valueDialog: '',
            timess: '',
            valueNum: this.valueNum,
            fullscreen: '',
            counts: this.counts,
            page: 1,
            limit: 10,
            showClose: false,
            dialogVisibleCooperation: false,
            dialogVisibleAddCooper: false,
            tableData: [],
            table: [],
            tinajiaqiye: [],
            hezuosqtable: [],
            names: '',
            times: '',
            times2: '',
            recommend: []
        };
    },
    mounted() {
        this.TeamworkList();
    },
    methods: {
        // 合作申请 弹框
        cooperation() {
            let companyId = localStorage.getItem('loginData');
            this.$axios.get('admin/company/apply/list?companyId=' + companyId).then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        var list = [];
                        data.data.forEach(function (val, index) {
                            list[index] = val;
                            list[index].legal = val.company.legal;
                            list[index].name = val.company.name;
                            list[index].industry = val.company.industry;
                            list[index].serverPhone = val.company.serverPhone;
                            list[index].serverPhone = val.company.serverPhone;
                            list[index].status = val.status;
                        });
                        this.hezuosqtable = list;
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
                        message: data.msg,
                        type: 'error'
                    });
                }
            });
            this.dialogVisibleCooperation = true;
        },
        // 同意申请
        tongyi(row) {
            this.$confirm('是否确定与【' + row.name + '】公司进行合作?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: '同意中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios.get('admin/company/apply/audit?id=' + row.id + '&flag=' + true).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.TeamworkList();
                            this.cooperation();
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
                            message: data.msg,
                            type: 'error'
                        });
                    }
                });
            });
        },
        // 拒绝合作
        jujue(row) {
            this.$confirm('是否确定拒绝与【' + row.name + '】公司进行合作?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: '拒绝中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios.get('admin/company/apply/audit?id=' + row.id + '&flag=' + false).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.TeamworkList();
                            this.cooperation();
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
                            message: data.msg,
                            type: 'error'
                        });
                    }
                });
            });
        },
        // 添加合作企业搜索
        searchBtn() {
            this.$axios.get('admin/company/partner/search?name=' + this.valueDialog).then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        var hezuoqiye = [];
                        var businessText = '';
                        data.data.search.forEach(function (val, index) {
                            hezuoqiye[index] = val;
                            switch (val.businessType) {
                                case 0:
                                    businessText = '企业单位';
                                    break;
                                case 1:
                                    businessText = '事业单位';
                                    break;
                                case 2:
                                    businessText = '社会团体';
                                    break;
                                case 3:
                                    businessText = '个体经营';
                                    break;
                                case 4:
                                    businessText = '其他';
                                    break;
                            }
                            hezuoqiye[index].businessType = businessText;
                        });
                        this.tinajiaqiye = hezuoqiye;
                        this.recommend;
                        let recommendList = [];
                        var https = /^(https):\/\/.+$/;
                        data.data.recommend.forEach(function (val, index) {
                            recommendList[index] = val;
                            if (https.test(val.logoUrl)) {
                                recommendList[index].logoUrl = val.logoUrl;
                            } else {
                                recommendList[index].logoUrl = localStorage.getItem('imgUrl') + val.logoUrl;
                            }
                        });
                        this.recommend = recommendList;
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
                        message: data.msg,
                        type: 'error'
                    });
                }
            });
        },
        // 添加合作企业
        addCoopera() {
            this.dialogVisibleAddCooper = true;
        },
        // 添加企业合作的申请合作
        hezuoshengqing(row) {
            this.$confirm('是否确定申请与【' + row.name + '】公司进行合作?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    const loading = this.$loading({
                        lock: true,
                        text: '申请中...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.$axios
                        .get(
                            'admin/company/apply/info?companyId=' +
                                localStorage.getItem('loginData') +
                                '&flag=' +
                                true +
                                '&partnerId=' +
                                row.id
                        )
                        .then((res) => {
                            loading.close();
                            if (res.status == 200) {
                                var data = res.data;
                                if (data.code == 200) {
                                    this.$message({
                                        showClose: true,
                                        message: data.msg,
                                        type: 'success'
                                    });
                                    this.dialogVisibleAddCooper = false;
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
                                    message: data.msg,
                                    type: 'error'
                                });
                            }
                        });
                })
                .catch((res) => {});
        },
        // 平台推荐的企业进行合作
        recommendHezuo(item) {
            this.$confirm('是否确定申请与【' + item.name + '】公司进行合作?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    const loading = this.$loading({
                        lock: true,
                        text: '申请中...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.$axios
                        .get(
                            'admin/company/apply/info?companyId=' +
                                localStorage.getItem('loginData') +
                                '&flag=' +
                                true +
                                '&partnerId=' +
                                item.id
                        )
                        .then((res) => {
                            loading.close();
                            if (res.status == 200) {
                                var data = res.data;
                                if (data.code == 200) {
                                    this.$message({
                                        showClose: true,
                                        message: data.msg,
                                        type: 'success'
                                    });
                                    this.dialogVisibleAddCooper = false;
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
                                    message: data.msg,
                                    type: 'error'
                                });
                            }
                        });
                })
                .catch((res) => {});
        },
        // 全屏事件
        enlarge() {},

        // 页码
        handleSizeChange(val) {
            this.limit = val;
            this.TeamworkList();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.TeamworkList();
        },
        // 查看数据
        lookData(row) {
            this.$router.push({
                path: './lookduibiList',
                query: {
                    id: row.id
                }
            });
        },
        // 解除合作
        jiechuhezuo(row) {
            this.$confirm('是否确定解除【' + row.name + '】公司的合作信息?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    const loading = this.$loading({
                        lock: true,
                        text: '解除中...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.$axios
                        .get(
                            'admin/company/apply/info?companyId=' +
                                localStorage.getItem('loginData') +
                                '&flag=' +
                                false +
                                '&partnerId=' +
                                row.id
                        )
                        .then((res) => {
                            loading.close();
                            if (res.status == 200) {
                                var data = res.data;
                                if (data.code == 200) {
                                    this.$message({
                                        showClose: true,
                                        message: data.msg,
                                        type: 'success'
                                    });
                                    this.TeamworkList();
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
                                    message: data.msg,
                                    type: 'error'
                                });
                            }
                        });
                })
                .catch((err) => {});
        },
        // 查询按钮
        chanpinCX() {
            this.TeamworkList();
            this.page = 1;
        },
        // 时间戳转化
        Datefunct(value) {
            if (value != null) {
                var startTime = value[0];
                var d = new Date(startTime);
                let start = d.getTime(d);
                this.times = start;
                var endTime = value[1];
                var end = new Date(endTime);
                let endT = end.getTime(end);
                this.times2 = endT;
            } else {
                this.times = '';
                this.times2 = '';
            }
        },
        // 查询企业合作列表
        TeamworkList() {
            let beginTime = this.times;
            let endTime = this.times2;
            let companyId = localStorage.getItem('loginData');
            let date =
                '?beginTime=' +
                beginTime +
                '&endTime=' +
                endTime +
                '&companyId=' +
                companyId +
                '&name=' +
                this.value +
                '&page=' +
                this.page +
                '&limit=' +
                this.limit;
            this.$axios.get('admin/company/teamwork/list' + date).then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        var dataList = [];
                        data.data.forEach(function (val, index) {
                            dataList[index] = val.company;
                            dataList[index].myAdvocacy = val.company.myAdvocacy;
                            dataList[index].otherAdvocacy = val.company.otherAdvocacy;
                            var dateT = new Date(val.time);
                            var times =
                                dateT.getFullYear() +
                                '-' +
                                (dateT.getMonth() + 1 < 10 ? '0' + (dateT.getMonth() + 1) : dateT.getMonth() + 1) +
                                '-' +
                                dateT.getDate();
                            dataList[index].time = times;
                        });
                        this.tableData = dataList;
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
                        message: data.msg,
                        type: 'error'
                    });
                }
            });
        }
    }
};
</script>

<style>
.el-link {
    color: #0000ff;
    cursor: pointer;
}

.cooperationList {
    width: 100%;
    font-size: 14px;
    box-sizing: border-box;
    padding: 20px;
}

.header_Top {
    width: 100%;
    height: 114px;
    background-color: #fafbfa;
    margin-top: 20px;
    padding: 10px 20px;
}

.top_search .search {
    width: 200px;
    height: 31px;
}

.top_search .button {
    width: 151px;
    height: 30px;
    font-size: 14px;
    background: #2450d2;
    color: #ffffff;
    border-radius: 30px;
    margin-left: 39px;
    padding: 0;
}

.label-button {
    width: 100%;
    height: 51px;
    line-height: 50px;
    background-color: #fff;
}

.label-button .label {
    float: left;
    font-size: 14px;
}

.label-button .tab-button {
    float: right;
}

.tab-button .button {
    width: 104px;
    height: 30px;
    margin-left: 15px;
    background: #2482d2;
    color: #fff;
}

.el-badge__content.is-fixed {
    top: 10px;
}

.el-table .button {
    width: 66px;
    height: 30px;
    font-size: 14px;
    color: #fff;
    padding: 0px;
    font-size: 12px;
}

.el-table .tab_oragel {
    background: #ff8d00;
}

.el-table .tab_green {
    background: #109955;
}

.el-table .tab_red {
    background: #ff0000;
}

.pagintion {
    /* padding-top: 20px;
		padding-left: 25%; */
    background-color: #fff;
}

.el-dialog {
    position: relative;
}

.el-dialog__header {
    background-color: #f5f9f1;
    border: 1px solid #f5f9f1;
}

.iconEn {
    top: 20px;
    font-size: 12px;
    right: 60px;
    position: absolute;
}

.dialog-footer {
    width: 100%;
    margin-left: 42%;
}

.dialog-footer .button {
    width: 151px;
    height: 30px;
    background: #2450d2;
    color: #ffffff;
    border-radius: 8px;
    margin-top: 30px;
}

.dialogSearch {
    width: 100%;
    height: 80px;
    text-align: center;
}
.dialogSearch .dasdasd {
    width: 300px;
}

.dialogSearch .search {
    width: 260px;
    height: 41px;
    float: left;
    margin-left: 25%;
}

.search-but {
    float: left;
    margin-left: 10px;
    color: #2450d2;
    font-size: 12px;
}
.recommend {
    margin-top: 30px;
}
.recommend-detail {
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.logo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.companyName {
    font-size: 18px;
}
.grid-content .recommendBtn {
    width: 100px;
    margin-top: 5px;
    height: 30px;
    background-color: #2450d2;
    color: #fff;
}
.grid-content {
    text-align: center;
    margin-top: 10px;
    margin-left: 10px;
    padding: 5px;
    border: 1px solid #c1c1c1;
}
</style>
