<template>
    <div class="enterprise">
        <div class="add_from">
            <div style="width: 1200px; clear: both; margin-top: 30px;">
                <!-- <el-button @click="editDetail" class="edit">编辑</el-button> -->
            </div>
            <el-form ref="addform" :model="addform">
                <div class="add_Top">
                    <label>企业信息</label>
                    <label class="GS_name" v-model="qyname">{{qyname}}</label>
                    <label class="GS_rz">已入驻</label>
                    <label class="GS_time" v-model="time">入驻日期: {{time}}</label>
                </div>
                <el-form-item label="企业名称:" :label-width="formLabelWidth">
                    <el-input
                        class="formWidth form"
                        v-model="addform.name"
                        placeholder="请输入"
                        disabled
                    ></el-input>
                </el-form-item>
                <el-form-item label="企业简称:" :label-width="formLabelWidth">
                    <el-input
                        class="formWidth form"
                        v-model="addform.remark"
                        placeholder="请输入"
                        disabled
                    ></el-input>
                </el-form-item>
                <el-form-item label="社会统一信用代码:" :label-width="formLabelWidth">
                    <el-input
                        class="formWidth form"
                        v-model="addform.code"
                        placeholder="请输入"
                        disabled
                    ></el-input>
                </el-form-item>
                <el-form-item label="营业执照:" prop="licenseUrl" :label-width="formLabelWidth">
                    <!-- <el-upload class="avatar-uploader" :action="action" :limit='1' list-type="picture-card" :on-change="changeUpload"
					 :auto-upload="false" :on-success="licenseSuccess" :on-remove="removeUpload" ref="upload" multiple disabled>
						<i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>-->
                    <!-- <div class="datu">
						<img v-model="addform.licenseUrl" src= "" />
                    </div>-->
                    <img
                        v-if="addform.licenseUrl"
                        width="100"
                        height="60"
                        :src="addform.licenseUrl"
                        class="avatar uploadImg"
                    />
                    <el-button type="text" @click="examineZZ">查看大图</el-button>
                </el-form-item>
                <el-form-item label="所属行业:" :label-width="formLabelWidth">
                    <el-input
                        class="formWidth form"
                        v-model="addform.industry"
                        placeholder="请选择"
                        disabled
                    >
                        <!-- <el-option value="IT"></el-option>
                        <el-option value="旅游"></el-option>-->
                    </el-input>
                </el-form-item>
                <!-- <el-form-item label="企业类型:" prop="type" :label-width="formLabelWidth">
					<el-input class="formWidth form" v-model="addform.type" disabled>
						<!-- <el-option value="IT"></el-option>
						<el-option value="旅游"></el-option>
					</el-input>
                </el-form-item>-->
                <el-form-item label="注册地址:" :label-width="formLabelWidth">
                    <el-input class="formWidth form" v-model="addform.registerAddress" disabled></el-input>
                </el-form-item>
                <el-form-item label="经营地址:" :label-width="formLabelWidth">
                    <el-input class="formWidth form" v-model="addform.address" disabled></el-input>
                </el-form-item>
                <el-form-item label="注册资本:" :label-width="formLabelWidth">
                    <el-input class="formWidth form" v-model="addform.registerMoney" disabled></el-input>
                    <label style="margin-left: 20px;">万</label>
                </el-form-item>
                <el-form-item label="成立日期:" prop="registerTime" :label-width="formLabelWidth">
                    <el-date-picker
                        prefix-icon="md-date_range"
                        v-model="addform.registerTime"
                        type="date"
                        class="formWidth form"
                        placeholder="选择日期"
                        disabled
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="企业电话:" prop="phone" :label-width="formLabelWidth">
                    <el-input class="formWidth form" v-model="addform.phone" disabled></el-input>
                </el-form-item>
                <el-form-item label="企业背景图:" prop="backgroundImage" :label-width="formLabelWidth">
                    <img
                        v-if="addform.backgroundImage"
                        width="100"
                        height="60"
                        :src="addform.backgroundImage"
                        class="avatar uploadImg"
                    />
                    <el-button type="text" @click="examineBG">查看大图</el-button>
                    <label class="text">（企业名片、背景展示用图）</label>
                </el-form-item>
                <div class="add_Top">企业法人</div>
                <el-form-item label="法人姓名:" prop="legal" :label-width="formLabelWidth">
                    <el-input class="formWidth form" v-model="addform.legal" disabled></el-input>
                </el-form-item>
                <el-form-item label="身份证号:" prop="identityId" :label-width="formLabelWidth">
                    <el-input class="formWidth form" v-model="addform.identityId" disabled></el-input>
                </el-form-item>
                <el-form-item label="身份证图片:" prop="papersImage" :label-width="formLabelWidth">
                    <img
                        v-if="addform.papersImage"
                        :src="addform.papersImage"
                        class="avatar uploadImg"
                    />
                    <el-button type="text">查看大图</el-button>
                </el-form-item>
                <!-- 身份证反面 -->
                <el-form-item label prop="papersImage" :label-width="formLabelWidth">
                    <el-button type="text">查看大图</el-button>
                </el-form-item>
                <el-form-item label="手机号码:" prop="serverPhone" :label-width="formLabelWidth">
                    <el-input class="formWidth form" v-model="addform.serverPhone" disabled></el-input>
                </el-form-item>
                <div class="add_Top">企业账号信息</div>
                <el-form-item label="账号类型:" prop="bankType" :label-width="formLabelWidth">
                    <el-select
                        class="formWidth form"
                        popper-class="select-option"
                        v-model="addform.bankType"
                        disabled
                    >
                        <el-option label="对私" :value="0"></el-option>
                        <el-option label="对公" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开户银行:" prop="depositBank" :label-width="formLabelWidth">
                    <el-input class="formWidth form" v-model="addform.depositBank" disabled></el-input>
                </el-form-item>
                <el-form-item label="开户网点:" prop="branch" :label-width="formLabelWidth">
                    <el-input class="formWidth form" v-model="addform.branch" disabled></el-input>
                </el-form-item>
                <el-form-item label="账号名称:" prop="accountname" :label-width="formLabelWidth">
                    <el-input class="formWidth form" v-model="addform.accountname" disabled></el-input>
                </el-form-item>
                <el-form-item label="收款账号:" prop="bankNumber" :label-width="formLabelWidth">
                    <el-input class="formWidth form" v-model="addform.bankNumber" disabled></el-input>
                </el-form-item>
            </el-form>
            <div style="width: 1200px; margin: 0 auto;">
                <el-button @click="returnIndex" v-show="loginData == 0" class="addBut">返回</el-button>
            </div>
            <el-dialog :visible.sync="dialogVisiblebg">
                <img width="100%" height="100%" :src="imageBGUrl" alt />
            </el-dialog>
            <el-dialog :visible.sync="dialogVisiblezz">
                <img width="100%" height="100%" :src="imageZZUrl" alt />
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            action: '#',
            formLabelWidth: '220px',
            qyID: '',
            fileList: '',
            dialogVisiblebg: false,
            dialogVisiblezz: false,
            qyname: '',
            time: '',
            addform: {
                name: '',
                remark: '',
                code: '',
                licenseUrl: '',
                industry: '',
                type: '企业单位',
                registerAddress: '',
                address: '',
                registerMoney: '',
                registerTime: '',
                phone: '',
                backgroundImage: '',
                legal: '',
                identityId: '',
                papersImage: '',
                serverPhone: '',
                bankType: '',
                depositBank: '',
                branch: '',
                accountname: '',
                bankNumber: ''
            },
            imageBGUrl: '',
            imageZZUrl: '',
            loginData: ''
        };
    },
    mounted() {
        this.editDatetl();
    },
    methods: {
        editDetail() {
            let adminId = this.$route.query.id;
            this.$router
                .push({
                    path: './editEnterprise',
                    query: {
                        adminId: adminId,
                        qyId: localStorage.getItem('loginData'),
                        formData: this.addform
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 查看背景大图
        examineBG() {
            this.dialogVisiblebg = true;
            var imageBGUrl = this.addform.backgroundImage;
            this.imageBGUrl = imageBGUrl;
        },
        // 执照
        examineZZ() {
            this.dialogVisiblezz = true;
            var imageZZUrl = this.addform.licenseUrl;
            this.imageZZUrl = imageZZUrl;
        },
        returnIndex() {
            this.$router
                .push({
                    path: './index'
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 查询企业信息
        editDatetl() {
            var id = this.$route.query.id;
            this.$axios.get('admin/company/info/' + id).then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.addform = data.data;
                        this.qyname = this.addform.name;
                        this.time = this.addform.time;
                        this.addform.backgroundImage = localStorage.getItem('imgUrl') + this.addform.backgroundImage;
                        this.addform.licenseUrl = localStorage.getItem('imgUrl') + this.addform.licenseUrl;
                    } else {
                        this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'error'
                        });
                        this.$router.push({
                            path: '/login'
                        });
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: data.msg,
                        type: 'error'
                    });
                    this.$router.push({
                        path: '/login'
                    });
                }
            });
        }

        //查询行业
    }
};
</script>

<style>
.clear {
    clear: both;
}

.edit {
    float: right;
    width: 66px;
    height: 22px;
    margin-top: -30px;
    line-height: 5px;
    color: #fff;
    background-color: #109955;
}

.datu {
    width: 200px;
    height: 120px;
    border: 1px solid #ccc;
}

.datu img {
    width: 100%;
    height: 100%;
}

.GS_name {
    margin-left: 50px;
}

.GS_rz {
    margin-left: 260px;
    color: #109955;
}

.GS_time {
    float: right;
    margin-right: 300px;
    color: #109955;
}

.add_Top {
    width: 1200px;
    margin: 0 auto;
    height: 45px;
    background: #fafbfa;
    margin-top: 30px;
    margin-bottom: 50px;
    line-height: 45px;
    font-size: 14px;
    padding-left: 20px;
}

.add_from {
    width: 1200px;
    margin: 0 auto;
}

.add_from .el-form-item {
    padding-left: 25%;
    padding-top: 0px;
}

.el-input {
    width: 194px;
}

.formWidth.form .el-input__inner {
    width: 210px;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-radius: 0px;
    border-bottom: 0px solid #c1c1c1;
    background: #ffffff;
    pointer-events: none;
}

.el-form-item__label {
    text-align: left;
}

.el-button {
    margin-left: 10px;
}

.text {
    font-size: 12px;
    color: #a4a4a4;
}

.uploadImg {
    width: 100px;
    height: 50px;
}

.addBut {
    width: 90px;
    height: 30px;
    line-height: 15px;
    background: #2482d2;
    color: #fff;
    border-radius: 8px;
    margin-left: 50%;
}
</style>
