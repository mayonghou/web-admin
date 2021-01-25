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
                            value="beijing"
                            v-for="(item,index) in xiaoyuerData"
                            :key="index"
                        >{{ item.OptionData }}</Option>
                    </Select>
                </FormItem>
                <!--附文本-->
                <FormItem label="公告详情">
                    <div class="edit_container">
                        <quill-editor
                            v-model="content"
                            ref="myQuillEditor"
                            :options="editorOption"
                            @blur="onEditorBlur($event)"
                            @focus="onEditorFocus($event)"
                            @change="onEditorChange($event)"
                        ></quill-editor>
                    </div>
                </FormItem>
                <div class="BtnClassStyle">
                    <Button type="primary">发布</Button>
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
        return {
            formItem: {
                input: '',
                select: ''
            },
            // 附文本
            content: `请编辑你的富文本内容......`,
            editorOption: {},
            xiaoyuerData: [
                {
                    OptionData: '商家会员'
                },
                {
                    OptionData: '普通会员'
                },
                {
                    OptionData: '兼职会员'
                }
            ]
        };
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
        onEditorReady(editor) {
            // 准备编辑器
        },
        onEditorBlur() {}, // 失去焦点事件
        onEditorFocus() {}, // 获得焦点事件
        onEditorChange() {}, // 内容改变事件
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