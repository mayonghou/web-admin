<template>
    <div class="marketing-img" id="marketing-img">
        <div class="marktingvideo-top">
            <div class="videoClass">
                <div class="shipinClass">图片分类</div>
                <div style="100%" v-if="this.imgClass == ''">
                    <img
                        width="100%"
                        src="../../../assets/img/marketingqianlima/zhanwuData.png"
                        alt
                    />
                </div>
                <div v-else v-for="item in this.imgClass" :key="item.id">
                    <div
                        class="classimg"
                        :class="item.id==1?'active':''"
                        @click="imgClasstype(item)"
                    >
                        <img class="img" src="../../../assets/img/img.jpg" />
                        <div class="className">{{item.name}}</div>
                    </div>
                </div>
            </div>
            <div class="videoList">
                <div class="xialaList">
                    <div class="bbbb" @click="quanbu">
                        <div>全部</div>
                        <div class="bbbv">
                            <i class="vvv el-icon-arrow-down"></i>
                        </div>
                    </div>
                    <div class="bbbb" @click="dianzhaungshuimg">
                        <div>点赞</div>
                        <div class="bbbv">
                            <i class="vvv el-icon-arrow-up"></i>
                            <i class="vvv el-icon-arrow-down"></i>
                        </div>
                    </div>
                    <div class="bbbb" @click="liulanliang">
                        <div>浏览量</div>
                        <div class="bbbv">
                            <i class="vvv el-icon-arrow-up"></i>
                            <i class="vvv el-icon-arrow-down"></i>
                        </div>
                    </div>
                </div>
                <div class="listVideo">
                    <el-row>
                        <el-col
                            :span="24"
                            v-if="this.imgList == ''"
                            style="width:100%; text-align: center;"
                        >
                            <img
                                width="60%"
                                src="../../../assets/img/marketingqianlima/zhanwuData.png"
                            />
                        </el-col>
                        <el-col v-else :span="8" v-for="(item, index) in this.imgList" :key="index">
                            <div class="grid-content bg-purple">
                                <div class="imgData" @click="imgData(item)">
                                    <img class="video" :src="item.imgurl" />
                                    <div class="videoTitle">{{item.pictureName}}</div>
                                    <div class="video-bottom">
                                        <span>{{item.browse}}次浏览</span>
                                        <span>
                                            <i class="iconfont icon-icon_good"></i>
                                            <span>{{item.zan}}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        class="paginationss"
                        :page-sizes="[12, 24, 36, 48]"
                        :page-size="limit"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="counts"
                    ></el-pagination>
                </div>
            </div>
        </div>
        <el-dialog :visible.sync="dialogVisible" width="50%">
            <div class="dialogText">
                <div class="jiehuantupianleft">
                    <i @click="xaingzuo(datadialog)" class="el-icon-arrow-left"></i>
                </div>

                <div class="dialogBody">
                    <img width="90%" height="90%" :src="this.datadialog.imgurl" />
                    <div class="imgtilteText">
                        <div style="margin-top=30px;">
                            <h1>{{this.datadialog.pictureName}}</h1>
                        </div>
                        <div>
                            <span style="margin-right:20px">{{this.datadialog.browse}}次浏览</span>
                            <span @click="imgdianzan(datadialog)">
                                <i class="iconfont icon-icon_good"></i>
                                {{this.datadialog.zan}}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="jiehuantupianright">
                    <i @click="rihgtData(datadialog)" class="el-icon-arrow-right"></i>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'marketing-img',
    data() {
        return {
            commandName: '',
            page: 1,
            limit: 12,
            counts: this.counts,
            imgClass: [],
            dialogVisible: false,
            dainzhang: false,
            louliang: false,
            typeName: '',
            imgList: [],
            ids: 1,
            datadialog: {}
        };
    },
    mounted() {
        this.getSelectAllMarketPictureType();
    },
    methods: {
        // 图片点赞
        imgdianzan(datadialog) {
            this.$axios.get('admin/admin/market/picture/picture/like?pictureId=' + datadialog.id + '&zan=' + true).then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.datadialog.zan = data.data.pictureZan;
                    }
                }
            });
        },
        // 向右按钮
        rihgtData(datadialog) {
            var index = this.imgList.indexOf(datadialog);
            if (index != -1) {
                var count = index + 1;
                if (count > this.imgList.length - 1) {
                    count = this.imgList.length - 1;
                    return this.$message({
                        showClose: true,
                        message: '已经是最后一张了',
                        type: 'success'
                    });
                }
                var datadialogdata = {};
                this.imgList.forEach(function (val, number) {
                    if (count == number) {
                        datadialogdata = val;
                    }
                });
                this.datadialog = datadialogdata;
            }
        },
        // 向左
        xaingzuo(datadialog) {
            var index = this.imgList.indexOf(datadialog);
            if (index != -1) {
                var count = index - 1;
                if (count < 0) {
                    count = 0;
                    return this.$message({
                        showClose: true,
                        message: '这是第一张哦',
                        type: 'success'
                    });
                }
                var datadialogdata = {};
                this.imgList.forEach(function (val, number) {
                    if (count == number) {
                        datadialogdata = val;
                    }
                });
                this.datadialog = datadialogdata;
            }
        },
        imgData(item) {
            this.datadialog = item;
            this.dialogVisible = true;
        },
        getImgData() {
            this.$axios.get('admin/admin/market/picture/select/' + this.imgid).then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        console.log(data.data);
                        var https = /^https:\/\/+.$/;
                        var pictureUrl = '';
                        if (https.test(data.data.pictureUrl)) {
                            pictureUrl = data.data.pictureUrl;
                        } else {
                            pictureUrl = localStorage.getItem('imgUrl') + data.data.pictureUrl;
                        }
                        this.datadialog = {
                            pictureUrl: pictureUrl,
                            id: data.data.id,
                            browse: data.data.browse,
                            pictureName: data.data.pictureName,
                            pictureType: data.data.pictureType,
                            zan: data.data.zan
                        };
                    }
                }
            });
        },
        // 获取图片类型
        getSelectAllMarketPictureType() {
            this.$axios.get('admin/admin/market/picture/type/selectAllMarketPictureType?page=1').then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.imgClass = data.data.data;
                        this.typeName = data.data.data[0].name;
                        this.getImgAll();
                    }
                }
            });
        },
        imgClasstype(item) {
            this.typeName = item.name;
            this.getImgAll();
            var id = item.id;
            let tab = document.getElementsByClassName('classimg');
            this.imgClass.forEach(function (val, index) {
                if (id == val.id) {
                    tab[index].classList.add('active');
                } else {
                    tab[index].classList.remove('active');
                }
            });
        },
        quanbu() {
            this.dainzhang = false;
            this.louliang = false;
            this.getImgAll();
        },
        dianzhaungshuimg() {
            this.dainzhang = true;
            this.louliang = false;
            this.getImgAll();
        },
        liulanliang() {
            this.dainzhang = false;
            this.louliang = true;
            this.getImgAll();
        },
        handleSizeChange(val) {
            this.limit = val;
            this.getImgAll();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getImgAll();
        },
        getImgAll() {
            let datas =
                '?page=' +
                this.page +
                '&limit=' +
                this.limit +
                '&type=' +
                this.typeName +
                '&zan=' +
                this.dainzhang +
                '&play=' +
                this.louliang;
            this.$axios.get('admin/admin/market/picture/selectAllMarketPicture' + datas).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        var https = /^https:\/\/+$/;
                        var cList = [];
                        data.data.data.forEach(function (val, index) {
                            cList[index] = val;
                            if (https.test(val.pictureUrl)) {
                                cList[index].imgurl = val.pictureUrl;
                            } else {
                                cList[index].imgurl = localStorage.getItem('imgUrl') + val.pictureUrl;
                            }
                        });
                        this.imgList = cList;
                        this.counts = data.data.total;
                    }
                }
            });
        }
    }
};
</script>

<style scoped>
.marketing-img {
    box-sizing: border-box;
    width: 100%;
}
.marktingvideo-top {
    display: flex;
    justify-content: space-between;
}
.marktingvideo-top .videoClass {
    width: 20%;
    border-right: 1px solid #f4f4f4;
}
.marktingvideo-top .videoList {
    width: 80%;
    padding: 5px 20px;
}

.videoClass .shipinClass {
    font-size: 22px;
    padding: 10px 20px;
    padding-bottom: 0;
}
.videoClass .classimg {
    padding: 0 20%;
    font-size: 20px;
    display: flex;
    align-items: center;
    margin-top: 50px;
    cursor: pointer;
}
.videoClass .classimg.active {
    color: #2971ff;
}
.videoClass .classimg .img {
    width: 30px;
    height: 30px;
}
.videoClass .classimg .className {
    margin-left: 20px;
}

.videoList .xialaList {
    display: flex;
    align-items: center;
}
.el-dropdown-link {
    color: #666666;
}
/* .el-dropdown{
		width: 100px;
	} */
.bbbb {
    margin-left: 54px;
    display: flex;
    align-items: center;
    color: #666666;
}
.bbbv .vvv {
    display: block;
    font-size: 10px;
    cursor: pointer;
}
.bbbbbbbb {
    width: 100%;
    height: 100px;
    background-color: #0000ff;
}
.listVideo {
    margin-top: 10px;
}

.listVideo .grid-content {
    padding: 10px 40px;
}
.imgData {
    cursor: pointer;
}

.listVideo .grid-content .video {
    width: 100%;
    height: 200px;
}
.videoTitle {
    width: 100%;
    line-height: 40px;
    font-size: 18px;
    font-weight: bold;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    display: -webkit-box;
}
.video-bottom {
    display: flex;
    justify-content: space-between;
    color: #cccccc;
    font-size: 12px;
}
.grid-content {
    border: 0;
}
.paginationss {
    text-align: center;
    width: 100%;
}
.dialogText {
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 930px;
    overflow: hidden;
}
.dialogText .jiehuantupianleft {
    position: relative;
    font-size: 30px;
    cursor: pointer;
    width: 5%;
    border-radius: 50%;
    background: coral;
}
.dialogText .jiehuantupianleft i {
    position: absolute;
    top: 50%;
}
.dialogText .jiehuantupianright {
    font-size: 30px;
    cursor: pointer;
    width: 5%;
}
.dialogText .dialogBody {
    width: 90%;
}
.dialogText .dialogBody .imgtilteText {
    width: 90%;
    height: 50px;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    margin-top: 30px;
}
</style>
