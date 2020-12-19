<template>
    <!-- 客户详情 -->
    <div
        class="kehuDetail"
        id="kehuDetail"
        v-loading="fullscreenLoading"
        :element-loading-text="loadingText"
        element-loading-background="rgba(0, 0, 0, 0.7)"
    >
        <div class="kehuDetail-top"><label style="margin-left: 20px">查看会员类型</label></div>
        <el-form :model="kehuDetaildata">
            <el-form-item label="头像:" label-width="230px">
                <img width="132" height="132" v-if="this.kehuDetaildata.kehuAvater" :src="this.kehuDetaildata.kehuAvater" />
            </el-form-item>
            <el-form-item label="手机号码:" label-width="230px">
                <el-input v-model="kehuDetaildata.kehuPhone" readonly class="kehuinput"></el-input>
            </el-form-item>
            <el-form-item label="昵称:" label-width="230px">
                <el-input v-model="kehuDetaildata.kehunickname" readonly class="kehuinput"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名:" label-width="230px">
                <el-input v-model="kehuDetaildata.kehuName" readonly class="kehuinput"></el-input>
            </el-form-item>
            <el-form-item label="性别:" label-width="230px">
                <el-input v-model="kehuDetaildata.kehuSex" readonly class="kehuinput"></el-input>
            </el-form-item>
            <el-form-item label="微信:" label-width="230px">
                <el-input v-model="kehuDetaildata.kehuWeChat" readonly class="kehuinput"></el-input>
            </el-form-item>
            <el-form-item label="邮件:" label-width="230px">
                <el-input v-model="kehuDetaildata.kehuMail" readonly class="kehuinput"></el-input>
            </el-form-item>
            <el-form-item label="客户类型:" label-width="230px">
                <el-input v-model="kehuDetaildata.kehuType" readonly class="kehuinput"></el-input>
            </el-form-item>
        </el-form>
        <div class="returnBtnKehu">
            <el-button @click="returnKehu" class="retrunKHBTN">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'kehuDetail',
    data() {
        return {
            size: 80,
            fullscreenLoading: false,
            loadingText: '加载中...',
            kehuDetaildata: {
                kehuAvater: '',
                kehuPhone: '',
                kehunickname: '',
                kehuPassword: '',
                kehuName: '',
                kehuSex: '',
                kehuAddress: '',
                kehuQQ: '',
                kehuWeChat: '',
                kehuMail: '',
                kehuType: ''
            }
        };
    },
	watch:{
		$route:'getDetailData'
	},
    mounted() {
        this.getDetailData(); 
	},
    methods: {
        returnKehu() {
            this.$router
                .push({
                    path: './kehuadmin'
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getDetailData() {
            var id = this.$route.query.id;
            var type = this.$route.query.type;
            this.$axios.get('admin/consumerManage/queryConsumerInfo?id=' + id).then((res) => {
                this.fullscreenLoading = false;
                if (res.status == 200) {
                    var data = res.data;
					console.log(data.data);
                    if (data.code == 200) {
						let zhengzhe = /^(https):/
						// let ddd = zhengzhe.test(data.data.avatar);
						if(zhengzhe.test(data.data.avatar)){
							this.kehuDetaildata.kehuAvater = data.data.avatar;
						} else {
							this.kehuDetaildata.kehuAvater = localStorage.getItem("imgUrl") + data.data.avatar;
						}
                        this.kehuDetaildata.kehuPhone = data.data.phoneNumber;
                        this.kehuDetaildata.kehunickname = data.data.nickname;
                        this.kehuDetaildata.kehuName = data.data.name;
                        this.kehuDetaildata.kehuSex = data.data.gender;
                        this.kehuDetaildata.kehuWeChat = data.data.wxNumber;
                        this.kehuDetaildata.kehuMail = data.data.email;
                        this.kehuDetaildata.kehuType = type;
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
.kehuDetail {
    box-sizing: border-box;
    padding: 20px;
}
.kehuDetail-top {
    width: 100%;
    height: 45px;
    background: #fafbfa;
    line-height: 45px;
}
.kehuinput .el-input__inner {
    border: 0;
    width: 200px;
}
.returnBtnKehu .retrunKHBTN {
    width: 150px;
    height: 30px;
    background: #2450d2;
    padding: 0;
    color: #ffffff;
    margin-left: 20%;
}
.kehuDetail .el-form-item__label{
	text-align: right;
}
</style>
