<template>
    <!-- 添加企业历程 -->
    <div class="addprocess" id="addprocess">
        <div class="product-top">
            <label style="margin-left: 30px">新增企业历程信息</label>
        </div>
        <el-form :model="addproduct" :rules="rules" ref="addproduct">
            <el-form-item label="选择时间:" prop="time" label-width="230px">
                <el-date-picker
					v-model="addproduct.time"
					type="date"
					placeholder="选择日期"
					value-format="yyyy-MM-dd"
					@change="dateTimesss"
					></el-date-picker>
            </el-form-item>
            <el-form-item label="历程图片:" prop="processlist" label-width="230px">
				<div class="process" v-for="(item,index) in this.addproduct.processlist"  style="clear: both;">
					<div class="processdata">
						<i @click="delprocess(item)" style="font-size: 24px;margin-left: 10px; color: #FF0000;" class="el-icon-circle-close"></i>
					</div>
					<el-row>
						<el-col :span="8">
							<el-form-item prop="processImg">
							<el-upload
								class="avatar-uploader"
								:action="action"
								list-type="picture-card"
								accept="image/*"
								:auto-upload="true"
								:show-file-list="false"
								ref="upload"
								:on-success="proSuccess"
							>
								<img width="100%" height="100%" v-if="item.processImg" :src="item.processImg" />
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item prop="content">
								<el-input type="textarea" v-model="item.content" class="textarea" :maxlength="100" show-word-limit></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
				<el-button @click="addproductList" style="margin-left: 15%; font-size: 24px;" type="text" class="el-icon-circle-plus-outline"></el-button>
            </el-form-item>
        </el-form>
        <div class="product">
            <el-button @click="baocunprocess" class="baocun">保存</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'addprocess',
    data() {
        return {
            action: localStorage.getItem('actionUrl'),
            addproduct: {
                time: '',
                miaoshu: '',
				processlist:[{
					processImg: '',
					content: '',
					url: ''
				}]
				
            },
            rules: {
                time: [
                    {
                        required: true,
                        message: '请选择时间',
                        trigger: 'blur'
                    }
                ],
                processlist:[{
                  required: true,
                  message: '请选择历程图片和输入历程描述',
                  trigger: 'blur'
                }],
            },
            imgUrl: '',
			Time: '',
			index: 0,
			timecuo: ''
        };
    },
    mounted() {},
    methods: {
		addproductList(){
			this.addproduct.processlist.push({
				processImg: '',
				content:'',
				url: ''
			});
		},
        proSuccess(response, file, fileLsit) {
            if(response.code == 200){
				var list = this.addproduct.processlist[this.addproduct.processlist.length -1 ]
				list.processImg = localStorage.getItem('imgUrl') +  response.data;
				list.url = response.data;
			} else {
				return this.$message({
				  showClose: true,
				  message: '图片上传失败',
				  type: 'error'
				});
			}
        },
		dateTimesss(value){
			var datatimes = new Date(value);
			this.timecuo = datatimes.getTime(datatimes);
		},
		baocunprocess(){
			this.$refs.addproduct.validate((valid) => {
				if(valid){
					this.$confirm('是否确定添加企业历程', '温馨提示', {
					    confirmButtonText: '确定',
					    cancelButtonText: '取消',
					    type: 'warning'
					}).then(() => {
						let dataList = {
							companyId: parseInt(localStorage.getItem('loginData')),
							detail: this.addproduct.processlist,
							time: this.timecuo
						};
						const loading = this.$loading({
							lock: true,
							text: '发布中...',
							spinner: 'el-icon-loading',
							background: 'rgba(0, 0, 0, 0.7)'
						});
						this.$axios.post('api/partner/add/company/process', dataList).then((res) => {
							loading.close();
							if(res.status == 200 && res.data.code == 200){
								let data = res.data;
								this.$message({
									showClose: true,
									message: data.msg,
									type: 'success'
								});
								this.$router.push({
									path: './companyProcess'
								});
							} else {
								this.$message({
									showClose: true,
									message: data.msg,
									type: 'error'
								});
							}
						});
					});
				}
			});
		},
		delprocess(item){
			var index = this.addproduct.processlist.indexOf(item);
			if(index != -1){
				this.addproduct.processlist.splice(item, 1);
			}
		}
    }
}
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
.product .baocun {
    width: 90px;
    height: 30px;
    background: #2482d2;
    color: #fff;
    padding: 0;
    margin-left: 30%;
}
.addprocess .el-upload--text{
	width: 148px;
	height: 148px;
}
.avatar-uploader{
	float: left;
}
.el-textarea{
	margin-left: 10px;
}
.textarea{
	width: 350px;
}
.textarea .el-textarea__inner{
  height: 148px;
}
.process{
	width: 550px;
}
.processdata{
	text-align: right;
}
.processdata i{
	cursor: pointer;
}
</style>
