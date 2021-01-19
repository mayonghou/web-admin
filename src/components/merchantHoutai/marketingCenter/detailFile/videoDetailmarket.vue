<template>
    <!--营销中心视视频详情-->
    <div class="marketVideo" id="marketVideo">
        <div class="videoDetail">
            <div class="videoDetailLeft">
                <div class="videoDaxaio">
                    <video
                        ref="videoPlayer"
                        width="100%"
                        height="100%"
                        controls
                        controlslist="nodownload"
                        @play="toPlays(videoData)"
                        @timeupdate="updateTime"
                        @pause="toPause"
                        :src="this.videoData.videoUrl"
                        class="video"
                    ></video>
                </div>
                <div class="video-text">
                    <h2>{{ this.videoData.title }}</h2>
                    <div class="zanbfl">
                        <span>{{ this.videoData.play }}次播放</span>
                        <span>
                            <i
                                @click="dianzhang(videoData)"
                                v-if="this.like == false"
                                class="iconfont icon-icon_good"
                            ></i>
                            <i v-else-if="this.like == true" class="sss iconfont icon-zan1"></i>
                            <span>{{ this.videoData.zan }}</span>
                        </span>
                    </div>
                </div>
                <div class="textLssss">{{ this.videoData.videoDescribe }}</div>
            </div>
            <div class="videoDetailright">
                <div class="rightList">
                    <ul class="infinite-list" v-infinite-scroll="load" style="overflow: auto">
                        <li
                            class="infinite-list-item"
                            v-for="(item, index) in this.videoList"
                            :key="index"
                        >
                            <div class="list-tops" @click="playtovideo(item)">
                                <div class="videoLists">
                                    <video
                                        ref="videoPlayer"
                                        width="100%"
                                        height="100%"
                                        controls
                                        controlslist="nodownload"
                                        class="video"
                                        :src="item.videourl"
                                    ></video>
                                </div>
                                <div class="video-texts">
                                    <p class="teext-title">{{item.videoName}}</p>
                                    <p class="textzhangplay">
                                        <span>{{ item.play }}次播放</span>
                                        <span>
                                            <i class="iconfont icon-icon_good"></i>
                                            <span>{{ item.zan }}</span>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'marketVideo',
    data() {
        return {
            load: false,
            videoList: [],
            videoData: {},
            page: 1,
            limit: 5,
            id: '',
            zan: false,
            like: false
        };
    },
    mounted() {
        this.getVideoAll();
        this.getVideomarketData();
    },
    methods: {
        // 视频播放
        toPlays(e) {
            this.$axios.get('admin/admin/market/video/video/play?videoId=' + e.id + '&play=' + true).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.videoData.play = data.data.play;
                        this.getVideoAll();
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
        // 视频暂停
        toPause(e) {},
        // 时间
        updateTime(e) {},
        // 点击右侧视频播放
        playtovideo(item) {
            this.id = item.id;
            this.getVideomarketData();
        },
        getVideomarketData() {
            if (this.id == '') {
                var id = this.$route.params.id || localStorage.getItem('videoid');
            } else {
                var id = this.id;
            }
            this.$axios.get('admin/admin/market/video/select/' + id).then((res) => {
                // console.log(id);
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        var https = /^https:\/\/.+$/;
                        var videoUrl = '';
                        console.log(data);
                        this.like = data.data.like;
                        if (https.test(data.data.videoUrl)) {
                            videoUrl = data.data.videoUrl;
                        } else {
                            videoUrl = localStorage.getItem('imgUrl') + data.data.videoUrl;
                        }
                        this.videoData = {
                            videoUrl: videoUrl,
                            title: data.data.videoName,
                            play: data.data.play,
                            zan: data.data.zan,
                            videoDescribe: data.data.videoDescribe,
                            id: data.data.id
                        };
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
        // 视频点赞
        dianzhang(val) {
            console.log('sjafikj');

            this.zan = true;
            let datas = '?videoId=' + val.id + '&zan=' + this.zan;
            this.$axios.get('admin/admin/market/video/video/like' + datas).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.videoData.zan = data.data.zan;
                        this.getVideoAll();
                        this.getVideomarketData();
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
        getVideoAll() {
            let datas = '?page=' + this.page + '&limit=' + this.limit;
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

<style scoped>
.marketVideo {
    box-sizing: border-box;
    padding: 20px;
    background: #f5f7fc;
}
.videoDetail {
    /* background: greenyellow; */
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
}
.videoDetailLeft {
    width: 70%;
}
.videoDetailright {
    width: 30%;
}
.videoDetailLeft .videoDaxaio {
    width: 100%;
    height: 430px;
    padding-right: 10px;
}
.videoDetailLeft .video-text {
    padding: 20px;
}
.videoDetailLeft .video-text .zanbfl {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #999999;
    margin-top: 10px;
}
.textLssss {
    width: 100%;
    height: 100%;
    padding: 0 50px;
}
.videoDetailright .rightList {
    padding: 0 20px;
    height: 1029px;
}
.infinite-list {
    width: 100%;
    height: 100%;
}
.infinite-list-item {
    margin-top: 20px;
}
.list-tops {
    display: flex;
    justify-content: space-between;
}
.videoLists {
    width: 50%;
    height: 200px;
}
.video-texts {
    width: 50%;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0px 20px;
    box-sizing: border-box;
}
.teext-title {
    line-height: 100px;
    font-size: 20px;
    color: #101010;
    font-weight: bold;
}
.textzhangplay {
    display: flex;
    justify-content: space-between;
}
.sss {
    color: #ff0000;
}
</style>

