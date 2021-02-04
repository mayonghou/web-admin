<template>
    <div class="addjobVacancy" id="updateJobVacancy">
        <div class="addjob-top">编辑职位信息</div>
        <el-form :model="addjob" :rules="rules" ref="addjob">
            <el-form-item label="所属行业:" prop="industry" :label-width="labelwidth">
                <el-select v-model="addjob.industry" placeholder="请选择" @change="industyData">
                    <el-option
                        v-for="item in optionIndus"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职位名称:" prop="positionJob" :label-width="labelwidth">
                <el-select v-model="addjob.positionJob" placeholder="请选择">
                    <el-option
                        v-for="item in optionpos"
                        :key="item.id"
                        :label="item.jobName"
                        :value="item.jobName"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="岗位薪资:" prop="pay" :label-width="labelwidth">
                <label style="color: #A4A4A4; margin-right: 10px;">(月薪)</label>
                <el-select v-model="addjob.pay" placeholder="请选择">
                    <el-option
                        v-for="item in optionpay"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职业类型:" prop="positiontype" :label-width="labelwidth">
                <el-select v-model="addjob.positiontype" placeholder="请选择">
                    <el-option
                        v-for="item in optiontype"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
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
                <el-select v-model="addjob.education" placeholder="请选择">
                    <el-option
                        v-for="item in educationList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="工作年限:" prop="ageLimit" :label-width="labelwidth">
                <el-select v-model="addjob.ageLimit" placeholder="请选择">
                    <el-option
                        v-for="(item,index) in educationList"
                        :key="index"
                        :label="item.name"
                        :value="item.name"
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
                <el-input
                    style="width:400px; margin-left:20px;"
                    v-model="addjob.detailaddress"
                    placeholder="输入详细地址"
                ></el-input>
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
                    placeholder="输入岗位描述"
                    v-model="addjob.teamIntroduction"
                    maxlength="500"
                    show-word-limit
                ></el-input>
            </el-form-item>
            <el-form-item label="任职要求:" prop="jobRequirements" :label-width="labelwidth">
                <el-upload
                    :with-credentials="true"
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
                    :content="content"
                    v-model="addjob.jobRequirements"
                    :options="editorOption"
                ></quill-editor>
            </el-form-item>
            <el-form-item label="岗位职责:" prop="positionStatement" :label-width="labelwidth">
                <el-upload
                    :with-credentials="true"
                    multiple
                    class="quill-upload"
                    :action="action"
                    style="display: none;width:0;"
                    :show-file-list="false"
                    accept="image/*"
                    :on-success="successpost"
                    :before-upload="beforeAvatarUploadpost"
                >
                    <i class="el-icon-upload positionData"></i>
                </el-upload>
                <quill-editor
                    ref="myQuillEditorpost"
                    :content="content"
                    v-model="addjob.positionStatement"
                    :options="editorOptionloasd"
                ></quill-editor>
            </el-form-item>
            <el-form-item label-width="300px">
                <el-button class="fabuss" @click="quxaio">取消</el-button>
                <el-button class="fabuss" @click="sahngjia">上架</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor, Quill } from 'vue-quill-editor';
import citydata from '../../../api/address.json';
export default {
    name: 'updateJobVacancy',
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
        ];
        // 岗位职责
        const toolbarOptionsdata = [
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
        ];
        return {
            labelwidth: '220px',
            addressOptions: {},
            industymingce: '',
            content: '',
            action: localStorage.getItem('actionUrl'),
            editorOption: {
                placeholder: '请输入任职要求',
                modules: {
                    toolbar: {
                        container: toolbarOptions,
                        handlers: {
                            // 重写点击组件上的图片按钮要执行的代码
                            image: function (value) {
                                document.querySelector('.quill-upload .el-icon-upload').click();
                            }
                        }
                    }
                }
            },
            // 岗位职责
            editorOptionloasd: {
                placeholder: '请输入岗位职责',
                modules: {
                    toolbar: {
                        container: toolbarOptionsdata,
                        handlers: {
                            // 重写点击组件上的图片按钮要执行的代码
                            image: function (value) {
                                document.querySelector('.quill-upload .positionData').click();
                            }
                        }
                    }
                }
            },
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
            fulidaiyu: [],
            addjob: {
                id: '',
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
                teamIntroduction: '',
                companyId: '',
                companyName: '',
                city: '',
                province: '',
                jobRequirements: '',
                positionStatement: ''
            },
            rules: {
                industry: {
                    required: true,
                    message: '请选择行业',
                    trigger: 'blur'
                },
                positionJob: {
                    required: true,
                    message: '请选择职位',
                    trigger: 'blur'
                },
                pay: {
                    required: true,
                    message: '请选择薪资',
                    trigger: 'blur'
                },
                positiontype: {
                    required: true,
                    message: '请选择职业类型',
                    trigger: 'blur'
                },
                benefits: {
                    required: true,
                    message: '请选择福利待遇',
                    trigger: 'blur'
                },
                education: {
                    required: true,
                    message: '请选择学历',
                    trigger: 'blur'
                },
                ageLimit: {
                    required: true,
                    message: '请选择年限',
                    trigger: 'blur'
                },
                address: {
                    required: true,
                    message: '请选择地址',
                    trigger: 'blur'
                },
                phone: {
                    required: true,
                    message: '请输入联系电话',
                    trigger: 'blur'
                },
                postdescribe: {
                    required: true,
                    message: '请输入岗位描述',
                    trigger: 'blur'
                },
                teamIntroduction: {
                    required: true,
                    message: '请输入团队介绍',
                    trigger: 'blur'
                }
            }
        };
    },
    watch: {
        serviceUrl(val) {
            this.serviceUrl = val;
        },
        getHeader(val) {
            this.getHeader = val;
        },
        editorData(val) {
            this.$emit('getEditorData', this.editorData);
        },
        content(val) {
            this.content = val;
        }
    },
    created() {
        this.addressOptions = citydata;
    },
    mounted() {
        this.getlistData();
        this.getindustryList();
        this.getWeldareAll();
    },
    methods: {
        beforeAvatarUpload(file) {
            this.$emit('beforeAvatarUpload', file);
        },
        success(res, file, fileList) {
            // res为图片服务器返回的数据
            // 获取富文本组件实例
            let quill = this.$refs.myQuillEditor.quill;
            // 如果上传成功
            if (res.code == 200) {
                // 获取光标所在位置
                const pos = quill.selection.savedRange.index; //这个得注意下，网上很多都是不对的
                // 插入图片到光标位置
                quill.insertEmbed(pos, 'image', localStorage.getItem('imgUrl') + res.data);
                // 调整光标到最后
                quill.setSelection(length + 1);
            } else {
                this.$message({
                    showClose: true,
                    message: '详情图片上传失败',
                    type: 'error'
                });
            }
            // loading动画消失
            this.quillUpdateImg = false;
        },
        // ============================岗位职责
        successpost(res, file, fileList) {
            // res为图片服务器返回的数据
            // 获取富文本组件实例
            let quill = this.$refs.myQuillEditorpost.quill;
            // 如果上传成功
            if (res.code == 200) {
                // 获取光标所在位置
                const pos = quill.selection.savedRange.index; //这个得注意下，网上很多都是不对的
                // 插入图片到光标位置
                quill.insertEmbed(pos, 'image', localStorage.getItem('imgUrl') + res.data);
                // 调整光标到最后
                quill.setSelection(length + 1);
            } else {
                this.$message({
                    showClose: true,
                    message: '详情图片上传失败',
                    type: 'error'
                });
            }
            // loading动画消失
            this.quillUpdateImg = false;
        },
        beforeAvatarUploadpost(file) {
            this.$emit('beforeAvatarUploadpost', file);
        },
        handleChange(value) {
            console.log(value);
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
        industyData(value) {
            let obj = {};
            obj = this.optionIndus.find((item) => {
                return item.id === value;
            });
            this.industymingce = obj.name;
            this.getPositionList(value);
        },
        // 查询行业下的职位
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
        // 取消上架
        quxaio() {
            this.$router.push({
                path: './xiajiaJobVacancy'
            });
        },
        // 上架按钮
        sahngjia() {
            this.$confirm('是否确定上架【' + this.addjob.positionJob + '】的职位?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let data = {
                    addr: this.addjob.address.join('/'),
                    address: this.addjob.address.join('') + this.addjob.detailaddress,
                    city: this.addjob.city,
                    companyId: this.addjob.companyId,
                    companyName: this.addjob.companyName,
                    // contact: 'string',
                    education: this.addjob.education,
                    experience: this.addjob.ageLimit,
                    id: this.addjob.id,
                    industryId: this.addjob.industry,
                    // jobDescription: 'string',
                    jobIntroduce: this.addjob.postdescribe,
                    jobName: this.addjob.positionJob,
                    positionType: this.addjob.positiontype,
                    province: this.addjob.province,
                    // requirements: 'string',
                    salaries: this.addjob.pay,
                    status: 2,
                    team: this.addjob.teamIntroduction,
                    tel: this.addjob.phone,
                    userId: 0,
                    welfare: this.addjob.benefits,
                    requirements: this.addjob.jobRequirements,
                    jobDescription: this.addjob.positionStatement
                };
                const loading = this.$loading({
                    lock: true,
                    text: '上架中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios.post('admin/job/manage/edit/jobDetail', data).then((res) => {
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
        },
        getlistData() {
            let data = this.$route.params.data;
            if (data != undefined) {
                console.log(data.address);
                let value = data.address.lastIndexOf('省');
                let value1 = data.address.lastIndexOf('市');
                let value2 = data.address.lastIndexOf('区');
                let province = data.address.substring(0, value + 1);
                let city = data.address.substring(value + 1, value1 + 1);
                let qu = data.address.substring(value1 + 1, value2 + 1);
                let addressData = province + ',' + city + ',' + qu;
                this.addjob.address = addressData.split(',');
                this.addjob.id = data.id;
                this.addjob.industry = data.industryId;
                this.addjob.positionJob = data.jobName;
                this.addjob.pay = data.salaries;
                this.addjob.positiontype = data.positionType;
                let daiyu = [];
                data.welfare.forEach((val, index) => {
                    daiyu[index] = val.id;
                });
                this.addjob.companyId = data.companyId;
                this.addjob.companyName = data.companyName;
                this.addjob.benefits = daiyu; //福利待遇
                this.addjob.education = data.education;
                this.addjob.city = data.city;
                this.addjob.province = data.province;
                this.addjob.ageLimit = data.experience;

                // this.addjob.address = addresslis.split(',');
                this.addjob.detailaddress = data.address; //详细地址
                this.addjob.phone = data.tel;
                this.addjob.postdescribe = data.jobIntroduce;
                this.addjob.teamIntroduction = data.team;
                this.addjob.jobRequirements = data.requirements;
                this.addjob.positionStatement = data.jobDescription;
            }
        }
    }
};
</script>

<style>
.addjobVacancy {
    width: 100%;
    box-sizing: border-box;
}

.addjob-top {
    width: 100%;
    height: 45px;
    background-color: #fafbfa;
    line-height: 45px;
    padding-left: 20px;
    margin-top: 20px;
}

.el-form-item__content {
    position: relative;
}

.elselect {
    position: absolute;
    top: 0;
    left: 300px;
}

.elselect .el-input__inner {
    width: 194px;
    margin-left: 20px;
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
    margin-left: 80px;
}
.phonedada .el-input__inner {
    width: 203px;
    margin-left: 10px;
}
.ql-container {
    width: 1000px;
}
.ql-toolbar {
    width: 1000px;
}
</style>
