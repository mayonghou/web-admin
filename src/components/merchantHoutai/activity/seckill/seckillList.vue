<template>
    <!-- 上架的秒杀 -->
    <div
        class="seckillList"
        id="seckillList"
        v-loading="fullscreenLoading"
        :element-loading-text="loadingText"
        element-loading-background="rgba(0, 0, 0, 0.7)"
    >
        <div class="video-top">
            <div class="videochaxun">
                <label>秒杀活动查询</label>
            </div>
            <div class="seckillList-top">
                <el-input class="videoInput" placeholder="输入活动标题" v-model="input"></el-input>
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
                <el-button @click="couponquery" class="query">查询</el-button>
            </div>
        </div>
        <div class="text-coupon">
            <el-button @click="issueActivity" class="couponbutton">发布秒杀活动</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%;">
            <!-- <el-table-column type="selection" width="" align="center">
            </el-table-column>-->
            <el-table-column type="index" prop="order" label="序号" width align="center"></el-table-column>
            <el-table-column prop="title" label="活动标题" align="center" width></el-table-column>
            <el-table-column prop="publisher" label="发布人" align="center" width></el-table-column>
            <el-table-column prop="countSale" label="已售" align="center" width></el-table-column>
            <el-table-column prop="activityPrice" label="秒杀价" align="center" width>
                <template slot-scope="scope">
                    <label>{{scope.row.activityPrice}}￥</label>
                </template>
            </el-table-column>
            <el-table-column prop="productName" label="关联的商品" align="center"></el-table-column>
            <el-table-column prop="time" label="发布时间" width="170" align="center"></el-table-column>
            <el-table-column label="操作" width="250" align="center">
                <template slot-scope="scope">
                    <el-button @click="lookdetail(scope.row)" class="lookvideo">查看详情</el-button>
                    <el-button @click="xaijiaseckill(scope.row)" class="updatecoupon">下架</el-button>
                    <!-- <el-button @click="delVideo(scope.row)" class="delcoupon">删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="pagintion"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="counts"
        ></el-pagination>
    </div>
</template>

<script>
export default {
    name: 'seckillList',
    data() {
        return {
            fullscreenLoading: true,
            loadingText: '加载中...',
            time: '',
            videoStatus: '',
            input: '',
            page: 1,
            limit: 20,
            counts: this.counts,
            tableData: [],
            timeStart: '',
            timeEnd: ''
        };
    },
    mounted() {
        this.getSeckillList();
    },
    methods: {
        // 查看详情
        lookdetail(row) {
            this.$router.push({
                path: './detailseckill',
                query: {
                    id: row.id,
                    data: row
                }
            });
        },
        // 下架
        xaijiaseckill(row) {
            this.$confirm('是否确定将秒杀活动:【' + row.title + '】下架?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let data = {
                    activityId: row.id,
                    activityType: 4,
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
                            this.getSeckillList();
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

        // 发布优惠卷
        issueActivity() {
            this.$router.push({ path: './addseckill' });
        },
        // 页码
        handleSizeChange(val) {
            this.limit = val;
            this.getSeckillList();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getSeckillList();
        },
        // 查询按钮
        couponquery() {
            this.page = 1;
            this.getSeckillList();
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
        // 查询秒杀列表
        getSeckillList() {
            let data = {
                activityTitleLike: this.input,
                companyId: parseInt(localStorage.getItem('loginData')),
                limit: this.limit,
                page: this.page,
                status: 1,
                timeEnd: this.timeEnd,
                timeStart: this.timeStart
            };
            this.$axios.post('admin/company/activity/flash/list', data).then((res) => {
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
                                date.getDate(); //+ date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

                            var date1 = new Date(datetime2);
                            var time2 =
                                date1.getFullYear() +
                                '-' +
                                (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() + 1) +
                                '-' +
                                date1.getDate(); // + ' ' + date1.getHours() + ':' + date1.getMinutes() + ':' + date1.getSeconds();
                            tabList[index].time = time1 + ' ---- ' + time2;
                            tabList[index].activityPrice = val.activityPrice / 100;
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
.seckillList {
    box-sizing: border-box;
    width: 100%;
    padding: 20px;
    padding-top: 0;
}
.video-top {
    width: 100%;
    height: 110px;
    margin-top: 20px;
    background-color: #fafbfa;
    padding-left: 20px;
}
.videochaxun {
    padding-top: 10px;
}
.seckillList-top {
    margin-top: 10px;
}
.seckillList .videoInput {
    width: 200px;
    height: 30px;
}
.seckillList .query {
    width: 150px;
    height: 30px;
    border-radius: 8px;
    margin-left: 20px;
    padding: 0;
    background-color: #2450d2;
    color: #fff;
}
.select-el {
    margin-left: 20px;
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
    line-height: 30px;
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
.text-coupon {
    width: 100%;
    height: 50px;
    text-align: right;
    line-height: 50px;
}
.seckillList .couponbutton {
    width: 104px;
    height: 30px;
    background-color: #2450d2;
    color: #fff;
    padding: 0;
    border-radius: 8px;
}
.seckillList .el-date-picker {
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
