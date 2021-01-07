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
                        <img class="text-img" :src="item.url" />
                        <div class="text-body">
                            <div class="textname">pingg</div>
                            <div class="text-number">
                                <span>图片尺寸大小为110*100</span>
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
            ]
        };
    },
    mounted() {
        this.getdataLst();
    },
    methods: {
        baocunbtn() {},
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
                        data.data.taskList.forEach(function (val, index) {
                            if (id == val.sidelineType) {
                                val.worksList.forEach(function (item, number) {
                                    worksList[number] = item;
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

<style scoped>
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
</style>

