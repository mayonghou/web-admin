<template>
    <!-- 产品中心 -->
    <div class="productindex" id="productindex">
        <div class="product-title">
            <span class="jiangbnam"></span>
            <span>产品中心</span>
        </div>
        <div class="productindex-top">
            <div class="product-top-left">
                <el-card class="el-card-body-left">
                    <div v-if="this.versionName != ''">
                        <div class="company">
                            <span class="company-title">{{this.versionName}}</span>
                            <span class="company-text">{{this.title}}</span>
                        </div>
                        <div class="compan-version-text">{{this.versionDescribe}}</div>
                        <el-button @click="lookversionBrn" class="lookdetail">查看详情></el-button>
                    </div>
                    <div style="width:100%; text-align: center;" v-else>
                        <img
                            width="auto"
                            height="360px"
                            src="../../../assets/img/marketingqianlima/zhanwuData.png"
                        />
                    </div>
                </el-card>
            </div>
            <div class="product-top-right">
                <el-card class="el-card-body-right">
                    <h1>精选功能</h1>
                    <div class="functionBody">
                        <happy-scroll color="rgba(0,0,0,0.5)" size="5" v-if="iSshow">
                            <ul class="functionUL">
                                <li
                                    style="width:100%; text-align: center;"
                                    v-if="this.functionList == ''"
                                >
                                    <img
                                        width="auto"
                                        height="260px"
                                        src="../../../assets/img/queshengPage/ques1.png"
                                        alt
                                        srcset
                                    />
                                </li>
                                <li
                                    v-else
                                    class="functionLI"
                                    v-for="(item, index) in this.functionList"
                                    :key="index"
                                >
                                    <!-- {{item.function}} -->
                                    <div style="width:280px;">
                                        <div class="functionName">{{item.function}}</div>
                                        <div class="functiondescrib">{{item.resume}}</div>
                                    </div>
                                </li>
                            </ul>
                        </happy-scroll>
                    </div>
                </el-card>
            </div>
        </div>
        <div class="table-text">
            <div class="table-text-top">
                <div class="tab-left">
                    <span class="jiangbnam"></span>
                    <span>产品预设列表</span>
                </div>
                <div class="tab-right">
                    <el-button @click="addproduct" class="addProduct el-icon-circle-plus">新增预设产品</el-button>
                </div>
            </div>
        </div>
        <div class="tabels-tesss">
            <el-table :data="tableData" border style="width: 100%;">
                <el-table-column type="index" label="序号" align="center"></el-table-column>
                <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
                <el-table-column prop="productDescribe" label="商品描述" align="center"></el-table-column>
                <el-table-column prop="pic " label="图片" align="center">
                    <template slot-scope="scope">
                        <img width="100%" height="auto" :src="scope.row.pic" alt />
                    </template>
                </el-table-column>
                <el-table-column prop="video" label="视频" align="center">
                    <template slot-scope="scope">
                        <video
                            :src="scope.row.video"
                            controls
                            controlslist="nodownload"
                            width="auto"
                            height="200"
                        ></video>
                    </template>
                </el-table-column>
                <el-table-column prop="stock" label="库存" align="center"></el-table-column>
                <el-table-column prop="sales" label="已售" align="center"></el-table-column>
                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                        <el-button @click="updateproduct(scope.row)" class="tab_oragel" round>修改</el-button>
                        <el-button @click="delproDuct(scope.row)" class="tab_red" round>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="el-pagintion"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="counts"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'productindex',
    data() {
        return {
            iSshow: false,
            tableData: [
                {
                    name: 'djaksl',
                    legal: 'asldk',
                    serverPhone: 'sadjkas',
                    time: '2020-12-30',
                    times: '326'
                }
            ],
            page: 1,
            limit: 10,
            counts: 0,
            versionName: '',
            versionDescribe: ``,
            title: '',
            functionList: []
        };
    },
    mounted() {
        this.getSelectListPro();
        this.getVersion();
    },
    methods: {
        updateproduct(row) {
            this.$router.push({
                path: './editproduct',
                query: {
                    id: row.id
                }
            });
        },
        // 新增产品预设
        addproduct() {
            this.$router.push({
                path: './addproduct'
            });
        },
        // 查看版本详情
        lookversionBrn() {
            this.$router.push({
                path: './versionDetail'
            });
        },
        getVersion() {
            this.$axios.get('admin/version/queryLastVersion').then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.functionList = data.data.list;
                        if (this.functionList != '') {
                            this.iSshow = !this.iSshow;
                        }
                        this.versionName = data.data.versionName;
                        this.title = data.data.title;
                        this.versionDescribe = data.data.versionDescribe;
                    }
                }
            });
        },
        delproDuct(row) {
            this.$confirm('是否确定删除【' + row.productName + '】商品?', '温馨提示', {
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
                this.$axios.post('admin/admin/delPreinstallProduct?id=' + row.id).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.getSelectListPro();
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
        handleSizeChange(val) {
            this.limit = val;
            this.getSelectListPro();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getSelectListPro();
        },
        getSelectListPro() {
            let data = {
                limit: this.limit,
                page: this.page
            };
            this.$axios.post('admin/admin/selectList', data).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        let dataList = [];
                        var https = /^https:\/\/.+$/;
                        data.data.forEach(function (val, index) {
                            dataList[index] = val;
                            if (https.test(val.pic.split(',')[0])) {
                                dataList[index].pic = val.pic.split(',')[0];
                            } else {
                                dataList[index].pic = localStorage.getItem('imgUrl') + val.pic.split(',')[0];
                            }
                            if (https.test(val.video.split(',')[0])) {
                                dataList[index].video = val.video.split(',')[0];
                            } else {
                                dataList[index].video = localStorage.getItem('imgUrl') + val.video.split(',')[0];
                            }
                        });
                        this.counts = data.totalCount;
                        this.tableData = dataList;
                    }
                }
            });
        }
    }
};
</script>

<style>
.productindex {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    background: #fafafa;
}
.product-title {
    display: flex;
    align-items: center;
}
.product-title span {
    display: inline-block;
    font-size: 24px;
}
.product-title span:nth-child(2) {
    margin-left: 10px;
}
.product-title .jiangbnam {
    width: 6px;
    height: 27px;
    background-image: linear-gradient(#4760ff, #0dccff);
    border-radius: 15px;
}
.productindex-top {
    display: flex;
    justify-content: space-between;
}
.productindex-top .product-top-left {
    width: 40%;
    margin-top: 10px;
}
.product-top-left .el-card-body-left {
    width: 100%;
    padding: 10px;
    height: 360px;
    background-image: linear-gradient(to bottom right, #0dccff, #4760ff);
    border-radius: 10px;
    color: #fff;
    overflow: hidden;
}
.el-card-body-left .company .company-title {
    font-size: 30px;
    font-family: Source Han Sans CN Bold;
    font-weight: bold;
    display: inline-block;
}
.el-card-body-left .company .company-text {
    font-size: 22px;
    font-family: Source Han Sans CN Bold;
    display: inline-block;
    margin-left: 15px;
}
.el-card-body-left .compan-version-text {
    padding: 15px 0;
    font-size: 18px;
    font-family: Source Han Sans CN ExtraLight;
    height: 220px;
    overflow: hidden;
    line-height: 25px;
    display: -webkit-box;
    /* padding-bottom: 20px; */
}
.el-card-body-left .lookdetail {
    width: auto;
    /* height: 5px; */
    color: #4985f0;
    font-size: 22px;
    font-family: Source Han Sans CN Normal;
}
.productindex-top .product-top-right {
    width: 60%;
    padding-left: 20px;
    margin-top: 10px;
}
.product-top-right .el-card-body-right {
    height: 360px;
    width: 100%;
    border-radius: 10px;
    padding: 10px 20px;
}
.table-text {
    margin-top: 20px;
}
.table-text .table-text-top {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.tab-left {
    display: flex;
    align-items: center;
}
.tab-left {
    font-size: 24px;
    color: #4985f0;
}
.tab-left .jiangbnam {
    width: 6px;
    height: 27px;
    background-image: linear-gradient(#4760ff, #0dccff);
    border-radius: 15px;
    margin-right: 15px;
}
.addProduct {
    color: #4985f0;
    border: 1px solid #4985f0;
    font-size: 22px;
    background: #fff;
}
.tabels-tesss {
    margin-top: 20px;
}
.tab_oragel {
    font-family: Source Han Sans CN Normal;
    background-image: linear-gradient(to right, #0dccff, #4760ff);
    color: #fff;
}
.tab_red {
    background-image: linear-gradient(to right, #ff887c, #ff6060);
    color: #fff;
}
.el-pagintion {
    width: 100%;
    text-align: right;
    margin-top: 20px;
}
.functionBody {
    width: 100%;
}
.functionUL {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    height: 250px;
}
.functionLI {
    list-style: none;
    width: 350px;
    text-align: center;
}
.functionLI .functionName {
    width: 93px;
    margin: 0 auto;
    height: 93px;
    margin-top: 20px;
    background-image: linear-gradient(to right, #4eb9fd, #3b7aff);
    border-radius: 50%;
    text-align: center;
    line-height: 93px;
    color: #fff;
    font-size: 20px;
    font-family: Source Han Sans CN Medium;
    box-shadow: #3b7aff 0px 5px 24px 0px;
}

.functionLI:nth-child(2n) .functionName {
    background-image: linear-gradient(to right, #fd644f, #ffa200);
    box-shadow: #ffa200 0px 5px 24px 0px;
}
.functionLI:nth-child(3n) .functionName {
    background-image: linear-gradient(to right, #1ed94f, #f2f047);
    box-shadow: #f2f047 0px 5px 24px 0px;
}

.functiondescrib {
    margin: 0 auto;
    padding: 0 20px;
    margin-top: 20px;
    display: -webkit-box;
    width: 180px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
</style>

