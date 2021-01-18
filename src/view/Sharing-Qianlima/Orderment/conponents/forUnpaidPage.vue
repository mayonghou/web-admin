<template>
    <Card>
        <div class="rootClassderty">
            <div class="xiaoyuerClass">
                <div class="xiaoyuerLeft">
                    <span class="letimgspan">
                        <!-- sign1 -->
                        <div class="imgCladdss">{{ assemblyData[0].imgSrc }}</div>
                        <!--<img src="" alt="">-->
                    </span>
                    <span class="leftcountClass">
                        <div class="paddiongset">
                            <p class="ClassPclass">
                                <span class="nameClass">{{ assemblyData[0].xyName }}</span>
                                <span>{{ assemblyData[0].job }}</span>
                            </p>
                            <p class="ClassPclass">{{ assemblyData[0].company }}</p>
                            <p class="ClassPclass">
                                <span>{{ assemblyData[0].pricefa }}</span>
                                <span class="redCLassfontsize">{{ assemblyData[0].price }}</span>
                            </p>
                        </div>
                    </span>
                    <div class="middleClass">
                        <p class="ClassPclass colorClass">{{ assemblyData[0].ask }}</p>
                        <!-- sign2 -->
                        <p
                            class="coundfClsaa"
                            v-for="(item,i) in assemblyData[1]"
                            :key="i"
                        >{{ item }}</p>
                    </div>
                </div>
                <div class="rightClasssDivxs">
                    <div class="rightClass">
                        <p class="ClassPclass teshuClass">订单内容及数量：</p>
                    </div>
                    <div class="ClassPclassdf">
                        <!-- sign3 -->
                        <p class="ClassPclass" v-for="(item,i) in assemblyData[2]" :key="i">
                            {{ item.title }}
                            <span class="teskClassstyle">{{ item.NumShets }}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="decondClassRow">
                <!-- sign4 -->
                <p>
                    {{ assemblyData[3].ordreTitle }}
                    {{ assemblyData[3].orderTime }}
                    <span>&nbsp;</span>
                    {{ assemblyData[3].TmTime1 }}
                    <span>&nbsp;</span>——
                    <span>&nbsp;</span>
                    {{ assemblyData[3].TmTime2 }}
                    <span>&nbsp;</span>12:00
                    <span class="sgengyuTimeClass">{{ assemblyData[3].surplus }}</span>
                </p>
            </div>
            <div class="decondClassRowcd">
                <p>
                    <!-- sign5 -->
                    {{ assemblyData[4].CreationTime }}
                    <span>&nbsp;</span>
                    {{ assemblyData[4].TMdata }}
                </p>
            </div>
            <div class="btnClassxiaoyuer">
                <Button type="warning">关闭订单</Button>
            </div>
        </div>
    </Card>
</template>

<script>
export default {
    data() {
        return {
            assemblyData: [
                //sign1
                {
                    imgSrc: 'imgSrc',
                    xyName: '搞成林',
                    job: '管理员',
                    company: '万疆烽火信有限公司',
                    pricefa: '成交价：',
                    price: '300￥',
                    ask: '订单要求'
                },
                //sign2
                {
                    count1: '完成10张美食图，一张门头图片优化，同意后方可结束',
                    count2: '完成10张美食图，一张门头图片优化，同意后方可结束',
                    count3: '完成10张美食图，一张门头图片优化，同意后方可结束'
                },
                //sign3
                [
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
                //sign4
                {
                    ordreTitle: '订单任务时间：',
                    orderTime: '2020.12.20',
                    TmTime1: '24:00',
                    TmTime2: '12:00',
                    surplus: '剩余两个小时交易自动关闭！'
                },
                //sign5
                {
                    CreationTime: ' 订单创建时间：2020.12.12',
                    TMdata: '24:00'
                }
            ]
        };
    }
};
</script>

<style scope>
@import './forUnpaidPage.css';
</style>