<template>
    <div class="rootAop">
        <div class="formClass">
            <h3 class="h3er">填写文章信息</h3>
            <Form :model="formItem" :label-width="120">
                <FormItem label="文章标题">
                    <Input v-model="formItem.title" placeholder="输入文章名称......" style="width:200px" />
                </FormItem>
                <FormItem label="文章描述">
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
                        v-model="formItem.content"
                        :options="editorOption"
                    ></quill-editor>
                </FormItem>
                <FormItem>
                    <div class="BTNClass">
                        <Button type="primary" @click="saveBtn">保存</Button>
                        <Button style="margin-left: 8px" @click="returnClick">取消</Button>
                    </div>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor, Quill } from 'vue-quill-editor';
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
            formItem: {
                title: '',
                id: 0,
                content: ''
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
    mounted() {
        if (this.$route.query.id) {
            this.getxioaData();
        }
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
        // 取消按钮
        returnClick() {
            this.$router.push({
                path: './sonpagecent',
                query: {
                    // queryyu: this.$route.query.qu
                    ineryuer: 3
                }
            });
        },
        // 获取编辑数据
        getxioaData() {
            this.$axios.get('admin/admin/market/knowledge/select/' + this.$route.query.id).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.formItem = data.data;
                    }
                }
            });
        },
        saveBtn() {
            if (this.$route.query.id) {
                this.$axios.post('admin/admin/market/knowledge/update/Knowledge', this.formItem).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: res.data.msg,
                                type: 'success'
                            });
                            this.$router.push({
                                path: './sonpagecent',
                                query: {
                                    // queryyu: this.$route.query.qu
                                    ineryuer: 3
                                }
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
            } else {
                this.$axios.post('admin/admin/market/knowledge/add/Knowledge', this.formItem).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: res.data.msg,
                                type: 'success'
                            });
                            this.$router.push({
                                path: './sonpagecent',
                                query: {
                                    // queryyu: this.$route.query.qu
                                    ineryuer: 3
                                }
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
            }
        }
    }
};
</script>

<style scoped>
.rootAop {
    padding: 20px;
}
.h3er {
    padding: 20px;
}
.formClass {
    padding-right: 60px;
}
.BTNClass {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>