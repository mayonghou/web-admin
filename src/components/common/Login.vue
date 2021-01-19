<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">
                <div>欢迎使用</div>
                <div>当地购综合管理平台</div>
            </div>
            <el-form :model="param" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input class="loginInput" v-model="param.username" placeholder="请输入管理员账号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        class="loginInput"
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
                        // .get('admin/system/login?account=' + _this.param.username + '&password=' + _this.$md5(_this.param.password))
                        .then(function (res) {
                            console.log(res);
                            loading.close();
                            if (res.status == 200) {
                                var data = res.data;
                                if (data.code == 200) {
                                    localStorage.getItem('avatar', data.data.avatar);
                                    localStorage.setItem('loginData', data.data.companyId);
                                    localStorage.setItem('userIds', data.data.id);
                                    localStorage.setItem('token', data.data.token);
                                    localStorage.setItem('ms_username', _this.param.username);
                                    if (data.data.companyId == 0) {
                                        _this.$router.push('/dataCenterindex');
                                        _this.$message.success('登录成功');
                                    } else {
                                        _this.$router.push('./indexshouye');
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

<style>
.login-wrap {
    position: relative;
    text-align: center;
    width: 100%;
    height: 100%;
    background: url(../../assets/loginImg.png);
    background-size: 100% 100%;
}

.ms-title {
    font-size: 44px;
    color: #3a62d7;
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
    padding: 30px 0;
}
.ms-content .loginInput .el-input__inner {
    border-radius: 50px;
    width: 447px;
    height: 51px;
    font-size: 20px;
    padding: 0 30px;
    font-family: Adobe Heiti Std R;
}
.loginData {
    width: 447px;
    height: 51px;
    border-radius: 50px;
    text-align: center;
    background-image: linear-gradient(#5a42ec, #09bbfe);
    color: #fff;
    font-size: 24px;
    padding: 0;
}
.loginData:hover {
    color: #fff;
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
