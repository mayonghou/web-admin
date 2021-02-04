<template>
    <div
        id="jobVacancy"
        class="renting jobVacancy"
        v-loading="fullscreenLoading"
        :element-loading-text="loadingText"
        element-loading-background="rgba(0, 0, 0, 0.7)"
    >
        <div class="renting-top">
            <div class="rent-top">
                <label>职位查询</label>
            </div>
            <div class="reat-search">
                <el-date-picker
                    v-model="time"
                    type="daterange"
                    unlink-panels
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    @change="templateTime"
                ></el-date-picker>
                <el-select
                    class="select-el"
                    style
                    v-model="value"
                    placeholder="全部行业"
                    clearable
                    @change="industryId"
                >
                    <el-option
                        v-for="item in optionslist"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
                <el-select
                    class="select-el"
                    v-model="value2"
                    placeholder="行业下的职位"
                    clearable
                    @change="zhiweiName"
                >
                    <el-option
                        v-for="item in optionpos"
                        :key="item.id"
                        :label="item.jobName"
                        :value="item.id"
                    ></el-option>
                </el-select>
                <el-select class="select-el" v-model="reatState" placeholder="全部职位状态" clearable>
                    <el-option
                        v-for="item in reatStates"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <el-button @click="queryJob" class="query">查询</el-button>
            </div>
        </div>
        <div class="text-button">
            <el-button @click="addjobvac" class="addbutton">发布招聘</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%;" border>
            <el-table-column prop="jobName" label="职位名称" align="center" width="180"></el-table-column>
            <el-table-column prop="contact" label="发布人" align="center"></el-table-column>
            <el-table-column prop="tel" label="手机号码" align="center"></el-table-column>
            <el-table-column prop="status" label="职位状态" align="center"></el-table-column>
            <el-table-column prop="industryName" label="所属行业" align="center"></el-table-column>
            <el-table-column prop="positionType" label="职位类型" align="center"></el-table-column>
            <el-table-column prop="publishDate" label="发布时间" align="center" width="130"></el-table-column>
            <el-table-column label="操作" width="250" align="center">
                <template slot-scope="scope">
                    <el-button @click="btn_detail(scope.row)" type="text" class="tab_button">查看详情</el-button>
                    <!-- <el-button @click="updateRenting(scope.row)" type="text" class="bj_button">修改</el-button>
                    <el-button @click="updateRenting(scope.row)" type="text" class="bj_button">重新发布</el-button>-->
                    <el-button @click="del_prise(scope.row)" type="text" class="del_button">下架</el-button>
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
import { formatDate } from '../../../assets/Time.js';
export default {
    name: 'jobVacancy',
    data() {
        return {
            input: '',
            time: '',
            value: '',
            value2: '',
            fullscreenLoading: true,
            loadingText: '加载中...',
            reatState: '',
            tableData: [],
            optionslist: [],
            optionsdata: [],
            reatStates: [
                {
                    value: 0,
                    label: '未审核'
                },
                {
                    value: 1,
                    label: '已审核'
                },
                {
                    value: 2,
                    label: '上架'
                }
            ],
            page: 1,
            limit: 10,
            counts: this.counts || 1,
            date1: '',
            startTime: '',
            endTime: '',
            optionpos: [],
            jobName: ''
        };
    },
    mounted() {
        this.getindustryList();
        // this.getPositionList();
        this.postManageList();
    },
    methods: {
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
        addjobvac() {
            this.$router.push({
                path: './addjobVacancy'
            });
        },
        bhbbhhb(value) {},
        updateRenting(row) {
            this.$router.push({
                path: './updateJobVacancy'
            });
        },
        // 查看职位详情
        btn_detail(row) {
            this.$router.push({
                path: './lookJobVacancy',
                query: {
                    id: row.id,
                    status: row.status
                }
            });
        },
        //下架
        del_prise(row) {
            this.$confirm('是否确定下架【' + row.jobName + '】的职位?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: '下架中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios.get('admin/job/manage/update/status?id=' + row.id + '&status=3').then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.postManageList();
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
            this.postManageList();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.postManageList();
        },
        handleChange(value) {},
        // 查询按钮
        queryJob() {
            this.page = 1;
            this.postManageList();
        },
        // 查询行业
        getindustryList() {
            this.$axios.get('admin/industry/list').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.optionslist = data.data;
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
        industryId(val) {
            if (val != '') {
                this.getPositionList(val);
            }
        },
        // 查询行业下的职业
        getPositionList(val) {
            this.$axios.get('admin/job/manage/getPositionList/' + val).then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.optionpos = data.data;
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
        zhiweiName(val) {
            let obj = {};
            obj = this.optionpos.find((item) => {
                return item.id === val;
            });
            this.jobName = obj.jobName;
        },
        // 查询招聘列表
        postManageList() {
            let data = {
                page: this.page,
                limit: this.limit,
                pushEndDate: this.endTime || 0,
                pushStareDate: this.startTime || 0,
                companyId: parseInt(localStorage.getItem('loginData')),
                industryId: this.value || 0, //行业id
                jobName: this.jobName, //搜索词
                status: this.reatState || 2,
                company: localStorage.getItem('companyName')
            };
            this.$axios.post('admin/job/manage/getList', data).then((res) => {
                this.fullscreenLoading = false;
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        var dataList = data.data.data.jobDetailDTOS;
                        var list = [];
                        dataList.forEach(function (val, index) {
                            list[index] = val;
                            list[index].publishDate = val.publishDate;
                            list[index].status = val.status == 2 ? '上架' : '';
                            var date = new Date(val.publishDate);
                            var time1 =
                                date.getFullYear() +
                                '-' +
                                (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                                '-' +
                                date.getDate();
                            list[index].publishDate = time1;
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

.query {
    width: 150px;
    height: 30px;
    background-color: #2450d2;
    color: #fff;
    margin-left: 10px;
}

.jobVacancy .el-select {
    margin-left: 10px;
    width: 200px;
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
.el-loading-mask {
    width: 100%;
    height: 100%;
}

.renting-top .rent-top {
    font-size: 14px;
}

.select .select-el {
    width: 200px;
    margin-left: 10px;
}

.reat-search .button {
    width: 150px;
    height: 30px;
    margin-left: 10px;
}

.text-button {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: right;
}

.text-button .addbutton {
    width: 110px;
    height: 30px;
    padding: 0;
    background-color: #2450d2;
    font-size: 14px;
    border-radius: 8px;
    line-height: 30px;
    color: #fff;
}

.tab_button {
    background-color: #2450d2;
    width: 70px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    font-size: 14px;
    border-radius: 8px;
    padding: 0;
}

.bj_button {
    background-color: #109955;
    width: 50px;
    height: 30px;
    font-size: 14px;
    color: #fff;
    border-radius: 8px;
    padding: 0;
}

.del_button {
    background-color: #ff8d00;
    width: 60px;
    height: 30px;
    font-size: 14px;
    color: #fff;
    border-radius: 8px;
}
.el-input__inner {
    height: 30px;
    line-height: 30px;
}
.el-date-editor .el-range-separator {
    line-height: 24px;
}
</style>
