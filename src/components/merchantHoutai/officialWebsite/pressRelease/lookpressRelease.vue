<template>
    <!-- 查看新闻公告 -->
    <div class="addprocess" id="addpressRelease">
        <div class="product-top">
            <label style="margin-left: 30px">新增新闻公告标题</label>
        </div>
        <el-form :model="addproduct" ref="addproduct">
            <el-form-item label="新闻公告标题:" prop="title" label-width="230px">
                <label>{{this.addproduct.title}}</label>
            </el-form-item>
            <el-form-item label="新闻图片:" prop="releaseImg" label-width="230px">
				<img width="300" height="170" style="margin-left: 10px;" v-for="(item,index) in this.addproduct.albumPics" :src="item" />
            </el-form-item>
			<el-form-item label="新闻公告内容:" prop="content" label-width="230px">
				<span class="newscontent">{{this.addproduct.content}}</span>
			</el-form-item>
        </el-form>
        <div class="product">
            <el-button @click="returnBtns" class="returnBtn">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'addpressRelease',
    data() {
        return {
            action: '',
            addproduct: {
                title: '',
                content: '',
                albumPics: []
            },
        };
    },
    mounted() {
		this.getlookPressData();
	},
    methods: {
		returnBtns(){
			this.$router.push({
				path: './pressRelease'
			});
		},
        getlookPressData(){
			var data = this.$route.query.data;
			if(data != undefined){
				this.addproduct = data;
				var dddList = [];
				var aaas = /^(https):\/\/ /;
				data.albumPics.forEach(function(val,index){
					if(aaas.test(val)){
						dddList[index] = val;
					} else {
						dddList[index] =localStorage.getItem('imgUrl') + val;
					}
				})
				this.addproduct.albumPics = dddList;
			}
		},
    }
};
</script>

<style>
.addprocess {
    width: 100%;
	box-sizing: border-box;
	padding: 20px;
}
.product-top {
    width: 100%;
    height: 45px;
    background: #fafbfa;
    margin-top: 20px;
    line-height: 45px;
    margin-bottom: 20px;
}
.input {
    width: 260px;
}
.product .returnBtn {
    width: 90px;
    height: 30px;
    background: #38A28A;
    color: #fff;
    padding: 0;
    margin-left: 30%;
}
.textarea{
  width: 440px;
}
.textarea .el-textarea__inner{
  height: 150px;
}
.inputTitle{
	width: 257px;
}
.readdonly .el-textarea__inner{
	border: 0;
}
.readdonly .el-input__inner{
	border: 0;
}
.addprocess .newscontent{
	display: block;
	width: 70%;
}
</style>
