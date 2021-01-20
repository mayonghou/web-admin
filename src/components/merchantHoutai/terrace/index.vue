<template>
    <div
        id="terraceIndex"
        class="terraceIndex"
        v-loading="fullscreenLoading"
        :element-loading-text="loadingText"
        element-loading-background="rgba(0, 0, 0, 0.7)"
    >
        <!-- 头部企业查询 -->
        <div class="terracr_top">
            <div class="top_text">
                <label>企业查询</label>
            </div>
            <div class="top_search clear">
                <el-input class="asdas" v-model="inputName" placeholder="输入企业、法人名称"></el-input>
                <el-select class="asdas" v-model="value" placeholder="全部行业">
                    <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
                <el-date-picker
                    class="asdas"
                    value-format="yyyy-MM-dd"
                    v-model="time"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                ></el-date-picker>
                <el-button type="primary" @click="queryQY" class="button">查询</el-button>
            </div>
        </div>
        <!-- 删除和添加企业 -->
        <div class="add_Del">
            <el-button @click="del_All" class="tab_delss button">全部删除</el-button>
            <router-link to="addEnterprise">
                <el-button @click="add_enterprise" class="button add_qiye">添加企业</el-button>
            </router-link>
        </div>
        <!-- 表格 -->
        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column type="selection" width align="center"></el-table-column>
            <el-table-column prop="name" label="企业名称" align="center"></el-table-column>
            <el-table-column prop="legal" label="法人姓名" align="center"></el-table-column>
            <el-table-column prop="account" label="管理员账号" align="center"></el-table-column>
            <el-table-column prop="industry" label="所属行业" align="center"></el-table-column>
            <el-table-column prop="teams" label="团队成员" align="center">
                <template slot-scope="scope">
                    <el-link :underline="false" @click="JumpRoute">{{ scope.row.teams }}人</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="time" label="入驻时间" align="center"></el-table-column>
            <el-table-column label="操作" width="350" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" class="tab_button index-btn">密码重置</el-button>
                    <el-button
                        @click="admin(scope.row)"
                        type="text"
                        class="tab_gl tab_button"
                        size="small"
                    >管理</el-button>
                    <el-button @click="edit_enterprise(scope.row)" class="tab_bj tab_button">编辑</el-button>
                    <el-button
                        @click="del_enterprise(scope.row)"
                        type="text"
                        class="tab_del tab_button"
                        size="small"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            class="pagintion"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30,40]"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="counts"
        ></el-pagination>
    </div>
</template>
<script>
export default {
    name: 'terraceIndex',
    data() {
        return {
            inputName: '',
            time: '',
            qiyeID: [],
            page: 1,
            limit: 10,
            counts: 0,
            tableData: [],
            industryId: '',
            fullscreenLoading: true,
            loadingText: '加载中....',
            options: [],
            value: ''
        };
    },
    mounted() {
        this.getIndustryList();
        this.getTerraceList();
    },
    created() {},
    methods: {
        // 添加企业按钮
        add_enterprise() {
            this.$router
                .push({
                    path: './addEnterprise'
                })
                .catch((err) => {
                    // console.log(err);
                });
        },
        // 删除所有钮
        del_All() {
            let id = this.qiyeID;
            this.$axios.get('admin/company/delete?ids=' + id).then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.$message.success('删除成功');
                        this.getTerraceList();
                    } else {
                        this.$message.error('删除失败');
                    }
                }
            });
        },
        // 删除一个
        del_enterprise(row) {
            let id = row.id;
            this.$axios.get('admin/company/delete?ids=' + id).then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.$message.success('删除成功');
                        this.getTerraceList();
                    } else {
                        this.$message.error('删除失败');
                    }
                }
            });
        },
        // 管理
        admin(row) {
            this.$router.push({
                path: './businessmanage',
                query: {
                    id: row.company.id
                }
            });
        },
        edit_enterprise(row) {
            this.$router.push({
                path: './editerinfor'
            });
        },
        // 页码
        handleSizeChange(val) {
            this.limit = val;
            this.getTerraceList();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getTerraceList();
        },
        // 查询按钮
        queryQY() {
            this.page = 1;
            this.getTerraceList();
        },
        // 查询行业
        getIndustryList() {
            this.$axios
                .get('admin/industry/list')
                .then((res) => {
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
                })
                .catch((error) => {});
        },
        // 查询企业
        getTerraceList() {
            var datalist = {
                page: this.page,
                beginTime: this.time[0],
                endTime: this.time[1],
                industryId: parseInt(localStorage.getItem('loginData')),
                limit: this.limit,
                name: this.inputName
            };
            this.$axios.post('admin/company/common/list', datalist).then((res) => {
                this.fullscreenLoading = false;
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        let Data = data.data;
                        let DataList = [];
                        Data.forEach(function (val, index) {
                            DataList[index] = val;
                            DataList[index].account = val.account;
                            DataList[index].name = val.company.name;
                            DataList[index].legal = val.company.legal;
                            DataList[index].industry = val.company.industry;
                            DataList[index].teams = val.teams.length;
                            var date = new Date(val.company.time);
                            var time1 =
                                date.getFullYear() +
                                '-' +
                                (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                                '-' +
                                date.getDate();
                            DataList[index].time = time1;
                        });
                        this.tableData = DataList;
                        this.counts = data.totalCount;
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
        // teams
        JumpRoute() {}
    }
};
</script>
<style scoped>
@import './style.css';
</style>
