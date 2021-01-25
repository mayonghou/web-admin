<template>
    <div class="enterprise" id="addEnterprise">
        <!-- <div class="add_Top">添加企业</div> -->
        <div class="add_from">
            <el-form ref="addform" :model="addform" :label-width="formLabelWidth">
                <div class="add_Top">企业信息</div>

                <el-form-item label="企业名称:" :label-width="formLabelWidth" prop="qiyeName">
                    <el-input class="formWidth" v-model="addform.qiyeName" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="企业简称:" :label-width="formLabelWidth" prop="qiyeJiancheng">
                    <el-input class="formWidth" v-model="addform.qiyeJiancheng" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="社会统一信用代码:" prop="creditCode" :label-width="formLabelWidth">
                    <el-input class="formWidth" v-model="addform.creditCode" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item
                    label="营业执照:"
                    prop="license"
                    accept="image/*"
                    :label-width="formLabelWidth"
                >
                    <el-upload
                        class="avatar-uploader"
                        :action="action"
                        list-type="picture-card"
                        :on-change="changeUpload"
                        :auto-upload="true"
                        :on-success="licenseSuccessa"
                        :on-remove="removeUpload"
                        ref="uploada"
                    >
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-button type="text">重新上传</el-button>
                </el-form-item>

                <el-form-item label="所属行业:" prop="industry" :label-width="formLabelWidth">
                    <el-select class="formWidth" v-model="addform.industry" placeholder="请选择">
                        <el-option
                            v-for="item in optionsas"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="企业类型:" prop="typeqiyeleixin" :label-width="formLabelWidth">
                    <el-select class="formWidth" v-model="addform.typeqiyeleixin">
                        <el-option
                            v-for="item in optionsqylx"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="注册地址:" prop="register" :label-width="formLabelWidth">
                    <el-cascader
                        class="formWidth"
                        v-model="addform.register"
                        :options="options"
                        @change="handleChange"
                    ></el-cascader>
                    <label style="margin-left: 20px">详细地址：</label>
                    <el-input
                        class="formWidth address"
                        v-model="addform.registeraddress"
                        placeholder="请输入"
                    ></el-input>
                </el-form-item>

                <el-form-item label="经营地址:" prop="manageAddress" :label-width="formLabelWidth">
                    <el-cascader
                        class="formWidth"
                        v-model="addform.manageAddress"
                        :options="options"
                        @change="handleChange"
                    ></el-cascader>
                    <label style="margin-left: 20px">详细地址：</label>
                    <el-input
                        class="formWidth address"
                        v-model="addform.manageaddressed"
                        placeholder="请输入"
                    ></el-input>
                </el-form-item>

                <el-form-item label="注册资本:" prop="capital" :label-width="formLabelWidth">
                    <el-input class="formWidth" v-model.number="addform.capital" placeholder="请输入"></el-input>
                    <label style="margin-left: 20px">万</label>
                </el-form-item>

                <el-form-item label="成立日期:" prop="setupTime" :label-width="formLabelWidth">
                    <el-date-picker v-model="addform.setupTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>

                <el-form-item label="企业背景图:" prop="backdrop" :label-width="formLabelWidth">
                    <el-upload
                        class="avatar-uploader"
                        :action="action"
                        :limit="1"
                        list-type="picture-card"
                        :on-change="changeUpload"
                        :auto-upload="true"
                        :on-success="backdropSuccess"
                        :on-remove="removeUpload"
                        ref="uploadb"
                        multiple
                    >
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-button type="text">重新上传</el-button>
                    <label class="text">（企业名片、背景展示用图）</label>
                </el-form-item>

                <el-form-item label="企业LOGO:" prop="backlogo" :label-width="formLabelWidth">
                    <el-upload
                        class="avatar-uploader"
                        :action="action"
                        :limit="1"
                        list-type="picture-card"
                        :on-change="changeUpload"
                        :auto-upload="true"
                        :on-success="backlogoSuccess"
                        :on-remove="removeUpload"
                        ref="uploadb"
                        multiple
                    >
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-button type="text">查看大图</el-button>
                    <label class="text">（企业LOGO、背景展示用图）</label>
                </el-form-item>

                <div class="add_Top">企业法人信息</div>
                <el-form-item label="法人姓名:" prop="legalPerson" :label-width="formLabelWidth">
                    <el-input class="formWidth" v-model="addform.legalPerson" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="身份证号:" prop="legalPersona" :label-width="formLabelWidth">
                    <el-input class="formWidth" v-model="addform.legalPersona" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="身份证正面:" prop="papersImage" :label-width="formLabelWidth">
                    <el-upload
                        class="avatar-uploader"
                        :action="action"
                        :limit="1"
                        list-type="picture-card"
                        :on-change="changeUpload"
                        :auto-upload="true"
                        :on-success="licenseSuccessb"
                        :on-remove="removeUpload"
                        ref="uploadc"
                        multiple
                    >
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-button type="text">身份证正面图片</el-button>
                </el-form-item>

                <el-form-item label="身份证反面" prop="papersImages" :label-width="formLabelWidth">
                    <el-upload
                        class="avatar-uploader"
                        :action="action"
                        :limit="1"
                        list-type="picture-card"
                        :on-change="changeUpload"
                        :auto-upload="true"
                        :on-success="licenseSuccessc"
                        :on-remove="removeUpload"
                        ref="uploadd"
                        multiple
                    >
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-button type="text">身份证反面图片</el-button>
                </el-form-item>

                <el-form-item label="手机号码:" prop="cellphone" :label-width="formLabelWidth">
                    <el-input
                        class="formWidth"
                        onkeyup="value=value.replace(/[^\d]/g,'')"
                        v-model="addform.cellphone"
                        placeholder="请输入"
                    ></el-input>
                </el-form-item>

                <div class="add_Top">企业账户信息</div>
                <el-form-item label="账号类型:" prop="zhanhaolx" :label-width="formLabelWidth">
                    <el-select class="formWidth" v-model="addform.zhanhaolx" placeholder="请选择账号类型">
                        <el-option
                            v-for="item in optionsa"
                            :key="item.valuea"
                            :label="item.labela"
                            :value="item.valuea"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="开户银行:" prop="kaihuyinhan" :label-width="formLabelWidth">
                    <el-select
                        class="formWidth"
                        v-model="addform.kaihuyinhan"
                        placeholder="请选择账号类型"
                    >
                        <el-option
                            v-for="item in optionsb"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="开户网点:" :label-width="formLabelWidth" prop="kaihuwang">
                    <el-input class="formWidth" v-model="addform.kaihuwang" placeholder="请输入开户网点"></el-input>
                </el-form-item>

                <el-form-item label="收款账号:" :label-width="formLabelWidth" prop="shoukuanzh">
                    <el-input class="formWidth" v-model="addform.shoukuanzh" placeholder="请输入收款账号"></el-input>
                </el-form-item>
            </el-form>

            <div class="addEnterprise">
                <el-button @click="ReturnToEnterpriseList" class="addBut">取消</el-button>
                <el-button @click="addButton" class="addBut">新增企业</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import address from '../../../api/address.json';
export default {
    name: '',
    data() {
        return {
            action: localStorage.getItem('actionUrl'),
            formLabelWidth: '220px',
            // fileList:'',
            addform: {
                qiyeName: '', // 企业名称
                qiyeJiancheng: '', // 企业简称
                license: '', // 营业执照
                industry: '', // 所属行业
                typeqiyeleixin: '', // 企业类型
                creditCode: '', // 社会统一信用代码
                register: [], // 注册地址
                registeraddress: '', // 注册地址输入部分
                manageAddress: [], // 经营地址
                manageaddressed: '', // 经营地址输入部分
                capital: '', // 注册资本
                setupTime: '', // 成立日期
                backdrop: '', // 企业背景图
                backlogo: '', // 企业LOGO
                legalPerson: '', // 法人姓名
                legalPersona: '', // 身份证号
                papersImage: '', // 身份证正面图
                papersImages: '', // 身份证反面图
                cellphone: '', // 手机号码
                zhanhaolx: '', // 账号类型
                kaihuyinhan: '', // 开户银行
                kaihuwang: '', // 开户网点
                shoukuanzh: '', // 收款账号
                province: '', // 省
                city: '', // 市
                region: '' // 区
            },
            // 注册地址
            options: [
                {
                    value: 'zhinan',
                    label: '贵州省',
                    children: [
                        {
                            value: 'shejiyuanze',
                            label: '贵阳市',
                            children: [
                                {
                                    value: 'yizhi',
                                    label: '观山湖区'
                                },
                                {
                                    value: 'fankui',
                                    label: '花果园'
                                },
                                {
                                    value: 'xiaolv',
                                    label: '云岩区'
                                }
                            ]
                        },
                        {
                            value: 'daohang',
                            label: '毕节市',
                            children: [
                                {
                                    value: 'cexiangdaohang',
                                    label: '七星关区'
                                },
                                {
                                    value: 'dingbudaohang',
                                    label: '织金县'
                                }
                            ]
                        }
                    ]
                }
            ],
            // 账号类型
            optionsa: [
                {
                    valuea: '0',
                    labela: '对公'
                },
                {
                    valuea: '1',
                    labela: '对私'
                }
            ],
            valuea: '',
            // 开户银行
            optionsb: [
                {
                    value: '0',
                    label: '中国银行'
                },
                {
                    value: '1',
                    label: '中国农业银行'
                },
                {
                    value: '2',
                    label: '中国建设银行'
                },
                {
                    value: '3',
                    label: '中国邮政银行'
                },
                {
                    value: '4',
                    label: '工商银行'
                },
                {
                    value: '5',
                    label: '招商银行'
                },
                {
                    value: '6',
                    label: '工商银行'
                }
            ],
            valueb: '',
            // 所属行业
            optionsas: [],
            // 企业类型
            optionsqylx: [
                {
                    value: '0',
                    label: '企业单位'
                },
                {
                    value: '1',
                    label: '事业单位'
                },
                {
                    value: '2',
                    label: '社会团体'
                },
                {
                    value: '3',
                    label: '其他'
                }
            ]
        };
    },
    methods: {
        // 删除图片
        removeUpload() {},
        // 图片改变时
        changeUpload(file, fileList) {
            // console.log(file);
            // console.log(file.url);
        },
        // 营业执照图片上传成功的回掉
        licenseSuccessa(response, file, fileList) {
            this.addform.license = response.data;
        },
        // 企业背景图上传成功的回掉
        backdropSuccess(response, file, fileList) {
            this.addform.backdrop = response.data;
        },
        // 企业LOGO图片上传成功的回掉
        backlogoSuccess(response, file, fileList) {
            this.addform.backlogo = response.data;
        },
        // 身份证正面图片上传成功的回掉
        licenseSuccessb(response, file, fileList) {
            this.addform.papersImage = response.data;
        },
        // 身份证反面图片上传成功的回掉
        licenseSuccessc(response, file, fileList) {
            this.addform.papersImages = response.data;
        },

        handleChange() {},
        // 添加时回调
        addButton() {
            var addformObj = new Object();
            (addformObj.name = this.addform.qiyeName), // 企业名称
                (addformObj.remark = this.addform.qiyeJiancheng), // 企业简称
                (addformObj.code = this.addform.creditCode), // 社会统一信用代码
                (addformObj.licenseUrl = this.addform.license), // 营业执照
                (addformObj.industry = this.addform.industry), // 所属行业
                (addformObj.industryId = this.addform.industry), // 行业ID
                (addformObj.businessType = this.addform.typeqiyeleixin), // 企业类型
                (addformObj.id = localStorage.getItem('loginData')), // 企业ID
                (addformObj.registerAddress = this.addform.register), // 注册地址
                (addformObj.address = this.addform.manageAddress), // 经营地址
                (addformObj.registerMoney = this.addform.capital), // 注册资本
                (addformObj.registerTime = this.addform.setupTime), // 成立日期
                (addformObj.backgroundImage = this.addform.backdrop), // 企业背景图
                (addformObj.logoUrl = this.addform.backlogo), // 企业LOGO
                (addformObj.legal = this.addform.legalPerson), // 法人姓名
                (addformObj.identityId = this.addform.legalPersona), // 身份证号
                // 身份证图片
                // 上传图片
                (addformObj.serverPhone = this.addform.cellphone), // 手机号码
                (addformObj.bankType = this.addform.zhanhaolx), // 账户类型
                (addformObj.depositBank = this.addform.kaihuyinhan), // 开户银行
                (addformObj.branch = this.addform.kaihuwang), // 开户网点
                (addformObj.bankNumber = this.addform.shoukuanzh), // 收款账号
                (addformObj.province = this.addform.register[0]), // 省
                (addformObj.city = this.addform.register[1]), // 市
                (addformObj.region = this.addform.register[2]), // 区
                this.$axios
                    .post('admin/company/add', addformObj)
                    .then((res) => {
                        if (res.status == 200) {
                            this.$message({
                                showClose: true,
                                message: res.data.msg,
                                type: 'success'
                            });
                        } else {
                            this.$message({
                                showClose: true,
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            this.$router.push({
                path: './index',
                query: {}
            });
        },
        // 取消
        ReturnToEnterpriseList() {
            this.$router.push({
                path: './index',
                query: {
                    DataHttp: ''
                }
            });
        }
    },
    created() {
        // 图片上传
        this.options = address;
    },
    mounted() {
        // 行业类型
        this.$axios
            .get('admin/industry/list')
            .then((res) => {
                if (res.status == 200) {
                    if (res.data.code == 200) {
                        for (let i in res.data.data) {
                            this.optionsas = res.data.data;
                        }
                    }
                }
            })
            .catch((err) => {
                console.log(res.status);
            });
    }
};
</script>

<style>
@import './style.css';
</style>
