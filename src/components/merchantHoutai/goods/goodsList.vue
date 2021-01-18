<template>
    <div
        id="goodsList"
        class="goodsList"
        v-loading="fullscreenLoading"
        :element-loading-text="loadingText"
        element-loading-background="rgba(0, 0, 0, 0.7)"
    >
        <div class="goodsList-top">
            <div class="rent-top">
                <label>商品查询</label>
            </div>
            <div class="reat-search">
                <el-input class="seac" v-model="input" placeholder="输入商品名称"></el-input>
                <el-date-picker
                    v-model="time"
                    class="time"
                    type="datetimerange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    @change="timeCuo"
                ></el-date-picker>
                <el-button @click="queryGood" class="query">查询</el-button>
            </div>
        </div>
        <div class="text-button">
            <div class="button">
                <el-button @click="addRenting" type="primary">发布商品</el-button>
            </div>
        </div>
        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column prop="index" type="index" label="序号" align="center"></el-table-column>
            <el-table-column prop="name" label="商品名称" width align="center"></el-table-column>
            <el-table-column prop="userName" label="发布人" width align="center"></el-table-column>
            <el-table-column prop="verifyStatus" label="商品状态" align="center">
                <template slot-scope="scope">
                    <label>{{scope.row.verifyStatus == 1? '上架':''}}</label>
                </template>
            </el-table-column>
            <el-table-column prop="price" label="商品售价" align="center">
                <template slot-scope="scope">
                    <label>{{scope.row.price / 100}}￥</label>
                </template>
            </el-table-column>
            <el-table-column prop="pic" label="商品封面" align="center">
                <template slot-scope="scope">
                    <img width="100%" height="auto" :src="scope.row.pic" />
                </template>
            </el-table-column>
            <el-table-column prop="lowerShelfTime" label="商品货号" width="120" align="center"></el-table-column>
            <el-table-column prop="createTime" label="发布时间" align="center" width="200"></el-table-column>
            <el-table-column label="操作" width="280" align="center">
                <template slot-scope="scope">
                    <el-button
                        @click="recommendTuijian(scope.row)"
                        v-if="scope.row.recommend == 0 "
                        class="xianqing tab_button"
                    >设为推荐</el-button>
                    <el-button v-else-if="scope.row.recommend == 1" class="yituijian tab_button">已推荐</el-button>
                    <el-button @click="btn_detail(scope.row)" class="xianqing tab_button">查看详情</el-button>
                    <!-- <el-button @click="updateGood(scope.row)"  class="bj_button">修改</el-button>
					<el-button @click="chakanwuliu(scope.row)" class="bj_button">重新发布</el-button>
					<el-button @click="del_enterprise(scope.row)"  class="del_button">删除</el-button>
                    <el-button @click="del_enterprise(scope.row)"  class="del_button">取消发布</el-button>-->
                    <el-button @click="xiajia_btn(scope.row)" class="xiajia_button">下架</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 页码 -->
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

        <el-dialog title="共享千里马福利" :visible.sync="dialogVisibleake" width="50%">
            <div class="iconEnlorder" @click="enlarge">
                <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                    <i class="iconfont icon-quanping"></i>
                </el-tooltip>
            </div>
            <div class>
                <div class="qianlima">
                    <label>是否使用共享千里马</label>
                    <div class="rencai">
                        <label>您想要的人才这里都有</label>
                    </div>
                </div>
                <div class="dadaetal">
                    <div>
                        <label>1. 商品图不好看？来这儿找找专业的平面设计，你就就是下一个伯乐。</label>
                    </div>
                    <div>
                        <label>2. 不会视频剪辑？视频制作大神等你来淘。</label>
                    </div>
                </div>
                <div class="qianlimaBtn">
                    <el-button @click="fuBtn" class="Btn">否</el-button>
                    <el-button @click="swifthorse" class="Btn">是</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'goodslist',
    data() {
        return {
            input: '',
            time: '',
            fullscreen: '',
            dialogVisibleake: false,
            fullscreenLoading: true,
            loadingText: '加载中...',
            tableData: [],
            page: 1,
            limit: 10,
            counts: this.counts || 1,
            timeStart: '',
            timeEnd: ''
        };
    },
    mounted() {
        this.postAdminQueryProductList();
    },
    methods: {
        // 千里马
        swifthorse() {
            this.$router.push({
                path: './swifthorse'
            });
            this.dialogVisibleake = false;
        },
        recommendTuijian(row) {
            this.$confirm('是否推荐该商品【' + row.name + '】?', '温馨提示', {
                confirmButtonText: '推荐',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let data = {
                    flag: 1,
                    productId: row.id
                };
                const loading = this.$loading({
                    lock: true,
                    text: '保存中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios.post('admin/product/product/recommendProduct', data).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.postAdminQueryProductList();
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
        enlarge() {},
        addRenting() {
            this.dialogVisibleake = true;
        },
        fuBtn() {
            this.$router.push({
                path: './addgoods'
            });
            this.dialogVisibleake = false;
        },
        updateRenting(row) {
            this.dialogVisibleake = true;
        },
        // 查看详情
        btn_detail(row) {
            this.$router.push({
                path: './goodsDetail',
                query: {
                    id: row.id,
                    status: row.verifyStatus
                }
            });
        },
        // 下架
        xiajia_btn(row) {
            this.$confirm('是否确定将商品【' + row.name + '】-下架?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var data = '?productId=' + row.id + '&publishStaus=0';
                const loading = this.$loading({
                    lock: true,
                    text: '保存中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios.get('admin/product/adminProductPublishStaus' + data).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.postAdminQueryProductList();
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
        queryGood() {
            this.page = 1;
            this.postAdminQueryProductList();
        },
        handleSizeChange(val) {
            this.limit = val;
            this.postAdminQueryProductList();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.postAdminQueryProductList();
        },

        // 时间戳转换
        timeCuo(value) {
            if (value != null) {
                var date = new Date(value[0]);
                var startTime = date.getTime(date);
                var date1 = new Date(value[1]);
                var endTime = date1.getTime(date1);
                this.timeStart = startTime;
                this.timeEnd = endTime;
            } else if (value == null) {
                this.timeStart = '';
                this.timeEnd = '';
            }
        },
        // 查询商品
        postAdminQueryProductList() {
            let data = {
                endTime: this.timeEnd,
                startTime: this.timeStart,
                limit: this.limit,
                page: this.page,
                productName: this.input,
                productStatus: '1'
            };
            this.$axios.post('admin/product/adminQueryProductList', data).then((res) => {
                this.fullscreenLoading = false;
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        let list = [];
                        data.data.dataList.forEach(function (val, index) {
                            list[index] = val;
                            list[index].pic = localStorage.getItem('imgUrl') + val.pic;
                            list[index].verifyStatus = val.verifyStatus; //== 1 ? '上架' : '';
                        });
                        this.tableData = list;
                        this.counts = data.data.totalCount;
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
.goodsList {
    box-sizing: border-box;
    width: 100%;
    padding: 20px;
}
.el-table .xiajia_button {
    background-color: #ff8d00;
    width: 70px;
    height: 30px;
    font-size: 14px;
    color: #fff;
    padding: 0;
    font-size: 10px;
    border-radius: 8px;
}

.divwuliu {
    margin-top: 20px;
    margin-left: 20%;
}

.el-timeline {
    margin-left: 10%;
}

.iconEnlorder {
    position: relative;
}

.iconEnlorder .iconfont {
    position: absolute;
    top: -63px;
    right: 30px;
}

.goodsList .dialog-footer .fahuo {
    width: 151px;
    height: 30px;
    color: #ffffff;
    border-radius: 8px;
    background: #2450d2;
    margin: 0;
    margin-left: 40%;
    margin-top: 50px;
}

.seac {
    width: 210px;
}

.goodsList-top {
    width: 100%;
    height: 114px;
    margin: 0 auto;
    background-color: #fafbfa;
    padding-left: 20px;
    line-height: 40px;
}

.goodsList-top .rent-top {
    font-size: 14px;
}
.reat-search {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.reat-search .time {
    margin-left: 38px;
}

.reat-search .query {
    width: 150px;
    height: 30px;
    background: #2450d2;
    margin-left: 10px;
    color: #fff;
    border-radius: 8px;
    padding: 0;
}

.button .el-button {
    width: 150px;
    background-color: #2450d2;
    border-radius: 8px;
}

.text-button {
    margin-top: 8px;
    margin-bottom: 10px;
}

.text-button .button {
    text-align: right;
    padding: 0;
    margin: 0;
}

.text-button .button .el-button {
    width: 104px;
}

.el-table .el_button {
    font-size: 14px;
}

.el-table .xianqing.tab_button {
    background-color: #2450d2;
    width: 70px;
    height: 30px;
    color: #fff;
    line-height: 0px;
    border-radius: 8px;
    padding: 0;
}

.el-table .yituijian.tab_button {
    background-color: #979497;
    width: 70px;
    height: 30px;
    color: #fff;
    line-height: 0px;
    font-size: 10px;
    border-radius: 8px;
    padding: 0;
}

.bj_button {
    background-color: #109955;
    width: 70px;
    height: 30px;
    color: #fff;
    line-height: 0px;
    font-size: 8px;
    border-radius: 8px;
}

.del_button {
    background-color: #ff0000;
    width: 70px;
    height: 30px;
    color: #fff;
    line-height: 0px;
    font-size: 8px;
    border-radius: 8px;
}

.el-textarea__inner {
    width: 500px;
    height: 150px;
}

.qianlima {
    font-size: 20px;
    color: #42a7ff;
    margin-left: 20%;
}

.rencai {
    font-size: 12px;
    margin-left: 90px;
}

.dadaetal {
    width: 50%;
    margin-left: 32%;
    font-size: 14px;
}

.qianlimaBtn {
    margin-bottom: 30px;
    margin-top: 30px;
    margin-left: 25%;
}
.goodsList .el-date-picker {
    border: 1px solid #c1c1c1;
}
.qianlimaBtn .Btn {
    width: 122px;
    height: 35px;
    background: #ff8d00;
    color: #fff;
    padding: 0;
}

.qianlimaBtn .Btn:nth-child(2) {
    margin-left: 50px;
}
.el-pagination {
    width: 100%;
    text-align: center;
    margin-top: 10px;
}
</style>
