<template>
    <div class="table_css_xiaoyuer">
        <h4 class="ckspxq_tile">视频信息</h4>
        <div class="Commodity-details">
            <Form :model="formLeft" label-position="right" :label-width="150" :label-colon="true" :disabled="true" >
                <FormItem label="封面" class="marginTop"><!-- coverUrl -->
                    <Avatar :src="this.formLeft.coverUrl" shape="square" icon="ios-person" size="100" style="margin-left:40px;" />
                </FormItem>
                <FormItem label="视频" class="marginTop"><!-- contentUrl -->
                    <video :src="this.formLeft.contentUrl" width="320" height="240" controls autoplay loop></video>
                </FormItem>
                <FormItem label="视频标题名称" class="marginTop02"> <!--title-->
                    <p class="marginleft">{{ this.formLeft.title }}</p>
                </FormItem>
                <FormItem label="视频关联商品" class="marginTop02">
                    <p class="marginleft"><!--productInfo=>name-->
                        <span> {{ this.formLeft.productInfo.name }}</span>
                    </p>
                </FormItem>
            </Form>
        </div>
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
                    coverUrl: '',
                    contentUrl: '',
                    title: '',
                    productInfo:'',
                },
            }
        },
        methods: {
            routerTocd(){
                this.$router.push({
                    path:'./videomanagement'
                })
            }
        },
        mounted(){
            let videoInfor = this.$route.query.data;
            let regularData = /^(https):\/\/.+$/;
            let regularDa = regularData.test(videoInfor.coverUrl);
            this.formLeft = videoInfor;
            if(regularDa == true){
                this.formLeft.coverUrl = videoInfor.coverUrl;
                this.formLeft.contentUrl = videoInfor.contentUrl;
            }else if(regularDa == false){
                this.formLeft.coverUrl = localStorage.getItem('imgUrl') + videoInfor.coverUrl;
                this.formLeft.contentUrl = localStorage.getItem('imgUrl') + videoInfor.contentUrl;
            }
        }
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
    .marginleft span{
        display: inline-block;
        margin:8px 10px;
        padding: 3px 15px;
        border: solid 1px #e5e5e5;
        border-radius: 5px;
    }
    .marginleft span:first-child{
        margin-left: 0px;
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
    .Commodity-details02{
        margin-top: 15px;
    }
</style>
