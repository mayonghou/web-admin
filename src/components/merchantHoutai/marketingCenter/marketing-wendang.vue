<template>
    <div class="marketing-video" id="marketing-video">
        <div class="marktingvideo-top">
            <div class="videoClass">
                <div class="shipinClass">文档分类</div>
                <div style="100%" v-if="this.fileClass == ''">
                    <img
                        width="100%"
                        src="../../../assets/img/marketingqianlima/zhanwuData.png"
                        alt
                    />
                </div>
                <div v-for="item in this.fileClass" :key="item.id">
                    <div
                        class="classwendang"
                        :class="item.id == 1?'active':''"
                        @click="fileclick(item)"
                    >
                        <img class="img" src="../../../assets/img/img.jpg" />
                        <div class="className">{{item.name}}</div>
                    </div>
                </div>
            </div>
            <div class="videoList">
                <div class="xialaList">
                    <div class="bbbb" @click="quanbufile">
                        <div>全部</div>
                        <div class="bbbv">
                            <i class="vvv el-icon-arrow-down"></i>
                        </div>
                    </div>
                    <div class="bbbb" @click="dianzhangFile">
                        <div>点赞</div>
                        <div class="bbbv">
                            <i class="vvv el-icon-arrow-up"></i>
                            <i class="vvv el-icon-arrow-down"></i>
                        </div>
                    </div>
                    <div class="bbbb" @click="liulangFile">
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
                            v-if="this.fileList == ''"
                            style="width:100%; text-align: center;"
                        >
                            <img
                                width="60%"
                                src="../../../assets/img/marketingqianlima/zhanwuData.png"
                            />
                        </el-col>
                        <el-col :span="6" v-for="item in this.fileList" :key="item.id">
                            <div class="grid-content bg-purple">
                                <img class="video" :src="item.fileurl" />
                                <div class="videoTitle">{{item.fileName}}</div>
                                <div class="video-bottom">
                                    <span>{{item.browse}}次浏览</span>
                                    <span>
                                        <i class="iconfont icon-icon_good"></i>
                                        <span>{{item.zan}}</span>
                                    </span>
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
    </div>
</template>

<script>
export default {
    name: 'marketing-video',
    data() {
        return {
            commandName: '',
            page: 1,
            limit: 12,
            counts: this.counts,
            fileClass: [],
            dianzhangNum: false,
            liuliangNum: false,
            fileList: []
        };
    },
    mounted() {
        this.getFileType();
    },
    methods: {
        getFileType() {
            this.$axios.get('admin/admin/market/file/type/selectAllMarketFileType?page=1').then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.fileClass = data.data.data;
                        this.typeName = data.data.data[0].name;
                        this.getFileList();
                    }
                }
            });
        },
        fileclick(item) {
            this.typeName = item.name;
            this.getFileList();
            var id = item.id;
            let tab = document.getElementsByClassName('classwendang');
            this.fileClass.forEach(function (val, index) {
                if (id == val.id) {
                    tab[index].classList.add('active');
                } else {
                    tab[index].classList.remove('active');
                }
            });
        },
        quanbufile() {
            this.dianzhangNum = false;
            this.liuliangNum = false;
            this.getFileList();
        },
        dianzhangFile() {
            this.dianzhangNum = true;
            this.liuliangNum = false;
            this.getFileList();
        },
        liulangFile() {
            this.dianzhangNum = false;
            this.liuliangNum = true;
            this.getFileList();
        },
        handleSizeChange(val) {
            this.limit = val;
            this.getFileList();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getFileList();
        },
        getFileList() {
            let datas =
                '?page=' +
                this.page +
                '&limit=' +
                this.limit +
                '&type=' +
                this.typeName +
                '&zan=' +
                this.dianzhangNum +
                '&play=' +
                this.liuliangNum;
            this.$axios.get('admin/admin/market/file/selectAllMarketFile' + datas).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        var https = /^https:\/\/+$/;
                        var cList = [];
                        data.data.data.forEach(function (val, index) {
                            cList[index] = val;
                            if (https.test(val.filePic)) {
                                cList[index].fileurl = val.filePic;
                            } else {
                                cList[index].fileurl = localStorage.getItem('imgUrl') + val.filePic;
                            }
                        });
                        this.fileList = cList;
                        this.counts = data.data.total;
                    }
                }
            });
        }
    }
};
</script>

<style scoped>
.marketing-video {
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
.videoClass .classwendang {
    padding: 0 20%;
    font-size: 20px;
    display: flex;
    align-items: center;
    margin-top: 50px;
    cursor: pointer;
}
.videoClass .classwendang.active {
    color: #2971ff;
}
.videoClass .classwendang .img {
    width: 30px;
    height: 30px;
}
.videoClass .classwendang .className {
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
    cursor: pointer;
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
</style>
