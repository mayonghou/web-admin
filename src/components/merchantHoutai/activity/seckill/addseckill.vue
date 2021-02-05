<template>
    <!-- 添加优惠券活动 -->
    <div class="addseckill" id="addseckill">
        <div class="group-top">
            <label>填写发布的秒杀信息</label>
        </div>
        <el-form :model="addseckill" :rules="rules" ref="addseckill">
            <el-form-item label="活动标题:" prop="title" :label-width="labelWidth">
                <el-input class="inputEl" v-model="addseckill.title" placeholder="添加活动的标题名称"></el-input>
            </el-form-item>
            <el-form-item label="选择活动商品:" prop="selhdcoupon" :label-width="labelWidth">
                <div v-if="addseckill.selhdcoupon != ''">
                    <el-input class="seleLabel" readonly v-model="addseckill.selhdcoupon"></el-input>
                    <el-button class="selectBtn" @click="guanlian">重新关联</el-button>
                </div>
                <el-button
                    @click="guanlian"
                    v-else-if="addseckill.selhdcoupon == ''"
                    class="el-icon-circle-plus-outline couponSel"
                >关联商品</el-button>
            </el-form-item>
            <el-form-item label="发布数量:" prop="number" :label-width="labelWidth">
                <el-input
                    class="inputEl"
                    v-model.number="addseckill.number"
                    placeholder="该优惠券还有 2222 "
                ></el-input>
                <label class="danwei">张</label>
            </el-form-item>
            <el-form-item label="活动标签:" prop="tdynamicTags" :label-width="labelWidth">
                <el-tag
                    :key="item"
                    v-for="item in this.addseckill.tdynamicTags"
                    v-model="addseckill.tdynamicTags"
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
                    placeholder="请输入标签"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                ></el-input>
                <el-button
                    v-else
                    class="button-new-tag"
                    type="text"
                    size="small"
                    @click="showInput"
                >
                    <i class="el-icon-circle-plus-outline"></i>
                </el-button>
            </el-form-item>
            <el-form-item label="秒杀价:" prop="bargain" :label-width="labelWidth">
                <el-input
                    class="inputEl"
                    v-model="addseckill.bargain"
                    onkeyup="value=value.replace(/[^\0-9]./g,'')"
                    placeholder="该优惠券还有 2222 "
                ></el-input>
                <label class="danwei">元</label>
            </el-form-item>
            <el-form-item label="秒杀时间:" prop="time" :label-width="labelWidth">
                <el-date-picker
                    prefix-icon="md-date_range"
                    v-model="addseckill.time"
                    type="daterange"
                    unlink-panels
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    @change="timestamp"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="每人限购:" prop="astrictNum" :label-width="labelWidth">
                <el-input
                    class="inputEl"
                    v-model="addseckill.astrictNum"
                    placeholder="每个用户的领劵上限,默认不限"
                ></el-input>
                <label class="danwei">份</label>
            </el-form-item>
        </el-form>
        <div class="addcouponBtn">
            <el-button class="buttonr" @click="quxiaoBtn">取消</el-button>
            <el-button @click="addseckillData" class="buttonr mL">添加</el-button>
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
            <el-table :data="tableData" border style="width: 100%;">
                <!-- <el-table-column type="selection" width align="center"></el-table-column> -->
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
                            class="bulebutton"
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
    name: 'addseckill',
    data() {
        return {
            labelWidth: '230px',
            tableData: [],
            fullscreen: '',
            inputVisible: false,
            inputValue: '',
            page: 1,
            limit: 10,
            counts: this.counts,
            goodData: '',
            shoppId: '',
            dialogVisible: false,
            startTime: '',
            endTime: '',
            price: '',
            productPrice: '',
            addseckill: {
                id: '',
                title: '',
                tdynamicTags: [],
                selhdcoupon: '',
                number: '',
                bargain: '',
                time: [],
                astrictNum: ''
            },
            rules: {
                title: [
                    {
                        required: true,
                        message: '请输入活动标题',
                        trigger: 'blur'
                    }
                ],
                bargain: [
                    {
                        required: true,
                        message: '请输入秒杀价',
                        trigger: 'blur'
                    }
                ],
                tdynamicTags: [
                    {
                        required: true,
                        message: '请输入活动标签',
                        trigger: 'blur'
                    }
                ],
                selhdcoupon: [
                    {
                        required: true,
                        message: '请选择活动优惠券',
                        trigger: 'blur'
                    }
                ],
                number: [
                    {
                        required: true,
                        message: '请输入发布的优惠券数量',
                        trigger: 'blur'
                    },
                    {
                        type: 'number',
                        message: '请输入数量，只能是数字',
                        trigger: 'change'
                    }
                ],
                time: [
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
        this.getseckill();
        this.timestamp();
    },
    methods: {
        // 关联按钮
        guanlian() {
            this.getAllListproudect();
            this.dialogVisible = true;
        },
        // 全屏
        enlarge() {},
        handleSizeChange(val) {
            this.limit = val;
            this.getAllListproudect();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getAllListproudect();
        },
        // 优惠券搜索
        seacherdata() {
            this.page = 1;
            this.getAllListproudect();
        },
        // 取消
        quxiaoBtn() {
            this.$router.push({ path: './seckillgl' });
        },
        //  选择关联
        GLgoods(row) {
            this.shoppId = row.id;
            this.addseckill.selhdcoupon = row.name;
            this.price = row.price;
            this.dialogVisible = false;
        },
        // 搜索商品
        getAllListproudect() {
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
                        var list = [];
                        data.list.forEach(function (val, index) {
                            list[index] = val;
                            list[index].picture = localStorage.getItem('imgUrl') + val.picture;
                            var date1 = new Date(val.publishAtTime);
                            var time2 =
                                date1.getFullYear() +
                                '-' +
                                (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() + 1) +
                                '-' +
                                date1.getDate(); // + ' ' + date1.getHours() + ':' + date1.getMinutes() + ':' + date1.getSeconds();
                            list[index].time = time2;
                            list[index].price = val.price / 100;
                        });
                        this.tableData = list;
                        this.counts = data.total;
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
        },
        handleClose(item) {
            this.addseckill.tdynamicTags.splice(this.addseckill.tdynamicTags.indexOf(item), 1);
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
                this.addseckill.tdynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        // 时间戳
        timestamp() {
            var data1 = new Date(this.addseckill.time[0]);
            var start = data1.getTime(data1);
            this.startTime = start;
            var data2 = new Date(this.addseckill.time[1]);
            var end = data2.getTime(data2);
            this.endTime = end;
        },
        // 添加按钮
        addseckillData() {
            this.$refs.addseckill.validate((valid) => {
                if (valid) {
                    this.$confirm('是否确定发布秒杀活动【' + this.addseckill.title + '】?', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let data = {
                            id: this.addseckill.id || '',
                            activityPrice: this.addseckill.bargain * 100,
                            activityTabs: this.addseckill.tdynamicTags.join(','),
                            companyId: localStorage.getItem('loginData'),
                            companyName: localStorage.getItem('companyName'),
                            endTime: this.endTime,
                            startTime: this.startTime,
                            industryId: localStorage.getItem('industryId'),
                            numLimitation: this.addseckill.astrictNum,
                            productId: this.shoppId,
                            productNum: this.addseckill.number,
                            title: this.addseckill.title,
                            productPrice: this.price * 100
                        };
                        const loading = this.$loading({
                            lock: true,
                            text: '发布中...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        this.$axios.post('admin/company/activity/flash/publish', data).then((res) => {
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
                                        path: './seckillgl'
                                    });
                                    this.$refs.addseckill.resetFields();
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

        // 查询从新发布的数据
        getseckill() {
            var data = this.$route.query.data;
            if (data != null) {
                this.addseckill.title = data.title;
                this.addseckill.selhdcoupon = data.productName;
                this.addseckill.number = data.productNum;
                this.addseckill.tdynamicTags = data.activityTabs.split(',');
                this.addseckill.bargain = data.activityPrice;
                this.shoppId = data.productId;
                var date = new Date(data.startTime);
                var endDate = new Date(data.endTime);
                var time1 =
                    date.getFullYear() +
                    '-' +
                    (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                    '-' +
                    date.getDate();
                var time2 =
                    endDate.getFullYear() +
                    '-' +
                    (endDate.getMonth() + 1 < 10 ? '0' + (endDate.getMonth() + 1) : endDate.getMonth() + 1) +
                    '-' +
                    endDate.getDate();
                var time = time1 + ',' + time2;
                this.addseckill.time = time.split(',');
                this.addseckill.astrictNum = data.numLimitation;
                this.addseckill.id = data.id;
                this.price = data.productPrice;
            }
        }
    }
};
</script>

<style>
.addseckill {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
}

.group-top {
    width: 100%;
    height: 45px;
    line-height: 45px;
    background-color: #fafafa;
    margin-bottom: 20px;
    margin-top: 20px;
    padding-left: 20px;
}

.inputEl .el-input__inner {
    border: 0;
    border-bottom: 1px solid #c1c1c1;
    border-radius: 0;
    width: 340px;
    text-align: center;
}

.seleLabel {
    width: 260px;
    display: block;
    text-align: center;
    float: left;
}

.seleLabel .el-input__inner {
    color: #2494d2;
    border: 0;
    text-align: center;
}

.addseckill .selectBtn {
    width: 76px;
    height: 21px;
    background-color: #2450d2;
    color: #fff;
    padding: 0;
    border-radius: 8px;
}

.couponSel {
    width: 200px;
    height: 50px;
    border: 1px solid #2450d2;
    color: #2450d2;
}

.couponSel:hover {
    border: 1px solid #2450d2;
    color: #2450d2;
    background-color: #fff;
}

.danwei {
    position: absolute;
    left: 310px;
    top: 2px;
}

.addseckill .el-date-editor {
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid #ccc;
}

.addseckill .addcouponBtn {
    margin-left: 30%;
    margin-top: 100px;
}

.addseckill .addcouponBtn .buttonr {
    width: 90px;
    height: 30px;
    border-radius: 8px;
    background-color: #2450d2;
    color: #fff;
}

.addseckill .addcouponBtn .buttonr.mL {
    margin-left: 100px;
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

.button-new-tag {
    margin-left: 10px;
}

.addseckill .el-form-item__label {
    text-align: right;
}

.addseckill .bulebutton {
    width: 76px;
    height: 20px;
    border-radius: 8px;
    background-color: #2450d2;
    color: #fff;
    padding: 0;
}
</style>
