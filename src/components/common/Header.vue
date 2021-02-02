<template>
    <div>
        <div class="header">
            <div class="logo">
                <div class="collapse-btn">
                    <img class="img" src="../../assets/logo.png" alt />
                </div>商盟
            </div>
            <div class="collapse" @click="collapseChage">
                <i v-if="!collapse" class="el-icon-s-fold"></i>
                <i v-else class="el-icon-s-unfold"></i>
            </div>
            <div class="fl">
                <ul class="topDataBox">
                    <li v-for="item in navData" :key="item.index" @click="routerbtn(item)">
                        <div v-show="item.index != 0 || qiyeID != 0" ref="TopnavBgcolor">
                            <span>
                                <img :src="item.imgUrl" alt />
                            </span>
                            <span>{{ item.name }}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="header-right">
                <div class="header-user-con">
                    <!-- 用户头像 -->
                    <div style="font-size: 18px;">欢迎您</div>
                    <div class="user-avator">
                        <el-avatar :size="40" :src="circleUrl"></el-avatar>
                    </div>
                    <!-- 用户名下拉菜单 -->
                    <el-dropdown class="user-name" trigger="click">
                        <span class="el-dropdown-link">
                            {{ username }}
                            <i class="el-icon-caret-bottom"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item divided command="cancel">
                                <label @click="updatePassword" class="UPpassword">修改密码</label>
                            </el-dropdown-item>
                            <el-dropdown-item divided command="loginout">
                                <el-button type="text" @click="tuichulogin">退出登录</el-button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <!-- 消息中心 -->
                    <div class="btn-bell">
                        <el-tooltip
                            effect="dark"
                            :content="message ? `有${message}条未读消息` : `消息中心`"
                            placement="bottom"
                        >
                            <router-link to="/messagelist">
                                <i class="iconfontssda iconfont icon-laba1"></i>
                            </router-link>
                        </el-tooltip>
                        <span class="btn-bell-badge" v-if="message">{{ message }}</span>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="修改密码" :visible.sync="dialogVisibpassword" width="50%">
            <div class="iconEnlorder" @click="enlarge">
                <el-tooltip effect="dark" :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom">
                    <i class="iconfont icon-quanping"></i>
                </el-tooltip>
            </div>
            <el-form :model="password" :rules="rules" ref="password">
                <el-form-item label="新密码:" prop="xinpass" label-width="35%">
                    <el-input
                        class="inputddd"
                        v-model="password.xinpass"
                        onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"
                        type="password"
                        placeholder="请输入新密码"
                    ></el-input>
                </el-form-item>
                <el-form-item label="确定密码:" prop="quedingpass" label-width="35%">
                    <el-input
                        class="inputddd"
                        v-model="password.quedingpass"
                        onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"
                        type="password"
                        placeholder="请确认密码"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div class="xinpasswo">
                <el-button @click="buncuanpassword" class="Btn">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import bus from './bus.js';
import axios from 'axios';
export default {
    data() {
        return {
            collapse: true,
            fullscreen: false,
            name: '',
            message: 0,
            qiyeID: '',
            dialogVisibpassword: false,
            circleUrl: '',
            password: {
                xinpass: '',
                quedingpass: ''
            },
            navData: [
                {
                    index: '0',
                    name: '首页'
                },
                {
                    index: '1',
                    imgUrl: require('../../assets/img/top/topChanpin(2).png'),
                    imgurl2: require('../../assets/img/top/topChanpin(2).jpg'),
                    name: '数据中心'
                },
                {
                    index: '2',
                    imgUrl: require('../../assets/img/top/topChanpin(3).png'),
                    imgurl2: require('../../assets/img/top/topChanpin(3).jpg'),
                    name: '营销中心'
                },
                {
                    index: '3',
                    imgUrl: require('../../assets/img/top/topChanpin(1).png'),
                    imgurl2: require('../../assets/img/top/topChanpin(1).jpg'),
                    name: '产品中心'
                }
            ],
            rules: {
                xinpass: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }
                ],
                quedingpass: [
                    {
                        required: true,
                        message: '请输入确认密码',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    computed: {
        username() {
            var aaas = /^(https):\/\/.+$/;
            var avatarUrl = localStorage.getItem('avatar');
            if (avatarUrl) {
                if (aaas.test(localStorage.getItem('avatar'))) {
                    this.circleUrl = localStorage.getItem('avatar');
                } else {
                    this.circleUrl = localStorage.getItem('imgUrl') + localStorage.getItem('avatar');
                }
            }
            this.qiyeID = localStorage.getItem('loginData');
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },
    mounted() {
        this.qiyeID = localStorage.getItem('loginData');
        // 侧边栏折叠
        if (document.body.clientWidth > 1500) {
            this.collapseChage();
        }
        // 背景切换
        this.BackgroundSwitch();
    },
    methods: {
        // 用户名下拉菜单选择事件
        enlarge() {},
        updatePassword() {
            this.dialogVisibpassword = true;
        },
        // 退出登录
        tuichulogin() {
            localStorage.removeItem('ms_username');
            localStorage.removeItem('token');
            this.$router.push('/login');
        },
        routerbtn(item) {
            if (item.index == 0 && this.qiyeID != 0) {
                this.$router
                    .push({
                        path: './indexshouye'
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else if (item.index == 1) {
                if (this.qiyeID == 0) {
                    this.$router
                        .push({
                            path: './dataCenterindex'
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    this.$router
                        .push({
                            path: './dataCenterindex',
                            path: './datacenter'
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            } else if (item.index == 2) {
                if (this.qiyeID == 0) {
                    this.$router.push({
                        path: './marketingindex'
                    });
                } else {
                    this.$router.push({
                        path: './marketing'
                    });
                }
            } else {
                if (this.qiyeID == 0) {
                    this.$router.push({
                        path: './productindex'
                    });
                } else {
                    this.$router.push({
                        path: './product'
                    });
                }
            }
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        },
        buncuanpassword() {
            // 修改密码
            this.$refs.password.validate((valid) => {
                if (valid) {
                    this.$confirm('是否确定修改密码?', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        const loading = this.$loading({
                            lock: true,
                            text: '修改中...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        if (this.password.xinpass != this.password.quedingpass) {
                            loading.close();
                            return this.$message({
                                showClose: true,
                                message: '您两次输入的密码不一致',
                                type: 'error'
                            });
                        } else {
                            let password = this.password.quedingpass;
                            let data = {
                                avatar: '',
                                password: this.$md5(password),
                                userId: parseInt(localStorage.getItem('userIds'))
                            };
                            console.log(data);
                            this.$axios.post('admin/user/edit', data).then((res) => {
                                console.log(res);
                                loading.close();
                                if (res.status == 200) {
                                    let data = res.data;
                                    if (data.code == 200) {
                                        this.$message({
                                            showClose: true,
                                            message: data.msg,
                                            type: 'success'
                                        });
                                        this.$router.push({
                                            path: './Login'
                                        });
                                        localStorage.removeItem('token');
                                    } else {
                                        this.$message({
                                            showClose: true,
                                            message: data.data,
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
                    });
                }
            });
        },
        // 背景切换
        BackgroundSwitch() {
            // console.log('asdasd');
        }
    }
};
</script>
<style>
.topDataBox {
    display: flex;
    align-items: center;
}

.topDataBox li {
    height: 70px;
    text-align: center;
    line-height: 70px;
    list-style: none;
    cursor: pointer;
}
.topDataBox li div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180px;
}
.topDataBox li span:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2px;
}
.topDataBox li span:nth-child(2) {
    line-height: 70px;
}
.topDataBox li span:first-child img {
    display: inline-block;
    width: 70%;
    height: auto;
}
.fl {
    float: left;
}

.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
}

.collapse-btn {
    float: left;
    padding: 0 15px;
    cursor: pointer;
    line-height: 70px;
}

.collapse {
    width: 30px;
    float: left;
    line-height: 70px;
}

.collapse-btn .img {
    background: #fff;
    width: 50px;
    height: 50px;
    margin-top: 10px;
    border-radius: 50%;
}

.header .logo {
    float: left;
    width: 195px;
    line-height: 70px;
    text-align: center;
}

.header .page-top {
    float: left;
    width: 190px;
    line-height: 71px;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
}

.header .page-top.active {
    background-color: #ffffff;
    color: #4985f0;
}

.header .page-top .icon {
    width: 18px;
    height: 18px;
}

.header-right {
    float: right;
    padding-right: 50px;
}

.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}

.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}

.btn-bell {
    margin-left: 20px;
    margin-right: 20px;
}

.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}

.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #f56c6c;
    color: #fff;
    padding: 0;
    font-size: 3px;
}

.btn-bell .el-icon-bell {
    color: #fff;
}

.user-name {
    margin-left: 10px;
}

.user-avator {
    margin-left: 20px;
}

.user-avator .el-avatar {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}

.el-dropdown-menu__item {
    text-align: center;
}

.iconfontssda {
    font-size: 20px;
    font-weight: 1000px;
    color: #fff;
}

.iconEnlorder {
    position: relative;
}

.iconEnlorder .iconfont {
    position: absolute;
    top: -65px;
    right: 30px;
}

.inputddd {
    width: 200px;
}

.xinpasswo .Btn {
    width: 100px;
    height: 30px;
    background: #2450d2;
    color: #fff;
    padding: 0;
    margin-left: 36%;
    margin-bottom: 30px;
    margin-top: 30px;
}

.el-form-item__label {
    text-align: right;
}

.UPpassword {
    cursor: pointer;
}
</style>
