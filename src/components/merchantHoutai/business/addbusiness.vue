<template>
    <!-- 发布商机 -->
    <div class="addbusiness" id="addbusiness">
        <div class="addbusiness-top">
            <label>填写商机发布信息</label>
        </div>
        <el-form :model="addbus" :rules="rules" ref="addbus">
            <el-form-item label="商机标题:" prop="busTitle" :label-width="labelwidth">
                <el-input class="elinput" v-model="addbus.busTitle" placeholder="输入发布的商机主题"></el-input>
            </el-form-item>
            <el-form-item label="行业类型:" prop="hangyeleixing" :label-width="labelwidth">
                <el-select v-model="addbus.hangyeleixing" placeholder="行业类型">
                    <el-option
                        v-for="(item,index) in option"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商机类型:" prop="busleixing" :label-width="labelwidth">
                <el-select v-model="addbus.busleixing" placeholder="商机类型">
                    <el-option
                        v-for="(item,index) in busOption"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商机标签:" prop="tdynamicTags" :label-width="labelwidth">
                <el-tag
                    :key="item"
                    v-for="item in this.addbus.tdynamicTags"
                    v-model="addbus.tdynamicTags"
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
                <label style="color: #C1C1C1;" class>(轮播展示图)</label>
                <el-upload
                    class="avatar-uploader"
                    :action="action"
                    list-type="picture-card"
                    accept="image/*"
                    :limit="5"
                    :on-change="changeUpload"
                    :auto-upload="false"
                    :on-success="imgUploadSuccess"
                    :on-remove="removeUpload"
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
                    <div class="el-upload__text">
                        将文件拖到此处，或
                        <em>点击上传</em>
                    </div>
                </el-upload>
                <quill-editor
                    ref="myQuillEditor"
                    :content="content"
                    v-model="addbus.xiangmumiaoshu"
                    :options="editorOption"
                ></quill-editor>
            </el-form-item>
            <el-form-item label="项目所在地:" prop="address" :label-width="labelwidth">
                <el-cascader
                    v-model="addbus.address"
                    :options="addressOptions"
                    @change="handleChange"
                    placeholder="请选择"
                ></el-cascader>
                <el-input
                    class
                    style="width:200px; margin-left:20px;"
                    v-model="addbus.detailaddress"
                    placeholder="输入详细地址"
                ></el-input>
            </el-form-item>
        </el-form>
        <div class="addbusBtndiv">
            <el-button @click="addbusBtns" class="addbusBtn">发布</el-button>
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
    name: 'addbusiness',
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
            action: 'http://192.168.0.200:7070/api/expand/upload/image',
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
            addressOptions: [],
            option: [],
            busOption: [],
            addbus: {
                busTitle: '',
                hangyeleixing: '',
                tdynamicTags: [],
                shangjiimgUrl: '',
                xiangmumiaoshu: '',
                address: '',
                detailaddress: ''
            },
            rules: {
                busTitle: [
                    {
                        required: true,
                        message: '请输入要发布的商机主题',
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
                        required: true,
                        message: '商品图片不能为空',
                        trigger: 'blur'
                    }
                ],
                xiangmumiaoshu: [
                    {
                        required: true,
                        message: '项目描述不能为空',
                        trigger: 'blur'
                    }
                ],
                address: [
                    {
                        required: true,
                        message: '项目所在的地点不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            imgList: [],
            imgUrl: [],
            loading: '',
            province: '',
            city: '',
            region: ''
        };
    },
    mounted() {
        this.getqueryAllChanceType();
        this.getIndustryData();
    },
    created() {
        this.addressOptions = citydata;
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
        // 富文本事件
        onEditorBlur() {},
        onEditorFocus() {
            //获得焦点事件
        },
        onEditorChange() {
            //内容改变事件
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
        // 图片
        changeUpload(file, fileList) {
            var url = window.URL.createObjectURL(file.raw);
            this.addbus.shangjiimgUrl = url;
            this.addbus.file = file;
            this.imgList = fileList;
        },
        imgUploadSuccess(response, file, fileList) {
            if (response.code == 200) {
                this.imgUrl.push(response.data || '');
                if (this.imgUrl.length >= this.imgList.length) {
                    let data = {
                        province: this.province,
                        city: this.city,
                        region: this.region,
                        detailAddress: this.addbus.detailaddress,
                        industryType: this.addbus.hangyeleixing,
                        label: this.addbus.tdynamicTags.join(','),
                        pic: this.imgUrl.join(','),
                        projectDescribe: this.addbus.xiangmumiaoshu,
                        title: this.addbus.busTitle,
                        type: this.addbus.busleixing,
                        cover: 'ss'
                    };
                    this.$axios.post('admin/chance/publishChance', data).then((res) => {
                        this.loading.close();
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
                                    message: '添加失败 --' + data.msg,
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
        },
        removeUpload(file, fileList) {
            this.imgList = fileList;
        },
        handleClose(tdynamicTags) {
            this.addbus.tdynamicTags.splice(this.addbus.tdynamicTags.indexOf(tdynamicTags), 1);
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
                this.addbus.tdynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        // 引入地址
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

        // 发布商机
        addbusBtns() {
            this.$refs.addbus.validate((valid) => {
                if (valid) {
                    this.$confirm('是否确定发布标题为【' + this.addbus.busTitle + '】的商机?', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.loading = this.$loading({
                            lock: true,
                            text: '发布中...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        this.$refs.upload.submit();
                    });
                }
            });
        }
    }
};
</script>

<style>
.addbusiness {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
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

.editor {
    width: 800px;
    /* height: 200px; */
}

img {
    width: 100px;
    height: 100px;
}

/* .addbus .el-select {
    float: left;
} */

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
.addbusBtndiv {
    width: 100%;
    text-align: center;
}
.addbusBtndiv .addbusBtn {
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
.quill-editor {
    width: 80%;
}
.ql-editor img {
    width: 200px;
}
</style>
