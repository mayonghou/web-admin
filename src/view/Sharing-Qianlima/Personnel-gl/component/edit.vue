<template>
    <div>
        <div class="Commodity-details">
            <h4 class="h4Classd">填写添加的人员信息</h4>
            <ul>
                <li>
                    <div>姓名：</div>
                    <div>
                        <Input v-model="value0" placeholder="请输入姓名..." style="width: 300px" />
                    </div>
                </li>

                <li>
                    <div>性别：</div>
                    <div>
                        <Input v-model="value1" placeholder="请输入姓名..." style="width: 300px" />
                    </div>
                </li>

                <li>
                    <div>选择行业</div>
                    <div>
                        <Select v-model="model0" style="width:300px" @on-change="onChange">
                            <Option
                                style="padding:0 15px;"
                                v-for="item in this.indusityList"
                                :value="item.id"
                                :key="item.id"
                            >{{ item.name }}</Option>
                        </Select>
                    </div>
                </li>

                <li>
                    <div>选择职业</div>
                    <div>
                        <Select v-model="model1" style="width:300px">
                            <Option
                                style="padding:0 15px;"
                                v-for="item in this.optionsDataList"
                                :value="item.jobName"
                                :key="item.id"
                            >{{ item.jobName }}</Option>
                        </Select>
                    </div>
                </li>

                <li>
                    <div>选择工作经验</div>
                    <div>
                        <Select v-model="model2" style="width:300px">
                            <Option
                                style="padding:0 15px;"
                                v-for="item in cityList2"
                                :value="item.name"
                                :key="item.bm"
                            >{{ item.name }}</Option>
                        </Select>
                    </div>
                </li>

                <li>
                    <div>个人地址</div>
                    <div>
                        <el-cascader
                            v-model="model3"
                            :options="addressOptions"
                            placeholder="请选择"
                            class="InputClass"
                        ></el-cascader>
                        <span>详细地址：</span>
                        <el-input
                            v-model="detailAddress"
                            style="width:280px;"
                            placeholder="请输入详细地址"
                        ></el-input>
                    </div>
                </li>

                <li>
                    <div>身份证照片</div>
                    <div>
                        <br />
                        <p>正面</p>
                        <p>
                            <Upload
                                type="drag"
                                :show-upload-list="false"
                                :on-success="frontSuccess"
                                :action="action"
                            >
                                <div style="padding: 20px 0" v-if="this.frontimgUrl == ''">
                                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                    <p>添加身份证正面</p>
                                </div>
                                <img v-else width="100%" height="100%" :src="this.frontimgUrl" />
                            </Upload>
                        </p>
                        <p>反面</p>
                        <p>
                            <Upload
                                type="drag"
                                :show-upload-list="false"
                                :on-success="againstSuccess"
                                :action="action"
                            >
                                <div style="padding: 20px 0" v-if="this.againstImgUrl == ''">
                                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                    <p>添加身份证反面</p>
                                </div>
                                <img v-else width="100%" height="100%" :src="this.againstImgUrl" />
                            </Upload>
                        </p>
                    </div>
                </li>
            </ul>
            <h4 class="h4Classd h4Classd02">账户信息</h4>
            <ul>
                <li>
                    <div>开户行：</div>
                    <div>
                        <Select v-model="model4" style="width:300px">
                            <Option
                                style="padding:0 15px;"
                                v-for="(item, index) in brackList"
                                :value="item.bm"
                                :key="index"
                            >{{ item.name }}</Option>
                        </Select>
                    </div>
                </li>

                <li>
                    <div>开户网点：</div>
                    <div>
                        <Input v-model="value2" placeholder="请输入姓名..." style="width: 300px" />
                    </div>
                </li>

                <li>
                    <div>开户名称：</div>
                    <div>
                        <Input v-model="value3" placeholder="请输入姓名..." style="width: 300px" />
                    </div>
                </li>

                <li>
                    <div>收款账号</div>
                    <div>
                        <Input v-model="value4" placeholder="请输入姓名..." style="width: 300px" />
                    </div>
                </li>
            </ul>
        </div>
        <div class="buuttonn">
            <Button type="primary" @click="routerTocd">保存</Button>
        </div>
    </div>
</template>

<script>
import citydata from '../../../../api/address.json';
export default {
    data() {
        return {
            action: localStorage.getItem('actionUrl'),
            indusityList: [],
            optionsDataList: [],
            IndusityName: '',
            detailAddress: '',
            addressOptions: citydata,
            model0: '',
            model1: '',
            model2: '',
            model3: '',
            model4: '',
            cityList0: [],
            cityList1: [],
            cityList2: [],
            cityList4: [],
            value0: '',
            value1: '',
            value3: '',
            value2: '',
            value4: '',
            frontimgUrl: '',
            againstImgUrl: '',
            brackList: [],
            idCardPicBack: '',
            idCardPicFront: '',
            phoneNumber: '',
            userAccount: '',
            sidelineType: '',
            workExperiencesLevel: ''
        };
    },
    mounted() {
        this.getIndustyList();
        this.WorkExperienceSelection();
        this.getbrankCode();
    },
    methods: {
        // 正面
        frontSuccess(res, file, fileList) {
            if (res.code == 200) {
                this.frontimgUrl = localStorage.getItem('imgUrl') + res.data;
                this.idCardPicFront = res.data;
            }
        },
        // 反面
        againstSuccess(res, file, fileList) {
            if (res.code == 200) {
                this.againstImgUrl = localStorage.getItem('imgUrl') + res.data;
                this.idCardPicBack = res.data;
            }
        },
        // 获取编辑数据
        getEditData() {
            let datashuju = this.$route.query.data;
            // console.log(datashuju);
            this.id = datashuju.id;
            this.value0 = datashuju.userName;
            this.value1 = datashuju.gender;
            let id = '';
            let industyName = datashuju.industryName;
            this.IndusityName = datashuju.industryName;
            this.indusityList.forEach(function (val, index) {
                if (industyName == val.name) {
                    id = val.id;
                }
            });
            this.model0 = id;
            this.getOptionsList(id);
            this.model1 = datashuju.career;
            this.model2 = datashuju.workExperiences;
            this.sidelineType = datashuju.sidelineType;
            this.model3 = JSON.parse(datashuju.addressArea);
            this.detailAddress = datashuju.addressDetail;
            let https = /^https:\/\/.+$/;
            console.log(https.test(datashuju.idCardPicFront));
            if (https.test(datashuju.idCardPicFront)) {
                this.frontimgUrl = datashuju.idCardPicFront;
                this.idCardPicFront = datashuju.idCardPicFront.substring(datashuju.idCardPicFront.lastIndexOf('/images'));
            } else {
                this.frontimgUrl = localStorage.getItem('imgUrl') + datashuju.idCardPicFront;
                this.idCardPicFront = datashuju.idCardPicFront;
            }
            if (https.test(datashuju.idCardPicBack)) {
                this.againstImgUrl = datashuju.idCardPicBack;
                this.idCardPicBack = datashuju.idCardPicBack.substring(datashuju.idCardPicBack.lastIndexOf('/images'));
            } else {
                this.againstImgUrl = localStorage.getItem('imgUrl') + datashuju.idCardPicBack;
                this.idCardPicBack = datashuju.idCardPicBack;
            }
            this.model4 = parseInt(datashuju.bankCode);
            this.value2 = datashuju.bankName;
            this.value3 = datashuju.bankUserName;
            this.value4 = datashuju.bankCardNumber;
            this.phoneNumber = datashuju.phoneNumber;
            this.userAccount = datashuju.userAccount;
            this.workExperiencesLevel = datashuju.workExperiencesLevel;
        },
        // 工作经验
        WorkExperienceSelection() {
            const url = 'admin/sideline/list_work_experience';
            this.$axios.get(url).then((res) => {
                if (res.status == 200) {
                    if (res.data.code == 200) {
                        const dafa = res.data.data;
                        this.cityList2 = dafa;
                    } else {
                    }
                }
            });
        },
        // 保存按钮
        routerTocd() {
            let datasd = {
                addressArea: this.model3,
                addressDetail: this.detailAddress,
                bankCardNumber: this.value4,
                bankCode: this.model4,
                bankName: this.value2,
                bankUserName: this.value3,
                // businessStatus: 0,
                career: this.model1,
                gender: this.value1,
                id: this.id,
                idCardPicBack: this.idCardPicBack,
                idCardPicFront: this.idCardPicFront,
                industryName: this.IndusityName,
                phoneNumber: this.phoneNumber,
                sidelineType: this.sidelineType,
                userAccount: this.userAccount,
                userName: this.value0,
                workExperiences: this.model2,
                workExperiencesLevel: this.workExperiencesLevel
            };

            this.$axios.post('admin/sideline/management/save_user', datasd).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'success'
                        });
                        this.$router.push({
                            path: './Personnel'
                        });
                    } else {
                        this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'error'
                        });
                    }
                }
            });
        },
        // 获取行业数据
        getIndustyList() {
            this.$axios.get('admin/industry/list').then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.indusityList = data.data;
                        this.getEditData();
                    }
                }
            });
        },
        // 获取行业id
        onChange(id) {
            console.log(id);
            let obj = {};
            obj = this.indusityList.find((item) => {
                return id === item.id;
            });
            this.IndusityName = obj.name;
            this.getOptionsList(id);
        },
        // 获取行业下的职业
        getOptionsList(id) {
            this.$axios.get('admin/job/manage/getPositionList/' + id).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.optionsDataList = data.data;
                    }
                }
            });
        },
        // 获取银行开户行信息
        getbrankCode() {
            this.$axios.get('admin/sideline/list_wx_bank').then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        let datalist = [];
                        data.data.forEach((val, index) => {
                            datalist[index] = val;
                            datalist[index].bm = parseInt(val.bm);
                        });
                        this.brackList = datalist;
                    }
                }
            });
        }
    }
};
</script>

<style scoped>
.Commodity-details {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 0 50px;
    margin-top: 40px;
}
.Commodity-details li {
    width: 100%;
    height: auto;
    list-style-type: none;
    box-sizing: border-box;
    margin: 5px 0px;
    display: flex;
    font-size: 14px;
    padding: 10px 0px;
    line-height: 32px;
}
.Commodity-details li div:nth-child(1) {
    max-width: 200px;
    min-width: 200px;
    text-align: right;
    box-sizing: border-box;
    padding-right: 20px;
    font-weight: 600;
}
.Commodity-details li div:nth-child(2) {
    flex-grow: 1;
    box-sizing: border-box;
}
.buuttonn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
}
.buuttonn button {
    padding: 0px 50px;
    margin-bottom: 60px;
}
.h4Classd {
    height: 46px;
    line-height: 46px;
    box-sizing: border-box;
    padding-left: 10px;
    background-color: rgba(250, 251, 250, 100);
    margin-bottom: 34px;
}
.h4Classd02 {
    margin-bottom: 0px;
    margin-top: 30px;
}
</style>
