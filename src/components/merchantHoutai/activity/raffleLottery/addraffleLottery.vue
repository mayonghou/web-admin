<template>
    <div class="addActivity" id="addActivityflashSale">
        <div class="addActivity-top">
            <label>填写发布的抽奖活动信息</label>
        </div>
        <el-form :model="addActivitydata" :rules="rules" ref="addActivitydata">
            <el-form-item
                label="活动标题:"
                prop="activityTitle"
                v-show="indextext == 0"
                :label-width="labelwidth"
            >
                <el-input
                    class="ElinputT"
                    placeholder="请输入活动的标题"
                    v-model="addActivitydata.activityTitle"
                ></el-input>
            </el-form-item>
            <el-form-item
                label="活动时间:"
                v-show="indextext == 0"
                prop="activityTime"
                :label-width="labelwidth"
            >
                <el-date-picker
                    prefix-icon="md-date_range"
                    v-model="addActivitydata.activityTime"
                    type="daterange"
                    unlink-panels
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    @change="timestamp"
                ></el-date-picker>
            </el-form-item>
            <el-form-item
                label="每日抽奖的机会:"
                v-show="indextext == 0"
                prop="activityLimit"
                :label-width="labelwidth"
            >
                <el-input
                    class="ElinputT"
                    placeholder="输入每人每日抽奖的次数"
                    v-model.number="addActivitydata.activityLimit"
                ></el-input>
                <label class="zhang">次</label>
            </el-form-item>
            <el-form-item
                label="总中奖概率:"
                v-show="indextext == 0"
                prop="activityProb"
                :label-width="labelwidth"
            >
                <el-input
                    class="ElinputT"
                    placeholder="如30（每人玩100次游戏，30次获奖机会，奖品随机"
                    v-model="addActivitydata.activityProb"
                    @change="propnuum"
                ></el-input>
                <label class="zhang">%</label>
            </el-form-item>
            <el-form-item
                label="总的中奖机会:"
                v-show="indextext == 0"
                prop="activityChance"
                :label-width="labelwidth"
            >
                <el-input
                    class="ElinputT"
                    placeholder="请输入中奖机会"
                    oninput="value=value.replace(/[^0-9]/g,'')"
                    v-model="addActivitydata.activityChance"
                ></el-input>
                <label class="zhang">次</label>
            </el-form-item>
            <el-form-item
                label="活动规则:"
                v-show="indextext == 0"
                prop="activityRule"
                :label-width="labelwidth"
            >
                <el-input
                    class="textarea"
                    type="textarea"
                    maxlength="200"
                    show-word-limit
                    placeholder="请输抽奖规则"
                    v-model="addActivitydata.activityRule"
                ></el-input>
            </el-form-item>

            <el-form-item
                label="设置奖品:"
                v-show="indextext == 1"
                prop="activityjuansda"
                :label-width="labelwidth"
            >
                <label style="color: #a4a4a4; display: block">(数量在3-6个之间)</label>
                <div v-for="(item, index) in this.addActivitydata.activityjuansda" :key="index">
                    <el-form-item
                        :label="index == 0?'一等奖:': index == 1 ?  '二等奖:':index == 2?'三等奖:': index == 3 ?  '四等奖:': index ==  4?  '五等奖:':'六等奖:'"
                        v-if="item.prizeName != ''"
                        :prop="'activityjuansda.' + index + '.name'"
                        label-width="70px"
                        :rules="{
                            required: true,
                            message: '奖品名称不能为空',
                            trigger: 'blur'
                        }"
                    >
                        <el-input class="ddddd" readonly v-model="item.name"></el-input>
                        <el-button @click="shoppingDGsss(item)" class="shoppXuanzhe">从新关联</el-button>
                        <el-form-item
                            label="奖项名称:"
                            :prop="'activityjuansda.' + index + '.prizeName'"
                            label-width="90px"
                            :rules="{
                                required: true,
                                message: '奖品名称不能为空',
                                trigger: 'blur'
                            }"
                        >
                            <el-input
                                class="ElinputT"
                                placeholder="请输入奖项名称"
                                v-model="item.prizeName"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="发行数量:"
                            :prop="'activityjuansda.' + index + '.prizeNum'"
                            label-width="90px"
                            :rules="[
                                {
                                    required: true,
                                    message: '奖品数量不能为空',
                                    trigger: 'blur'
                                },
                                {
                                    type: 'number',
                                    message: '只能输入数字',
                                    trigger: 'change'
                                }
                            ]"
                        >
                            <el-input
                                class="ElinputT"
                                placeholder="请输入发布奖品数量"
                                v-model.number="item.prizeNum"
                            ></el-input>
                        </el-form-item>
                        <label
                            @click="deljuan(item)"
                            type="text"
                            class="del-btn el-icon-remove-outline"
                        >删除该奖励</label>
                    </el-form-item>
                </div>
                <!-- v-if="this.addActivitydata.activityjuansda.length < 6" -->
                <el-button
                    @click="shoppingDG"
                    class="btoun el-icon-circle-plus-outline"
                    v-if="this.addActivitydata.activityjuansda.length < 6"
                >添加奖奖品</el-button>
            </el-form-item>
        </el-form>
        <div class="addactivityBtn ss">
            <el-button @click="quxiaofabu" v-show="indextext == 0" class="buttonr">取消</el-button>
            <el-button @click="xiayibu" v-show="indextext == 0" class="buttonr mL">下一步</el-button>
            <el-button @click="shangyibu" v-show="indextext == 1" class="buttonr">上一步</el-button>
            <el-button @click="addActivit" v-show="indextext == 1" class="buttonr mL">发布</el-button>
        </div>

        <el-dialog title="关联优惠券" :visible.sync="dialogVisible" width="80%">
            <div class="iconEnlorder" @click="enlarge">
                <el-tooltip effect="dark" :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom">
                    <i class="iconfont icon-quanping"></i>
                </el-tooltip>
            </div>
            <div class="goodsSeacher">
                <el-input class="goodInputs" v-model="goodData">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <el-button @click="seacherdata" type="text" class="seacher">搜索</el-button>
            </div>
            <el-table :data="tableData" style="width: 100%;" border>
                <el-table-column type="selection" width align="center"></el-table-column>
                <el-table-column prop="order" label="序号" width="100" align="center"></el-table-column>
                <el-table-column prop="name" label="优惠券名称" width align="center"></el-table-column>
                <el-table-column prop="createByUser" label="发布人" align="center"></el-table-column>
                <el-table-column prop="shoppName" label="关联商品" align="center">
                    <template slot-scope="scope">
                        <label style="color: #2494d2">{{ scope.row.shoppName }}</label>
                    </template>
                </el-table-column>
                <el-table-column prop="tab" label="规则" align="center"></el-table-column>
                <el-table-column prop="countAvailable" label="库存" align="center"></el-table-column>
                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                        <el-button
                            @click="GLgoods(scope.row)"
                            v-if="scope.row.id != shoppId && scope.row.bindabilityStatus == 0"
                            class="shoppXuanzhe"
                            size="small"
                        >选择关联</el-button>
                        <el-button
                            type="text"
                            style="color: #ff8d00"
                            v-if="scope.row.id == shoppId"
                            size="small"
                        >当前关联</el-button>
                        <el-button
                            type="text"
                            style="color: #ff8d00"
                            v-if="scope.row.bindabilityStatus != 0"
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
        <!-- 重新关联 -->
        <el-dialog title="重新关联优惠券" :visible.sync="dialogVisibleCXGL" width="80%">
            <div class="iconEnlorder" @click="enlarge">
                <el-tooltip effect="dark" :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom">
                    <i class="iconfont icon-quanping"></i>
                </el-tooltip>
            </div>
            <div class="goodsSeacher">
                <el-input class="goodInputs" v-model="goodData">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <el-button @click="seacherdata" type="text" class="seacher">搜索</el-button>
            </div>
            <el-table :data="tableData" style="width: 100%;" border>
                <el-table-column type="selection" width align="center"></el-table-column>
                <el-table-column prop="order" label="序号" width="100" align="center"></el-table-column>
                <el-table-column prop="name" label="优惠券名称" width align="center"></el-table-column>
                <el-table-column prop="createByUser" label="发布人" align="center"></el-table-column>
                <el-table-column prop="shoppName" label="关联商品" align="center">
                    <template slot-scope="scope">
                        <label style="color: #2494d2">{{ scope.row.shoppName }}</label>
                    </template>
                </el-table-column>
                <el-table-column prop="tab" label="规则" align="center"></el-table-column>
                <el-table-column prop="countAvailable" label="库存" align="center"></el-table-column>
                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                        <el-button
                            @click="GLgoodsCX(scope.row)"
                            v-if="scope.row.id != shoppId && scope.row.bindabilityStatus == 0"
                            class="shoppXuanzhe"
                            size="small"
                        >选择关联</el-button>
                        <el-button
                            type="text"
                            style="color: #ff8d00"
                            v-if="scope.row.id == shoppId"
                            size="small"
                        >当前关联</el-button>
                        <el-button
                            type="text"
                            style="color: #ff8d00"
                            v-if="scope.row.bindabilityStatus != 0"
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
            dialogVisibleCXGL: false,
            fullscreen: '',
            goodData: '',
            tableData: [],
            page: 1,
            limit: 20,
            counts: this.counts,
            shoppId: [],
            indextext: 0,
            addActivitydata: {
                activityTitle: '',
                activityTime: [],
                activityLimit: '',
                activityProb: '',
                activityChance: '',
                activityRule: '',
                activityjuansda: []
            },
            id: '',
            countNum: 0,
            choujiangIndex: '',
            rules: {
                activityTitle: [
                    {
                        required: true,
                        message: '请输入活动标题',
                        trigger: 'blur'
                    }
                ],
                activityTime: [
                    {
                        required: true,
                        message: '请选择活动时间',
                        trigger: 'blur'
                    }
                ],
                activityLimit: [
                    {
                        required: true,
                        message: '请输入每人每天的抽奖吃数',
                        trigger: 'blur'
                    },
                    {
                        type: 'number',
                        message: '请输入数字',
                        trigger: 'blur'
                    }
                ],
                activityProb: [
                    {
                        required: true,
                        message: '请输入总的中奖概率',
                        trigger: 'blur'
                    }
                ],
                activityChance: [
                    {
                        required: true,
                        message: '请输入中奖的机会',
                        trigger: 'blur'
                    }
                ],
                activityRule: [
                    {
                        required: true,
                        message: '请输入抽奖的规则',
                        trigger: 'blur'
                    }
                ],
                activityjuan: [
                    {
                        required: true,
                        message: '请选择奖品',
                        trigger: 'blur'
                    }
                ],
                activityaward: [
                    {
                        required: true,
                        message: '请输入奖项名称',
                        trigger: 'blur'
                    }
                ],
                activityNumber: [
                    {
                        required: true,
                        message: '请输入发行数量',
                        trigger: 'blur'
                    },
                    {
                        type: 'number',
                        message: '只能是数字',
                        trigger: 'blur'
                    }
                ],
                activityjuansda: [
                    {
                        required: true,
                        message: '请输入发行数量',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    mounted() {
        this.getraffleLotterys();
    },
    methods: {
        // 关联优惠券弹框
        shoppingDG() {
            this.getAllListCoupon();
            this.dialogVisible = true;
        },
        shoppingDGsss(item) {
            let index = this.addActivitydata.activityjuansda.indexOf(item);
            if (index != -1) {
                this.choujiangIndex = index;
            }
            this.getAllListCoupon();
            this.dialogVisibleCXGL = true;
        },
        // 全屏
        enlarge() {},
        handleSizeChange(val) {
            this.limit = val;
            this.getAllListCoupon();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getAllListCoupon();
        },
        // 下一步
        xiayibu() {
            this.indextext = this.indextext + 1;
        },
        // 上一步
        shangyibu() {
            this.indextext = this.indextext - 1;
        },
        // 删除奖项
        deljuan(item) {
            var indexa = this.addActivitydata.activityjuansda.indexOf(item);
            if (indexa != -1) {
                this.addActivitydata.activityjuansda.splice(indexa, 1);
            }
        },
        // 商品搜索
        seacherdata() {
            this.page = 1;
            this.getAllListCoupon();
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
            this.addActivitydata.activityjuansda.push({
                name: row.name,
                prizeId: row.id,
                prizeLevel: this.countNum,
                prizeType: 1
            });
            this.dialogVisible = false;
        },
        GLgoodsCX(row) {
            this.addActivitydata.activityjuansda[this.choujiangIndex].name = row.name;
            this.addActivitydata.activityjuansda[this.choujiangIndex].prizeId = row.id;
            this.addActivitydata.activityjuansda[this.choujiangIndex].prizeLevel = this.countNum;
            this.dialogVisibleCXGL = false;
        },
        // 查询优惠券
        getAllListCoupon() {
            let data = {
                companyId: localStorage.getItem('loginData'),
                limit: this.limit,
                page: this.page,
                couponNameLike: this.goodData
            };
            this.$axios.post('admin/company/activity/coupon/list_coupon', data).then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        var liste = [];
                        var times = '';
                        data.list.forEach(function (val, index) {
                            liste[index] = val;
                            liste[index].shoppName = val.productInfo == null ? '' : val.productInfo.name;
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
        propnuum(value) {
            if (value > 100) {
                return this.$message({
                    showClose: true,
                    message: '概率范围在0-100',
                    type: 'error'
                });
            }
        }, // 取消发布
        quxiaofabu() {
            this.$router.push({
                path: './raffleLottery'
            });
            this.$refs.addActivitydata.resetFields();
        },
        // 发布按钮
        addActivit() {
            this.$refs.addActivitydata.validate((valid) => {
                if (valid) {
                    this.$confirm('是否确定发布抽奖活动【' + this.addActivitydata.activityTitle + '】?', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if (this.addActivitydata.activityjuansda.length < 3) {
                            return this.$message({
                                showClose: true,
                                message: '奖品不能少于三个',
                                type: 'error'
                            });
                        }
                        let data = {
                            companyId: parseInt(localStorage.getItem('loginData')),
                            companyName: localStorage.getItem('companyName'),
                            industryId: parseInt(localStorage.getItem('industryId')),
                            chanceNumPerDay: parseInt(this.addActivitydata.activityLimit),
                            title: this.addActivitydata.activityTitle,
                            endTime: this.endTime,
                            maxChanceNum: parseInt(this.addActivitydata.activityChance),
                            ruleDescription: this.addActivitydata.activityRule,
                            startTime: this.startTime,
                            winRate: this.addActivitydata.activityProb,
                            prizeItemList: this.addActivitydata.activityjuansda,
                            id: this.id
                        };
                        const loading = this.$loading({
                            lock: true,
                            text: '发布中...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        this.$axios.post('admin/company/activity/lottery/publish', data).then((res) => {
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
                                        path: './raffleLottery'
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
        // 重新发布的数据
        getraffleLotterys() {
            var data = this.$route.query.data;
            if (data != undefined) {
                this.id = data.id;
                if (data.prizeItemList) {
                    var dataList = [];
                    data.prizeItemList.forEach(function (val, index) {
                        dataList[index] = val;
                        dataList[index].index = index + 1;
                        dataList[index].name = val.productName;
                        dataList[index].prizeId = val.prizeId;
                    });
                    console.log(dataList);
                    this.addActivitydata.activityjuansda = dataList;
                }
                this.addActivitydata.activityTime = data.time.split('----');
                this.timestamp();
                this.addActivitydata.activityTitle = data.title;
                this.addActivitydata.activityLimit = data.chanceNumPerDay;
                this.addActivitydata.activityProb = data.winRate;
                this.addActivitydata.activityChance = data.maxChanceNum;
                this.addActivitydata.activityRule = data.ruleDescription;
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
.goodsSeacher .goodInputs .el-input__inner {
    border: 1px solid #c1c1c1;
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
    margin-left: 20px;
    font-size: 14px;
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

.addActivity .textarea {
    width: 400px;
}

.addActivity .textarea .el-textarea__inner {
    height: 100px;
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

.addactivityBtn.ss {
    margin-left: 30%;
    margin-top: 20px;
}

.addactivityBtn .buttonr {
    width: 90px;
    height: 30px;
    border-radius: 8px;
    background-color: #2450d2;
    color: #fff;
    padding: 0;
}

.addactivityBtn .buttonr.mL {
    margin-left: 100px;
}
.ddddd .el-input__inner {
    border: 0;
    color: #2494d2;
    width: 260px;
    display: inline-block;
    text-align: center;
}
.del-btn {
    color: #ff0000;
    font-size: 16px;
    margin-left: 100px;
    cursor: pointer;
}
</style>
