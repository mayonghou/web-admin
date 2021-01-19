<template>
    <div class="swifthorse" id="swifthorse">
        <div class="myorder">
            <el-button class="myOrderBtn" @click="myOerder" type="text">我的订单</el-button>
        </div>
        <div class="swifthorse-top"></div>
        <div class="swifthorse-body">
            <div class="body-top" ref="tabtext">
                <el-link
                    :underline="false"
                    v-for="item in this.dataType"
                    :key="item.id"
                    :class="item.id==1?'active':''"
                    @click="ellint(item)"
                    ref="tablist"
                    class="top-text"
                >{{item.name}}</el-link>
            </div>
            <div class="body-text">
                <div class="experience" @click="zhonghe">
                    <span class="experience-text">综合</span>
                    <span class="experience-shangxia">
                        <i class="el-icon-arrow-down"></i>
                    </span>
                </div>
                <div class="experience">
                    <span class="experience-text" @click="jignyang">经验</span>
                    <span class="experience-shangxia">
                        <i class="el-icon-arrow-up" @click="jingyangshengxu"></i>
                        <i class="el-icon-arrow-down" @click="jingyangsjiangxu"></i>
                    </span>
                </div>
                <div class="experience">
                    <span class="experience-text" @click="dijiliang">点击量</span>
                    <span class="experience-shangxia">
                        <i class="el-icon-arrow-up" @click="dijiliangshengxu"></i>
                        <i class="el-icon-arrow-down" @click="dijiliangjiangxu"></i>
                    </span>
                </div>
            </div>

            <div class="body-list">
                <!-- 图片制作 -->
                <div class="tab-list">
                    <el-row :gutter="20">
                        <el-col
                            :span="6"
                            class="el-colss"
                            v-for="(item,index) in this.jianzhidataList"
                            :key="index"
                        >
                            <div class="grid-content bg-purple">
                                <img class="img" :src="item.work" />
                                <div class="massage">
                                    <el-avatar :size="size" :src="item.avatar"></el-avatar>
                                    <div class="massagetext">
                                        <h3>{{item.userName}}</h3>
                                        <span>{{item.phoneNumber}}</span>
                                    </div>
                                </div>
                                <div class="positionsName">
                                    <div class="positions">{{item.sidelineTypeName}}</div>
                                    <div class="positionjingyang">{{item.workExperiences}}</div>
                                </div>
                                <div class="zhidaojiaPrice">
                                    <span class="zhidao">指导价：</span>
                                    <span class="price">￥{{item.sysRecommendPrice / 100}}</span>
                                </div>
                                <el-button @click="zhaotabtn(item)" class="zhaota">找TA</el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <el-pagination
                        class="el-pagination"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
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
    name: 'swifthorse',
    data() {
        return {
            // src: require('../../../../assets/img/img.jpg'),
            name: '',
            size: 70,
            page: 1,
            limit: 12,
            counts: 10,
            dataType: [],
            typeid: 1,
            jianzhidataList: [],
            countVisitedOrder: 0,
            ExperiencesLevelOrder: 0
        };
    },
    mounted() {
        this.getListSidelineType();
        this.getListSidelineUser();
    },
    methods: {
        // 我的订单
        myOerder() {
            this.$router.push({
                path: './myOrderIndex'
            });
        },
        zhaotabtn(item) {
            this.$router.push({
                path: './swifthorseDetail',
                query: {
                    id: item.userId
                }
            });
        },
        zhonghe() {
            console.log('sjafikj');

            this.countVisitedOrder = 0;
            this.ExperiencesLevelOrder = 0;
            this.getListSidelineUser();
        },
        jignyang() {
            this.ExperiencesLevelOrder = 0;
            this.getListSidelineUser();
        },
        jingyangshengxu() {
            this.ExperiencesLevelOrder = 1;
            this.getListSidelineUser();
        },
        jingyangsjiangxu() {
            this.ExperiencesLevelOrder = 2;
            this.getListSidelineUser();
        },
        dijiliang() {
            this.countVisitedOrder = 0;
            this.getListSidelineUser();
        },
        dijiliangjiangxu() {
            this.countVisitedOrder = 2;
            this.getListSidelineUser();
        },
        dijiliangshengxu() {
            this.countVisitedOrder = 1;
            this.getListSidelineUser();
        },
        ellint(item) {
            let tab = document.getElementsByClassName('top-text');
            var id = item.id;
            this.typeid = id;
            this.dataType.forEach(function (val, index) {
                if (id == val.id) {
                    tab[index].classList.add('active');
                } else {
                    tab[index].classList.remove('active');
                }
            });
            this.getListSidelineUser();
        },
        // 查询头部类型 如图片制作
        getListSidelineType() {
            this.$axios.get('admin/sideline/list_sideline_type').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.dataType = data.data;
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
        // 商家兼职用户列表
        getListSidelineUser() {
            let datalist = {
                countVisitedOrder: this.countVisitedOrder,
                limit: this.limit,
                management: false,
                page: this.page,
                sidelineType: this.typeid,
                workExperiencesLevelOrder: this.ExperiencesLevelOrder
            };
            this.$axios.post('admin/sideline/management/list_sideline_user', datalist).then((res) => {
                console.log(res);
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        let dataList = [];
                        var aaas = /^(https):\/\/.+$/;
                        data.list.forEach(function (val, index) {
                            dataList[index] = val;
                            if (aaas.test(val.avatar)) {
                                dataList[index].avatar = val.avatar;
                            } else {
                                dataList[index].avatar = localStorage.getItem('imgUrl');
                            }
                            if (aaas.test(val.works[0])) {
                                dataList[index].work = val.works[0];
                            } else {
                                dataList[index].work = localStorage.getItem('imgUrl') + val.works[0];
                            }
                        });
                        this.jianzhidataList = dataList;
                        this.counts = data.total;
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

        handleSizeChange(val) {
            this.limit = val;
            this.getListSidelineUser();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getListSidelineUser();
        },
        headldropdown(command) {
            this.name = command;
        }
    }
};
</script>

<style scoped>
.swifthorse {
    width: 100%;
    box-sizing: border-box;
    background-color: #f1f2f7;
}
.swifthorse-top {
    width: 100%;
    height: 144px;
    background: url('../../../../assets/img/qianlima.png');
    background-size: 100% 100%;
}
.swifthorse-body {
    width: 100%;
    margin-top: 20px;
    background-color: #ffffff;
    padding: 0 30px;
}
.swifthorse-body .body-top {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.swifthorse-body .body-top .top-text {
    font-size: 24px;
    margin-left: 10%;
}
.swifthorse-body .body-top .top-text:nth-child(1) {
    margin-left: 0;
}
.swifthorse-body .body-top .top-text.active {
    color: #2971ff;
    border-bottom: 2px solid #2971ff;
}
.body-text {
    width: 100%;
    line-height: 40px;
    display: flex;
    align-items: center;
}
.el-dropdown-link {
    color: #666666;
}
.experience {
    display: flex;
    align-items: center;
    margin-left: 20px;
}
.experience-text {
    font-size: 14px;
    cursor: pointer;
}
.experience-shangxia i {
    display: block;
    cursor: pointer;
    font-size: 12px;
    margin-left: 5px;
}
.tab-list .img {
    width: 100%;
    height: 240px;
}
.massage {
    display: flex;
    align-items: center;
    padding-left: 10px;
}
.massagetext {
    margin-left: 20px;
    line-height: 30px;
}
.positionsName {
    color: #333333;
    font-size: 20px;
    display: flex;
    align-items: center;
    line-height: 40px;
    font-weight: bold;
    padding-left: 10px;
}
.positionjingyang {
    margin-left: 30px;
}
.zhidaojiaPrice {
    font-size: 22px;
    font-family: Microsoft YaHei Regular;
    font-weight: bold;
    line-height: 40px;
    padding-left: 10px;
}
.zhidaojiaPrice .price {
    color: #ff0000;
}
.zhaota {
    width: 100%;
    height: 54px;
    background: #298377;
    font-size: 22px;
    color: #ffffff;
    padding: 0;
    margin: 0;
}
.grid-content {
    border: 1px solid #cccccc;
}
.el-colss {
    margin-top: 20px;
}
.el-pagination {
    padding-top: 20px;
    width: 100%;
    text-align: center;
}
.myorder {
    width: 100%;
    text-align: right;
    background: #ffffff;
}
.myorder .myOrderBtn {
    color: #ff3b31;
    font-size: 16px;
}
</style>
