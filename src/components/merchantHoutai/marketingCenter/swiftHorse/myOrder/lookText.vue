<template>
    <!-- 查看订单内容 -->
    <div class="ordertext" id="ordertext">
        <div class="order-navtext">
            <ul class="navtextul">
                <li
                    class="navtextli"
                    v-for="item in navList"
                    :key="item.index"
                    @click="navtablist(item)"
                    ref="navtextli"
                    :class="item.index ==0? 'active':''"
                >
                    <span>{{item.name}}</span>
                </li>
            </ul>
            <el-button type="text" @click="returnBtn" class="returnBtn">返回</el-button>
        </div>
        <div class="orderText-list">
            <div class="filetype">
                <span v-if="pushId==0">
                    已上传图片列表
                    <span style="color:#2971ff;">(共 {{this.worksListlength}} 张)</span>
                </span>
                <span v-if="pushId==1">
                    已上传视频列表
                    <span style="color:#2971ff;">(共 {{this.worksListlength}} 张)</span>
                </span>
                <span v-if="pushId == 2">
                    已上传文档列表
                    <span style="color:#2971ff;">(共 {{this.worksListlength}} 张)</span>
                </span>
                <el-button type="text" class="baocunbtn" @click="baocunbtn">
                    <i class="el-icon-upload"></i>
                    <span style="margin-left: 5px;">保存至产品中心</span>
                </el-button>
            </div>

            <ul class="order-ul">
                <li class="order-li" v-for="(item, index) in worksList" :key="index">
                    <div class="orderli-text">
                        <img
                            class="text-img"
                            @click="imgBtn(item)"
                            v-if="item.booltean"
                            :src="item.url"
                        />
                        <video class="text-img" @click="videodialog(item)" v-else :src="item.url"></video>
                        <div class="text-body">
                            <div class="textname">{{item.name}}</div>
                            <div class="text-number">
                                <span>{{item.size}}</span>
                                <span @click="download(item)" class="el-icon-download"></span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <el-pagination
                @prev-click="prev_click"
                @next-click="next_click"
                @current-change="current_change"
                :page-size="limit"
                :total="counts"
                layout="prev, pager, next"
            ></el-pagination>
        </div>
        <el-dialog title :visible.sync="dialogVisible" width="50%">
            <!-- <el-carousel trigger="click" height="400px ">
                <el-carousel-item v-for="(item, index) in imgUrlList" :key="index">
                    <img class="imguls" :src="item.url" alt srcset />
                    <div style="line-height: 30px; font-size:10px;">{{item.name}}</div>
                    <div class="dsadnsak">
                        <span>{{item.size}}</span>
                        <span class="el-icon-download"></span>
                    </div>
                </el-carousel-item>
            </el-carousel>-->
            <div>
                <div class="videobannerList">
                    <el-button @click="imgBtnleft(dataValue)" class="imgButton el-icon-arrow-left"></el-button>
                    <img class="img" :src="this.dataValue.url" />
                    <el-button
                        @click="imgBtnright(dataValue)"
                        class="imgButton el-icon-arrow-right"
                    ></el-button>
                </div>
                <div class="textimg" style="font-size: 26px;">{{this.dataValue.name}}</div>
                <div class="textimg active" style="font-size: 18px;">
                    <span>{{this.dataValue.size}}</span>
                    <span class="el-icon-download"></span>
                </div>
            </div>
        </el-dialog>
        <el-dialog title :visible.sync="dialogVisiblevideo" width="50%">
            <div>
                <div class="videobannerList">
                    <el-button
                        @click="imgBtnvideoleft(videoDatavalue)"
                        class="imgButton el-icon-arrow-left"
                    ></el-button>
                    <video
                        class="img"
                        :src="this.videoDatavalue.url"
                        controls
                        controlslist="nodownload"
                    ></video>
                    <el-button
                        @click="imgBtnvideoright(videoDatavalue)"
                        class="imgButton el-icon-arrow-right"
                    ></el-button>
                </div>
                <div class="textimg" style="font-size: 26px;">{{this.videoDatavalue.name}}</div>
                <div class="textimg active" style="font-size: 18px;">
                    <span>{{this.videoDatavalue.size}}</span>
                    <span class="el-icon-download"></span>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'ordertext',
    data() {
        return {
            pushId: 0,
            worksList: [],
            worksListlength: 0,
            limit: 10,
            page: 1,
            counts: 0,
            porductData: [],
            dialogVisible: false,
            dialogVisiblevideo: false,
            videoUrlList: [],
            imgUrlList: [],
            navList: [
                {
                    index: 0,
                    name: '图片'
                },
                {
                    index: 1,
                    name: '视频'
                },
                {
                    index: 2,
                    name: '文档'
                }
            ],
            dataValue: {},
            videoDatavalue: {}
        };
    },
    mounted() {
        this.getdataLst();
        this.getbannerData();
    },
    methods: {
        imgBtnleft(dataValue) {
            var index = this.worksList.indexOf(dataValue);
            if (index != -1) {
                var count = index - 1;
                if (count < 0) {
                    count = 0;
                    return this.$message({
                        showClose: true,
                        message: '已经是最后一张了',
                        type: 'success'
                    });
                }
                var dataValuelist = {};
                this.worksList.forEach((val, indexnum) => {
                    if (count == indexnum) {
                        dataValuelist = val;
                    }
                });
                this.dataValue = dataValuelist;
            }
        },
        imgBtnright(dataValue) {
            var index = this.worksList.indexOf(dataValue);
            if (index != -1) {
                var count = index + 1;
                if (count > this.worksList.length - 1) {
                    count = this.worksList.length - 1;
                    return this.$message({
                        showClose: true,
                        message: '已经是最后一张了',
                        type: 'success'
                    });
                }
                var dataValuelist = {};
                this.worksList.forEach((val, indexnum) => {
                    if (count == indexnum) {
                        dataValuelist = val;
                    }
                });
                this.dataValue = dataValuelist;
            }
        },
        imgBtn(item) {
            this.dataValue = item;
            this.dialogVisible = true;
        },

        imgBtnvideoright(videoDatavalue) {
            var index = this.worksList.indexOf(videoDatavalue);
            if (index != -1) {
                var count = index + 1;
                if (count > this.worksList.length - 1) {
                    count = this.worksList.length - 1;
                    return this.$message({
                        showClose: true,
                        message: '已经是最后一个视频了',
                        type: 'success'
                    });
                }
                var dataValuelist = {};
                this.worksList.forEach((val, indexnum) => {
                    if (count == indexnum) {
                        dataValuelist = val;
                    }
                });
                this.videoDatavalue = dataValuelist;
            }
        },
        imgBtnvideoleft(videoDatavalue) {
            var index = this.worksList.indexOf(videoDatavalue);
            if (index != -1) {
                var count = index - 1;
                if (count < 0) {
                    count = 0;
                    return this.$message({
                        showClose: true,
                        message: '这是第一个视频',
                        type: 'success'
                    });
                }
                var dataValuelist = {};
                this.worksList.forEach((val, indexnum) => {
                    if (count == indexnum) {
                        dataValuelist = val;
                    }
                });
                this.videoDatavalue = dataValuelist;
            }
        },
        videodialog(item) {
            this.videoDatavalue = item;
            this.dialogVisiblevideo = true;
        },
        getbannerData() {
            var imgDataList = [];
            var videoDAtaList = [];

            this.porductData.forEach(function (val, index) {
                if (val.sidelineTypeName == '图片制作') {
                    imgDataList = val.worksList;
                } else if (val.sidelineTypeName == '视频制作') {
                    videoDAtaList = val.worksList;
                }
            });
            var imgList = [];
            var https = /^https:\/\/.+$/;
            imgDataList.forEach((params, num) => {
                imgList[num] = params;
                if (https.test(params.url)) {
                    imgList[num].url = params.url;
                } else {
                    imgList[num].url = localStorage.getItem('imgUrl') + params.url;
                }
            });
            this.imgUrlList = imgList;
            var videoUrlList = [];
            videoDAtaList.forEach(function (item, number) {
                videoUrlList[number] = item;
                if (https.test(item.url)) {
                    videoUrlList[number].url = item.url;
                } else {
                    videoUrlList[number].url = localStorage.getItem('imgUrl') + item.url;
                }
            });
            this.videoUrlList = videoUrlList;
        },

        baocunbtn() {
            this.$confirm('是否确定保存到产品中心', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let porductDatas = {
                    pic: pic.join(','),
                    video: video.join(','),
                    productDescribe: '',
                    productName: '',
                    sales: 0,
                    stock: 0,
                    id: 0
                };

                const loading = this.$loading({
                    lock: true,
                    text: '保存中 ...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                var pic = []; // 图片
                var video = []; // 视频
                var productDescribe = ''; //商品描述
                var productName = ''; //商品名称
                var sales = ''; //销量
                var stock = ''; //库存
                let videogeshi = /\.(mp4|AVI|mov|rmvb|rm|FLV|3GP)$/;
                let imgtest = /\.(png|svg|jpg|gif|woff|woff2|svg|eot|ttf)$/;
                var https = /^https:\/\/.+$/;
                this.porductData.forEach(function (val, index) {
                    val.worksList.forEach(function (item, number) {
                        if (videogeshi.test(item.url)) {
                            if (https.test(item.url)) {
                                video[index] = item.url.substring(item.url.lastIndexOf('/video'));
                            } else {
                                video[index] = item.url;
                            }
                        } else {
                            if (imgtest.test(item.url)) {
                                pic[index] = item.url.substring(item.url.lastIndexOf('/images'));
                            } else {
                                pic[index] = item.url;
                            }
                        }
                    });
                });
                this.$axios.post('admin/admin/addPreinstallProduct', porductDatas).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.$router.push({
                                path: './product'
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
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                });
            });
        },
        navtablist(item) {
            for (let i = 0; i < this.$refs.navtextli.length; i++) {
                if (item.index == i) {
                    this.$refs.navtextli[i].classList.add('active');
                    this.pushId = i;
                    this.getdataLst();
                } else {
                    this.$refs.navtextli[i].classList.remove('active');
                }
            }
        },
        download(item) {
            console.log(item);
        },
        prev_click(e) {
            this.page = e;
            this.getdataLst();
        },
        next_click(e) {
            this.page = e;
            this.getdataLst();
        },
        current_change(e) {
            this.page = e;
            this.getdataLst();
        },
        returnBtn() {
            this.$router.push({
                path: './myOrderIndex'
            });
        },
        getdataLst() {
            this.$axios.post('admin/sideline/order/query/' + this.$route.query.id).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        var worksList = [];
                        var https = /^https:\/\/.+$/;
                        var id = this.pushId + 1;
                        this.porductData = data.data.taskList;
                        data.data.taskList.forEach(function (val, index) {
                            if (id == val.sidelineType) {
                                val.worksList.forEach(function (item, number) {
                                    worksList[number] = item;
                                    let imgtest = /\.(png|svg|jpg|gif|woff|woff2|svg|eot|ttf)$/;
                                    if (imgtest.test(item.url)) {
                                        worksList[number].booltean = true;
                                    } else {
                                        worksList[number].booltean = false;
                                    }
                                    if (https.test(item.url)) {
                                        worksList[number].url = item.url;
                                    } else {
                                        worksList[number].url = localStorage.getItem('imgUrl') + item.url;
                                    }
                                });
                            }
                        });
                        this.worksList = worksList;
                        this.worksListlength = worksList.length;
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
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            });
        }
    }
};
</script>

<style>
.ordertext {
    box-sizing: border-box;
    padding: 20px;
    background: #fafafa;
}
.baocunbtn {
    font-size: 16px;
}
.order-navtext {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.navtextul {
    display: flex;
    flex-direction: row;
}
.navtextul .navtextli {
    list-style: none;
    margin-left: 30px;
    font-size: 26px;
    cursor: pointer;
    padding: 5px 20px;
}
.navtextli.active {
    border-bottom: 1px solid #2971ff;
    color: #2971ff;
}

.filetype {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    width: 100%;
    font-size: 16px;
}
.order-ul {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    box-sizing: border-box;
}
.order-ul .order-li {
    list-style: none;
    margin-top: 40px;
    margin-left: 20px;
}
.order-ul .order-li .orderli-text {
    width: 300px;
    height: 320px;
}
.text-img {
    width: 100%;
    height: 80%;
}

.text-body {
    padding: 5px;
}
.textname {
    line-height: 30px;
    font-size: 20px;
}
.text-number {
    display: flex;
    justify-content: space-between;
}
.text-number span:nth-child(2) {
    font-size: 26px;
    cursor: pointer;
}
.returnBtn {
    font-size: 20px;
}
.imguls {
    width: 100%;
    height: 300px;
}

.dsadnsak {
    display: flex;
    justify-content: space-between;
}
.videobannerList {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.videobannerList .imgButton {
    background: #ffffff;
    color: #000 50%;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
}
.videobannerList .img {
    width: 90%;
    height: 500px;
}
.textimg {
    width: 90%;
    margin: 0 auto;
}
.textimg.active {
    display: flex;
    justify-content: space-between;
}
.textimg.active span:nth-child(2) {
    cursor: pointer;
    font-size: 26px;
}
</style>

