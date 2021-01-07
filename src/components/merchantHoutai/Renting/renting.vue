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
                    style="font-size: 22px; color: #2494D2; margin-left: 20px; margin-top: 5px; margin-right: 20px"
                    class="el-icon-date"
                ></i>
                <el-date-picker
                    prefix-icon="md-date_range"
                    v-model="time"
                    type="daterange"
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
                <el-select class="select-el" v-model="reatState" placeholder="房源状态" clearable>
                    <el-option
                        v-for="item in reatStates"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <el-button @click="queryRent" class="query">查询</el-button>
            </div>
        </div>
        <div class="text-button">
            <div class="button">
                <el-button @click="addRenting" type="primary">发布房源</el-button>
            </div>
        </div>
        <el-table :data="tableData" border style="width: 100%;">
            <!-- <el-table-column type="selection" width="" align="center"></el-table-column> -->
            <el-table-column prop="houseTitle" label="房源名称" align="center" width="180"></el-table-column>
            <el-table-column prop="publisher" label="发布人" align="center" width></el-table-column>
            <el-table-column prop="phone" label="手机号码" align="center"></el-table-column>
            <el-table-column prop="typeName" label="房源类型" align="center"></el-table-column>
            <el-table-column prop="status" label="房源状态" align="center"></el-table-column>
            <el-table-column prop="time" label="发布时间" align="center"></el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button @click="btn_detail(scope.row)" type="text" class="tab_button">查看详情</el-button>
                    <el-button
                        @click="republish(scope.row)"
                        type="text"
                        v-show="scope.row.status == 4"
                        class="bj_button"
                    >重新发布</el-button>
                    <el-button
                        @click="updateRenting(scope.row)"
                        type="text"
                        v-show="scope.row.status == 0"
                        class="bj_button"
                    >修改</el-button>
                    <el-button
                        @click="xiajia_enterprise(scope.row)"
                        type="text"
                        v-show="scope.row.status == 2 || '上架'"
                        class="del_button"
                    >下架</el-button>
                    <el-button
                        @click="cancel_enter(scope.row)"
                        type="text"
                        v-show="scope.row.status == 0"
                        class="red_button"
                    >取消发布</el-button>
                    <el-button
                        @click="del_enter(scope.row)"
                        type="text"
                        v-show="scope.row.status == 4"
                        class="red_button"
                    >删除</el-button>
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
                {
                    value: 2,
                    label: '上架'
                }
                // {
                // 	value: 3,
                // 	label: '下架'
                // },
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
            timeEnd: ''
        };
    },
    mounted() {
        this.gettypeAll();
        this.postRenting();
    },
    methods: {
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
        addRenting() {
            this.$router.push({
                path: './addRenting'
            });
        },
        updateRenting(row) {
            this.$router.push({
                path: './updaterenting',
                query: {
                    id: row.id
                }
            });
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
        // 取消发布
        cancel_enter(row) {},
        // 重新发布
        republish(row) {},
        // 下架
        xiajia_enterprise(row) {
            this.$confirm('是否确定下架【' + row.houseTitle + '】的房源?', '温馨提示', {
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
                this.$axios.get('admin/renting/manage/update/status?id=' + row.id + '&status=3').then((res) => {
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
        // 查询房屋列表
        postRenting() {
            let date = {
                houseTitle: this.input,
                pushEndDate: this.timeEnd,
                pushStartDate: this.timeStart,
                status: this.reatState || 2,
                typeName: this.rentypeName,
                page: this.page,
                limit: this.limit
            };
            this.$axios.post('admin/renting/manage/search', date).then((res) => {
                this.fullscreenLoading = false;
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        var listData = [];
                        data.data.data.forEach(function (val, index) {
                            listData[index] = val;
                            listData[index].status = val.status == 2 ? '上架' : '下架';
                            var date = new Date(val.pushTime);
                            var time1 =
                                date.getFullYear() +
                                '-' +
                                (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                                '-' +
                                date.getDate();
                            listData[index].time = time1;
                        });
                        this.tableData = listData;
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
.renting .query {
    width: 110px;
    height: 30px;
    background-color: #2450d2;
    color: #fff;
    margin-left: 10px;
    font-size: 14px;
    padding: 0;
}
.el-select {
    margin-left: 10px;
}
.select-el .el-input__inner {
    padding: 0;
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
}

.reat-search .time {
    margin-left: 38px;
}

.reat-search .select {
    margin-left: 10px;
}

.select .el-select {
    width: 131px;
    margin-left: 10px;
}

.reat-search .button {
    width: 150px;
    height: 30px;
    margin-left: 10px;
}

.button .el-button {
    width: 150px;
    background-color: #2450d2;
    border-radius: 8px;
}

.text-button {
    margin-top: 8px;
    margin-bottom: 10px;
}

.text-button .button {
    text-align: right;
    padding: 0;
    margin: 0;
}

.text-button .button .el-button {
    width: 104px;
    font-size: 14px;
}

.el-table .el_button {
    font-size: 10px;
}

.renting .tab_button {
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

.renting .del_button {
    background-color: #ff8d00;
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
</style>
