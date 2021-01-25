<template>
    <div class="addrenting" id="addrenting">
        <el-form
            :model="rentForm"
            :rules="rules"
            ref="rentForm"
            label-width="100px"
            class="demo-ruleForm"
        >
            <div class="addrent">编辑房源信息</div>
            <el-form-item label="封面:" prop="imageUrl" :label-width="labelWidth">
                <el-upload
                    class="avatar-uploader"
                    accept="image/*"
                    :action="action"
                    list-type="picture-card"
                    :auto-upload="true"
                    :show-file-list="false"
                    :on-success="fmSuccess"
                >
                    <img
                        v-if="rentForm.imageUrl"
                        width="100%"
                        height="100%"
                        :src="rentForm.imageUrl"
                    />
                    <i v-else class="el-icon-plus"></i>
                </el-upload>
                <label></label>
            </el-form-item>
            <el-form-item label="上传的视频:" prop="videoUrl" :label-width="labelWidth">
                <el-upload
                    class="upload-demo"
                    :action="uploadUrl"
                    accept="video/*"
                    :on-success="uploadVideoUrl"
                    :auto-upload="true"
                    :show-file-list="false"
                    ref="uploadvideo"
                >
                    <video
                        ref="videoPlayer"
                        width="400"
                        height="100%"
                        controls
                        style="display:block;"
                        controlslist="nodownload"
                        v-if="rentForm.videoUrl"
                        :src="rentForm.videoUrl"
                        class="video"
                    ></video>
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="房源标题名称:" prop="houseTitle" :label-width="labelWidth">
                <el-input
                    class="input"
                    v-model="rentForm.houseTitle"
                    placeholder="例如：云岩区三桥中坝路天骄北苑，包物业，拧包入驻"
                ></el-input>
            </el-form-item>
            <el-form-item label="房源图片:" prop="houseImgUrl" :label-width="labelWidth">
                <el-upload
                    class="avatar-uploader"
                    accept="image/*"
                    :action="action"
                    :limit="5"
                    list-type="picture-card"
                    :auto-upload="true"
                    :on-success="Success"
                    :on-remove="handleRemove"
                    ref="uploadduotu"
                    :file-list="listFiel"
                    multiple
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="房屋介绍:" prop="houseIntroduce" :label-width="labelWidth">
                <el-input
                    class="textarea"
                    :show-word-limit="true"
                    maxlength="200"
                    type="textarea"
                    v-model="rentForm.houseIntroduce"
                    placeholder="请输入房屋介绍 ... "
                ></el-input>
            </el-form-item>
            <el-form-item label="房屋亮点:" prop="dynamicTags" :label-width="labelWidth">
                <el-tag
                    :key="index"
                    v-for="(item, index) in this.rentForm.dynamicTags"
                    v-model="rentForm.dynamicTags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(index)"
                >{{item}}</el-tag>
                <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                ></el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">新增亮点</el-button>
            </el-form-item>
            <div class="addrent">基础信息</div>
            <el-form-item label="房屋类型:" prop="houseType" :label-width="labelWidth">
                <el-select v-model="rentForm.houseType" placeholder="请选择房屋类型">
                    <!-- @change="houseTypeLab" -->
                    <el-option
                        v-for="(item, index) in optionHouse"
                        :key="index"
                        :label="item.typeName"
                        :value="item.typeName"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出租方式:" prop="houselease" :label-width="labelWidth">
                <el-select v-model="rentForm.houselease" placeholder="请选择房屋出租方式">
                    <!-- @change="LeaseHouse" -->
                    <el-option
                        v-for="(item, index) in optionLet"
                        :key="index"
                        :label="item.letWay"
                        :value="item.letWay"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="小区名称:" prop="village" :label-width="labelWidth">
                <el-input
                    class="village"
                    v-model="rentForm.village"
                    placeholder="例如：云岩区三桥中坝路天骄北苑，包物业，拧包入驻"
                ></el-input>
            </el-form-item>
            <el-form-item label="小区地址:" prop="villageaddress" :label-width="labelWidth">
                <el-cascader
                    v-model="rentForm.villageaddress"
                    :options="addressOptions"
                    @change="handleChange"
                    placeholder="请选择"
                ></el-cascader>
                <el-input class="input" v-model="rentForm.villageaddresstext" placeholder="请输入详细地址"></el-input>
            </el-form-item>
            <el-form-item label="建筑面积:" prop="villagearea" :label-width="labelWidth">
                <el-input
                    class="input"
                    v-model.number="rentForm.villagearea"
                    oninput="value=value.replace(/[^0-9.]/g,'')"
                    placeholder="请输入建筑面积"
                ></el-input>㎡
            </el-form-item>
            <el-form-item label="房屋户型:" prop="houselayout" :label-width="labelWidth">
                <el-select v-model="rentForm.houselayout" placeholder="请选择房屋户型">
                    <!-- @change="houseLayout" -->
                    <el-option
                        v-for="(item, index) in optionLayoutAll"
                        :key="index"
                        :label="item.layout"
                        :value="item.layout"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="朝向:" prop="houseorientation" :label-width="labelWidth">
                <el-select v-model="rentForm.houseorientation" placeholder="请选择房屋朝向">
                    <el-option
                        v-for="(item, index) in optionshaoxiang"
                        :key="index"
                        :label="item.label"
                        :value="item.label"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="楼层:" prop="houseNum" :label-width="labelWidth">
                <el-input
                    class="input"
                    v-model="rentForm.houseNum"
                    oninput="value=value.replace(/[^0-9]/g,'')"
                    placeholder="请输入楼层"
                ></el-input>层
            </el-form-item>
            <el-form-item label="租金详情:" prop="rentPrice" :label-width="labelWidth">
                <el-input
                    class="input"
                    v-model="rentForm.rentPrice"
                    oninput="value=value.replace(/[^0-9.]/g,'')"
                    placeholder="请输入租金"
                ></el-input>元/月
            </el-form-item>
            <el-form-item label="租金方式:" prop="method" :label-width="labelWidth">
                <!--  @change="methodfangfa" -->
                <el-select v-model="rentForm.method" placeholder="请选择租金方式">
                    <el-option
                        v-for="(item, index) in optionmethod"
                        :key="index"
                        :label="item.rentWay"
                        :value="item.rentWay"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="房屋配置:" prop="housedeploy" :label-width="labelWidth">
                <el-checkbox-group
                    class="addrenting-checkeed"
                    v-model="rentForm.housedeploy"
                    size="small"
                >
                    <el-checkbox-button
                        class="elcheckbox"
                        v-for="item in cities"
                        :label="item.id"
                        :key="item.id"
                    >{{item.dispose}}</el-checkbox-button>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <div class="formbutton">
            <el-button @click="quxaio" type="primary">取消</el-button>
            <el-button @click="fabufw" type="primary">发布</el-button>
        </div>
    </div>
</template>

<script>
import citydata from '../../../api/address.json';
export default {
    name: 'addrenting',
    data() {
        return {
            action: localStorage.getItem('actionUrl'),
            uploadUrl: localStorage.getItem('videoUrl'),
            labelWidth: '220px',
            inputValue: '',
            optionLet: [],
            optionHouse: [],
            optionLayoutAll: [],
            videoUrlList: [],
            optionmethod: [],
            listFiel: [],
            // 朝向
            optionshaoxiang: [
                {
                    value: 0,
                    label: '不限'
                },
                {
                    value: 1,
                    label: '东'
                },
                {
                    value: 2,
                    label: '西'
                },
                {
                    value: 3,
                    label: '南'
                },
                {
                    value: 4,
                    label: '北'
                },
                {
                    value: 5,
                    label: '东南'
                },
                {
                    value: 6,
                    label: '东北'
                },
                {
                    value: 7,
                    label: '西南'
                },
                {
                    value: 8,
                    label: '西北'
                }
            ],
            cities: [],
            rentForm: {
                id: '',
                imageUrl: '',
                videoUrl: '',
                houseTitle: '',
                houseImgUrl: '',
                houseIntroduce: '',
                houseType: '',
                houselease: '',
                village: '',
                villageaddress: '',
                villagearea: '',
                houselayout: '',
                houseNum: '',
                houseorientation: '',
                dynamicTags: [],
                villageaddresstext: '',
                rentPrice: '',
                method: '',
                housedeploy: [],
                file: {}
            },
            rules: {
                imageUrl: {
                    required: true,
                    message: '请选择封面图片',
                    trigger: 'blur'
                },
                houseTitle: {
                    required: true,
                    message: '请输入房源标题',
                    trigger: 'blur'
                },
                houseImgUrl: {
                    required: true,
                    message: '请输入房源图片',
                    trigger: 'blur'
                },
                houseIntroduce: {
                    required: true,
                    message: '请输入房屋介绍',
                    trigger: 'blur'
                },
                houseType: {
                    required: true,
                    message: '请选择房屋类型',
                    trigger: 'blur'
                },
                village: {
                    required: true,
                    message: '请输入小区名称',
                    trigger: 'blur'
                },
                houselease: {
                    required: true,
                    message: '请选择出租方式',
                    trigger: 'blur'
                },
                villageaddress: {
                    required: true,
                    message: '请选择小区地址',
                    trigger: 'blur'
                },
                villagearea: [
                    {
                        required: true,
                        message: '请输入建筑面积',
                        trigger: 'blur'
                    }
                ],
                houselayout: {
                    required: true,
                    message: '请选择户型',
                    trigger: 'blur'
                },
                houseorientation: {
                    required: true,
                    message: '请选择朝向',
                    trigger: 'blur'
                },
                dynamicTags: {
                    required: true,
                    message: '请增加房屋亮点',
                    trigger: 'blur'
                },
                houseNum: [
                    {
                        required: true,
                        message: '请输入楼层',
                        trigger: 'blur'
                    }
                ],
                rentPrice: [
                    {
                        required: true,
                        message: '请输入租金详情',
                        trigger: 'blur'
                    }
                ],
                method: {
                    required: true,
                    message: '请输入租金方式',
                    trigger: 'blur'
                },
                housedeploy: {
                    required: true,
                    message: '请选择房屋的配置',
                    trigger: 'blur'
                }
            },
            inputVisible: false,
            imgList: [],
            imgUrl: [],
            fmImgUrl: '', // 封面的
            videoUrlD: '',
            loading: false,
            addressOptions: citydata
        };
    },
    mounted() {
        this.getDataRenting();
        this.getLetAll();
        this.getLayoutAll();
        this.getselectAllRent();
        this.getSelectAllDispose();
        this.gettypeAll();
    },
    methods: {
        quxaio() {
            this.$router.push({
                path: './renting'
            });
        },

        handleRemove(file, fileList) {
            // this.imgList = fileList;
            var ddataUrl = [];
            let aaa = /\.(png|svg|jpg|gif|woff|woff2|svg|eot|ttf)$/;
            fileList.forEach((val, index) => {
                if (aaa.test(val.url) == true) {
                    ddataUrl[index] = val.url.substring(val.url.lastIndexOf('/image'));
                }
            });
            this.imgList = ddataUrl;
            this.imgUrl = ddataUrl;
        },

        // 房屋图片
        Success(response, file, fileList) {
            if (response.code == 200) {
                this.imgUrl.push(response.data || '');
            }
        },
        //封面上传成功
        fmSuccess(response, file, fileList) {
            if (response.code == 200) {
                this.fmImgUrl = response.data;
                this.rentForm.imageUrl = localStorage.getItem('imgUrl') + response.data;
            } else {
                this.$message({
                    showClose: true,
                    message: '图片上传失败',
                    type: 'error'
                });
            }
        },
        // 视频成功的回调
        uploadVideoUrl(response, file, fileList) {
            if (response.code == 200) {
                this.videoUrlD = response.data;
                this.rentForm.videoUrl = localStorage.getItem('imgUrl') + response.data;
            } else {
                this.$message({
                    showClose: true,
                    message: '视频上传失败',
                    type: 'error'
                });
            }
        },
        handleClose(index) {
            this.rentForm.dynamicTags.splice(this.rentForm.dynamicTags.indexOf(index), 1);
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick((_) => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleChange(value) {},
        handleInputConfirm() {
            let inputValue = this.inputValue;
            let indexList = this.rentForm.dynamicTags.length;

            let a = indexList + 1;
            if (inputValue) {
                this.rentForm.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        // 租金方式查询
        getselectAllRent() {
            this.$axios.get('admin/renting/rent/selectAllRent').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.optionmethod = data.data.data;
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
        // 查询房屋配置
        getSelectAllDispose() {
            this.$axios.get('admin/admin/dispose/selectAllDispose').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.cities = data.data.data;
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
        // 查询房屋的出租方式
        getLetAll() {
            this.$axios.get('admin/admin/let/selectAllLet').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.optionLet = data.data.data;
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
        // 查询房屋房屋户型
        getLayoutAll() {
            this.$axios.get('admin/admin/layout/selectAllLayout').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.optionLayoutAll = data.data.data;
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
        // 查询房屋类型
        gettypeAll() {
            this.$axios.get('admin/renting/type/selectAllType').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.optionHouse = data.data.data;
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
        fabufw() {
            this.$refs.rentForm.validate((valid) => {
                if (valid) {
                    this.$confirm('是否确定发布标题为【' + this.rentForm.houseTitle + '】的房源?', '温馨提示', {
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
                            mainImage: this.fmImgUrl,
                            houseVideo: this.videoUrlD,
                            imageJson: this.imgUrl.join(','),
                            houseTitle: this.rentForm.houseTitle,
                            introduce: this.rentForm.houseIntroduce,
                            highlights: this.rentForm.dynamicTags.join(','),
                            typeName: this.rentForm.houseType, //房屋类型
                            let: this.rentForm.houselease,
                            province: this.rentForm.villageaddress[0], //小区地址
                            city: this.rentForm.villageaddress[1],
                            region: this.rentForm.villageaddress[2],
                            villageName: this.rentForm.village,
                            area: this.rentForm.villagearea,
                            layout: this.rentForm.houselayout,
                            houseOrientation: this.rentForm.houseorientation,
                            houseFloor: this.rentForm.houseNum,
                            address: this.rentForm.villageaddresstext,
                            disposeIds: this.rentForm.housedeploy,
                            rent: this.rentForm.method,
                            price: this.rentForm.rentPrice * 100,
                            id: this.rentForm.id
                        };
                        this.$axios.post('admin/renting/manage/edit/houseDetail', data).then((res) => {
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
                                        path: './renting'
                                    });
                                    this.$axios
                                        .get('admin/renting/manage/update/status?id=' + parseInt(this.rentForm.id) + '&status=2')
                                        .then((res) => {
                                            // if(res.)
                                            console.log(res);
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
                }
            });
        },
        getDataRenting() {
            var id = this.$route.query.data;
            this.$axios.get('admin/renting/manage/select/' + id).then((res) => {
                this.fullscreenLoading = false;
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        var dataList = data.data;
                        var aaas = /^(https):\/\/.+$/;
                        this.fmImgUrl = dataList.mainImage;
                        if (aaas.test(dataList.mainImage)) {
                            this.rentForm.imageUrl = dataList.mainImage;
                        } else {
                            this.rentForm.imageUrl = localStorage.getItem('imgUrl') + dataList.mainImage;
                        }
                        this.videoUrlD = dataList.houseVideo;
                        if (dataList.houseVideo) {
                            if (aaas.test(dataList.houseVideo)) {
                                this.rentForm.videoUrl = dataList.houseVideo;
                            } else {
                                this.rentForm.videoUrl = localStorage.getItem('imgUrl') + dataList.houseVideo;
                            }
                        }
                        this.rentForm.houseTitle = dataList.houseTitle;
                        var list = [];
                        this.imgUrl = dataList.imageJson.split(',');
                        dataList.imageJson.split(',').forEach(function (val, index) {
                            if (aaas.test(val)) {
                                list[index] = val;
                            } else {
                                list[index] = localStorage.getItem('imgUrl') + val;
                            }
                        });
                        this.rentForm.houseImgUrl = list;
                        this.listFiel = list.map((i) => {
                            var obj = {};
                            obj.url = i;
                            return obj;
                        });
                        this.rentForm.houseIntroduce = dataList.introduce;
                        var jieshao = [];
                        dataList.highlights.split(',').forEach(function (val, index) {
                            jieshao[index] = val;
                        });
                        this.rentForm.dynamicTags = jieshao;
                        this.rentForm.houseIntroduce = dataList.introduce;
                        this.rentForm.houselease = dataList.let;
                        this.rentForm.village = dataList.villageName;
                        let dataaddressvill = dataList.province + '/' + dataList.city + '/' + dataList.region;
                        this.rentForm.villageaddress = dataaddressvill.split('/');
                        this.rentForm.villageaddresstext = dataList.address;
                        this.rentForm.villagearea = dataList.area;
                        this.rentForm.houselayout = dataList.layout;
                        this.rentForm.houseorientation = dataList.houseOrientation;
                        this.rentForm.houseNum = dataList.houseFloor;
                        this.rentForm.rentPrice = dataList.price / 100;
                        this.rentForm.method = dataList.rent;
                        this.rentForm.id = dataList.id;
                        let dataid = [];
                        dataList.disposeId.forEach(function (val, index) {
                            dataid[index] = val.id;
                        });
                        this.rentForm.housedeploy = dataid;
                        this.rentForm.houseType = dataList.typeName;
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
        }
    }
};
</script>

<style>
.addrenting {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
}

.addrent {
    width: 100%;
    height: 45px;
    background: #fafbfa;
    margin-top: 20px;
    line-height: 45px;
    padding-left: 20px;
    font-size: 14px;
}

.addrenting .el-form-item {
    margin-top: 30px;
    margin-left: 50px;
}

.addrenting .el-form-item .el-input {
    width: 200px;
    /* border: 0px; */
    margin-left: 10px;
    /* border-bottom: 1px solid #E7E1CD; */
}

.addrenting .el-input .el-input__inner {
    border: 0px;
    border-radius: 0;
    border-bottom: 1px solid #e7e1cd;
}
.el-textarea {
    width: 613px;
    height: 186px;
}
.el-textarea .el-textarea__inner {
    width: 613px;
    height: 186px;
}

.formbutton {
    width: 100%;
}

.formbutton .el-button {
    width: 90px;
    height: 30px;
    margin-left: 100px;
}
.formbutton .el-button:nth-child(1) {
    margin-left: 500px;
}
.el-tag + .el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
.elcheckbox {
    width: 100px;
    margin-left: 10px;
}
.elcheckbox .el-checkbox-button__inner {
    width: 100px;
    margin-left: 10px;
    border: 1px solid #c1c1c1;
    border-radius: 8px;
}

.el-checkbox-button:first-child .el-checkbox-button__inner {
    border-radius: 8px;
}

.el-checkbox-button:last-child .el-checkbox-button__inner {
    border-radius: 8px;
}
.addrenting-checkeed {
    width: 50%;
}
.addrenting-checkeed .elcheckbox {
    margin-top: 10px;
}
.upload-demo .el-upload--text {
    width: 400px;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    height: auto;
}
</style>
