<template>
    <div class="rootAop">
        <div class="formClass">
            <h3 class="h3er">填写文档信息</h3>
            <Form :model="formItem" :label-width="120">
                <FormItem label="文档名称">
                    <Input
                        v-model="formItem.fileName"
                        placeholder="输入文档名称......"
                        style="width:200px"
                    />
                </FormItem>
                <FormItem label="文档分类">
                    <Select v-model="formItem.fileType" style="width:200px">
                        <Option
                            v-for="item in this.fileType"
                            :key="item.id"
                            :value="item.name"
                        >{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="上传文档">
                    <Upload :action="action" :on-success="fileSuccess">
                        <Button
                            icon="ios-cloud-upload-outline"
                            v-if="this.fileUrl == ''"
                        >Upload files</Button>
                        <span v-else></span>
                    </Upload>
                </FormItem>
                <FormItem>
                    <div class="BTNClass">
                        <Button type="primary" @click="saveBtndata" v-preventReClick>保存</Button>
                        <Button style="margin-left: 8px" @click="returnClick">取消</Button>
                    </div>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            action: localStorage.getItem('fileUrl'),
            fileType: [],
            fileUrl: '',
            formItem: {
                id: 0,
                fileName: '',
                filePic: '',
                fileType: '',
                fileUrl: ''
            }
        };
    },
    mounted() {
        this.getfileType();
        if (this.$route.query.id) {
            this.getEditFile();
        }
    },
    methods: {
        // 取消按钮
        returnClick() {
            this.$router.push({
                path: './sonpagecent',
                query: {
                    ineryuer: 2
                }
            });
        },
        fileSuccess(res, file, fileList) {
            console.log(res);
            if (res.code == 200) {
                this.formItem.fileUrl = res.data;
            }
        },
        // 获取所有文档分类
        getfileType() {
            this.$axios.get('admin/admin/market/file/type/selectAllMarketFileType?page=1&paging=false').then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.fileType = data.data.data;
                    }
                }
            });
        },
        // 获取编辑数据
        getEditFile() {
            this.$axios.get('admin/admin/market/file/select/' + this.$route.query.id).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.formItem = data.data;
                    }
                }
            });
        },
        // 添加保存
        saveBtndata() {
            if (this.$route.query.id) {
                this.$axios.post('admin/admin/market/file/update/file', this.formItem).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.$router.push({
                                path: './sonpagecent',
                                query: {
                                    ineryuer: 2
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
                this.$axios.post('admin/admin/market/file/add/file', this.formItem).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.$router.push({
                                path: './sonpagecent',
                                query: {
                                    ineryuer: 2
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