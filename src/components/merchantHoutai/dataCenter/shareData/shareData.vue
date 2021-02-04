<template>
    <div class="shareData" id="shareData">
        <div class="shareData-top">
            <div class="top-body">
                <h1>{{this.viewCounts}}</h1>
                <span>浏览量</span>
            </div>
        </div>
        <div class="shareData-search">
            <h3>浏览查询</h3>
            <div class="condition" style="display: flex; align-items: flex-start;">
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
                <!-- v-if="timeType == 'date'" -->
                <el-date-picker
                    v-model="valuedates"
                    align="right"
                    style="margin-left: 20px;"
                    :type="timeType"
                    placeholder="选择日期"
                    :picker-options="pickerOptions"
                    @change="timeChange"
                ></el-date-picker>
                <!-- :value-format="valueFormat" -->

                <span id="dateDay" @click="today" style="display:none;">天</span>
                <span id="monthData" @click="dateMonth" style="display:none;">月</span>
                <span id="dateYear" @click="dateYear" style="display:none;">年</span>
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
            timeType: '',
            valueFormat: '',
            viewCounts: '',
            dataList: [],
            companyName: '',
            service: '',
            source: '',
            valuedates: null,
            tableData: [],
            page: 1,
            limit: 10,
            counts: 0,
            dateType: '',
            dateTime: '',
            valuedatesdasd: '',
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
                            document.getElementById('dateDay').click();
                            picker.$emit('pick', new Date());
                        }
                    },
                    {
                        text: '一月',
                        onClick(picker) {
                            document.getElementById('monthData').click();
                            picker.$emit('pick', new Date());
                        }
                    },
                    {
                        text: '一年',
                        onClick(picker) {
                            document.getElementById('dateYear').click();
                            picker.$emit('pick', new Date());
                        }
                    }
                ]
            }
        };
    },
    watch: {
        timeType: {
            handler(newName, oldata) {
                if (newName == 'date') {
                    this.timeType = newName;
                    this.valueFormat = 'yyyy-MM-dd';
                } else if (newName == 'month') {
                    this.timeType = newName;
                    this.valueFormat = 'yyyy-MM';
                } else if (newName == 'year') {
                    this.timeType = newName;
                    this.valueFormat = 'yyyy';
                }
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
        this.getServiceList();
        this.getShareData();
        this.$nextTick(() => {
            this.today();
        });
    },
    methods: {
        today() {
            this.valuedates = null;
            this.timeType = 'date';
            this.valueFormat = 'yyyy-MM-dd';
            this.dateType = 0;
        },
        dateMonth() {
            this.valuedates = null;
            this.dateType = 1;
            this.timeType = 'month';
            this.valueFormat = 'yyyy-MM';
            let dateM = new Date();
            let year = dateM.getFullYear();
            let month = dateM.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            this.valuedates = year + '-' + month;
        },
        dateYear() {
            this.valuedates = null;
            this.timeType = 'year';
            this.valueFormat = 'yyyy';
            let dateY = new Date();
            this.valuedates = dateY.getFullYear();
            this.dateType = 2;
        },
        timeChange(value) {
            if (value) {
                let timeDate = new Date(value);
                if (this.timeType == 'date') {
                    this.dateTime =
                        timeDate.getFullYear() +
                        '-' +
                        (timeDate.getMonth() + 1 < 10 ? '0' + (timeDate.getMonth() + 1) : timeDate.getMonth() + 1) +
                        '-' +
                        timeDate.getDate();
                } else if (this.timeType == 'month') {
                    this.dateTime =
                        timeDate.getFullYear() +
                        '-' +
                        (timeDate.getMonth() + 1 < 10 ? '0' + (timeDate.getMonth() + 1) : timeDate.getMonth() + 1) +
                        '-' +
                        timeDate.getDate();
                } else if (this.timeType == 'year') {
                    this.dateTime =
                        timeDate.getFullYear() +
                        '-' +
                        (timeDate.getMonth() + 1 < 10 ? '0' + (timeDate.getMonth() + 1) : timeDate.getMonth() + 1) +
                        '-' +
                        timeDate.getDate();
                }
            } else {
                this.dateTime = '';
            }
        },
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
                date: this.dateTime,
                dateType: this.dateType,
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
                            let dateS = new Date(parseInt(val.viewTime));
                            dataList[index].viewTimes =
                                dateS.getFullYear() +
                                '-' +
                                (dateS.getMonth() + 1 < 10 ? '0' + (dateS.getMonth() + 1) : dateS.getMonth() + 1) +
                                '-' +
                                dateS.getDate() +
                                ' ' +
                                dateS.getHours() +
                                ':' +
                                dateS.getMinutes() +
                                ':' +
                                dateS.getSeconds();
                        });
                        this.tableData = dataList;
                        this.counts = data.totalCount;
                        this.viewCounts = data.viewCount;
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

<style >
.el-picker-panel__body {
    z-index: 1;
}
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
