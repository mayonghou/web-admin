<template>
    <div class="table_css_xiaoyuer">
        <h4 class="ckspxq_tile">查看房屋详情</h4>
        <div class="Commodity-details">
            <Form :model="formLeft" label-position="right" :label-width="150" :label-colon="true" :disabled="true" >
                <FormItem label="封面" class="marginTop">
                    <Avatar :src="this.formLeft.input1" shape="square" icon="ios-person" size="100" style="margin-left:40px;" />
                </FormItem>
                <FormItem label="上传房屋视频" class="marginTop">
                    <video :src="this.formLeft.input2" width="320" height="240" controls autoplay loop></video>
                </FormItem>
                <FormItem label="房源标题名称" class="marginTop02">
                    <p class="marginleft">{{ this.formLeft.input3 }}</p>
                </FormItem>
                 <FormItem label="房源主图" class="marginTop">
                    <p style="margin-left:40px; color:#A4A4A4; ">(轮播图展示)</p>
                    <img class="imgStyle" v-for="(item,index) in  this.formLeft.input4" :key="index" :src="item" />
                </FormItem>
                <FormItem label="房屋介绍" class="marginTop02">
                    <p>{{ this.formLeft.input5 }}</p>
                </FormItem>
                <FormItem label="房屋亮点" class="marginTop02">
                    <p class="marginLeft02">
                        <span class="marginLeft02Sson" v-for="(v,i) in this.formLeft.input6">{{ v }}</span>
                    </p>
                </FormItem>
            </Form>
        </div>
        <!-- 基础信息 -->
        <h4 class="ckspxq_tile">基础信息</h4>
        <div class="Commodity-details">
            <Form label-position="right" :label-width="150" :label-colon="true" :disabled="true" >
                <FormItem label="房屋类型" class="marginTop02"><!-- typeName -->
                    <p class="marginLeft02">{{ this.BasicInforData.typeName }}</p>
                </FormItem>
            </Form>
            <Form label-position="right" :label-width="150" :label-colon="true" :disabled="true" >
                <FormItem label="出租方式" class="marginTop02"><!-- let -->
                    <p class="marginLeft02">{{ this.BasicInforData.let }}</p>
                </FormItem>
            </Form>
            <Form label-position="right" :label-width="150" :label-colon="true" :disabled="true" >
                <FormItem label="小区地址" class="marginTop02"><!--  address  -->
                    <p class="marginLeft02">{{ this.BasicInforData.address }}</p>
                </FormItem>
            </Form>
            <Form label-position="right" :label-width="150" :label-colon="true" :disabled="true" >
                <FormItem label="小区名称" class="marginTop02"><!--  villageName  -->
                    <p class="marginLeft02">{{ this.BasicInforData.villageName }}</p>
                </FormItem>
            </Form>
            <Form label-position="right" :label-width="150" :label-colon="true" :disabled="true" >
                <FormItem label="建筑面积" class="marginTop02"><!-- area -->
                    <p class="marginLeft02">{{ this.BasicInforData.area }}</p>
                </FormItem>
            </Form>
            <Form label-position="right" :label-width="150" :label-colon="true" :disabled="true" >
                <FormItem label="房屋户型" class="marginTop02"><!--  layout -->
                    <p class="marginLeft02">{{ this.BasicInforData.layout }}</p>
                </FormItem>
            </Form>
            <Form label-position="right" :label-width="150" :label-colon="true" :disabled="true" >
                <FormItem label="朝向" class="marginTop02"><!-- houseOrientation -->
                    <p class="marginLeft02">{{ this.BasicInforData.houseOrientation }}</p>
                </FormItem>
            </Form>
            <Form label-position="right" :label-width="150" :label-colon="true" :disabled="true" >
                <FormItem label="楼层" class="marginTop02"><!-- houseFloor  -->
                    <p class="marginLeft02">{{ this.BasicInforData.houseFloor }}</p>
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
                },
                BasicInforData:{
                    typeName:'我是小',
                    let:'我是小鱼儿鱼儿',
                    address:'我是小鱼儿鱼儿',
                    villageName:'我是小小鱼儿',
                    area:'我是小是小鱼儿',
                    layout:'我是小鱼是小鱼儿',
                    houseOrientation:'我是小是小鱼儿',
                    houseFloor:'我是小是小鱼儿',
                }
        }
        },
        methods: {
            routerTocd(){
                this.$router.push({
                    path:'./rentalmanagement',
                })
            },
        },
        mounted(){
            var url = 'admin/renting/manage/select/'+this.$route.query.id;
            this.$axios.get(url).then((res)=>{
                if(res.status=200){
                    if(res.data.code=200){
                        const requestData = res.data.data;
                        const imgUrl = /^(https):\/\/.+$/;
                        const regular = imgUrl.test(requestData.mainImage);
                        if(regular == true){
                            this.formLeft.input1 = requestData.mainImage;// mainImage
                            this.formLeft.input2 = requestData.houseVideo;// houseVideo
                            const imageJsoner = requestData.imageJson.split(',');//imageJson
                            const imageJsonered = [];
                            for(const i in imageJsoner){
                                imageJsonered.push(imageJsoner[i]);
                            }
                            this.formLeft.input4 = imageJsoner;
                            // introduce

                        }else if(regular == false){
                            this.formLeft.input1 = localStorage.getItem('imgUrl') + requestData.mainImage;// mainImage
                            this.formLeft.input2 = localStorage.getItem('imgUrl') + requestData.houseVideo;// houseVideo
                            const imageJsoner = requestData.imageJson.split(',');//imageJson
                            const imageJsonered = [];
                            for(const i in imageJsoner){
                                imageJsonered.push(localStorage.getItem('imgUrl') + imageJsoner[i]);
                            }
                            this.formLeft.input4 = imageJsonered;
                        }
                        this.formLeft.input3 = requestData.houseTitle;// houseTitle
                        this.formLeft.input5 = requestData.introduce;//introduce
                        const inputData6 = requestData.highlights.split(',');
                        const newArrData6 = [];
                        for(const i in inputData6){
                            newArrData6.push(inputData6[i])
                        }
                        this.formLeft.input6 = newArrData6;//highlights
                        // 基础信息
                        this.BasicInforData = requestData;
                    }
                }
            }).catch((err)=>{

            })
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
    .marginLeft02Sson{
        display: inline-block;
        border: #BBBBBB solid 1px;
        margin: 10px 10px;
        padding: 0px 15px;
        border-radius: 5px;
    }
    .imgStyle{
        display: inline-block;
        width:120px;
        height: auto;
        margin: 10px;
    }
    .imgStyle:first-child{
        margin-left: 0;
    }
</style>
