<template>
    <!-- 发布商机 -->
    <div class="aeditbusiness" id="aeditbusiness">
        <div class="addbusiness-top">
            <label>修改商机信息</label>
        </div>
        <el-form :model="editbus" :rules="rules" ref="editbus">
            <el-form-item label="商机标题:" prop="busTitle" :label-width="labelwidth">
                <el-input class="elinput" v-model="editbus.busTitle" placeholder="输入的商机主题"></el-input>
            </el-form-item>
            <el-form-item label="行业类型:" prop="hangyeleixing" :label-width="labelwidth">
                <el-select v-model="editbus.hangyeleixing" placeholder="行业类型">
                    <el-option
                        v-for="item in option"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商机类型:" prop="busleixing" :label-width="labelwidth">
                <el-select v-model="editbus.busleixing" placeholder="商机类型">
                    <el-option
                        v-for="item in busOption"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商机标签:" prop="tdynamicTags" :label-width="labelwidth">
                <el-tag
                    :key="item"
                    v-for="item in this.editbus.tdynamicTags"
                    v-model="editbus.tdynamicTags"
                    class="eltag"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tdynamicTags)"
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
                <el-button
                    v-else
                    class="button-new-tag"
                    type="text"
                    size="small"
                    @click="showInput"
                >
                    <i class="el-icon-circle-plus-outline"></i>
                </el-button>
            </el-form-item>
            <el-form-item label="商机图片:" prop="shangjiimgUrl" :label-width="labelwidth">
                <label style="color: #C1C1C1; display: block;" class>(轮播展示图)</label>
                <label>{{this.length + '/5'}}</label>
                <el-upload
                    class="avatar-uploader"
                    :action="action"
                    list-type="picture-card"
                    accept="image/*"
                    :limit="5"
                    :on-change="changeUpload"
                    :auto-upload="true"
                    :on-success="imgUploadSuccess"
                    :on-remove="removeUpload"
                    :file-list="listFiel"
                    ref="upload"
                    multiple
                >
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="项目描述:" prop="xiangmumiaoshu" :label-width="labelwidth">
                <el-upload
                    :with-credentials="true"
                    multiple
                    class="quill-upload"
                    :action="action"
                    style="display: none;width:0"
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
                    v-model="editbus.xiangmumiaoshu"
                    :options="editorOption"
                ></quill-editor>
            </el-form-item>
            <el-form-item label="项目所在地:" prop="address" :label-width="labelwidth">
                <el-cascader
                    v-model="editbus.address"
                    :options="editressOptions"
                    @change="handleChange"
                ></el-cascader>
                <el-input
                    style="width: 200px; margin-left:20px;"
                    v-model="editbus.detailaddress"
                    placeholder="输入详细地址"
                ></el-input>
            </el-form-item>
        </el-form>
        <div class="editBtn">
            <el-button @click="baocunBtns" class="addbusBtn">保存</el-button>
        </div>
    </div>
</template>

<script>
import citydata from '../../../api/address.json';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor, Quill } from 'vue-quill-editor';
export default {
    name: 'vaeditbusiness',
    data() {
        const toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],

            [
                {
                    header: 1
                },
                {
                    header: 2
                }
            ], // custom button values
            [
                {
                    list: 'ordered'
                },
                {
                    list: 'bullet'
                }
            ],
            [
                {
                    script: 'sub'
                },
                {
                    script: 'super'
                }
            ], // superscript/subscript
            [
                {
                    indent: '-1'
                },
                {
                    indent: '+1'
                }
            ], // outdent/indent
            [
                {
                    direction: 'rtl'
                }
            ], // text direction

            [
                {
                    size: ['small', false, 'large', 'huge']
                }
            ], // custom dropdown
            [
                {
                    header: [1, 2, 3, 4, 5, 6, false]
                }
            ],

            [
                {
                    color: []
                },
                {
                    background: []
                }
            ], // dropdown with defaults from theme
            [
                {
                    font: []
                }
            ],
            [
                {
                    align: []
                }
            ],
            ['image'],
            ['clean'] // remove formatting button
        ];
        return {
            action: localStorage.getItem('actionUrl'),
            labelwidth: '220px',
            tdynamicTags: [],
            inputVisible: false,
            inputValue: '',
            content: '',
            editorOption: {
                placeholder: '请输入内容',
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
            editressOptions: [],
            option: [],
            busOption: [],
            listFiel: [],
            editbus: {
                busTitle: '',
                hangyeleixing: '',
                tdynamicTags: [],
                shangjiimgUrl: [],
                xiangmumiaoshu: '',
                detailaddress: '',
                busleixing: ''
            },
            rules: {
                busTitle: [
                    {
                        required: true,
                        message: '请输入商机主题',
                        trigger: 'blur'
                    }
                ],
                hangyeleixing: [
                    {
                        required: true,
                        message: '请选择',
                        trigger: 'blur'
                    }
                ],
                busleixing: [
                    {
                        required: true,
                        message: '请选择',
                        trigger: 'blur'
                    }
                ],
                tdynamicTags: [
                    {
                        required: true,
                        message: '商机标签不能为空',
                        trigger: 'blur'
                    }
                ],
                shangjiimgUrl: [
                    {
                        required: false,
                        message: '商机图片不能为空',
                        trigger: 'blur'
                    }
                ],
                xiangmumiaoshu: [
                    {
                        required: true,
                        message: '项目描述不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            imgList: [],
            imgUrl: [],
            loading: '',
            province: '',
            city: '',
            region: '',
            fileList: [],
            length: ''
        };
    },
    created() {
        this.editressOptions = citydata;
    },
    mounted() {
        this.getqueryAllChanceType();
        this.getIndustryData();
        this.getChanceInfo();
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
            }
            // loading动画消失
            this.quillUpdateImg = false;
        },
        // 图片
        changeUpload(file, fileList) {
            var url = window.URL.createObjectURL(file.raw);
            this.editbus.shangjiimgUrl = url;
            this.editbus.file = file;
            this.imgList = fileList;
            this.length = fileList.length;
        },
        removeUpload(file, fileList) {
            if (fileList) {
                var ddataUrl = [];
                let aaa = /\.(png|svg|jpg|gif|woff|woff2|svg|eot|ttf)$/;
                fileList.forEach((val, index) => {
                    if (aaa.test(val.url) == true) {
                        ddataUrl[index] = val.url.substring(val.url.lastIndexOf('/image'));
                    }
                });
                this.imgList = ddataUrl;
                this.imgUrl = this.imgList;
                this.length = this.imgList.length;
            }
        },
        imgUploadSuccess(response, file, fileList) {
            if (response.code == 200) {
                this.imgUrl.push(response.data);
                this.length = this.imgUrl.length;
            }
            if (this.imgUrl.length == fileList.length) {
                this.postChanceUpdate();
            }
        },
        handleClose(tdynamicTags) {
            this.editbus.tdynamicTags.splice(this.editbus.tdynamicTags.indexOf(tdynamicTags), 1);
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick((_) => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.editbus.tdynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        // 地址
        handleChange(value) {
            if (value.length == 2) {
                this.province = '';
                this.city = value[0];
                this.region = value[1];
            } else if (value.length == 3) {
                this.province = value[0];
                this.city = value[1];
                this.region = value[2];
            }
        },
        // 行业类型查询
        getIndustryData() {
            this.$axios.get('api/home/industry').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.option = data.data;
                    } else {
                        this.$message({
                            showClose: true,
                            message: '行业类型查询失败',
                            type: 'error'
                        });
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: '行业类型查询失败',
                        type: 'error'
                    });
                }
            });
        },
        // 查询商机类型
        getqueryAllChanceType() {
            this.$axios.get('api/chance/queryAllChanceType').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.busOption = data.data;
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
        // 保存 修改 按钮
        baocunBtns() {
            this.$refs.editbus.validate((valid) => {
                if (valid) {
                    this.$confirm('是否确定修改标题为【' + this.editbus.busTitle + '】的商机?', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        const loading = this.$loading({
                            lock: true,
                            text: '修改中...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        let data = {
                            province: this.province,
                            city: this.city,
                            region: this.region,
                            detailAddress: this.editbus.detailaddress,
                            industryType: this.editbus.hangyeleixing,
                            label: this.editbus.tdynamicTags.join(','),
                            pic: this.imgUrl.join(','),
                            projectDescribe: this.editbus.xiangmumiaoshu,
                            title: this.editbus.busTitle,
                            type: this.editbus.busleixing,
                            cover: '',
                            id: this.$route.query.id
                        };
                        this.$axios.post('admin/chance/chanceUpdate', data).then((res) => {
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
                                        path: './business'
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
        // 详情查询
        getChanceInfo() {
            let id = this.$route.query.id;
            this.$axios.get('admin/chance/chanceInfo?chanceId=' + id).then((res) => {
                this.fullscreenLoading = false;
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        let formData = data.data;
                        this.editbus.busTitle = formData.title;
                        var labelText = [];
                        formData.label.split(',').forEach(function (val, index) {
                            labelText[index] = val;
                        });
                        this.editbus.tdynamicTags = labelText;
                        var list = [];
                        var imgData = [];
                        var img = /^(https):\/\/.+$/;
                        this.imgUrl = formData.pic.split(',');
                        formData.pic.split(',').forEach(function (val, index) {
                            var sdas = img.test(val);
                            if (sdas == true) {
                                list[index] = val;
                            } else {
                                list[index] = localStorage.getItem('imgUrl') + val;
                            }
                        });
                        this.imgList = list;
                        this.length = this.imgList.length;
                        this.listFiel = list.map((i) => {
                            var obj = {};
                            obj.url = i;
                            return obj;
                        });
                        this.editbus.xiangmumiaoshu = formData.projectDescribe;
                        var addressData = formData.province + ',' + formData.city + ',' + formData.region;
                        this.editbus.address = addressData.split(',');
                        this.editbus.detailaddress = formData.detailAddress;
                        // 行业类型转换
                        if (this.option) {
                            var name = '';
                            this.option.forEach(function (val, index) {
                                if (formData.industryType == val.id) {
                                    name = val.name;
                                }
                            });
                            this.editbus.hangyeleixing = formData.industryType;
                        }
                        // 商机类型转换
                        if (this.busOption) {
                            var shoppleixing = '';
                            this.busOption.forEach(function (val, index) {
                                if (formData.type == val.id) {
                                    shoppleixing = val.name;
                                }
                            });
                            this.editbus.busleixing = formData.type;
                        }
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
.el-form-item__label {
    text-align: right;
}

.aeditbusiness {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
}

.addbusiness-top {
    width: 100%;
    height: 45px;
    background-color: #fafbfa;
    line-height: 45px;
    padding-left: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
}

.elinput.el-input .el-input__inner {
    border: 0px;
    width: 203px;
    border-radius: 0;
    border-bottom: 1px solid #c1c1c1;
}

img {
    width: 100px;
    height: 100px;
}

.editor {
    width: 800px;
}

.addbus .el-select {
    float: left;
}

.el-form-item {
    position: relative;
}

.el-cascader {
    display: inline-block;
}
.elselect {
    width: 203px;
    display: inline-block;
    border: 0px;
    margin-left: 30px;
    border-radius: 0px;
}
.elselect .el-input__inner {
    width: 215px;
}
.editBtn {
    width: 100%;
    text-align: center;
}
.editBtn .addbusBtn {
    width: 90px;
    height: 30px;
    background-color: #2482d2;
    color: #fff;
    margin-top: 30px;
    padding: 0;
}

.input-new-tag {
    width: 203px;
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
}

.eltag {
    margin-left: 10px;
}
.aeditbusiness .el-form-item__label {
    text-align: right;
}
</style>
