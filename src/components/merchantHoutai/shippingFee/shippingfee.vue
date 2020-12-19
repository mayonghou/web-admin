<template>
    <!-- 配送费管理 -->
    <div class="shippingfee" id="shippingfee"
      v-loading="fullscreenLoading" 
      :element-loading-text="loadingText"
      element-loading-background="rgba(0, 0, 0, 0.7)"
    >
        <div class="shippingfee-top"><label style="padding-left: 30px">配送费管理</label></div>
        <div class="shippingfee-body">
            <div class="">
                <el-radio v-model="radio" :label="0">统一邮费</el-radio>
                <el-input
                    class="tongyishouf"
                    v-model="tongyiouyoufei"
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                    placeholder="请输入"
                    :disabled="radio == 1"
                ></el-input>
                元
            </div>
            <div class="shippingfee-jain">
                <el-radio v-model="radio" :label="1">按件算</el-radio>
                <el-form :model="countNum" :rules="rules" ref="countNum" style="width: 100%">
                    <el-form-item label="件数在:" prop="jianNumber" :label-width="labelWidth">
                        <el-input
                            class="tongyishouf"
                            v-model="countNum.jianNumber"
                            onkeyup="value=value.replace(/[^\d]/g,'')"
                            placeholder="请输入"
                            :disabled="radio == 0"
                        ></el-input>
                        件以内
                    </el-form-item>
                    <el-form-item label="邮费:" prop="postage" :label-width="labelWidth">
                        <el-input
                            class="tongyishouf"
                            v-model="countNum.postage"
                            onkeyup="value=value.replace(/[^\d]/g,'')"
                            placeholder="请输入"
                            :disabled="radio == 0"
                        ></el-input>
                        元
                    </el-form-item>
                    <el-form-item label="此后每增加:" prop="jianNumList" :label-width="labelWidth">
                        <el-input
                            class="tongyishouf"
                            v-model="countNum.jianNumList"
                            onkeyup="value=value.replace(/[^\d]/g,'')"
                            placeholder="请输入"
                            :disabled="radio == 0"
                        ></el-input>
                        件
                    </el-form-item>
                    <el-form-item label="邮费增加:" prop="youpostage" :label-width="labelWidth">
                        <el-input
                            class="tongyishouf"
                            v-model="countNum.youpostage"
                            onkeyup="value=value.replace(/[^\d]/g,'')"
                            placeholder="请输入"
                            :disabled="radio == 0"
                        ></el-input>
                        元
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="baocun">
            <el-button @click="baocunBtn" class="buttonsda">保存</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'shippingfee',
    data() {
        return {
            labelWidth: '130px',
            radio: '',
            tongyiouyoufei: '',
            fullscreenLoading: true,
            loadingText: '加载中...',
            countNum: {
                jianNumber: '',
                postage: '',
                jianNumList: '',
                youpostage: ''
            },
            rules: {
                jianNumber: [{ required: true, message: '请输入件数', trigger: 'blur' }],
                jianNumList: [{ required: true, message: '请输入要增加的件数', trigger: 'blur' }]
            }
        };
    },
    mounted() {
      this.getOrderDeliveryFee();
    },
    methods: {
        baocunBtn() {
          var name = this.radio==0?'统一邮费':'按件算';
            this.$confirm('是否确定添加 【' + name + '】 的邮费?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let data = {
                    billType: parseInt(this.radio),
                    uniformPostage: parseInt(this.tongyiouyoufei),
                    companyId: parseInt(localStorage.getItem('loginData')),
                    limitAumont: parseInt(this.countNum.postage),
                    limitNum: parseInt(this.countNum.jianNumber),
                    incrAumont: parseInt(this.countNum.jianNumList),
                    incrNum: parseInt(this.countNum.youpostage)
                };
                const loading = this.$loading({
                  lock: true,
                  text: '发布中...',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios.post('admin/order/deliveryFee/install', data).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
							this.$router.push({
								path: './addgoods'
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
                            message: data.msg,
                            type: 'error'
                        });
                    }
                });
            }).catch(err => {
			});
        },
        getOrderDeliveryFee() {
            this.$axios.get('admin/order/deliveryFee/detail/' + localStorage.getItem('loginData')).then((res) => {
                this.fullscreenLoading = false;
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.radio = data.data.billType;
                        this.tongyiouyoufei = data.data.uniformPostage;
                        this.countNum.jianNumber = data.data.limitNum;
                        this.countNum.postage = data.data.limitAumont;
                        this.countNum.jianNumList = data.data.incrAumont;
                        this.countNum.youpostage = data.data.incrNum;
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

<style>
.shippingfee {
    width: 100%;
    padding: 20px;
	box-sizing: border-box;
}
.shippingfee-top {
    width: 100%;
    height: 45px;
    background-color: #FAFBFA;
    line-height: 45px;
    margin-top: 20px;
}
.tongyishouf {
    width: 210px;
}
.shippingfee-body {
    margin-top: 20px;
    margin-left: 80px;
}
.shippingfee-jain {
    margin-top: 20px;
}
.el-form-item {
    margin-top: 30px;
}
.baocun .buttonsda {
    width: 90px;
    height: 30px;
    background-color: #2450D2;
    color: #FFFFFF;
    padding: 0;
    margin-top: 20px;
    margin-left: 30%;
}
</style>
