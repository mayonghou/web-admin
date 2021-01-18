<template>
  <div>
    <div class="Commodity-details">
      <h4>通知详情</h4>
      <ul>
          <li>
            <div>通知标题：</div>
            <div>
              <p>小鱼儿出校商品</p>
            </div>
          </li>

          <li>
            <div>通知内容：</div>
            <div>
              <p>
                通知内容：通知内容：
                通知内容：通知内容：
                通知内容：通知内容：
                通知内容：通知内容：
                通知内容：通知内容：
                通知内容：通知内容：
                通知内容：通知内容：
                通知内容：通知内容：
                通知内容：通知内容
              </p>
              <h4 class="Classh4count">
                通知内容：通知内容
                通知内容：通知内容
                通知内容：通知内容
                通知内容：通知内容
                通知内容：通知内容
                通知内容：通知内容
                通知内容：通知内容
                通知内容：通知内容
                通知内容：通知内容
                通知内容：通知内容
              </h4>
            </div>
          </li>
      </ul>
    </div>
    <div class="buuttonn">
        <Button type="primary" @click="routerTocd">保存</Button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    routerTocd(){

    },

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
    flex-shrink: inherit;
    box-sizing: border-box;
    flex-shrink:1;
    flex-grow:1;
    padding-right: 150px;
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
  .Classh4count{
    margin-top: 60px;
  }
</style>
