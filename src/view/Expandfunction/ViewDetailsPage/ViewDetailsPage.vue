<template>
    <div>
        <div class="navStyleXioayuer">
            <h4 class="SonCLassSom">{{ this.$route.query.TitleSon }}</h4>
            <Form :model="formItem" :label-width="150">
                <FormItem :label="label">
                    <input
                        v-model="formItem.input"
                        placeholder
                        disabled="disabled"
                        class="InputStylexiaoyuer"
                    />
                </FormItem>
                <FormItem :label="label1">
                    <input
                        v-model="formItem.input1"
                        placeholder="联系电话"
                        disabled="disabled"
                        class="InputStylexiaoyuer"
                    />
                </FormItem>
                <FormItem :label="label2">
                    <div class="DoorPhoto">
                        <div class="DoorPhotoS">
                            <div class="SonClssa" v-for="(item,index) in PhotoDatas" :key="index">
                                <div class="SonSonClssad">
                                    <img class="img" :src="item" alt />
                                </div>
                            </div>
                        </div>
                    </div>
                </FormItem>
            </Form>
            <div class="BtnStyleRetu">
                <Button type="success" @click="returnBtnfn">返回</Button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formItem: {
                input: '',
                input1: '',
                select: ''
            },
            label: '',
            label1: '',
            label2: '',
            PhotoDatas: []
        };
    },
    mounted() {
        this.getDataLabel();
        this.getDetailData();
    },
    methods: {
        //
        getDataLabel() {
            let Newjudge = this.$route.query.Newjudge;
            if (Newjudge == 1) {
            }
        },
        // 获取详情信息
        getDetailData() {
            let Newjudge = this.$route.query.Newjudge;
            if (Newjudge == 1) {
                this.label = '姓名/机构名称：';
                this.label1 = '联系电话：';
                this.label2 = '门头照片:';
                let data = this.$route.query.data;
                this.formItem.input = data.name;
                this.formItem.input1 = data.phone;
                if (data.photo != '') {
                    var https = /^https:\/\/.+$/;
                    let imgUrl = [];
                    data.photo.split(',').forEach(function (val, index) {
                        if (https.test(val)) {
                            imgUrl[index] = val;
                        } else {
                            imgUrl[index] = localStorage.getItem('imgUrl') + val;
                        }
                    });
                    this.PhotoDatas = imgUrl;
                }
            } else if (Newjudge == 2) {
                this.label = '投诉人：';
                this.label1 = '投诉事项：';
                this.label2 = '图片：';
                let data = this.$route.query.data;
                this.formItem.input = data.phone;
                this.formItem.input1 = data.content;
                if (data.image) {
                    var https = /^https:\/\/.+$/;
                    let imgUrl = [];
                    data.image.split(',').forEach(function (val, index) {
                        if (https.test(val)) {
                            imgUrl[index] = val;
                        } else {
                            imgUrl[index] = localStorage.getItem('imgUrl') + val;
                        }
                    });
                    this.PhotoDatas = imgUrl;
                }
            } else if (Newjudge == 3) {
                this.label = '反馈人：';
                this.label1 = '反馈内容：';
                this.label2 = '图片：';
                let data = this.$route.query.data;
                this.formItem.input = data.phone;
                this.formItem.input1 = data.content;
                if (data.image) {
                    var https = /^https:\/\/.+$/;
                    let imgUrl = [];
                    data.image.split(',').forEach(function (val, index) {
                        if (https.test(val)) {
                            imgUrl[index] = val;
                        } else {
                            imgUrl[index] = localStorage.getItem('imgUrl') + val;
                        }
                    });
                    this.PhotoDatas = imgUrl;
                }
            }

            // if
        },
        // Btn返回
        returnBtnfn() {
            const NewjudgeData = this.$route.query.Newjudge;
            if (NewjudgeData == 1) {
                this.$router.push({
                    path: './SettleIn'
                });
            } else if (NewjudgeData == 2) {
                this.$router.push({
                    path: './Report'
                });
            } else if (NewjudgeData == 3) {
                this.$router.push({
                    path: './feedback'
                });
            }
        }
    }
};
</script>

<style scope>
.navStyleXioayuer {
    padding: 20px;
}
.SonCLassSom {
    padding: 20px 0;
    font-weight: 800;
}
.InputStylexiaoyuer {
    width: 200px;
    outline: none;
    border: 0;
    border-bottom: 1px #e9e9e9 solid;
}
.DoorPhoto {
    padding-right: 120px;
}
.DoorPhotoS {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.DoorPhotoS .SonClssa {
    flex-grow: 1;
}
.DoorPhotoS .SonClssa .SonSonClssad {
    box-sizing: border-box;
    padding: 0 10px;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.DoorPhotoS .SonClssa .SonSonClssad img {
    display: block;
    width: 100%;
    height: auto;
}
.BtnStyleRetu {
    padding: 20px;
    text-align: center;
}
.BtnStyleRetu button {
    padding: 0 36px;
}
</style>