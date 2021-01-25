<template>
    <div class="addjobVacancy" id="addjobVacancy">
        <div class="addjob-top">填写发布的职位信息</div>
        <el-form :model="addjob" :rules="rules" ref="addjob">
            <el-form-item label="所属行业:" prop="industry" :label-width="labelwidth">
                <el-select v-model="addjob.industry" placeholder="请选择" @change="addIDs">
                    <el-option
                        v-for="(item,index) in optionIndus"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职位名称:" prop="positionJob" :label-width="labelwidth">
                <el-select v-model="addjob.positionJob" placeholder="请选择" @change="positionJobs">
                    <el-option
                        v-for="item in optionpos"
                        :key="item.id"
                        :label="item.jobName"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="岗位薪资:" prop="pay" :label-width="labelwidth">
                <label style="color: #A4A4A4; margin-right: 10px;">(月薪)</label>
                <el-select v-model="addjob.pay" placeholder="请选择" @change="changePay">
                    <el-option
                        v-for="item in optionpay"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职业类型:" prop="positiontype" :label-width="labelwidth">
                <el-select v-model="addjob.positiontype" placeholder="请选择" @change="posType">
                    <el-option
                        v-for="(item,index) in optiontype"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="福利待遇:" prop="benefits" :label-width="labelwidth">
                <el-checkbox-group v-model="addjob.benefits">
                    <el-checkbox
                        v-for="(item,index) in fulidaiyu"
                        :label="item.id"
                        :key="index"
                    >{{item.welfare}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="学历要求:" prop="education" :label-width="labelwidth">
                <el-select v-model="addjob.education" placeholder="请选择" @change="educationddata">
                    <el-option
                        v-for="(item,index) in educationList"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="工作年限:" prop="ageLimit" :label-width="labelwidth">
                <el-select v-model="addjob.ageLimit" @change="ageChange" placeholder="请选择">
                    <el-option
                        v-for="(item,index) in ageList"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="工作地址:" prop="address" :label-width="labelwidth">
                <el-cascader
                    v-model="addjob.address"
                    :options="addressOptions"
                    @change="handleChange"
                    placeholder="请选择"
                ></el-cascader>
                <el-input class="elselect" v-model="addjob.detailaddress" placeholder="输入详细地址"></el-input>
            </el-form-item>
            <el-form-item label="联系电话:" prop="phone" :label-width="labelwidth">
                <el-input class="phonedada" v-model="addjob.phone" placeholder="输入联系电话"></el-input>
            </el-form-item>
            <el-form-item label="岗位描述:" prop="postdescribe" :label-width="labelwidth">
                <el-input
                    class="textarea"
                    type="textarea"
                    placeholder="输入岗位描述"
                    v-model="addjob.postdescribe"
                    maxlength="800"
                    show-word-limit
                ></el-input>
            </el-form-item>
            <el-form-item label="团队介绍:" prop="teamIntroduction" :label-width="labelwidth">
                <el-input
                    class="textarea"
                    type="textarea"
                    placeholder="输入团队描述"
                    v-model="addjob.teamIntroduction"
                    maxlength="500"
                    show-word-limit
                ></el-input>
            </el-form-item>
        </el-form>
        <el-button @click="addjobdata" class="fabuss">发布</el-button>
    </div>
</template>

<script>
import citydata from '../../../api/address.json';
export default {
    name: 'addjobVacancy',
    watch: {
        'addjob.phone': function (curVal, oldVal) {
            if (!curVal) {
                this.addjob.phone = '';
                return false;
            }
            // 实时把非数字的输入过滤掉
            this.addjob.phone = curVal.match(/\d/gi) ? curVal.match(/\d/gi).join('') : '';
        }
    },
    data() {
        // 手机号验证
        const validatePhone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入手机号'));
            } else {
                if (!/^1[3456789]\d{9}$/.test(value)) {
                    callback(new Error('手机号格式不正确'));
                } else {
                    callback();
                }
            }
        };
        return {
            labelwidth: '220px',
            addressOptions: {},
            // 所属行业
            optionIndus: [],
            // 职位名称
            optionpos: [],
            // 岗位薪资
            optionpay: [
                {
                    id: 0,
                    name: '1000以下'
                },
                {
                    id: 1,
                    name: '1001-2000'
                },
                {
                    id: 2,
                    name: '2001-4000'
                },
                {
                    id: 3,
                    name: '4001-6000'
                },
                {
                    id: 4,
                    name: '6001-8000'
                },
                {
                    id: 5,
                    name: '8001-10000'
                },
                {
                    id: 6,
                    name: '10001-13000'
                },
                {
                    id: 7,
                    name: '13001-15000'
                },
                {
                    id: 9,
                    name: '15001-18000'
                },
                {
                    id: 10,
                    name: '18001-21000'
                },
                {
                    id: 11,
                    name: '21001-25000'
                },
                {
                    id: 12,
                    name: '25000以上'
                }
            ],
            // 职业类型
            optiontype: [
                {
                    id: 0,
                    name: '全职'
                },
                {
                    id: 1,
                    name: '兼职'
                }
            ],
            // 学历
            educationList: [
                {
                    id: 0,
                    name: '不限'
                },
                {
                    id: 1,
                    name: '小学'
                },
                {
                    id: 2,
                    name: '初中'
                },
                {
                    id: 3,
                    name: '中专'
                },
                {
                    id: 4,
                    name: '高中'
                },
                {
                    id: 5,
                    name: '技校'
                },
                {
                    id: 6,
                    name: '大专'
                },
                {
                    id: 7,
                    name: '本科'
                },
                {
                    id: 8,
                    name: '硕士'
                },
                {
                    id: 9,
                    name: '博士'
                }
            ],
            ageList: [
                {
                    id: 0,
                    name: '不限'
                },
                {
                    id: 1,
                    name: '1年以下'
                },
                {
                    id: 2,
                    name: '1-2年'
                },
                {
                    id: 3,
                    name: '3-5年'
                },
                {
                    id: 4,
                    name: '6-7年'
                },
                {
                    id: 5,
                    name: '8-10年'
                },
                {
                    id: 6,
                    name: '10年上'
                }
            ],
            addjob: {
                industry: '',
                positionJob: '',
                pay: '',
                positiontype: '',
                benefits: [],
                education: '',
                ageLimit: '',
                address: '',
                detailaddress: '', //详细地址
                phone: '',
                postdescribe: '',
                teamIntroduction: ''
            },
            rules: {
                industry: [
                    {
                        required: true,
                        message: '请选择行业',
                        trigger: 'blur'
                    }
                ],
                positionJob: [
                    {
                        required: true,
                        message: '请选择职位',
                        trigger: 'blur'
                    }
                ],
                pay: [
                    {
                        required: true,
                        message: '请选择薪资',
                        trigger: 'blur'
                    }
                ],
                positiontype: [
                    {
                        required: true,
                        message: '请选择职业类型',
                        trigger: 'blur'
                    }
                ],
                benefits: [
                    {
                        required: true,
                        message: '请选择福利待遇',
                        trigger: 'blur'
                    }
                ],
                education: [
                    {
                        required: true,
                        message: '请选择学历',
                        trigger: 'blur'
                    }
                ],
                ageLimit: [
                    {
                        required: true,
                        message: '请选择年限',
                        trigger: 'blur'
                    }
                ],
                address: [
                    {
                        required: true,
                        message: '请选择地址',
                        trigger: 'blur'
                    }
                ],
                phone: [
                    { validator: validatePhone, trigger: 'change' },
                    { min: 11, max: 11, message: '电话号码有11位', trigger: 'blur' }
                ],
                postdescribe: [
                    {
                        required: true,
                        message: '请输入岗位描述',
                        trigger: 'blur'
                    }
                ],
                teamIntroduction: [
                    {
                        required: true,
                        message: '请输入团队介绍',
                        trigger: 'blur'
                    }
                ]
            },
            industryName: '',
            jobdataName: '',
            optionpayLabel: '',
            typeName: '',
            eductionName: '',
            ageName: '',
            fulidaiyu: []
        };
    },
    created() {
        this.addressOptions = citydata;
    },
    mounted() {
        this.getindustryList();
        this.getWeldareAll();
    },
    methods: {
        handleChange(value) {},
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
        addIDs(val) {
            this.getPositionList(val);
            let obj = {};
            obj = this.optionIndus.find((item) => {
                return item.id === val;
            });
            this.industryName = obj.name;
        },
        // 查询行业下的职业
        getPositionList(val) {
            this.$axios.get('admin/job/manage/getPositionList/' + val).then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.optionpos = data.data;
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
        positionJobs(val) {
            let obj = {};
            obj = this.optionpos.find((item) => {
                return item.id === val;
            });
            this.jobdataName = obj.jobName;
        },
        changePay(val) {
            var obj = {};
            obj = this.optionpay.find((item) => {
                return item.id === val;
            });
            this.optionpayLabel = obj.name;
        },
        posType(val) {
            var obj = {};
            obj = this.optiontype.find((item) => {
                return item.id === val;
            });
            this.typeName = obj.name;
        },
        educationddata(val) {
            var obj = {};
            obj = this.educationList.find((item) => {
                return item.id === val;
            });
            this.eductionName = obj.name;
        },
        ageChange(val) {
            var obj = {};
            obj = this.ageList.find((item) => {
                return item.id === val;
            });
            this.ageName = obj.name;
        },
        //查询福利待遇
        getWeldareAll() {
            this.$axios.get('admin/admin/welfare/select/all').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.fulidaiyu = data.data.data;
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
        // 发布按钮
        addjobdata() {
            this.$refs.addjob.validate((valid) => {
                if (valid) {
                    this.$confirm('是否确定发布为【' + this.jobdataName + '】的招聘?', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        const loading = this.$loading({
                            lock: true,
                            text: '发布中...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        let data = {
                            industryName: this.industryName,
                            industryId: this.addjob.industry,
                            jobName: this.jobdataName, // this.addjob.positionJob,
                            salaries: this.optionpayLabel,
                            positionType: this.typeName,
                            welfare: this.addjob.benefits,
                            education: this.eductionName,
                            experience: this.ageName,
                            addr: this.addjob.address[0] + '/' + this.addjob.address[1] + '/' + this.addjob.address[2],
                            address: this.addjob.detailaddress,
                            tel: this.addjob.phone,
                            jobIntroduce: this.addjob.postdescribe,
                            team: this.addjob.teamIntroduction
                        };
                        this.$axios.post('admin/job/manage/add/jobDetail', data).then((res) => {
                            loading.close();
                            if (res.status == 200) {
                                var data = res.data;
                                if (data.code == 200) {
                                    this.$message({
                                        showClose: true,
                                        message: data.msg,
                                        type: 'success'
                                    });
                                    this.$router.push({
                                        path: './jobVacancy'
                                    });
                                    this.$refs.addjob.resetFields();
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
                    });
                }
            });
        }
    }
};
</script>

<style>
.addjobVacancy {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
}

.addjob-top {
    width: 100%;
    height: 45px;
    background-color: #fafbfa;
    line-height: 45px;
    padding-left: 20px;
    margin-top: 20px;
    margin-bottom: 30px;
}

.el-form-item__content {
    position: relative;
}

.el-form-item .el-form-item__label {
    text-align: right;
}

.elselect {
    position: absolute;
    top: 0;
    left: 220px;
}

.elselect .el-input__inner {
    width: 194px;
    margin-left: 10px;
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid #c1c1c1;
}

.textarea {
    width: 613px;
}

.el-textarea__inner {
    height: 190px;
}

.addjobVacancy .fabuss {
    width: 90px;
    height: 30px;
    padding: 0;
    background-color: #2482d2;
    color: #fff;
    margin-left: 30%;
}

.phonedada .el-input__inner {
    width: 203px;
    margin-left: 10px;
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid #c1c1c1;
}
</style>
