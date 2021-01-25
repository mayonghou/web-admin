<template>
    <div>
        <div class="xiaouyerty">
            <!-- 未付款 -->
            <div class="SearchBox">
                <HeadSearchBar :check="check" @Data="getDatas"></HeadSearchBar>
            </div>
            <forUnpaidPage :assemblyData1="assemblyData1" :check="check"></forUnpaidPage>
            <div class="xiaoyuerClssa">
                <!-- <fenPage @functionFny="functionFny01" :check="check" :total="total"></fenPage>
                -->
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
    </div>
</template>

<script>
import forUnpaidPage from '../conponents/forUnpaidPage.vue';
import HeadSearchBar from '../conponents/HeadSearchBar.vue';
// import fenPage from '../../../Expandfunction/components/fenPage.vue';
export default {
    components: {
        forUnpaidPage,
        HeadSearchBar
        // fenPage
    },
    data() {
        return {
            check: 1,
            assemblyData1: [],
            total: 0,
            limit: 10,
            page: 1,
            companyName: '',
            sidelineUserName: '',
            timeEnd: '',
            timeStart: ''
        };
    },

    mounted() {
        this.getorderweifukuan();
    },
    methods: {
        PageChanges(val) {
            this.page = val;
            this.getorderweifukuan();
        },
        TotalChanges(val) {
            this.limit = val;
            this.getorderweifukuan();
        },
        getDatas(datas) {
            this.companyName = datas.companyName;
            this.sidelineUserName = datas.sidelineUserName;
            this.timeEnd = datas.timeStart;
            this.timeStart = datas.timeStart;
            this.getorderweifukuan();
        },
        // 未付款接口
        getorderweifukuan() {
            let datas = {
                companyName: this.companyName,
                limit: this.limit,
                page: this.page,
                sidelineUserName: this.sidelineUserName,
                status: 0,
                timeEnd: this.timeEnd || 0,
                timeStart: this.timeStart || 0
            };
            this.$axios.post('admin/sideline/order/list', datas).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
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
                            datalist[index].sign2 = val.requirements;
                            datalist[index].ask = '订单要求';
                            datalist[index].pricefa = '成交价：';
                            datalist[index].price = val.actualTotalPrice / 100 + '￥';
                            datalist[index].sign3 = val.taskList;
                        });
                        this.$nextTick(() => {
                            this.assemblyData1 = datalist;
                        });
                        console.log(this.assemblyData1);
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
</style>