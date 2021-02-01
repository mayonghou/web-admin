<template>
    <div
        id="activityList"
        class="activityList activitwenzhang"
        v-loading="fullscreenLoading"
        :element-loading-text="loadingText"
        element-loading-background="rgba(0, 0, 0, 0.7)"
    >
        <div class="activit-top">
            <div class="activit-label">
                <label>动态查询</label>
            </div>
            <div class="activit-search">
                <el-input class="activit-S" v-model="activitSeach" placeholder="请输入动态关键字"></el-input>
                <i
                    style="font-size: 22px; color: #2494D2; margin-left: 20px; margin-right: 20px"
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
                <el-select v-model="type" style="margin-left: 20px" placeholder="动态类型">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <el-button @click="activitQuery" class="query">查询</el-button>
            </div>
        </div>
        <div class="activit-add">
            <el-button @click="activitAddDynamic" class="btn">发布文章动态</el-button>
            <el-button @click="delAddDynamic" class="delDynamicbtn">全部删除</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%;" @selection-change="changeDynamic">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width align="center"></el-table-column>
            <el-table-column prop="title" label="动态标题" align="center" width></el-table-column>
            <el-table-column prop="pushName" label="发布人" align="center" width></el-table-column>
            <el-table-column prop="phone" label="手机号码" align="center" width></el-table-column>
            <el-table-column prop="isOfficial" label="动态类型" align="center" width>
                <template slot-scope="scope">
                    <label>{{ scope.row.isOfficial == 1 ? '官方动态' : '普通动态' }}</label>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="发布时间" width="180" align="center"></el-table-column>
            <el-table-column label="操作" width="250" align="center">
                <template slot-scope="scope">
                    <el-button @click="lookdetail(scope.row)" class="lookvideo">查看详情</el-button>
                    <el-button @click="editDynamic(scope.row)" class="editDynamic">编辑</el-button>
                    <el-button @click="delDynamic(scope.row)" class="delDynamic">删除</el-button>
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
            type: '',
            options: [
                {
                    value: '0',
                    label: '普通动态'
                },
                {
                    value: '1',
                    label: '官方动态'
                }
            ],
            endTime: '',
            tableData: [],
            page: 1,
            limit: 10,
            counts: this.counts,
            fullscreenLoading: true,
            loadingText: '加载中...',
            DynamicID: []
        };
    },
    mounted() {
        this.getArticDynamic();
    },
    methods: {
        changeDynamic(val) {
            this.DynamicID = val;
        },
        delAddDynamic() {
            var name = [];
            var id = [];
            this.DynamicID.forEach(function (val, index) {
                name[index] = val.title;
                id[index] = val.id;
            });
            this.$confirm('是否确定将文章动态【' + name + '】-删除?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (this.DynamicID == '') {
                    return this.$message({
                        showClose: true,
                        message: '请选择要删除的动态',
                        type: 'error'
                    });
                } else {
                    const loading = this.$loading({
                        lock: true,
                        text: '批量删除中...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.$axios.post('admin/admin/company/delete/bathDelete', id).then((res) => {
                        loading.close();
                        if (res.status == 200) {
                            var data = res.data;
                            if (data.code == 200) {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'success'
                                });
                                this.getArticDynamic();
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
        // 时间戳
        templateTime(value) {
            if (value != null) {
                var date = new Date(value[0]);
                var start = date.getTime(date);
                this.startTime = start;
                var date1 = new Date(value[1]);
                var end = date1.getTime(date1);
                this.endTime = end;
            } else if (value == null) {
                this.startTime = '';
                this.endTime = '';
            }
        },
        // 活动查询
        activitQuery() {
            this.page = 1;
            this.getArticDynamic();
        },
        // 查看详情
        lookdetail(row) {
            this.$router.push({
                path: './articDynaminDetail',
                query: {
                    id: row.id
                }
            });
        },
        // 删除
        delDynamic(row) {
            this.$confirm('是否确定删除【' + row.title + '】文章动态?', '温馨提示', {
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
                this.$axios.get('admin/admin/company/delDynamicById?id=' + row.id).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.getArticDynamic();
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
        activitAddDynamic() {
            this.$router.push({
                path: './addarticDynamic'
            });
        },
        // 编辑
        editDynamic(row) {
            this.$router.push({
                path: './editArticDynamic',
                query: {
                    data: row
                }
            });
        },

        // 页码
        handleSizeChange(val) {
            this.limit = val;
            this.getArticDynamic();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getArticDynamic();
        },
        getArticDynamic() {
            let data = {
                articleType: this.type || -1,
                page: this.page,
                limit: this.limit,
                pushEndDate: this.endTime,
                pushStartDate: this.startTime,
                search: this.activitSeach,
                type: 1,
                company: localStorage.getItem('companyName')
            };
            this.$axios.post('admin/admin/company/selectAllDynamic', data).then((res) => {
                this.fullscreenLoading = false;
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        var dataList = [];
                        data.data.forEach(function (val, index) {
                            dataList[index] = val;
                            let date = new Date(val);
                            let time1 =
                                date.getFullYear() +
                                '-' +
                                (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                                '-' +
                                date.getDate();
                            dataList[index].time = time1;
                        });
                        this.tableData = dataList;
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
    width: 104px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    background-color: #2482d2;
    color: #fff;
    border-radius: 8px;
    padding: 0;
}
.activit-add .delDynamicbtn {
    width: 104px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    background-color: #ff0000;
    color: #fff;
    border-radius: 8px;
    padding: 0;
}

.el-table .lookvideo {
    width: 70px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    padding: 0;
    background-color: #2450d2;
    color: #fff;
    border-radius: 8px;
}
.el-table .editDynamic {
    width: 63px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    padding: 0;
    background-color: #109955;
    color: #fff;
    border-radius: 8px;
}
.el-table .delDynamic {
    width: 63px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    padding: 0;
    background-color: #ff0000;
    color: #fff;
    border-radius: 8px;
}
.activitwenzhang .el-table .cell {
    width: 100%;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.el-input__inner {
    height: 30px;
    line-height: 30px;
}
.el-date-editor .el-range-separator {
    line-height: 24px;
}
</style>
