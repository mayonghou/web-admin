<template>
    <div
        class="kehuadmin"
        id="kehuadmin"
        v-loading="fullscreenLoading"
        :element-loading-text="loadingText"
        element-loading-background="rgba(0, 0, 0, 0.7)"
    >
        <div class="kehuadminTop clearfix">
            <div class>
                <label>客户查询</label>
            </div>
            <el-input class="search" v-model="input" placeholder="输入手机号"></el-input>
            <el-select v-model="value" placeholder="客户类型" clearable>
                <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.type"
                    :value="item.id"
                ></el-option>
            </el-select>
            <el-button @click="queryData" class="button">查询</el-button>
        </div>
        <!-- 客户类型设置 -->
        <div class="add_Del">
            <el-button @click="kehuleixing" class="button kehuleixing">客户类型设置</el-button>
        </div>
        <!-- 表格 -->
        <el-table :data="tableData" border style="width: 100%;">
            <!-- <el-table-column type="selection" width="" align="center">
            </el-table-column>-->
            <el-table-column prop="id" label="客户id" align="center" width></el-table-column>
            <el-table-column prop="nickName" label="昵称" align="center" width></el-table-column>
            <el-table-column prop="phone" label="手机号码" align="center"></el-table-column>
            <el-table-column prop="region" label="地区" align="center"></el-table-column>
            <el-table-column prop="type" label="客户类型" align="center"></el-table-column>
            <el-table-column prop="lastLoginTime" width="150" align="center" label="最后登录时间"></el-table-column>
            <el-table-column prop="consumerService" align="center" label="客服"></el-table-column>
            <el-table-column label="操作" width="250" align="center">
                <template slot-scope="scope">
                    <el-button @click="detailKhu(scope.row)" class="tab_gl">查看详情</el-button>
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
import bus from '../../common/bus.js';
export default {
    name: 'kehuadmin',
    data() {
        return {
            fullscreenLoading: true,
            loadingText: '加载中...',
            input: '',
            time: '',
            value: '',
            options: [],
            tableData: [],
            page: 1,
            limit: 10,
            counts: this.counts || 1
        };
    },
    mounted() {
        this.getqueryConsumerList();
        this.getConsumerTypeList();
    },
    methods: {
        delpiliang() {},
        getConsumerTypeList() {
            var data = {
                limit: 50,
                page: this.page
            };
            this.$axios.post('admin/consumerManage/queryConsumerTypeList', data).then((res) => {
                this.fullscreenLoading = false;
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.options = data.data.dataList;
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
        // 客户类型按钮
        kehuleixing() {
            this.$router
                .push({
                    path: './kehuleixingList'
                })
                .catch((err) => {});
        },
        detailKhu(row) {
            this.$router
                .push({
                    path: './kuhuDetail',
                    query: {
                        id: row.id,
                        type: row.type
                    }
                })
                .catch((err) => {});
        },
        // 页码
        handleSizeChange(val) {
            this.limit = val;
            this.getqueryConsumerList();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getqueryConsumerList();
        },
        queryData() {
            this.page = 1;
            this.getqueryConsumerList();
        },
        // 请求客户数据
        getqueryConsumerList() {
            let data = {
                limit: this.limit,
                page: this.page,
                phone: this.input,
                type: this.value
            };
            this.$axios.post('admin/consumerManage/queryConsumerList', data).then((res) => {
                this.fullscreenLoading = false;
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.tableData = data.data.dataList;
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

<style>
.clearfix {
    clear: both;
}

.kehuadmin {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
}

.kehuadminTop {
    width: 100%;
    height: 114px;
    background-color: #fafbfa;
    margin-top: 10px;
    padding-left: 10px;
    line-height: 30px;
    padding-top: 15px;
}

.search {
    width: 200px;
    height: 31px;
    margin-right: 20px;
}

.kehuadminTop .button {
    width: 151px;
    height: 30px;
    line-height: 30px;
    color: #ffffff;
    border-radius: 8px;
    background: #2450d2;
    margin-left: 30px;
    padding: 0;
    font-size: 14px;
}
.add_Del {
    width: 100%;
    height: 50px;
    line-height: 50px;
}
.add_Del .button {
    float: right;
    width: 107px;
    height: 30px;
    font-size: 14px;
    color: #fff;
    border-radius: 10px;
}

.add_Del .kehuleixing {
    background: #ff8d00;
    font-size: 14px;
}

.el-table {
    margin-top: 20px;
}

.pagintion {
    padding-top: 30px;
    padding-left: 0%;
}

.el-table .tab_gl {
    width: 70px;
    height: 30px;
    font-size: 14px;
    line-height: 5px;
    color: #fff;
    padding: 0;
    background-color: #109955;
}
</style>
