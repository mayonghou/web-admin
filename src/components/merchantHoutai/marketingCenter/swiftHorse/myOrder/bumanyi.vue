<template>
    <!-- 对作品不满意 -->
    <div class="nomanyizuopin" id="nomanyizuopin">
        <div class="top-zzuopin">对作品不满意，选择协商修改时间</div>
        <el-form :model="nomanyi" class="el-form" ref="nomanyi" :rules="rules">
            <el-form-item label="选择时长：" prop="time" label-width="300px">
                <el-input v-model.number="nomanyi.time" class="timelength" placeholder="请选择延期时长"></el-input>
                <label>天</label>
            </el-form-item>
            <el-form-item label-width="300px">
                <el-button @click="quxiao" class="xiugaibtn">取消</el-button>
                <el-button @click="updatelist" class="xiugaibtn">提交修改</el-button>
            </el-form-item>
        </el-form>
        <div></div>
    </div>
</template>

<script>
export default {
    name: 'nomanyizuopin',
    data() {
        return {
            nomanyi: {
                time: ''
            },
            rules: {
                time: [
                    {
                        required: true,
                        message: '请输入延期天数',
                        trigger: 'blur'
                    },
                    {
                        type: 'number',
                        message: '请输入数字',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    mounted() {},
    methods: {
        quxiao() {
            this.$router.push({
                path: './myOrderIndex'
            });
        },
        updatelist() {
            console.log('fas');

            this.$refs.nomanyi.validate((valid) => {
                if (valid) {
                    this.$confirm('是否确定延期【' + this.nomanyi.time + '】天?', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        const loading = this.$loading({
                            lock: true,
                            text: '保存中...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        let data = {
                            orderId: this.$route.query.id,
                            days: this.nomanyi.time
                        };

                        this.$axios.post('admin/sideline/order/apply_modification', data).then((res) => {
                            loading.close();
                            if (res.status == 200) {
                                let datas = res.data;
                                if (datas.code == 200) {
                                    this.$message({
                                        showClose: true,
                                        message: datas.msg,
                                        type: 'success'
                                    });
                                    this.$router.push({
                                        path: './myOrderIndex',
                                        query: {
                                            status: 1
                                        }
                                    });
                                } else {
                                    this.$message({
                                        showClose: true,
                                        message: datas.msg,
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
                    });
                }
            });
        }
    }
};
</script>

<style scoped>
.nomanyizuopin {
    box-sizing: border-box;
    padding: 20px;
    /* background: #f5f7fc; */
}
.top-zzuopin {
    width: 90%;
    height: 45px;
    background: #f5f7fc;
    font-size: 16px;
    line-height: 45px;
    margin: 0 auto;
    font-weight: 600;
    padding-left: 40px;
}
.timelength {
    width: 20%;
}
.el-form {
    margin-top: 30px;
}
.xiugaibtn {
    width: 135px;
    height: 40px;
    background: #2f24d2;
    color: #fff;
    font-size: 16px;
    margin-left: 30px;
    margin-top: 30px;
}
.xiugaibtn:nth-child(1) {
    margin-left: 0;
}
</style>
