<template>
    <div class="table_css_xiaoyuer">
        <h4 class="ckspxq_tile">查看职位详情</h4>
        <div class="Commodity-details">
            <ul>
                <li>
                    <div>活动标题：</div><!-- activityTitle -->
                    <div>{{ this.grantData.activityTitle }}</div>
                </li>
                <li>
                    <div>活动优惠券：</div><!--couponName-->
                    <div>{{ this.grantData.couponName }}</div>
                </li>
                <li>
                    <div>发布数量：</div><!--couponNum-->
                    <div>{{ this.grantData.couponNum }} &nbsp;&nbsp;&nbsp;张
                        <span class="surplus">（剩余&nbsp;&nbsp;&nbsp;{{ this.grantData.countLeft }}&nbsp;&nbsp;&nbsp;张）</span><!--countLeft-->
                    </div>
                </li>
                <li>
                    <div>活动时间：</div><!--startTime-->
                    <div>{{ this.grantData.startTime }}</div>
                </li>
                <li>
                    <div>领券限制：</div><!--numLimitation-->
                    <div>{{ this.grantData.numLimitation }}</div>
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
            grantData:{
                activityTitle:'会尽快哈就更好地',
                couponName:'电饭锅',
                couponNum:'依尔特',
                countLeft:'奇尔韦尔',
                startTime:'高合金钢和',
                numLimitation:'很干净十多个',
            },
        }
    },
    methods:{
        routerTocd(){
            this.$router.push({
                path:'./coupongl'
            })
        },
        getData(){
            var date = new Date(this.$route.query.Data.startTime);
            var time1 = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() +
            1) + '-' + date.getDate();
            this.grantData = this.$route.query.Data;
            this.$route.query.Data.startTime = time1
        }
    },
    mounted(){
        this.getData();
    }
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
.surplus{
    padding: 0px 15px;
}
</style>
