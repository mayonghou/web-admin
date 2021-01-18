<template>
    <!-- <h1>商品列表</h1> -->
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
        <tablea v-if="Datar0 != ''" :pageid="pageid" :Datar0="Datar0"></tablea>
        <!-- 分页 -->
        <el-pagination
            class="pagintion"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="20"
            layout="total, sizes, prev, pager, next, jumper"
            :total="counts"
        ></el-pagination>
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
                    align: 'center'
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
                    width: 240,
                    align: 'center'
                },
                {
                    dataTanle: '1',
                    age: 18,
                    col1: '蜀山公主',
                    col2: '小鱼儿',
                    col3: '大玉儿',
                    col4: '1.5亿',
                    col5: 'imgUrl',
                    col6: '现货',
                    col7: '公元元年'
                }
            ],

            page: 1,
            limit: 20,
            counts: this.counts || 1,
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
            value2: ''
        };
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
            this.getProductList();
            this.page = 1;
        },

        fgetLocalTime() {
            //将时间转换成时间撮
            let date = new Date(this.value2[0]);
            let start = date.getTime(date);
            this.start = start;
            let date1 = new Date(this.value2[1]);
            let end = date1.getTime(date1);
            this.end = end;
        },
        getProductList() {
            //数据请求
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
                        var AjaxData0 = res.data.data.dataList;
                        if (res.data.code == 200) {
                            this.$nextTick(() => {
                                this.Datar0 = AjaxData0;
                            });
                        } else {
                            this.Datar0 = 1;
                        }
                    }
                })
                .catch((err) => {});
        }
    },
    mounted() {
        this.getProductList();
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
    margin-top: 20px;
}
</style>
