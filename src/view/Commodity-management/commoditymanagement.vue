<template>
    <!-- 商品列表 -->
    <div class="table_css_xiaoyuer">
        <div class="top-compo">
            <Row style="width: 100%">
                <Col span="12">
                    <Input
                        v-model="value01"
                        placeholder="输入商品名称..."
                        clearable
                        style="width: 200px; margin-right: 10px"
                    />
                    <Input
                        v-model="value02"
                        placeholder="输入发布企业..."
                        clearable
                        style="width: 200px; margin-right: 10px"
                    />
                    <Select
                        v-model="model1"
                        style="width: 100px; margin-right: 10px"
                        placeholder="全部状态"
                    >
                        <Option
                            v-for="item in cityList"
                            :value="item.value"
                            :key="item.value"
                        >{{ item.label }}</Option>
                    </Select>
                    <el-date-picker
                        v-model="value2"
                        type="datetimerange"
                        range-separator="——"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        @change="fgetLocalTime"
                    ></el-date-picker>
                    <Button
                        @click="query"
                        type="primary"
                        style="padding-left: 40px; padding-right: 40px"
                    >查询</Button>
                </Col>
            </Row>
        </div>
        <!-- 表格 -->
        <tablea
            ref="tablea"
            v-if="Datar0 != ''"
            :pageid="pageid"
            :Datar0="Datar0"
            :statusCode="statusCode"
        ></tablea>
        <!-- 分页 -->
        <div class="pageFy">
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
import tablea from '../conponents/table/tablea/tablea.vue';
export default {
    data() {
        return {
            Datar0: '',
            // 数据发散
            pageid: [
                { pageid: 0 },
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '序号',
                    slot: 'dataTanle',
                    width: 70,
                    type: 'index',
                    align: 'center'
                },
                {
                    title: '商品名称',
                    key: 'col1',
                    align: 'center'
                },
                {
                    title: '发布企业',
                    key: 'col2',
                    align: 'center'
                },
                {
                    title: '发布人',
                    key: 'col3',
                    align: 'center'
                },
                {
                    title: '商品售价',
                    key: 'col4',
                    align: 'center'
                },
                {
                    title: '商品封面',
                    key: 'col5',
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'div',
                            {
                                attrs: {
                                    style: 'width:100%; height: auto;display:block;padding-top:15px;padding-bottom: 15px;'
                                }
                            },
                            [
                                h('img', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    attrs: {
                                        src: params.row.col5,
                                        style: 'width:100%; height: auto;'
                                    }
                                })
                            ]
                        );
                    }
                },
                {
                    title: '商品状态',
                    key: 'col6',
                    align: 'center'
                },
                {
                    title: '发布时间',
                    key: 'col7',
                    width: 110,
                    align: 'center'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 230,
                    align: 'center'
                },
                {
                    dataTanle: '',
                    age: '',
                    col1: '',
                    col2: '',
                    col3: '',
                    col4: '',
                    col5: '',
                    col6: '',
                    col7: ''
                }
            ],
            page: 1,
            limit: 10,
            counts: 0,
            value2: [],
            value01: '',
            value02: '',
            cityList: [
                {
                    value: '上架',
                    label: '上架'
                },
                {
                    value: '下架',
                    label: '下架'
                }
            ],
            model1: '',
            // 时间段选择
            pickerOptions: {
                shortcuts: [
                    {
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }
                ]
            },
            value1: '',
            value2: '',
            statusCode: ''
        };
    },
    created() {},
    mounted() {
        this.getProductList();
    },
    watch: {
        Datar0: {
            handler(newdata, oldata) {
                this.Datar0 = newdata;
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        // 分页
        handleSizeChange(val) {
            this.limit = val;
            this.getProductList();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getProductList();
        },
        query() {
            this.page = 1;
            this.getProductList();
        },
        //将时间转换成时间撮
        fgetLocalTime() {
            let date = new Date(this.value2[0]);
            let start = date.getTime(date);
            this.start = start;
            let date1 = new Date(this.value2[1]);
            let end = date1.getTime(date1);
            this.end = end;
        },
        //数据请求
        getProductList() {
            if (this.model1 == '下架') {
                this.model1 = 0;
            } else if (this.model1 == '上架') {
                this.model1 = 0;
            }
            let data = {
                companyName: this.value02,
                limit: this.limit,
                page: this.page,
                productName: this.value01,
                productStatus: this.model1,
                endTime: this.end,
                startTime: this.start
            };
            var url = 'admin/product/adminQueryProductList';
            this.$axios
                .post(url, data)
                .then((res) => {
                    if (res.status == 200 && res.statusText == 'OK') {
                        const statusCode = res.data.code;
                        this.statusCode = statusCode;
                        if (res.data.code == 200) {
                            let https = /^https:\/\/.+$/;
                            var DataAjax0 = [];
                            var AjaxData = res.data.data.dataList;
                            AjaxData.forEach(function (val, index) {
                                DataAjax0[index] = val;
                                DataAjax0[index].col1 = val.name;
                                DataAjax0[index].col2 = val.companyName;
                                DataAjax0[index].col3 = val.userName;
                                DataAjax0[index].col4 = val.price;
                                if (https.test(val.pic)) {
                                    DataAjax0[index].col5 = val.pic;
                                } else {
                                    DataAjax0[index].col5 = localStorage.getItem('imgUrl') + val.pic;
                                }
                                if (val.publishStatus == 0) {
                                    val.publishStatus = '下架';
                                } else if (val.publishStatus == 1) {
                                    val.publishStatus = '上架';
                                }
                                DataAjax0[index].col6 = val.publishStatus;
                                var date = new Date(val.createTime);
                                var time1 =
                                    date.getFullYear() +
                                    '-' +
                                    (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                                    '-' +
                                    date.getDate();
                                DataAjax0[index].col7 = time1;
                            });
                            this.counts = res.data.data.totalCount;
                            this.$nextTick(() => {
                                this.Datar0 = DataAjax0;
                            });
                        } else {
                            this.$nextTick(() => {
                                this.Datar0 = [{ name: '暂无数据！' }];
                            });
                        }
                        if (!res.data.data.dataList || res.data.data.dataList.length == 0) {
                            this.$nextTick(() => {
                                this.Datar0 = [{ name: '暂无数据！' }];
                            });
                        }
                    }
                })
                .catch((err) => {
                    this.$nextTick(() => {
                        this.Datar0 = [{ name: '暂无数据！' }];
                    });
                });
        },
        // 删除单个
        deletData(spid) {
            const url = 'admin/product/daminDelProduct?productId=' + spid;
            this.$axios
                .get(url)
                .then((res) => {
                    if (res.status == 200) {
                        const data = res.data;
                        if (data.code == 200) {
                            alert(data.msg);
                            this.getProductList();
                        } else {
                            alert(data.msg);
                            this.getProductList();
                        }
                    }
                })
                .catch((err) => {});
        },
        // 批量删除
        BatchDelete(id) {
            const url = 'admin/product/adminBatchDelProduct?productIds=' + id;
            this.$axios
                .post(url)
                .then((res) => {
                    if (res.status == 200) {
                        const dataert = res.data;
                        if (dataert.cpde == 200) {
                            alert(dataert.msg);
                            this.getProductList();
                        } else {
                            alert(dataert.msg);
                            this.getProductList();
                        }
                    }
                })
                .catch((err) => {});
        },
        // 下架
        Goodsoffshelves(spID, status) {
            const url = 'admin/product/adminProductPublishStaus?productId=' + spID + '&publishStaus=' + status;
            this.$axios
                .get(url)
                .then((res) => {
                    if (res.status == 200) {
                        const data = res.data;
                        if (data.code == 200) {
                            alert(data.msg);
                            this.getProductList();
                        } else {
                            alert(data.msg);
                            this.getProductList();
                        }
                    }
                })
                .catch((err) => {});
        }
    },
    components: {
        tablea
    }
};
</script>

<style scope>
.table_css_xiaoyuer {
    box-sizing: border-box;
    padding: 20px;
}
.top-compo {
    box-sizing: border-box;
    padding: 0 20px;
}
.pageFy {
    margin-top: -20px;
    padding-bottom: 90px;
}
</style>
