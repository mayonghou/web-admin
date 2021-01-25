<template>
    <div>
        <div class="Commodity-details">
            <ul>
                <li>
                    <div>是否开放权限：</div>
                    <div>
                        <el-switch
                            v-model="value"
                            :active-value="1"
                            :inactive-value="0"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                        ></el-switch>
                    </div>
                </li>
            </ul>
        </div>
        <div class="buuttonn">
            <Button type="primary" @click="routerTocd">保存</Button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['id'],
    data() {
        return {
            value: 1
        };
    },
    methods: {
        routerTocd() {
            let datas = {
                sidelineUserId: parseInt(this.id),
                status: this.value
            };
            this.$axios
                .post('admin/sideline/management/update_business_status?sidelineUserId=' + parseInt(this.id) + '&status=' + this.value)
                .then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.$router.push({
                                path: './Personnel'
                            });
                        } else {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'error'
                            });
                        }
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                });
        }
    }
};
</script>

<style scoped>
.Commodity-details {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 0 50px;
    margin-top: 40px;
}
.Commodity-details li {
    width: 100%;
    height: auto;
    list-style-type: none;
    box-sizing: border-box;
    margin: 5px 0px;
    display: flex;
    font-size: 14px;
    padding: 10px 0px;
}
.Commodity-details li div:nth-child(1) {
    max-width: 200px;
    min-width: 200px;
    text-align: right;
    box-sizing: border-box;
    padding-right: 20px;
    font-weight: 600;
}
.Commodity-details li div:nth-child(2) {
    flex-grow: 1;
    box-sizing: border-box;
}
.buuttonn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
}
.buuttonn button {
    padding: 0px 50px;
    margin-bottom: 60px;
}
</style>
