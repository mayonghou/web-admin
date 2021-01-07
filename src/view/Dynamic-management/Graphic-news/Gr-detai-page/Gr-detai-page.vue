<template>
    <div class="table_css_xiaoyuer">
        <h4 class="ckspxq_tile">查看职位详情</h4>
        <div class="Commodity-details">
            <ul>
                <li>
                    <div>动态详情：</div>
                    <div v-html="resData"></div>
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
            resData:'',
        }
    },
    methods:{
        routerTocd(){
            this.$router.push({
                path:'./graphic-news'
            })
        }
    },
    mounted(){
        let url = 'admin/admin/company/findOneById'+'?id='+this.$route.query.id;
        this.$axios.get(url).then(res=>{
            if(res.status == 200){
                if(res.data.code == 200){
                    let requestData = res.data.data.dynamicDTO;
                    this.resData = requestData.details;
                }
            }
        }).catch(err=>{

        })
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
