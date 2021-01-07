<template>
    <div class="table_css_xiaoyuer"><!--文章动态-->
        <h4 class="ckspxq_tile">查看职位详情</h4>
        <div class="Commodity-details">
            <ul>
                <li>
                    <div>动态标题：</div><!--title-->
                    <div>{{ this.resDataed.title }}</div>
                </li>

                <li>
                    <div>封面：</div><!--url-->
                    <img class="imgStyle" :src="this.resDataed.url" alt="" width="100" height="100">
                </li>

                <li>
                    <div>文章详情：</div><!--details-->
                    <div v-html="this.resDataed.details"></div>
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
            resDataed:{
                title:'',
                url:'',
                details:''
            }
        }
    },
    methods:{
        routerTocd(){
            this.$router.push({
                path:'./article-news'
            })
        }
    },
    mounted(){
        let url = 'admin/admin/company/findOneById'+'?id='+this.$route.query.id;
        this.$axios.get(url).then(res=>{
            if(res.status == 200){
                if(res.data.code == 200){
                    let requestData = res.data.data.dynamicDTO;
                    let reguer = /^(https):\/\/.+$/;
                    let reguerd = reguer.test(requestData.url);
                    this.resDataed = requestData;
                    if(reguerd ==true){
                        this.resDataed.url = requestData.url;
                    }else{
                        this.resDataed.url = localStorage.getItem('imgUrl') + requestData.url;
                    }
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
.imgStyle{
    display: block;
    width:100px;
    height: 100px;
}
</style>
