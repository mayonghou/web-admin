<template>
    <div class="table_css_xiaoyuer">
        <h4 class="ckspxq_tile">商机详情</h4>
        <div class="Commodity-details">
            <Form :model="formLeft" label-position="right" :label-width="150" :label-colon="true" :disabled="true">
                <FormItem label="商机标题" class="marginTop02"
                    ><!--title-->
                    <p class="marginleft">{{ this.formLeft.title }}</p>
                </FormItem>
                <FormItem label="行业类型" class="marginTop02"
                    ><!-- industryType -->
                    <p class="marginleft">{{ this.formLeft.industryType }}</p>
                </FormItem>
                <FormItem label="商机类型" class="marginTop02"
                    ><!-- type -->
                    <p class="marginleft">{{ this.formLeft.type }}</p>
                </FormItem>
                <FormItem label="商机标签" class="marginTop02"
                    ><!-- label -->
                    <p class="marginleft">{{ this.formLeft.label }}</p>
                </FormItem>
                <FormItem label="商机主图" class="marginTop">
                    <p style="margin-left: 40px; color: #a4a4a4">(轮播图展示)</p>
                    <!-- pic -->
                    <img class="imgStyle" v-for="(val, index) in this.formLeft.pic" :key="index" :src="val" />
                </FormItem>
                <FormItem label="商机描述" class="marginTop02">
                    <div v-html="this.formLeft.projectDescribe"><!-- projectDescribe --></div>
                </FormItem>
                <FormItem label="目的所在地" class="marginTop02"
                    ><!-- detailAddress -->
                    <p class="marginLeft02">{{ this.formLeft.detailAddress }}</p>
                </FormItem>
            </Form>
        </div>
        <div class="buuttonn">
            <Button type="primary" @click="routerTocd">返回</Button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formLeft: {
                title: '第三方',
                industryType: '电饭锅',
                type: '回家',
                label: '阿道夫',
                pic: '',
                projectDescribe: '发过火',
                detailAddress: '水电费而'
            }
        };
    },
    methods: {
        routerTocd() {
            this.$router.push({
                path: './opportunitymg'
            });
        },
        getDetail() {
            const url = 'admin/chance/chanceInfo' + '?chanceId=' + this.$route.query.id;
            this.$axios
                .get(url)
                .then((res) => {
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            let resData = res.data.data;
                            let newArr = [];
                            let newPic = resData.pic.split(',');
                            for (let v in newPic) {
                                newArr.push(newPic[v]);
                                let imgUrl = /^(https):\/\/.+$/;
                                let trueimUrl = imgUrl.test(newPic[v]);
                                if (trueimUrl == true) {
                                    newArr[v] = newPic[v];
                                } else {
                                    newArr[v] = localStorage.getItem('imgUrl') + newPic[v];
                                }
                            }
                            resData.pic = newArr;
                            this.formLeft = resData;
                        }
                    }
                })
                .catch((err) => {});
        }
    },
    mounted() {
        this.getDetail();
    }
};
</script>

<style scoped>
.table_css_xiaoyuer {
    box-sizing: border-box;
    padding: 20px;
    margin-top: 20px;
}
.ckspxq_tile {
    background-color: rgb(250, 251, 250);
    padding: 10px;
}
.Commodity-details {
    box-sizing: border-box;
    padding: 0 100px;
    margin-top: 50px;
}
.marginTop {
    margin-top: 50px;
}
.marginTop02 {
    margin-top: 20px;
}
.marginleft {
    margin-left: 40px;
}
.dataImg-large {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
}
.marginLeft02 {
    margin-left: 20px;
}
.color-span {
    color: rgb(164, 164, 164);
}
.color-span-a {
    padding-left: 40px;
    display: flex;
}
.color-span-ab {
    padding-left: 80px;
    display: flex;
}
.buuttonn {
    display: flex;
    align-items: center;
    justify-content: center;
}
.buuttonn button {
    padding: 0px 50px;
    margin-bottom: 60px;
}
.Commodity-details02 {
    margin-top: 15px;
}
.imgStyle {
    display: inline-block;
    width: 120px;
    height: auto;
    margin: 10px;
}
.imgStyle:first-child {
    margin-left: 0;
}
</style>
