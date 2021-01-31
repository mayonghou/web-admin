<template>
    <div class="rootAop">
        <div class="formClass">
            <h3 class="h3er">{{this.titleName}}详情</h3>
            <Form :model="formItem" :label-width="120">
                <FormItem :label="this.titleName+'标题'">
                    <Input v-model="formItem.title" style="width:200px" />
                </FormItem>
                <FormItem :label="this.titleName+'内容'">
                    <!-- <Input
                        style="width:40%"
                        v-model="formItem.textarea"
                        type="textarea"
                        :autosize="{minRows: 10,maxRows: 20}"
                        placeholder="XXX内容"
                    />-->
                    <div v-html="formItem.content"></div>
                </FormItem>
                <FormItem>
                    <div class="BTNClass">
                        <Button type="primary" style="margin-left: 8px" @click="returnClick">返回</Button>
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
            titleName: '',
            formItem: {
                title: '',
                content: ''
            }
        };
    },
    mounted() {
        if (this.$route.query.status == 1) {
            this.titleName = '小知识';
            this.getKnowledge();
        } else if (this.$route.query.status == 2) {
            this.titleName = '活动';
            this.getActivityData();
        }
    },
    methods: {
        returnClick() {
            if (this.$route.query.status == 1) {
                // this.titleName = '小知识';
                this.$router.push({
                    path: './sonpagecent',
                    query: {
                        ineryuer: 3
                    }
                });
            } else if (this.$route.query.status == 2) {
                // this.titleName = '活动';
                this.$router.push({
                    path: './sonpagecent',
                    query: {
                        ineryuer: 4
                    }
                });
            }
        },
        // 获取小知识详情
        getKnowledge() {
            this.$axios.get('admin/admin/market/knowledge/select/' + this.$route.query.id).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        console.log(data);
                        this.formItem = data.data;
                    }
                }
            });
        },
        // 查询活动详情
        getActivityData() {
            this.$axios.get('admin/admin/market/activity/select/' + this.$route.query.id).then((res) => {
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