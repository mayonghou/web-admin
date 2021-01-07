<template>
    <div class="table_css_xiaoyuer">
        <h4 class="ckspxq_tile">查看职位详情</h4>
        <div class="Commodity-details">
            <ul>
                <li>
                    <div>活动标题：</div>
                    <div>{{ this.detailsData.title }}</div><!--title-->
                </li>
                <li>
                    <div>活动奖品：</div><!--prizeItemList-->
                    <div>
                        <table class="tabletr">
                            <tr v-for="(item,index) in this.detailsData.prizeItemList" :key="index">
                                <td>{{ item.prizeLevel }}</td><!--prizeLevel-->
                                <td>{{ item.prizeName }}</td><!--prizeName-->
                                <td>未领取</td>
                                <td>{{ item.prizeCountLeft }}</td><!--prizeCountLeft-->
                                <td>发布数量</td>
                                <td>
                                    <span class="padding">{{ item.prizeNum }}</span><!--prizeNum-->
                                </td>
                            </tr>
                        </table>
                    </div>
                </li>
                <li>
                    <div>每日抽奖机会：</div><!--chanceNumPerDay-->
                    <div>{{ this.detailsData.chanceNumPerDay }}</div>
                </li>
                <li>
                    <div>中奖概率：</div><!--winRate-->
                    <div>{{ this.detailsData.winRate }}</div>
                </li>
                <li>
                    <div>中奖机会：</div><!--maxChanceNum-->
                    <div>{{ this.detailsData.maxChanceNum }}</div>
                </li>
                <li>
                    <div>活动详情：</div><!--ruleDescription-->
                    <div>{{ this.detailsData.ruleDescription }}</div>
                </li>
                <li>
                    <div>活动时间：</div><!-- startTime   endTime -->
                    <div>
                        <span>{{ this.detailsData.startTime }}</span>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;————&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span>{{ this.detailsData.endTime }}</span>
                    </div>
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
        return {
            detailsData:
            {
                title:'AAA',
                prizeItemList:
                [
                    {
                        prizeLevel:'AAA',
                        prizeName:'AAA',
                        prizeCountLeft:'AAA',
                        prizeNum:'AAA',
                    }
                ],
                chanceNumPerDay:'AAA',
                winRate:'AAA',
                maxChanceNum:'AAA',
                ruleDescription:'AAA',
                startTime:'AAA',
                endTime:'AAA',
            },
        }
    },
    methods:{
        routerTocd(){
            this.$router.push({
                path:'./luckdraw',
            })
        },
        getData(){
            const prizeLevel = {"1":"一","2":"二","3":"三","4":"四","5":"五","6":"六"};
            this.detailsData = this.$route.query.Data;
            let strinfer = this.$route.query.Data.prizeItemList;
            for(let i in strinfer){
                strinfer[i].prizeLevel = prizeLevel[strinfer[i].prizeLevel + ""] + '等奖';
                this.detailsData.prizeItemList.prizeLevel = strinfer[i].prizeLevel;
            }
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
.padding{
    padding:0 10px 0 0;
}
.tabletr{
    width:100%;
    height: auto;
    text-align: center;
}
.tabletr tr{
    text-align: center;
    height: 36px;
    line-height: 36px;
}
</style>