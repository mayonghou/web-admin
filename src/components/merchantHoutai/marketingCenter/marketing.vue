<template>
    <div class="marketing" id="marketing">
        <div class="marketing-top">
            <div class="bgyingxaio"></div>
            <div class="yingxiaozhuangqu">营销专区</div>
        </div>
        <div class="marketing-body">
            <div class="body-left">
                <div class="left-top">
                    共享千里马
                    <div class="renAll">你想要的人才这里都有</div>
                </div>
                <div class="left-body">
                    <img class="img" src="../../../assets/img/yingxiaozhognxi/qianlima.jpg" />
                    <div class="left-body-text">
                        <p style="margin-top: 5px;">1、商品图不好看？来这儿找专 业的平面设计，你就是下一个伯乐</p>
                        <p style="margin-top: 5px;">2、不会视频剪辑？视频制作大神 等你来淘。</p>
                    </div>
                </div>
                <el-button @click="qianlilma" class="left-bottom">进入共享千里马</el-button>
            </div>
            <div class="body-center">
                <div class="center-top">
                    <div class="center-top-left">
                        <div class="top-left-left"></div>
                        <div class="top-left-right">营销小知识</div>
                    </div>
                    <div class="center-gengduo" @click="xiaozhishi">更多 >></div>
                </div>
                <div class="center-body">
                    <ul class="center-ul">
                        <li
                            class="center-li clearfix"
                            v-for="(item,index) in this.yingxiaoxiaozhishi"
                            :key="index"
                            @click="xiaozhishixinagqiang(item)"
                        >
                            <div class="cneter-li-top">
                                <div class="dianTitle">
                                    <div class="li-dian"></div>
                                    <div class="title">{{item.title}}</div>
                                    <!--小知识标题-->
                                </div>
                                <div class="yuanjingIcon">
                                    <i class="el-icon-view"></i>
                                    <span>{{item.browse}}次浏览</span>
                                </div>
                            </div>
                            <div class="li-body">{{item.content}}</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="body-right">
                <div class="right-top">
                    <div class="right-top-ddd">
                        <div class="activitydd"></div>
                        <div class="activitytext">活动通知</div>
                    </div>
                    <div class="right-top-gengduo" @click="activityAll">更多 >></div>
                </div>
                <div class="body-right-body">
                    <ul class="right-body-ul">
                        <li
                            class="right-body-li"
                            v-for="(item,i) in this.activityList"
                            :key="i"
                            @click="activityDetail(item)"
                        >
                            <div class="body-li-activityName">
                                <span class="activityTitle">{{item.title}}</span>
                                <span class="activityTime">{{item.pushTime}}</span>
                            </div>
                            <div class="activityTexts">
                                <span v-html="item.content"></span>
                            </div>
                        </li>
                    </ul>
                    <!-- <div class="infinite-list-wrapper" style="overflow:auto">
						<ul
						class="list right-body-ul"
						v-infinite-scroll="load"
						infinite-scroll-disabled="disabled">
							<li class="list-item right-body-li" v-for="(item,i) in this.activityList" :key="i">
								<div class="body-li-activityName">
									<span class="activityTitle">{{item.title}}</span>
									<span class="activityTime">{{item.pushTime}}</span>
								</div>
								<div class="activityTexts">
									<span>{{item.content}}</span>
								</div>
							</li>
						</ul>
						<p v-if="loading">加载中...</p>
						<p v-if="noMore">没有更多了</p>
                    </div>-->
                </div>
            </div>
        </div>
        <!-- 营销资源库 -->
        <div class="marketing-repository">
            <div class="repository-top">
                <div class="repository"></div>
                <div class="repository-text">营销资源库</div>
            </div>
            <div class="repository-body">
                <div @click="tabqiehuan" class="repository-body-top">
                    <div class="repository-tab tab-active">视频·课程</div>
                    <div class="repository-tab">设计图·图片</div>
                    <div class="repository-tab">资料·文档</div>
                </div>
                <div class="repository-body-table">
                    <div class="body-table-text tab-active">
                        <markrtingVideo></markrtingVideo>
                    </div>
                    <div class="body-table-text">
                        <markrtingImg></markrtingImg>
                    </div>
                    <div class="body-table-text">
                        <markrtingwendang></markrtingwendang>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import markrtingVideo from './marketing-video.vue';
import markrtingImg from './marketing-img.vue';
import markrtingwendang from './marketing-wendang.vue';
export default {
    name: 'marketing',
    components: {
        markrtingVideo,
        markrtingImg,
        markrtingwendang
    },
    data() {
        return {
            yingxiaoxiaozhishi: [],
            activityList: [],
            count: ''
        };
    },
    mounted() {
        this.getSelectAllMarketKnowledge();
        this.getActiviyList();
    },
    methods: {
        // 营销活动列表
        activityAll() {
            this.$router.push({
                path: './activityList'
            });
        },
        // 营销小知识详情
        xiaozhishixinagqiang(item) {
            this.$router.push({
                path: './zhishiDeatil',
                query: {
                    id: item.id
                }
            });
        },
        // 活动详情
        activityDetail(item) {
            this.$router.push({
                path: './activityDetail',
                query: {
                    id: item.id
                }
            });
        },
        xiaozhishi() {
            this.$router.push({
                path: './xiaozhishiList'
            });
        },
        getSelectAllMarketKnowledge() {
            let datas = {
                page: 1
            };
            this.$axios.get('admin/admin/market/knowledge/selectAllMarketKnowledge', datas).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.yingxiaoxiaozhishi = data.data.data;
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
        // 营销活动
        getActiviyList() {
            let datas = {
                page: 1
            };
            this.$axios.get('admin/admin/market/activity/selectAllMarketActivity', datas).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.activityList = data.data.data;
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
        // swifthorse  进入千里马
        qianlilma() {
            this.$router.push({
                path: './swifthorse'
            });
        },
        // tab切换
        tabqiehuan() {
            var tabType = document.getElementsByClassName('repository-tab');
            var tablist = document.getElementsByClassName('body-table-text');
            for (var i = 0; i < tabType.length; i++) {
                tabType[i].id = i;
                tabType[i].onclick = function () {
                    for (var j = 0; j < tablist.length; j++) {
                        tabType[j].classList.remove('tab-active');
                        tablist[j].classList.remove('tab-active');
                    }
                    tabType[this.id].classList.add('tab-active');
                    tablist[this.id].classList.add('tab-active');
                };
            }
        }
    }
};
</script>

<style scoped>
.marketing {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    background-color: #fafafa;
}
.marketing .marketing-top {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.marketing .marketing-top .bgyingxaio {
    width: 6px;
    height: 25px;
    background-image: linear-gradient(#4760ff, #0dccff);
    border-radius: 10px;
}
.marketing .marketing-top .yingxiaozhuangqu {
    font-size: 24px;
    margin-left: 10px;
    margin-top: -3px;
    font-family: Microsoft YaHei Regular;
}
.clearfix::after {
    clear: both;
    padding: 0;
    content: '';
}
.marketing .marketing-body {
    display: flex;
    justify-content: space-between;
    height: 350px;
}
.marketing .marketing-body .body-left {
    width: 26%;
    height: 100%;
    background-color: #ffffff;
    padding: 20px;
    padding-top: 0;
}
.marketing .marketing-body .body-center {
    width: 34%;
    height: 100%;
    background-color: #ffffff;
}
.marketing .marketing-body .body-right {
    width: 34%;
    height: 100%;
    background-color: #ffffff;
}

.body-left .left-top {
    color: #2971ff;
    font-size: 24px;
    margin-top: 50px;
    margin-left: 80px;
}
.body-left .left-top .renAll {
    font-size: 12px;
    margin-left: 60px;
}
.body-left .left-body {
    display: flex;
    justify-content: space-between;
}
.body-left .left-body .img {
    width: 100px;
    height: 100px;
}
.body-left .left-body .left-body-text {
    font-size: 12px;
    margin-left: 20px;
}
.body-left .left-bottom {
    width: 120px;
    height: 34px;
    background-color: #2971ff;
    margin-top: 10px;
    margin-left: 10px;
    color: #ffffff;
}

.center-top {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    border-bottom: 1px solid #f4f4f4;
}
.center-top .center-top-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.center-top .center-top-left .top-left-left {
    width: 6px;
    height: 25px;
    background-image: linear-gradient(#4760ff, #0dccff);
    border-radius: 10px;
}
.center-top .center-top-left .top-left-right {
    font-size: 22px;
    margin-left: 10px;
}
.center-top .center-gengduo {
    font-size: 16px;
    color: #2971ff;
    cursor: pointer;
    margin-top: 5px;
}
.center-body {
    padding: 40px;
    padding-top: 20px;
}
.center-body .center-ul {
    height: 250px;
    width: 100%;
    overflow: hidden;
}
.center-ul .center-li {
    list-style: none;
    margin-top: 60px;
    cursor: pointer;
}
.center-ul .center-li .cneter-li-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}
.center-ul .center-li:nth-child(1) {
    margin-top: 0;
}
.center-ul .center-li .cneter-li-top .dianTitle {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}
.center-li .cneter-li-top .dianTitle .li-dian {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 10px;
}
.center-li .cneter-li-top .dianTitle .li-dian:nth-child(2) {
    background-color: #fa675c;
}
.center-li .cneter-li-top .dianTitle .li-dian:nth-child(1) {
    background-color: #4285f4;
}
.center-li .cneter-li-top .dianTitle .li-dian:nth-child(3) {
    background-color: #42c3af;
}
.center-li .cneter-li-top .dianTitle .title {
    font-size: 16px;
    font-weight: bold;
}
.cneter-li-top .yuanjingIcon {
    font-size: 12px;
    color: #999999;
}
.cneter-li-top .yuanjingIcon i {
    margin-right: 5px;
}
.center-li .li-body {
    width: 95%;
    float: right;
    height: 40px;
    line-height: 20px;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    font-size: 14px;
}

.body-right .right-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid #f4f4f4;
}
.body-right .right-top .right-top-ddd {
    display: flex;
    flex-wrap: row;
    align-items: center;
}
.body-right .right-top .right-top-ddd .activitydd {
    width: 6px;
    height: 25px;
    border-radius: 10px;
    background-image: linear-gradient(#4760ff, #0dccff);
}
.body-right .right-top .right-top-ddd .activitytext {
    margin-left: 10px;
    font-size: 24px;
}
.body-right .right-top .right-top-gengduo {
    color: #2971ff;
    font-size: 16px;
    cursor: pointer;
}

.body-right .body-right-body {
    padding: 20px;
}
.body-right-body .right-body-ul {
    height: 250px;
    overflow: hidden;
}
.body-right-body .right-body-ul .right-body-li {
    list-style: none;
    padding-top: 20px;
    cursor: pointer;
}
.body-right-body .right-body-ul .right-body-li:nth-child(1) {
    padding-top: 0;
}
.right-body-ul .right-body-li .body-li-activityName {
    display: flex;
    justify-content: space-between;
}
.right-body-ul .right-body-li .body-li-activityName .activityTitle {
    font-size: 16px;
    font-weight: bold;
}
.right-body-ul .right-body-li .body-li-activityName .activityTime {
    font-size: 14px;
    color: #999999;
}
.right-body-ul .right-body-li .activityTexts {
    height: 40px;
    width: 100%;
    line-height: 20px;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    font-size: 14px;
}

.marketing-repository {
    width: 100%;
    margin-top: 20px;
}
.marketing-repository .repository-top {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}
.marketing-repository .repository-top .repository {
    width: 6px;
    height: 25px;
    background-image: linear-gradient(#4760ff, #0dccff);
    border-radius: 10px;
}
.marketing-repository .repository-top .repository-text {
    font-size: 24px;
    margin-left: 10px;
    font-family: Regular;
}
.marketing-repository .repository-body {
    width: 100%;
    margin-top: 10px;
    background-color: #ffffff;
}
.marketing-repository .repository-body .repository-body-top {
    width: 100%;
    height: 100px;
    border-bottom: 1px solid #f4f4f4;
    display: flex;
    align-items: center;
}
.repository-tab {
    font-size: 24px;
    margin-left: 150px;
    cursor: pointer;
}
.repository-tab.tab-active {
    color: #2971ff;
    border-bottom: 2px solid #2971ff;
}

.repository-body-table {
    width: 100%;
}
.body-table-text {
    display: none;
}
.body-table-text.tab-active {
    display: block;
}
</style>
