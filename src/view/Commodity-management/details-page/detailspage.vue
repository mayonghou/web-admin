<template>
    <div class="table_css_xiaoyuer">
        <h4 class="ckspxq_tile">查看商品详情</h4>
        <div class="Commodity-details">
            <Form :model="formLeft" label-position="right" :label-width="150" :label-colon="true" :disabled="true" >
                <FormItem label="封面" class="marginTop">
                    <Avatar :src="this.formLeft.input1" shape="square" icon="ios-person" size="100" style="margin-left:40px;" />
                </FormItem>
                <FormItem label="商品视频" class="marginTop">
                    <Avatar :src="this.formLeft.input2" shape="square" icon="ios-person" size="100" style="margin-left:40px;" />
                </FormItem>
                <FormItem label="商品名称" class="marginTop02">
                    <p class="marginleft">{{ this.formLeft.input3 }}</p>
                </FormItem>
                 <FormItem label="商品主图）" class="marginTop">
                     <p style="margin-left:40px; color:#A4A4A4; ">(轮播图展示)</p>
                    <Avatar :src="this.formLeft.input4" shape="square" icon="ios-person" size="100" style="margin-left:40px; margin-top:15px; " />
                    <Avatar :src="this.formLeft.input5" shape="square" icon="ios-person" size="100" style="margin-left:40px; margin-top:15px; " />
                    <Avatar :src="this.formLeft.input6" shape="square" icon="ios-person" size="100" style="margin-left:40px; margin-top:15px; " />
                    <Avatar :src="this.formLeft.input7" shape="square" icon="ios-person" size="100" style="margin-left:40px; margin-top:15px; " />
                </FormItem>
                <FormItem label="商品详情" class="marginTop02">
                    <p>{{ this.formLeft.input8 }}</p>
                    <div class="dataImg-large">
                        <Avatar :src="this.formLeft.input9" shape="square" icon="ios-person" size="300" style="margin-left:40px; margin-top:15px;" />
                    </div>
                </FormItem>
                <FormItem label="商品库存" class="marginTop02">
                    <p class="marginLeft02">{{ this.formLeft.input10 }}</p>
                </FormItem>
                <FormItem label="库存预警值" class="marginTop02">
                    <p class="marginLeft02">{{ this.formLeft.input11 }}</p>
                </FormItem>
                <FormItem label="商品售价" class="marginTop02">
                   <p class="marginLeft02">{{ this.formLeft.input12 }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;元</p>
                </FormItem>
                <FormItem label="限购数量" class="marginTop02">
                    <p class="marginLeft02" style="color:#A4A4A4;">限每人购买的数量</p>
                    <p class="marginLeft02" style="padding-left:30px">{{ this.formLeft.input13 }}</p>
                </FormItem>
                <FormItem label="商品单位" class="marginTop02">
                   <p class="marginLeft02" style="color:#A4A4A4;">{{ this.formLeft.input14 }}</p>
                </FormItem>
                <FormItem label="商品货号" class="marginTop02">
                   <p class="marginLeft02">{{ this.formLeft.input15 }}</p>
                </FormItem>
                <FormItem label="商品参数" class="marginTop02">
                    <div v-for="item in ParameterName" :key="item">
                        <p>&nbsp;</p>
                        <p>{{ item }}：<!-- 参数1名称 -->
                            <span class="color-span">草莓套餐</span> <!-- 参数1名称的值 -->
                        </p>

                        <div class="color-span-a">
                            <span> {{ item }}详情：</span><!-- 参数1详情 -->
                            <span class="count-span-a">
                                <p style="margin-left:10px; color:#A4A4A4;">草莓一斤</p>
                                <p style="margin-left:10px; color:#A4A4A4;">草莓一斤，草莓一斤</p>
                                <p style="margin-left:10px; color:#A4A4A4;">草莓一斤，草莓一斤，草莓一斤</p>
                            </span>
                        </div>
                    </div>
                </FormItem>
                <FormItem label="商品规格" class="marginTop02">
                    <div v-for="itema in Commodityspec" :key="itema">
                        <p>&nbsp;</p>
                        <p>{{ itema }}：     <!-- 主商品标题 -->
                            <span class="color-span">套餐</span>
                        </p>
                        <div v-for="itemb in Commoditysped" :key="itemb">
                            <div class="color-span-a">
                                <span>{{ itemb }}：</span> <!-- 主商品名称 -->
                                <span class="count-span-a">
                                    <p class="color-span">大白菜套餐</p>
                                </span>
                            </div>
                            <div class="color-span-ab">
                                <span>单价：</span>
                                <span class="count-span-a">
                                    <p class="color-span">100￥</p>
                                </span>
                            </div>
                        </div>
                    </div>
                </FormItem>
                <FormItem label="保障描述" class="marginTop02">
                   <span class="marginLeft02">假一赔十</span>
                   <span class="marginLeft02">快速退款</span>
                </FormItem>
                <FormItem label="商品配送" class="marginTop02">
                   <span class="marginLeft02">可到店消费</span>
                   <span class="marginLeft02">可配送</span>
                </FormItem>
                <FormItem label="是否包邮" class="marginTop02">
                   <span class="marginLeft02">是</span>
                </FormItem>
                <FormItem label="是否包邮" class="marginTop02">
                   <span class="marginLeft02">40分钟</span>
                </FormItem>
            </Form>
            <div class="buuttonn">
                <Button type="primary" @click="routerTocd">返回</Button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                formLeft: {
                    input1: '',       
                    input2: '',    
                    input3: '大洋芋和小米咋',   
                    input4: '',
                    input5: '',
                    input6: '',
                    input7: '',
                    input8: '大洋芋和小米咋大洋芋和小米咋大洋芋和小米咋大洋芋和小米咋大洋芋和小米咋大洋芋和小米咋大洋芋和小米咋大洋芋和小米咋大洋芋和小米咋',     
                    input9: '',
                    input10: '48915198（已售152）',
                    input11: 1111,
                    input12: '2222',
                    input13: '不限',
                    input14: 'KG',
                    input15: 'KG125FSD',
                },
                // 商品参数
                ParameterName:[
                    '参数1名称',
                    '参数2名称',
                    '参数3名称',
                ],
                // 商品规格
                Commodityspec:[
                    '主规格1标题',
                    '主规格2标题',
                    '主规格3标题',
                ],
                Commoditysped:[
                    '主规格1名称',
                    '主规格2名称',
                ],
                
            }
        },
        methods: {
            routerTocd(){
                this.$router.push({
                    path:'./commoditymanagement'
                })
            }
        },
    }
</script>

<style scoped>
    .table_css_xiaoyuer {
        box-sizing: border-box;
        padding: 20px;
        margin-top: 20px;
    }
    .ckspxq_tile{
        background-color: rgb(250, 251, 250);
        padding: 10px;
    }
    .Commodity-details{
        box-sizing: border-box;
        padding: 0 100px;
        margin-top: 50px;
    }
    .marginTop{
        margin-top: 50px;
    }
    .marginTop02{
        margin-top: 20px;
    }
    .marginleft{
        margin-left: 40px;
    }
    .dataImg-large{
        display: flex;
        align-items: center;
        justify-content: center;
        width:100%;
        height: auto;
    }
    .marginLeft02{
        margin-left: 20px;
    }
    .color-span{
        color:rgb(164, 164, 164);
    }
    .color-span-a{
        padding-left: 40px;
        display: flex;
    }
    .color-span-ab{
        padding-left: 80px;
        display: flex;
    }
    .buuttonn{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .buuttonn button{
        padding: 0px 50px;
        margin-bottom: 60px;
    }
</style>