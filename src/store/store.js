import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
// dispatch：异步操作，写法： this.$store.dispatch(‘mutations方法名’,值)
// commit：同步操作，写法：this.$store.commit(‘mutations方法名’,值)
const store = new Vuex.Store({
    state: {},
    getters: {
        doneTodos: state => {}
    },
    mutations: {},
    actions: {},

})
export default store;