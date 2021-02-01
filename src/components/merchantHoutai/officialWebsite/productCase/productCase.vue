<template>
    <!-- 产品案例 -->
    <div
        class="productCase"
        id="productCase"
        v-loading="fullscreenLoading"
        :element-loading-text="loadingText"
        element-loading-background="rgba(0, 0, 0, 0.7)"
    >
        <div class="productCase-top">
            <label class="changpin">产品案例查询</label>
            <div class="shangpinganli">
                <el-input v-model="input" class="input-width" placeholder="输入案例标题"></el-input>
                <el-button @click="chanpinChaxun" class="query">查询</el-button>
            </div>
        </div>
        <div class="product-btn">
            <el-button @click="addpeouct" class="btn">新增产品案例</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%;" border>
            <el-table-column type="selection" width></el-table-column>
            <el-table-column prop="index" type="index" align="center" label="序号"></el-table-column>
            <el-table-column prop="image" align="center" label="产品图片和视频">
                <template slot-scope="scope">
                    <img
                        width="100"
                        height="100"
                        v-show="scope.row.isshow == true"
                        :src="scope.row.image"
                    />
                    <video
                        ref="videoPlayer"
                        width="400"
                        v-show="scope.row.isshow == false"
                        height="200"
                        controls
                        controlslist="nodownload"
                        :src="scope.row.image"
                        class="video"
                    ></video>
                </template>
            </el-table-column>
            <el-table-column prop="title" align="center" label="产品描述"></el-table-column>
            <el-table-column label="操作" width="220" align="center">
                <template slot-scope="scope">
                    <el-button @click="compile(scope.row)" class="tab_button">编辑</el-button>
                    <el-button @click="del_compile(scope.row)" class="del_button">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'productCase',
    data() {
        return {
            input: '',
            page: 1,
            limit: 10,
            counts: this.counts,
            tableData: [],
            fullscreenLoading: true,
            loadingText: '加载中...'
        };
    },
    mounted() {
        this.getDataList();
    },
    methods: {
        // 编辑
        compile(row) {
            this.$router.push({
                path: './uodateProductCase',
                query: {
                    data: row
                }
            });
        },
        // 删除
        del_compile(row) {
            this.$confirm('是否确定删除产品案例【 ' + row.title + '】', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: '删除中 ...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios
                    .get('api/partner/delete/company/server?id=' + localStorage.getItem('loginData') + '&serverId=' + row.serverId)
                    .then((res) => {
                        loading.close();
                        if (res.status == 200) {
                            var data = res.data;
                            if (data.code == 200) {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'success'
                                });
                                this.getDataList();
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
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    });
            });
        },
        chanpinChaxun() {
            this.getDataList();
        },
        getDataList() {
            this.$axios.get('api/partner/query/website?id=' + localStorage.getItem('loginData')).then((res) => {
                this.fullscreenLoading = false;
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        var ddddList = [];
                        const https = /^(https):\/\/.+$/;
                        const aaas = /\.(png|svg|jpg|gif|woff|woff2|svg|eot|ttf)$/;
                        data.data.service.forEach(function (val, index) {
                            ddddList[index] = val;
                            if (https.test(val.image) == true) {
                                if (aaas.test(val.image) == true) {
                                    ddddList[index].isshow = true;
                                    ddddList[index].image = val.image;
                                } else {
                                    ddddList[index].isshow = false;
                                    ddddList[index].image = val.image;
                                }
                            } else {
                                if (aaas.test(val.image)) {
                                    ddddList[index].isshow = true;
                                    ddddList[index].image = localStorage.getItem('imgUrl') + val.image;
                                } else {
                                    ddddList[index].isshow = false;
                                    ddddList[index].image = localStorage.getItem('imgUrl') + val.image;
                                }
                            }
                        });
                        this.tableData = ddddList;
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
        },
        addpeouct() {
            this.$router.push({
                path: './addProductCase'
            });
        }
    }
};
</script>

<style>
.productCase {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
}
.productCase-top {
    width: 100%;
    height: 114px;
    background: #fafbfa;
    margin-top: 20px;
}
.changpin {
    display: inline-block;
    margin-top: 15px;
    margin-left: 20px;
}
.input-width {
    width: 200px;
}
.shangpinganli {
    margin-top: 10px;
    margin-left: 20px;
}
.shangpinganli .query {
    width: 150px;
    height: 35px;
    background: #2450d2;
    color: #fff;
    margin-left: 20px;
}
.product-btn {
    text-align: right;
    width: 100%;
    height: 50px;
    line-height: 50px;
}
.product-btn .btn {
    width: 100px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    background: #42a7ff;
    color: #fff;
    padding: 0;
    border-radius: 8px;
}
.el-table .del_button {
    width: 66px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    padding: 0;
    background: #ff0000;
    color: #fff;
}
.el-table .tab_button {
    width: 66px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    background: #3a9df4;
    color: #fff;
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
