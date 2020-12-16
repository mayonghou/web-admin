<template>
    <!--文章动态详情 -->
    <div class="articDyaminDetail"
        id="articDyaminDetail"
        v-loading="fullscreenLoading"
        :element-loading-text="loadingText"
        element-loading-background="rgba(0, 0, 0, 0.7)"
      >
        <div class="detail-top"><label style="margin-left: 20px">文章动态详情</label></div>
        <el-form :model="detailData" ref="detailData">
            <el-form-item label="动态标题:" prop="dynamicTitle" :label-width="labelwidth">
                <el-input v-model="detailData.dynamicTitle" class="elinput" readonly placeholder="请输入动态标题"></el-input>
            </el-form-item>
            <el-form-item label="封面:" prop="dynamicImg" :label-width="labelwidth">
                <img width="150" height="150" :src="detailData.dynamicImg" alt="">
            </el-form-item>
            <el-form-item label="文章详情:" prop="dynamicDetail" :label-width="labelwidth">
				<div class="dsadas" v-html="detailData.dynamicDetail"></div>
            </el-form-item>
        </el-form>
        <div class="btn-bell">
            <el-button @click="returnBtn" class="btn">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'articDyaminDetail',
    data() {
        return {
          labelwidth: '230px',
          editorOption:{},
          fullscreenLoading: true,
          loadingText: '加载中...',
          detailData:{
            dynamicTitle:'',
            dynamicImg: '',
            dynamicDetail: ''
          }
        }
    },
    mounted() {
      this.getdetailList();
    },
    methods: {
      returnBtn(){
        this.$router.push({
          path: './articleDynamic'
        });
      },
      getdetailList(){
        var id = this.$route.query.id;
          this.$axios.get('admin/admin/company/findOneById?id=' + id).then((res) => {
              this.fullscreenLoading = false;
              if(res.status == 200){
                var data = res.data;
                console.log(data);
                if(data.code == 200){
                  var dataDetail = data.data.dynamicDTO;
                  this.detailData.dynamicTitle = dataDetail.title;
                  this.detailData.dynamicImg = localStorage.getItem('imgUrl') + dataDetail.url;
                  this.detailData.dynamicDetail = dataDetail.details;
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
                        message: res.data.msg,
                        type: 'error'
                    });
              }
          });
      },
    }
};
</script>

<style>
.articDyaminDetail {
    box-sizing: border-box;
	width: 100%;
    padding: 20px;
}
.detail-top {
    width: 100%;
    height: 45px;
    line-height: 45px;
    background: #fafbfa;
}
.editor{
  width: 800px;
}
.articDyaminDetail .elinput .el-input__inner{
  border: 0;
}
.btn-bell{
  width: 100%;
  text-align: center;
}
.btn-bell .btn{
  width: 90px;
  height: 30px;
  background: #2482D2;
  padding: 0;
  color: #fff;
}
.fangda{
  font-size: 26px;
  color: #fff;
  position: relative;
  left: 60px;
  top: -60px;
}
.dsadas img{
	width: 200px;
}
</style>
