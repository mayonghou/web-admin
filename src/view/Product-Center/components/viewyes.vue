<template>
    <div>
        <div class="root">
            <div>
                <h3 class="h3ert">版本信息</h3>
            </div>
            <div class="form">
                <Form :model="formItem" :label-width="120">
                    <FormItem label="版本名称">
                        <Input
                            class="input"
                            disabled="disabled"
                            v-model="formItem.versionName"
                            placeholder="Enter something..."
                        />
                    </FormItem>
                    <FormItem label="版本描述">
                        <Input
                            disabled="disabled"
                            type="textarea"
                            v-model="formItem.versionDescribe"
                            placeholder="Enter something..."
                        />
                    </FormItem>
                </Form>
            </div>
            <div>
                <h3 class="h3ert">功能描述</h3>
            </div>
            <div class="form">
                <Form :label-width="120">
                    <FormItem
                        v-for="(item, index) in formItem.list"
                        :key="index"
                        :label="'功能'+(index +1)"
                    >
                        <Button type="info" size="small" style="margin-left:20px">{{item.function}}</Button>
                        <p class="p">{{item.resume}}</p>
                    </FormItem>
                </Form>
            </div>
            <div style="text-align:center">
                <!-- <Button type="primary">保存</Button> -->
                <Button style="margin-left: 8px" @click="quxiao">取消</Button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            formItem: {
                versionName: '',
                versionDescribe: '',
                list: []
            },
            formItem02: {}
        };
    },
    mounted() {
        this.getVersionData();
    },
    methods: {
        quxiao() {
            this.$router.push({
                path: './productindex'
            });
        },
        getVersionData() {
            this.$axios.get('admin/version/viewVersion?id=' + this.$route.query.id).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.formItem = data.data;
                    }
                }
            });
        }
    }
};
</script>

<style scoped>
.root {
    padding: 20px;
}
.h3ert {
    padding: 20px;
}
.form {
    padding-right: 80px;
}
.p {
    margin-left: 20px;
    padding: 5px 0;
}
.input {
    outline: none;
    border: 0;
    border-bottom: 1px solid #dcdfe6;
    width: 250px;
}
</style>
