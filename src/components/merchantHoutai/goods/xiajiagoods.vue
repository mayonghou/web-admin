<template>
    <div
        id="xiajiagoods"
        class="xiajiagoods"
        v-loading="fullscreenLoading"
        :element-loading-text="loadingText"
        element-loading-background="rgba(0, 0, 0, 0.7)"
    >
        <div class="goodsList-top">
            <div class="rent-top">
                <label>商品查询</label>
            </div>
            <div class="reat-search">
                <el-input v-model="input" class="elinitgoods" placeholder="输入商品名称"></el-input>
                <i
                    style="font-size: 22px;color: #2494D2;margin-left: 38px;margin-right: 38px;margin-top: 5px;"
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
                <el-button @click="queryData" class="query">查询</el-button>
            </div>
        </div>
        <div class="text-button">
            <el-button @click="delButton" class="delButton">全部删除</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%;" border @selection-change="SelectionChange">
            <el-table-column type="selection" width align="center"></el-table-column>
            <el-table-column prop="index" type="index" label="序号" align="center"></el-table-column>
            <el-table-column prop="name" label="商品名称" width align="center"></el-table-column>
            <el-table-column prop="userName" label="发布人" width align="center"></el-table-column>
            <el-table-column prop="verifyStatus" label="商品状态" align="center">
                <template slot-scope="scope">
                    <label>{{scope.row.verifyStatus == 1? '上架': '下架'}}</label>
                </template>
            </el-table-column>
            <el-table-column prop="price" label="商品售价" align="center">
                <template slot-scope="scope">
                    <label>{{scope.row.price / 100}}￥</label>
                </template>
            </el-table-column>
            <el-table-column prop="pic" label="商品封面" align="center">
                <template slot-scope="scope">
                    <img width="80" height="100" :src="scope.row.pic" />
                </template>
            </el-table-column>
            <el-table-column prop="lowerShelfTime" label="商品货号" align="center"></el-table-column>
            <el-table-column prop="createTime" label="发布时间" align="center" width="150"></el-table-column>
            <el-table-column label="操作" width="280" align="center">
                <template slot-scope="scope">
                    <el-button @click="btn_detail(scope.row)" type="text" class="tab_button">查看详情</el-button>
                    <el-button @click="shangjia_btn(scope.row)" type="text" class="bj_button">上架</el-button>
                    <el-button @click="del_shopp(scope.row)" type="text" class="del_button">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 页码 -->
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
    name: 'order',
    data() {
        return {
            input: '',
            time: '',
            tableData: [],
            page: 1,
            limit: 10,
            counts: this.counts || 1,
            fullscreenLoading: true,
            loadingText: '加载中...',
            idData: []
        };
    },
    mounted() {
        this.postAdminQueryProductList();
    },
    methods: {
        // 拿到全部删除的id
        SelectionChange(val) {
            this.idData = val;
        },
        delButton() {
            var name = [];
            var id = [];
            this.idData.forEach(function (val, index) {
                name[index] = val.name;
                id[index] = val.id;
            });
            this.$confirm('是否确定将商品【' + name + '】-删除?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (this.idData == '') {
                    return this.$message({
                        showClose: true,
                        message: '请选择要删除的商品',
                        type: 'error'
                    });
                } else {
                    const loading = this.$loading({
                        lock: true,
                        text: '批量删除中...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.$axios.post('admin/product/adminBatchDelProduct?productIds=' + id).then((res) => {
                        loading.close();
                        if (res.status == 200) {
                            var data = res.data;
                            if (data.code == 200) {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'success'
                                });
                                this.postAdminQueryProductList();
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
        enlarge() {},
        shangjia_btn(row) {
            this.$router.push({
                path: './editgoods',
                query: {
                    id: row.id
                }
            });
            // this.$confirm('是否确定将商品【' + row.name + '】-上架?', '温馨提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).then(() => {
            //     var data = '?productId=' + row.id + '&publishStaus=1';
            //     const loading = this.$loading({
            //         lock: true,
            //         text: '上架中...',
            //         spinner: 'el-icon-loading',
            //         background: 'rgba(0, 0, 0, 0.7)'
            //     });
            //     this.$axios.get('admin/product/adminProductPublishStaus' + data).then((res) => {
            //         loading.close();
            //         if (res.status == 200) {
            //             var data = res.data;
            //             if (data.code == 200) {
            //                 this.$message({
            //                     showClose: true,
            //                     message: data.msg,
            //                     type: 'success'
            //                 });
            //                 this.postAdminQueryProductList();
            //             } else {
            //                 this.$message({
            //                     showClose: true,
            //                     message: data.msg,
            //                     type: 'error'
            //                 });
            //             }
            //         } else {
            //             this.$message({
            //                 showClose: true,
            //                 message: data.msg,
            //                 type: 'error'
            //             });
            //         }
            //     });
            // });
        },
        // 查看详情
        btn_detail(row) {
            this.$router.push({
                path: './goodsDetail',
                query: {
                    id: row.id,
                    status: row.verifyStatus
                }
            });
        },
        del_shopp(row) {
            this.$confirm('是否确定删除【' + row.name + '】商品?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var data = '?productId=' + row.id;
                const loading = this.$loading({
                    lock: true,
                    text: '删除中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios.get('admin/product/daminDelProduct' + data).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.postAdminQueryProductList();
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
            this.postAdminQueryProductList();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.postAdminQueryProductList();
        },
        queryData() {
            this.page = 1;
            this.postAdminQueryProductList();
        },
        postAdminQueryProductList() {
            let data = {
                endTime: this.time[1],
                startTime: this.time[0],
                limit: this.limit,
                page: this.page,
                productName: this.input,
                productStatus: '0'
            };
            this.$axios.post('admin/product/adminQueryProductList', data).then((res) => {
                this.fullscreenLoading = false;
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        let list = [];
                        data.data.dataList.forEach(function (val, index) {
                            list[index] = val;
                            list[index].pic = localStorage.getItem('imgUrl') + val.pic;
                        });
                        this.tableData = list;
                        this.counts = data.data.totalCount;
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

<style scoped="scoped">
.xiajiagoods {
    box-sizing: border-box;
    width: 100%;
    padding: 20px;
}
.divwuliu {
    margin-top: 20px;
    margin-left: 20%;
}

.el-timeline {
    margin-left: 10%;
}

.iconEnlorder {
    position: relative;
}

.iconEnlorder .iconfont {
    position: absolute;
    top: -65px;
    right: 30px;
}

.xiajiagoods .dialog-footer .fahuo {
    width: 151px;
    height: 30px;
    color: #ffffff;
    border-radius: 8px;
    background: #2450d2;
    margin: 0;
    margin-left: 40%;
    margin-top: 50px;
}

.xiajiagoods {
    padding: 20px;
}

.goodsList-top {
    width: 100%;
    height: 114px;
    margin: 0 auto;
    background-color: #fafbfa;
    padding-left: 20px;
    line-height: 40px;
}

.goodsList-top .rent-top {
    font-size: 14px;
}

.reat-search .search {
    width: 220px;
    height: 30px;
    float: left;
}

.reat-search .time {
    margin-left: 38px;
}

.select .el-select {
    width: 131px;
    margin-left: 10px;
}

.reat-search .button {
    width: 150px;
    height: 30px;
}

.button .el-button {
    width: 150px;
    background-color: #2450d2;
    border-radius: 8px;
}

.text-button {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: right;
}
.text-button .delButton {
    width: 100px;
    height: 35px;
    font-size: 14px;
    padding: 0;
    color: #fff;
    border-radius: 8px;
    background-color: #ff0000;
}
.el-table .el_button {
    width: 70px;
    height: 30px;
    font-size: 14px;
}

.tab_button {
    background-color: #2450d2;
    color: #fff;
    width: 70px;
    height: 30px;
    font-size: 14px;
    line-height: 0px;
    font-size: 10px;
    border-radius: 8px;
}

.bj_button {
    background-color: #109955;
    width: 70px;
    height: 30px;
    font-size: 14px;
    color: #fff;
    line-height: 0px;
    font-size: 8px;
    border-radius: 8px;
}

.del_button {
    background-color: #ff0000;
    width: 70px;
    height: 30px;
    font-size: 14px;
    color: #fff;
    line-height: 0px;
    font-size: 8px;
    border-radius: 8px;
}

.el-textarea__inner {
    width: 500px;
    height: 150px;
}
.query {
    width: 150px;
    height: 30px;
    background-color: #2450d2;
    color: #fff;
    padding: 0;
}
.elinitgoods {
    width: 210px;
}
.el-input__inner {
    height: 30px;
    line-height: 30px;
}
.el-date-editor .el-range-separator {
    line-height: 24px;
}
</style>
