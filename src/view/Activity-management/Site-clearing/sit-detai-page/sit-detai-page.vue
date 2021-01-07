<template>
    <div class="table_css_xiaoyuer">
        <h4 class="ckspxq_tile">查看职位详情</h4>
        <div class="Commodity-details">
            <ul>
                <li>
                    <div>活动商品：</div>
                    <div>
                        <table class="tabletr">
                            <tr v-for="(item,index) in this.DataObj.tabelobj" :key="index">
                                <td>{{ item.productName }}</td><!--productName-->
                                <td>清仓价</td>
                                <td>{{ item.activityPrice }}</td><!--activityPrice-->
                                <td>发布数量</td>
                                <td>
                                    <span class="padding">{{ item.productNum }}</span><!--productNum-->
                                    <span>(剩余&nbsp;{{ item.countLeft }}&nbsp;件)</span><!--countLeft-->
                                </td>
                                <td>每人限购</td>
                                <td>{{ item.numLimitation }}</td><!--numLimitation-->
                            </tr>
                        </table>
                    </div>
                </li>
                <li>
                    <div>活动标签：</div><!--activityTabs-->
                    <span class="endTime" v-for="(item,index) in this.DataObj.activityTabs" :key="index">{{ item }}</span>
                </li>
                <li>
                    <div>活动时间：</div>
                    <div>
                        <span>{{ this.DataObj.startTime }}</span><!--startTime-->
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;————&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span>{{ this.DataObj.endTime }}</span><!--endTime-->
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
    data() {
        return {
            DataObj:{
                tabelobj:[
                    {
                        productName:'',
                        activityPrice:'5264',
                        productNum:'54',
                        countLeft:'53463',
                        numLimitation:'adsadsa',
                    }
                ],
                activityTabs:[],
                startTime:'',
                endTime:'',
            }
        }
    },
    methods:{
        routerTocd(){
            this.$router.push({
                path:'./Site-clearing',
            })
        },
        getDataGets(){
            let GetData = this.$route.query.Data;
            this.DataObj = GetData;
            let ERarr = GetData.activityTabs.split(',');
            this.DataObj.activityTabs = ERarr;
            var date = new Date(this.$route.query.Data.startTime);
            var time1 = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() +
            1) + '-' + date.getDate();
            var date1 = new Date(this.$route.query.Data.endTime);
            var time2 = date1.getFullYear() + '-' + (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() +
            1) + '-' + date1.getDate();
            this.$route.query.Data.startTime = time1;
            this.$route.query.Data.endTime = time2;
            // tabeler
            this.DataObj.tabelobj = GetData.productDTOList;
        }
    },
    mounted() {
        this.getDataGets();
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
.Commodity-details li:nth-child(2){
    align-items: center;
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
.tabletr{
    width:100%;
    height: auto;
}
.tabletr tr{
    text-align: center;
    height: 36px;
    line-height: 36px;
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
.padding{
    padding:0 10px 0 0;
}
</style>