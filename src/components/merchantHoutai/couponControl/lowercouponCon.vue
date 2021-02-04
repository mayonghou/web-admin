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
                <label>优惠券查询</label>
            </div>
            <div class="videoList">
                <el-input class="videoInput" placeholder="输入优惠券,发布人" v-model="videoInput"></el-input>
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
                ></el-date-picker>
                <el-select class="select-el" v-model="videoStatus" placeholder="全部类型" clearable>
                    <el-option
                        v-for="item in option"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
                <el-button @click="videoquery" class="query">查询</el-button>
            </div>
        </div>
        <el-table :data="tableData" style="width: 1200px;margin: 0 auto;">
            <el-table-column type="selection" width align="center"></el-table-column>
            <el-table-column type="index" label="序号" align="center"></el-table-column>
            <el-table-column prop="name" label="优惠券名称" align="center" width="150"></el-table-column>
            <el-table-column prop="createByUser" label="发布人" align="center" width></el-table-column>
            <el-table-column prop="createByPhone" label="手机号码" align="center" width></el-table-column>
            <el-table-column prop="shopp" label="关联商品" align="center"></el-table-column>
            <el-table-column prop="tab" label="规则" width="120" align="center"></el-table-column>
            <el-table-column prop="type" label="优惠券类型" align="center"></el-table-column>
            <el-table-column prop="countAvailable" label="库存" align="center"></el-table-column>
            <el-table-column prop="time" label="发布时间" width="120" align="center"></el-table-column>
            <el-table-column label="操作" width="250" align="center">
                <template slot-scope="scope">
                    <el-button @click="lookvideo(scope.row)" class="lookvideo">查看详情</el-button>
                    <el-button @click="shangVideo(scope.row)" class="updatecoupon">上架</el-button>
                    <el-button @click="delVideo(scope.row)" class="delcoupon">删除</el-button>
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
            videoStatus: '',
            page: 1,
            limit: 10,
            counts: this.counts,
            option: [
                {
                    id: 1,
                    name: '满减卷'
                },
                {
                    id: 2,
                    name: '代金券'
                }
            ],
            tableData: []
        };
    },
    mounted() {
        this.getconpouList();
    },
    methods: {
        // 查看详情
        lookvideo(row) {},
        // 上架
        shangVideo(row) {},
        // 删除
        delVideoOO(row) {},
        // 页码
        handleSizeChange(val) {
            this.limit = val;
            this.getconpouList();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getconpouList();
        },
        // 查询按钮
        videoquery() {
            this.page = 1;
            this.getconpouList();
        },
        // 查询下架的优惠卷
        getconpouList() {
            let data = {
                companyId: localStorage.getItem('loginData'),
                limit: this.limit,
                page: this.page,
                nameOrPublisherLike: this.videoInput,
                publishAtTimeEnd: this.time[1],
                publishAtTimeStart: this.time[0],
                couponStatus: 0,
                type: this.videoStatus
            };
            this.$axios.post('admin/company/coupon/list', data).then((res) => {
                this.fullscreenLoading = false;
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        var list = [];
                        data.list.forEach(function (val, index) {
                            list[index] = val;
                            list[index].type = val.type == 1 ? '满减卷' : '代金卷';
                            list[index].shopp =
                                val.productId == 0 ? '全场通用' : val.productInfo == null ? '没有商品' : val.productInfo.name;
                            var date = new Date(val.createAtTime);
                            var time1 =
                                date.getFullYear() +
                                '-' +
                                (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                                '-' +
                                date.getDate(); // + ' ';+ date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                            list[index].time = time1;
                        });
                        this.tableData = list;
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
    width: 1200px;
    margin: 0 auto;
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
    width: 63px;
    height: 20px;
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

.el-table .delcoupon {
    width: 63px;
    height: 20px;
    border-radius: 8px;
    color: #fff;
    background-color: #ff0000;
    padding: 0;
}
.el-input__inner {
    height: 30px;
    line-height: 30px;
}
.el-date-editor .el-range-separator {
    line-height: 24px;
}
</style>
