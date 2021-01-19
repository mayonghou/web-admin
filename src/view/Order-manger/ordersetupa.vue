<template>
    <div class="table_css_xiaoyuer">
        <div class="top-compo">
            <h4 class="spanTexttitle">查看详情</h4>
            <div class="bagroud">
                <Form :model="formRight" label-position="right" :label-width="200">
                    <FormItem label="活动订单超过：">
                        <Input v-model="formRight.input1" class="abnfg"></Input>
                        <span class="spanText">分钟为付款，订单自动关闭</span>
                    </FormItem>
                    <FormItem label="活动订单超过：" class="label-width">
                        <Input v-model="formRight.input2" class="abnfg"></Input>
                        <span class="spanText">分钟为付款，订单自动关闭</span>
                    </FormItem>
                    <FormItem label="发货后超过：" class="label-width">
                        <Input v-model="formRight.input3" class="abnfg"></Input>
                        <span class="spanText">天未确认收货，订单自动关闭</span>
                    </FormItem>
                    <FormItem label="点单完成超过：" class="label-width">
                        <Input v-model="formRight.input4" class="abnfg"></Input>
                        <span class="spanText">天自动完成交易，不能申请售后</span>
                    </FormItem>
                    <FormItem label="配送订单完成后单家超过：" class="label-width">
                        <Input v-model="formRight.input5" class="abnfg"></Input>
                        <span class="spanText">天未发货自动结束交易，付款金额原路返回给买家</span>
                    </FormItem>
                </Form>
                <div class="primaryclassxiaoyuer">
                    <Button type="primary">保存</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formRight: {
                input1: '',
                input2: '',
                input3: '',
                input4: '',
                input5: ''
            }
        };
    }
};
</script>

<style scoped>
.bagroud {
    background-color: #fafbfa;
    box-sizing: border-box;
    padding: 30px 50px;
}
.abnfg {
    width: 100px;
}
.spanTexttitle {
    padding: 20px;
    background-color: #fafbfa;
}
.spanText {
    display: inline-block;
    height: 32px;
    box-sizing: border-box;
    padding: 0 20px;
}
.primaryclassxiaoyuer {
    display: flex;
    justify-content: center;
}
.primaryclassxiaoyuer button {
    padding: 0 30px;
}
</style>