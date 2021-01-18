<template>
    <div class="vocationList" id="vocationList">
        <div class="header_Top">
            <div class="top_text">
                <label>行业查询</label>
            </div>
            <div class="top_search">
                <el-input v-model="value" placeholder="输入行业名称"></el-input>
                <el-button class="sear_timebutton">查询</el-button>
            </div>
        </div>
        <div class="label-button">
            <div class="tab-button">
                <el-button @click="addVocation" class="button">添加行业</el-button>
            </div>
        </div>
        <!-- 表格 -->
        <el-table :data="tableData" border style="width: 100%; background: #F5F9F1;">
            <el-table-column type="selection" width></el-table-column>
            <el-table-column prop="date" label="序号" width="180"></el-table-column>
            <el-table-column prop="name" label="行业全称" width="180"></el-table-column>
            <el-table-column prop="phone" label="行业简介"></el-table-column>
            <el-table-column label="操作" width align="center">
                <template slot-scope="scope">
                    <el-button class="tab_oragel button">置顶</el-button>
                    <el-button @click="zhiweiGL(scope.row)" class="tab_bule button">管理</el-button>
                    <el-button @click="updateVocation(scope.row)" class="tab_green button">修改</el-button>
                    <el-button class="tab_red button">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="pagintion"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
        ></el-pagination>

        <!-- 添加行业 -->
        <el-dialog title="添加行业" :visible.sync="dialogVisibleVocation" width="50%">
            <div class="iconEnl" @click="enlarge">
                <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                    <i class="iconfont icon-quanping"></i>
                </el-tooltip>
            </div>
            <el-form :model="vocationform" :rules="rules" ref="vocationform">
                <el-form-item label="行业名称:" prop="vocationName" :label-width="formLabelWidth">
                    <el-input
                        class="formWidth"
                        v-model="vocationform.vocationName"
                        placeholder="请输入行业名称"
                    ></el-input>
                </el-form-item>
                <el-form-item label="行业简称:" prop="abbreviation" :label-width="formLabelWidth">
                    <el-input
                        class="formWidth"
                        v-model="vocationform.abbreviation"
                        placeholder="请输入行业简称"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span class="dialog-footer">
                <el-button class="button">保存</el-button>
            </span>
        </el-dialog>
        <!-- 修改行业 -->
        <el-dialog title="修改行业" :visible.sync="dialogVisibleUpdateVocation" width="50%">
            <div class="iconEnl" @click="enlarge">
                <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                    <i class="iconfont icon-quanping"></i>
                </el-tooltip>
            </div>
            <el-form :model="updateform" :rules="rules" ref="vocationform">
                <el-form-item label="行业名称:" prop="vocationName" :label-width="formLabelWidth">
                    <el-input
                        class="formWidth"
                        v-model="updateform.vocationName"
                        placeholder="请输入行业名称"
                    ></el-input>
                </el-form-item>
                <el-form-item label="行业简称:" prop="abbreviation" :label-width="formLabelWidth">
                    <el-input
                        class="formWidth"
                        v-model="updateform.abbreviation"
                        placeholder="请输入行业简称"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span class="dialog-footer">
                <el-button class="button">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'vocationList',
    data() {
        return {
            value: '',
            valueDialog: '',
            time: '',
            valueNum: '1',
            fullscreen: '',
            showClose: false,
            formLabelWidth: '280px',
            dialogVisibleUpdateVocation: false,
            dialogVisibleVocation: false,
            tableData: [
                {
                    date: '贵州万疆烽火科技有限公司',
                    name: '王小虎',
                    phone: '12345678901',
                    address: '000',
                    leixing: '苹果',
                    tiem: '2020-9-15'
                },
                {
                    date: '贵州万疆烽火科技有限公司',
                    name: '王小虎',
                    phone: '12345678901',
                    address: '000',
                    leixing: '香蕉',
                    tiem: '2020-9-15'
                }
            ],
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4,
            vocationform: {
                vocationName: '',
                abbreviation: ''
            },
            updateform: {
                vocationName: '',
                abbreviation: ''
            },
            rules: {
                vocationName: [
                    {
                        required: true,
                        message: '请输入行业名称',
                        trigger: 'blur'
                    }
                ],
                abbreviation: [
                    {
                        required: true,
                        message: '请输入行业简称',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    mounted() {},
    methods: {
        // 添加行业
        addVocation() {
            this.dialogVisibleVocation = true;
        },

        // 修改行业
        updateVocation(row) {
            this.dialogVisibleUpdateVocation = true;
        },

        // 管理
        zhiweiGL() {
            this.$router
                .push({
                    path: './zhiweiGL'
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        // 全屏事件
        enlarge() {},

        // 页码
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    }
};
</script>

<style scoped>
.vocationList {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
}

.header_Top {
    width: 100%;
    height: 114px;
    background-color: #fafbfa;
    padding-left: 20px;
}

.top_search {
    line-height: 31px;
    margin-top: 10px;
}

.top_search .search {
    width: 200px;
    height: 31px;
    float: left;
}

.sear_timebutton {
    width: 151px;
    height: 30px;
    background: #2450d2;
    color: #ffffff;
    border-radius: 8px;
    margin-left: 39px;
}

.label-button {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
}

.label-button .label {
    float: left;
    font-size: 14px;
}

.label-button .tab-button {
    float: right;
}

.tab-button .button {
    width: 104px;
    height: 30px;
    margin-left: 15px;
    background: #2482d2;
    color: #fff;
}

.el-badge__content.is-fixed {
    top: 10px;
}

.el-table .button {
    width: 66px;
    height: 22px;
    color: #fff;
    padding: 0px;
    border-radius: 8px;
    font-size: 12px;
}

.el-table .tab_oragel {
    background: #ff8d00;
}
.el-table .tab_bule {
    background: #2494d2;
}
.el-table .tab_green {
    background: #109955;
}

.el-table .tab_red {
    background: #ff0000;
}

.pagintion {
    /* padding-top: 30px;
		padding-left: 25%; */
    background-color: #ffffff;
}

.el-dialog {
    position: relative;
}
.el-dialog__header {
    background-color: #f5f9f1;
    border: 1px solid #f5f9f1;
}
.iconEnl {
    top: 20px;
    font-size: 12px;
    right: 60px;
    position: absolute;
}
.dialog-footer {
    width: 100%;
    margin-left: 42%;
}
.dialog-footer .button {
    width: 151px;
    height: 30px;
    background: #2450d2;
    color: #ffffff;
    border-radius: 8px;
    margin-top: 30px;
}

.dialogSearch {
    width: 100%;
    height: 80px;
}
.dialogSearch .search {
    width: 277px;
    height: 41px;
    float: left;
    margin-left: 25%;
}
.search-but {
    float: left;
    margin-left: 10px;
    color: #2450d2;
    font-size: 12px;
}
.formWidth {
    width: 194px;
}
.el-dialog .el-input__inner {
    margin-left: 20px;
    border: 0px;
    border-bottom: 1px solid #bbbbbb;
    border-radius: 0px;
}
.el-form-item__label {
    text-align: right;
}
</style>
