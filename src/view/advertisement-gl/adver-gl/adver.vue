<template>
    <div class="rootClass">
        <h3>填写广告位信息</h3>
        <Form :model="formItem" :label-width="150">
            <FormItem label="广告位名称" class="xiaoyuerfa">
                <input
                    v-model="formItem.input"
                    placeholder="广告位名称..."
                    class="xiaoyuer"
                    disabled="disabled"
                />
            </FormItem>
            <FormItem label="广告名称" class="xiaoyuerfa">
                <input
                    v-model="formItem.input1"
                    placeholder="广告名称..."
                    class="xiaoyuer"
                    disabled="disabled"
                />
            </FormItem>
            <FormItem label="广告图片" class="xiaoyuerfa">
                <Upload
                    type="drag"
                    :action="action"
                    accept="image/*"
                    :on-success="successUpload"
                    :show-upload-list="false"
                    class="imgClass"
                >
                    <div style="padding: 20px 0" v-if="this.imgUrl == ''">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>重新上传</p>
                    </div>
                    <img width="100%" height="100%" v-else :src="this.imgUrl" />
                </Upload>
            </FormItem>
            <FormItem label="广告链接" class="xiaoyuerfa">
                <input
                    v-model="formItem.input2"
                    placeholder="广告链接..."
                    class="xiaoyuer"
                    disabled="disabled"
                />
            </FormItem>
            <div class="btnClass">
                <Button
                    type="primary"
                    class="BbtnClass"
                    @click="preservationAder"
                >保&nbsp;&nbsp;&nbsp;存</Button>
                <Button type="primary" @click="returnBtn" class="BbtnClass">取&nbsp;&nbsp;&nbsp;消</Button>
            </div>
        </Form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            formItem: {
                input: '',
                input1: '',
                input2: ''
            },
            imgUrl: '',
            imgUrlimg: '',
            action: localStorage.getItem('actionUrl')
        };
    },
    mounted() {
        this.DataRendering();
    },
    methods: {
        successUpload(response) {
            if (response.code == 200) {
                this.imgUrl = localStorage.getItem('imgUrl') + response.data;
            }
        },
        returnBtn() {
            this.$router.push({
                path: './advertisement'
            });
        },
        DataRendering() {
            this.imgUrl = this.$route.query.row.col3;
            this.formItem.input = this.$route.query.row.note;
            this.formItem.input1 = this.$route.query.row.name;
            this.formItem.input2 = this.$route.query.row.url;
        },
        // $ajax
        preservationAder() {
            let imageUrl = this.imgUrl.substring(this.imgUrl.lastIndexOf('/images'));
            const url = 'admin/industry/advertise/edit';
            const data = {
                id: this.$route.query.row.id,
                image: imageUrl,
                location: this.$route.query.row.location,
                name: this.formItem.input1,
                note: this.formItem.input,
                sort: this.$route.query.row.sort
            };
            this.$axios
                .post(url, data)
                .then((res) => {
                    if (res.status == 200) {
                        const data = res.data;
                        if (data.code == 200) {
                            alert(data.msg);
                            this.$router.push({
                                path: '/advertisement'
                            });
                        } else {
                            alert(data.msg);
                        }
                    }
                })
                .catch((err) => {});
        }
    }
};
</script>

<style scoped>
.rootClass {
    box-sizing: border-box;
    padding: 40px 20px 120px 20px;
}
h3 {
    padding: 20px 0;
}
.xiaoyuerfa {
    width: 150px;
}
.xiaoyuer {
    width: 200px;
    outline: none;
    border: 0;
    border-bottom: 1px solid #c1c1c1;
}
.imgClass {
    width: 320px;
    position: relative;
}
.imgClass img {
    display: block;
}
.btnClass {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    box-sizing: border-box;
}
.BbtnClass {
    padding: 0px 20px;
    margin: 0px 10px;
}
</style>