<template>
    <div class="enterprise" id="editEnterprise">
        <div class="add_from">
            <el-form ref="formData" :model="formData">
                <div class="add_Top">
                    <label>企业信息：</label>
                    <label class="GS_name">{{this.qyname}}</label>
                    <label class="GS_rz">已入驻</label>
                    <label class="GS_time">入驻日期: {{this.time}}</label>
                </div>
                <el-form-item label="企业名称:" :label-width="formLabelWidth">
                    <el-input class="formWidth" v-model="formData.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="企业简称:" :label-width="formLabelWidth">
                    <el-input class="formWidth" v-model="formData.remark" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="社会统一信用代码:" prop="code" :label-width="formLabelWidth">
                    <el-input class="formWidth" v-model="formData.code" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="营业执照:" prop="licenseUrl" :label-width="formLabelWidth">
                    <el-upload
                        class="avatar-uploader"
                        :action="action"
                        accept="image/*"
                        list-type="picture-card"
                        :show-file-list="false"
                        :on-change="licenseUpload"
                        :auto-upload="true"
                        :on-success="licenseSuccess"
                        ref="upload"
                    >
                        <img
                            width="100%"
                            height="100%"
                            v-if="formData.licenseUrl"
                            :src="formData.licenseUrl"
                            class="avatar"
                        />
                        <i
                            v-show="formData.licenseUrl == ''"
                            class="el-icon-plus yinyezhizhao avatar-uploader-icon"
                        ></i>
                    </el-upload>
                    <el-button @click="Uploadagain_a" type="text">重新上传</el-button>
                </el-form-item>
                <el-form-item label="所属行业:" prop="industry" :label-width="formLabelWidth">
                    <el-select class="formWidth" v-model="formData.industry" placeholder="请选择">
                        <el-option
                            v-for="item in optionIndus"
                            :label="item.name"
                            :key="item.id"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="企业类型:" prop="businessType" :label-width="formLabelWidth">
                    <el-select class="formWidth" v-model="formData.businessType" placeholder="请选择">
                        <el-option label="企业单位" :value="0"></el-option>
                        <el-option label="事业单位" :value="1"></el-option>
                        <el-option label="社会团体" :value="2"></el-option>
                        <el-option label="个体经营" :value="3"></el-option>
                        <el-option label="其他" :value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="注册地址:" prop="registerAddress" :label-width="formLabelWidth">
                    <el-cascader
                        class="formWidth"
                        v-model="formData.registerAddress"
                        :options="addressOptions"
                        placeholder="请选择"
                        ref="cascader"
                    ></el-cascader>
                    <label style="margin-left: 30px;">详细地址:</label>
                    <el-input
                        class="formWidth inputdasd"
                        v-model="formData.registerAddressDetail"
                        placeholder="请输入详细地址"
                    ></el-input>
                </el-form-item>
                <el-form-item label="经营地址:" prop="address" :label-width="formLabelWidth">
                    <el-cascader
                        ref="cascaderAddr"
                        class="formWidth"
                        v-model="formData.address"
                        :options="addressOptions"
                        placeholder="请选择"
                        @change="manageData"
                    ></el-cascader>
                    <label style="margin-left: 30px;">详细地址:</label>
                    <el-input
                        class="formWidth inputdasd"
                        v-model="formData.addressDetail"
                        placeholder="请输入详细地址"
                    ></el-input>
                </el-form-item>
                <el-form-item label="注册资本:" prop="registerMoney" :label-width="formLabelWidth">
                    <el-input class="formWidth" v-model="formData.registerMoney"></el-input>
                    <label style="margin-left: 20px;">万</label>
                </el-form-item>
                <el-form-item label="成立日期:" prop="registerTime" :label-width="formLabelWidth">
                    <el-date-picker v-model="formData.registerTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="企业电话:" prop="serverPhone" :label-width="formLabelWidth">
                    <el-input class="formWidth" v-model="formData.serverPhone"></el-input>
                </el-form-item>
                <el-form-item label="企业背景图:" prop="backgroundImage" :label-width="formLabelWidth">
                    <el-upload
                        class="avatar-uploader"
                        :action="action"
                        accept="image/*"
                        list-type="picture-card"
                        :on-change="backgroundUpload"
                        :auto-upload="true"
                        :on-success="backdropSuccess"
                        :show-file-list="false"
                        ref="upload"
                    >
                        <img
                            v-if="formData.backgroundImage"
                            :src="formData.backgroundImage"
                            class="avatar bgImage uploadIed"
                        />
                    </el-upload>
                    <el-button @click="Uploadagain_b" type="text">重新上传</el-button>
                    <label class="text">（企业名片、背景展示用图）</label>
                </el-form-item>
                <el-form-item label="企业logo:" prop="logoUrl" :label-width="formLabelWidth">
                    <el-upload
                        class="avatar-uploader"
                        :action="action"
                        accept="image/*"
                        list-type="picture-card"
                        :on-change="logoUpload"
                        :auto-upload="true"
                        :show-file-list="false"
                        ref="upload"
                    >
                        <img
                            v-if="formData.logoUrl"
                            :src="formData.logoUrl"
                            class="avatar logoImg uploadIed"
                        />
                    </el-upload>
                    <el-button @click="Uploadagain_c" type="text">重新上传</el-button>
                    <label class="text">（企业名片、背景展示用图）</label>
                </el-form-item>
                <div class="add_Top">企业法人</div>
                <el-form-item label="法人姓名:" prop="legal" :label-width="formLabelWidth">
                    <el-input class="formWidth" v-model="formData.legal"></el-input>
                </el-form-item>
                <el-form-item label="身份证号:" prop="identityId" :label-width="formLabelWidth">
                    <el-input class="formWidth" v-model="formData.identityId"></el-input>
                </el-form-item>
                <el-form-item label="身份证图片:" prop="frontImage" :label-width="formLabelWidth">
                    <el-upload
                        class="avatar-uploader"
                        :action="action"
                        list-type="picture-card"
                        :on-change="frontIUpload"
                        :auto-upload="true"
                        accept="image/*"
                        :show-file-list="false"
                        :on-success="frontImageSuccess"
                        ref="upload"
                    >
                        <img
                            v-if="formData.frontImage"
                            :src="formData.frontImage"
                            class="avatar frontImage uploadIed"
                        />
                    </el-upload>
                    <el-button @click="Uploadagain_d" type="text">重新上传</el-button>
                </el-form-item>
                <!-- 身份证背图 -->
                <el-form-item label prop="backImage" :label-width="formLabelWidth">
                    <el-upload
                        class="avatar-uploader"
                        :action="action"
                        list-type="picture-card"
                        :on-change="backUpload"
                        :auto-upload="true"
                        accept="image/*"
                        :show-file-list="false"
                        :on-success="backImageSuccess"
                        ref="upload"
                    >
                        <img
                            v-if="formData.backImage"
                            :src="formData.backImage"
                            class="avatar backImage uploadIed"
                        />
                    </el-upload>
                    <el-button @click="Uploadagain_e" type="text">重新上传</el-button>
                </el-form-item>
                <div class="add_Top">企业账号信息</div>
                <el-form-item label="账号类型:" prop="bankType" :label-width="formLabelWidth">
                    <el-select class="formWidth" v-model="formData.bankType" placeholder="请选择">
                        <el-option label="对公" :value="0"></el-option>
                        <el-option label="对私" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收款账号:" prop="bankNumber" :label-width="formLabelWidth">
                    <el-input
                        class="formWidth"
                        v-model="formData.bankNumber"
                        placeholder="请输入"
                        @change="bramkAuccent"
                    ></el-input>
                </el-form-item>
                <el-form-item label="开户银行:" prop="depositBank" :label-width="formLabelWidth">
                    <!-- <el-select class="formWidth" v-model="formData.depositBank" placeholder="请选择">
                        <el-option label="中国工商银行" value="中国工商银行"></el-option>
                        <el-option label="中国银行" value="中国银行"></el-option>
                        <el-option label="建设银行" value="建设银行"></el-option>
                        <el-option label="农业银行" value="农业银行"></el-option>
                    </el-select>-->
                    <el-input class="formWidth" v-model="formData.depositBank" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="开户网点:" prop="branch" :label-width="formLabelWidth">
                    <el-input class="formWidth" v-model="formData.branch" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <div style="width: 100%;">
                <el-button @click="SaveChanges" class="addBut">保存更改</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import address from '../../../api/address.json';
import axios from 'axios';
// import brank from '../../../api/brank.json';
import { regionData } from 'element-china-area-data';
export default {
    name: 'editEnterprise',
    data() {
        return {
            action: localStorage.getItem('actionUrl'),
            qyname: '',
            formLabelWidth: '220px',
            addressOptions: address,
            time: '',
            formData: {
                name: '',
                remark: '',
                code: '',
                licenseUrl: '',
                industry: '',
                registerAddress: '',
                registerAddressDetail: '',
                address: [],
                identityId: '',
                addressDetail: '',
                registerMoney: '',
                registerTime: '',
                backgroundImage: '',
                legal: '',
                logoUrl: '',
                frontImage: '',
                backImage: '',
                serverPhone: '',
                depositBank: '',
                branch: '',
                bankNumber: '',
                file: {}
            },
            businessUrl: '',
            bgUrl: '',
            qiyelogoUrl: '',
            frontUrl: '',
            backUrl: '',
            BGurl: '',
            BUSurl: '',
            LOGOurl: '',
            FRONTurl: '',
            BACKurl: '',
            province: '',
            city: '',
            region: '',
            optionIndus: []
        };
    },
    created() {
        this.addressOptions = address;
    },
    mounted() {
        this.huixian();
        this.getindustryList();
        this.manageData();
    },
    methods: {
        bramkAuccent(value) {
            console.log(value);
            if (value != '') {
                // "https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo=银行卡卡号&cardBinCheck=true"
                axios
                    .get(
                        'https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo=' +
                            value +
                            '&cardBinCheck=true'
                    )
                    .then((res) => {
                        console.log(res);
                    });
            }
        },

        Uploadagain_a() {
            document.querySelector('.yinyezhizhao').click();
        },
        Uploadagain_b() {
            document.querySelector('.bgImage').click();
        },
        Uploadagain_c() {
            document.querySelector('.logoImg').click();
        },
        Uploadagain_d() {
            document.querySelector('.frontImage').click();
        },
        Uploadagain_e() {
            document.querySelector('.backImage').click();
        },
        // 查询行业
        getindustryList() {
            this.$axios.get('admin/industry/list').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.optionIndus = data.data;
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
        },
        manageData() {
            var thsAreaCode = this.$refs.cascaderAddr;
            if (this.formData.address.length == 2) {
                this.province = '';
                this.city = this.formData.address[0];
                this.region = this.formData.address[1];
            } else if (this.formData.address.length == 3) {
                this.province = this.formData.address[0];
                this.city = this.formData.address[1];
                this.region = this.formData.address[2];
            }
        },
        // 图片改变时
        licenseUpload(file, fileList) {
            var url = window.URL.createObjectURL(file.raw);
            this.formData.licenseUrl = url;
            this.formData.file = file;
        },
        frontIUpload(file, fileList) {
            var url = window.URL.createObjectURL(file.raw);
            this.formData.frontImage = url;
            this.formData.file = file;
        },
        backUpload(file, fileList) {
            var url = window.URL.createObjectURL(file.raw);
            this.formData.backImage = url;
            this.formData.file = file;
        },
        logoUpload(file, fileList) {
            var url = window.URL.createObjectURL(file.raw);
            this.formData.logoUrl = url;
            this.formData.file = file;
        },
        backgroundUpload(file, fileList) {
            var url = window.URL.createObjectURL(file.raw);
            this.formData.backgroundImage = url;
            this.formData.file = file;
        },

        // 营业 图片上传成功的回掉
        licenseSuccess(response, file, fileList) {
            if (response.code == 200) {
                this.businessUrl = response.data;
                this.formData.licenseUrl = localStorage.getItem('imgUrl') + response.data;
            }
        },
        // 背景图上传成功
        backdropSuccess(response, file, fileList) {
            if (response.code == 200) {
                this.bgUrl = response.data;
            }
        },
        // 企业logo
        logoSuccess(response, file, fileList) {
            if (response.code == 200) {
                this.qiyelogoUrl = response.data;
            }
        },
        // 身份证
        frontImageSuccess(response, file, fileList) {
            if (response.code == 200) {
                this.frontUrl = response.data;
            }
        },
        // 身份证背面
        backImageSuccess(response, file, fileList) {
            if (response.code == 200) {
                this.backUrl = response.data;
            }
        },

        SaveChanges() {
            this.$confirm('是否确定编辑企业【' + this.formData.name + '】的信息?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let dataD = {
                    name: this.formData.name,
                    remark: this.formData.remark,
                    code: this.formData.code,
                    industry: this.formData.industry,
                    registerAddress: this.formData.registerAddress.join('') + this.formData.registerAddressDetail,
                    address: this.formData.address.join('') + this.formData.addressDetail,
                    registerMoney: this.formData.registerMoney * 1000000,
                    registerTime: this.formData.registerTime,
                    identityId: this.formData.identityId,
                    licenseUrl: this.businessUrl || this.BUSurl,
                    backgroundImage: this.bgUrl || this.BGurl,
                    logoUrl: this.qiyelogoUrl || this.LOGOurl,
                    frontImage: this.frontUrl || this.FRONTurl,
                    backImage: this.backUrl || this.BACKurl,
                    legal: this.formData.legal,
                    serverPhone: this.formData.serverPhone,
                    depositBank: this.formData.depositBank,
                    branch: this.formData.branch,
                    bankNumber: this.formData.bankNumber,
                    province: this.province,
                    region: this.region,
                    city: this.city,
                    industryId: parseInt(localStorage.getItem('industryId')),
                    id: parseInt(localStorage.getItem('loginData'))
                };
                const loading = this.$loading({
                    lock: true,
                    text: '编辑中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios.post('admin/company/add', dataD).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.$router.push({
                                path: './editDatetl'
                            });
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
            });
        },
        huixian() {
            let id = this.$route.query.id;
            this.$axios.get('admin/company/info/' + id).then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    this.data = data.data;
                    if (data.code == 200) {
                        this.qyname = data.data.name;
                        this.formData = data.data;
                        // 背景图
                        this.BGurl = data.data.backgroundImage;
                        // 营业
                        this.BUSurl = data.data.licenseUrl;
                        // logo
                        this.LOGOurl = data.data.logoUrl;
                        // 正面
                        this.FRONTurl = data.data.frontImage;
                        // 反面
                        this.BACKurl = data.data.backImage;
                        var date = new Date(parseInt(data.data.time));
                        var GS_time =
                            date.getFullYear() +
                            '-' +
                            (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                            '-' +
                            date.getDate();
                        this.time = GS_time;
                        this.formData.backgroundImage = localStorage.getItem('imgUrl') + this.formData.backgroundImage;
                        this.formData.licenseUrl = localStorage.getItem('imgUrl') + this.formData.licenseUrl;

                        this.formData.logoUrl = localStorage.getItem('imgUrl') + this.formData.logoUrl;
                        this.formData.frontImage = localStorage.getItem('imgUrl') + data.data.frontImage;
                        this.formData.backImage = localStorage.getItem('imgUrl') + data.data.backImage;
                        this.formData.bankType = data.data.bankType;
                        this.formData.registerMoney = data.data.registerMoney / 1000000;
                        this.formData.businessType = data.data.businessType;
                        var adsad = data.data.address;
                        let sdasdsad = adsad.substring(adsad.lastIndexOf('区'));
                        this.formData.addressDetail = sdasdsad.substr(1);
                        var reg = /.+?(省|市|自治区|自治州|县|区)/g;
                        let register = data.data.registerAddress;
                        var bbb = register.substring(register.lastIndexOf('区'));
                        this.formData.registerAddressDetail = bbb.substr(1);
                        this.formData.registerAddress = Array.from(new Set(register.match(reg)));
                        this.formData.address = [data.data.province, data.data.city, data.data.region];

                        this.manageData();
                    } else {
                        // this.$message({
                        // 	showClose: true,
                        // 	message: data.msg,
                        // 	type: 'error'
                        // });
                        console.log('查询失败');
                    }
                } else {
                    // this.$message({
                    // 	showClose: true,
                    // 	message: data.msg,
                    // 	type: 'error'
                    // });
                    console.log('查询失败');
                }
            });
        }
    }
};
</script>

<style>
.enterprise {
    width: 100%;
    box-sizing: border-box;
}

.GS_rz {
    margin-left: 30%;
    color: #109955;
}
.GS_time {
    float: right;
    margin-right: 30px;
    color: #109955;
}
.add_Top {
    width: 100%;
    margin: 0 auto;
    height: 45px;
    background: #fafbfa;
    margin-top: 10px;
    margin-bottom: 50px;
    line-height: 45px;
    font-size: 14px;
    padding-left: 20px;
}

.add_from {
    width: 100%;
}
.add_from .el-form-item {
    padding-left: 15%;
    padding-top: 0px;
}
.el-input {
    width: 194px;
}
.formWidth {
    width: 210px;
}
.formWidth.inputdasd {
    width: 210px;
    margin-left: 5px;
}
.formWidth .el-input__inner {
    width: 210px;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-radius: 0px;
    border-bottom: 1px solid #c1c1c1;
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
.enterprise .addBut {
    width: 90px;
    height: 30px;
    line-height: 15px;
    background: #2482d2;
    color: #fff;
    border-radius: 8px;
    margin-left: 30%;
}
.enterprise .uploadIed {
    width: 148px;
    height: 148px;
}
.enterprise .el-form-item__label {
    text-align: right;
}
</style>
