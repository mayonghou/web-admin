<template>
    <div>
        <div class="navStyleXioayuer">
            <h4 class="SonCLassSom">{{ this.$route.query.TitleSon }}</h4>
            <Form :model="formItem" :label-width="150">
                <FormItem label="姓名/机构名称">
                    <input
                        v-model="formItem.input"
                        placeholder="姓名/机构名称"
                        disabled="disabled"
                        class="InputStylexiaoyuer"
                    />
                </FormItem>
                <FormItem label="联系电话">
                    <input
                        v-model="formItem.input1"
                        placeholder="联系电话"
                        disabled="disabled"
                        class="InputStylexiaoyuer"
                    />
                </FormItem>
                <FormItem label="门头照片">
                    <div class="DoorPhoto">
                        <div class="DoorPhotoS">
                            <div class="SonClssa" v-for="(item,index) in PhotoDatas" :key="index">
                                <div class="SonSonClssad">
                                    <Icon style="font-size:120px" type="ios-alarm" />
                                    {{ item.Photos }}
                                    <!-- <img src="" alt=""> -->
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
            PhotoDatas: [
                {
                    Photos: ''
                },
                {
                    Photos: ''
                },
                {
                    Photos: ''
                },
                {
                    Photos: ''
                }
            ]
        };
    },
    methods: {
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