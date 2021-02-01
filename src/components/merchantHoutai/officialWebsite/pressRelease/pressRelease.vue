<template>
    <!-- 新闻发布 -->
    <div
        class="productCase"
        id="pressrelease"
        v-loading="fullscreenLoading"
        :element-loading-text="loadingText"
        element-loading-background="rgba(0, 0, 0, 0.7)"
    >
        <div class="productCase-top">
            <label class="changpin">新闻公告查询</label>
            <div class="shangpinganli">
                <el-input v-model="input" class="input-width" placeholder="输入新闻公告查询"></el-input>
                <el-button @click="chanpinChaxun" class="query">查询</el-button>
            </div>
        </div>
        <div class="product-btn">
            <el-button @click="addpeouct" class="btn">发布新闻公告</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column prop="index" type="index" align="center" label="序号"></el-table-column>
            <el-table-column prop="title" align="center" label="新闻公告标题"></el-table-column>
            <el-table-column prop="imgUrl" align="center" label="图片">
                <template slot-scope="scope">
                    <img width="160" height="80" :src="scope.row.imgUrl" />
                </template>
            </el-table-column>
            <el-table-column prop="content" align="center" label="新闻公告描述">
                <template slot-scope="scope">
                    <div class="contentNew">{{scope.row.content}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="time" align="center" label="发布时间"></el-table-column>
            <el-table-column label="操作" width="220" align="center">
                <template slot-scope="scope">
                    <el-button @click="lookcompile(scope.row)" class="tab_button">查看</el-button>
                    <el-button @click="del_Release(scope.row)" class="del_button">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'pressrelease',
    data() {
        return {
            input: '',
            tableData: [],
            fullscreenLoading: true,
            loadingText: '加载中...'
        };
    },
    mounted() {
        this.getReleaseData();
    },
    methods: {
        chanpinChaxun() {
            this.getReleaseData();
        },
        // 查看
        lookcompile(row) {
            this.$router.push({
                path: './lookpressRelease',
                query: {
                    data: row
                }
            });
        },
        // 删除
        del_Release(row) {
            this.$confirm('是否确定删除新闻公告【' + row.title + '】', '温馨提示', {
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
                this.$axios
                    .get('api/partner/delete/company/news?id=' + localStorage.getItem('loginData') + '&newId=' + row.newId)
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
                                this.getReleaseData();
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
        handleSizeChange(val) {
            this.limit = val;
            this.getReleaseData();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getReleaseData();
        },
        addpeouct() {
            this.$router.push({
                path: './addpressRelease'
            });
        },
        getReleaseData() {
            this.$axios.get('api/partner/query/website?id=' + localStorage.getItem('loginData')).then((res) => {
                this.fullscreenLoading = false;
                if (res.status == 200 && res.data.code == 200) {
                    let data = res.data;
                    var dataLsit = [];
                    var aaas = /^(https):\/\/ /;
                    data.data.news.forEach(function (val, index) {
                        dataLsit[index] = val;
                        if (aaas.test(val.albumPics[0].split(',')[0])) {
                            dataLsit[index].imgUrl = val.albumPics[0].split(',')[0];
                        } else {
                            dataLsit[index].imgUrl = localStorage.getItem('imgUrl') + val.albumPics[0].split(',')[0];
                        }
                        var date = new Date(val.time);
                        dataLsit[index].time =
                            date.getFullYear() +
                            '-' +
                            (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                            '-' +
                            date.getDate();
                    });
                    this.tableData = dataLsit;
                } else {
                    this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'error'
                    });
                }
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
    width: 90px;
    height: 30px;
    background: #42a7ff;
    color: #fff;
    padding: 0;
    border-radius: 8px;
}
.el-table .del_button {
    width: 70px;
    height: 30px;
    font-size: 14px;
    padding: 0;
    background: #ff0000;
    color: #fff;
}
.el-table .tab_button {
    width: 70px;
    height: 30px;
    font-size: 14px;
    background: #3a9df4;
    color: #fff;
    padding: 0;
}
.contentNew {
    width: 100%;
    /* height: 200px; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.el-input__inner {
    height: 30px;
    line-height: 30px;
}
.el-date-editor .el-range-separator {
    line-height: 24px;
}
</style>
