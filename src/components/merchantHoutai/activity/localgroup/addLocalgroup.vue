<template>
    <!-- 添加同城活动 -->
    <div class="addLocalgroup" id="addLocalgroup">
        <div class="group-top">
            <label>填写发布的同城团购信息</label>
        </div>
        <el-form :model="addgroup" :rules="rules" ref="addgroup">
            <el-form-item label="选择活动商品:" prop="selhdcoupon" :label-width="labelWidth">
                <div v-if="addgroup.selhdcoupon != ''">
                    <el-input class="seleLabel" v-model="addgroup.selhdcoupon"></el-input>
                    <el-button class="selectBtn" @click="guanlian">重新关联</el-button>
                </div>
                <el-button
                    @click="guanlian"
                    v-else-if="addgroup.selhdcoupon == ''"
                    class="el-icon-circle-plus-outline couponSel"
                >关联商品</el-button>
            </el-form-item>
            <el-form-item label="拼团人数:" prop="groupNumber" :label-width="labelWidth">
                <el-select v-model="addgroup.groupNumber" placeholder="请选择拼团人数">
                    <el-option
                        v-for="item in options"
                        :label="item.label"
                        :value="item.value"
                        :key="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="拼团降价金额:" prop="price" :label-width="labelWidth">
                <el-input
                    class="inputEl"
                    @change="groupPrice"
                    v-model="addgroup.price"
                    oninput="value=value.replace(/[^0-9.]/g,'')"
                    placeholder="请输入活动自降后端价格"
                ></el-input>
                <label class="danwei">元</label>
                <label
                    v-show="addgroup.price != ''"
                    class="groupprice"
                >降价后团购价格:{{this.jaingjiaprice / 100}}元</label>
            </el-form-item>
            <el-form-item label="活动时间:" prop="time" :label-width="labelWidth">
                <el-date-picker
                    prefix-icon="md-date_range"
                    v-model="addgroup.time"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    @change="timestamp"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="模拟成团:" prop="astrictNum" :label-width="labelWidth">
                <el-switch
                    v-model="addgroup.astrictNum"
                    active-color="#13ce66"
                    inactive-color="#c1c1c1"
                ></el-switch>
                <div
                    class="localgroupsada"
                >开启后，拼团有效期内未满的团，系统将模拟“匿名买家”凑满人数，您只需要对已付款参团的真实买家订单发货即可，开启后可以100%成团。</div>
            </el-form-item>
        </el-form>
        <div class="addcouponBtn">
            <el-button @click="quxiaogroup" class="buttonr">取消</el-button>
            <el-button @click="addlocalgroupList" class="buttonr mL">添加</el-button>
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
                        <label>{{scope.row.price / 100}}￥</label>
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
    name: 'addLocalgroup',
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
            endTime: '',
            startTime: '',
            options: [
                {
                    value: 2,
                    label: '2人团'
                },
                {
                    value: 3,
                    label: '3人团'
                },
                {
                    value: 5,
                    label: '5人团'
                },
                {
                    value: 8,
                    label: '8人团'
                }
            ],
            addgroup: {
                id: '',
                productId: '',
                groupNumber: '',
                selhdcoupon: '',
                time: [],
                price: '',
                astrictNum: true
            },
            jaingjiaprice: '',
            rules: {
                groupNumber: [
                    {
                        required: true,
                        message: '请选择拼团人数',
                        trigger: 'blur'
                    }
                ],
                selhdcoupon: [
                    {
                        required: true,
                        message: '请选择活动商品',
                        trigger: 'blur'
                    }
                ],
                time: [
                    {
                        required: true,
                        message: '请选择活动时间',
                        trigger: 'blur'
                    }
                ],
                price: [
                    {
                        required: true,
                        message: '请输入团购价',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    mounted() {
        this.getgroupList();
        this.timestamp();
        this.groupPrice();
    },
    methods: {
        groupPrice() {
            this.jaingjiaprice = this.price - this.addgroup.price * 100;
        },
        // 关联按钮
        guanlian() {
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
        quxiaogroup() {
            this.$refs.addgroup.validate((valid) => {
                this.$refs.addgroup.resetFields();
                this.$router.push({
                    path: './localgroup'
                });
            });
        },
        // 时间戳
        timestamp() {
            var data1 = new Date(this.addgroup.time[0]);
            var start = data1.getTime(data1);
            this.startTime = start;
            var data2 = new Date(this.addgroup.time[1]);
            var end = data2.getTime(data2);
            this.endTime = end;
        },
        // 发布按钮
        addlocalgroupList() {
            this.$refs.addgroup.validate((valid) => {
                if (valid) {
                    this.$confirm('是否确定添加商品 【' + this.addgroup.selhdcoupon + '】 的同城团购活动?', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let data = {
                            id: this.addgroup.id,
                            activityPrice: this.jaingjiaprice,
                            teamSize: parseInt(this.addgroup.groupNumber),
                            companyId: parseInt(localStorage.getItem('loginData')),
                            companyName: localStorage.getItem('companyName'),
                            endTime: this.endTime,
                            startTime: this.startTime,
                            productId: this.shoppId,
                            industryId: parseInt(localStorage.getItem('industryId')),
                            productPrice: this.price,
                            automatic: this.addgroup.astrictNum
                        };
                        const loading = this.$loading({
                            lock: true,
                            text: '保存中...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        this.$axios.post('admin/company/activity/group/publish', data).then((res) => {
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
                                        path: './localgroup'
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
        // 选择商品关联
        GLgoods(row) {
            this.shoppId = row.id;
            this.addgroup.selhdcoupon = row.name;
            this.price = row.price;
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
                            liste[index].price = val.price;
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

        // 获取重新发布时的数据
        getgroupList() {
            var data = this.$route.query.data;
            if (data != undefined) {
                this.addgroup.id = data.id;
                this.addgroup.selhdcoupon = data.productName;
                this.shoppId = data.productId;
                this.addgroup.number = data.productNum;
                this.addgroup.price = data.productPrice - data.activityPrice;
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
                this.addgroup.time = time.split(',');
                this.addgroup.astrictNum = data.numLimitation;
                this.price = data.productPrice * 100;
                this.jaingjiaprice = (this.price - data.activityPrice) / 100;
                this.addgroup.groupNumber = data.teamSize;
                this.addgroup.astrictNum = data.automatic;
            }
        }
    }
};
</script>

<style>
.addLocalgroup {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    padding-top: 0;
}
.addLocalgroup .el-form-item__label {
    text-align: right;
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
    border: 0;
    text-align: center;
    color: #2494d2;
}

.addLocalgroup .selectBtn {
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

.addLocalgroup .el-date-editor {
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid #ccc;
}

.addLocalgroup .addcouponBtn {
    margin-left: 30%;
    margin-top: 100px;
}

.addLocalgroup .addcouponBtn .buttonr {
    width: 90px;
    height: 30px;
    border-radius: 8px;
    background-color: #2450d2;
    color: #fff;
}

.addLocalgroup .addcouponBtn .buttonr.mL {
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

.addLocalgroup .bulebutton {
    width: 90px;
    height: 20px;
    border-radius: 8px;
    background-color: #2450d2;
    color: #fff;
    padding: 0;
}

.addLocalgroup .el-date-picker {
    border: 1px solid #c1c1c1;
}
.localgroupsada {
    width: 500px;
    height: 80px;
    padding: 10px;
    background-color: #c3c2c2;
    color: #a4a4a4;
    font-size: 14px;
}
.groupprice {
    display: block;
    width: 340px;
    text-align: right;
    color: #101010;
}
</style>
