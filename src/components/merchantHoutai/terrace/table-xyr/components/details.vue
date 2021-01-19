<template>
    <div class="xiaoyuer-encapsulation">
        <h3 class="h3">订单详情</h3>
        <div class="countCss">
            <h3 class="h32">基本信息</h3>
            <detaila
                :dataData1="dataData1"
                :listData1="listData1"
                :dataData2="dataData2"
                :listData2="listData2"
            ></detaila>
        </div>
        <div class="countCss">
            <h3 class="h33">收货信息</h3>
            <detailb :dataXyr1="dataXyr1" :dataXyr2="dataXyr2"></detailb>
        </div>
        <div class="countCss">
            <h3 class="h33">商品信息</h3>
            <detailc :Dataxiao="Dataxiao" :modeData="modeData"></detailc>
        </div>
        <div class="countCss">
            <h3 class="h33">特殊商品</h3>
            <detaild :datadetd1="datadetd1" :datadetd2="datadetd2"></detaild>
        </div>
        <div class="countCss">
            <h3 class="h33">费用信息</h3>
            <detaile></detaile>
        </div>
    </div>
</template>

<script>
import detaila from '../components/details/detaila.vue';
import detailb from '../components/details/detailb.vue';
import detailc from '../components/details/detailc.vue';
import detaild from '../components/details/detaild.vue';
import detaile from '../components/details/detaile.vue';
export default {
    data() {
        return {
            // detaila
            dataData1: [
                {
                    name: '订单编号'
                },
                {
                    name: '客户姓名'
                },
                {
                    name: '订单金额'
                },
                {
                    name: '客服姓名'
                },
                {
                    name: '订单类型'
                }
            ],
            listData1: [
                {
                    coler1: '123456',
                    coler2: '小虞儿',
                    coler3: '￥30000',
                    coler4: '大虞儿',
                    coler5: '物流'
                }
            ],
            dataData2: [
                {
                    name: '支付方式'
                },
                {
                    name: '订单状态'
                },
                {
                    name: '创建时间'
                },
                {
                    name: '发货单号'
                },
                {
                    name: '活动时间'
                }
            ],
            listData2: [
                {
                    coler1: '12345',
                    coler2: '小虞儿',
                    coler3: '￥30000',
                    coler4: '大虞儿',
                    coler5: '物流'
                }
            ],
            // detailb
            dataXyr1: [
                {
                    name: '收货人'
                },
                {
                    name: '手机号'
                },
                {
                    name: '收货地址'
                }
            ],
            dataXyr2: [
                {
                    vlaue1: '小虞儿',
                    vlaue2: '13145678923',
                    vlaue3: '贵州'
                }
            ],
            // detailc
            Dataxiao: [
                {
                    name: '序号',
                    key: 'ValData1',
                    value: ''
                },
                {
                    name: '商品图片',
                    key: 'ValData2',
                    value: ''
                },
                {
                    name: '商品名称',
                    key: 'ValData3',
                    value: ''
                },
                {
                    name: '关联活动',
                    key: 'ValData4',
                    value: ''
                },
                {
                    name: '原价',
                    key: 'ValData5',
                    value: ''
                },
                {
                    name: '活动价',
                    key: 'ValData6',
                    value: ''
                },
                {
                    name: '属性',
                    key: 'ValData7',
                    value: ''
                },
                {
                    name: '数量',
                    key: 'ValData8',
                    value: ''
                },
                {
                    name: '小计',
                    key: 'ValData9',
                    value: ''
                }
            ],
            modeData: [
                {
                    ValData1: 'a',
                    ValData2: 'imgUrl',
                    ValData3: '冬装',
                    ValData4: '折扣优惠',
                    ValData5: '￥500',
                    ValData6: '￥300',
                    ValData7: '韩版',
                    ValData8: '3',
                    ValData9: '￥800'
                },
                {
                    ValData1: 'a',
                    ValData2: 'imgUrl',
                    ValData3: '冬装',
                    ValData4: '折扣优惠',
                    ValData5: '￥500',
                    ValData6: '￥300',
                    ValData7: '韩版',
                    ValData8: '3',
                    ValData9: '￥800'
                },
                {
                    ValData1: 'a',
                    ValData2: 'imgUrl',
                    ValData3: '冬装',
                    ValData4: '折扣优惠',
                    ValData5: '￥500',
                    ValData6: '￥300',
                    ValData7: '韩版',
                    ValData8: '3',
                    ValData9: '￥800'
                }
            ],
            // detaild
            datadetd1: [
                {
                    name: '商品名',
                    key: 'delData1'
                },
                {
                    name: '价格',
                    key: 'delData2'
                },
                {
                    name: '所属代言企业',
                    key: 'delData3'
                }
            ],
            datadetd2: [
                {
                    delData1: '扫地机器人',
                    delData2: '￥1000',
                    delData3: '万疆烽火'
                }
            ]
            // detaile
        };
    },
    components: {
        detaila,
        detailb,
        detailc,
        detaild,
        detaile
    }
};
</script>

<style scoped>
.xiaoyuer-encapsulation {
    padding: 20px;
}
.h3 {
    padding: 20px 0 0px 0;
}
.h32 {
    padding: 20px 0px;
}
.countCss {
    padding: 0px 40px;
}
.h33 {
    margin-top: 20px;
    padding: 20px 0px;
}
</style>
