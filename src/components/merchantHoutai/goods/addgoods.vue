<template>
	<div class="addgoods" id="addgoods">
		<div class="goodstop"><label>填写发布的商品信息</label></div>
		<div class="" style="width: 100%; height: 30px;"></div>
		<el-steps :active="active" simple style="width: 90%; margin: 0 auto;">
			<el-step title="商品描述" icon="iconfont icon-1"></el-step>
			<el-step title="商品属性" icon="iconfont icon-21"></el-step>
			<el-step title="商品状态" icon="iconfont icon-31"></el-step>
		</el-steps>
		<div class="" style="width: 100%; height: 20px;"></div>
		<el-form :model="addgood" :rules="rules" ref="addgood" style="width: 100%">
			<el-form-item label="封面:" v-show="active==1" prop="fmImgUrl" :label-width="labelWidth">
				<el-upload
					class="avatar-uploader"
					:action="action"
					accept="image/*"
					list-type="picture-card"
					:on-change="changeUpload"
					:auto-upload="true"
					:show-file-list="false"
					:on-success="fmSuccess"
					ref="uploadimg"
				>
					<img width="100%" height="100%" v-if="addgood.fmImgUrl" :src="addgood.fmImgUrl"/>
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="上传商品视频:" v-show="active==1" prop="spshipin" :label-width="labelWidth">
				<el-upload
					class="upload-demo"
					:action="actionshipin"
					list-type="list"
					accept="video/*"
					:on-change="changeUploadshiping"
					:on-success="spshipinSuccess"
					:auto-upload="true"
					:show-file-list="false"
					ref="uploads"
				>
					<el-button v-if="addgood.spshipin == ''" size="small" type="primary">点击上传</el-button>
					<video
						v-else
						ref="videoPlayer"
						width="400"
						height="200"
						controls
						controlslist="nodownload"
						:src="addgood.spshipin"
						class="video"
					>
					</video>
				</el-upload>
			</el-form-item>
			<el-form-item label="上传商品名称:" v-show="active==1" prop="shopName" :label-width="labelWidth">
				<el-input class="imputfrom" v-model="addgood.shopName" placeholder="输入发布的商品名称"></el-input>
			</el-form-item>
			<el-form-item label="商品主图:" v-show="active==1" prop="zhuimgUrl" :label-width="labelWidth">
				<label style="color: #C1C1C1;" class="">(轮播展示图)</label>
				<el-upload
					class="avatar-uploader"
					:action="action"
					list-type="picture-card"
					accept="image/*"
					:limit="5"
					:on-change="changeUpload"
					:auto-upload="true"
					:on-success="imgUploadSuccess"
					:on-remove="removeUpload"
					ref="upload"
					multiple
				>
					<i class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="商品详情:" v-show="active==1" prop="shoppdetail" :label-width="labelWidth">
				<el-upload
				    :with-credentials='true'
				    multiple
				    class="quill-upload"
				    :action="action"
				    style="display: none;width:0;"
				    :show-file-list="false"
					accept="image/*"
				    :on-success="success"
				    :before-upload="beforeAvatarUpload"
				    >
				      <i class="el-icon-upload"></i>
				    </el-upload>
				    <quill-editor
				        ref="myQuillEditor"
				        :content='content'
				        v-model="addgood.shoppdetail"
				        :options="editorOption"
					></quill-editor>
			</el-form-item>
			<el-form-item label="商品库存:" v-show="active==1" prop="shoppkucun" :label-width="labelWidth">
				<el-input v-model.number="addgood.shoppkucun" placeholder="请输入商品的库存数"></el-input>
			</el-form-item>
			<el-form-item label="库存预警值:" v-show="active==1" prop="kucunWarning" :label-width="labelWidth">
				<el-input v-model.number="addgood.kucunWarning" placeholder="低于设置值将提醒补货"></el-input>
			</el-form-item>
			<el-form-item label="商品售价(元):" v-show="active==1" prop="salesPrice" :label-width="labelWidth">
				<el-input v-model.number="addgood.salesPrice" placeholder="请输入商品的销售价格"></el-input>
			</el-form-item>
			<el-form-item label="限购数量:" v-show="active==1" prop="xgNumber" :label-width="labelWidth">
				<label style="color: #A4A4A4;">（限每人购买的数量）</label>
				<el-input v-model="addgood.xgNumber" placeholder="默认不限"></el-input>
			</el-form-item>
			<el-form-item label="商品单位:" v-show="active==1" prop="shoppDanwei" :label-width="labelWidth">
				<el-input v-model="addgood.shoppDanwei" placeholder="请输入商品单位(如 件、张、份等)"></el-input>
			</el-form-item>
			<el-form-item label="商品货号:" v-show="active==1" prop="shoppHuohao" :label-width="labelWidth">
				<el-input v-model="addgood.shoppHuohao" placeholder="请输入商品货号"></el-input>
			</el-form-item>
			<el-form-item label="商品参数:" v-show="active==1" prop="parameter" :label-width="labelWidth">
				<label style="color: #A4A4A4;">（如：保质期、材质、套餐内容等）</label>
				<div class="addcanshu" v-for="item in this.addgood.parameter" :key="item.index">
					<el-form-item label="参数名称:" class="cangshu" :label-width="labelwidth">
						<el-input v-model="item.paramKey" placeholder="请输入商品参数"></el-input>
					</el-form-item>
					<el-form-item label="参数详情:" :label-width="labelwidth">
						<el-input v-model="item.paramValue" class="textarea" type="textarea" :show-word-limit="true" maxlength="200"
						 placeholder="请输入商品参数详情"></el-input>
					</el-form-item>
				</div>
				<el-form-item v-show="active==1" :label-width="labelwidth">
					<el-button class="addcanshudata" @click="addParameter " type="text"><i class="el-icon-circle-plus-outline"></i>添加新的参数</el-button>
				</el-form-item>
				<el-button class="xiayibu" @click="xiayibua">下一步</el-button>
			</el-form-item>
			
			
			<!-- 商品属性 -->
			<el-form-item label="商品规格:" prop="guigebioati" v-show="active==2" :label-width="labelWidth">
				<label style="color: #A4A4A4;">（如：版本、套餐等）</label>
				<div class="addcanshu">
					<el-form-item label="主规格标题:"  :label-width="labelwidth">
						<el-input v-model="addgood.guigebioati" placeholder="输入影响价格规格标题，如套餐等"></el-input>
						<el-form-item class="guige" v-for="item in addgood.prodAttrList" prop="prodAttrList" :key="item.index">
							<el-form-item label="主规格名称:" :label-width="labelwidth">
								<el-input class="fl" v-model="item.name" placeholder="输入主规格名称，如套餐等"></el-input>
							</el-form-item>
							<el-form-item label="单价:" :label-width="labelwidth">
								<el-input v-model="item.price" placeholder="输入商品单价，如套餐等"></el-input>
							</el-form-item>
						</el-form-item>
						<el-button @click="addzhuSpec" class="addxinguieg" type="text"><i class="el-icon-circle-plus-outline"></i>添加新的主规格</el-button>
					</el-form-item>
					<div class="attrss">
						<el-form-item label="副规格标题:" v-for="item in addgood.prodAttrSubList" :key="item.index" :label-width="labelwidth">
							<el-input v-model="item.subTitle" placeholder="输入不影响价格规格标题，如套餐等"></el-input>
							<div class="guige">
								<el-form-item label="副规格名称:" v-for="(i,ind) in item.subName" :key="ind" :label-width="labelwidth">
									<el-input v-model="i.name" placeholder="输入副规格规格名称，如套餐一等"></el-input>
								</el-form-item>
								<el-button class="addfuguige" @click="addfuguigeName(item)" type="text"><i class="el-icon-circle-plus-outline"></i>添加新的副规格名称</el-button>
							</div>
						</el-form-item>
						<el-button class="fuguege" @click="addfuTitle" type="text"><i class="el-icon-circle-plus-outline"></i>添加新的副规格标题</el-button>
					</div>
				</div>
				<el-button class="shangyibu" @click="shangyibu">上一步</el-button>
				<el-button class="xiayibu" @click="xiayibu">下一步</el-button>
			</el-form-item>
			
			<!-- 商品状态 -->
			<el-form-item label="" v-show="active==3" prop="" :label-width="labelwidth">
				<el-form-item label="保障描述:" prop="baozhuangmioashu" :label-width="labelWidth3">
					<el-checkbox-group v-model="addgood.baozhuangmioashu">
					    <el-checkbox label="1">假一赔十</el-checkbox>
					    <el-checkbox label="2">快速退款</el-checkbox>
					    <el-checkbox label="3">无忧退货</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="商品配送:" prop="shangpinpeisong" :label-width="labelWidth3">
					<el-checkbox-group v-model="addgood.shangpinpeisong">
					    <el-checkbox label="1">可自提</el-checkbox>
					    <el-checkbox label="2">可到店消费</el-checkbox>
					    <el-checkbox label="3">可配送</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="是否包邮:" prop="baoyou" :label-width="labelWidth3">
					<el-switch @change="shifubaoyou" v-model="addgood.baoyou" active-color="#13ce66" inactive-color="#a4a4a4" active-value="1" inactive-value="0">
					</el-switch>
					<label style="margin-left: 10px;">{{this.addgood.baoyou == 1?'是':'否'}}</label>
				</el-form-item>
				<el-form-item label="商品准备时间(分钟):" prop="zhuibeiTime" :label-width="labelWidth3">
					<el-input class="input" v-model="addgood.zhuibeiTime" placeholder="请输入"></el-input>
				</el-form-item>
			</el-form-item>
		</el-form>
		<el-button v-show="active == 3" class="xiayibu3" @click="fabushopping">发布</el-button>
	</div>
</template>

<script>
	import 'quill/dist/quill.core.css';
	import 'quill/dist/quill.snow.css';
	import 'quill/dist/quill.bubble.css';
	import {quillEditor, Quill} from 'vue-quill-editor'
	export default {
		// 工具栏配置
		name: 'addgoods',
		data() {
			const toolbarOptions = [
				['bold', 'italic', 'underline', 'strike'], // toggled buttons
				['blockquote', 'code-block'],
		
				[{ header: 1 }, { header: 2 }], // custom button values
				[{ list: 'ordered' }, { list: 'bullet' }],
				[{ script: 'sub' }, { script: 'super' }], // superscript/subscript
				[{ indent: '-1' }, { indent: '+1' }], // outdent/indent
				[{ direction: 'rtl' }], // text direction
		
				[{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
				[{ header: [1, 2, 3, 4, 5, 6, false] }],
		
				[{ color: [] }, { background: [] }], // dropdown with defaults from theme
				[{ font: [] }],
				[{ align: [] }],
				['image'],
				['clean'] // remove formatting button
		  ]
			return {
				action: localStorage.getItem('actionUrl'),
				actionshipin: localStorage.getItem('videoUrl'),
				active: 1,
				labelWidth: '220px',
				labelwidth: '90px',
				labelWidth3: '400px',
				content: '',
				fileList: [],
				editorOption: {
					placeholder:'请输入内容',
					modules: {
						toolbar: {
						container: toolbarOptions,
						handlers: {
							// 重写点击组件上的图片按钮要执行的代码
							'image': function (value) {
							document.querySelector('.quill-upload .el-icon-upload').click()
							}
						}
						}
					
					}
				},
				addgood: {
					fmImgUrl: '',
					spshipin: '',
					shopName: '',
					zhuimgUrl: '',
					shoppdetail: '',
					// content: '',
					shoppkucun: '',
					kucunWarning: '',
					salesPrice: '',
					xgNumber: '',
					shoppDanwei: '',
					shoppHuohao: '',
					parameter:[{
						paramKey: '',
						paramValue: '',
					}],
					// 商品属性
					guigebioati: '',
					prodAttrList: [{
						name: '',
						price: '',
					}],
					prodAttrSubList: [{
						subTitle: '',
						subName: [{
							name: ''
						}]
					}],
					// 商品状态
					baozhuangmioashu: [],
					shangpinpeisong: [],
					baoyou: '',
					zhuibeiTime: '',
					file: {}
				},
				rules: {
					fmImgUrl: [{
						required: true,
						message: '请选择封面图片',
						trigger: 'blur'
					}],
					shopName: [{
						required: true,
						message: '请输入商品名称',
						trigger: 'blur'
					}],
					zhuimgUrl: [{
						required: true,
						message: '请输入商品主图',
						trigger: 'blur'
					}],
					shoppdetail: [{
						required: true,
						message: '请输入商品详情',
						trigger: 'blur'
					}],
					content: [{
						required: true,
						message: '请输入商品详情',
						trigger: 'blur'
					}],
					shoppkucun: [{
						required: true,
						message: '请输入商品库存',
						trigger: 'blur'
					},{
						type: 'number',
						message: '库存只能是数字',
						trigger: 'change',
					}],
					kucunWarning: [{
						required: true,
						message: '请输入商品库存警告值',
						trigger: 'blur'
					},{
						type: 'number',
						message: '库存警告值只能是数字',
						trigger: 'change',
					}],
					salesPrice: [{
						required: true,
						message: '请输入商品销售价',
						trigger: 'blur'
					},{
						type: 'number',
						message: '商品售价只能是数字',
						trigger: 'change',
					}],
					shoppDanwei: [{
						required: true,
						message: '请输入商品单位',
						trigger: 'blur'
					}],
					shoppAttr: [{
						required: true,
						message: '商品属性不能为空',
						trigger: 'blur'
					}],
					baozhuangmioashu: [{
						required: true,
						message: '请选择保障描述',
						trigger: 'blur'
					}],
					shangpinpeisong: [{
						required: true,
						message: '请选择配送方式',
						trigger: 'blur'
					}],
					baoyou: [{
						required: true,
						message: '是否包邮',
						trigger: 'blur'
					}],
					zhuibeiTime: [{
						required: true,
						message: '请输入准备时间',
						trigger: 'blur'
					}],
					shangjia: [{
						required: true,
						message: '是否上架',
						trigger: 'blur'
					}],
				},
				imgList: [],
				imgUrl:[],
				zhushoppimgUrl:[],
				fmImageUrl: '',
				spshipinUrl: '',
				count:0,
				zhuguige: 0,
				fuguigeNbb: 0,
				titleInd: 0,
			}
		},
		mounted() {

		},
		watch: {
			serviceUrl(val){
				this.serviceUrl = val
			},
			getHeader(val){
				this.getHeader = val
			},
			editorData(val){
				this.$emit('getEditorData',this.editorData)
			},
			content(val){
				this.content =val
			}
		},
		methods: {
			beforeAvatarUpload(file) {
				this.$emit('beforeAvatarUpload',file)
			},
		  success(res,file,fileList){
				// res为图片服务器返回的数据
				// 获取富文本组件实例
				let quill = this.$refs.myQuillEditor.quill
				// 如果上传成功
				if (res.code == 200) {
					// 获取光标所在位置
					const pos=quill.selection.savedRange.index //这个得注意下，网上很多都是不对的
					// 插入图片到光标位置
					quill.insertEmbed(pos,'image',localStorage.getItem('imgUrl') + res.data)
					// 调整光标到最后
					quill.setSelection(length + 1)
				} else {
					this.$message({
						showClose: true,
						message: '详情图片上传失败',
						type: 'error'
					});
				}
				// loading动画消失
				this.quillUpdateImg = false
		  },
			changeUpload(file, fileList) {
				var url = window.URL.createObjectURL(file.raw);
				this.addgood.zhuimgUrl = file.url;
				this.addgood.file = file;
				this.imgList = fileList;
			},
			removeUpload(file, fileList) {
				this.imgList = fileList
			},
			changeUploadshiping(file, fileList) {
				var url = window.URL.createObjectURL(file.raw);
				this.addgood.spshipin = url;
			},
			// 封面图片上传成功回调
			fmSuccess(response, file, fileList) {
				if(response.code == 200){
					this.fmImageUrl = response.data;
					this.addgood.fmImgUrl =localStorage.getItem('imgUrl') + this.fmImageUrl
				} else {
					this.$message({
						showClose: true,
						message: '封面图片上传失败',
						type: 'error'
					});
				}
			},
			// 视频上传成功回调
			spshipinSuccess(response, file, fileList) {
				if (response.code == 200) {
					this.spshipinUrl = response.data;
					this.addgood.spshipin = localStorage.getItem('imgUrl') + response.data;
				} else {
					this.$message({
						showClose: true,
						message: '商品视频上传失败',
						type: 'error'
					});
				}
			},
			// 商品图片上传的回调
			imgUploadSuccess(response, file, fileList) {
				if(response.code == 200){
					this.imgUrl.push(response.data || '');
					if(this.imgUrl.length >= this.imgList.length){
						this.zhushoppimgUrl = this.imgUrl.join(',');
					}
				} else {
					this.$message({
						showClose: true,
						message: '商品图片上传失败',
						type: 'error'
					});
				}
			},
			// 下一步
			xiayibua() {
				this.active = this.active + 1;
			},
			// 下一步
			xiayibu() {
				this.active = this.active + 1;
			},
			// 上一步
			shangyibu() {
				this.active = this.active - 1;
			},
			// 发布商品
			fabushopping() {
				this.$refs.addgood.validate((valid) => {
					if (valid) {
						this.$confirm('是否确定发布【' + this.addgood.shopName + '】商品?', '温馨提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							var guigeArr = [];
							this.addgood.prodAttrList.forEach(function(val, index){
								guigeArr[index] = val;
								guigeArr[index].price = val.price * 100;
							})
							let data = {
								albumPics: this.imgUrl.join(','),
								count: this.addgood.xgNumber,
								detailHtml: this.addgood.shoppdetail,
								freeShipping: this.addgood.baoyou,
								logisticsIds: this.addgood.shangpinpeisong.join(','),
								lowStock: this.addgood.kucunWarning,
								makeTime: this.addgood.zhuibeiTime,
								name: this.addgood.shopName,
								parameter: JSON.stringify(this.addgood.parameter),
								pic: this.fmImageUrl,
								price: this.addgood.salesPrice * 100,
								prodAttrList: guigeArr, //主规格
								prodAttrSubList: this.addgood.prodAttrSubList, //副标题
								publishStatus: this.addgood.shangjia,
								serviceIds: this.addgood.baozhuangmioashu.join(','),
								sn: this.addgood.shoppHuohao,
								specTitle: this.addgood.guigebioati,
								stock: this.addgood.shoppkucun,
								unit: this.addgood.shoppDanwei,
								videoUrl: this.spshipinUrl
							};
							const loading = this.$loading({
								lock: true,
								text: '发布中...',
								spinner: 'el-icon-loading',
								background: 'rgba(0, 0, 0, 0.7)'
							});
							this.$axios.post('admin/product/adminAddProduct', data).then(res => {
								loading.close();
								if(res.status == 200){
									var data = res.data;
									if(data.code == 200){
										this.$message({
											showClose: true,
											message: data.msg,
											type: 'success'
										});
										this.$router.push({
											path: './goodsList'
										});
										this.$refs.addgood.resetFields();
										this.active = 1;
									} else{
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
						});
					}
				});
			},

			// 添加商品参数
			addParameter() {
				this.addgood.parameter.push({
					paramKey: '',
					paramValue: ''
				});
			},
			// 添加主规格
			addzhuSpec(){
				this.zhuguige += 1;
				if(this.zhuguige < 5){
					this.addgood.prodAttrList.push({
						name: '',
						price: '',
					});
				}
			},
			// 添加副规格名称
			addfuguigeName(item){
				var index = this.addgood.prodAttrSubList.indexOf(item);
				if(index != -1){
					this.titleInd += 1;
					item.subName.push({
						name: ''
					});
				}
			},
			// 添加副规格标题
			addfuTitle(){
				this.titleInd += 1;
				this.addgood.prodAttrSubList.push({
					subTitle: '',
					subName: [{
						name: ''
					}],
				});
			},
			shifubaoyou(){
				if(this.addgood.baoyou == 0){
					this.$router.push({
						path: './shippingfee'
					});
				}
			}
		}
	}
</script>

<style>
	.bgbba{
		display: none;
	}
	.fl {
		float: left;
	}
	
	.addgoods {
		width: 100%;
		box-sizing: border-box;
	}
	.el-upload--text{
		width: 80px;
		height: 30px;
		border: 0;
	}
	.goodstop {
		width: 100%;
		height: 45px;
		background-color: #FAFBFA;
		margin-top: 30px;
		line-height: 45px;
		font-size: 14px;
	}
	.el-form-item .el-form-item__label {
		text-align: right;
	}

	.addgoods .el-input .el-input__inner {
		width: 257px;
		border: 0;
		border-bottom: 1px solid #c1c1c1;
		border-radius: 0;
	}

	.editor {
		width: 850px;
	}
	.ql-container {
		height: 50px;
	}

	.textarea {
		width: 620px;
		height: 170px;
	}
	.textarea .el-textarea__inner{
		height: 170px;
	}

	.addcanshudata {
		margin-left: 280px;
	}

	.addgoods .xiayibu {
		margin-left: 340px;
		margin-top: 20px;
		width: 89px;
		height: 30px;
		color: #fff;
		border-radius: 8px;
		background-color: #0000FF;
	}

	.addgoods .shangyibu {
		margin-left: 30px;
		margin-top: 20px;
		width: 89px;
		height: 30px;
		color: #fff;
		border-radius: 8px;
		background-color: #0000FF;
	}

	.guige {
		padding-top: 20px;
		position: relative;
	}

	.addguige {
		position: absolute;
		left: 300px;
		top: 0px;
	}

	.addfuguige {
		margin-left: 115px;
	}

	.addgoods .shangyibu3 {
		margin-left: 380px;
		margin-top: 20px;
		width: 89px;
		height: 30px;
		color: #fff;
		border-radius: 8px;
		background-color: #0000FF;
	}

	.addgoods .xiayibu3 {
		margin-left: 650px;
		margin-top: -60px;
		width: 89px;
		height: 30px;
		color: #fff;
		border-radius: 8px;
		background-color: #0000FF;
	}
	.el-form-item .el-form-item {
	    margin-bottom: 15px;
	}
	.addcanshu{
		position: relative;
	}
	.addxinguieg{
		position: absolute;
		left: 360px;
		top: 90px;
	}
	.addcanshu .attrss{
		position: relative;
	}
	.attrss .fuguege{
		position: absolute;
		left: 430px;
		top: 30px;
	}
	.ql-editor img{
		width: 200px;
	}
	.quill-editor{
		width: 80%;
	}
</style>
