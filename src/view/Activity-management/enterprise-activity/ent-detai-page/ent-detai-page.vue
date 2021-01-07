<template>
    <div class="table_css_xiaoyuer">
        <h4 class="ckspxq_tile">查看职位详情</h4>
        <div class="Commodity-details">
            <ul>
                <li>
                    <div>活动标题：</div><!--title-->
                    <div>{{ this.geteDAta.title }}</div>
                </li>
                <li>
                    <div>活动图片：</div><!--albumPics-->
                    <div>
                        <img width="100" style="margin-left: 10px;" v-for="(item,index) in  this.geteDAta.albumPics" :key="index" :src="item" />
                    </div>
                </li>
                <li>
                    <div>活动详情：</div><!--detailHtml-->
                    <div v-html="this.geteDAta.detailHtml">{{ this.geteDAta.detailHtml }}</div>
                </li>
                <li>
                    <div>活动时间：</div><!--createTime-->
                    <div>{{ this.geteDAta.createTime }}</div>
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
            geteDAta:{
                title:'',
                albumPics:[],
                detailHtml:'',
                createTime:'',
            },
        }
    },
    methods:{
        routerTocd(){
            this.$router.push({
                path:'./enterprise-activity'
            })
        },
        geteDAtaer(){
            let datarty = this.$route.query.Data;
            this.geteDAta = datarty;
            let ArrArr = datarty.albumPics.split(',')
            var ddd = [];
            let regdu = /^(http):\/\/.+$/;
            for(let i in ArrArr){
                if(regdu.test(ArrArr[i]) == false){
                    ddd[i] = localStorage.getItem('imgUrl') + ArrArr[i];
                }else{
                    ddd[i] = ArrArr[i];
                }
            }
            this.geteDAta.albumPics = ddd;
            var date = new Date(this.$route.query.Data.createTime);
            var time1 = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() +
            1) + '-' + date.getDate();
            this.$route.query.Data.createTime = time1;
        }
    },
    mounted(){
        this.geteDAtaer();
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
</style>