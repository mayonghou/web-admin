<template>
    <div class="table_css_xiaoyuer">
        <!-- 千里马人员管理 -->
        <div class="top-compo">
            <Row style="width: 100%">
                <Col span="12">
                    <Input
                        v-model="value01"
                        placeholder="输入姓名..."
                        clearable
                        style="width: 200px; margin-right: 10px"
                    />
                    <Select
                        v-model="model1"
                        style="width:150px; margin-right:10px;"
                        placeholder="兼职类型"
                    >
                        <Option
                            v-for="item in cityList"
                            :value="item.value"
                            :label="item.label"
                            :key="item.value"
                        ></Option>
                    </Select>
                    <el-date-picker
                        v-model="value2"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="——"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions"
                        @change="fgetLocalTime"
                    ></el-date-picker>
                    <Button
                        @click="CouponDataQuery"
                        type="primary"
                        style="padding-left: 40px; padding-right: 40px"
                    >查询</Button>
                </Col>
            </Row>
        </div>
        <!-- 表格 -->
        <tablea v-if="Datar19 != ''" :pageid="pageid" :Datar19="Datar19" :statusCode="statusCode"></tablea>
        <!-- 分页 -->
        <el-pagination
            class="pagintion"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="counts"
        ></el-pagination>
        <!-- 对话框 -->
        <el-dialog title="密码重置" :visible.sync="dialogVisible" width="40%" center>
            <div class="DialogClass">
                <Form :model="formRight" label-position="right" :label-width="100">
                    <div class="FormItemClass">
                        <div class="FormItemClass-left-right">
                            <FormItem label="新密码">
                                <Input
                                    v-model="formRight.input1"
                                    placeholder="请输入新密码..."
                                    clearable
                                    @on-change="xiaoyuerChange"
                                ></Input>
                            </FormItem>
                            <FormItem label="确认新密码">
                                <Input
                                    v-model="formRight.input2"
                                    clearable
                                    @on-change="xiaoyuerChange"
                                    placeholder="请再次输入新密码..."
                                ></Input>
                            </FormItem>
                        </div>
                    </div>
                </Form>
            </div>
            <span slot="footer" class="dialog-footer">
                <div class="el-dialog-Class">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="jiaoyanFunction">确 定</el-button>
                </div>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import tablea from '../../conponents/table/tablea/tablea.vue';
export default {
    data() {
        return {
            Datar19: '',
            dialogVisible: false,
            // 数据发散
            pageid: [
                { pageid: 19 },
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '序号',
                    slot: 'dataTanle',
                    align: 'center',
                    type: 'index'
                },
                {
                    title: '姓名',
                    key: 'col1',
                    align: 'center'
                },
                {
                    title: '职业',
                    key: 'col2',
                    align: 'center'
                },
                {
                    title: '手机号',
                    key: 'col3',
                    align: 'center'
                },
                {
                    title: '用户名',
                    key: 'col4',
                    align: 'center'
                },
                {
                    title: '订单量',
                    key: 'col5',
                    align: 'center'
                },
                {
                    title: '兼职类型',
                    key: 'col6',
                    align: 'center'
                },
                {
                    title: '最近登录',
                    key: 'col7',
                    align: 'center'
                },
                {
                    title: '加入时间',
                    key: 'col8',
                    align: 'center'
                },
                {
                    title: '开放接单',
                    key: 'col9',
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
                    col1: '万江烽火',
                    col2: '小鱼儿',
                    col3: '化妆DGDF套装',
                    col4: '播放中',
                    col5: '播放中',
                    col6: '播放中',
                    col7: '2020.20.20',
                    col8: '播放中',
                    col9: '播放中'
                }
            ],
            page: 1,
            limit: 10,
            counts: this.counts,
            value01: '',
            value02: '',
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
            value2: '',
            model1: '',
            cityList: [
                {
                    value: '0',
                    label: '如文制作'
                },
                {
                    value: '1',
                    label: '视频制作'
                },
                {
                    value: '2',
                    label: '文本制作'
                }
            ],
            modal10: false,
            formRight: {
                input1: '',
                input2: ''
            },
            NewPatrn: '',
            idData: '',
            statusCode: ''
        };
    },
    mounted() {
        this.CouponDataQuery();
    },
    components: {
        tablea
    },
    watch: {
        Datar19: {
            handler(newdata, oldata) {
                this.Datar19 = newdata;
            },
            deep: true,
            immediate: true
        }
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
        // 弹窗
        ModalXiaoyuer(idData) {
            this.idData = idData;
            this.dialogVisible = true;
        },
        // 弹窗输入回调
        xiaoyuerChange() {
            const patrn = /^(\w){6,20}$/;
            const NewPatrn = patrn.exec(this.formRight.input1);
            const NewPatrnN = patrn.exec(this.formRight.input2);
            this.NewPatrn = NewPatrn;
        },
        // 确定时校验
        jiaoyanFunction() {
            this.modal10 = true;
            const patrn = /^(\w){6,20}$/;
            const NewPatrn = patrn.exec(this.formRight.input1);
            const NewPatrnN = patrn.exec(this.formRight.input2);
            if (
                this.formRight.input1 == this.formRight.input2 &&
                this.formRight.input1 !== '' &&
                this.formRight.input2 !== '' &&
                this.NewPatrn != null
            ) {
                this.ResetPasswordButton(); //调用接口
            } else if (this.formRight.input1 != this.formRight.input2) {
                this.$message.success(this.statusDataXiaoyuer.colr1);
            } else if (this.formRight.input1 == '') {
                this.$message.success(this.statusDataXiaoyuer.colr2);
            } else if (this.formRight.input2 == '') {
                this.$message.success(this.statusDataXiaoyuer.colr3);
            } else if (this.formRight.input1 == '' && this.formRight.input2 == '') {
                this.$message.success(this.statusDataXiaoyuer.colr4);
            } else if (this.formRight.input1.length <= 6 || this.formRight.input2 <= 6) {
                if (NewPatrn == null || NewPatrnN == null) {
                    this.$message.success(this.statusDataXiaoyuer.colr5);
                }
            } else if (this.formRight.input1.length >= 21 || this.formRight.input2 >= 21) {
                if (NewPatrn == null || NewPatrnN == null) {
                    this.$message.success(this.statusDataXiaoyuer.colr6);
                }
            } else if (
                (this.formRight.input1.length > 6 && this.formRight.input1.length <= 20) ||
                (this.formRight.input1.length > 6 && this.formRight.input1.length <= 20)
            ) {
                if (NewPatrn == null || NewPatrnN == null) {
                    this.$message.success(this.statusDataXiaoyuer.colr7);
                }
            }
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
        // list查询
        CouponDataQuery() {
            var url = 'admin/sideline/management/list_user';
            var data = {
                limit: this.limit,
                management: true,
                page: this.page,
                sidelineType: this.model1,
                timeEnd: this.end,
                timeStart: this.start,
                usernameLike: this.value01
            };
            this.$axios
                .post(url, data)
                .then((res) => {
                    if (res.status == 200) {
                        const statusCode = res.data.code;
                        this.statusCode = statusCode;
                        if (res.data.code == 200) {
                            var AjaxData = res.data.list;
                            this.counts = res.data.total;
                            var DataAjax19 = [];
                            AjaxData.forEach(function (val, index) {
                                DataAjax19[index] = val;
                                DataAjax19[index].col1 = val.userName;
                                DataAjax19[index].col2 = val.career;
                                DataAjax19[index].col3 = val.phoneNumber;
                                DataAjax19[index].col4 = val.userAccount;
                                DataAjax19[index].col5 = val.orderNum;
                                DataAjax19[index].col6 = val.sidelineTypeName;
                                var date = new Date(val.loginTime);
                                var time1 =
                                    date.getFullYear() +
                                    '-' +
                                    (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                                    '-' +
                                    date.getDate();
                                DataAjax19[index].col7 = time1;
                                var date1 = new Date(val.createTime);
                                var time2 =
                                    date.getFullYear() +
                                    '-' +
                                    (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() + 1) +
                                    '-' +
                                    date1.getDate();
                                DataAjax19[index].col8 = time2;
                                if (val.businessStatus == 0) {
                                    val.businessStatus = '关闭';
                                } else if (val.businessStatus == 1) {
                                    val.businessStatus = '开放';
                                }
                                DataAjax19[index].col9 = val.businessStatus;
                            });
                            this.$nextTick(() => {
                                this.Datar19 = DataAjax19;
                            });
                        } else {
                            this.$nextTick(() => {
                                this.Datar19 = [{ name: '暂无数据！' }];
                            });
                        }
                        if (!res.data.list || res.data.list.length == 0) {
                            this.$nextTick(() => {
                                this.Datar19 = [{ name: '暂无数据！' }];
                            });
                        }
                    }
                })
                .catch((err) => {
                    this.$nextTick(() => {
                        this.Datar19 = [{ name: '暂无数据！' }];
                    });
                });
        },
        // 删除||批量删除
        DeletData(userid) {
            const url = 'admin/sideline/management/delete_user';
            const data = userid;
            this.$axios
                .post(url, data)
                .then((res) => {
                    if (res.status == 200) {
                        const data = res.data;
                        if (data.code == 200) {
                            alert(data.msg);
                            this.CouponDataQuery();
                        } else {
                            alert(data.msg);
                            this.CouponDataQuery();
                        }
                    }
                })
                .catch((err) => {});
        },
        // 添加人员
        AddNewPeopleData() {
            const url = 'admin/sideline/management/save_user';
            const data = {};
            this.$axios
                .post(url, data)
                .then((err) => {
                    if (res.status == 200) {
                        console.log(res);
                    } else {
                        console.log(res);
                    }
                })
                .catch((err) => {});
        },
        // Request重置密码
        ResetPasswordButton() {
            const url = 'admin/sideline/management/reset_pwd/' + this.idData;
            this.$axios
                .post(url)
                .then((res) => {
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            this.$message.success(res.data.msg);
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
.FormItemClass {
    padding-top: 20px;
    box-sizing: border-box;
}
.el-dialog-Class {
    padding-top: 20px;
    border-top: solid 1px #dcdee2;
}
.FormItemClass-left-right {
    padding: 0 40px;
    padding-right: 80px;
}
</style>
