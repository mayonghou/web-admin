<template>
    <div>
        <div class="DetailsData">
            <!-- nav -->
            <div class="nav">
                <div class="nav_1_1">
                    <div class="opcity">
                        <Icon type="md-bonfire" />
                    </div>
                </div>
                <div class="nav_1_2">
                    <div>
                        <h1>4528</h1>
                        <p>浏览量</p>
                    </div>
                </div>
            </div>
            <!-- counts -->
            <div class="counts">
                <Input
                    v-model="value"
                    placeholder="企业名称..."
                    style="width: 200px; margin-right:10px"
                />
                <Select
                    v-model="model1"
                    style="width:200px; margin-right:10px"
                    placeholder="输入行业..."
                    @on-change="changeData"
                >
                    <Option
                        v-for="item in cityList1"
                        :value="item.label"
                        :key="item.value"
                    >{{ item.label }}</Option>
                </Select>
                <Select
                    v-model="model2"
                    style="width:200px; margin-right:10px"
                    placeholder="全部来源"
                    @on-change="changeData2"
                >
                    <Option
                        v-for="item in cityList2"
                        :value="item.value"
                        :key="item.value"
                    >{{ item.label }}</Option>
                </Select>
                <span span="12">
                    <DatePicker
                        format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择时间..."
                        @on-change="DateData"
                        v-model="model3"
                        style="width: 200px; margin-right:10px"
                    ></DatePicker>
                </span>
                <Button type="primary" @click="requestDataBtn">查询</Button>
            </div>
            <div>
                <table class="table">
                    <thead>
                        <tr>
                            <th v-for="(item, index) in tableData" :key="index">{{ item.Title }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in dataSlot" :key="index">
                            <td v-for="(i, ikey) in item" :key="ikey">{{ i }}</td>
                        </tr>
                    </tbody>
                </table>
                <slot></slot>
            </div>
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
    </div>
</template>
<script>
export default {
    data() {
        return {
            page: 1,
            limit: 10,
            counts: 0,
            value: '',
            cityList1: [
                {
                    value: 1,
                    label: ''
                }
            ],
            model1: '',
            cityList2: [
                {
                    value: '全部来源',
                    label: '全部来源'
                },
                {
                    value: '游客',
                    label: '游客'
                },
                {
                    value: '潜在客户',
                    label: '潜在客户'
                },
                {
                    value: '客户',
                    label: '客户'
                }
            ],
            model2: '',
            tableData: [
                {
                    Title: '用户名',
                    key: 'userName'
                },
                {
                    Title: '行业',
                    key: 'industryName'
                },
                {
                    Title: '企业名称',
                    key: 'companyName'
                },
                {
                    Title: '手机号码',
                    key: 'phone'
                },
                {
                    Title: '累积浏览次数',
                    key: 'viewCount'
                },
                {
                    Title: '最后浏览时间',
                    key: 'viewTime'
                }
            ],
            // 表格数据
            dataSlot: [],
            model3: ''
        };
    },
    mounted() {
        this.inderStryData();
        this.HttpRequest();
    },
    methods: {
        handleSizeChange(val) {
            this.limit = val;
            this.HttpRequest();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.HttpRequest();
        },
        // 选择行业回调
        changeData() {
            console.log(this.model1);
        },
        // 选择全部类型回调
        changeData2() {},
        // 时间选择回调
        DateData(value) {
            this.model3 = value;
        },
        // 行业列表
        inderStryData() {
            const url = 'admin/industry/list';
            this.$axios
                .get(url)
                .then((res) => {
                    if (res.status == 200) {
                        const data = res.data;
                        if (data.code == 200) {
                            const dataa = res.data.data;
                            this.cityList1 = [];
                            dataa.forEach((item) => {
                                let itemer = {
                                    value: item.id,
                                    label: item.name
                                };
                                this.cityList1.push(itemer);
                            });
                        }
                    }
                })
                .catch((err) => {});
        },
        // 查询Btn
        requestDataBtn() {
            this.page = 1;
            this.HttpRequest();
        },
        // 数据源
        HttpRequest() {
            const url = 'admin/mall/dataCenter/queryMallViewInfo';
            let data = {
                companyName: this.value,
                customerService: '',
                date: this.model3,
                dateType: 0,
                industryName: this.model1,
                limit: this.limit,
                page: this.page,
                sourceType: this.model2
            };
            this.$axios
                .post(url, data)
                .then((res) => {
                    if (res.status == 200) {
                        const data = res.data;
                        if (data.code == 200) {
                            const dataer = res.data.data;
                            this.counts = data.totalCount;
                            this.dataSlot = [];
                            dataer.forEach((item) => {
                                var list = {
                                    userName: item.userName,
                                    industryName: item.industryName,
                                    companyName: item.companyName,
                                    phone: item.phone,
                                    viewCount: item.viewCount,
                                    viewTime: item.viewTime
                                };
                                this.dataSlot.push(list);
                            });
                        }
                    }
                })
                .catch((err) => {});
        }
    }
};
</script>
<style scope>
.DetailsData {
    padding: 0 20px;
}

.nav {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
}

.nav_1_1 {
    width: 100px;
    height: 100px;
    background-color: #42a7ff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}

.opcity {
    color: #fff;
    font-size: 56px;
    opacity: 0.8;
}

.nav_1_2 {
    width: 200px;
    height: 100px;
    background-color: #42a7ff;
    display: flex;
    align-items: center;
    color: #fff;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

.counts {
    padding: 20px 0;
}

.table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
}

.table thead tr {
    height: 46px;
    background-color: #393d490f;
}

.table tbody tr {
    border-bottom: 1px solid #dcdee2;
}

.table tbody tr td {
    padding: 10px 10px;
}

.table tbody tr:hover {
    background-color: aliceblue;
}
</style>
