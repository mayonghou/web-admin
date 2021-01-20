<template>
    <div
        id="activityList"
        class="activityList tablistddd"
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
                    style="font-size: 22px; color: #2494d2; margin-left: 20px; margin-right: 20px"
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
            <el-button @click="activitAdd" class="btn">发布图文动态</el-button>
            <el-button @click="delAllstate" class="delAlltbn">全部删除</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%;" @selection-change="changeSelect">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width align="center"></el-table-column>
            <el-table-column prop="details" label="动态详情" align="center" width></el-table-column>
            <el-table-column prop="pushName" label="发布人" align="center" width></el-table-column>
            <el-table-column prop="phone" label="手机号码" align="center" width></el-table-column>
            <el-table-column prop="isOfficial" label="动态类型" align="center" width>
                <template slot-scope="scope">
                    <label>{{ scope.row.isOfficial == 0 ? '普通动态' : '官方动态' }}</label>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="发布时间" width="180" align="center"></el-table-column>
            <el-table-column label="操作" width="250" align="center">
                <template slot-scope="scope">
                    <el-button @click="lookdetail(scope.row)" class="lookvideo">查看详情</el-button>
                    <el-button @click="updateEdit(scope.row)" class="updateEdit">编辑</el-button>
                    <el-button @click="delstate(scope.row)" class="delstate">删除</el-button>
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
    components: {},
    data() {
        return {
            activitSeach: '',
            time: '',
            startTime: '0',
            endTime: '0',
            type: '',
            fullscreenLoading: false,
            loadingText: '加载中...',
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
            tableData: [],
            page: 1,
            limit: 10,
            counts: this.counts,
            stateID: []
        };
    },
    mounted() {
        this.getSelectAllDynamic();
    },
    methods: {
        changeSelect(val) {
            this.stateID = val;
        },
        delAllstate() {
            var name = [];
            var id = [];
            this.stateID.forEach(function (val, index) {
                name[index] = val.pushName;
                id[index] = val.id;
            });
            if (this.stateID == '') {
                return this.$message({
                    showClose: true,
                    message: '请选择要删除的动态',
                    type: 'error'
                });
            } else {
                this.$confirm('是否确定将【' + name + '】发布的图文动态删除?', '温馨提示', {
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
                                this.getSelectAllDynamic();
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
            this.getSelectAllDynamic();
        },
        // 查看详情
        lookdetail(row) {
            this.$router.push({
                path: './DynamicDetail',
                query: {
                    id: row.id
                }
            });
        },
        // 删除
        delstate(row) {
            this.$confirm('是否确定删除【' + row.pushName + '】发布图文动态?', '温馨提示', {
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
                            this.getSelectAllDynamic();
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
        // 编辑
        updateEdit(row) {
            this.$router.push({
                path: './editDynamic',
                query: {
                    data: row,
                    page: this.page
                }
            });
        },
        // 发布按钮
        activitAdd() {
            this.$router.push({
                path: './addDynamic'
            });
        },
        // 页码
        handleSizeChange(val) {
            this.limit = val;
            this.getSelectAllDynamic();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getSelectAllDynamic();
        },
        getSelectAllDynamic() {
            let data = {
                articleType: this.type || -1,
                page: this.page,
                limit: this.limit,
                pushEndDate: this.endTime,
                pushStartDate: this.startTime,
                search: this.activitSeach,
                type: 2,
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
}
.activit-top .activit-label {
    padding-top: 10px;
    padding-left: 20px;
}
.activit-search {
    margin-top: 13px;
    padding-left: 20px;
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
    background-color: #2482d2;
    color: #fff;
    border-radius: 8px;
    padding: 0;
    font-size: 14px;
    line-height: 30px;
}
.activit-add .delAlltbn {
    width: 104px;
    height: 30px;
    background-color: #ff0000;
    color: #fff;
    border-radius: 8px;
    padding: 0;
    font-size: 14px;
    line-height: 30px;
}

.el-table .lookvideo {
    width: 70px;
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    padding: 0;
    background-color: #2450d2;
    color: #fff;
    border-radius: 8px;
}
.el-table .delstate {
    width: 63px;
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    padding: 0;
    background-color: #ff0000;
    color: #fff;
    border-radius: 8px;
}
.el-table .updateEdit {
    width: 63px;
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    padding: 0;
    background-color: #109955;
    color: #fff;
    border-radius: 8px;
}
.overhidden {
    overflow: hidden;
}
.tablistddd .el-table .cell {
    width: 100%;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
