<template>
    <div class="marketing-video" id="marketing-video">
        <div class="marktingvideo-top">
            <div class="videoClass">
                <div class="shipinClass">视频分类</div>
                <div style="100%" v-if="this.videoClass == ''">
                    <img
                        width="100%"
                        src="../../../assets/img/marketingqianlima/zhanwuData.png"
                        alt
                    />
                </div>
                <div v-else v-for="item in this.videoClass" :key="item.id">
                    <div
                        class="classtef"
                        ref="classtef"
                        :class="item.id == 1 ?'active':''"
                        @click="videoClassList(item)"
                    >
                        <img class="img" src="../../../assets/img/img.jpg" />
                        <div class="className">{{item.name}}</div>
                    </div>
                </div>
            </div>
            <div class="videoList">
                <div class="xialaList">
                    <div class="bbbb sss" @click="quanbuAll">
                        <div>全部</div>
                        <div class="bbbv">
                            <i class="vvv el-icon-arrow-down"></i>
                        </div>
                    </div>
                    <div class="bbbb" @click="dianzhaungshu">
                        <div>点赞</div>
                        <div class="bbbv">
                            <i class="vvv el-icon-arrow-up"></i>
                            <i class="vvv el-icon-arrow-down"></i>
                        </div>
                    </div>
                    <div class="bbbb" @click="bufangliang">
                        <div>播放量</div>
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
                            v-if="this.videoList == ''"
                            style="width:100%; text-align: center;"
                        >
                            <img
                                width="60%"
                                src="../../../assets/img/marketingqianlima/zhanwuData.png"
                            />
                        </el-col>
                        <el-col v-else :span="8" v-for="item in this.videoList" :key="item.id">
                            <div class="grid-content bg-purple">
                                <div @click="videoDetailBtn(item)" style="cursor: pointer;">
                                    <video
                                        ref="videoPlayer"
                                        controls
                                        controlslist="nodownload"
                                        :src="item.videourl"
                                        class="video"
                                    ></video>
                                    <div class="videoTitle">{{item.videoDescribe}}</div>
                                    <div class="video-bottom">
                                        <span>{{item.play}}次播放</span>
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
    </div>
</template>

<script>
export default {
    // name: 'marketing-video',
    data() {
        return {
            commandName: '',
            page: 1,
            limit: 12,
            counts: this.counts,
            videoClass: [],
            typeName: '',
            dianzhuang: false,
            videoBuofang: false,
            videoList: []
        };
    },
    mounted() {
        this.getSelectAllMarketVideoType();
        // this.getSelectAllMarketVideo();
    },
    methods: {
        getSelectAllMarketVideoType() {
            this.$axios.get('admin/admin/market/video/type/selectAllMarketVideoType?page=1').then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.videoClass = data.data.data;
                        this.typeName = data.data.data[0].name;
                        this.getSelectAllMarketVideo();
                    }
                }
            });
        },
        // 视频分类点击
        videoClassList(item) {
            this.typeName = item.name;
            this.getSelectAllMarketVideo();
            var id = item.id;
            let tab = document.getElementsByClassName('classtef');
            this.videoClass.forEach(function (val, index) {
                if (id == val.id) {
                    tab[index].classList.add('active');
                } else {
                    tab[index].classList.remove('active');
                }
            });
        },
        // 查看视频详情
        videoDetailBtn(item) {
            localStorage.setItem('videoid', item.id);
            this.$router.push({
                path: './videoDetailmarket',
                name: 'videoDetailmarket',
                params: {
                    id: localStorage.getItem('videoid')
                }
            });
        },
        // 全部按钮
        quanbuAll() {
            this.dianzhuang = false;
            this.videoBuofang = false;
            this.getSelectAllMarketVideo();
        },
        dianzhaungshu() {
            this.dianzhuang = true;
            this.videoBuofang = false;
            this.getSelectAllMarketVideo();
        },
        bufangliang() {
            this.dianzhuang = false;
            this.videoBuofang = true;
            this.getSelectAllMarketVideo();
        },
        // 查询视频
        getSelectAllMarketVideo() {
            let datas =
                '?page=' +
                this.page +
                '&limit=' +
                this.limit +
                '&type=' +
                this.typeName +
                '&zan=' +
                this.dianzhuang +
                '&play=' +
                this.videoBuofang +
                '&paging=true';
            this.$axios.get('admin/admin/market/video/selectAllMarketVideo' + datas).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        var https = /^https:\/\/+$/;
                        var cList = [];
                        data.data.data.forEach(function (val, index) {
                            cList[index] = val;
                            if (https.test(val.videoUrl)) {
                                cList[index].videourl = val.videoUrl;
                            } else {
                                cList[index].videourl = localStorage.getItem('imgUrl') + val.videoUrl;
                            }
                        });
                        this.videoList = cList;
                        this.counts = data.data.total;
                    }
                }
            });
        },
        handleSizeChange(val) {
            this.limit = val;
            this.getSelectAllMarketVideo();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getSelectAllMarketVideo();
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
.videoClass .classtef {
    padding: 0 20%;
    font-size: 20px;
    display: flex;
    align-items: center;
    margin-top: 50px;
    cursor: pointer;
}
.classtef.active {
    color: #2971ff;
}
.videoClass .classtef .img {
    width: 30px;
    height: 30px;
}
.videoClass .classtef .className {
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
