<template>
    <div>
        <div class="root">
            <div>
                <h3 class="h3ert">填写版本信息</h3>
            </div>
            <div class="form">
                <el-form :model="fromitem">
                    <el-form-item label="版本名称：" label-width="220px">
                        <el-input
                            v-model="fromitem.versionName "
                            placeholder="请输入版本名称"
                            style="width:300px;"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="版本描述：" label-width="220px">
                        <el-input
                            v-model="fromitem.versionDescribe "
                            type="textarea"
                            placeholder="请输入版本描述"
                            style="width:800px;"
                            class="textareaReleas"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="功能描述：" label-width="220px">
                        <div style="height: 20px;"></div>
                        <div
                            style="margin-top: 20px;"
                            v-for="(item,index) in fromitem.list"
                            :key="index"
                        >
                            <el-form-item label="功能名称：" label-width="100px">
                                <el-input
                                    v-model="item.function"
                                    placeholder="请输入功能名称"
                                    style="width:300px;"
                                ></el-input>
                            </el-form-item>
                            <div style="height: 20px;"></div>
                            <el-form-item class="delete">
                                <el-button
                                    style="font-size: 26px;"
                                    class="el-icon-remove-outline elicondata"
                                    type="text"
                                    @click="deleteFunction(item)"
                                >删除</el-button>
                            </el-form-item>
                            <el-form-item label="功能描述：" label-width="100px">
                                <el-input
                                    v-model="item.resume"
                                    type="textarea"
                                    placeholder="请输入功能描述"
                                    style="width:700px;"
                                    class="textareaReleas"
                                ></el-input>
                            </el-form-item>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <div style="text-align:center">
                            <el-button
                                style="font-size: 30px;"
                                class="el-icon-circle-plus-outline"
                                type="text"
                                @click="addFunction"
                            >添加</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <div style="text-align:center">
                            <Button type="primary" @click="saveBtns" v-preventReClick>保存</Button>
                            <Button style="margin-left: 8px" @click="quxaio" v-preventReClick>取消</Button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            fromitem: {
                id: '',
                versionName: '',
                versionDescribe: '',
                list: [
                    {
                        function: '',
                        id: '',
                        resume: ''
                    }
                ]
            }
        };
    },
    mounted() {
        if (this.$route.query.id) {
            this.getVersionData();
        }
    },
    methods: {
        // 取消按钮
        quxaio() {
            this.$router.push({ path: './productindex' });
        },
        // 添加功能描述
        addFunction() {
            this.fromitem.list.push({
                function: '',
                id: '',
                resume: ''
            });
        },
        // 删除功能描述
        deleteFunction(item) {
            let index = this.fromitem.list.indexOf(item);
            if (index != -1) {
                this.fromitem.list.splice(index, 1);
            }
        },
        // 获取要修改的数据
        getVersionData() {
            this.$axios.get('admin/version/viewVersion?id=' + this.$route.query.id).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        console.log(data);
                        this.fromitem = data.data;
                    }
                }
            });
        },
        // 保存按钮
        saveBtns() {
            // 修改
            if (this.$route.query.id) {
                this.$axios.post('admin/version/updateVersion', this.fromitem).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.$router.push({ path: './productindex' });
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
                this.$axios.post('admin/version/publishVersion', this.fromitem).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.$router.push({ path: './productindex' });
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

<style>
.root {
    padding: 20px;
}
.h3ert {
    padding: 20px;
}
.form {
    padding-right: 80px;
}
.textareaReleas .el-textarea__inner {
    height: 300px;
}
.delete {
    position: relative;
}
.delete .elicondata {
    position: absolute;
    top: 50%;
    left: 850px;
    color: red;
    z-index: 1;
}
</style>
