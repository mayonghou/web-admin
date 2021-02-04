<template>
    <div
        id="renting"
        class="renting"
        v-loading="fullscreenLoading"
        :element-loading-text="loadingText"
        element-loading-background="rgba(0, 0, 0, 0.7)"
    >
        <div class="renting-top">
            <div class="rent-top">
                <label>房源查询</label>
            </div>
            <div class="reat-search">
                <el-input v-model="input" class="input-width" placeholder="输入房源"></el-input>
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
                    value-format="yyyy-MM-dd"
                    @change="timeCuo"
                ></el-date-picker>
                <el-select
                    class="select-el"
                    v-model="value"
                    @change="changetype"
                    placeholder="房源类型"
                    clearable
                >
                    <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.typeName"
                        :value="item.id"
                    ></el-option>
                </el-select>
                <el-button @click="queryRent" class="query">查询</el-button>
            </div>
        </div>
        <div class="text-button">
            <el-button @click="delbutton" class="delbutton">全部删除</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100;" @selection-change="delallselection">
            <el-table-column type="selection" width align="center"></el-table-column>
            <el-table-column prop="houseTitle" label="房源名称" align="center" width="180"></el-table-column>
            <el-table-column prop="publisher" label="发布人" align="center" width></el-table-column>
            <el-table-column prop="phone" label="手机号码" align="center"></el-table-column>
            <el-table-column prop="status" label="房源状态" align="center"></el-table-column>
            <el-table-column prop="typeName" label="房源类型" align="center"></el-table-column>
            <el-table-column prop="time" label="下架时间" align="center"></el-table-column>
            <el-table-column label="操作" width="250" align="center">
                <template slot-scope="scope">
                    <el-button @click="btn_detail(scope.row)" class="tab_buttons tab">查看详情</el-button>
                    <el-button @click="xiajia_enterprise(scope.row)" class="del_button">上架</el-button>
                    <el-button @click="del_enter(scope.row)" class="red_button">删除</el-button>
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
    name: 'renting',
    data() {
        return {
            input: '',
            time: '',
            value: '',
            fullscreenLoading: true,
            loadingText: '加载中...',
            reatState: '',
            tableData: [],
            options: [],
            reatStates: [
                // {
                // 	value: 0,
                // 	label: '未审核'
                // }, {
                // 	value: 1,
                // 	label: '审核通过'
                // },
                // {
                // 	value: 2,
                // 	label: '上架'
                // },
                {
                    value: 3,
                    label: '下架'
                }
                // {
                // 	value: 4,
                // 	label:'审核失败'
                // }
            ],
            page: 1,
            limit: 10,
            counts: this.counts,
            rentypeName: '',
            timeStart: '',
            timeEnd: '',
            dataID: []
        };
    },
    mounted() {
        this.gettypeAll();
        this.postRenting();
    },
    methods: {
        delallselection(val) {
            this.dataID = val;
            console.log(val);
        },
        delbutton() {
            var name = [];
            var id = [];
            this.dataID.forEach(function (val, index) {
                name[index] = val.houseTitle;
                id[index] = val.id;
            });
            if (this.dataID == '') {
                return this.$message({
                    showClose: true,
                    message: '请选择要删除的房源',
                    type: 'error'
                });
            } else {
                this.$confirm('是否确定将职位【' + name + '】-删除?', '温馨提示', {
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
                    this.$axios.post('admin/renting/manage/delete/bathDelete', id).then((res) => {
                        loading.close();
                        if (res.status == 200) {
                            var data = res.data;
                            if (data.code == 200) {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'success'
                                });
                                this.postRenting();
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
        timeCuo(value) {
            if (value != null) {
                var date = new Date(value[0]);
                var startTime = date.getTime(date);
                var date1 = new Date(value[1]);
                var endTime = date1.getTime(date1);
                this.timeStart = startTime;
                this.timeEnd = endTime;
            } else if (value == null) {
                this.timeStart = '';
                this.timeEnd = '';
            }
        },
        changetype(value) {
            if (value != '') {
                let obj = {};
                obj = this.options.find((item) => {
                    return item.id === value;
                });
                this.rentypeName = obj.typeName;
            } else {
                this.rentypeName = '';
            }
        },
        // 查看详情
        btn_detail(row) {
            this.$router.push({
                path: './dateilrenting',
                query: {
                    id: row.id,
                    status: row.status
                }
            });
        },
        // 删除
        del_enter(row) {
            this.$confirm('是否确定删除【' + row.houseTitle + '】的房源?', '温馨提示', {
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
                this.$axios.get('admin/renting/manage/delete/' + row.id).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.postRenting();
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
        // 上架
        xiajia_enterprise(row) {
            this.$router.push({
                path: './updaterenting',
                query: {
                    data: row.id
                }
            });
        },
        // 页码
        handleSizeChange(val) {
            this.limit = val;
            this.postRenting();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.postRenting();
        },
        // 查询房屋类型
        gettypeAll() {
            this.$axios.get('admin/renting/type/selectAllType').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.options = data.data.data;
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
        // 查询按钮
        queryRent() {
            this.postRenting();
            this.page = 1;
        },
        // 查询房屋列表
        postRenting() {
            let date = {
                houseTitle: this.input,
                pushEndDate: this.timeEnd,
                pushStartDate: this.timeStart,
                status: 3,
                typeName: this.rentypeName,
                page: this.page,
                limit: this.limit,
                company: localStorage.getItem('companyName')
            };
            this.$axios.post('admin/renting/manage/search', date).then((res) => {
                this.fullscreenLoading = false;
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        var list = [];
                        data.data.data.forEach(function (val, index) {
                            list[index] = val;
                            list[index].status = val.status == '3' ? '下架' : '';
                            var date = new Date(val.offDate);
                            var time1 =
                                date.getFullYear() +
                                '-' +
                                (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                                '-' +
                                date.getDate();
                            list[index].time = time1;
                        });
                        this.tableData = list;
                        this.counts = data.data.total;
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
.fl {
    float: left;
}
.text-button {
    width: 100%;
    height: 40px;
    line-height: 40px;
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
.query {
    width: 150px;
    height: 30px;
    background-color: #2450d2;
    color: #fff;
    padding: 0;
    margin-left: 10px;
}
.el-select {
    margin-left: 10px;
}
/* .select-el .el-input__inner{
		width: 130px;
	} */
.renting {
    padding: 20px;
}
.input-width {
    width: 200px;
}
.el-date-editor {
    width: 260px;
}
.renting-top {
    width: 100%;
    margin: 0 auto;
    height: 114px;
    background-color: #fafbfa;
    padding-left: 20px;
    line-height: 40px;
}

.renting-top .rent-top {
    font-size: 14px;
    margin-left: 20px;
}
.reat-search {
    margin-left: 20px;
}
.reat-search .search {
    width: 220px;
    height: 30px;
    float: left;
    margin-left: 20px;
}

.reat-search .time {
    float: left;
    margin-left: 38px;
}

.reat-search .select {
    float: left;
    /* margin-left: 10px; */
}

.select .el-select {
    width: 100px;
    margin-left: 10px;
}

.reat-search .button {
    float: left;
    width: 150px;
    height: 30px;
    margin-left: 10px;
}

.button .el-button {
    width: 150px;
    background-color: #2450d2;
    border-radius: 8px;
}

.el-table .el_button {
    font-size: 10px;
}

/* .renting .pagintion {
    margin-left: 25%;
		padding-top: 30px;
} */

.renting .tab_buttons.tab {
    background-color: #2450d2;
    width: 70px;
    height: 30px;
    color: #fff;
    line-height: 30px;
    font-size: 14px;
    border-radius: 8px;
    padding: 0;
}

.bj_button {
    background-color: #109955;
    width: 50px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #fff;
    border-radius: 8px;
    padding: 0;
}

.del_button {
    background-color: #109955;
    width: 50px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #fff;
    border-radius: 8px;
    padding: 0;
}
.red_button {
    background-color: #ff0000;
    width: 50px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #fff;
    border-radius: 8px;
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
