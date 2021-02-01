<template>
    <!-- 上架的视频 -->
    <div
        class="lowercoupon"
        id="lowercoupon"
        v-loading="fullscreenLoading"
        :element-loading-text="loadingText"
        element-loading-background="rgba(0, 0, 0, 0.7)"
    >
        <div class="video-top">
            <div class="videochaxun">
                <label>同城团购活动查询</label>
            </div>
            <div class="videoList">
                <el-input class="videoInput" placeholder="请输入活动关键字" v-model="videoInput"></el-input>
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
                    @change="templateTime"
                ></el-date-picker>
                <el-button @click="videoquery" class="query">查询</el-button>
            </div>
        </div>
        <div class="text-coupon">
            <el-button @click="delgroupAll" class="delbutton">全部删除</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%;" @selection-change="groupChange">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width align="center"></el-table-column>
            <el-table-column prop="title" label="团购商品名称" align="center" width="180"></el-table-column>
            <el-table-column prop="publisher" label="发布人" align="center" width></el-table-column>
            <el-table-column prop="publisher" label="活动已售" align="center" width></el-table-column>
            <el-table-column prop="activityPrice" label="团购价格" align="center">
                <template slot-scope="scope">
                    <label>{{scope.row.activityPrice}}￥</label>
                </template>
            </el-table-column>
            <el-table-column prop="productPrice" label="原价" align="center">
                <template slot-scope="scope">
                    <label>{{scope.row.productPrice}}￥</label>
                </template>
            </el-table-column>
            <el-table-column prop="time" width="200" label="活动时间" align="center"></el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button @click="chongxinfabu(scope.row)" class="lookgroup">重新发布</el-button>
                    <el-button @click="delgroup(scope.row)" class="delgroup">删除</el-button>
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
            tableData: [],
            page: 1,
            limit: 10,
            counts: this.counts,
            timeStart: '',
            timeEnd: '',
            startTime: '',
            endTime: '',
            groupId: ''
        };
    },
    mounted() {
        this.getgroupList();
    },
    methods: {
        groupChange(val) {
            console.log(val);
            this.groupId = val;
        },
        delgroupAll() {
            var name = [];
            var id = [];
            this.groupId.forEach(function (val, index) {
                name[index] = val.title;
                id[index] = val.id;
            });
            if (this.groupId == '') {
                return this.$message({
                    showClose: true,
                    message: '请选择要删除的同城团购活动',
                    type: 'error'
                });
            } else {
                this.$confirm('是否确定将的同城团购活动【' + name + '】-删除?', '温馨提示', {
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
                    this.$axios.post('admin/company/activity/all/batch_remove?activityType=6', id).then((res) => {
                        loading.close();
                        if (res.status == 200) {
                            var data = res.data;
                            if (data.code == 200) {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'success'
                                });
                                this.getgroupList();
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
        // 查看详情
        chongxinfabu(row) {
            this.$router.push({
                path: './addLocalgroup',
                query: {
                    data: row
                }
            });
        },
        // 删除
        delgroup(row) {
            this.$confirm('是否确定将同城团购活动:【' + row.title + '】删除?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let data = {
                    activityId: row.id,
                    activityType: 6,
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
                            this.getgroupList();
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
        // 查询按钮
        videoquery() {
            this.page = 1;
            this.getgroupList();
        },
        // 页码
        handleSizeChange(val) {
            this.limit = val;
            this.getgroupList();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getgroupList();
        },
        templateTime(value) {
            if (value != null) {
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
        // 查询同城列表
        getgroupList() {
            let data = {
                companyId: localStorage.getItem('loginData'),
                limit: this.limit,
                page: this.page,
                activityTitleLike: this.videoInput,
                timeStart: this.time[1],
                timeEnd: this.time[0],
                status: 2
            };
            this.$axios.post('admin/company/activity/group/list', data).then((res) => {
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
                                date.getDate() +
                                ' '; //+ date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

                            var date1 = new Date(datetime2);
                            var time2 =
                                date1.getFullYear() +
                                '-' +
                                (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() + 1) +
                                '-' +
                                date1.getDate(); // + ' ' + date1.getHours() + ':' + date1.getMinutes() + ':' + date1.getSeconds();
                            tabList[index].time = time1 + ' ---- ' + time2;
                            tabList[index].activityPrice = val.activityPrice / 100;
                            tabList[index].productPrice = val.productPrice / 100;
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
    width: 100%;
    box-sizing: border-box;
}

.video-top {
    width: 100%;
    height: 110px;
    margin-top: 20px;
    background-color: #fafbfa;
    padding-left: 20px;
    margin-bottom: 20px;
}

.videochaxun {
    padding-top: 10px;
}

.lowercoupon {
    margin-top: 10px;
}

.lowercoupon .videoInput {
    width: 200px;
    height: 30px;
}

.lowercoupon .query {
    width: 150px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    border-radius: 8px;
    margin-left: 20px;
    padding: 0;
    background-color: #2450d2;
    color: #fff;
}

.el-table .lookgroup {
    width: 70px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    border-radius: 8px;
    color: #fff;
    background-color: #2450d2;
    padding: 0;
}

.el-table .updatecoupon {
    width: 63px;
    height: 20px;
    border-radius: 8px;
    color: #fff;
    background-color: #ff8d00;
    padding: 0;
}
.text-coupon {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: right;
}

.text-coupon .delbutton {
    width: 104px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    background-color: #ff0000;
    color: #fff;
    padding: 0;
    border-radius: 8px;
}
.el-table .delgroup {
    width: 70px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    border-radius: 8px;
    color: #fff;
    background-color: #ff0000;
    padding: 0;
}
.videoList .el-date-picker {
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
