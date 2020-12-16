<template>
    <!-- 图文动态详情 -->
    <div class="dynamicDetail" id="dynamicDetail">
        <div class="detail-top"><label style="margin-left: 20px">图文动态详情</label></div>
        <el-form :model="detailList">
            <el-form-item label="动态详情：" label-width="230px">
                <!-- <el-input v-model="detailList.dynamicDetial" type="textarea"  class="textarea" readonly></el-input> -->
				<div style="width: 610px;">{{this.detailList.dynamicDetial}}</div>
            </el-form-item>
            <el-form-item label="" label-width="230px">
                <img class="imgSize" v-if="detailList.dynamicImg" v-for="item in this.detailList.dynamicImg" :key="item.index" :src="item" />
            </el-form-item>
        </el-form>
        <div class="btn-retyrn">
          <el-button @click="returnBtn" class="rerurn">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'dynamicDetail',
    data() {
        return {
            detailList: {
                dynamicDetial: '',
                dynamicImg: []
            }
        };
    },
    mounted() {
        this.getdetailData();
    },
    methods: {
        returnBtn(){
          this.$router.push({
            path: './dynamicState'
          });
        },
        getdetailData() {
            var id = this.$route.query.id;
            this.$axios.get('admin/admin/company/findOneById?id=' + id).then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                      var imgList = [];
                      this.detailList.dynamicDetial = data.data.dynamicDTO.details;
					  var https = /^(https):\/\/.+$/
					  console.log(data.data.dynamicDTO.url);
                      data.data.dynamicDTO.url.split(',').forEach(function(val,index) {
							if(https.test(val)){
								imgList[index] = val;
							} else {
								imgList[index] =  localStorage.getItem('imgUrl') + val;
							}
                      });
                      this.detailList.dynamicImg = imgList;
                    } else {
                        this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'error'
                        });
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: data.msg,
                        type: 'error'
                    });
                }
            });
        }
    }
};
</script>

<style>
.dynamicDetail {
    box-sizing: border-box;
	width: 100%;
    padding: 20px;
}
.detail-top {
    height: 45px;
    line-height: 45px;
    width: 100%;
    background: #FAFBFA;
    margin-bottom: 20px;
}
.dynamicDetail .textarea {
    width: 610px;
	height: 200px;
}
.dynamicDetail .textarea .el-textarea__inner {
    border: 0;
}
.btn-retyrn{
  width: 100%;
  text-align: center;
}
.btn-retyrn .rerurn{
  width: 90px;
  height: 30px;
  background: #2482D2;
  color: #fff;
  padding: 0;
  margin-left: 30px;
}
.imgSize{
  width: 100px;
  height: 100px;
  margin-left: 20px;
}
</style>
