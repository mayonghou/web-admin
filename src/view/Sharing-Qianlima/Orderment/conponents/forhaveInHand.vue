<template>
    <Card>
        <div class="rootClassdertyxiaoyuer">
            <div class="xiaoyuerClassxiaoyuer">
                <div class="xiaoyuerLeftxiaoyuer">
                    <span class="letimgspanxiaoyuer">
                        <div class="imgCladdssxiaoyuer">{{ DataInProgress[0].imgUrl }}</div>
                        <!--<img src="" alt="">-->
                    </span>
                    <span class="leftcountClassxiaoyuer">
                        <div class="paddiongsetxiaoyuer">
                            <p class="ClassPclassxiaoyuer">
                                <span class="nameClassxiaoyuer">{{ DataInProgress[0].manNane }}</span>
                                <span>{{ DataInProgress[0].job }}</span>
                            </p>
                            <p class="ClassPclassxiaoyuer">{{ DataInProgress[0].company }}</p>
                            <p class="ClassPclassxiaoyuer">
                                <span>{{ DataInProgress[0].TransactionPrice }}</span>
                                <span class="redCLassfontsizexiaoyuer">{{ DataInProgress[0].Price }}</span>
                            </p>
                        </div>
                    </span>
                    <div class="middleClassxiaoyuer">
                        <p
                            class="ClassPclassxiaoyuer colorClassxiaoyuer"
                        >{{ DataInProgress[0].OrderTitle }}</p>
                        <p
                            class="coundfClsaaxiaoyuer"
                            v-for="(item,i) in  DataInProgress[1]"
                            :key="i"
                        >{{ item.coutOrder }}</p>
                    </div>
                </div>
                <div class="rightClasssDivxsxiaoyuer">
                    <div class="rightClassxiaoyuer">
                        <p
                            class="ClassPclassxiaoyuer teshuClassxiaoyuer"
                        >{{ DataInProgress[2].OrderNum }}</p>
                    </div>
                    <div class="ClassPclassdfxiaoyuer">
                        <p
                            class="ClassPclassxiaoyuer"
                            v-for="(item,i) in DataInProgress[3]"
                            :key="i"
                        >
                            {{ item.taskType }}
                            <span class="baifenbiClassxiaoyuer">
                                <div class="divClassxiaoyuerxiaoyuer">
                                    <div class="sonClassDicvxiaoyuer">{{ item.percentage }}</div>
                                </div>
                            </span>
                            <span class="yishangchClassxiaoyuer">{{ item.updownLod }}</span>
                            <span class="teskClassstylexiaoyuer">{{ item.inTotal }}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="decondClassRowxiaoyuer">
                <p>
                    {{ DataInProgress[4].taskTime }}
                    <span>&nbsp;</span>
                    {{ DataInProgress[4].Time1 }}
                    <span>&nbsp;</span>——
                    <span>&nbsp;</span>
                    {{ DataInProgress[4].Time2 }}
                    <span>&nbsp;</span>
                    {{ DataInProgress[4].Time3 }}
                    <span
                        class="sgengyuTimeClassxiaoyuer"
                    >{{ DataInProgress[4].AutoClose }}</span>
                </p>
            </div>
            <div class="decondClassRowcdxiaoyuer">
                <p>
                    {{ DataInProgress[4].creatTime }}
                    <span>&nbsp;</span>
                    {{ DataInProgress[4].Time4 }}
                </p>
            </div>
            <div class="btnClassxiaoyuerxiaoyuer">
                <Button type="warning">关闭订单</Button>
            </div>
        </div>
    </Card>
</template>

<script>
export default {
    data() {
        return {
            DataInProgress: [
                {
                    imgUrl: 'imgUrl',
                    manNane: '搞成林',
                    job: '管理员',
                    company: '网疆烽火有限公司',
                    TransactionPrice: '成交价：',
                    Price: '3000￥',
                    OrderTitle: '订单要求'
                },
                [
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
                {
                    OrderNum: '订单内容及数量：'
                },
                [
                    {
                        taskType: '图片任务',
                        percentage: '20%',
                        updownLod: '已上传5张',
                        inTotal: '共100张'
                    },
                    {
                        taskType: '视频任务',
                        percentage: '20%',
                        updownLod: '已上传5张',
                        inTotal: '共100张'
                    },
                    {
                        taskType: '文档任务',
                        percentage: '20%',
                        updownLod: '已上传5张',
                        inTotal: '共100张'
                    }
                ],
                {
                    taskTime: '订单任务时间：2020.12.30',
                    Time1: '24:00',
                    Time2: '2020.05.15',
                    Time3: '24:00',
                    AutoClose: '剩余两个小时交易自动关闭！',
                    creatTime: '订单创建时间：2020.12.12',
                    Time4: '24:00'
                }
            ]
        };
    }
};
</script>

<style scope>
@import './forhaveInHand.css';
</style>