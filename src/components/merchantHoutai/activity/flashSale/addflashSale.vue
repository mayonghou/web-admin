<template>
    <div class="addActivity" id="addActivityflashSale">
        <div class="addActivity-top">
            <label>填写发布的限时抢购活动信息</label>
        </div>
        <el-form :model="addActivitydata" :rules="rules" ref="addActivitydata">
            <el-form-item label="选择活动商品:" prop="activityShopp" :label-width="labelwidth">
                <div v-if="addActivitydata.activityShopp != ''">
                    <el-input
                        readonly
                        class="shoppinpout"
                        v-model="addActivitydata.activityShopp"
                        style
                    ></el-input>
                    <el-button @click="shoppingDG" class="shoppXuanzhe">从新关联</el-button>
                </div>
                <el-button
                    @click="shoppingDG"
                    v-else-if="addActivitydata.activityShopp == ''"
                    class="btoun el-icon-circle-plus-outline"
                >关联商品</el-button>
            </el-form-item>
            <el-form-item label="发布数量:" prop="activityNumber" :label-width="labelwidth">
                <el-input
                    class="ElinputT"
                    placeholder="请输入发布数量"
                    v-model.number="addActivitydata.activityNumber"
                ></el-input>
                <label class="zhang">张</label>
            </el-form-item>
            <el-form-item label="活动标签:" prop="activityTags" :label-width="labelwidth">
                <el-tag
                    :key="item"
                    v-for="item in this.addActivitydata.activityTags"
                    v-model="addActivitydata.activityTags"
                    class="eltag"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(item)"
                >{{item}}</el-tag>
                <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                ></el-input>
                <el-input v-else class="button-new-tag" type="text" size="small" @click="showInput">
                    <i class="el-icon-circle-plus-outline"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="抢购价:" prop="activityPrice" :label-width="labelwidth">
                <el-input
                    class="ElinputT"
                    placeholder="请输入抢购价"
                    oninput="value=value.replace(/[^0-9.]/g,'')"
                    v-model="addActivitydata.activityPrice"
                ></el-input>
                <label class="zhang">元</label>
            </el-form-item>
            <el-form-item label="活动时间:" prop="activityTime" :label-width="labelwidth">
                <el-date-picker
                    prefix-icon="md-date_range"
                    v-model="addActivitydata.activityTime"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    @change="timestamp"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="每人限购:" prop="activityLimit" :label-width="labelwidth">
                <el-input
                    class="ElinputT"
                    placeholder="每个用户购买的上限"
                    oninput="value=value.replace(/[^0-9]/g,'')"
                    v-model.number="addActivitydata.activityLimit"
                ></el-input>
                <label class="zhang">份</label>
            </el-form-item>
        </el-form>
        <div class="addactivityBtn">
            <el-button @click="quxiaofabu" class="buttonr">取消</el-button>
            <el-button @click="addActivit" class="buttonr mL">添加</el-button>
        </div>

        <el-dialog title="关联商品" :visible.sync="dialogVisible" width="80%">
            <div class="iconEnlorder" @click="enlarge">
                <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                    <i class="iconfont icon-quanping"></i>
                </el-tooltip>
            </div>
            <div class="goodsSeacher">
                <i class="el-icon-search icon"></i>
                <el-input v-model="goodData"></el-input>
                <el-button @click="seacherdata" type="text" class="seacher">搜索</el-button>
            </div>
            <el-table :data="tableData" style="width: 100%;" border>
                <el-table-column prop="order" label="序号" width="100" align="center"></el-table-column>
                <el-table-column prop="name" label="商品名称" width align="center"></el-table-column>
                <el-table-column prop="price" label="商品售价" align="center">
                    <template slot-scope="scope">
                        <label>{{scope.row.price}}￥</label>
                    </template>
                </el-table-column>
                <el-table-column prop="picture" label="商品封面" align="center">
                    <template slot-scope="scope">
                        <img width="80" height="80" :src="scope.row.picture" />
                    </template>
                </el-table-column>
                <el-table-column prop="no" label="商品货号" align="center"></el-table-column>
                <el-table-column prop="time" label="发布时间" align="center"></el-table-column>
                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                        <el-button
                            @click="GLgoods(scope.row)"
                            v-if="scope.row.canBind == true && scope.row.id != shoppId"
                            class="shoppXuanzhe"
                            size="small"
                        >选择关联</el-button>
                        <el-button
                            type="text"
                            style="color: #FF8D00;"
                            v-if="scope.row.id == shoppId"
                            size="small"
                        >当前关联</el-button>
                        <el-button
                            type="text"
                            style="color: #FF8D00;"
                            v-if="scope.row.canBind == false"
                            size="small"
                        >已关联</el-button>
                    </template>
                </el-table-column>
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
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'addActivityflashSale',
    data() {
        return {
            labelwidth: '230px',
            dialogVisible: false,
            fullscreen: '',
            goodData: '',
            tableData: [],
            price: '',
            page: 1,
            limit: 20,
            counts: this.counts,
            shoppId: '',
            inputValue: '',
            inputVisible: false,
            addActivitydata: {
                activityShopp: '',
                activityNumber: '',
                activityTags: [],
                activityPrice: '',
                activityTime: [],
                activityLimit: ''
            },
            rules: {
                activityShopp: [
                    {
                        required: true,
                        message: '请选择商品',
                        trigger: 'blur'
                    }
                ],
                activityNumber: [
                    {
                        required: true,
                        message: '请输入需要发布的数量',
                        trigger: 'blur'
                    },
                    {
                        type: 'number',
                        message: '只能输入数字',
                        trigger: 'blur'
                    }
                ],
                activityTags: [
                    {
                        required: true,
                        message: '请添加活动标签',
                        trigger: 'blur'
                    }
                ],
                activityPrice: [
                    {
                        required: true,
                        message: '请输入抢购价',
                        trigger: 'blur'
                    }
                ],
                activityTime: [
                    {
                        required: true,
                        message: '请选择活动时间',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    mounted() {
        this.getRepetitionData();
        this.timestamp();
    },
    methods: {
        // 关联商品弹框
        shoppingDG() {
            this.getActivityAllList();
            this.dialogVisible = true;
        },
        // 全屏
        enlarge() {},
        handleSizeChange(val) {
            this.limit = val;
            this.getActivityAllList();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getActivityAllList();
        },
        // 商品搜索
        seacherdata() {
            this.page = 1;
            this.getActivityAllList();
        },
        // // 时间戳
        timestamp() {
            var data1 = new Date(this.addActivitydata.activityTime[0]);
            var start = data1.getTime(data1);
            this.startTime = start;
            var data2 = new Date(this.addActivitydata.activityTime[1]);
            var end = data2.getTime(data2);
            this.endTime = end;
        },
        // 选择商品关联
        GLgoods(row) {
            this.shoppId = row.id;
            this.addActivitydata.activityShopp = row.name;
            this.price = row.price * 100;
            this.dialogVisible = false;
        },
        // 查询商品
        getActivityAllList() {
            let data = {
                companyId: localStorage.getItem('loginData'),
                limit: this.limit,
                page: this.page,
                productNameLike: this.goodData
            };
            this.$axios.post('admin/company/activity/all/list_product', data).then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        var liste = [];
                        var times = '';
                        data.list.forEach(function (val, index) {
                            liste[index] = val;
                            liste[index].picture = localStorage.getItem('imgUrl') + val.picture;
                            times = val.publishAtTime;
                            var date = new Date(times);
                            var time1 =
                                date.getFullYear() +
                                '-' +
                                (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                                '-' +
                                date.getDate() +
                                ' ';
                            liste[index].time = time1;
                            liste[index].price = val.price / 100;
                        });
                        this.tableData = liste;
                        this.counts = data.total;
                    } else {
                        this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'error'
                        });
                        this.dialogVisible = false;
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: data.msg,
                        type: 'error'
                    });
                    this.dialogVisible = false;
                }
            });
        },

        handleClose(item) {
            this.addActivitydata.activityTags.splice(this.addActivitydata.activityTags.indexOf(item), 1);
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick((_) => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.addActivitydata.activityTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        // 取消发布
        quxiaofabu() {
            this.$router.push({
                path: './flashSale'
            });
            this.$refs.addActivitydata.resetFields();
        },
        // 发布按钮
        addActivit() {
            this.$refs.addActivitydata.validate((valid) => {
                if (valid) {
                    this.$confirm('是否确定发布商品【' + this.addActivitydata.activityShopp + '】限时抢购活动?', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let data = {
                            activityPrice: this.addActivitydata.activityPrice * 100,
                            activityTabs: this.addActivitydata.activityTags.join(','),
                            productNum: this.addActivitydata.activityNumber,
                            startTime: this.startTime,
                            endTime: this.endTime,
                            numLimitation: this.addActivitydata.activityLimit,
                            companyId: parseInt(localStorage.getItem('loginData')),
                            companyName: localStorage.getItem('companyName'),
                            prevActivityAllId: this.prevActivityAllId,
                            productPrice: this.price,
                            productId: this.shoppId
                        };
                        const loading = this.$loading({
                            lock: true,
                            text: '发布中...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        this.$axios.post('admin/admin/rushPurchase/publishRushPurchase', data).then((res) => {
                            loading.close();
                            if (res.status == 200) {
                                var data = res.data;
                                if (data.code == 200) {
                                    this.$message({
                                        showClose: true,
                                        message: data.msg,
                                        type: 'success'
                                    });
                                    this.$router.push({
                                        path: './flashSale'
                                    });
                                    this.$refs.addActivitydata.resetFields();
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
        getRepetitionData() {
            var data = this.$route.query.data;
            if (data != undefined) {
                this.shoppId = data.productId;
                this.prevActivityAllId = data.id;
                var tab = [];
                data.activityTabs.split(',').forEach(function (val, index) {
                    tab[index] = val;
                });
                this.addActivitydata.activityTags = tab;
                this.addActivitydata.activityShopp = data.productName;
                this.addActivitydata.activityNumber = data.productNum;
                this.addActivitydata.activityPrice = data.activityPrice / 100;
                this.addActivitydata.activityTime = data.time.split('----');
                this.addActivitydata.activityLimit = data.numLimitation;
                this.price = data.productPrice;
            }
        }
    }
};
</script>

<style>
.addActivity {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
}
.addActivity .addActivity-top {
    padding-left: 20px;
    height: 45px;
    background-color: #fafbfa;
    line-height: 45px;
    margin-top: 20px;
    margin-bottom: 20px;
}
.addActivity .shoppXuanzhe {
    width: 80px;
    height: 20px;
    padding: 0;
    background-color: #2450d2;
    color: #fff;
    margin-top: 8px;
    border-radius: 8px;
}
.addActivity .el-form-item__label {
    text-align: right;
}
.addActivity .btoun {
    border: 1px solid #2494d2;
    color: #2494d2;
    width: 200px;
    height: 50px;
}
.iconEnlorder {
    position: relative;
}
.iconEnlorder .iconfont {
    position: absolute;
    right: 80px;
    top: -64px;
}
.goodsSeacher {
    width: 350px;
    height: 45px;
    background-color: #faffe0;
    margin: 0 auto;
    margin-bottom: 25px;
    position: relative;
    line-height: 30px;
}
.icon {
    position: absolute;
    z-index: 1;
    top: 17px;
    left: 10px;
}
.el-input {
    margin-top: 7px;
    margin-left: 10px;
    width: 290px;
    height: 30px;
    border: 0px;
}
.seacher {
    margin-left: 10px;
}
.eltag {
    margin-left: 10px;
}
.addActivity .ElinputT .el-input__inner {
    width: 340px;
    border: 0;
    border-bottom: 1px solid #c1c1c1;
    border-radius: 0;
}
.zhang {
    position: absolute;
    left: 340px;
    top: 10px;
}
.addActivity .el-input__inner {
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid #c1c1c1;
}
.addactivityBtn {
    margin-left: 30%;
    margin-top: 100px;
}
.addactivityBtn .buttonr {
    width: 90px;
    height: 30px;
    border-radius: 8px;
    background-color: #2450d2;
    color: #fff;
}
.addactivityBtn .buttonr.mL {
    margin-left: 100px;
}
.shoppinpout .el-input__inner {
    color: #2494d2;
    width: 260px;
    display: inline-block;
    text-align: center;
    border: 0;
}
</style>
