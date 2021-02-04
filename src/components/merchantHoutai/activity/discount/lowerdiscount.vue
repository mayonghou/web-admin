<template>
    <!-- 下架的折扣 -->
    <div
        class="lowerseckill"
        id="lowerseckill"
        v-loading="fullscreenLoading"
        :element-loading-text="loadingText"
        element-loading-background="rgba(0, 0, 0, 0.7)"
    >
        <div class="video-top">
            <div class="videochaxun">
                <label>折扣查询</label>
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
                    unlink-panels
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="templateTime"
                ></el-date-picker>
                <el-button @click="videoquery" class="query">查询</el-button>
            </div>
        </div>
        <div class="text-button">
            <el-button @click="delbutton" class="delbutton">全部删除</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%;" @selection-change="discountchange">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column type="index" prop="order" label="序号" width align="center"></el-table-column>
            <el-table-column prop="activityTitle" label="活动标题" align="center" width></el-table-column>
            <el-table-column prop="publishUser" label="发布人" align="center" width></el-table-column>
            <el-table-column prop="discount" label="折扣" align="center" width></el-table-column>
            <el-table-column prop="countSale" label="已售" align="center" width></el-table-column>
            <el-table-column prop="activityPrice" label="折扣价" align="center" width>
                <template slot-scope="scope">
                    <label>{{scope.row.activityPrice}}￥</label>
                </template>
            </el-table-column>
            <el-table-column prop="productName" label="关联的商品" align="center"></el-table-column>
            <el-table-column prop="time" label="活动时间" width="200" align="center"></el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button @click="aferyfabu(scope.row)" class="lookvideo">重新发布</el-button>
                    <el-button @click="delActivity(scope.row)" class="delcoupon">删除</el-button>
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
    name: 'lowerseckill',
    data() {
        return {
            fullscreenLoading: true,
            loadingText: '加载中...',
            videoInput: '',
            time: '',
            value: '',
            page: 1,
            limit: 10,
            counts: this.counts,
            tableData: [],
            discountID: [],
            timeStart: '',
            timeEnd: ''
        };
    },
    mounted() {
        this.getDiscountList();
    },
    methods: {
        discountchange(val) {
            this.discountID = val;
        },
        delbutton() {
            var name = [];
            var id = [];
            this.discountID.forEach(function (val, index) {
                name[index] = val.activityTitle;
                id[index] = val.id;
            });
            if (this.discountID == '') {
                return this.$message({
                    showClose: true,
                    message: '请选择要删除的折扣',
                    type: 'error'
                });
            } else {
                this.$confirm('是否确定将折扣活动【' + name + '】-删除?', '温馨提示', {
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
                    this.$axios.post('admin/company/activity/all/batch_remove?activityType=0', id).then((res) => {
                        loading.close();
                        if (res.status == 200) {
                            var data = res.data;
                            if (data.code == 200) {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'success'
                                });
                                this.getDiscountList();
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
        aferyfabu(row) {
            this.$router.push({
                path: './adddiscount',
                query: {
                    data: row
                }
            });
        },
        // 删除
        delActivity(row) {
            this.$confirm('是否确定将折扣活动:【' + row.activityTitle + '】删除?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let data = {
                    activityId: row.id,
                    activityType: 0,
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
                            this.getDiscountList();
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
            this.getDiscountList();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getDiscountList();
        },
        // 查询按钮
        videoquery() {
            this.page = 1;
            this.getDiscountList();
        },
        // 时间戳转换
        templateTime(value) {
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
        // 查询折扣
        getDiscountList() {
            let data = {
                companyId: parseInt(localStorage.getItem('loginData')),
                activityTitleLike: this.input,
                limit: this.limit,
                page: this.page,
                status: 2,
                timeStart: this.timeStart || 0,
                timeEnd: this.timeEnd || 0
            };
            this.$axios.post('admin/admin/discount/getDiscountList', data).then((res) => {
                this.fullscreenLoading = false;
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
                            tabList[index].discount = val.discount;
                        });
                        this.tableData = tabList;
                        this.counts = tabList.length;
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
.lowerseckill {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
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

.lowerseckill {
    margin-top: 10px;
}

.lowerseckill .videoInput {
    width: 200px;
    height: 30px;
}

.lowerseckill .query {
    width: 150px;
    height: 30px;
    border-radius: 8px;
    margin-left: 20px;
    padding: 0;
    background-color: #2450d2;
    color: #fff;
}

.el-table .lookvideo {
    width: 70px;
    height: 30px;
    font-size: 14px;
    border-radius: 8px;
    color: #fff;
    background-color: #2450d2;
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
    height: 50px;
    line-height: 50px;
    text-align: right;
}

.text-button .delbutton {
    width: 100px;
    height: 30px;
    padding: 0;
    color: #fff;
    background-color: #ff0000;
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
