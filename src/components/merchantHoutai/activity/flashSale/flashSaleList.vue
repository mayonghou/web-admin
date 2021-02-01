<template>
    <div id="activityList" class="activityList">
        <div class="activit-top">
            <div class="activit-label">
                <label>限时抢购活动查询</label>
            </div>
            <div class="activit-search">
                <el-date-picker
                    v-model="time"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    @change="templateTime"
                ></el-date-picker>
                <el-button @click="activitQuery" class="query">查询</el-button>
            </div>
        </div>
        <div class="activit-add">
            <el-button @click="activitAdds" class="btn">发布限时抢购</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column type="index" prop="order" label="序号" width align="center"></el-table-column>
            <el-table-column prop="publishUser" label="发布人" align="center" width></el-table-column>
            <el-table-column prop="countSale" label="已售" align="center" width></el-table-column>
            <el-table-column prop="activityPrice" label="抢购价" align="center" width>
                <template slot-scope="scope">
                    <label>{{scope.row.activityPrice}}￥</label>
                </template>
            </el-table-column>
            <el-table-column prop="productName" label="关联的商品" align="center"></el-table-column>
            <el-table-column prop="time" label="活动时间" width="200" align="center"></el-table-column>
            <el-table-column label="操作" width="250" align="center">
                <template slot-scope="scope">
                    <el-button @click="lookdetail(scope.row)" class="lookflash">查看详情</el-button>
                    <el-button @click="xiajiaActivit(scope.row)" class="updatecoupon">下架</el-button>
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
            counts: this.counts
        };
    },
    mounted() {
        this.getRushPurchaseList();
    },
    methods: {
        // 时间戳
        templateTime(value) {
            if (value != null) {
                var date = new Date(this.time[0]);
                var start = date.getTime(date);
                this.startTime = start;
                var date1 = new Date(this.time[1]);
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
                path: './flashSaleDetail',
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
                    newStatus: 2
                };
                const loading = this.$loading({
                    lock: true,
                    text: '下架中...',
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
        // 发布按钮
        activitAdds() {
            this.$router.push({
                path: './addflashSale'
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
                status: 1,
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
                            tabList[index].activityPrice = val.activityPrice / 100;
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
.activityList {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
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
    width: 114px;
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    background-color: #2482d2;
    color: #fff;
    border-radius: 8px;
    padding: 0;
}

.el-table .lookflash {
    width: 63px;
    height: 30px;
    padding: 0;
    background-color: #2450d2;
    color: #fff;
    font-size: 14px;
    line-height: 30px;
}

.el-table .updatecoupon {
    width: 63px;
    height: 30px;
    padding: 0;
    background-color: #ff8d00;
    color: #fff;
    font-size: 14px;
    line-height: 30px;
}
.el-input__inner {
    height: 30px;
    line-height: 30px;
}
.el-date-editor .el-range-separator {
    line-height: 24px;
}
</style>
