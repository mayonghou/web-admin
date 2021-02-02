<template>
    <div class="shareData" id="shareData">
        <div class="shareData-top">
            <div class="top-body">
                <h1>15616</h1>
                <span>浏览量</span>
            </div>
        </div>
        <div class="shareData-search">
            <h3>浏览查询</h3>
            <div class="condition">
                <el-input v-model="companyName" style="width:300px;" clearable placeholder="企业名称"></el-input>
                <el-select
                    v-model="service"
                    style="margin-left: 20px;"
                    clearable
                    placeholder="全部客服"
                >
                    <el-option
                        v-for="item in this.dataList"
                        :key="item.id"
                        :value="item.name"
                        :label="item.name"
                    ></el-option>
                </el-select>
                <el-select v-model="source" style="margin-left: 20px;" clearable placeholder="全部来源">
                    <el-option
                        v-for="item in SourceOptions"
                        :key="item.index"
                        :value="item.name"
                        :label="item.name"
                    ></el-option>
                </el-select>
                <el-date-picker
                    v-model="valuedates"
                    align="right"
                    style="margin-left: 20px;"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions"
                    value-format="yyyy-MM-dd"
                ></el-date-picker>
                <el-button type="primary" @click="queryBtn" style="margin-left: 20px;">查询</el-button>
            </div>
        </div>
        <div style="width:100%;height:20px;"></div>

        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
            <el-table-column prop="companyName" label="企业名称" align="center"></el-table-column>
            <el-table-column prop="viewCount" label="累计浏览次数" align="center"></el-table-column>
            <el-table-column prop="customerService" label="客服" align="center"></el-table-column>
            <el-table-column prop="sourceType" label="来源" align="center"></el-table-column>
            <el-table-column prop="viewTimes" label="最后浏览时间" align="center"></el-table-column>
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
    data() {
        return {
            dataList: [],
            companyName: '',
            service: '',
            source: '',
            valuedates: '',
            tableData: [],
            page: 1,
            limit: 10,
            counts: 0,
            SourceOptions: [
                {
                    index: 0,
                    name: '游客'
                },
                {
                    index: 1,
                    name: '潜在客户'
                },
                {
                    index: 2,
                    name: '客户'
                }
            ],
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [
                    {
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    },
                    {
                        text: '一月',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getFullYear() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    },
                    {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }
                ]
            }
        };
    },
    mounted() {
        this.getServiceList();
        this.getShareData();
    },
    methods: {
        // 分页
        handleSizeChange(val) {
            this.limit = val;
            this.getShareData();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getShareData();
        },
        queryBtn() {
            this.page = 1;
            this.getShareData();
        },
        // 查询列表
        getShareData() {
            let data = {
                companyName: this.companyName,
                customerService: this.service,
                sourceType: this.source,
                date: this.valuedates,
                page: this.page,
                limit: this.limit
            };
            this.$axios.post('admin/mall/dataCenter/queryMallViewInfo', data).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        let dataList = [];
                        data.data.forEach(function (val, index) {
                            dataList[index] = val;
                            let date = new Date(parseInt(val.viewTime));
                            dataList[index].viewTimes =
                                date.getFullYear() +
                                '-' +
                                (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                                '-' +
                                date.getDate() +
                                ' ' +
                                date.getHours() +
                                ':' +
                                date.getMinutes() +
                                ':' +
                                date.getSeconds();
                        });
                        this.tableData = dataList;
                        this.counts = data.totalCount;
                    }
                }
            });
        },
        // 全部客服
        getServiceList() {
            this.$axios.get('admin/company/teams?page=1&limit=1000&companyId=' + localStorage.getItem('loginData')).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.dataList = data.data;
                    }
                }
            });
        }
    }
};
</script>

<style  scoped>
.shareData {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
}
.shareData-top {
    display: flex;
    justify-content: center;
}
.shareData-top .top-body {
    width: 300px;
    height: 100px;
    background: #42a7ff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
}
.shareData-search {
    margin-top: 10px;
    background: #fafbfa;
    width: 100%;
    height: 114px;
    padding: 20px;
}
.pagintion {
    width: 100%;
    text-align: center;
}
</style>
