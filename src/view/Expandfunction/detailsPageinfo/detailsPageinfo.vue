<template>
    <div>
        <div class="FatherClassStyle">
            <h4 class="topnavClass">填写公告内容</h4>
            <Form :model="formItem" :label-width="150" label-colon>
                <FormItem label="公告标题">
                    <input
                        v-model="formItem.input"
                        class="inputCtyle"
                        placeholder="请输入公告标题..."
                        style="width:200px"
                    />
                </FormItem>
                <FormItem label="公告范围">
                    <Select v-model="formItem.select" style="width:200px">
                        <Option
                            v-for="(item,index) in xiaoyuerData"
                            :value="item.index"
                            :key="index"
                        >{{ item.OptionData }}</Option>
                    </Select>
                </FormItem>
                <!--附文本-->
                <FormItem label="公告详情">
                    <div class="edit_container">
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
                        <!-- :content="content" -->
                        <quill-editor
                            ref="myQuillEditor"
                            v-model="formItem.content"
                            :options="editorOption"
                        ></quill-editor>
                    </div>
                </FormItem>
                <div class="BtnClassStyle">
                    <Button type="primary" @click="publishNotice">发布</Button>
                    <Button style="margin-left: 8px" @click="returnCancel">取消</Button>
                </div>
            </Form>
        </div>
    </div>
</template>
<script>
// 附文本
import { quillEditor } from 'vue-quill-editor'; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {
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
        return {
            action: localStorage.getItem('actionUrl'),
            formItem: {
                input: '',
                select: '',
                content: ''
            },
            // 附文本
            content: `请编辑你的富文本内容......`,
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
            xiaoyuerData: [
                {
                    index: 0,
                    OptionData: '全平台'
                },
                {
                    index: 1,
                    OptionData: '商家会员'
                },
                {
                    index: 2,
                    OptionData: '普通会员'
                },
                {
                    index: 3,
                    OptionData: '兼职会员'
                }
            ]
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
    comments: {
        quillEditor //附文本
    },
    computed: {
        // 附文本
        editor() {
            return this.$refs.myQuillEditor.quill;
        }
    },
    methods: {
        beforeAvatarUpload(file) {
            this.$emit('beforeAvatarUpload', file);
        },
        // 富文本图片上传
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
        // 发布公告
        publishNotice() {
            this.$confirm('是否确定发布标题为【' + this.formItem.input + '】的公告?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let data = {
                    detail: this.formItem.content,
                    noticeRange: this.formItem.select,
                    title: this.formItem.input
                };
                const loading = this.$loading({
                    lock: true,
                    text: '发布中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });

                this.$axios.post('admin/platform/publish', data).then((res) => {
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
                                path: './expandfunction'
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
        // 取消按钮
        returnCancel() {
            this.$router.push({
                path: './expandfunction'
            });
        }
    }
};
</script>

<style scope>
.FatherClassStyle {
    box-sizing: border-box;
    padding-right: 80px;
}
.inputCtyle {
    border: 0;
    border-bottom: solid 1px #e9e9e9;
    outline: none;
}
.topnavClass {
    padding: 20px 20px;
}
.BtnClassStyle {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}
.BtnClassStyle button {
    padding: 0 36px;
}
</style>