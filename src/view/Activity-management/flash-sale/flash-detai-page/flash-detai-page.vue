<template>
    <div class="table_css_xiaoyuer">
        <h4 class="ckspxq_tile">查看职位详情</h4>
        <div class="Commodity-details">
            <ul>
                <li>
                    <div>活动商品：</div>
                    <div>{{ this.gertData.productName }}</div><!--productName-->
                </li>
                <li>
                    <div>发布数量：</div>
                    <div>{{ this.gertData.productNum }}</div><!--productNum-->
                </li>
                <li>
                    <div>活动标签：</div><!--activityTabs-->
                    <div>
                        <span class="endTime" v-for="(val,index) in this.gertData.activityTabs" :key="index">{{ val }}</span>
                    </div>
                </li>
                <li>
                    <div>抢购价：</div><!--activityPrice-->
                    <div>{{ this.gertData.activityPrice }}</div>
                </li>
                <li>
                    <div>活动时间：</div>
                    <div>
                        <span>{{ this.gertData.startTime }}</span><!--startTime-->
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;————&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span>{{ this.gertData.endTime }}</span><!-- endTime -->
                    </div>
                </li>
                <li>
                    <div>每人限购：</div><!--numLimitation-->
                    <div>{{ this.gertData.numLimitation }}</div>
                </li>
            </ul>
        </div>
        <div class="buuttonn">
            <Button type="primary" @click="routerTocd">返回</Button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                gertData:{
                    productName:'',
                    productNum:'',
                    activityTabs:[],
                    activityPrice:'',
                    startTime:'',
                    endTime:'',
                    numLimitation:'',
                }
            }
        },
        methods:{
            routerTocd(){
                this.$router.push({
                    path:'./flash-sale'
                })
            },
            gertDataer(){
                let GerDataer = this.$route.query.Data;
                this.gertData = GerDataer;
                let stringert = GerDataer.activityTabs.split(',');
                this.gertData.activityTabs = stringert;
                
                var date = new Date(this.$route.query.Data.startTime);
                var time1 = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() +
                1) + '-' + date.getDate();
                var date1 = new Date(this.$route.query.Data.endTime);
                var time2 = date1.getFullYear() + '-' + (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() +
                1) + '-' + date1.getDate();
                this.$route.query.Data.startTime = time1;
                this.$route.query.Data.endTime = time2;
            }
        },
        mounted(){
            this.gertDataer();
        },
    }
</script>

<style scoped>
    .Commodity-details{
        width:100%;
        height: auto;
        box-sizing: border-box;
        padding: 0 50px;
        margin-top: 40px;
    }
    .Commodity-details li{
        width:100%;
        height: auto;
        list-style-type: none;
        box-sizing: border-box;
        margin: 5px 0px;
        display: flex;
        font-size: 14px;
        padding: 10px 0px;
    }
    .Commodity-details li div:nth-child(1){
        max-width:200px;
        min-width: 200px;
        text-align: right;
        box-sizing: border-box;
        padding-right: 20px;
        font-weight: 600;
    }
    .Commodity-details li div:nth-child(2){
        flex-grow:1;
        box-sizing: border-box;
    }
    .buuttonn{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 60px;
    }
    .buuttonn button{
        padding: 0px 50px;
        margin-bottom: 60px;
    }
    .endTime{
        border: solid 1px #979497;
        margin: 10px;
        padding: 8px 20px;
        border-radius: 5px;
    }
    .endTime:first-child{
        margin-left: 0;
    }
</style>