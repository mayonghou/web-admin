<template>
    <div
        id="xiajiaJobVacancy"
        class="renting"
        v-loading="fullscreenLoading"
        :element-loading-text="loadingText"
        element-loading-background="rgba(0, 0, 0, 0.7)"
    >
        <div class="renting-top">
            <div class="rent-top">
                <label>职位查询</label>
            </div>
            <div class="reat-search">
                <el-input v-model="input" class="input-width" placeholder="输入职位名称"></el-input>
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
                    @change="templateTime"
                ></el-date-picker>
                <el-select class="select-el" v-model="value" placeholder="全部行业" clearable>
                    <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
                <el-button @click="queryxaijia" class="query">查询</el-button>
            </div>
        </div>
        <div class="text-button">
            <el-button @click="delbutton" class="delbutton">全部删除</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%;" @selection-change="selCahnge">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column prop="jobName" label="职位名称" width="180" align="center"></el-table-column>
            <el-table-column prop="contact" label="发布人" width align="center"></el-table-column>
            <el-table-column prop="tel" label="手机号码" align="center"></el-table-column>
            <el-table-column prop="status" label="职位状态" align="center"></el-table-column>
            <el-table-column prop="industryName" label="所属行业" align="center"></el-table-column>
            <el-table-column prop="positionType" label="职位类型" align="center"></el-table-column>
            <el-table-column prop="offDate" label="下架时间" width="120" align="center"></el-table-column>
            <el-table-column label="操作" width="250" align="center">
                <template slot-scope="scope">
                    <el-button @click="btn_detail(scope.row)" class="tab_button">查看详情</el-button>
                    <el-button @click="changjia_prise(scope.row)" class="bj_button">上架</el-button>
                    <el-button @click="del_jobVacanay(scope.row)" class="del_buttons">删除</el-button>
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
    name: 'xiajiaJobVacancy',
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
            page: 1,
            limit: 10,
            counts: this.counts,
            startTime: '',
            endTime: '',
            dataID: []
        };
    },
    mounted() {
        this.getShelfStatusList();
        this.getindustryList();
    },
    methods: {
        selCahnge(val) {
            this.dataID = val;
        },
        delbutton() {
            var name = [];
            var id = [];
            this.dataID.forEach(function (val, index) {
                name[index] = val.jobName;
                id[index] = val.id;
            });
            if (this.dataID == '') {
                return this.$message({
                    showClose: true,
                    message: '请选择要删除的职位',
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
                    this.$axios.post('admin/job/manage/delete/bathDelete', id).then((res) => {
                        loading.close();
                        if (res.status == 200) {
                            var data = res.data;
                            if (data.code == 200) {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'success'
                                });
                                this.getShelfStatusList();
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
        getindustryList() {
            this.$axios.get('admin/industry/list').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.options = data.data;
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
        addjobvac() {
            this.$router.push({
                path: './addjobVacancy'
            });
        },
        //上架
        changjia_prise(row) {
            this.$router.push({
                path: './updateJobVacancy',
                name: 'updateJobVacancy',
                params: {
                    data: row
                }
            });
        },
        // 删除职位
        del_jobVacanay(row) {
            this.$confirm('是否确定删除职位【' + row.jobName + '】?', '温馨提示', {
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
                this.$axios.get('admin/job/manage/delete/' + row.id).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.getShelfStatusList();
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
        // 查看详情
        btn_detail(row) {
            this.$router.push({
                path: './lookJobVacancy',
                query: {
                    id: row.id,
                    status: row.status
                }
            });
        },
        // 页码
        handleSizeChange(val) {
            this.limit = val;
            this.getShelfStatusList();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getShelfStatusList();
        },
        queryxaijia() {
            this.page = 1;
            this.getShelfStatusList();
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
        // 查询下架职位列表
        getShelfStatusList() {
            let data = {
                page: this.page,
                limit: this.limit,
                pushEndDate: this.endTime || 0,
                pushStareDate: this.startTime || 0,
                jobName: this.input,
                companyId: parseInt(localStorage.getItem('loginData')),
                industryId: this.value || 0, //行业id
                status: '3',
                company: localStorage.getItem('companyName')
            };
            this.$axios.post('admin/job/manage/getList', data).then((res) => {
                this.fullscreenLoading = false;
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        var ListData = [];
                        data.data.data.jobDetailDTOS.forEach(function (val, index) {
                            ListData[index] = val;
                            ListData[index].status = val.status == 3 ? '下架' : '';
                            var date = new Date(val.offDate);
                            var time1 =
                                date.getFullYear() +
                                '-' +
                                (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                                '-' +
                                date.getDate();
                            ListData[index].offDate = time1;
                        });
                        this.tableData = ListData;
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
    margin-left: 10px;
}

.el-select {
    margin-left: 10px;
}

.select-el .el-input__inner {
    width: 130px;
}

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
    height: 114px;
    margin: 0 auto;
    background-color: #fafbfa;
    padding-left: 20px;
    line-height: 40px;
}

.renting-top .rent-top {
    font-size: 14px;
}

.reat-search .search {
    width: 220px;
    height: 30px;
    float: left;
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
    width: 131px;
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

.tab_button {
    background-color: #2450d2;
    width: 70px;
    height: 30px;
    color: #fff;
    line-height: 0px;
    font-size: 8px;
    border-radius: 8px;
    padding: 0;
    line-height: 30px;
    font-size: 14px;
}

.bj_button {
    background-color: #109955;
    width: 50px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #fff;
    font-size: 8px;
    border-radius: 8px;
    padding: 0;
}

.del_buttons {
    background-color: #ff0000;
    width: 50px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    padding: 0;
    color: #fff;
    font-size: 8px;
    border-radius: 8px;
}

.el-loading-mask {
    width: 100%;
    height: 100%;
}
.el-input__inner {
    height: 30px;
    line-height: 30px;
}
.el-date-editor .el-range-separator {
    line-height: 24px;
}
</style>
