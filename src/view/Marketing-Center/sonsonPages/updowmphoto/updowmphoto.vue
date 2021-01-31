<template>
    <div class="rootAop">
        <div class="formClass">
            <h3 class="h3er">填写图片信息</h3>
            <Form :model="formItem" :label-width="120">
                <FormItem label="图片名称">
                    <Input
                        v-model="formItem.pictureName"
                        placeholder="输入图片名称......"
                        style="width:200px"
                    />
                </FormItem>
                <FormItem label="图片分类">
                    <Select v-model="formItem.pictureType" style="width:200px">
                        <Option
                            v-for="item in this.typeList"
                            :key="item.id"
                            :value="item.name"
                        >{{item.name}}</Option>
                    </Select>
                </FormItem>
                <!-- </FormItem> -->
                <FormItem label="上传图片">
                    <Upload
                        style="width:250px; height:120px;"
                        type="drag"
                        :on-success="OnSuccess"
                        :show-upload-list="false"
                        :action="actionUrl"
                    >
                        <div style="padding: 20px 0" v-if="this.imgUrl == ''">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>重新上传</p>
                        </div>
                        <img v-else width="100%" height="100%" :src="this.imgUrl" />
                    </Upload>
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
export default {
    data() {
        return {
            actionUrl: localStorage.getItem('actionUrl'),
            typeList: [],
            imgUrl: '',
            formItem: {
                id: 0,
                pictureName: '',
                pictureType: '',
                pictureUrl: ''
            }
        };
    },
    mounted() {
        this.getImgType();
        if (this.$route.query.id) {
            this.getSelectImg();
        }
    },
    methods: {
        // 返回按钮
        returnClick() {
            this.$router.push({
                path: './sonpagecent',
                query: {
                    ineryuer: 1
                }
            });
        },
        //
        OnSuccess(res, file, fileList) {
            if (res.code == 200) {
                this.imgUrl = localStorage.getItem('imgUrl') + res.data;
                this.formItem.pictureUrl = res.data;
            }
        },
        // 查询图片详情
        getSelectImg() {
            this.$axios.get('admin/admin/market/picture/select/' + this.$route.query.id).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.formItem = data.data;
                        var https = /^https:\/\/.+$/;
                        if (data.data.pictureUrl) {
                            if (https.test(data.data.pictureUrl)) {
                                this.imgUrl = data.data.pictureUrl;
                            } else {
                                this.imgUrl = localStorage.getItem('imgUrl') + data.data.pictureUrl;
                            }
                        }
                    }
                }
            });
        },
        //获取图片的所有分类
        getImgType() {
            this.$axios.get('admin/admin/market/picture/type/selectAllMarketPictureType?page=1&paging=false').then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.typeList = data.data.data;
                    }
                }
            });
        },
        // 保存按钮
        saveBtn() {
            console.log(this.formItem);
            if (this.$route.query.id) {
                this.$axios.post('admin/admin/market/picture/update/picture', this.formItem).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                message: data.msg,
                                type: 'success'
                            });
                            this.$router.push({
                                path: './sonpagecent',
                                query: {
                                    ineryuer: 1
                                }
                            });
                        } else {
                            this.$message({
                                message: data.msg,
                                type: 'error'
                            });
                        }
                    }
                });
            } else {
                this.$axios.post('admin/admin/market/picture/add/picture', this.formItem).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                message: data.msg,
                                type: 'success'
                            });
                            this.$router.push({
                                path: './sonpagecent',
                                query: {
                                    ineryuer: 1
                                }
                            });
                        } else {
                            this.$message({
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