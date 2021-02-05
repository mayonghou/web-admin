<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
    mounted() {
        // var url = 'http://192.168.0.200:7070/api/expand/upload/image';
        let url = 'https://api.gzwjfh.com/api/expand/upload/image';
        localStorage.setItem('actionUrl', url);
        // 图片地址
        let imgurl = 'https://images.gzwjfh.com';
        localStorage.setItem('imgUrl', imgurl);

        // let video = 'http://192.168.0.200:7070/api/expand/upload/video';
        let video = 'https://api.gzwjfh.com/api/expand/upload/video';
        localStorage.setItem('videoUrl', video);
        // 文档上传
        // let fileUrl = 'http://192.168.0.200:7070/api/expand/upload/word';
        let fileUrl = 'https://api.gzwjfh.com/api/expand/upload/word';
        localStorage.setItem('fileUrl', fileUrl);
    }
};
</script>

<style>
@import './assets/css/main.css';
@import './assets/css/color-dark.css';
/*深色主题*/
@import './assets/css/theme-green/fonts/font/iconfont.css';

/* @import "./assets/css/theme-green/color-green.css"; 浅绿色主题 */
.content-box {
    padding-bottom: 0px;
}
.content {
    padding-top: 60px;
}
.ivu-modal-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
}
.ivu-modal {
    top: 0px !important;
}
input::-webkit-input-placeholder {
    color: #aab2bd;
    font-size: 12px;
    text-align: left;
}

.el-date-picker.has-sidebar {
    width: 438px;
    position: relative;
    z-index: 999;
}
/* .el-date-editor {
    border: 1px solid #dcdee2 !important;
    border-radius: 4px !important;
}
.el-date-editor .el-range__icon {
    line-height: 20px !important;
}
.el-date-editor .el-range-separator {
    line-height: 20px !important;
}
.el-input__inner {
    height: 35px !important;
}

.el-input__icon {
    line-height: 35px !important;
} */
</style>

