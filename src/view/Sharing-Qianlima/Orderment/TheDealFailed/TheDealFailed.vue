<template>
    <div>
        <!-- 交易失败 -->
        <div class="SearchBox">
            <HeadSearchBar></HeadSearchBar>
        </div>
        <div class="xiaouyertyer">
            <forhaveInHand :DataInProgress3="DataInProgress3" :checker="checker"></forhaveInHand>
        </div>
        <div class="xiaouyerty">
            <forUnpaidPage :assemblyData2="assemblyData2" :check="check"></forUnpaidPage>
        </div>
        <div class="xiaoyuerClssa">
            <fenPage></fenPage>
        </div>
    </div>
</template>

<script>
import forhaveInHand from '../conponents/forhaveInHand.vue';
import forUnpaidPage from '../conponents/forUnpaidPage.vue';
import HeadSearchBar from '../conponents/HeadSearchBar.vue';
import fenPage from '../../../Expandfunction/components/fenPage.vue';
export default {
    data() {
        return {
            check: 2,
            assemblyData2: [
                {
                    OrderNumber: 'ASD126345AAA',
                    imgSrc: 'imgSrc',
                    xyName: '搞成林',
                    job: '管理员',
                    company: '万疆烽火信有限公司',
                    pricefa: '成交价：',
                    price: '300￥',
                    ask: '订单要求',
                    sign2: [
                        {
                            count: '完成10张美食图，一张门头图片优化，同意后方可结束'
                        },
                        {
                            count: '完成10张美食图，一张门头图片优化，同意后方可结束'
                        },
                        {
                            count: '完成10张美食图，一张门头图片优化，同意后方可结束'
                        }
                    ],
                    sign3: [
                        {
                            title: '图片任务',
                            NumShets: '10张'
                        },
                        {
                            title: '视频任务',
                            NumShets: '10个'
                        },
                        {
                            title: '文档任务',
                            NumShets: '10篇'
                        }
                    ],
                    ordreTitle: '订单任务时间：',
                    orderTime: '2020.12.20',
                    TmTime1: '24:00',
                    TmTime2: '12:00',
                    surplus: '剩余两个小时交易自动关闭！',
                    CreationTime: ' 订单创建时间：2020.12.12',
                    TMdata: '24:00',
                    BtnData: '删除'
                },
                {
                    OrderNumber: 'ASD126345AAA',
                    imgSrc: 'imgSrc',
                    xyName: '搞成林',
                    job: '管理员',
                    company: '万疆烽火信有限公司',
                    pricefa: '成交价：',
                    price: '300￥',
                    ask: '订单要求',
                    sign2: [
                        {
                            count: '完成10张美食图，一张门头图片优化，同意后方可结束'
                        },
                        {
                            count: '完成10张美食图，一张门头图片优化，同意后方可结束'
                        },
                        {
                            count: '完成10张美食图，一张门头图片优化，同意后方可结束'
                        }
                    ],
                    sign3: [
                        {
                            title: '图片任务',
                            NumShets: '10张'
                        },
                        {
                            title: '视频任务',
                            NumShets: '10个'
                        },
                        {
                            title: '文档任务',
                            NumShets: '10篇'
                        }
                    ],
                    ordreTitle: '订单任务时间：',
                    orderTime: '2020.12.20',
                    TmTime1: '24:00',
                    TmTime2: '12:00',
                    surplus: '剩余两个小时交易自动关闭！',
                    CreationTime: ' 订单创建时间：2020.12.12',
                    TMdata: '24:00',
                    BtnData: '删除'
                }
            ],
            checker: 3,
            DataInProgress3: [
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
                            percentage: '100%',
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
                    BtnData: '删除'
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
                    BtnData: '删除'
                }
            ]
        };
    },
    components: {
        forhaveInHand,
        forUnpaidPage,
        HeadSearchBar,
        fenPage
    }
};
</script>

<style scope>
.xiaouyertyer {
    margin: 10px 0;
}
.xiaouyerty {
    margin: 10px 0;
}
.SearchBox {
    display: flex;
    padding-top: 10px;
    margin-top: 10px;
    padding-top: 30px;
}
</style>