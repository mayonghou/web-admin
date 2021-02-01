<template>
    <div>
        <div class="xiaouyerty">
            <!-- 进行中 -->
            <div class="SearchBox">
                <HeadSearchBar :check="check"></HeadSearchBar>
            </div>
            <forhaveInHand :DataInProgress1="DataInProgress1" :check="check"></forhaveInHand>
            <div class="xiaoyuerClssa">
                <Page
                    :total="total"
                    :page-size="limit"
                    :page-size-opts="[10,20,30,40]"
                    @on-change="PageChanges"
                    @on-page-size-change="TotalChanges"
                    size="small"
                    show-total
                    show-elevator
                    show-sizer
                    class-name="ClassName"
                />
            </div>
        </div>
        <Modal v-model="modal1" title="删除订单" @on-ok="ok" @on-cancel="cancel">
            <Form :model="formItem" :label-width="130" style="padding:10px;">
                <FormItem label="输入删除订单理由">
                    <Input
                        v-model="formItem.input"
                        type="textarea"
                        maxlength="15"
                        show-word-limit
                        placeholder="请输入删除订单理由"
                    />
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import forhaveInHand from '../conponents/forUnpaidPage.vue';
import HeadSearchBar from '../conponents/HeadSearchBar.vue';
export default {
    data() {
        return {
            check: 3,
            total: 0,
            limit: 10,
            page: 1,
            modal1: false,
            DataInProgress1: [],
            companyName: '',
            sidelineUserName: '',
            timeEnd: '',
            timeStart: '',
            dataitem: '',
            formItem: {
                input: ''
            }
        };
    },
    components: {
        forhaveInHand,
        HeadSearchBar
    },
    mounted() {
        this.getorderFail();
    },
    methods: {
        // 关闭订单
        closeOrder(item) {
            this.dataitem = item;
            this.modal1 = true;
        },
        ok() {
            let datas = {
                orderId: parseInt(this.dataitem.id),
                note: this.formItem.input,
                status: -1,
                userId: parseInt(this.dataitem.sidelineUserId)
            };
            this.$axios.post('admin/sideline/order/update_status', datas).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'success'
                        });
                        this.getorderweifukuan();
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
        cancel() {},
        // 页码改变的回调，返回改变后的页码
        PageChanges(val) {
            this.page = val;
            this.getorderFail();
        },
        // limit
        TotalChanges(val) {
            this.limit = val;
            this.getorderFail();
        },
        // 查询调用的接口
        getData(datas) {
            this.companyName = datas.companyName;
            this.sidelineUserName = datas.sidelineUserName;
            this.timeEnd = datas.timeStart;
            this.timeStart = datas.timeStart;
            this.getorderFail();
        },
        // 查询数据
        getorderFail() {
            let datas = {
                companyName: this.companyName,
                limit: this.limit,
                page: this.page,
                sidelineUserName: this.sidelineUserName,
                status: 1,
                timeEnd: this.timeEnd || 0,
                timeStart: this.timeStart || 0
            };
            this.$axios.post('admin/sideline/order/list', datas).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.total = data.total;
                        let datalist = [];
                        let https = /^https:\/\/.+$/;
                        data.list.forEach(function (val, index) {
                            datalist[index] = val;
                            datalist[index].OrderNumber = val.orderNo;
                            if (val.sellerAvatar) {
                                if (https.test(val.sellerAvatar)) {
                                    datalist[index].imgSrcUrl = val.sellerAvatar;
                                } else {
                                    datalist[index].imgSrcUrl = localStorage.getItem('imgUrl') + val.sellerAvatar;
                                }
                            } else {
                                datalist[index].imgSrc = '';
                            }
                            if (val.companyCommonInfo != null) {
                                if (https.test(val.companyCommonInfo.adminAvatar)) {
                                    datalist[index].adminUrl = val.companyCommonInfo.adminAvatar;
                                } else {
                                    datalist[index].adminUrl = localStorage.getItem('imgUrl') + val.companyCommonInfo.adminAvatar;
                                }
                                datalist[index].companyName = val.companyCommonInfo.companyName;
                                datalist[index].xyName = val.companyCommonInfo.admin;
                                datalist[index].job = '管理员';
                                datalist[index].company = val.companyCommonInfo.companyName;
                            }
                            datalist[index].sign2 = val.requirements;
                            datalist[index].ask = '订单要求';
                            datalist[index].pricefa = '成交价：';
                            datalist[index].price = val.actualTotalPrice / 100 + '￥';
                            // datalist[index].sign3 = val.taskList;
                            datalist[index].ordreTitle = '订单任务时间：';
                            let date = new Date(parseInt(val.startTime));
                            let time =
                                date.getFullYear() +
                                '-' +
                                (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                                '-' +
                                date.getDate() +
                                ' ' +
                                (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
                                ':' +
                                (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
                            let date1 = new Date(parseInt(val.endTime));
                            let time1 =
                                date1.getFullYear() +
                                '-' +
                                (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() + 1) +
                                '-' +
                                date1.getDate() +
                                ' ' +
                                (date1.getHours() < 10 ? '0' + date1.getHours() : date1.getHours()) +
                                ':' +
                                (date1.getMinutes() < 10 ? '0' + date1.getMinutes() : date1.getMinutes());
                            datalist[index].orderTime = time + '——' + time1;
                            let createTime = new Date(parseInt(val.submitTime));
                            let time2 =
                                createTime.getFullYear() +
                                '-' +
                                (createTime.getMonth() + 1 < 10 ? '0' + (createTime.getMonth() + 1) : createTime.getMonth() + 1) +
                                '-' +
                                createTime.getDate() +
                                ' ' +
                                (createTime.getHours() < 10 ? '0' + createTime.getHours() : createTime.getHours()) +
                                ':' +
                                (createTime.getMinutes() < 10 ? '0' + createTime.getMinutes() : createTime.getMinutes());
                            datalist[index].CreationTime = ' 订单创建时间：' + time2;

                            let jieshuTime = new Date(parseInt(val.leftPayTime));

                            var h = jieshuTime.getHours() < 10 ? '0' + jieshuTime.getHours() + ':' : jieshuTime.getHours();
                            var m = jieshuTime.getMinutes() < 10 ? '0' + jieshuTime.getMinutes() + '' : jieshuTime.getMinutes();

                            datalist[index].surplus = val.statusNote;
                            // datalist[index].surplus = '剩余' + h + m + '个小时交易自动关闭！';
                            datalist[index].BtnData = '关闭订单';
                            datalist[index].jobName = val.sellerName;
                            datalist[index].sellerCareer = val.sellerCareer;
                            datalist[index].sign3 = val.taskList;
                            datalist[index].OrderNum = '订单内容及数量：';
                            if (val.delayApplication) {
                                datalist[index].delay = '发起延期申请，延期时间：' + val.delayApplication.days + '天';
                                if (val.delayApplication.status == 0) {
                                    datalist[index].Unprocessed = '卖家未处理';
                                } else if (val.delayApplication.status == 1) {
                                    datalist[index].Unprocessed = '买家已同意';
                                } else if (val.delayApplication.status == 2) {
                                    datalist[index].Unprocessed = '买家未处理';
                                }
                            }
                        });
                        this.$nextTick(() => {
                            this.DataInProgress1 = datalist;
                        });
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

<style scope>
.xiaouyerty {
    margin: 10px 0;
}
.SearchBox {
    display: flex;
}
.xiaoyuerClssa {
    display: flex;
    justify-content: center;
}
</style>