<template>
    <div class="table_css_xiaoyuer">
        <h4 class="ckspxq_tile">查看职位详情</h4>
        <div class="Commodity-details">
            <ul>
                <li>
                    <div>所属行业：</div><!--industryName -->
                    <div>{{ this.QueryPoData.industryName }}</div>
                </li>

                <li>
                    <div>职业名称：</div><!-- jobName-->
                    <div>{{ this.QueryPoData.jobName }}</div>
                </li>

                <li>
                    <div>岗位薪资（月薪）：</div><!-- salaries -->
                    <div>{{ this.QueryPoData.salaries }}</div>
                </li>

                <li>
                    <div>职位类型：</div><!-- positionType -->
                    <div>{{ this.QueryPoData.positionType }}</div>
                </li>

                <li>
                    <div>福利待遇：</div>
                    <div class="fldyert"><!-- welfare -->
                        <span v-for="(v,i) in this.QueryPoData.welfare">{{ v.welfare }}</span>
                    </div>
                </li>

                <li>
                    <div>学历要求：</div><!-- education -->
                    <div>{{ this.QueryPoData.education }}</div>
                </li>

                <li>
                    <div>工作年限：</div><!-- experience -->
                    <div>{{ this.QueryPoData.experience }}</div>
                </li>

                <li>
                    <div>工作地址：</div><!-- address -->
                    <div>{{ this.QueryPoData.address }}</div>
                </li>

                <li>
                    <div>联系电话：</div><!-- tel -->
                    <div>{{ this.QueryPoData.tel }}</div>
                </li>

                <li>
                    <div>岗位描述：</div><!-- jobIntroduce -->
                    <div>{{ this.QueryPoData.jobIntroduce }}</div>
                </li>

                <li>
                    <div>团队介绍：</div><!-- team -->
                    <div>{{ this.QueryPoData.team }}</div>
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
            QueryPoData:{
                industryName:'水电费',
                jobName:'好几款',
                salaries:'玩儿',
                positionType:'发过火',
                welfare:[],  //数组
                education:'阿道夫',
                experience:'UI欧陆',
                address:'玩儿',
                tel:'穷了',
                jobIntroduce:'电饭锅',
                team:'水电费',
            }
        }
    },
    methods:{
        routerTocd(){
            this.$router.push({
                path:'./recruitmentmanagement'
            })
        }
    },
    mounted(){
        const url = "admin/job/manage/select/" + this.$route.query.id;
        this.$axios.get(url).then(res=>{
            if(res.status == 200){
                if(res.data.code == 200){
                    const requestData = res.data.data;
                    this.QueryPoData = requestData;
                }
            }else{
                alert(res.data.data.msg)
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
.fldyert{
    display: flex;
    flex-wrap:wrap;
}
.fldyert span{
    margin: 8px 10px;
    padding: 8px 20px;
    border: solid 1px silver;
    border-radius: 5px;
}
.fldyert span:first-child{
    margin-left: 0px;
}
</style>
