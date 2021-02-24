<template>
    <div class="xiaoyuerRoot">
        <div class="TopClass">
           <!-- <h4>企业信息：</h4>
            <h4>{{this.companyDataName}}</h4>
            <h4 class="fontColor">已入住</h4>
            <h4 class="fontColor">入驻时间：{{this.ruzhuTime}}</h4> -->
			<div>企业信息：{{this.companyDataName}}</div>
			<div class="fontColor">已入住</div>
			<div class="fontColor">入驻时间：{{this.ruzhuTime}}</div>
        </div>
        <Form :model="formRight" label-position="right" :label-width="200">
            <FormItem label="企业名称：" class="fatherClass">
                <input class="InputClass" v-model="formRight.input1" placeholder="请输入企业名称..." />
            </FormItem>
            <FormItem label="企业简称：" class="fatherClass">
                <input class="InputClass" v-model="formRight.input2" placeholder="请输入企业简称..." />
            </FormItem>
            <FormItem label="社会统一代码：" class="fatherClass">
                <input class="InputClass" v-model="formRight.input3" placeholder="请输入社会统一代码..." />
            </FormItem>
            <FormItem label="营业执照：" class="fatherClass">
                <Upload
                    type="drag"
                    :action="action"
                    :show-upload-list="false"
                    :on-success="imgUrlSuccess"
                    :flie-upload="true"
                    class="UploadClassd"
                >
                    <div style="padding: 20px 0" v-if="this.imgUrl == ''">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>重新上传</p>
                    </div>
                    <img
                        v-else
                        :src="this.imgUrl"
                        width="100%"
                        height="100%"
                        style=" display: block; "
                    />
                </Upload>
            </FormItem>
            <FormItem label="所属行业：" class="fatherClass">
                <Select v-model="ciaoyuermodel1" style="width:200px" @on-change="fdsjkfdsfds">
                    <Option
                        v-for="item in xiaoyuerInstry1"
                        :value="item.id"
                        :key="item.id"
                    >{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="企业类型：" class="fatherClass">
                <Select v-model="ciaoyuermodel2" style="width:200px">
                    <Option
                        v-for="item in xiaoyuerInstry2"
                        :value="item.value"
                        :key="item.value"
                    >{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="注册地址：" class="fatherClass">
                <el-cascader class="formWidth" v-model="formRight.registerzc" :options="options"></el-cascader>
                <span>详细地址：</span>
                <input class="InputClass" v-model="formRight.input4" placeholder="请输入注册地址..." />
            </FormItem>
            <FormItem label="经营地址：" class="fatherClass">
                <el-cascader
                    class="formWidth"
                    v-model="formRight.registerjy"
                    :options="options"
                    @change="handleChange"
                ></el-cascader>
                <span>详细地址：</span>
                <input class="InputClass" v-model="formRight.input5" placeholder="请输入经营地址..." />
            </FormItem>
            <FormItem label="注册资本：" class="fatherClass">
                <input class="InputClass" v-model="formRight.input6" placeholder="请输入注册资本..." />
                <span class="spanwClass">万</span>
            </FormItem>
            <FormItem label="成立日期：" class="fatherClass">
                <!-- <input class="InputClass" v-model="formRight.input7" placeholder="请输入成立日期..." /> -->
                <el-date-picker
                    v-model="formRight.input7"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                ></el-date-picker>
            </FormItem>
            <FormItem label="企业背景图：" class="fatherClass">
                <Upload
                    :on-success="qiyeBGsuccess"
                    type="drag"
                    :action="action"
                    :show-upload-list="false"
                    class="UploadClassd"
                >
                    <div style="padding: 20px 0" v-if="this.bgimgUrl == ''">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>重新上传</p>
                    </div>
                    <img
                        v-else
                        width="100%"
                        height="100%"
                        style="display:block;"
                        :src="this.bgimgUrl"
                    />
                </Upload>
            </FormItem>
            <FormItem label="企业LOGO：" class="fatherClass">
                <Upload
                    :on-success="qiyeLOGOsuccess"
                    type="drag"
                    :action="action"
                    :show-upload-list="false"
                    class="UploadClassd"
                >
                    <div style="padding: 20px 0" v-if="this.logoUrl == ''">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>重新上传</p>
                    </div>
                    <img
                        v-else
                        width="100%"
                        height="100%"
                        style="display:block;"
                        :src="this.logoUrl"
                    />
                </Upload>
            </FormItem>
        </Form>
        <div class="TopClass02">
            <h4>企业法人信息</h4>
        </div>
        <Form :model="formRight01" label-position="right" :label-width="200">
            <FormItem label="法人姓名：" class="fatherClass">
                <input class="InputClass" v-model="formRight01.input1" placeholder="请输入法人姓名..." />
            </FormItem>
            <FormItem label="法人身份证号：" class="fatherClass">
                <input class="InputClass" v-model="formRight01.input2" placeholder="请输入法人身份证号..." />
            </FormItem>
            <FormItem label="身份证正面：" class="fatherClass">
                <Upload
                    :on-success="SFZZsuccess"
                    type="drag"
                    :action="action"
                    :show-upload-list="false"
                    class="UploadClassd"
                >
                    <div style="padding: 20px 0" v-if="this.sfzUrl == ''">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>重新上传</p>
                    </div>
                    <img
                        v-else
                        width="100%"
                        height="100%"
                        style="display:block;"
                        :src="this.sfzUrl"
                    />
                </Upload>
            </FormItem>
            <FormItem label="身份证反面：" class="fatherClass">
                <Upload
                    :on-success="SFZFsuccess"
                    type="drag"
                    :action="action"
                    :show-upload-list="false"
                    class="UploadClassd"
                >
                    <div style="padding: 20px 0" v-if="this.sffUrl == ''">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>重新上传</p>
                    </div>
                    <img
                        v-else
                        width="100%"
                        height="100%"
                        style="display:block;"
                        :src="this.sffUrl"
                    />
                </Upload>
            </FormItem>
            <FormItem label="手机号码：" class="fatherClass">
                <input class="InputClass" v-model="formRight01.input3" placeholder="请输入手机号码..." />
            </FormItem>
        </Form>
        <div class="TopClass02">
            <h4>用户账户信息</h4>
        </div>
        <Form :model="formRight02" label-position="right" :label-width="200">
            <FormItem label="账号类型：" class="fatherClass">
                <Select v-model="ciaoyuermodel3" style="width:200px">
                    <Option
                        v-for="item in xiaoyuerInstry3"
                        :value="item.value"
                        :key="item.value"
                    >{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="开户银行：" class="fatherClass">
                <Select v-model="ciaoyuermodel4" style="width:200px">
                    <Option
                        v-for="item in xiaoyuerInstry4"
                        :value="item.name"
                        :key="item.bm"
                    >{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="开户网点：" class="fatherClass">
                <input class="InputClass" v-model="formRight02.input1" placeholder="请输入开户网点..." />
            </FormItem>
          <!--  <FormItem label="账户名称：" class="fatherClass">
                <input class="InputClass" v-model="formRight02.input2" placeholder="请输入账户名称..." />
            </FormItem> -->
            <FormItem label="收款账号：" class="fatherClass">
                <input class="InputClass" v-model="formRight02.input3" placeholder="请输入收款账号..." />
            </FormItem>
        </Form>
        <div class="btnButtonClas">
            <Button type="primary" @click="EditingEnterprise" style="margin-right:5px">保存</Button>
            <Button @click="returnBtn" type="primary" style="margin-left:5px">返回</Button>
        </div>
    </div>
</template>

<script>
import address from '../../../../api/address.json';

export default {
    data() {
        return {
            action: localStorage.getItem('actionUrl'),
            imgUrl: '',
            bgimgUrl: '',
            companyDataName: '',
            ruzhuTime: '',
            options: address,
            logoUrl: '',
            sfzUrl: '',
            sffUrl: '',
            formRight: {
                registerzc: '',
                registerjy: '',
                input1: '',
                input2: '',
                input3: '',
                input4: '',
                input5: '',
                input6: '',
                input7: ''
            },
            formRight01: {
                input1: '',
                input2: '',
                input3: ''
            },
            formRight02: {
                input1: '',
                input2: '',
                input3: ''
            },
            xiaoyuerInstry1: [],
            ciaoyuermodel1: '',
            xiaoyuerInstry2: [
                {
                    value: 0,
                    label: '企业单位'
                },
                {
                    value: 1,
                    label: '事业单位'
                },
                {
                    value: 2,
                    label: '社会团体'
                },
                {
                    value: 3,
                    label: '其他'
                }
            ],
            ciaoyuermodel2: '',
            xiaoyuerInstry3: [
                {
                    value: 1,
                    label: '对公'
                },
                {
                    value: 2,
                    label: '对私'
                }
            ],
            ciaoyuermodel3: '',
            xiaoyuerInstry4: [],
            ciaoyuermodel4: '',
            imgUrlData: '', //上传营业执照图片
            bgimgUrldata: '', //上传企业背景图
            logoUrldata: '', //上传logo
            sfzUrldata: '', //上传身份证正面图片
            sffUrldata: '', //上传身份证反面
            province: '',
            city: '',
            region: ''
        };
    },
    created() {},
    mounted() {
        this.getCompanyData();
        this.Industrysu();
        this.BankInquiry();
    },
    methods: {
        // 营业执照上传回调
        imgUrlSuccess(res, file, fileList) {
            if (res.code == 200) {
                this.imgUrlData = res.data;
                this.imgUrl = localStorage.getItem('imgUrl') + res.data;
            }
        },
        // 企业背景上传回调
        qiyeBGsuccess(res, file, fileList) {
            if (res.code == 200) {
                this.bgimgUrldata = res.data;
                this.bgimgUrl = localStorage.getItem('imgUrl') + res.data;
            }
        },
        // 企业logo
        qiyeLOGOsuccess(res, file, fileList) {
            if (res.code == 200) {
                this.logoUrldata = res.data;
                this.logoUrl = localStorage.getItem('imgUrl') + res.data;
            }
        },
        //身份证正面
        SFZZsuccess(res, file, fileList) {
            if (res.code == 200) {
                this.sfzUrldata = res.data;
                this.sfzUrl = localStorage.getItem('imgUrl') + res.data;
            }
        },
        //身份证反面
        SFZFsuccess(res, file, fileList) {
            if (res.code == 200) {
                this.sffUrldata = res.data;
                this.sffUrl = localStorage.getItem('imgUrl') + res.data;
            }
        },
        returnBtn() {
            // console.log(this.formRight.input7);
            this.$router.push({
                path: './index'
            });
        },
        // 所属行业
        Industrysu() {
            this.$axios.get('admin/industry/list').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.xiaoyuerInstry1 = res.data.data;
                    }
                }
            });
        },
		fdsjkfdsfds(value){
			console.log(value);
		},
        // 银行list
        BankInquiry() {
            const url = 'admin/sideline/list_wx_bank';
            this.$axios
                .get(url)
                .then((res) => {
                    if (res.status == 200) {
                        const data = res.data;
                        if (data.code == 200) {
                            this.xiaoyuerInstry4 = data.data;
                        }
                    }
                })
                .catch((err) => {});
        },
        handleChange(value) {
            if (value) {
                if (value.length == 2) {
                    this.province = value[0];
                    this.city = '';
                    this.region = value[1];
                } else {
                    this.province = value[0];
                    this.city = value[1];
                    this.region = value[2];
                }
            }
        },
        // 编辑企业接口
        EditingEnterprise() {
            const url = 'admin/company/add';
            const data = {
                name: this.formRight.input1,
                remark: this.formRight.input2,
                code: this.formRight.input3,
                licenseUrl: this.imgUrlData, //营业执照
                industryId: this.ciaoyuermodel1,
                businessType: this.ciaoyuermodel2,
                registerAddress:this.formRight.registerzc.join('')+this.formRight.input4,
                address: this.formRight.input5,
                registerMoney: this.formRight.input6 * 1000000,
                registerTime: this.formRight.input7,
                serverPhone: this.formRight01.input3,
                backgroundImage: this.bgimgUrldata, //企业背景图
                logoUrl: this.logoUrldata, //企业LOGO
                legal: this.formRight01.input1,
                identityId: this.formRight01.input2,
                frontImage: this.sfzUrldata, //身份证正面
                backImage: this.sffUrldata, //身份证反面
                bankType: this.ciaoyuermodel3,
                depositBank: this.ciaoyuermodel4,
                branch: this.formRight02.input1,
                bankNumber: this.formRight02.input3,
                id: this.$route.query.id,
                province: this.province,
                city: this.city,
                region: this.region
            };
            this.$axios
                .post(url, data)
                .then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.$router.push({
                                path: './index'
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
                })
                .catch((err) => {});
        },
        // 根据企业ID查询企业做回显
        getCompanyData() {
            this.$axios.get('admin/company/info/' + this.$route.query.id).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.formRight.input1 = data.data.name;
                        this.formRight.input2 = data.data.remark;
                        this.formRight.input3 = data.data.code;
                        var https = /^https:\/\/.+&/;
                        if (data.data.licenseUrl) {
                            this.imgUrlData = data.data.licenseUrl;
                            if (https.test(data.data.licenseUrl)) {
                                this.imgUrl = data.data.licenseUrl;
                            } else {
                                this.imgUrl = localStorage.getItem('imgUrl') + data.data.licenseUrl;
                            }
                        }
                        this.ciaoyuermodel1 = data.data.industryId;
                        this.ciaoyuermodel2 = data.data.businessType;
						let shengLength = data.data.registerAddress.lastIndexOf('省') + 1;
						let zhuceCity = data.data.registerAddress.lastIndexOf('市') + 1;
						let quLength = data.data.registerAddress.lastIndexOf('区') + 1;
						let zhuceaddressLength = data.data.registerAddress.length;
						let zhuceShengName = data.data.registerAddress.substring(0,shengLength);
						let zhuceCityname = data.data.registerAddress.substring(shengLength,zhuceCity);
						let zhucequName = data.data.registerAddress.substring(zhuceCity,quLength);
						let addressDetailName = data.data.registerAddress.substring(quLength,zhuceaddressLength);
						let bbbss = zhuceShengName+'/'+zhuceCityname+'/'+zhucequName;
                        this.formRight.registerzc = bbbss.split('/');
                        let addressdata = data.data.province + '/' + data.data.city + '/' + data.data.region;
						this.province = data.data.province;
						this.city = data.data.city;
						this.region = data.data.region;
                        this.formRight.registerjy = addressdata.split('/');
                        this.formRight.input4 = addressDetailName;
                        this.formRight.input5 = data.data.address;
                        this.formRight.input6 = data.data.registerMoney / 1000000;
						if(data.data.registerTime != 0){
							let date = new Date(data.data.registerTime);
							var time1 =
								date.getFullYear() +
								'-' +
								(date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
								'-' +
								date.getDate();
							this.formRight.input7 = time1;
						}
                        let dateTime = new Date(parseInt(data.data.time));
                        var timedata =
                            dateTime.getFullYear() +
                            '-' +
                            (dateTime.getMonth() + 1 < 10 ? '0' + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1) +
                            '-' +
                            dateTime.getDate();
                        this.ruzhuTime = timedata;
                        this.companyDataName = data.data.name;
                        if (data.data.backgroundImage) {
                            this.bgimgUrldata = data.data.backgroundImage;
                            if (https.test(data.data.backgroundImage)) {
                                this.bgimgUrl = data.data.backgroundImage;
                            } else {
                                this.bgimgUrl = localStorage.getItem('imgUrl') + data.data.backgroundImage;
                            }
                        }
                        if (data.data.logoUrl) {
                            this.logoUrldata = data.data.logoUrl;
                            if (https.test(data.data.logoUrl)) {
                                this.logoUrl = data.data.logoUrl;
                            } else {
                                this.logoUrl = localStorage.getItem('imgUrl') + data.data.logoUrl;
                            }
                        }
                        this.formRight01.input1 = data.data.legal;
                        this.formRight01.input2 = data.data.identityId;
						
                        this.formRight01.input3 = data.data.serverPhone;
                        if (data.data.frontImage) {
                            this.sfzUrldata = data.data.frontImage;
                            if (https.test(data.data.frontImage)) {
                                this.sfzUrl = data.data.frontImage;
                            } else {
                                this.sfzUrl = localStorage.getItem('imgUrl') + data.data.frontImage;
                            }
                        }
                        if (data.data.backImage) {
                            this.sffUrldata = data.data.backImage;
                            if (https.test(data.data.backImage)) {
                                this.sffUrl = data.data.backImage;
                            } else {
                                this.sffUrl = localStorage.getItem('imgUrl') + data.data.backImage;
                            }
                        }
                        this.ciaoyuermodel3 = data.data.bankType;
                        this.ciaoyuermodel4 = data.data.depositBank;
                        this.formRight02.input1 = data.data.branch;
                        this.formRight02.input2 = data.data.legal;
                        this.formRight02.input3 = data.data.bankNumber;
                    }
                }
            });
        }
    }
};
</script>

<style scoped>
.TopClass {
    display: flex;
    justify-content: space-between;
    margin: 30px 0 20px 0;
    background-color: #f5f7fa;
	height: 45px;
	align-items: center;
	font-size: 16px;
	padding: 0 20px;
}
.TopClass02 {
    padding: 15px;
    margin: 30px 0 20px 0;
    background-color: #f5f7fa;
}
.TopClass h4 {
    padding: 15px 10px;
    width: 100%;
}
.TopClass .fontColor {
    color: #109955;
}
.TopClass h4:nth-child(odd) {
    width: 280px;
    text-align: right;
}
.InputClass {
    padding: 0px 5px;
    border: 0;
    outline: none;
    border-bottom: 1px solid #e6e6e6;
    width: 200px;
}
.UploadClassd {
    width: 220px;
}
.spanwClass {
    padding: 0px 10px;
}
input::-webkit-input-placeholder {
    color: #aab2bd;
    font-size: 12px;
    text-align: left;
}
.btnButtonClas {
    display: flex;
    justify-content: center;
    padding: 20px 0 100px 0;
}
.btnButtonClas button {
    padding: 0 40px;
}
</style>