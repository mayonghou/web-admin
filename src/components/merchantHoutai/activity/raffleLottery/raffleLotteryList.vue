<template>
    <div id="activityList" class="activityList">
        <div class="activit-top">
            <div class="activit-label">
                <label>抽奖活动查询</label>
            </div>
            <div class="activit-search">
                <el-input class="activit-S" v-model="activitSeach" placeholder="请输入活动关键字"></el-input>
                <i
                    style="font-size: 22px; color: #2494d2; margin-left: 20px; margin-right: 20px"
                    class="el-icon-date"
                ></i>
                <el-date-picker
                    prefix-icon="md-date_range"
                    v-model="time"
                    type="daterange"
                    unlink-panels
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    @change="templateTime"
                ></el-date-picker>
                <el-button @click="activitQuery" class="query">查询</el-button>
            </div>
        </div>
        <div class="activit-add">
            <el-button @click="activitAdd" class="btn">发布抽奖活动</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column type="index" prop="order" label="序号" width align="center"></el-table-column>
            <el-table-column prop="title" label="活动标题" align="center" width></el-table-column>
            <el-table-column prop="publisher" label="发布人" align="center" width></el-table-column>
            <el-table-column prop="chanceNumPerDay" label="每日抽奖的机会" align="center" width></el-table-column>
            <el-table-column prop="winRate" label="总中奖概率" align="center" width>
                <template slot-scope="scope">
                    <label style>{{ scope.row.winRate}}%</label>
                </template>
            </el-table-column>
            <el-table-column prop="num" label="活动奖品" align="center">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        @click="choujiangNum(scope.row)"
                        style="color: #2494d2"
                    >{{ scope.row.num }}个</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="time" label="发布时间" width="180" align="center"></el-table-column>
            <el-table-column label="操作" width="250" align="center">
                <template slot-scope="scope">
                    <el-button @click="lookdetail(scope.row)" class="lookvideo">查看详情</el-button>
                    <el-button @click="xiajiaActivit(scope.row)" class="xiajiaActivit">下架</el-button>
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

        <el-dialog title="抽奖商品列表" :visible.sync="dialogVisibleraffLery" width="80%">
            <div class="iconEnlorder" @click="enlarge">
                <el-tooltip effect="dark" :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom">
                    <i class="iconfont icon-quanping"></i>
                </el-tooltip>
            </div>
            <el-table :data="shoppList" border style="width: 100%;">
                <el-table-column type="index" label="序号" align="center"></el-table-column>
                <el-table-column prop="prizeName" label="奖项名称" align="center"></el-table-column>
                <el-table-column prop="prizeLevel" label="奖项等级" align="center"></el-table-column>
                <el-table-column prop="prizeNum" label="奖品发行数量" align="center"></el-table-column>
                <!-- <el-table-column prop="prizeType" label="奖品类型" align="center"> </el-table-column> -->
                <el-table-column prop="couponType" label="优惠券类型" align="center"></el-table-column>
                <el-table-column prop="prizeCountLeft" label="奖品剩余数量" align="center"></el-table-column>
            </el-table>
            <el-pagination
                class="pagintion"
                @size-change="hashoppndleSizeChange"
                @current-change="shopphandleCurrentChange"
                :current-page="shopppage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="shoppLimit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="shoppcounts"
            ></el-pagination>
        </el-dialog>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            dialogVisibleraffLery: false,
            fullscreen: '',
            activitSeach: '',
            time: '',
            startTime: '',
            endTime: '',
            tableData: [],
            shoppList: [],
            page: 1,
            limit: 10,
            counts: this.counts || 1,
            shopppage: 1,
            shoppLimit: 10,
            shoppcounts: this.shoppcounts || 1
        };
    },
    mounted() {
        this.getLotteryList();
    },
    methods: {
        // 抽奖商品的商品
        choujiangNum(row) {
            this.dialogVisibleraffLery = true;
            var tableList = [];
            row.prizeItemList.forEach(function (val, index) {
                tableList[index] = val;
                tableList[index].productCover = localStorage.getItem('imgUrl') + val.productCover;
                tableList[index].prizeType = val.prizeType == 1 ? '优惠券' : '';
                tableList[index].couponType = val.couponType == 1 ? '满减卷' : '代金卷';
            });
            this.shoppList = tableList;
            this.shoppcounts = tableList.length;
        },
        hashoppndleSizeChange(val) {
            this.limit = val;
        },
        shopphandleCurrentChange(val) {
            this.page = val;
        },
        enlarge() {},
        // 时间戳
        templateTime() {
            var date = new Date(this.time[0]);
            var start = date.getTime(date);
            this.startTime = start;
            var date1 = new Date(this.time[1]);
            var end = date1.getTime(date1);
            this.endTime = end;
        },
        // 活动查询
        activitQuery() {
            this.page = 1;
            this.getLotteryList();
        },
        // 查看详情
        lookdetail(row) {
            this.$router.push({
                path: './detailRaffleLottery',
                query: {
                    data: row
                }
            });
        },
        // 下架活动
        xiajiaActivit(row) {
            this.$confirm('是否确定将标题为【' + row.title + '】的抽奖活动下架?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: '下架中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let data = {
                    activityId: row.id,
                    activityType: 3,
                    newStatus: 2
                };
                this.$axios.put('admin/company/activity/all/update_status', data).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.getLotteryList();
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
        // 发布按钮
        activitAdd() {
            this.$router.push({
                path: './addraffleLottery'
            });
        },
        // 页码
        handleSizeChange(val) {
            this.limit = val;
            this.getLotteryList();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getLotteryList();
        },
        getLotteryList() {
            let data = {
                activityTitleLike: this.activitSeach,
                companyId: parseInt(localStorage.getItem('loginData')),
                limit: this.limit,
                page: this.page,
                status: 1,
                timeStart: this.startTime || 0,
                timeEnd: this.timeEnd || 0
            };
            this.$axios.post('admin/company/activity/lottery/list', data).then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        var tabList = [];
                        var datetime1 = '';
                        var datetime2 = '';
                        data.list.forEach(function (val, index) {
                            tabList[index] = val;
                            datetime1 = val.startTime;
                            datetime2 = val.endTime;
                            var date = new Date(datetime1);
                            var time1 =
                                date.getFullYear() +
                                '-' +
                                (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                                '-' +
                                date.getDate();

                            var date1 = new Date(datetime2);
                            var time2 =
                                date1.getFullYear() +
                                '-' +
                                (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() + 1) +
                                '-' +
                                date1.getDate();
                            tabList[index].time = time1 + ' ---- ' + time2;
                            tabList[index].num = val.prizeItemList.length;
                        });
                        this.tableData = tabList;
                        this.counts = data.total;
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
.activityList {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    font-size: 14px;
}
.activit-top {
    width: 100%;
    height: 114px;
    background-color: #fafbfa;
    padding-left: 20px;
}
.activit-top .activit-label {
    padding-top: 10px;
}
.activit-search {
    margin-top: 13px;
}
.activit-search .activit-S {
    width: 200px;
}
.activit-search .query {
    width: 150px;
    height: 30px;
    background-color: #2450d2;
    color: #fff;
    padding: 0;
    border-radius: 8px;
    margin-left: 20px;
}
.activityList .activit-add {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: right;
}
.activit-add .btn {
    width: 104px;
    height: 30px;
    background-color: #2482d2;
    color: #fff;
    padding: 0;
    border-radius: 8px;
}

.el-table .lookvideo {
    width: 63px;
    height: 30px;
    padding: 0;
    background-color: #2450d2;
    color: #fff;
    border-radius: 8px;
}
.el-table .xiajiaActivit {
    width: 63px;
    height: 30px;
    padding: 0;
    background-color: #ff8d00;
    color: #fff;
    border-radius: 8px;
}
.el-input__inner {
    height: 30px;
    line-height: 30px;
}
.el-date-editor .el-range-separator {
    line-height: 24px;
}
</style>
