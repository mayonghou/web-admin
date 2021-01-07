<template>
  <div>
    <div class="Commodity-details">
      <ul>
          <li>
              <div>姓名：</div><!--userName-->
              <div>{{ this.ComyData.userName }}</div>
          </li>
          <li>
            <div>用户名：</div><!-- userAccount -->
            <div>{{ this.ComyData.userAccount }}</div>
          </li>
          <li>
              <div>手机号：</div><!-- phoneNumber -->
              <div>{{ this.ComyData.phoneNumber }}</div>
          </li>

          <li>
              <div>性别：</div><!-- gender -->
              <div>{{ this.ComyData.gender }}</div>
          </li>

          <li>
              <div>行业：</div><!-- industryName -->
              <div>{{ this.ComyData.industryName }}</div>
          </li>

          <li>
              <div>职业：</div><!-- career -->
              <div>{{ this.ComyData.career }}</div>
          </li>

          <li>
              <div>工作经验：</div><!-- workExperiences -->
              <div>{{ this.ComyData.workExperiences }}</div>
          </li>

          <li>
              <div>个人地址：</div><!-- addressDetail -->
              <div>{{ this.ComyData.addressDetail }}</div>
          </li>

          <li>
            <div>身份证照片：</div>
            <div>
              <br>
              <p>正面</p><!-- idCardPicFront -->
              <p>
                <img :src="this.ComyData.idCardPicFront" alt="" width="200" height="100">
              </p>
              <p>反面</p><!-- idCardPicBack -->
              <p>
                  <img :src="this.ComyData.idCardPicBack" alt="" width="200" height="100">
              </p>
            </div>
        </li>
      </ul>
    </div>
    <div class="buuttonn">
        <Button type="primary" @click="routerTocd">编辑</Button>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        ComyData:{
          userName:'',
          phoneNumber:'',
          gender:'',
          industryName:'',
          career:'',
          workExperiences:'',
          addressDetail:'',
          idCardPicFront:'',
          idCardPicBack:'',
          userAccount:'',
        }
      }
    },
    props:[
      'DetailsData',
    ],
    methods:{
      routerTocd(){
        this.$router.push({
          path:'./edit'
        })
      },
    dataProcessing(){
      this.ComyData = this.DetailsData;
      let idcard = /^(https):\/\/.+$/;
      let regidcard = idcard.test(this.DetailsData.idCardPicFront);
      let regidcarder = idcard.test(this.DetailsData.idCardPicFront);
        if(regidcard == true){
          this.ComyData.idCardPicFront = this.DetailsData.idCardPicFront;
          this.ComyData.idCardPicBack = this.DetailsData.idCardPicBack;
        }else{
          this.ComyData.idCardPicFront = localStorage.getItem('imgUrl') + this.DetailsData.idCardPicFront;
          this.ComyData.idCardPicBack = localStorage.getItem('imgUrl') + this.DetailsData.idCardPicBack;
        }
      }
    },
    mounted(){
      this.dataProcessing();
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
  .h4Classd{
    height:46px;
    line-height: 46px;
    box-sizing: border-box;
    padding-left: 10px;
    background-color: rgba(250, 251, 250, 100);
    margin-bottom: 34px;
  }
  .h4Classd02{
    margin-bottom: 0px;
    margin-top: 30px;
  }
</style>
