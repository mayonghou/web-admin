<template>
    <div class="membership" id="membership">
        <div class="membershipTop clearfix">
            <div class="top_text">
                <label>用户查询</label>
            </div>
            <div class="search">
                <el-input v-model="input" placeholder="输入昵称、电话号码"></el-input>
            </div>
            <div class="top_time">
                <Select v-model="model1" style="width: 200px" placeholder="会员组">
                    <Option
                        v-for="item in cityList"
                        :value="item.value"
                        :key="item.value"
                    >{{ item.label }}</Option>
                </Select>
                <el-button @click="getDataquery" class="button">查询</el-button>
            </div>
        </div>
        <el-row class="dangerbutton">
            <el-button type="danger" size="small">批量禁用</el-button>
        </el-row>
        <!-- 表格 -->
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column prop="id" label="会员ID" align="center"></el-table-column>
            <el-table-column prop="name" label="会员名" align="center"></el-table-column>
            <el-table-column prop="phoneNumber" label="手机号码" align="center"></el-table-column>
            <el-table-column prop="companyName" label="绑定企业" align="center"></el-table-column>
            <el-table-column prop="role" label="会员组" align="center"></el-table-column>
            <el-table-column prop="lastLoginTime" label="最近登录时间" align="center"></el-table-column>
            <el-table-column label="操作" width="210" align="center">
                <template slot-scope="scope">
                    <el-button class="tab_gl02 tab_button" @click="memberdetails(scope.row)">查看详情</el-button>
                    <el-button @click="del_membership(scope.row)" class="tab_del tab_button">禁用</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
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
    name: 'membership',
    data() {
        return {
            input: '',
            time: '',
            tableData: [],
            page: 1,
            limit: 10,
            counts: this.counts,
            // view
            cityList: [
                {
                    value: 'business',
                    label: '商家会员'
                },
                {
                    value: 'person',
                    label: '个人会员'
                }
            ],
            model1: '',
            resdataertRouter: ''
        };
    },
    methods: {
        admin(row) {
            this.$router
                .push({
                    path: './updatemember'
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 页码
        handleSizeChange(val) {
            this.limit = val;
            this.getappUser();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getappUser();
        },
        getDataquery() {
            this.getappUser();
            this.page = 1;
        },
        // 讲是时间搓转换
        getLocalTime(nS) {
            return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
        },
        // 查询
        getappUser() {
            var data = '?page=' + this.page + '&limit=' + this.limit + '&phoneNumber=' + this.input + '&role=' + this.model1;
            this.$axios
                .get('admin/user/all/app/user' + data)
                .then((res) => {
                    // menberId
                    var resdataert = res.data.data;
                    this.tableData = resdataert;
                    this.counts = res.data.totalCount;
                    for (var i in resdataert) {
                        if (resdataert[i].role == 'business') {
                            var aaa = resdataert[i].role;
                            resdataert[i].role = `${this.cityList[0].label}`;
                        } else if (resdataert[i].role == 'person') {
                            var bbb = resdataert[i].role;
                            resdataert[i].role = `${this.cityList[1].label}`;
                        }
                        this.getLocalTime(resdataert[i].lastLoginTime); //时间转换
                        resdataert[i].lastLoginTime = this.getLocalTime(resdataert[i].lastLoginTime);
                    }
                })
                .catch((err) => {});
        },
        // 查看详情
        memberdetails(row) {
            this.$router.push({
                path: './memberdetails',
                query: {
                    menberData: row
                }
            });
        }
    },
    mounted() {
        this.getappUser();
    }
};
</script>

<style>
@import './membership.css';
</style>
