<template>
    <!-- 行业管理 -->
    <div class="table_css_xiaoyuer">
        <div class="top-compo">
            <Row style="width: 100%">
                <Col span="12">
                    <Input
                        v-model="value01"
                        placeholder="输入行业名称..."
                        clearable
                        style="width: 200px; margin-right: 10px"
                    />
                    <Button
                        @click="CouponDataQuery"
                        type="primary"
                        style="padding-left: 40px; padding-right: 40px"
                    >查询</Button>
                </Col>
            </Row>
        </div>
        <!-- 表格 -->
        <tablea
            v-if="Datar17 != ''"
            :pageid="pageid"
            :Datar17="Datar17"
            :statusCode="statusCode"
            @adminiDataA="xgDatafromchild"
        ></tablea>
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
        <!-- 弹窗 =>修改-->
        <div>
            <Modal
                v-model="modal1model"
                title="修改行业"
                @on-ok="ok"
                @on-cancel="cancel"
                @click="modal1model = true"
                footer-hide
            >
                <Form :model="formRight" label-position="right" :label-width="200">
                    <FormItem label="行业全称：" class="fatherClass">
                        <input
                            class="InputClass"
                            v-model="formRight.input1"
                            placeholder="请输入行业全称..."
                        />
                    </FormItem>
                    <FormItem label="行业简称：" class="fatherClass">
                        <input
                            class="InputClass"
                            v-model="formRight.input2"
                            placeholder="请输入行业简称..."
                        />
                    </FormItem>
                    <div class="BtnclassQx">
                        <Button type="primary" @click="Btn_confirm">确定</Button>
                        <Button type="primary" @click="Btn_cancel">取消</Button>
                    </div>
                </Form>
            </Modal>
        </div>
        <!-- 弹窗 =>添加-->
        <div>
            <Modal
                v-model="modal01model"
                title="添加行业"
                @on-ok="ok"
                @on-cancel="cancel"
                @click="modal01model = true"
                footer-hide
            >
                <Form :model="formRight01" label-position="right" :label-width="200">
                    <FormItem label="行业全称：" prop="input01" class="fatherClass">
                        <input
                            class="InputClass"
                            v-model="formRight.input01"
                            placeholder="请输入行业全称..."
                        />
                    </FormItem>
                    <FormItem label="行业简称：" prop="input02" class="fatherClass">
                        <input
                            class="InputClass"
                            v-model="formRight.input02"
                            placeholder="请输入行业简称..."
                        />
                    </FormItem>
                    <div class="BtnclassQx">
                        <Button type="primary" @click="Btn_confirm02">确定</Button>
                        <Button type="primary" @click="Btn_cancel02">取消</Button>
                    </div>
                </Form>
            </Modal>
        </div>
    </div>
</template>

<script>
import tablea from '../conponents/table/tablea/tablea.vue';
export default {
    data() {
        return {
            Datar17: '',
            // 数据发散
            pageid: [
                { pageid: 17 },
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '序号',
                    slot: 'dataTanle',
                    width: 70,
                    align: 'center',
                    type: 'index'
                },
                {
                    title: '行业全称',
                    key: 'col1',
                    align: 'center'
                },
                {
                    title: '行业简称',
                    key: 'col2',
                    align: 'center'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 300,
                    align: 'center'
                },
                {
                    dataTanle: '1',
                    col1: '万江烽火',
                    col2: '小鱼儿'
                }
            ],
            page: 1,
            limit: 10,
            counts: this.counts,
            value01: '',
            value03: '',
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
            modal1model: false,
            modal01model: false,
            statusCode: '',
            formRight: {
                input1: '',
                input2: ''
            },
            formRight01: {
                input01: '',
                input02: ''
            },
            Idin: ''
        };
    },
    watch: {
        Datar17: {
            handler(newdata, oldata) {
                this.Datar17 = newdata;
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
        this.CouponDataQuery();
    },
    components: {
        tablea
    },
    methods: {
        // 分页
        handleSizeChange(val) {
            this.limit = val;
            this.CouponDataQuery();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.CouponDataQuery();
        },
        //弹窗=>修改
        xgDatafromchild(row) {
            this.Idin = row.id;
            this.formRight.input1 = row.col1;
            this.formRight.input2 = row.col2;
            this.modal1model = !this.modal1model;
        },
        ok() {},
        cancel() {},
        //修改=> 确定回调
        Btn_confirm() {
            const url = 'admin/industry/add';
            const data = {
                id: this.Idin,
                name: this.formRight.input1,
                remark: this.formRight.input2
            };
            this.$axios
                .post(url, data)
                .then((res) => {
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            this.$Message.info(res.data.msg);
                            this.modal1model = !this.modal1model;
                            this.CouponDataQuery();
                        } else {
                            this.$Message.info(res.data.msg);
                        }
                    }
                })
                .catch((err) => {});
        },
        // 修改=>取消回调
        Btn_cancel() {
            this.$Message.info('你没有修改密码！');
            this.modal1model = false;
        },
        // 添加行业=>确定回调
        Btn_confirm02() {
            if (this.formRight.input01 == undefined) {
                this.$Message.info('请输入行业全称......');
            } else if (this.formRight.input02 == undefined) {
                this.$Message.info('请输入行业简称......');
            } else if (this.formRight.input01 != undefined && this.formRight.input02 != undefined) {
                this.addindersty();
                this.modal01model = !this.modal01model;
                this.CouponDataQuery();
            }
        },
        // 添加行业=>取消回调
        Btn_cancel02() {
            this.modal01model = !this.modal01model;
        },
        AddIndustryAction() {
            this.modal01model = !this.modal01model;
            if (this.modal01model == true) {
                this.formRight.input01 = '';
                this.formRight.input02 = '';
            }
        },
        // ADD 行业
        addindersty() {
            const url = 'admin/industry/add';
            const data = {
                name: this.formRight.input01,
                remark: this.formRight.input02
            };
            this.$axios
                .post(url, data)
                .then((res) => {
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            this.$Message.info(res.data.msg);
                            this.CouponDataQuery();
                        } else {
                            this.$Message.info(res.data.msg);
                        }
                    }
                })
                .catch((err) => {});
        },
        // 置顶显示
        TopDisplay(inIdrd) {
            const url = 'admin/industry/add';
            const data = {
                id: inIdrd,
                top: true
            };
            this.$axios
                .post(url, data)
                .then((res) => {
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            this.$Message.info(res.data.msg);
                            this.CouponDataQuery();
                        } else {
                            this.$Message.info(res.data.msg);
                        }
                    }
                })
                .catch((err) => {});
        },
        //查询list
        CouponDataQuery() {
            var url = 'admin/industry/list' + '?page=' + this.page + '&limit=' + this.limit + '&name=' + this.value01;
            this.$axios
                .get(url)
                .then((res) => {
                    if (res.status == 200) {
                        const statusCode = res.data.code;
                        this.statusCode = statusCode;
                        if (res.data.code == 200) {
                            var AjaxData = res.data.data;
                            this.counts = res.data.total;
                            var DataAjax17 = [];
                            AjaxData.forEach(function (val, index) {
                                DataAjax17[index] = val;
                                DataAjax17[index].col1 = val.name;
                                DataAjax17[index].col2 = val.remark;
                            });
                            this.$nextTick(() => {
                                this.Datar17 = DataAjax17;
                            });
                        } else {
                            this.$nextTick(() => {
                                this.Datar17 = DataAjax17;
                            });
                        }
                        if (!res.data.data || res.data.data.length == 0) {
                            this.$nextTick(() => {
                                this.Datar17 = DataAjax17;
                            });
                        }
                    }
                })
                .catch(() => {
                    this.$nextTick(() => {
                        this.Datar17 = [{ name: '暂无数据！' }];
                    });
                });
        },
        // 删除
        deletIndustryData(id) {
            const url = 'admin/industry/delete/' + id;
            this.$axios
                .get(url)
                .then((res) => {
                    if (res.status == 200) {
                        const data = res.data;
                        if (data.code == 200) {
                            this.$Message.info(data.msg);
                            this.CouponDataQuery();
                        } else {
                            this.$Message.info(data.msg);
                            this.CouponDataQuery();
                        }
                    }
                })
                .catch((err) => {});
        }
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
.PClass-model {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
}
.PClass-model span {
    text-align: center;
    padding: 10px 20px;
}
.PClass-model span:nth-child(1) {
    font-weight: 600;
}
.PClass-model span:nth-child(2) {
    padding: 10px 25px;
    border-bottom: #c1c1c1 solid 1px;
}
.BtnclassQx {
    display: flex;
    align-items: center;
    justify-content: center;
}
.BtnclassQx button:nth-child(1) {
    margin-right: 5px;
}
.BtnclassQx button:nth-child(2) {
    margin-left: 5px;
}
.InputClass {
    padding: 0px 5px;
    border: 0;
    outline: none;
    border-bottom: 1px solid #e6e6e6;
    width: 150px;
}
</style>
