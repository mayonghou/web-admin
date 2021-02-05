<template>
    <div id="activityList" class="activityList">
        <div class="activit-top">
            <div class="activit-label">
                <label>限时抢购活动查询</label>
            </div>
            <div class="activit-search">
                <el-input class="activit-S" v-model="activitSeach" placeholder="请输入活动关键字"></el-input>
                <i
                    style="font-size: 22px;color: #2494D2;margin-left: 20px; margin-right: 20px;"
                    class="el-icon-date"
                ></i>
                <el-date-picker
                    prefix-icon="md-date_range"
                    v-model="time"
                    type="daterange"
                    unlink-panels
                    tart-placeholder="开始日期"
                    end-placeholder="结束日期"
                    alue-format="yyyy-MM-dd"
                    @change="templateTime"
                ></el-date-picker>
                <el-button @click="activitQuery" class="query">查询</el-button>
            </div>
        </div>
        <div class="activit-add">
            <el-button @click="activitdelAll" class="delbtn">全部删除</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%;" @selection-change="activeidAll">
            <el-table-column type="selection" width align="center"></el-table-column>
            <el-table-column type="index" prop="order" label="序号" width align="center"></el-table-column>
            <el-table-column prop="lastUpdateUser" label="发布人" align="center" width></el-table-column>
            <el-table-column prop="countSale" label="已售" align="center" width></el-table-column>
            <el-table-column prop="activityPrice" label="抢购价" align="center" width>
                <template slot-scope="scope">
                    <label>{{scope.row.activityPrice / 100}}￥</label>
                </template>
            </el-table-column>
            <el-table-column prop="productName" label="关联的商品" align="center"></el-table-column>
            <el-table-column prop="time" label="发布时间" align="center"></el-table-column>
            <el-table-column label="操作" width="250" align="center">
                <template slot-scope="scope">
                    <el-button @click="lookdetail(scope.row)" class="lookvideo">重新发布</el-button>
                    <el-button @click="xiajiaActivit(scope.row)" class="updatecoupon">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
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
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            activitSeach: '',
            time: '',
            startTime: '',
            endTime: '',
            tableData: [],
            page: 1,
            limit: 20,
            counts: this.counts,
            activitid: []
        };
    },

    mounted() {
        this.getRushPurchaseList();
    },
    methods: {
        activeidAll(val) {
            this.activitid = val;
        },
        activitdelAll() {
            var name = [];
            var id = [];
            this.activitid.forEach(function (val, index) {
                name[index] = val.lastUpdateUser;
                id[index] = val.id;
            });
            if (this.activitid == '') {
                return this.$message({
                    showClose: true,
                    message: '请选择要删除的限时抢够',
                    type: 'error'
                });
            } else {
                this.$confirm('是否确定将的限时抢够活动【' + name + '】-删除?', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const loading = this.$loading({
                        lock: true,
                        text: '批量删除中...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.$axios.post('admin/company/activity/all/batch_remove?activityType=5', id).then((res) => {
                        loading.close();
                        if (res.status == 200) {
                            var data = res.data;
                            if (data.code == 200) {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'success'
                                });
                                this.getRushPurchaseList();
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
            }
        },
        // 时间戳
        templateTime(value) {
            if (val != null) {
                var date = new Date(value[0]);
                var start = date.getTime(date);
                this.startTime = start;
                var date1 = new Date(value[1]);
                var end = date1.getTime(date1);
                this.endTime = end;
            } else {
                this.startTime = '';
                this.endTime = '';
            }
        },
        // 活动查询
        activitQuery() {
            this.page = 1;
            this.getRushPurchaseList();
        },
        // 查看详情
        lookdetail(row) {
            this.$router.push({
                path: './addflashSale',
                query: {
                    data: row
                }
            });
        },
        // 下架活动
        xiajiaActivit(row) {
            this.$confirm('是否确定将【' + row.publishUser + '】发布的限时抢购活动下架?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let data = {
                    activityId: row.id,
                    activityType: 5,
                    newStatus: 3
                };
                const loading = this.$loading({
                    lock: true,
                    text: '删除中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
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
                            this.getRushPurchaseList();
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
        // 页码
        handleSizeChange(val) {
            this.limit = val;
            this.getRushPurchaseList();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getRushPurchaseList();
        },
        getRushPurchaseList() {
            let data = {
                companyId: parseInt(localStorage.getItem('loginData')),
                limit: this.limit,
                page: this.page,
                status: 2,
                timeStart: this.startTime || 0,
                timeEnd: this.timeEnd || 0
            };
            this.$axios.post('admin/admin/rushPurchase/getRushPurchaseList', data).then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        var tabList = [];
                        var datetime1 = '';
                        var datetime2 = '';
                        data.data.forEach(function (val, index) {
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
    line-height: 30px;
    font-size: 14px;
    border-radius: 8px;
    margin-left: 20px;
}
.activityList .activit-add {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: right;
}
.activit-add .delbtn {
    width: 104px;
    height: 30px;
    line-height: 30px;
    background-color: #ff0000;
    color: #fff;
    padding: 0;
    font-size: 14px;
    border-radius: 8px;
}

.el-table .lookvideo {
    width: 70px;
    height: 30px;
    padding: 0;
    background-color: #2450d2;
    color: #fff;
    line-height: 30px;
    font-size: 14px;
}
.el-table .xiajiaActivit {
    width: 70px;
    height: 30px;
    padding: 0;
    background-color: #ff8d00;
    color: #fff;
    line-height: 30px;
    font-size: 14px;
}
.el-input__inner {
    height: 30px;
    line-height: 30px;
}
.el-date-editor .el-range-separator {
    line-height: 24px;
}
</style>
