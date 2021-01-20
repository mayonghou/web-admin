<template>
    <div class="addcouponControlvoucher" id="addcouponControlvoucher">
        <!-- 代金卷 -->
        <div class="coupon-top">
            <label>编辑代金券信息</label>
        </div>
        <el-form :model="addcoupons" :rules="rules" ref="addcoupons">
            <el-form-item label="优惠券名称:" prop="couName" :label-width="labelWidth">
                <el-input
                    class="Elinput"
                    v-model="addcoupons.couName"
                    placeholder="例如:全场优惠24元,点击立抢"
                ></el-input>
            </el-form-item>
            <el-form-item label="可使用商品:" prop="radio" :label-width="labelWidth">
                <el-radio v-model="addcoupons.radio" :label="radioOne">全场通用</el-radio>
                <el-radio v-model="addcoupons.radio" :label="radioTwo">指定商品</el-radio>
            </el-form-item>
            <el-form-item
                label="选择活动商品:"
                v-if="addcoupons.radio == 2"
                prop="selhdcoupon"
                :label-width="labelWidth"
            >
                <div v-if="addcoupons.selhdcoupon != ''">
                    <label class="seleLabel">{{addcoupons.selhdcoupon}}</label>
                    <el-button class="selectBtn" @click="guanlian">重新关联</el-button>
                </div>
                <el-button
                    @click="guanlian"
                    v-else-if="addcoupons.selhdcoupon == ''"
                    class="el-icon-circle-plus-outline couponSel"
                >关联商品</el-button>
            </el-form-item>
            <el-form-item label="规则:" prop="price" :label-width="labelWidth">
                <label class>抵扣</label>
                <el-input class="inputEl" v-model.number="addcoupons.price" placeholder="价格"></el-input>
                <label class>元</label>
            </el-form-item>
            <el-form-item label="有效期:" prop="time" :label-width="labelWidth">
                <el-input class="Elinput" v-model.number="addcoupons.time" placeholder="填写有效期"></el-input>
                <label class="danwei">天</label>
            </el-form-item>
            <el-form-item label="发行数量:" prop="number" :label-width="labelWidth">
                <el-input
                    class="Elinput"
                    v-model.number="addcoupons.number"
                    placeholder="每个用户的领劵上限,默认不限"
                ></el-input>
                <label class="danwei">张</label>
            </el-form-item>
        </el-form>
        <div class="addcouponBtn">
            <el-button @click="quxiaoadd" class="buttonr">取消</el-button>
            <el-button @click="addcoupondaijinjuan" class="buttonr mL">添加</el-button>
        </div>

        <el-dialog title="关联商品" :visible.sync="dialogVisible" width="80%">
            <div class="iconEnlorder" @click="enlarge">
                <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                    <i class="iconfont icon-quanping"></i>
                </el-tooltip>
            </div>
            <div class="goodsSeacher">
                <el-input v-model="goodData">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <el-button @click="seacherdata" type="text" class="seacher">搜索</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%;">
                <!-- <el-table-column type="selection" width align="center"></el-table-column> -->
                <el-table-column prop="order" label="序号" width="100" align="center"></el-table-column>
                <el-table-column prop="name" label="商品名称" width align="center"></el-table-column>
                <el-table-column prop="price" label="商品售价" align="center"></el-table-column>
                <el-table-column prop="picture" label="商品封面" align="center">
                    <template slot-scope="scope">
                        <img width="80" height="80" :src="scope.row.picture" />
                    </template>
                </el-table-column>
                <el-table-column prop="no" label="商品货号" align="center"></el-table-column>
                <el-table-column prop="publishAtTime" label="发布时间" align="center"></el-table-column>
                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                        <el-button
                            @click="GLgoods(scope.row)"
                            v-show=" scope.row.canBind == true && scope.row.id != shoppId"
                            class="bulebutton"
                            size="small"
                        >选择关联</el-button>
                        <el-button
                            type="text"
                            style="color: #2971FF;"
                            v-show="scope.row.id == shoppId"
                            size="small"
                        >当前关联</el-button>
                        <el-button
                            type="text"
                            style="color: #2971FF;"
                            v-show=" scope.row.canBind == false"
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
    name: 'addcouponControlvoucher',
    data() {
        return {
            labelWidth: '230px',
            tableData: [],
            fullscreen: '',
            page: 1,
            limit: 10,
            counts: 0,
            goodData: '',
            radioOne: 1,
            radioTwo: 2,
            shoppId: '',
            dialogVisible: false,
            addcoupons: {
                couName: '',
                selhdcoupon: '',
                radio: '',
                price: '',
                time: '',
                number: '',
                id: ''
            },
            rules: {
                couName: [
                    {
                        required: true,
                        message: '请输入优惠券名称',
                        trigger: 'blur'
                    }
                ],
                radio: [
                    {
                        required: true,
                        message: '请选择可使用商品',
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
                price: [
                    {
                        required: true,
                        message: '请输入抵扣的价格',
                        trigger: 'blur'
                    },
                    {
                        type: 'number',
                        message: '请输入数字',
                        trigger: 'blur'
                    }
                ],
                time: [
                    {
                        required: true,
                        message: '请输入优惠券的有效期',
                        trigger: 'blur'
                    },
                    {
                        type: 'number',
                        message: '请输入数字',
                        trigger: 'blur'
                    }
                ],
                number: [
                    {
                        required: true,
                        message: '请输入发行的优惠券数量',
                        trigger: 'blur'
                    },
                    {
                        type: 'number',
                        message: '请输入数字',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    mounted() {
        this.getDaijingjuanData();
        // this.getListProduct();
    },
    methods: {
        // 关联按钮
        guanlian() {
            this.getListProduct();
            this.dialogVisible = true;
        },
        // 全屏
        enlarge() {},
        handleSizeChange(val) {
            this.limit = val;
            this.getListProduct();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getListProduct();
        },
        // 取消
        quxiaoadd() {
            this.$refs.addcoupons.validate((valid) => {
                this.$refs.addcoupons.resetFields();
                this.$router.push({
                    path: './couponConList'
                });
            });
        },
        // 商品搜索
        seacherdata() {
            this.page = 1;
            this.getListProduct();
        },
        // 选择关联
        GLgoods(row) {
            this.shoppId = row.id;
            this.addcoupons.selhdcoupon = row.name;
            this.dialogVisible = false;
        },
        // 商品查询
        getListProduct() {
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
                        var shopList = [];
                        data.list.forEach(function (val, index) {
                            shopList[index] = val;
                            shopList[index].picture = localStorage.getItem('imgUrl') + val.picture;
                        });
                        this.tableData = shopList;
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
        //  发布代金卷
        addcoupondaijinjuan() {
            this.$refs.addcoupons.validate((valid) => {
                if (valid) {
                    this.$confirm('是否确定发布代金券:【' + this.addcoupons.couName + '】?', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let data = {
                            companyId: localStorage.getItem('loginData'),
                            companyName: localStorage.getItem('name'),
                            count: this.addcoupons.number,
                            couponValue: this.addcoupons.price * 100,
                            type: 2,
                            id: this.addcoupons.id,
                            productId: this.shoppId,
                            name: this.addcoupons.couName,
                            minPrice: 0,
                            useType: this.addcoupons.radio,
                            expiration: this.addcoupons.time
                        };
                        const loading = this.$loading({
                            lock: true,
                            text: '发布中...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        this.$axios.post('admin/company/coupon/save', data).then((res) => {
                            loading.close();
                            if (res.status == 200) {
                                var data = res.data;
                                if (data.code == 200) {
                                    this.$message({
                                        showClose: true,
                                        message: data.msg,
                                        type: 'success'
                                    });
                                    this.$refs.addcoupons.resetFields();
                                    this.$router.push({
                                        path: './couponConList'
                                    });
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
        // 获取代金卷信息
        getDaijingjuanData() {
            let data = this.$route.params.data;
            if (data != undefined) {
                console.log(data);
                this.addcoupons.couName = data.name;
                if (data.productInfo != null) {
                    this.addcoupons.selhdcoupon = data.productInfo.name;
                    this.shoppId = data.productId;
                }
                if (data.useType == 1) {
                    this.radioOne = 1;
                } else {
                    this.radioTwo = 2;
                }
                this.addcoupons.radio = data.useType;
                this.addcoupons.price = data.couponValue / 100;
                this.addcoupons.time = data.expiration;
                this.addcoupons.number = data.count;
                this.addcoupons.id = data.id;
            }
        }
    }
};
</script>

<style>
.addcouponControlvoucher {
    width: 100%;
    /* margin: 0 auto; */
    padding: 20px;
}

.coupon-top {
    width: 100%;
    height: 45px;
    line-height: 45px;
    background-color: #fafafa;
    margin-bottom: 20px;
    margin-top: 20px;
    padding-left: 20px;
}
.Elinput {
    width: 257px;
}
.Elinput .el-input__inner {
    border: 0;
    border-bottom: 1px solid #c1c1c1;
    border-radius: 0;
    width: 257px;
    text-align: center;
}
.inputEl {
    width: 90px;
}
.inputEl .el-input__inner {
    border: 0;
    border-bottom: 1px solid #c1c1c1;
    border-radius: 0;
    width: 89px;
    text-align: center;
}

.inputEl.el-input {
    width: 90px;
}

.seleLabel {
    width: 260px;
    display: block;
    text-align: center;
    float: left;
}

.couponhedong .selectBtn {
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
    left: 257px;
    top: 7px;
}

.addcouponControl .el-date-editor {
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid #ccc;
}

.addcouponControlvoucher .addcouponBtn {
    margin-left: 30%;
    margin-top: 100px;
}

.addcouponControlvoucher .addcouponBtn .buttonr {
    width: 90px;
    height: 30px;
    border-radius: 8px;
    background-color: #2450d2;
    color: #fff;
}

.addcouponControlvoucher .addcouponBtn .buttonr.mL {
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
    line-height: 45px;
}
.el-dialog__header {
    background: #f9f9fa;
}
.el-input {
    /* margin-top: 7px; */
    margin-left: 10px;
    width: 290px;
    height: 30px;
    border: 0px;
}

.seacher {
    margin-left: 10px;
}
.el-table .bulebutton {
    background: #2971ff;
    color: #fff;
}
</style>
