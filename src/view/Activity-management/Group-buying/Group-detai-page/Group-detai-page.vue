<template>
    <div class="table_css_xiaoyuer">
        <h4 class="ckspxq_tile">查看职位详情</h4>
        <div class="Commodity-details">
            <ul>
                <li>
                    <div>AAAA：</div>
                    <div>电商</div>
                </li>

                <li>
                    <div>职业名称：</div>
                    <div>前段开发</div>
                </li>

                <li>
                    <div>岗位薪资（月薪）：</div>
                    <div>12K</div>
                </li>

                <li>
                    <div>职位类型：</div>
                    <div>研发</div>
                </li>

                <li>
                    <div>福利待遇：</div>
                    <div>12K+提成</div>
                </li>

                <li>
                    <div>学历要求：</div>
                    <div>本科</div>
                </li>

                <li>
                    <div>工作年限：</div>
                    <div>1-3年</div>
                </li>

                <li>
                    <div>工作地址：</div>
                    <div>花果园金融街</div>
                </li>

                <li>
                    <div>联系电话：</div>
                    <div>131695897895</div>
                </li>

                <li>
                    <div>岗位描述：</div>
                    <div>
                        岗位描述岗位描述岗位描述岗位描述
                    </div>
                </li>

                <li>
                    <div>团队介绍：</div>
                    <div>
                        团队介绍团队介绍团队
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
    methods:{
        routerTocd(){
            this.$router.push({
                path:'./group-buying'
            })
        }
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