<template>
    <div>
        <Card v-for="(item,index) in DataInProgress" :key="index" class="CaedClassStyle">
            <div class="rootClassdertyxiaoyuer">
                <div>
                    <span>订单编号：</span>
                    {{ item.OrderNumber }}
                </div>
                <div class="xiaoyuerClassxiaoyuer">
                    <div class="xiaoyuerLeftxiaoyuer">
                        <span class="letimgspanxiaoyuer">
                            <div class="imgCladdssxiaoyuer">{{ item.imgUrl }}</div>
                            <!--<img src="" alt="">-->
                        </span>
                        <span class="leftcountClassxiaoyuer">
                            <div class="paddiongsetxiaoyuer">
                                <p class="ClassPclassxiaoyuer">
                                    <span class="nameClassxiaoyuer">{{ item.manNane }}</span>
                                    <span>{{ item.job }}</span>
                                </p>
                                <p class="ClassPclassxiaoyuer">{{ item.company }}</p>
                                <p class="ClassPclassxiaoyuer">
                                    <span>{{ item.TransactionPrice }}</span>
                                    <span class="redCLassfontsizexiaoyuer">{{ item.Price }}</span>
                                </p>
                            </div>
                        </span>
                        <div class="middleClassxiaoyuer">
                            <p class="ClassPclassxiaoyuer colorClassxiaoyuer">{{ item.OrderTitle }}</p>
                            <p
                                class="coundfClsaaxiaoyuer"
                                v-for="(item,i) in item.NewcoutOrder"
                                :key="i"
                            >{{ item.coutOrder }}</p>
                        </div>
                    </div>
                    <div class="rightClasssDivxsxiaoyuer">
                        <div class="rightClassxiaoyuer">
                            <p class="ClassPclassxiaoyuer teshuClassxiaoyuer">{{ item.OrderNum }}</p>
                        </div>
                        <div class="ClassPclassdfxiaoyuer">
                            <p
                                class="ClassPclassxiaoyuer"
                                v-for="(item,i) in item.taskTypeer"
                                :key="i"
                            >
                                {{ item.taskType }}
                                <span class="baifenbiClassxiaoyuer">
                                    <div class="divClassxiaoyuerxiaoyuer">
                                        <div
                                            ref="xiaoyuerSetClass"
                                            :class="i==0?'sonClassDicvxiaoyuer':i==1?'sonClassDicvxiaoyuer2':'sonClassDicvxiaoyuer3'"
                                        >{{ item.percentage }}</div>
                                    </div>
                                </span>
                                <span class="yishangchClassxiaoyuer">{{ item.updownLod }}</span>
                                <span class="teskClassstylexiaoyuer">{{ item.inTotal }}</span>
                            </p>
                            <div class="Rtnsee" v-if="iSshow">
                                <Button type="primary" size="small" @click="ViewDetailsXiyrFn">查看详情</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="AddPartTimeStaff">
                    <div class="AddPartTimeStaff-son">
                        <div class="decondClassRowxiaoyuer">
                            <p>
                                {{ item.taskTime }}
                                <span>&nbsp;</span>
                                {{ item.Time1 }}
                                <span>&nbsp;</span>——
                                <span>&nbsp;</span>
                                {{ item.Time2 }}
                                <span>&nbsp;</span>
                                {{ item.Time3 }}
                                <span
                                    class="sgengyuTimeClassxiaoyuer"
                                >{{ item.AutoClose }}</span>
                            </p>
                        </div>
                        <div class="decondClassRowcdxiaoyuer">
                            <p>
                                {{ item.creatTime }}
                                <span>&nbsp;</span>
                                {{ item.Time4 }}
                            </p>
                        </div>
                        <div class="decondClassRowcdxiaoyuer" v-if="fayqiSshow">
                            <span class="fqyqClass">{{ item.delay }}</span>
                            <span class="OrderChuli">{{ item.Unprocessed }}</span>
                        </div>
                    </div>
                    <!-- 兼职人员 -->
                    <div class="brotherClassder">
                        <div class="brotherClassderSon">
                            <div class="sonCsdlass">imgUrl</div>
                            <div class="sonCsdlass">
                                <div class="sonSonClasdfs">
                                    姓名：
                                    <span class="sonSonClasdfsSpan">小鱼儿</span>
                                </div>
                                <div class="sonSonClasdfs">
                                    职位：
                                    <span class="sonSonClasdfsSpan">攻城级别</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btnClassxiaoyuerxiaoyuer ActiverClass">
                    <Button
                        :type="item.BtnData=='查看订单详情'?'primary':item.BtnData=='删除'?'error':'warning'"
                    >{{ item.BtnData }}</Button>
                </div>
            </div>
        </Card>
    </div>
</template>

<script>
export default {
    props: [
        /**条件 */
        'checker',
        /**进行中 */
        'DataInProgress1',
        /**进行中 */
        'DataInProgress2',
        /**进行中 */
        'DataInProgress3'
    ],
    data() {
        return {
            DataInProgress: [],
            iSshow: false,
            fayqiSshow: false
        };
    },
    watch: {
        DataInProgress1: {
            //进行中
            handler(newDaTA) {
                this.DataInProgress1 = newDaTA;
            },
            deep: true,
            immediate: true
        },
        DataInProgress2: {
            //已完成
            handler(newDaTA) {
                this.DataInProgress2 = newDaTA;
            },
            deep: true,
            immediate: true
        },
        DataInProgress3: {
            //交易失败
            handler(newDaTA) {
                this.DataInProgress3 = newDaTA;
            },
            deep: true,
            immediate: true
        }
    },
    created() {
        // 页面渲染
        this.RenderPage();
    },
    mounted() {
        // 进度百分比封装
        this.ProgressPercentage();
    },
    methods: {
        // 页面渲染
        RenderPage() {
            if (this.checker == 1) {
                // 进行中
                this.DataInProgress = this.DataInProgress1;
                this.iSshow = !this.iSshow;
                this.fayqiSshow = !this.fayqiSshow;
            } else if (this.checker == 2) {
                //已完成
                this.DataInProgress = this.DataInProgress2;
            } else if (this.checker == 3) {
                // 交易失败
                this.DataInProgress = this.DataInProgress3;
            }
        },
        // 进度百分比封装
        ProgressPercentage() {
            this.$nextTick(() => {
                let Percentage = this.$refs.xiaoyuerSetClass;
                for (let i = 0; i < Percentage.length; i++) {
                    Percentage[i].style.width = Percentage[i].innerText;
                    if (Percentage[i].innerText < '40%' && Percentage[i].innerText != '100%') {
                        Percentage[i].style.width = '75%';
                        Percentage[i].style.color = 'red';
                        Percentage[i].innerText = Percentage[i].innerText + ' ' + '' + '注意！';
                        Percentage[i].setAttribute('class', '.sonClassDicvxiaoyuer4');
                    }
                }
            });
        },
        // 查看详情回调
        ViewDetailsXiyrFn() {
            this.$Message.info('进行中详情页');
            this.$router.push({
                path: './haveindetails'
            });
        }
    }
};
</script>

<style scope>
@import './forhaveInHand.css';
</style>