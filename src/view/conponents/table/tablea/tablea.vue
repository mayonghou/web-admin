<template>
    <div class="table_css_xiaoyuer">
        <div class="table_css_xiaoyuer-div">
            <!-- TOP---Btn -->
            <Button
                @click="BatchDeleteData"
                type="error"
                style="margin-left:15px;"
                v-if="BtnDataiShhow1"
            >批量删除</Button>
            <Button
                type="primary"
                style="margin-left:15px;"
                v-if="BtnDataiShhow2"
                @click="AddIndustry"
            >添加行业</Button>
            <Button
                type="success"
                style="margin-left:15px;"
                v-if="BtnDataiShhow3"
                @click="AddNewPeople"
            >添加人员</Button>
            <Button type="primary" style="margin-left:15px;" v-if="BtnDataiShhow4">发布新公告</Button>
        </div>
        <Table
            border
            ref="selection"
            :columns="columns12"
            :data="data6"
            @on-selection-change="xiaoyuerChangeData"
        >
            <template slot-scope="{ row }" slot="dataTanle">
                <strong>{{ row.dataTanle }}</strong>
            </template>
            <template slot-scope="{ row,index }" slot="action">
                <Button
                    type="primary"
                    size="small"
                    class="Button bottokmt"
                    v-if="isShowIfShow03"
                >已置顶</Button>
                <Button
                    type="primary"
                    size="small"
                    class="Button bottokmt"
                    style="background-color:#3A9DF4 ;"
                    v-if="isShowIfShow07"
                    @click="resetPasswordXiaoyuer(row)"
                >重置密码</Button>
                <!-- 共享千里马 -->
                <Button
                    type="primary"
                    size="small"
                    class="Button bottokmt"
                    style="background-color:#2494D2 ;"
                    v-if="isShowIfShow04"
                    @click="toAdministration(row)"
                >管理</Button>
                <!-- 行业管理 -->
                <Button
                    type="primary"
                    size="small"
                    class="Button bottokmt"
                    style="background-color:#109955 ;"
                    v-if="isShowIfShow05"
                    @click="SendDataToFunction"
                >修改</Button>
                <!-- 行业管理 -->
                <Button
                    type="primary"
                    size="small"
                    class="Button bottokmt"
                    style="background-color:#109955 ;"
                    v-if="isShowIfShow06"
                    @click="toviewannoun(row)"
                >查看公告</Button>
                <Button
                    type="error"
                    size="small"
                    class="Button bottokm"
                    @click="RouteDetailsPage(row)"
                    v-if="isShowIfShow02"
                >详情</Button>
                <Button
                    type="primary"
                    size="small"
                    class="Button bottokmt"
                    @click="show(row,index)"
                    v-if="isShowIfShow"
                >下架</Button>
                <Button
                    type="error"
                    size="small"
                    class="Button bottomred"
                    @click="DeletDataFuncyion(row)"
                    v-if="isShowIfShow09"
                >删除</Button>
            </template>
        </Table>
    </div>
</template>
<script>
import store from '../../../../store/store';
export default {
    props: [
        'statusCode',
        'pageid',
        'Datar0',
        'Datar1',
        'Datar2',
        'Datar3',
        'Datar4',
        'Datar5',
        'Datar6',
        'Datar7',
        'Datar8',
        'Datar9',
        'Datar10',
        'Datar11',
        'Datar12',
        'Datar13',
        'Datar14',
        'Datar15',
        'Datar16',
        'Datar17',
        'Datar18',
        'Datar19',
        'Datar20',
        'Datar21'
    ],
    data() {
        return {
            columns12: [],
            data6: [],
            // tableBtn
            isShowIfShow: true,
            isShowIfShow02: true,
            isShowIfShow03: false,
            isShowIfShow04: false,
            isShowIfShow05: false,
            isShowIfShow06: false,
            isShowIfShow07: false,
            isShowIfShow08: false,
            isShowIfShow09: true,
            pageId: '',
            // choceBtn
            BtnDataiShhow1: true,
            BtnDataiShhow2: false,
            BtnDataiShhow3: false,
            BtnDataiShhow4: false,
            idArr: []
        };
    },
    created() {},
    mounted() {
        this.PageRenderingFunction(); // $ajax
    },
    watch: {
        Datar0: {
            handler(newdata, oldata) {
                this.data6 = newdata;
            },
            deep: true,
            immediate: true
        },
        Datar1: {
            handler(newdata, oldata) {
                this.data6 = newdata;
            },
            deep: true,
            immediate: true
        },
        Datar2: {
            handler(newdata, oldata) {
                this.data6 = newdata;
            },
            deep: true,
            immediate: true
        },
        Datar3: {
            handler(newdata, oldata) {
                this.data6 = newdata;
            },
            deep: true,
            immediate: true
        },
        Datar4: {
            handler(newdata, oldata) {
                this.data6 = newdata;
            },
            deep: true,
            immediate: true
        },
        Datar5: {
            handler(newdata, oldata) {
                this.data6 = newdata;
            },
            deep: true,
            immediate: true
        },
        Datar6: {
            handler(newdata, oldata) {
                this.data6 = newdata;
            },
            deep: true,
            immediate: true
        },
        Datar7: {
            handler(newdata, oldata) {
                this.data6 = newdata;
            },
            deep: true,
            immediate: true
        },
        Datar8: {
            handler(newdata, oldata) {
                this.data6 = newdata;
            },
            deep: true,
            immediate: true
        },
        Datar9: {
            handler(newdata, oldata) {
                this.data6 = newdata;
            },
            deep: true,
            immediate: true
        },
        Datar10: {
            handler(newdata, oldata) {
                this.data6 = newdata;
            },
            deep: true,
            immediate: true
        },
        Datar11: {
            handler(newdata, oldata) {
                this.data6 = newdata;
            },
            deep: true,
            immediate: true
        },
        Datar12: {
            handler(newdata, oldata) {
                this.data6 = newdata;
            },
            deep: true,
            immediate: true
        },
        Datar13: {
            handler(newdata, oldata) {
                this.data6 = newdata;
            },
            deep: true,
            immediate: true
        },
        Datar14: {
            handler(newdata, oldata) {
                this.data6 = newdata;
            },
            deep: true,
            immediate: true
        },
        Datar15: {
            handler(newdata, oldata) {
                this.data6 = newdata;
            },
            deep: true,
            immediate: true
        },
        Datar16: {
            handler(newdata, oldata) {
                this.data6 = newdata;
            },
            deep: true,
            immediate: true
        },
        Datar17: {
            handler(newdata, oldata) {
                this.data6 = newdata;
            },
            deep: true,
            immediate: true
        },
        Datar18: {
            handler(newdata, oldata) {
                this.data6 = newdata;
            },
            deep: true,
            immediate: true
        },
        Datar19: {
            handler(newdata, oldata) {
                this.data6 = newdata;
            },
            deep: true,
            immediate: true
        },
        Datar20: {
            handler(newdata, oldata) {
                this.data6 = newdata;
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        // 下架 回调函数
        show(row) {
            if (this.pageId == 0) {
                this.$parent.Goodsoffshelves(row.id, 0); // 商品
            } else if (this.pageId == 3) {
                this.$parent.Goodsoffshelvesren(row.id, 3); // 租房
            } else if (this.pageId == 4) {
                this.$parent.Goodsoffshelvesrenrec(row.id, 3); // 招聘
            } else if (this.pageId == 5) {
                this.$parent.DeletDataforVideo(row.id, 3); // 视频
            } else if (this.pageId == 7) {
                this.$parent.deleDataForcoup(row.id, 1, 2); //活动管理=>优惠券
            } else if (this.pageId == 8) {
                this.$parent.deleDataGroupbuy(row.id, 6, 2); //活动管理=>同城团购
            } else if (this.pageId == 9) {
                this.$parent.deleDataForseckill(row.id, 4, 2); //活动管理=>秒杀活动
            } else if (this.pageId == 10) {
                this.$parent.deleDataFodiscount(row.id, 0, 2); //活动管理=>折扣专区
            } else if (this.pageId == 11) {
                this.$parent.deleDatasite(row.id, 2, 2); //活动管理=>清仓处理
            } else if (this.pageId == 12) {
                this.$parent.deleteLuckDraw(row.id, 3, 2); //活动管理=>抽奖
            } else if (this.pageId == 13) {
                this.$parent.deleteLuckFlash(row.id, 5, 2); //活动管理=>限时抢购
            } else if (this.pageId == 14) {
                this.$parent.deleteLuckFlash(row.id, 8, 2); //活动管理=>企业活动
            }
        },
        // 删除 回调函数
        DeletDataFuncyion(row) {
            if (this.pageId == 0) {
                this.$parent.deletData(row.id); //商品
            } else if (this.pageId == 1) {
                this.$parent.DaletDataForOlder(row.orderId); //订单
            } else if (this.pageId == 3) {
                this.$parent.DeletrentalData(row.id); //租房
            } else if (this.pageId == 4) {
                this.$parent.DeletDataforRecruit(row.id); //招聘
            } else if (this.pageId == 5) {
                this.$parent.DeletDataforVideo(row.id, 4); //视频
            } else if (this.pageId == 6) {
                this.$parent.opportunitymgDelet(row.id); //商机
            } else if (this.pageId == 7) {
                this.$parent.deleDataForcoup(row.id, 1, 3); //活动管理=>优惠券
            } else if (this.pageId == 8) {
                this.$parent.deleDataGroupbuy(row.id, 6, 3); //活动管理=>同城团购
            } else if (this.pageId == 9) {
                this.$parent.deleDataForseckill(row.id, 4, 3); //活动管理=>秒杀活动
            } else if (this.pageId == 10) {
                this.$parent.deleDataFodiscount(row.id, 0, 3); //活动管理=>折扣专区
            } else if (this.pageId == 11) {
                this.$parent.deleDatasite(row.id, 2, 3); //活动管理=>清仓处理
            } else if (this.pageId == 12) {
                this.$parent.deleteLuckDraw(row.id, 3, 3); //活动管理=>抽奖
            } else if (this.pageId == 13) {
                this.$parent.deleteLuckFlash(row.id, 5, 3); //活动管理=>限时抢购
            } else if (this.pageId == 14) {
                this.$parent.deleteLuckFlash(row.id, 8, 3); //活动管理=>企业活动
            } else if (this.pageId == 15) {
                this.$parent.deletDatagraphicNews(row.id); //动态管理=>图文动态
            } else if (this.pageId == 16) {
                this.$parent.deletDataArticleNews(row.id); //动态管理=>文章动态
            } else if (this.pageId == 17) {
                this.$parent.deletIndustryData(row.id); //行业
            } else if (this.pageId == 19) {
                this.$parent.DeletData(row.id); //千里马
            } else if (this.pageId == 20) {
                const iddata = [row.id].join(',');
                this.$parent.DeletDataBtn(iddata); //平台公告
            }
        },
        // 选中是的Change事件
        xiaoyuerChangeData(data) {
            if (this.pageId == 0) {
                // 商品
                let idArr = [];
                data.forEach((val, index) => {
                    idArr[index] = val.id;
                });
                this.idArr = idArr.join(',');
            } else if (this.pageId == 1) {
                // 订单
                let idArr = [];
                data.forEach((val, index) => {
                    idArr[index] = val.orderId;
                });
                this.idArr = idArr.join(',');
            } else if (this.pageId == 3) {
                // 租房
                let idArr = [];
                data.forEach((val, index) => {
                    idArr[index] = val.id;
                });
                this.idArr = idArr;
            } else if (this.pageId == 4) {
                // 招聘
                let idArr = [];
                data.forEach((val, index) => {
                    idArr[index] = val.id;
                });
                this.idArr = idArr;
            } else if (this.pageId == 5) {
                // 视频
                let idArr = [];
                data.forEach((val, index) => {
                    idArr[index] = val.id;
                });
                this.idArr = idArr;
            } else if (this.pageId == 6) {
                // 商机
                let idArr = [];
                data.forEach((val, index) => {
                    idArr[index] = val.id;
                });
                this.idArr = idArr.join(',');
            } else if (this.pageId == 7) {
                // 活动管理=>优惠券
                let idArr = [];
                data.forEach((val, index) => {
                    idArr[index] = val.id;
                });
                this.idArr = idArr;
            } else if (this.pageId == 8) {
                // 活动管理=>同城
                let idArr = [];
                data.forEach((val, index) => {
                    idArr[index] = val.id;
                });
                this.idArr = idArr;
            } else if (this.pageId == 9) {
                // 活动管理=>秒杀
                let idArr = [];
                data.forEach((val, index) => {
                    idArr[index] = val.id;
                });
                this.idArr = idArr;
            } else if (this.pageId == 10) {
                // 活动管理=>折扣
                let idArr = [];
                data.forEach((val, index) => {
                    idArr[index] = val.id;
                });
                this.idArr = idArr;
            } else if (this.pageId == 11) {
                // 活动管理=>清仓
                let idArr = [];
                data.forEach((val, index) => {
                    idArr[index] = val.id;
                });
                this.idArr = idArr;
            } else if (this.pageId == 12) {
                // 活动管理=>抽奖
                let idArr = [];
                data.forEach((val, index) => {
                    idArr[index] = val.id;
                });
                this.idArr = idArr;
            } else if (this.pageId == 13) {
                // 活动管理=>限时
                let idArr = [];
                data.forEach((val, index) => {
                    idArr[index] = val.id;
                });
                this.idArr = idArr;
            } else if (this.pageId == 14) {
                // 活动管理=>企业
                let idArr = [];
                data.forEach((val, index) => {
                    idArr[index] = val.id;
                });
                this.idArr = idArr;
            } else if (this.pageId == 15) {
                // 动态管理=>图文动态
                let idArr = [];
                data.forEach((val, index) => {
                    idArr[index] = val.id;
                });
                this.idArr = idArr;
            } else if (this.pageId == 16) {
                // 动态管理=>文章动态
                let idArr = [];
                data.forEach((val, index) => {
                    idArr[index] = val.id;
                });
                this.idArr = idArr;
            } else if (this.pageId == 19) {
                // 千里马人员管理
                let idArr = [];
                data.forEach((val, index) => {
                    idArr[index] = val.id;
                });
                this.idArr = idArr;
            } else if (this.pageId == 20) {
                // 平台管理
                let idArr = [];
                data.forEach((val, index) => {
                    idArr[index] = val.id;
                });
                this.idArr = idArr;
            }
        },
        // 批量删除
        BatchDeleteData(idDatar) {
            if (this.pageId == 0) {
                // 商品
                idDatar = this.idArr;
                this.$parent.BatchDelete(idDatar);
            } else if (this.pageId == 1) {
                // 订单
                idDatar = this.idArr;
                this.$parent.BatchDeleteForOrder(idDatar);
            } else if (this.pageId == 3) {
                // 租房
                idDatar = this.idArr;
                this.$parent.BatchDeleteForRental(idDatar);
            } else if (this.pageId == 4) {
                // 招聘
                idDatar = this.idArr;
                this.$parent.BatchDeleteForrecruitt(idDatar);
            } else if (this.pageId == 5) {
                // 视频
                idDatar = this.idArr;
                this.$parent.BatchDeleteForvideo(idDatar);
            } else if (this.pageId == 6) {
                // 商机
                idDatar = this.idArr;
                this.$parent.BatchDeleteForoppo(idDatar);
            } else if (this.pageId == 7) {
                // 活动管理=>优惠券
                idDatar = this.idArr;
                this.$parent.BatchDeleteForcoup(idDatar, 1);
            } else if (this.pageId == 8) {
                // 活动管理=>同城
                idDatar = this.idArr;
                this.$parent.BatchDeleteForcoup(idDatar, 6);
            } else if (this.pageId == 9) {
                // 活动管理=>秒杀
                idDatar = this.idArr;
                this.$parent.BatchDeleteForcoup(idDatar, 4);
            } else if (this.pageId == 10) {
                // 活动管理=>折扣
                idDatar = this.idArr;
                this.$parent.BatchDeleteForcoup(idDatar, 0);
            } else if (this.pageId == 11) {
                // 活动管理=>清仓
                idDatar = this.idArr;
                this.$parent.BatchDeleteForcoup(idDatar, 2);
            } else if (this.pageId == 12) {
                // 活动管理=>抽奖
                idDatar = this.idArr;
                this.$parent.BatchDeleteForcoup(idDatar, 3);
            } else if (this.pageId == 13) {
                // 活动管理=>限时
                idDatar = this.idArr;
                this.$parent.BatchDeleteForcoup(idDatar, 5);
            } else if (this.pageId == 14) {
                // 活动管理=>企业
                idDatar = this.idArr;
                this.$parent.BatchDeleteForcoup(idDatar, 8);
            } else if (this.pageId == 15) {
                // 动态管理=>图文动态
                idDatar = this.idArr;
                this.$parent.BatchDeleteForcoup(idDatar);
            } else if (this.pageId == 16) {
                // 动态管理=>文章
                idDatar = this.idArr;
                this.$parent.BatchDeleteForcoup(idDatar);
            } else if (this.pageId == 19) {
                // 千里马人员管理
                idDatar = this.idArr;
                this.$parent.DeletData(idDatar);
            } else if (this.pageId == 20) {
                // 平台管理
                idDatar = this.idArr;
                this.$parent.BatchDeleteData(idDatar);
            }
        },
        // 添加人员
        AddNewPeople() {
            if (this.pageId == 19) {
                this.$router.push({
                    path: '/addPeople'
                });
            }
        },
        // 全选与取消 回调函数
        handleSelectAll(status) {
            this.$refs.selection.selectAll(status);
        },
        //查看公告按钮
        toviewannoun(row) {
            if (this.pageId == 20) {
                this.$router.push({
                    path: '/viewannoun',
                    query: {
                        id: row.id
                    }
                });
            }
        },
        // 添加行业
        AddIndustry() {
            if (this.pageId == 17) {
                this.$parent.AddIndustryAction();
            }
        },
        //详情-----btn
        RouteDetailsPage(row) {
            if (this.pageId == 0) {
                //使用缓存中的页面ID
                this.$router.push({
                    //商品列表页
                    path: './detailspage',
                    query: {
                        id: row.id
                    }
                });
            } else if (this.pageId == 1) {
                //订单列表页
                this.$router.push({
                    path: './viewdetails',
                    query: {
                        id: row.orderId
                    }
                });
            } else if (this.pageId == 2) {
                //财务列表页
            } else if (this.pageId == 3) {
                //租房列表页
                this.$router.push({
                    path: './details-page-two',
                    query: {
                        id: row.id
                    }
                });
            } else if (this.pageId == 4) {
                //招聘列表页
                this.$router.push({
                    path: './recruitdetails',
                    query: {
                        id: row.id
                    }
                });
            } else if (this.pageId == 5) {
                //视频列表页
                console.log(row);
                this.$router.push({
                    path: './videodetail',
                    query: {
                        data: row
                    }
                });
            } else if (this.pageId == 6) {
                //商机列表页
                this.$router.push({
                    path: './oppodetailpage',
                    query: {
                        id: row.id
                    }
                });
            } else if (this.pageId == 7) {
                //活动管理----优惠券管理
                this.$router.push({
                    path: './Event-detai-page',
                    query: {
                        Data: row
                    }
                });
            } else if (this.pageId == 8) {
                //活动管理----团购管理
                this.$router.push({
                    path: './Group-detai-page'
                });
            } else if (this.pageId == 9) {
                //活动管理----秒杀管理
                this.$router.push({
                    path: './seckill-detai-page',
                    query: {
                        Data: row
                    }
                });
            } else if (this.pageId == 10) {
                //活动管理----折扣专区
                this.$router.push({
                    path: './Dis-detai-page',
                    query: {
                        Data: row
                    }
                });
            } else if (this.pageId == 11) {
                //活动管理----清仓处理
                this.$router.push({
                    path: './sit-detai-page',
                    query: {
                        Data: row
                    }
                });
            } else if (this.pageId == 12) {
                //活动管理----抽奖管理
                this.$router.push({
                    path: './luck-detai-page',
                    query: {
                        Data: row
                    }
                });
            } else if (this.pageId == 13) {
                //活动管理----限时抢购
                this.$router.push({
                    path: './flash-detai-page',
                    query: {
                        Data: row
                    }
                });
            } else if (this.pageId == 14) {
                //活动管理----企业活动管理
                this.$router.push({
                    path: './ent-detai-page',
                    query: {
                        Data: row
                    }
                });
            } else if (this.pageId == 15) {
                //动态管理----图文动态
                this.$router.push({
                    path: './Gr-detai-page',
                    query: {
                        id: row.id
                    }
                });
            } else if (this.pageId == 16) {
                //动态管理----文章动态
                this.$router.push({
                    path: './Ar-detai-page',
                    query: {
                        id: row.id
                    }
                });
            }
        },
        // 修改----btn
        SendDataToFunction() {
            // 行业管理----修改
            if (this.pageId == 17) {
                this.$emit('adminiDataA');
            } else if (this.pageId == 21) {
                //行业管理----管理
                this.$emit('adminiDataB');
            }
        },
        //管理------btn
        toAdministration(row) {
            if (this.pageId == 17) {
                //  行业管理
                this.$router.push({
                    path: './administration',
                    query: {
                        id: row.id
                    }
                });
            } else if (this.pageId == 18) {
                //  广告管理
                this.$router.push({
                    path: '/adver',
                    query: {
                        row: row
                    }
                });
            } else if (this.pageId == 19) {
                //  千里马人员管理
                this.$router.push({
                    path: './personalinfor',
                    query: {
                        Data: row
                    }
                });
            }
        },
        // 重置密码
        resetPasswordXiaoyuer(row) {
            if (this.pageId == 19) {
                this.$parent.ModalXiaoyuer(row.id);
            }
        },
        // 页面渲染
        PageRenderingFunction() {
            localStorage.setItem('pageId', this.pageid[0].pageid);
            this.pageId = localStorage.getItem('pageId');
            if (this.pageid[0].pageid == 0) {
                //商品列表页
                this.pageid.shift();
                var aaa = this.pageid.pop();
                this.columns12 = this.pageid;
                if (this.Datar0 == undefined) {
                    alert('喔，NO，Bady，数据丢失了！');
                } else if (this.Datar0[0].name == '暂无数据！') {
                    this.data6 = [];
                } else if (this.Datar0 != undefined && this.statusCode == 200) {
                    this.data6 = this.Datar0;
                }
            } else if (this.pageid[0].pageid == 1) {
                //订单列表页
                this.pageid.shift();
                var bbb = this.pageid.pop();
                this.columns12 = this.pageid;
                this.isShowIfShow = !this.isShowIfShow; //table-Btn
                if (this.Datar1 == undefined) {
                    alert('喔，NO，Bady，数据丢失了！');
                } else if (this.Datar1[0].name == '暂无数据！') {
                    this.data6 = [];
                } else if (this.Datar1 != undefined && this.statusCode == 200) {
                    this.data6 = this.Datar1;
                }
            } else if (this.pageid[0].pageid == 2) {
                //财务列表页
                this.pageid.shift();
                var bbb = this.pageid.pop();
                this.columns12 = this.pageid;
                if (this.Datar2 == undefined) {
                    alert('喔，NO，Bady，数据丢失了！');
                } else if (this.Datar2[0].name == '暂无数据！') {
                    this.data6 = [];
                } else if (this.Datar2 != undefined && this.statusCode == 200) {
                    this.data6 = this.Datar2;
                }
                this.BtnDataiShhow1 = !this.BtnDataiShhow1;
                this.isShowIfShow = !this.isShowIfShow; //table-Btn
                this.isShowIfShow02 = !this.isShowIfShow02; //table-Btn
            } else if (this.pageid[0].pageid == 3) {
                //租房列表页
                this.pageid.shift();
                var bbb = this.pageid.pop();
                this.columns12 = this.pageid;
                // this.data6.push(bbb)
                if (this.Datar3 == undefined) {
                    alert('喔，NO，Bady，数据丢失了！');
                } else if (this.Datar3[0].name == '暂无数据！') {
                    this.data6 = [];
                } else if (this.Datar3 != undefined && this.statusCode == 200) {
                    this.data6 = this.Datar3;
                }
            } else if (this.pageid[0].pageid == 4) {
                //招聘列表页
                this.pageid.shift();
                var bbb = this.pageid.pop();
                this.columns12 = this.pageid;
                // this.data6.push(bbb)
                if (this.Datar4 == undefined) {
                    alert('喔，NO，Bady，数据丢失了！');
                } else if (this.Datar4[0].name == '暂无数据！') {
                    this.data6 = [];
                } else if (this.Datar4 != undefined && this.statusCode == 200) {
                    this.data6 = this.Datar4;
                }
            } else if (this.pageid[0].pageid == 5) {
                //视频列表页
                this.pageid.shift();
                var bbb = this.pageid.pop();
                this.columns12 = this.pageid;
                // this.data6.push(bbb)
                if (this.Datar5 == undefined) {
                    alert('喔，NO，Bady，数据丢失了！');
                } else if (this.Datar5[0].name == '暂无数据！') {
                    this.data6 = [];
                } else if (this.Datar5 != undefined && this.statusCode == 200) {
                    this.data6 = this.Datar5;
                }
            } else if (this.pageid[0].pageid == 6) {
                //商机列表页
                this.pageid.shift();
                var bbb = this.pageid.pop();
                this.columns12 = this.pageid;
                this.isShowIfShow = !this.isShowIfShow; //table-Btn
                if (this.Datar6 == undefined) {
                    alert('喔，NO，Bady，数据丢失了！');
                } else if (this.Datar6[0].name == '暂无数据！') {
                    this.data6 = [];
                } else if (this.Datar6 != undefined && this.statusCode == 200) {
                    this.data6 = this.Datar6;
                }
            } else if (this.pageid[0].pageid == 7) {
                //活动管理----优惠券管理
                this.pageid.shift();
                var bbb = this.pageid.pop();
                this.columns12 = this.pageid;
                if (this.Datar7 == undefined) {
                    alert('喔，NO，Bady，数据丢失了！');
                } else if (this.Datar7[0].name == '暂无数据！') {
                    this.data6 = [];
                } else if (this.Datar7 != undefined && this.statusCode == 200) {
                    this.data6 = this.Datar7;
                }
            } else if (this.pageid[0].pageid == 8) {
                //活动管理----团购管理
                this.pageid.shift();
                var bbb = this.pageid.pop();
                this.columns12 = this.pageid;
                if (this.Datar8 == undefined) {
                    alert('喔，NO，Bady，数据丢失了！');
                } else if (this.Datar8[0].name == '暂无数据！') {
                    this.data6 = [];
                } else if (this.Datar8 != undefined && this.statusCode == 200) {
                    this.data6 = this.Datar8;
                }
            } else if (this.pageid[0].pageid == 9) {
                //活动管理----秒杀管理
                this.pageid.shift();
                var bbb = this.pageid.pop();
                this.columns12 = this.pageid;
                if (this.Datar9 == undefined) {
                    alert('喔，NO，Bady，数据丢失了！');
                } else if (this.Datar9[0].name == '暂无数据！') {
                    this.data6 = [];
                } else if (this.Datar9 != undefined && this.statusCode == 200) {
                    this.data6 = this.Datar9;
                }
            } else if (this.pageid[0].pageid == 10) {
                //活动管理----折扣专区
                this.pageid.shift();
                var bbb = this.pageid.pop();
                this.columns12 = this.pageid;
                if (this.Datar10 == undefined) {
                    alert('喔，NO，Bady，数据丢失了！');
                } else if (this.Datar10[0].name == '暂无数据！') {
                    this.data6 = [];
                } else if (this.Datar10 != undefined && this.statusCode == 200) {
                    this.data6 = this.Datar10;
                }
            } else if (this.pageid[0].pageid == 11) {
                //活动管理----清仓处理
                this.pageid.shift();
                var bbb = this.pageid.pop();
                this.columns12 = this.pageid;
                if (this.Datar11 == undefined) {
                    alert('喔，NO，Bady，数据丢失了！');
                } else if (this.Datar11[0].name == '暂无数据！') {
                    this.data6 = [];
                } else if (this.Datar11 != undefined && this.statusCode == 200) {
                    this.data6 = this.Datar11;
                }
            } else if (this.pageid[0].pageid == 12) {
                //活动管理----抽奖管理
                this.pageid.shift();
                var bbb = this.pageid.pop();
                this.columns12 = this.pageid;
                if (this.Datar12 == undefined) {
                    alert('喔，NO，Bady，数据丢失了！');
                } else if (this.Datar12[0].name == '暂无数据！') {
                    this.data6 = [];
                } else if (this.Datar12 != undefined && this.statusCode == 200) {
                    this.data6 = this.Datar12;
                }
            } else if (this.pageid[0].pageid == 13) {
                //活动管理----限时抢购
                this.pageid.shift();
                var bbb = this.pageid.pop();
                this.columns12 = this.pageid;
                this.isShowIfShow09 = !this.isShowIfShow09;
                if (this.Datar13 == undefined) {
                    alert('喔，NO，Bady，数据丢失了！');
                } else if (this.Datar13[0].name == '暂无数据！') {
                    this.data6 = [];
                } else if (this.Datar13 != undefined && this.statusCode == 200) {
                    this.data6 = this.Datar13;
                }
            } else if (this.pageid[0].pageid == 14) {
                //活动管理----企业活动
                this.pageid.shift();
                var bbb = this.pageid.pop();
                this.columns12 = this.pageid;
                if (this.Datar14 == undefined) {
                    alert('喔，NO，Bady，数据丢失了！');
                } else if (this.Datar14[0].name == '暂无数据！') {
                    this.data6 = [];
                } else if (this.Datar14 != undefined && this.statusCode == 200) {
                    this.data6 = this.Datar14;
                }
            } else if (this.pageid[0].pageid == 15) {
                //动态管理----图文动态
                this.pageid.shift();
                var bbb = this.pageid.pop();
                this.columns12 = this.pageid;
                this.isShowIfShow = !this.isShowIfShow; //table-Btn
                if (this.Datar15 == undefined) {
                    alert('喔，NO，Bady，数据丢失了！');
                } else if (this.Datar15[0].name == '暂无数据！') {
                    this.data6 = [];
                } else if (this.Datar15 != undefined && this.statusCode == 200) {
                    this.data6 = this.Datar15;
                }
            } else if (this.pageid[0].pageid == 16) {
                //动态管理----文章动态
                this.pageid.shift();
                var bbb = this.pageid.pop();
                this.columns12 = this.pageid;
                this.isShowIfShow = !this.isShowIfShow; //table-Btn
                if (this.Datar16 == undefined) {
                    alert('喔，NO，数据丢失了！');
                } else if (this.Datar16[0].name == '暂无数据！') {
                    this.data6 = [];
                } else if (this.Datar16 != undefined && this.statusCode == 200) {
                    this.data6 = this.Datar16;
                }
            } else if (this.pageid[0].pageid == 17) {
                // 行业管理
                this.pageid.shift();
                var bbb = this.pageid.pop();
                this.columns12 = this.pageid;
                this.isShowIfShow = !this.isShowIfShow; //table-Btn
                this.isShowIfShow02 = !this.isShowIfShow02; //table-Btn
                this.isShowIfShow03 = !this.isShowIfShow03; //table-Btn
                this.isShowIfShow04 = !this.isShowIfShow04; //table-Btn
                this.isShowIfShow05 = !this.isShowIfShow05; //table-Btn
                this.BtnDataiShhow1 = !this.BtnDataiShhow1; //TOP---Btn
                this.BtnDataiShhow2 = !this.BtnDataiShhow2; //TOP---Btn
                if (this.Datar17 == undefined) {
                    alert('喔，NO，数据丢失了！');
                } else if (this.Datar17[0].name == '暂无数据！') {
                    this.data6 = [];
                } else if (this.Datar17 != undefined && this.statusCode == 200) {
                    this.data6 = this.Datar17;
                }
            } else if (this.pageid[0].pageid == 18) {
                // 广告管理
                this.pageid.shift();
                var bbb = this.pageid.pop();
                this.columns12 = this.pageid;
                this.isShowIfShow = !this.isShowIfShow; //table-Btn
                this.isShowIfShow02 = !this.isShowIfShow02; //table-Btn
                this.BtnDataiShhow1 = !this.BtnDataiShhow1; //TOP---Btn
                this.isShowIfShow04 = !this.isShowIfShow04;
                this.isShowIfShow09 = !this.isShowIfShow09;
                if (this.Datar18 == undefined) {
                    alert('喔，NO，数据丢失了！');
                } else if (this.Datar18[0].name == '暂无数据！') {
                    this.data6 = [];
                } else if (this.Datar18 != undefined && this.statusCode == 200) {
                    this.data6 = this.Datar18;
                }
            } else if (this.pageid[0].pageid == 19) {
                //共享千里马----人员管理
                this.pageid.shift();
                var bbb = this.pageid.pop();
                this.columns12 = this.pageid;
                this.BtnDataiShhow3 = !this.BtnDataiShhow3; //TOP---Btn
                this.isShowIfShow02 = !this.isShowIfShow02; //table-Btn
                this.isShowIfShow07 = !this.isShowIfShow07; //table-Btn
                this.isShowIfShow04 = !this.isShowIfShow04;
                this.isShowIfShow08 = !this.isShowIfShow08; //table-Btn
                this.isShowIfShow = !this.isShowIfShow; //table-Btn
                if (this.Datar19 == undefined) {
                    alert('喔，NO，数据丢失了！');
                } else if (this.Datar19[0].name == '暂无数据！') {
                    this.data6 = [];
                } else if (this.Datar19 != undefined && this.statusCode == 200) {
                    this.data6 = this.Datar19;
                }
            } else if (this.pageid[0].pageid == 20) {
                console.log(this.Datar20);
                //平台管理----人员管理
                this.pageid.shift();
                var bbb = this.pageid.pop();
                this.columns12 = this.pageid;
                this.isShowIfShow = !this.isShowIfShow; //table-Btn
                this.isShowIfShow02 = !this.isShowIfShow02; //table-Btn
                this.isShowIfShow06 = !this.isShowIfShow06; //table-Btn
                this.BtnDataiShhow4 = !this.BtnDataiShhow4; //TOP---Btn
                if (this.Datar20 == undefined) {
                    alert('喔，NO，数据丢失了！');
                } else if (this.Datar20[0].name == '暂无数据！') {
                    this.data6 = [];
                } else if (this.Datar20 != undefined && this.statusCode == 200) {
                    this.data6 = this.Datar20;
                }
            } else if (this.pageid[0].pageid == 21) {
                // 行业管理 =>按钮=>管理
                this.pageid.shift();
                var bbb = this.pageid.pop();
                this.columns12 = this.pageid;
                if (this.Datar21 == undefined) {
                    alert('喔，NO，数据丢失了！');
                } else if (this.Datar21[0].name == '暂无数据！') {
                    this.data6 = [];
                } else if (this.Datar21 != undefined && this.statusCode == 200) {
                    this.data6 = this.Datar21;
                }
                this.isShowIfShow = !this.isShowIfShow; //table-Btn
                this.isShowIfShow02 = !this.isShowIfShow02; //table-Btn
                this.isShowIfShow05 = !this.isShowIfShow05; //table-Btn
                this.BtnDataiShhow1 = !this.BtnDataiShhow1; //TOP---Btn
                this.BtnDataiShhow2 = !this.BtnDataiShhow2; //TOP---Btn
            }
        }
    }
};
</script>

<style scope>
.table_css_xiaoyuer {
    box-sizing: border-box;
}
.Button {
    border-radius: 20px;
    margin-right: 5px;
    border: 0;
}
.bottokm {
    background-color: #2450d2;
    font-size: 12px;
    padding: 0px 15px;
}
.bottokmt {
    font-size: 12px;
    background-color: #ff8d00;
    padding: 0px 15px;
}
.bottomred {
    background-color: #ff0000;
    font-size: 12px;
    padding: 0px 15px;
}
.vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;
}
.ivu-modal {
    top: 0;
}
.table_css_xiaoyuer-div {
    display: flex;
    justify-content: flex-end;
    margin: 20px 0px 5px 0px;
}
</style>