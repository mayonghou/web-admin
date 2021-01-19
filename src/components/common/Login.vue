<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">商盟平台管理系统V1.0</div>
            <el-form :model="param" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="请输入管理员账号">
                        <el-button slot="prepend" icon="el-icon-s-custom"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="请输入密码"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    ></el-input>
                </el-form-item>
            </el-form>
            <el-button class="loginData" @click="submitForm">立即登录</el-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            param: {
                username: '',
                password: ''
            }
        };
    },
    methods: {
        submitForm() {
            let _this = this;
            _this.logining = true;
            this.$refs.login.validate((valid) => {
                if (_this.param.username == '') {
                    _this.$message({
                        showClose: true,
                        message: '请输入登录账号',
                        type: 'warning'
                    });
                } else if (_this.param.password == '') {
                    _this.$message({
                        showClose: true,
                        message: '请输入登录密码',
                        type: 'warning'
                    });
                } else {
                    const loading = this.$loading({
                        lock: true,
                        text: '加载中...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    _this.$axios
                        .get('admin/system/login?account=' + _this.param.username + '&password=' + _this.$md5(_this.param.password))
                        .then(function (res) {
                            loading.close();
                            if (res.status == 200) {
                                var data = res.data;
                                if (data.code == 200) {
                                    localStorage.getItem('avatar', data.data.avatar);
                                    localStorage.setItem('loginData', data.data.companyId);
                                    localStorage.setItem('sjid', data.data.id);
                                    localStorage.setItem('token', data.data.token);
                                    localStorage.setItem('ms_username', _this.param.username);
                                    if (data.data.companyId == 0) {
                                        _this.$router.push('/dataCenterindex');
                                        _this.$message.success('登录成功');
                                    } else {
                                        _this.$router.push('/indexshouye');
                                        _this.$message.success('登录成功');
                                        // _this.$message.success('登录成功');
                                    }
                                }
                                if (data.code != 200) {
                                    _this.$message.error(data.msg);
                                    return false;
                                }
                            }
                        });
                }
            });
        }
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    text-align: center;
    width: 100%;
    height: 100%;
    background: url('../../assets/img/loginImg.png');
    background-size: 100% 100%;
}

.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #000;
    border-bottom: 1px solid #ddd;
}

.ms-login {
    position: absolute;
    left: 70%;
    top: 45%;
    text-align: left;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}

.ms-content {
    padding: 30px 30px;
}

.login-btn .el-button {
    width: 290px;
    margin: 0 auto;
    text-align: center;
}

.login-btn .el-button button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}

.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}

.el-input {
    width: 290px;
    margin: 0 auto;
}
</style>
