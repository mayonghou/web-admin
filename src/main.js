import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './components/common/directives';
import 'babel-polyfill';
import axios from './axios/index.js';
// import VSchart from 'vue-schart';
import echarts from 'echarts';
import globalstyle from './view/cssglobalstyle/globalstyle.css';
Vue.prototype.$echarts = echarts;
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
// import {editorOptions} from './config/vue-quill-editor-config.js'
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;
Vue.use(VueQuillEditor);
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);

import {
    HappyScroll
} from 'vue-happy-scroll'
//自定义组件名
Vue.component('happy-scroll', HappyScroll)
// 引入css
import 'vue-happy-scroll/docs/happy-scroll.css'
//bus
import VueBus from 'vue-bus';
Vue.use(VueBus);
// Xiaoyuer Handling three level routing errors
import Router from 'vue-router';
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};
Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: 'small'
});
import Vuex from 'vuex';
Vue.use(Vuex);
import store from './store/store.js';
Vue.prototype.$axios = axios;

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 商盟后台管理系统`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});
new Vue({
    router,
    // VSchart,
    echarts,
    store,
    ViewUI,
    render: h => h(App)
}).$mount('#app');