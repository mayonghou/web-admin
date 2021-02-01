<template>
    <!-- 下架的优惠券 -->
    <div
        class="lowercoupon"
        id="lowercoupon"
        v-loading="fullscreenLoading"
        :element-loading-text="loadingText"
        element-loading-background="rgba(0, 0, 0, 0.7)"
    >
        <div class="video-top">
            <div class="videochaxun">
                <label>优惠券查询</label>
            </div>
            <div class="videoList">
                <el-input class="videoInput" placeholder="输入活动标题" v-model="videoInput"></el-input>
                <i
                    style="font-size: 22px;color: #2494D2;margin-left: 20px;margin-top: 5px; margin-right: 20px;"
                    class="el-icon-date"
                ></i>
                <el-date-picker
                    prefix-icon="md-date_range"
                    v-model="time"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    @change="timeCuo"
                ></el-date-picker>
                <el-button @click="videoquery" class="query">查询</el-button>
            </div>
        </div>
        <div class="text-button">
            <el-button @click="delbutton" class="delbutton">全部删除</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%;" @selection-change="changecoupon">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column type="index" prop="order" label="序号" width align="center"></el-table-column>
            <el-table-column prop="activityTitle" label="活动标题" align="center" width="180"></el-table-column>
            <el-table-column prop="publisher" label="发布人" align="center" width></el-table-column>
            <el-table-column prop="countReceived" label="已领取" align="center" width></el-table-column>
            <el-table-column prop="countUsed" label="已使用" align="center" width></el-table-column>
            <el-table-column prop="couponName" label="关联的优惠券" align="center"></el-table-column>
            <el-table-column prop="time" label="活动时间" align="center" width="180"></el-table-column>
            <el-table-column label="操作" width="250" align="center">
                <template slot-scope="scope">
                    <el-button @click="afreshcoupon(scope.row)" class="afreshcoupon">重新发布</el-button>
                    <el-button @click="delAfreshcou(scope.row)" class="delcoupon">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="pagintion"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="20"
            layout="total, sizes, prev, pager, next, jumper"
            :total="counts"
        ></el-pagination>
    </div>
</template>

<script>
export default {
    name: 'lowercoupon',
    data() {
        return {
            fullscreenLoading: false,
            loadingText: '加载中...',
            videoInput: '',
            time: '',
            value: '',
            page: 1,
            limit: 20,
            counts: this.counts,
            tableData: [],
            couponDaID: '',
            timeStart: '',
            timeEnd: ''
        };
    },
    mounted() {
        this.getconpouLists();
    },
    methods: {
        changecoupon(val) {
            this.couponDaID = val;
        },
        delbutton() {
            var name = [];
            var id = [];
            this.couponDaID.forEach(function (val, index) {
                name[index] = val.activityTitle;
                id[index] = val.id;
            });
            if (this.couponDaID == '') {
                return this.$message({
                    showClose: true,
                    message: '请选择要删除的优惠券',
                    type: 'error'
                });
            } else {
                this.$confirm('是否确定将优惠券活动【' + name + '】-删除?', '温馨提示', {
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
                    this.$axios.post('admin/company/activity/all/batch_remove?activityType=1', id).then((res) => {
                        loading.close();
                        if (res.status == 200) {
                            var data = res.data;
                            if (data.code == 200) {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'success'
                                });
                                this.getconpouLists();
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
        // 重新发布
        afreshcoupon(row) {
            this.$router.push({
                path: './addcoupon',
                query: {
                    data: row
                }
            });
        },
        // 删除
        delAfreshcou(row) {
            this.$confirm('是否确定将优惠券活动:【' + row.activityTitle + '】删除?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let data = {
                    activityId: row.id,
                    activityType: 1,
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
                            this.getconpouLists();
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
            this.getconpouLists();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getconpouLists();
        },
        // 查询按钮
        videoquery() {
            this.page = 1;
            this.getconpouLists();
        },
        timeCuo(value) {
            if (value != null) {
                var date = new Date(value[0]);
                var startTime = date.getTime(date);
                var date1 = new Date(value[1]);
                var endTime = date1.getTime(date1);
                this.timeStart = startTime;
                this.timeEnd = endTime;
            } else {
                this.timeStart = '';
                this.timeEnd = '';
            }
        },
        // 查询优惠券列表
        getconpouLists() {
            let data = {
                companyId: localStorage.getItem('loginData'),
                limit: this.limit,
                page: this.page,
                activityTitleLike: this.videoInput,
                timeEnd: this.timeStart,
                timeStart: this.timeEnd,
                status: 2
            };
            this.$axios.post('admin/company/activity/coupon/list', data).then((res) => {
                this.fullscreenLoading = false;
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
                            tabList[index].startTime = time1;
                            tabList[index].endTime = time2;
                            tabList[index].couponId = val.couponId;
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
.lowercoupon {
    box-sizing: border-box;
    padding: 20px;
    width: 100%;
}

.video-top {
    width: 100%;
    height: 110px;
    background-color: #fafbfa;
    padding-left: 20px;
}

.videochaxun {
    padding-top: 10px;
}

.lowercoupon .videoInput {
    width: 200px;
    height: 30px;
}

.lowercoupon .query {
    width: 150px;
    height: 30px;
    font-size: 14px;
    border-radius: 8px;
    margin-left: 20px;
    padding: 0;
    background-color: #2450d2;
    color: #fff;
}

.el-table .afreshcoupon {
    width: 70px;
    height: 30px;
    font-size: 14px;
    border-radius: 8px;
    color: #fff;
    background-color: #109955;
    padding: 0;
}

.el-table .updatecoupon {
    width: 70px;
    height: 30px;
    font-size: 14px;
    border-radius: 8px;
    color: #fff;
    background-color: #ff8d00;
    padding: 0;
}

.el-table .delcoupon {
    width: 70px;
    height: 30px;
    font-size: 14px;
    border-radius: 8px;
    color: #fff;
    background-color: #ff0000;
    padding: 0;
}

.text-button {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: right;
}

.text-button .delbutton {
    width: 100px;
    height: 30px;
    font-size: 14px;
    padding: 0;
    color: #fff;
    background-color: #ff0000;
    border-radius: 8px;
}
.lowercoupon .el-date-picker {
    border: 1px solid #c1c1c1;
}
.el-input__inner {
    height: 30px;
    line-height: 30px;
}
.el-date-editor .el-range-separator {
    line-height: 24px;
}
</style>
