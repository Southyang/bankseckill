//用于创建Vuex中的store
import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'
//应用vuex插件
Vue.use(Vuex)

//准备actions,用于响应组件中的动作
const actions = {

}

//准备mutations,用于操作数据
const mutations = {
	
}

//准备state,用于存储数据
const state = {
	title:'银行秒杀系统'
}

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state
})