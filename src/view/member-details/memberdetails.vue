<template>
    <div class="memberdetailsRoot">
        <!-- 查看会员信息 -->
        <div class="memberdetailsRoot-middle">
            <h4 class="h4Class">{{ this.StaticData[0] }}</h4>
            <div class="see-member">
                <Form
                    :model="formLeft"
                    label-position="left"
                    :label-width="150"
                    :label-colon="true"
                    :disabled="true"
                >
                    <FormItem label="头像">
                        <Avatar :src="this.formLeft.input1" icon="ios-person" size="100" />
                    </FormItem>
                    <FormItem label="手机号码">
                        <p>{{ this.formLeft.input2 }}</p>
                    </FormItem>
                    <FormItem label="昵称">
                        <p>{{ this.formLeft.input3 }}</p>
                    </FormItem>
                    <FormItem label="真是姓名">
                        <p>{{ this.formLeft.input5 }}</p>
                    </FormItem>
                    <FormItem label="性别">
                        <p>{{ this.formLeft.input6 }}</p>
                    </FormItem>
                    <FormItem label="微信">
                        <p>{{ this.formLeft.input8 }}</p>
                    </FormItem>
                    <FormItem label="邮件">
                        <p>{{ this.formLeft.input9 }}</p>
                    </FormItem>
                </Form>
            </div>
            <div class="Viewmemberinformation-fa">
                <h4 class="Viewmemberinformation">{{ this.StaticData[1] }}</h4>
                <p class="Viewmemberinformation-p">{{ this.formLeft.input10 }}</p>
                <!-- 绑定企业信息 -->
            </div>
            <div class="return-button">
                <Button type="primary" @click="returnmembership">{{ this.StaticData[2] }}</Button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            StaticData: ['查看会员信息', '绑定企业信息', '返回'],
            formLeft: {
                input1: '',
                input2: '',
                input3: '',
                input5: '',
                input6: '',
                input8: '',
                input9: '',
                input10: ''
            },
            queryData: ''
        };
    },
    methods: {
        returnmembership: function () {
            this.$router.push({
                path: './membership'
            });
        }
    },
    mounted() {
        this.queryData = this.$route.query.menberData;
        this.formLeft.input1 = this.queryData.avatar;
        var imgUrl = /^(https):\/\/.+$/;
        var imgUrlverification = imgUrl.test(this.formLeft.input1);
        if (imgUrlverification == true) {
            this.formLeft.input1 = this.queryData.avatar;
        } else if (imgUrlverification == false) {
            var Emptycontainer = this.formLeft.input1;
            this.formLeft.input1 = 'https://images.chengdecanyin.com' + Emptycontainer;
        }
        this.formLeft.input1;
        this.formLeft.input2 = this.queryData.phoneNumber;
        this.formLeft.input3 = this.queryData.nickname;
        this.formLeft.input5 = this.queryData.name;
        this.formLeft.input6 = this.queryData.gender;
        this.formLeft.input8 = this.queryData.wxNumber;
        this.formLeft.input9 = this.queryData.email;
        this.formLeft.input10 = this.queryData.companyName;
    }
};
</script>

<style scope>
@import './css/memberdetails.css';
</style>
