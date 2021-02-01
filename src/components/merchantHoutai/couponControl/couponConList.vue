<template>
    <!-- 上架的优惠券 -->
    <div
        class="couponConList"
        id="couponConList"
        v-loading="fullscreenLoading"
        :element-loading-text="loadingText"
        element-loading-background="rgba(0, 0, 0, 0.7)"
    >
        <div class="video-top">
            <div class="videochaxun">
                <label>优惠券查询</label>
            </div>
            <div class="couponConList-top">
                <el-input class="videoInput" placeholder="输入优惠券名称" v-model="input"></el-input>
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
                <el-select class="select-el" v-model="videoStatus" placeholder="全部类型" clearable>
                    <el-option
                        v-for="item in option"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
                <el-button @click="couponquery" class="query">查询</el-button>
            </div>
        </div>
        <div class="text-coupon">
            <el-button @click="issueActivity" class="couponbutton">发布优惠卷</el-button>
            <el-button @click="delcoupon" class="delcouponbutton">全部删除</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%;" @selection-change="couponChange">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column type="index" prop="order" label="序号" align="center"></el-table-column>
            <el-table-column prop="name" label="优惠券名称" align="center" width="150"></el-table-column>
            <el-table-column prop="createByUser" label="发布人" align="center" width></el-table-column>
            <el-table-column prop="createByPhone" label="手机号码" align="center" width="110"></el-table-column>
            <el-table-column prop="shopp" label="关联商品" align="center"></el-table-column>
            <el-table-column prop="tab" label="规则" width="120" align="center"></el-table-column>
            <el-table-column prop="type" label="优惠券类型" align="center"></el-table-column>
            <el-table-column prop="countAvailable" label="库存" align="center"></el-table-column>
            <el-table-column prop="time" label="发布时间" width="120" align="center"></el-table-column>
            <el-table-column label="操作" width="350" align="center">
                <template slot-scope="scope">
                    <el-button @click="lookdetail(scope.row)" class="lookvideo">查看详情</el-button>
                    <el-button
                        @click="shangVideo(scope.row)"
                        v-if="scope.row.couponStatus == 1"
                        class="updatecoupon"
                    >下架</el-button>
                    <el-button
                        @click="shangjuan(scope.row)"
                        v-if="scope.row.couponStatus == 0"
                        class="bgcolor"
                    >上架</el-button>
                    <el-button
                        @click="edityouhuijuan(scope.row)"
                        v-if="scope.row.couponStatus == 0"
                        class="editcolor"
                    >编辑</el-button>
                    <el-button @click="delJuna(scope.row)" class="delcoupon">删除</el-button>
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

        <el-dialog title="选择要添加的优惠卷" :visible.sync="dialogVisible" width="50%">
            <div class="youhuijuan">
                <div style="margin-top: 20%; margin-bottom: 20px;">请选择要发布的优惠券</div>
                <el-button @click="babysbreath" class="juaunBtn" type="primary">满减卷</el-button>
                <el-button @click="voucher" class="juaunBtn bbtn" type="primary">代金卷</el-button>
            </div>
        </el-dialog>
        <el-dialog title="上架优惠卷" :visible.sync="dialogVisibleJuan" width="50%">
            <el-form :model="limqixainzhi">
                <el-form-item label="领取限制：" label-width="220px">
                    <el-input
                        v-model="limqixainzhi.numLimitationdata"
                        oninput="value=value.replace(/[^0-9]/g,'')"
                    ></el-input>
                </el-form-item>
                <el-form-item label-width="300px">
                    <el-button type="primary" @click="youhuijuanshangjia">上架</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'couponConList',
    data() {
        return {
            limqixainzhi: {
                numLimitationdata: ''
            },
            fullscreenLoading: true,
            loadingText: '加载中...',
            time: '',
            startTime: '',
            endTime: '',
            videoStatus: '',
            dialogVisible: false,
            dialogVisibleJuan: false,
            input: '',
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
            tableData: [],
            couponid: [],
            dataRow: ''
        };
    },
    mounted() {
        this.getconpouLista();
    },
    methods: {
        // 编辑优惠卷
        edityouhuijuan(row) {
            if (row.type == '满减卷') {
                this.$router.push({
                    path: './editcouponControl',
                    name: 'editcouponControl',
                    params: {
                        data: row
                    }
                });
            } else {
                this.$router.push({
                    path: './editcouponControlvoucher',
                    name: 'editcouponControlvoucher',
                    params: {
                        data: row
                    }
                });
            }
        },
        couponChange(val) {
            this.couponid = val;
        },
        delcoupon() {
            var name = [];
            var id = [];
            this.couponid.forEach(function (val, index) {
                name[index] = val.name;
                id[index] = val.id;
            });
            this.$confirm('是否确定将优惠券【' + name + '】-删除?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (this.couponid == '') {
                    return this.$message({
                        showClose: true,
                        message: '请选择要删除的优惠券',
                        type: 'error'
                    });
                } else {
                    const loading = this.$loading({
                        lock: true,
                        text: '批量删除中...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.$axios.post('admin/company/coupon/batch_remove', id).then((res) => {
                        loading.close();
                        if (res.status == 200) {
                            var data = res.data;
                            if (data.code == 200) {
                                this.$message({
                                    showClose: true,
                                    message: data.data,
                                    type: 'success'
                                });
                                this.getconpouLista();
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
            });
        },
        // 查看详情
        lookdetail(row) {
            this.$router.push({
                path: './detailCouponCon',
                query: {
                    id: row.id
                }
            });
        },
        // 删除优惠券
        delJuna(row) {
            this.$confirm('是否确定将优惠券:【' + row.name + '】删除?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: '删除中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios.post('admin/company/coupon/remove/' + row.id).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.getconpouLista();
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
        // 时间戳
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
        youhuijuanshangjia() {
            console.log(this.dataRow);
            this.$confirm('是否确定将优惠券:【' + this.dataRow.name + '】上架?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var data = {
                    id: this.dataRow.id,
                    newStatus: 1,
                    numLimitation: this.limqixainzhi.numLimitationdata || 0
                };
                const loading = this.$loading({
                    lock: true,
                    text: '上架中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios.post('admin/company/coupon/change_status', data).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.getconpouLista();
                            this.dialogVisibleJuan = false;
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
        // 上架优惠券
        shangjuan(row) {
            this.dataRow = row;
            this.dialogVisibleJuan = true;
        },
        // 下架优惠券
        shangVideo(row) {
            this.$confirm('是否确定将优惠券:【' + row.name + '】下架?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var data = {
                    id: row.id,
                    newStatus: 0
                };
                const loading = this.$loading({
                    lock: true,
                    text: '下架中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios.post('admin/company/coupon/change_status', data).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.getconpouLista();
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

        // 发布优惠卷 按钮
        issueActivity() {
            this.dialogVisible = true;
        },
        // 满减卷
        babysbreath() {
            this.$router.push({ path: './addcouponControl' });
            this.dialogVisible = false;
        },
        // 代金卷
        voucher() {
            this.$router.push({ path: './addcouponControlvoucher' });
            this.dialogVisible = false;
        },
        // 页码
        handleSizeChange(val) {
            this.limit = val;
            this.getconpouLista();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getconpouLista();
        },
        // 查询按钮
        couponquery() {
            this.page = 1;
            this.getconpouLista();
        },
        // 查询优惠券列表
        getconpouLista() {
            let data = {
                companyId: localStorage.getItem('loginData'),
                limit: this.limit,
                page: this.page,
                nameOrPublisherLike: this.input,
                publishAtTimeEnd: this.time[1],
                publishAtTimeStart: this.time[0],
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
.couponConList {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
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
.couponConList-top {
    margin-top: 10px;
}
.couponConList .videoInput {
    width: 200px;
    height: 30px;
}

.couponConList .query {
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
    line-height: 30px;
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
    line-height: 30px;
    font-size: 14px;
    border-radius: 8px;
    color: #fff;
    background-color: #ff0000;
    padding: 0;
}
.el-table .bgcolor {
    width: 70px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    border-radius: 8px;
    color: #fff;
    background-color: #109955;
    padding: 0;
}
.el-table .editcolor {
    width: 70px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    border-radius: 8px;
    color: #fff;
    background-color: #4985f0;
    padding: 0;
}
.text-coupon {
    width: 100%;
    height: 50px;
    text-align: right;
    line-height: 50px;
}
.couponConList .couponbutton {
    width: 104px;
    height: 30px;
    font-size: 14px;
    background-color: #2450d2;
    color: #fff;
    padding: 0;
    border-radius: 8px;
}
.text-coupon .delcouponbutton {
    width: 104px;
    height: 30px;
    font-size: 14px;
    background-color: #ff0000;
    color: #fff;
    padding: 0;
    border-radius: 8px;
}
.youhuijuan {
    width: 100%;
    height: 200px;
    text-align: center;
}
.youhuijuan .juaunBtn {
    width: 100px;
    height: 30px;
    border-radius: 8px;
}
.juaunBtn.bbtn {
    margin-left: 40px;
}
.el-table .el-table_1_column_3 {
    overflow: hidden;
    height: 40px;
}
.el-date-picker {
    border: 1px solid #dcdfe6;
}
.el-input__inner {
    height: 30px;
    line-height: 30px;
}
.el-date-editor .el-range-separator {
    line-height: 24px;
}
</style>
