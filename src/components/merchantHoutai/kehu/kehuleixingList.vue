<template>
    <div
        class="kehuleixingList"
        id="kehuleixingList"
        v-loading="fullscreenLoading"
        :element-loading-text="loadingText"
        element-loading-background="rgba(0, 0, 0, 0.7)"
    >
        <div class="add_Del">
            <el-button @click="add_kehuleixing" class="button add_kehuleixing">添加客户类型</el-button>
        </div>
        <!-- 表格 -->
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="index" type="index" label="序号" align="center"></el-table-column>
            <el-table-column prop="type" label="客户类型" align="center"></el-table-column>
            <el-table-column prop="productNum" label="总计购买商品数量" align="center"></el-table-column>
            <el-table-column prop="totalConsumption" label="总计消费" align="center"></el-table-column>
            <el-table-column prop="totalOrder" label="总计单量" align="center"></el-table-column>
            <el-table-column label="操作" width="250" align="center">
                <template slot-scope="scope">
                    <el-button @click="chakanxiangqing(scope.row)" class="tab_xq tab_button">查看详情</el-button>
                    <el-button @click="update_kehuleixing(scope.row)" class="tab_gl tab_button">编辑</el-button>
                    <el-button @click="del_kehuship(scope.row)" class="tab_del tab_button">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 添加客户类型 -->
        <el-dialog title="添加客户类型" :visible.sync="dialogVisibleaddkehuleixing" width="50%">
            <div class="iconEnlkh" @click="enlarge">
                <el-tooltip effect="dark" :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom">
                    <i class="iconfont icon-quanping"></i>
                </el-tooltip>
            </div>
            <el-form :model="addkehuleixing" :rules="rules" ref="addkehuleixing">
                <el-form-item label="客户类型名称:" prop="kehuleixingName" :label-width="formLabelWidth">
                    <el-input
                        class="formWidth"
                        v-model="addkehuleixing.kehuleixingName"
                        placeholder="请输入客户类型名称"
                    ></el-input>
                </el-form-item>
                <el-form-item label="总计购买的商品数量:" prop="shoppingNum" :label-width="formLabelWidth">
                    <el-input
                        class="formWidth"
                        v-model.number="addkehuleixing.shoppingNum"
                        placeholder="请输入购买的商品数量"
                    ></el-input>
                </el-form-item>
                <el-form-item label="总计消费:" prop="countExpense" :label-width="formLabelWidth">
                    <el-input
                        class="formWidth"
                        v-model.number="addkehuleixing.countExpense"
                        placeholder="请输入总计消费"
                    ></el-input>
                </el-form-item>
                <el-form-item label="总计单量:" prop="countOutput" :label-width="formLabelWidth">
                    <el-input
                        class="formWidth"
                        v-model.number="addkehuleixing.countOutput"
                        placeholder="请输入总计单量"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span class="dialog-footer">
                <el-button @click="addkehuleixingsz" class="addkehuleixing button">添加</el-button>
            </span>
        </el-dialog>
        <!-- 查看详情 -->
        <el-dialog title="查看详情" :visible.sync="dialogVisibleakehuleixingxiangqing" width="50%">
            <div class="iconEnlkh" @click="enlarge">
                <el-tooltip effect="dark" :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom">
                    <i class="iconfont icon-quanping"></i>
                </el-tooltip>
            </div>
            <el-form :model="kehuleixingxiangqing" :rules="rules" ref="kehuleixingxiangqing">
                <el-form-item label="客户类型名称:" prop="kehuleixingName" :label-width="formLabelWidth">
                    <el-input
                        class="formWidth ff"
                        v-model="kehuleixingxiangqing.kehuleixingName"
                        placeholder="请输入客户类型名称"
                        disabled
                    ></el-input>
                </el-form-item>
                <el-form-item label="总计购买的商品数量:" prop="shoppingNum" :label-width="formLabelWidth">
                    <el-input
                        class="formWidth ff"
                        v-model="kehuleixingxiangqing.shoppingNum"
                        placeholder="请输入购买的商品数量"
                        disabled
                    ></el-input>
                </el-form-item>
                <el-form-item label="总计消费:" prop="countExpense" :label-width="formLabelWidth">
                    <el-input
                        class="formWidth ff"
                        v-model="kehuleixingxiangqing.countExpense"
                        placeholder="请输入总计消费"
                        disabled
                    ></el-input>
                </el-form-item>
                <el-form-item label="总计单量:" prop="countOutput" :label-width="formLabelWidth">
                    <el-input
                        class="formWidth ff"
                        v-model="kehuleixingxiangqing.countOutput"
                        placeholder="请输入总计单量"
                        disabled
                    ></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 编辑 -->
        <el-dialog title="编辑" :visible.sync="dialogVisibleakehuleixingbianji" width="50%">
            <div class="iconEnlkh" @click="enlarge">
                <el-tooltip effect="dark" :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom">
                    <i class="iconfont icon-quanping"></i>
                </el-tooltip>
            </div>
            <el-form :model="kehuleixingUpdata" :rules="rules" ref="kehuleixingUpdata">
                <el-form-item label="客户类型名称:" prop="kehuleixingName" :label-width="formLabelWidth">
                    <el-input
                        class="formWidth"
                        v-model="kehuleixingUpdata.kehuleixingName"
                        placeholder="请输入客户类型名称"
                    ></el-input>
                </el-form-item>
                <el-form-item label="总计购买的商品数量:" prop="shoppingNum" :label-width="formLabelWidth">
                    <el-input
                        class="formWidth"
                        v-model.number="kehuleixingUpdata.shoppingNum"
                        placeholder="请输入购买的商品数量"
                    ></el-input>
                </el-form-item>
                <el-form-item label="总计消费:" prop="countExpense" :label-width="formLabelWidth">
                    <el-input
                        class="formWidth"
                        v-model.number="kehuleixingUpdata.countExpense"
                        placeholder="请输入总计消费"
                    ></el-input>
                </el-form-item>
                <el-form-item label="总计单量:" prop="countOutput" :label-width="formLabelWidth">
                    <el-input
                        class="formWidth"
                        v-model.number="kehuleixingUpdata.countOutput"
                        placeholder="请输入总计单量"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span class="dialog-footer">
                <el-button @click="updatekehuleixing" class="addkehuleixing button">修改</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import bus from '../../common/bus.js';
export default {
    name: 'kehuleixingList',
    data() {
        return {
            formLabelWidth: '300px',
            dialogVisibleaddkehuleixing: false,
            dialogVisibleakehuleixingxiangqing: false,
            dialogVisibleakehuleixingbianji: false,
            fullscreen: '',
            tableData: [],
            fullscreenLoading: false,
            loadingText: '加载中...',
            addkehuleixing: {
                kehuleixingName: '',
                shoppingNum: '',
                countExpense: '',
                countOutput: ''
            },
            kehuleixingxiangqing: {
                kehuleixingName: '',
                shoppingNum: '',
                countExpense: '',
                countOutput: ''
            },
            kehuleixingUpdata: {
                kehuleixingName: '',
                shoppingNum: '',
                countExpense: '',
                countOutput: '',
                id: ''
            },
            rules: {
                kehuleixingName: [{ required: true, message: '请输入客户类型名称', trigger: 'blur' }],
                shoppingNum: [
                    { required: true, message: '请输入购买的商品数量', trigger: 'blur' },
                    { type: 'number', message: '只能是数字', trigger: 'change' }
                ],
                countExpense: [
                    { required: true, message: '请输入总计消费', trigger: 'blur' },
                    { type: 'number', message: '只能是数字', trigger: 'change' }
                ],
                countOutput: [
                    { required: true, message: '请输入总计单量', trigger: 'blur' },
                    { type: 'number', message: '只能是数字', trigger: 'change' }
                ]
            },
            id: ''
        };
    },
    mounted() {
        this.getConsumerTypeList();
    },
    methods: {
        del_kehuType() {},
        enlarge() {},
        // 添加会员按钮
        add_kehuleixing() {
            this.dialogVisibleaddkehuleixing = true;
        },
        // 添加保存
        addkehuleixingsz() {
            this.$refs.addkehuleixing.validate((valid) => {
                if (valid) {
                    this.$confirm('是否确定发布名称为【' + this.addkehuleixing.kehuleixingName + '】的客户类型?', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let data = {
                            id: parseInt(this.id),
                            productNum: this.addkehuleixing.shoppingNum,
                            totalConsumption: this.addkehuleixing.countExpense,
                            totalOrder: this.addkehuleixing.countOutput,
                            type: this.addkehuleixing.kehuleixingName
                        };
                        const loading = this.$loading({
                            lock: true,
                            text: '发布中...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        this.$axios.post('admin/consumerManage/addConsumerType', data).then((res) => {
                            loading.close();
                            if (res.status == 200) {
                                var data = res.data;
                                if (data.code == 200) {
                                    this.$message({
                                        showClose: true,
                                        message: data.msg,
                                        type: 'success'
                                    });
                                    this.dialogVisibleaddkehuleixing = false;
                                    this.getConsumerTypeList();
                                    this.$refs.addkehuleixing.resetFields();
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
                }
            });
        },
        //查看详情
        chakanxiangqing(row) {
            this.dialogVisibleakehuleixingxiangqing = true;
            this.kehuleixingxiangqing.id = row.id;
            this.kehuleixingxiangqing.kehuleixingName = row.type;
            this.kehuleixingxiangqing.shoppingNum = row.productNum;
            this.kehuleixingxiangqing.countExpense = row.totalConsumption;
            this.kehuleixingxiangqing.countOutput = row.totalOrder;
        },
        // 删除
        del_kehuship(row) {
            this.$confirm('是否确定删除名称为【' + row.type + '】的客户类型?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: '删除中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios.get('admin/consumerManage/delConsumerType?id=' + row.id).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.getConsumerTypeList();
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
        // 编辑
        update_kehuleixing(row) {
            this.kehuleixingUpdata.id = row.id;
            this.kehuleixingUpdata.kehuleixingName = row.type;
            this.kehuleixingUpdata.shoppingNum = row.productNum;
            this.kehuleixingUpdata.countExpense = row.totalConsumption;
            this.kehuleixingUpdata.countOutput = row.totalOrder;
            this.dialogVisibleakehuleixingbianji = true;
        },
        updatekehuleixing() {
            this.$refs.kehuleixingUpdata.validate((valid) => {
                if (valid) {
                    this.$confirm('是否确定修改名称为【' + this.kehuleixingUpdata.kehuleixingName + '】的客户类型?', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let data = {
                            id: this.kehuleixingUpdata.id,
                            productNum: this.kehuleixingUpdata.shoppingNum,
                            totalConsumption: this.kehuleixingUpdata.countExpense,
                            totalOrder: this.kehuleixingUpdata.countOutput,
                            type: this.kehuleixingUpdata.kehuleixingName
                        };
                        const loading = this.$loading({
                            lock: true,
                            text: '修改中...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        this.$axios.post('admin/consumerManage/updateConsumerType', data).then((res) => {
                            loading.close();
                            if (res.status == 200) {
                                var data = res.data;
                                if (data.code == 200) {
                                    this.$message({
                                        showClose: true,
                                        message: data.msg,
                                        type: 'success'
                                    });
                                    this.dialogVisibleakehuleixingbianji = false;
                                    this.getConsumerTypeList();
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
                }
            });
        },
        // 客户类型设置列表
        getConsumerTypeList() {
            var data = {
                limit: this.limit,
                page: this.page
            };
            this.$axios.post('admin/consumerManage/queryConsumerTypeList', data).then((res) => {
                this.fullscreenLoading = false;
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.tableData = data.data.dataList;
                        console.log(this.tableData);
                        // this.counts = data.data.totalCount;
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
.iconEnlkh {
    position: relative;
}
.iconEnlkh .iconfont {
    position: absolute;
    right: 30px;
    top: -64px;
    font-size: 14px;
}

.formWidth {
    width: 194px;
    text-align: left;
}

.clearfix {
    clear: both;
}

.kehuleixingList {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
}

.search {
    width: 200px;
    height: 31px;
}

.top_time {
    float: left;
    margin-left: 240px;
    margin-top: -30px;
}

.top_time .button {
    width: 151px;
    height: 30px;
    font-size: 14px;
    color: #ffffff;
    border-radius: 8px;
    background: #2450d2;
    margin-left: 30px;
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

    padding: 0;
}

.add_Del .add_kehuleixing {
    background: #2482d2;
    padding: 0;
}
.add_Del .del_kehuleixing {
    background-color: #ff0000;
    padding: 0;
}
.kehuleixingList .addkehuleixing {
    width: 151px;
    height: 30px;
    font-size: 14px;
    color: #ffffff;
    border-radius: 8px;
    background: #2450d2;
    margin-left: 40%;
    margin-top: 50px;
}
.kehuleixingList .el-dialog .el-input .el-input__inner {
    border-radius: 0;
    border: 0;
    border-bottom: 1px solid #c1c1c1;
    background-color: #fff;
}
.el-dialog .el-input.ff .el-input__inner {
    border: 0px;
    cursor: auto;
}
.el-table {
    margin-top: 20px;
}

.pagintion {
    padding-top: 30px;
    padding-left: 0%;
}

.tab_button {
    width: 66px;
    height: 22px;
    line-height: 5px;
    color: #fff;
}

.el-table .tab_gl {
    background-color: #109955;
    width: 66px;
    height: 22px;
    line-height: 5px;
    color: #fff;
}

.el-table .tab_xq {
    background-color: #2450d2;
    text-align: center;
    padding: 0;
    width: 70px;
    height: 30px;
    font-size: 14px;
    line-height: 5px;
    color: #fff;
}

.el-table .tab_del {
    background-color: #ff0000;
    width: 70px;
    height: 30px;
    font-size: 14px;
    line-height: 5px;
    color: #fff;
}
.kehuleixingList .el-form-item__label {
    text-align: right;
}
</style>
