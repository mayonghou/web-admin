<template>
    <!-- 进行中上传的订单任务 -->
    <div class="offThenStocks" id="uploadWorks">
        <div class="returnBtn">
            <el-button type="text" @click="returnBtn">返回</el-button>
        </div>
        <div class="offThenStocksNav">
            <ul class="navUl">
                <li
                    class="navLi"
                    :class="item.index == 0?'active':''"
                    @click="navLiTab(item)"
                    v-for="item in this.navLiList"
                    :key="item.index"
                    ref="navLi"
                >
                    <span>{{item.name}}</span>
                </li>
            </ul>
            <div class="shangchuanNumber">
                <span>
                    已上传的图片列表
                    <span style="color: #1FB054;">(8/10张)</span>
                </span>
                <div style="font-size: 16px; cursor: pointer; color: #42A7FF;" @click="iconUpload">
                    <i class="el-icon-upload"></i>上传任务作品
                </div>
            </div>
            <ul class="renwuText" v-if="this.typeID == 0">
                <li class="renwuTextLi">
                    <div class="imgDiv">
                        <i class="icon el-icon-delete"></i>
                        <img width="100%" height="100%" />
                    </div>
                    <div class="imgText">
                        <p class style="line-height: 30px;">苹果X</p>
                        <div class="anew">
                            <span>图片尺寸大小为110*100</span>
                            <span style="color: #42A7FF; cursor: pointer;">
                                <i class="el-icon-refresh"></i>
                                重新上传
                            </span>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="renwuText" v-if="this.typeID == 1">
                <li class="renwuTextLi">
                    <div class="imgDiv">
                        <i class="icon el-icon-delete"></i>
                        <video width="100%" height="100%"></video>
                    </div>
                    <div class="imgText">
                        <p class style="line-height: 30px;">苹果</p>
                        <div class="anew">
                            <span>图片尺寸大小为110*100</span>
                            <span style="color: #42A7FF; cursor: pointer;">
                                <i class="el-icon-refresh"></i>
                                重新上传
                            </span>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="renwuText" v-if="this.typeID == 2">
                <li class="renwuTextLi">
                    <div class="imgDiv">
                        <i class="icon el-icon-delete"></i>
                        <video width="100%" height="100%"></video>
                    </div>
                    <div class="imgText">
                        <p class style="line-height: 30px;">苹果1</p>
                        <div class="anew">
                            <span>图片尺寸大小为110*100</span>
                            <span style="color: #42A7FF; cursor: pointer;">
                                <i class="el-icon-refresh"></i>
                                重新上传
                            </span>
                        </div>
                    </div>
                </li>
            </ul>
            <el-pagination
                class="elpagination"
                @prev-click="prev_click"
                @next-click="next_click"
                @current-change="current_change"
                :page-size="10"
                :total="counts"
                layout="prev, pager, next"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            navLiList: [
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
            page: 1,
            limit: 10,
            counts: 10,
            typeID: 0
        };
    },
    mounted() {
        this.heightBody();
    },
    methods: {
        heightBody() {
            let bodyHeight = document.body.clientHeight;
            let orderProlong = document.getElementById('uploadWorks');
            orderProlong.style.height = bodyHeight - 70 + 'px';
        },
        // 头部nav导航切换
        navLiTab(item) {
            this.typeID = item.index;
            let navLiList = this.$refs.navLi;
            for (let i = 0; i < navLiList.length; i++) {
                if (item.index == i) {
                    navLiList[i].classList.add('active');
                } else {
                    navLiList[i].classList.remove('active');
                }
            }
        },
        // 分页
        prev_click(e) {
            this.page = e;
        },
        next_click(e) {
            this.page = e;
        },
        current_change(e) {
            this.page = e;
        },
        returnBtn() {
            this.$router.push({
                path: './myOrder'
            });
        },
        // 上传任务作品
        iconUpload() {
            if (this.typeID == 0) {
                this.$router.push({
                    path: './uploadFile',
                    query:{
						type:0
					}
                });
            } else if (this.typeID == 1) {
                this.$router.push({
                    path: './uploadFile',
                    query:{
                    	type:1
                    }
                });
            } else if (this.typeID == 2) {
                this.$router.push({
                    path: './uploadFile',
                    query:{
                   	  type:2
                    }
                });
            }
        }
    }
};
</script>

<style scoped>
.offThenStocks {
    box-sizing: border-box;
    background-color: #f5f7fc;
    padding-top: 15px;
}
.offThenStocksNav {
    width: 90%;
    margin: 0 auto;
}
.offThenStocksNav .navUl {
    width: 100%;
    display: flex;
    height: 42px;
    flex-direction: row;
    align-items: center;
}
.offThenStocksNav .navUl .navLi {
    list-style: none;
    width: 200px;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #edf8ee;
}
.offThenStocksNav .navUl .navLi.active {
    background-color: #1fb054;
    color: #fff;
}
.offThenStocksNav .navUl .navLi:hover {
    background-color: #1fb054;
    color: #fff;
}
.shangchuanNumber {
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.renwuText {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
.renwuText .renwuTextLi {
    width: 24%;
    height: 240px;
    list-style: none;
    background-color: #fff;
    margin: 10px 10px 0 0;
}
.imgDiv {
    cursor: pointer;
    width: 100%;
    height: 70%;
    background-color: #179a16;
    position: relative;
}
.icon {
    position: absolute;
    top: 5px;
    right: 5px;
    color: #d50b0b;
    font-size: 20px;
}
.imgText {
    width: 100%;
    height: 30%;
    padding: 0 20px;
}
.elpagination {
    width: 100%;
    text-align: center;
    margin-top: 10px;
}
.returnBtn {
    width: 100%;
    text-align: right;
    padding: 0 20px;
}
.anew {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 30px;
    color: #8f8e94;
}
</style>
