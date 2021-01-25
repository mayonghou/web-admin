<template>
    <div>
        <div class="xiaouyerty">
            <!-- 进行中 -->
            <div class="SearchBox">
                <HeadSearchBar></HeadSearchBar>
            </div>
            <forhaveInHand :DataInProgress1="DataInProgress1" :checker="checker"></forhaveInHand>
            <div class="xiaoyuerClssa">
                <fenPage></fenPage>
            </div>
        </div>
    </div>
</template>

<script>
import forhaveInHand from '../conponents/forhaveInHand.vue';
import HeadSearchBar from '../conponents/HeadSearchBar.vue';
import fenPage from '../../../Expandfunction/components/fenPage.vue';
export default {
    data() {
        return {
            checker: 1,
            DataInProgress1: [
                {
                    OrderNumber: 'ASD126345AAA',
                    imgUrl: 'imgUrl',
                    manNane: '搞成林',
                    job: '管理员',
                    company: '网疆烽火有限公司',
                    TransactionPrice: '成交价：',
                    Price: '3000￥',
                    OrderTitle: '订单要求',
                    NewcoutOrder: [
                        {
                            coutOrder: '完成10张美食图，一张门头图片优化，同意后方可结束'
                        },
                        {
                            coutOrder: '完成10张美食图，一张门头图片优化，同意后方可结束'
                        },
                        {
                            coutOrder: '完成10张美食图，一张门头图片优化，同意后方可结束'
                        }
                    ],
                    OrderNum: '订单内容及数量：',
                    taskTypeer: [
                        {
                            taskType: '图片任务',
                            percentage: '25%',
                            updownLod: '已上传5张',
                            inTotal: '共100张'
                        },
                        {
                            taskType: '视频任务',
                            percentage: '40%',
                            updownLod: '已上传5张',
                            inTotal: '共100张'
                        },
                        {
                            taskType: '文档任务',
                            percentage: '100%',
                            updownLod: '已上传5张',
                            inTotal: '共100张'
                        }
                    ],
                    taskTime: '订单任务时间：2020.12.30',
                    Time1: '24:00',
                    Time2: '2020.05.15',
                    Time3: '24:00',
                    AutoClose: '剩余两个小时交易自动关闭！',
                    creatTime: '订单创建时间：2020.12.12',
                    Time4: '24:00',
                    delay: '发起延期申请，延期时间：3天',
                    Unprocessed: '卖家未处理',
                    BtnData: '关闭订单'
                },
                {
                    OrderNumber: 'ASD126345AAA',
                    imgUrl: 'imgUrl',
                    manNane: '搞成林',
                    job: '管理员',
                    company: '网疆烽火有限公司',
                    TransactionPrice: '成交价：',
                    Price: '3000￥',
                    OrderTitle: '订单要求',
                    NewcoutOrder: [
                        {
                            coutOrder: '完成10张美食图，一张门头图片优化，同意后方可结束'
                        },
                        {
                            coutOrder: '完成10张美食图，一张门头图片优化，同意后方可结束'
                        },
                        {
                            coutOrder: '完成10张美食图，一张门头图片优化，同意后方可结束'
                        }
                    ],
                    OrderNum: '订单内容及数量：',
                    taskTypeer: [
                        {
                            taskType: '图片任务',
                            percentage: '60%',
                            updownLod: '已上传5张',
                            inTotal: '共100张'
                        },
                        {
                            taskType: '视频任务',
                            percentage: '80%',
                            updownLod: '已上传5张',
                            inTotal: '共100张'
                        },
                        {
                            taskType: '文档任务',
                            percentage: '100%',
                            updownLod: '已上传5张',
                            inTotal: '共100张'
                        }
                    ],
                    taskTime: '订单任务时间：2020.12.30',
                    Time1: '24:00',
                    Time2: '2020.05.15',
                    Time3: '24:00',
                    AutoClose: '剩余两个小时交易自动关闭！',
                    creatTime: '订单创建时间：2020.12.12',
                    Time4: '24:00',
                    delay: '发起延期申请，延期时间：3天',
                    Unprocessed: '卖家未处理',
                    BtnData: '关闭订单'
                }
            ]
        };
    },
    components: {
        forhaveInHand,
        HeadSearchBar,
        fenPage
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