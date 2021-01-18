<template>
    <div class="table_css_xiaoyuer">
        <div style="display:flex; justify-content: flex-end; margin:20px 0px 5px 0px;">
            <!-- TOP---Btn -->
            <Button type="error" style="margin-left:15px;" v-if="BtnDataiShhow1">批量删除</Button>
            <Button type="primary" style="margin-left:15px;" v-if="BtnDataiShhow2">添加行业</Button>
            <Button type="success" style="margin-left:15px;" v-if="BtnDataiShhow3">添加人员</Button>
            <Button type="primary" style="margin-left:15px;" v-if="BtnDataiShhow4">发布新公告</Button>
        </div>
        <Table border ref="selection" :columns="columns12" :data="data6">
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
                    @click="toviewannoun"
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
                    @click="show(index)"
                    v-if="isShowIfShow"
                >下架</Button>
                <Button
                    type="error"
                    size="small"
                    class="Button bottomred"
                    @click="remove(index)"
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
        // 数据接收器
        'pageid',
        'Datar0',
        'Datar1',
        'Datar3',
        'Datar4',
        'Datar5',
        'Datar6',
        'Datar7',
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
            BtnDataiShhow4: false
            // value to Fa
            // TransVvalue:{},
        };
    },
    methods: {
        // 下架 回调函数
        show(index) {
            /*
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
                */
        },
        // 删除 回调函数
        remove(index) {
            this.data6.splice(index, 1);
        },
        /*
            // 全选与取消 回调函数
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            },
            */
        toviewannoun() {
            //查看公告按钮
            this.$router.push({
                path: '/viewannoun'
            });
        },
        RouteDetailsPage(row) {
            //详情-----btn
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
        SendDataToFunction() {
            //Btn----行业管理----修改
            if (this.pageId == 17) {
                this.$emit('adminiDataA');
            } else if (this.pageId == 21) {
                this.$emit('adminiDataB');
            }
        },
        toAdministration(row) {
            //管理------btn
            if (this.pageId == 17) {
                //  Btn----行业管理
                this.$router.push({
                    path: './administration'
                });
            } else if (this.pageId == 18) {
                //  Btn----活动管理----广告管理
                this.$router.push({
                    path: './adver'
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
        }
    },
    mounted() {
        localStorage.setItem('pageId', this.pageid[0].pageid);
        this.pageId = localStorage.getItem('pageId'); //将缓存中的页面ID放入Data中

        if (this.pageid[0].pageid == 0) {
            //商品列表页
            this.pageid.shift();
            var aaa = this.pageid.pop();
            this.columns12 = this.pageid;
            // this.data6.push(aaa);
            if (this.Datar0 == undefined) {
                alert('喔，NO，Bady，数据丢失了！');
            } else {
                var DataAjax0 = [];
                this.Datar0.forEach(function (val, index) {
                    DataAjax0[index] = val;
                    // DataAjax0[index].dataTanle = val.order;
                    DataAjax0[index].col1 = val.name;
                    DataAjax0[index].col2 = val.companyName;
                    DataAjax0[index].col3 = val.userName;
                    DataAjax0[index].col4 = val.price;
                    DataAjax0[index].col5 = val.pic;
                    if (val.publishStatus == 0) {
                        val.publishStatus = '下架';
                    } else if (val.publishStatus == 1) {
                        val.publishStatus = '上架';
                    }
                    DataAjax0[index].col6 = val.publishStatus;
                    var date = new Date(val.createTime);
                    var time1 =
                        date.getFullYear() +
                        '-' +
                        (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                        '-' +
                        date.getDate();
                    DataAjax0[index].col7 = time1;
                });
                this.data6 = DataAjax0;
                console.log(DataAjax0);
            }
        } else if (this.pageid[0].pageid == 1) {
            //订单列表页
            this.pageid.shift();
            var bbb = this.pageid.pop();
            this.columns12 = this.pageid;
            this.isShowIfShow = !this.isShowIfShow; //table-Btn
            // this.data6.push(bbb)
            if (this.Datar1 == undefined) {
                alert('喔，NO，Bady，数据丢失了！');
            } else {
                var DataAjax1 = [];
                this.Datar1.forEach(function (val, index) {
                    DataAjax1[index] = val;
                    // DataAjax1[index].dataTanle = val.;
                    DataAjax1[index].col1 = val.orderSn;
                    DataAjax1[index].col2 = val.userName;
                    DataAjax1[index].col3 = val.companyName;
                    DataAjax1[index].col4 = val.orderSource;
                    if (val.payType == 0) {
                        val.payType = '未支付';
                    } else if (val.payType == 1) {
                        val.payType = '支付宝';
                    } else if (val.payType == 2) {
                        val.payType = '微信';
                    }
                    DataAjax1[index].col5 = val.payType;
                    if (val.status == 0) {
                        val.status = '待付款';
                    } else if (val.status == 1) {
                        val.status = '待发货';
                    } else if (val.status == 2) {
                        val.status = '已发货';
                    } else if (val.status == 3) {
                        val.status = '已完成';
                    } else if (val.status == 4) {
                        val.status = '已关闭';
                    } else if (val.status == 5) {
                        val.status = '无效订单';
                    }
                    DataAjax1[index].col6 = val.status;
                    DataAjax1[index].col7 = val.payAmount;
                    var date = new Date(val.createTime);
                    var time1 =
                        date.getFullYear() +
                        '-' +
                        (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                        '-' +
                        date.getDate();
                    DataAjax1[index].col8 = time1;
                });
                this.data6 = DataAjax1;
            }
        } else if (this.pageid[0].pageid == 2) {
            //财务列表页
            this.pageid.shift();
            var bbb = this.pageid.pop();
            this.columns12 = this.pageid;
            for (var i = 0; i < 10; i++) {
                this.data6.push(bbb);
            }
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
            } else {
                var DataAjax3 = [];
                this.Datar3.forEach(function (val, index) {
                    DataAjax3[index] = val;
                    DataAjax3[index].dataTanle = val.order;
                    DataAjax3[index].col1 = val.houseTitle;
                    DataAjax3[index].col2 = val.userCompanyDTO.company.name;
                    DataAjax3[index].col3 = val.publisher;
                    DataAjax3[index].col4 = val.typeName;
                    if (val.status == 2) {
                        val.status = '上架';
                    } else if (val.status == 3) {
                        val.status = '下架';
                    }
                    DataAjax3[index].col5 = val.status;
                    var date = new Date(val.createTime);
                    var time1 =
                        date.getFullYear() +
                        '-' +
                        (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                        '-' +
                        date.getDate();
                    DataAjax3[index].col6 = time1;
                });
                this.data6 = DataAjax3;
            }
        } else if (this.pageid[0].pageid == 4) {
            //招聘列表页
            this.pageid.shift();
            var bbb = this.pageid.pop();
            this.columns12 = this.pageid;
            // this.data6.push(bbb)
            if (this.Datar4 == undefined) {
                alert('喔，NO，Bady，数据丢失了！');
            } else {
                var DataAjax4 = [];
                this.Datar4.forEach(function (val, index) {
                    DataAjax4[index] = val;
                    DataAjax4[index].dataTanle = val.jobName;
                    DataAjax4[index].col1 = val.companyName;
                    DataAjax4[index].col2 = val.contact;
                    DataAjax4[index].col3 = val.positionType;
                    DataAjax4[index].col4 = val.industryName;
                    if (val.status == 2) {
                        val.status = '上架';
                    } else if (val.status == 3) {
                        val.status = '下架';
                    }
                    DataAjax4[index].col5 = val.status;
                    var date = new Date(val.publishDate);
                    var time1 =
                        date.getFullYear() +
                        '-' +
                        (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                        '-' +
                        date.getDate();
                    DataAjax4[index].col6 = time1;
                });
                this.data6 = DataAjax4;
            }
        } else if (this.pageid[0].pageid == 5) {
            //视频列表页
            this.pageid.shift();
            var bbb = this.pageid.pop();
            this.columns12 = this.pageid;
            // this.data6.push(bbb)
            if (this.Datar5 == undefined) {
                alert('喔，NO，Bady，数据丢失了！');
            } else {
                var DataAjax5 = [];
                this.Datar5.forEach(function (val, index) {
                    DataAjax5[index] = val;
                    DataAjax5[index].dataTanle = val.title;
                    DataAjax5[index].col1 = val.companyName;
                    DataAjax5[index].col2 = val.publisher;
                    DataAjax5[index].col3 = val.productInfo.name; //关联商品名称
                    if (val.status == 2) {
                        val.status = '上架';
                    } else if (val.status == 3) {
                        val.status = '下架';
                    }
                    DataAjax5[index].col4 = val.status;
                    var date = new Date(val.publishAtTime);
                    var time1 =
                        date.getFullYear() +
                        '-' +
                        (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                        '-' +
                        date.getDate();
                    DataAjax5[index].col5 = time1;
                });
                this.data6 = DataAjax5;
            }
        } else if (this.pageid[0].pageid == 6) {
            //商机列表页
            this.pageid.shift();
            var bbb = this.pageid.pop();
            this.columns12 = this.pageid;
            this.isShowIfShow = !this.isShowIfShow; //table-Btn
            // this.data6.push(bbb)
            if (this.Datar6 == undefined) {
                alert('喔，NO，Bady，数据丢失了！');
            } else {
                var DataAjax6 = [];
                this.Datar6.forEach(function (val, index) {
                    DataAjax6[index] = val;
                    DataAjax6[index].dataTanle = val.title;
                    DataAjax6[index].col1 = val.companyName; //发布企业
                    DataAjax6[index].col2 = val.username;
                    DataAjax6[index].col3 = val.address;
                    DataAjax6[index].col4 = val.type;

                    var date = new Date(val.createTime);
                    var time1 =
                        date.getFullYear() +
                        '-' +
                        (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                        '-' +
                        date.getDate();
                    DataAjax6[index].col5 = time1;
                });
                this.data6 = DataAjax6;
            }
        } else if (this.pageid[0].pageid == 7) {
            //活动管理----优惠券管理
            this.pageid.shift();
            var bbb = this.pageid.pop();
            this.columns12 = this.pageid;
            // this.data6.push(bbb)
            if (this.Datar7 == undefined) {
                alert('喔，NO，Bady，数据丢失了！');
            } else {
                var DataAjax7 = [];
                this.Datar7.forEach(function (val, index) {
                    DataAjax7[index] = val;
                    DataAjax7[index].dataTanle = val.order;
                    DataAjax7[index].col1 = val.activityTitle;
                    DataAjax7[index].col2 = val.companyName;
                    DataAjax7[index].col3 = val.publisher;
                    DataAjax7[index].col4 = val.countReceived;
                    DataAjax7[index].col5 = val.countUsed;
                    DataAjax7[index].col6 = val.couponName;
                    var date = new Date(val.startTime);
                    var time1 =
                        date.getFullYear() +
                        '-' +
                        (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                        '-' +
                        date.getDate();
                    var date1 = new Date(val.endTime);
                    var time2 =
                        date1.getFullYear() +
                        '-' +
                        (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() + 1) +
                        '-' +
                        date1.getDate();
                    DataAjax7[index].col7 = time1 + '——' + time2;
                });
                this.data6 = DataAjax7;
            }
        } else if (this.pageid[0].pageid == 8) {
            //活动管理----团购管理
            this.pageid.shift();
            var bbb = this.pageid.pop();
            this.columns12 = this.pageid;
            for (var i = 0; i < 10; i++) {
                this.data6.push(bbb);
            }
        } else if (this.pageid[0].pageid == 9) {
            //活动管理----秒杀管理
            this.pageid.shift();
            var bbb = this.pageid.pop();
            this.columns12 = this.pageid;
            // this.data6.push(bbb)
            if (this.Datar9 == undefined) {
                alert('喔，NO，Bady，数据丢失了！');
            } else {
                var DataAjax9 = [];
                this.Datar9.forEach(function (val, index) {
                    DataAjax9[index] = val;
                    DataAjax9[index].dataTanle = val.order;
                    DataAjax9[index].col1 = val.title;
                    DataAjax9[index].col2 = val.companyName;
                    DataAjax9[index].col3 = val.publisher;
                    DataAjax9[index].col4 = val.countSale;
                    DataAjax9[index].col5 = val.activityPrice;
                    DataAjax9[index].col6 = val.productId;
                    var date = new Date(val.startTime);
                    var time1 =
                        date.getFullYear() +
                        '-' +
                        (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                        '-' +
                        date.getDate();
                    var date1 = new Date(val.endTime);
                    var time2 =
                        date1.getFullYear() +
                        '-' +
                        (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() + 1) +
                        '-' +
                        date1.getDate();
                    DataAjax9[index].col7 = time1 + '——' + time2;
                });
                this.data6 = DataAjax9;
            }
        } else if (this.pageid[0].pageid == 10) {
            //活动管理----折扣专区
            this.pageid.shift();
            var bbb = this.pageid.pop();
            this.columns12 = this.pageid;
            // this.data6.push(bbb)
            if (this.Datar10 == undefined) {
                alert('喔，NO，Bady，数据丢失了！');
            } else {
                var DataAjax10 = [];
                this.Datar10.forEach(function (val, index) {
                    DataAjax10[index] = val;
                    DataAjax10[index].dataTanle = val.order;
                    DataAjax10[index].col1 = val.activityTitle;
                    DataAjax10[index].col2 = val.companyName;
                    DataAjax10[index].col3 = val.publishUser;
                    DataAjax10[index].col4 = val.discount;
                    DataAjax10[index].col5 = val.countSale;
                    DataAjax10[index].col6 = val.activityPrice;
                    DataAjax10[index].col7 = val.productId;
                    var date = new Date(val.startTime);
                    var time1 =
                        date.getFullYear() +
                        '-' +
                        (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                        '-' +
                        date.getDate();
                    var date1 = new Date(val.endTime);
                    var time2 =
                        date1.getFullYear() +
                        '-' +
                        (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() + 1) +
                        '-' +
                        date1.getDate();
                    DataAjax10[index].col8 = time1 + '——' + time2;
                });
                this.data6 = DataAjax10;
            }
        } else if (this.pageid[0].pageid == 11) {
            //活动管理----清仓处理
            this.pageid.shift();
            var bbb = this.pageid.pop();
            this.columns12 = this.pageid;
            // this.data6.push(bbb)
            if (this.Datar11 == undefined) {
                alert('喔，NO，Bady，数据丢失了！');
            } else {
                var DataAjax11 = [];
                this.Datar11.forEach((val, index) => {
                    DataAjax11[index] = val;
                    DataAjax11[index].dataTanle = val.order;
                    DataAjax11[index].col2 = val.companyName;
                    DataAjax11[index].col3 = val.publishUser;
                    DataAjax11[index].col4 = val.productDTOList.length + ' ' + '个';
                    var date = new Date(val.startTime);
                    var time1 =
                        date.getFullYear() +
                        '-' +
                        (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                        '-' +
                        date.getDate();
                    var date1 = new Date(val.endTime);
                    var time2 =
                        date1.getFullYear() +
                        '-' +
                        (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() + 1) +
                        '-' +
                        date1.getDate();
                    var date2 = new Date(val.publishTime);
                    var time3 =
                        date2.getFullYear() +
                        '-' +
                        (date2.getMonth() + 1 < 10 ? '0' + (date2.getMonth() + 1) : date2.getMonth() + 1) +
                        '-' +
                        date2.getDate();
                    DataAjax11[index].col1 = time3;
                    DataAjax11[index].col5 = time1 + '——' + time2;
                });
                this.data6 = DataAjax11;
            }
        } else if (this.pageid[0].pageid == 12) {
            //活动管理----抽奖管理
            this.pageid.shift();
            var bbb = this.pageid.pop();
            this.columns12 = this.pageid;
            // this.data6.push(bbb)
            if (this.Datar12 == undefined) {
                alert('喔，NO，Bady，数据丢失了！');
            } else {
                var DataAjax12 = [];
                this.Datar12.forEach((val, index) => {
                    DataAjax12[index] = val;
                    DataAjax12[index].dataTanle = val.order;
                    DataAjax12[index].col1 = val.title;
                    DataAjax12[index].col2 = val.companyName;
                    DataAjax12[index].col3 = val.publisher;
                    DataAjax12[index].col4 = val.chanceNumPerDay;
                    DataAjax12[index].col5 = val.winRate;
                    DataAjax12[index].col6 = val.countPrizeNum;
                    var date = new Date(val.startTime);
                    var time1 =
                        date.getFullYear() +
                        '-' +
                        (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                        '-' +
                        date.getDate();
                    var date1 = new Date(val.endTime);
                    var time2 =
                        date1.getFullYear() +
                        '-' +
                        (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() + 1) +
                        '-' +
                        date1.getDate();
                    DataAjax12[index].col7 = time1 + '——' + time2;
                });
                this.data6 = DataAjax12;
            }
        } else if (this.pageid[0].pageid == 13) {
            //活动管理----限时抢购
            this.pageid.shift();
            var bbb = this.pageid.pop();
            this.columns12 = this.pageid;
            this.isShowIfShow09 = !this.isShowIfShow09;
            // this.data6.push(bbb)
            if (this.Datar13 == undefined) {
                alert('喔，NO，Bady，数据丢失了！');
            } else {
                var DataAjax13 = [];
                this.Datar13.forEach((val, index) => {
                    DataAjax13[index] = val;
                    DataAjax13[index].dataTanle = val.order;
                    DataAjax13[index].col1 = val.publishUser;
                    DataAjax13[index].col2 = val.countSale;
                    DataAjax13[index].col3 = val.activityPrice;
                    DataAjax13[index].col4 = val.productId;
                    var date = new Date(val.startTime);
                    var time1 =
                        date.getFullYear() +
                        '-' +
                        (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                        '-' +
                        date.getDate();
                    var date1 = new Date(val.endTime);
                    var time2 =
                        date1.getFullYear() +
                        '-' +
                        (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() + 1) +
                        '-' +
                        date1.getDate();
                    DataAjax13[index].col5 = time1 + '——' + time2;
                });
                this.data6 = DataAjax13;
            }
        } else if (this.pageid[0].pageid == 14) {
            //活动管理----企业活动
            this.pageid.shift();
            var bbb = this.pageid.pop();
            this.columns12 = this.pageid;
            // this.data6.push(bbb)
            if (this.Datar14 == undefined) {
                alert('喔，NO，Bady，数据丢失了！');
            } else {
                var DataAjax14 = [];
                this.Datar14.forEach(function (val, index) {
                    DataAjax14[index] = val;
                    DataAjax14[index].dataTanle = val.order;
                    DataAjax14[index].col1 = val.title;
                    DataAjax14[index].col2 = val.companyName;
                    DataAjax14[index].col3 = val.createByUser;
                    var date = new Date(val.createTime);
                    var time1 =
                        date.getFullYear() +
                        '-' +
                        (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                        '-' +
                        date.getDate();
                    DataAjax14[index].col4 = time1;
                });
                this.data6 = DataAjax14;
            }
        } else if (this.pageid[0].pageid == 15) {
            //动态管理----图文动态
            this.pageid.shift();
            var bbb = this.pageid.pop();
            this.columns12 = this.pageid;
            this.isShowIfShow = !this.isShowIfShow; //table-Btn
            // this.data6.push(bbb)
            if (this.Datar15 == undefined) {
                alert('喔，NO，Bady，数据丢失了！');
            } else {
                var DataAjax15 = [];
                this.Datar15.forEach(function (val, index) {
                    DataAjax15[index] = val;
                    // DataAjax15[index].dataTanle = val.;
                    DataAjax15[index].col1 = val.details;
                    // DataAjax15[index].col2 = val.; // 发布企业
                    DataAjax15[index].col3 = val.pushName;
                    if (val.type == 1) {
                        val.type = '文章动态';
                    } else if (val.type == 2) {
                        val.type = '图文动态';
                    }
                    DataAjax15[index].col4 = val.type;
                    var date = new Date(val.pushTime);
                    var time1 =
                        date.getFullYear() +
                        '-' +
                        (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                        '-' +
                        date.getDate();
                    DataAjax15[index].col5 = time1;
                });
                this.data6 = DataAjax15;
            }
        } else if (this.pageid[0].pageid == 16) {
            //动态管理----文章动态
            this.pageid.shift();
            var bbb = this.pageid.pop();
            this.columns12 = this.pageid;
            this.isShowIfShow = !this.isShowIfShow; //table-Btn
            // this.data6.push(bbb)
            if (this.Datar16 == undefined) {
                alert('喔，NO，数据丢失了！');
            } else {
                var DataAjax16 = [];
                this.Datar16.forEach(function (val, index) {
                    DataAjax16[index] = val;
                    // DataAjax16[index].dataTanle = val.;
                    DataAjax16[index].col1 = val.details;
                    // DataAjax16[index].col2 = val.;     // 发布企业
                    DataAjax16[index].col3 = val.pushName;
                    if (val.type == 0) {
                        val.type = '普通动态';
                    } else if (val.type == 1) {
                        val.type = '官方动态';
                    }
                    DataAjax16[index].col4 = val.type;

                    var date = new Date(val.pushTime);
                    var time1 =
                        date.getFullYear() +
                        '-' +
                        (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                        '-' +
                        date.getDate();
                    DataAjax16[index].col5 = time1;
                });
                this.data6 = DataAjax16;
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
            // this.data6.push(bbb)
            if (this.Datar17 == undefined) {
                alert('喔，NO，数据丢失了！');
            } else {
                var DataAjax17 = [];
                this.Datar17.forEach(function (val, index) {
                    DataAjax17[index] = val;
                    // DataAjax17[index].dataTanle = val.;
                    DataAjax17[index].col1 = val.name;
                    DataAjax17[index].col2 = val.remark;
                });
                this.data6 = DataAjax17;
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
            // this.data6.push(bbb)
            if (this.Datar18 == undefined) {
                alert('喔，NO，数据丢失了！');
            } else {
                var DataAjax18 = [];
                this.Datar18.forEach(function (val, index) {
                    DataAjax18[index] = val;
                    DataAjax18[index].dataTanle = val.id;
                    DataAjax18[index].col1 = val.note;
                    DataAjax18[index].col2 = val.name;
                    if (val.location == 0) {
                        val.location = '首页轮播图';
                    } else if (val.location == 1) {
                        val.location = '优惠券广告';
                    } else if (val.location == 2) {
                        val.location = '折扣专区广告';
                    } else if (val.location == 3) {
                        val.location = '清仓处理广告';
                    } else if (val.location == 4) {
                        val.location = '抽奖广告';
                    } else if (val.location == 5) {
                        val.location = '秒杀广告';
                    } else if (val.location == 6) {
                        val.location = '同城团购广告';
                    } else if (val.location == 7) {
                        val.location = '限时抢购广告';
                    }
                    DataAjax18[index].col3 = val.location;
                    DataAjax18[index].col4 = val.image;
                });
                this.data6 = DataAjax18;
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
            // this.data6.push(bbb)
            if (this.Datar19 == undefined) {
                alert('喔，NO，数据丢失了！');
            } else {
                var DataAjax19 = [];
                this.Datar19.forEach(function (val, index) {
                    DataAjax19[index] = val;
                    // DataAjax19[index].dataTanle = val.;
                    DataAjax19[index].col1 = val.userName;
                    DataAjax19[index].col2 = val.career;
                    DataAjax19[index].col3 = val.phoneNumber;
                    DataAjax19[index].col4 = val.userAccount;
                    DataAjax19[index].col5 = val.orderNum;
                    DataAjax19[index].col6 = val.sidelineTypeName;
                    var date = new Date(val.loginTime);
                    var time1 =
                        date.getFullYear() +
                        '-' +
                        (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                        '-' +
                        date.getDate();
                    DataAjax19[index].col7 = time1;
                    var date1 = new Date(val.createTime);
                    var time2 =
                        date.getFullYear() +
                        '-' +
                        (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() + 1) +
                        '-' +
                        date1.getDate();
                    DataAjax19[index].col8 = time2;
                    if (val.businessStatus == 0) {
                        val.businessStatus = '关闭';
                    } else if (val.businessStatus == 1) {
                        val.businessStatus = '开放';
                    }
                    DataAjax19[index].col9 = val.businessStatus;
                });
                this.data6 = DataAjax19;
            }
        } else if (this.pageid[0].pageid == 20) {
            //平台管理----人员管理
            this.pageid.shift();
            var bbb = this.pageid.pop();
            this.columns12 = this.pageid;
            this.isShowIfShow = !this.isShowIfShow; //table-Btn
            this.isShowIfShow02 = !this.isShowIfShow02; //table-Btn
            this.isShowIfShow06 = !this.isShowIfShow06; //table-Btn
            this.BtnDataiShhow4 = !this.BtnDataiShhow4; //TOP---Btn
            for (var i = 0; i < 10; i++) {
                this.data6.push(bbb);
            }
            console.log(this.Datar20);
        } else if (this.pageid[0].pageid == 21) {
            // 行业管理 =>按钮=>管理
            this.pageid.shift();
            var bbb = this.pageid.pop();
            this.columns12 = this.pageid;
            for (var i = 0; i < 10; i++) {
                this.data6.push(bbb);
            }
            this.isShowIfShow = !this.isShowIfShow; //table-Btn
            this.isShowIfShow02 = !this.isShowIfShow02; //table-Btn
            this.isShowIfShow05 = !this.isShowIfShow05; //table-Btn
            this.BtnDataiShhow1 = !this.BtnDataiShhow1; //TOP---Btn
            this.BtnDataiShhow2 = !this.BtnDataiShhow2; //TOP---Btn
        }
    },
    created() {}
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
</style>



通过给 columns 数据设置一项，指定 type: 'selection'，即可自动开启多选功能。
给 data 项设置特殊 key _checked: true 可以默认选中当前项。
给 data 项设置特殊 key _disabled: true 可以禁止选择当前项。
正确使用好以下事件，可以达到需要的效果：
@on-select，选中某一项触发，返回值为 selection 和 row，分别为已选项和刚选择的项。
@on-select-all，点击全选时触发，返回值为 selection，已选项。
@on-selection-change，只要选中项发生变化时就会触发，返回值为 selection，已选项。
