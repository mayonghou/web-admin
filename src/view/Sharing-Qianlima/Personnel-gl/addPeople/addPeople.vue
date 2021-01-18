<template>
    <div>
        <div class="peapleCLass">
            <div class="countCLass">
                <h3>填写添加的人员信息</h3>
                <div class="ulClassAddPeople">
                    <Form :model="formRight" label-position="right" :label-width="100">
                        <FormItem label="姓名">
                            <Input
                                v-model="formRight.input1"
                                class="InputClass"
                                placeholder="请输入姓名..."
                            ></Input>
                        </FormItem>
                        <FormItem label="手机号">
                            <Input
                                v-model="formRight.input2"
                                class="InputClass"
                                placeholder="请输入手机号码..."
                            ></Input>
                        </FormItem>
                        <FormItem label="选择性别">
                            <Select v-model="model1" class="InputClass">
                                <Option
                                    v-for="item in ListData1"
                                    :value="item.value"
                                    :key="item.value"
                                >{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="选择兼职类型">
                            <CheckboxGroup v-model="CheckBox" @on-change="chagneStatus">
                                <Checkbox
                                    border
                                    class="Margin"
                                    v-for="(item, index) in checkBoxData"
                                    :key="index"
                                    :label="item.id"
                                >{{ item.name }}</Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                        <FormItem label="选择行业">
                            <Select v-model="model2" class="InputClass" @on-change="model2change">
                                <Option
                                    v-for="item in ListData2"
                                    :value="item.id"
                                    :key="item.id"
                                >{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="选择职业">
                            <Select v-model="model3" class="InputClass" @on-change="zhiweiChange">
                                <Option
                                    v-for="item in ListData3"
                                    :value="item.id"
                                    :key="item.id"
                                >{{ item.jobName }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="选择工作经验">
                            <Select v-model="model4" @on-change="WorkExperience" class="InputClass">
                                <Option
                                    v-for="item in ListData4"
                                    :value="item.bm"
                                    :key="item.bm"
                                >{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="个人地址">
                            <el-cascader
                                v-model="address"
                                :options="addressOptions"
                                placeholder="请选择"
                                class="InputClass"
                            ></el-cascader>
                            <span class="xxdiClass">详细地址</span>
                            <Input
                                v-model="formRight.input6"
                                class="InputClass"
                                placeholder="请输入详细地址..."
                            ></Input>
                        </FormItem>
                        <FormItem label="身份证照片" class="InputClasser">
                            <div>
                                <br />
                                <p>正面</p>
                                <p>
                                    <Upload
                                        type="drag"
                                        :action="action"
                                        accept="image/*"
                                        :on-success="successUpload"
                                        :show-upload-list="false"
                                    >
                                        <div style="padding: 20px 0" v-if="this.imgUrl == ''">
                                            <Icon
                                                type="ios-cloud-upload"
                                                size="52"
                                                style="color: #3399ff"
                                            ></Icon>
                                            <p>添加身份证正面</p>
                                        </div>
                                        <img
                                            width="100%"
                                            height="100%"
                                            style=" display: block; "
                                            v-else
                                            :src="this.imgUrl"
                                        />
                                    </Upload>
                                </p>
                                <p>反面</p>
                                <p>
                                    <Upload
                                        multiple
                                        type="drag"
                                        :action="action"
                                        accept="image/*"
                                        :on-success="successUploaddow"
                                        :show-upload-list="false"
                                    >
                                        <div style="padding: 20px 0" v-if="imgUrldata == ''">
                                            <Icon
                                                type="ios-cloud-upload"
                                                size="52"
                                                style="color: #3399ff"
                                            ></Icon>
                                            <p>添加身份证反面</p>
                                        </div>
                                        <img
                                            v-else
                                            :src="this.imgUrldata"
                                            width="100%"
                                            height="100%"
                                            style=" display: block; "
                                        />
                                    </Upload>
                                </p>
                            </div>
                        </FormItem>
                    </Form>
                </div>
                <h3>个人账户信息</h3>
                <div class="ulClassAddPeople">
                    <Form :model="formRight" label-position="right" :label-width="100">
                        <FormItem label="开户银行">
                            <Select v-model="model5" class="InputClass">
                                <Option
                                    v-for="item in ListData5"
                                    :value="item.bm"
                                    :key="item.bm"
                                >{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="开户网点">
                            <Input
                                v-model="formRight.input3"
                                class="InputClass"
                                placeholder="请输入开户网点..."
                            ></Input>
                        </FormItem>
                        <FormItem label="账户名称">
                            <Input
                                v-model="formRight.input4"
                                class="InputClass"
                                placeholder="请输入账户名称..."
                            ></Input>
                        </FormItem>
                        <FormItem label="收款账号">
                            <Input
                                v-model="formRight.input5"
                                class="InputClass"
                                placeholder="请输入收款账号..."
                            ></Input>
                        </FormItem>
                    </Form>
                </div>
                <h3>用户账户</h3>
                <div class="ulClassAddPeople">
                    <Form :model="formRight" label-position="right" :label-width="100">
                        <FormItem label="用户姓名">
                            <Input
                                v-model="formRight.input7"
                                class="InputClass"
                                placeholder="请输入收款账号..."
                            ></Input>
                        </FormItem>
                        <FormItem label="密码">
                            <Input
                                v-model="formRight.input8"
                                class="InputClass"
                                placeholder="请输入收款账号..."
                            ></Input>
                        </FormItem>
                    </Form>
                    <div class="Btnbutton">
                        <Button type="primary" class="BTnClass" @click="preservationBtn">保存</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import citydata from '../../../../api/address.json';
export default {
    data() {
        return {
            imgUrldata: '',
            addressOptions: citydata,
            action: localStorage.getItem('actionUrl'),
            address: [],
            formRight: {
                input1: '',
                input2: '',
                input3: '',
                input4: '',
                input5: '',
                input6: '',
                input7: '',
                input8: ''
            },
            //性别
            model1: '',
            instruyName: '',
            ListData1: [
                {
                    value: '男',
                    label: '男'
                },
                {
                    value: '女',
                    label: '女'
                }
            ],
            //行业
            model2: '',
            ListData2: [],
            //职业
            model3: '',
            ListData3: [],
            zhiweiName: '',
            //经验
            model4: '',
            ListData4: [],
            work: '',
            objName: '',
            imgUrl: '',
            //开户行
            imgUrlaaaa: '',
            imgUrlddd: '',
            model5: '',
            ListData5: [],
            model6: '',
            ListData6: [
                {
                    value: '3年',
                    label: '3年'
                },
                {
                    value: '5年',
                    label: '5年'
                }
            ],
            CheckBox: [],
            checkBoxData: [],
            joinData: ''
        };
    },
    created() {
        this.BankInquiry();
        this.requwstparTimeJob();
    },
    mounted() {
        this.getindustryList();
        this.WorkExperienceSelection();
    },
    methods: {
        // 正面
        successUploaddow(res, file, fileList) {
            if (res.code == 200) {
                this.imgUrldata = localStorage.getItem('imgUrl') + res.data;
                this.imgUrlaaaa = res.data;
            }
        },
        // 反面
        successUpload(response, file, fileList) {
            if (response.code == 200) {
                this.imgUrl = localStorage.getItem('imgUrl') + response.data;
                this.imgUrlddd = response.data;
            }
        },
        preservationBtn() {
            this.AddNewPeopleData();
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
                            const nweData = data.data;
                            this.ListData5 = nweData;
                        }
                    }
                })
                .catch((err) => {});
        },
        // 查询行业
        getindustryList() {
            this.$axios.get('admin/industry/list').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.ListData2 = data.data;
                    }
                }
            });
        },
        // 选择行业
        model2change(value) {
            let obj = {};
            obj = this.ListData2.find((item) => {
                return item.id === value;
            });
            this.instruyName = obj.name;
            this.getPositionList(value);
        },
        // 选择行业change
        getPositionList(val) {
            this.$axios.get('admin/job/manage/getPositionList/' + val).then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.ListData3 = data.data;
                    }
                }
            });
        },
        zhiweiChange(val) {
            let obj = {};
            obj = this.ListData3.find((item) => {
                return item.id === val;
            });
            this.zhiweiName = obj.jobName;
        },
        // 兼职类型Change
        chagneStatus() {
            const joinData = this.CheckBox.join(';');
            this.joinData = joinData;
        },
        // 兼职类型
        requwstparTimeJob() {
            const url = 'admin/sideline/list_sideline_type';
            this.$axios
                .get(url)
                .then((res) => {
                    if (res.status == 200) {
                        const data = res.data;
                        if (data.code == 200) {
                            const dataNew = data.data;
                            this.checkBoxData = dataNew;
                        } else {
                        }
                    }
                })
                .catch((err) => {});
        },
        //change工作经验
        WorkExperience(val) {
            this.work = val;
            console.log(this.model4);
            let obj = {};
            obj = this.ListData4.find((item) => {
                return item.bm === val;
            });
            this.objName = obj.name;
        },
        // 工作经验
        WorkExperienceSelection() {
            const url = 'admin/sideline/list_work_experience';
            this.$axios
                .get(url)
                .then((res) => {
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            const dafa = res.data.data;
                            this.ListData4 = dafa;
                        } else {
                        }
                    }
                })
                .catch((err) => {});
        },
        // 保存
        AddNewPeopleData() {
            const url = 'admin/sideline/management/save_user';
            const data = {
                userName: this.formRight.input1,
                phoneNumber: this.formRight.input2,
                gender: this.model1,
                industryName: this.instruyName,
                career: this.zhiweiName,
                workExperiences: this.objName,
                workExperiencesLevel: this.work,
                addressArea: this.address,
                addressDetail: this.formRight.input6,
                idCardPicBack: this.imgUrlaaaa,
                idCardPicFront: this.imgUrlddd,
                bankCode: this.model5,
                bankName: this.formRight.input3,
                bankUserName: this.formRight.input4,
                bankCardNumber: this.formRight.input5,
                sidelineType: this.joinData,
                userAccount: this.formRight.input7
            };
            this.$axios
                .post(url, data)
                .then((res) => {
                    if (res.status == 200) {
                        alert(res.data.msg);
                        if (res.data.code == 200) {
                            setTimeout(() => {
                                this.$router.push({
                                    path: '/Personnel'
                                });
                            }, 500);
                        }
                    } else {
                        alert(res.data.msg);
                    }
                })
                .catch((err) => {});
        }
    }
};
</script>

<style scope>
.peapleCLass {
    box-sizing: border-box;
    padding: 20px 50px 120px 50px;
    margin-top: 20px;
}
.countCLass {
    padding: 0;
}
h3 {
    padding: 20px 0px;
}
.ulClassAddPeople {
    padding: 20px 80px;
}
.InputClass {
    width: 270px;
}
.InputClasser {
    width: 360px;
}
.Btnbutton {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
}
.BTnClass {
    padding: 0px 36px;
}
.xxdiClass {
    padding: 8px 20px;
}
.Margin {
    margin: 10px;
}
</style>
