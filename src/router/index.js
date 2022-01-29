//用于创建整个应用的路由
import VueRouter from "vue-router"
//引入组件
import NotFoundComponent from '../components/NotFoundComponent'
import User from '../components/User'
import Manager from '../components/Manager'

//引入路由组件
import UserLogin from '../pages/user/UserLogin'
import ManagerLogin from '../pages/manager/ManagerLogin'


//创建并暴露路由
export default new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '',
			redirect: '/bankuser'
		},
		{
			path: '/bankuser',
			component: User,
			children: [
				{
					path: 'login',
					component: UserLogin
				},
				{
					path: '',
					component: UserLogin
				}
			]
		},
		{
			path: '/bankmanager',
			component: Manager,
			children: [
				{
					path: 'login',
					component: ManagerLogin
				},
				{
					path: '',
					component: ManagerLogin
				}
			]
		},
		{
			path: '*',
			component: NotFoundComponent
		}
	]
})


/* //用于创建整个应用的路由
import VueRouter from "vue-router"
//引入组件
import NotFoundComponent from '../components/NotFoundComponent'
import About from '../pages/About'
import Home from '../pages/Home'

//创建并暴露路由
export default new VueRouter({
	mode: 'history',
	routes: [
		{
			path:'',
			redirect:'/home'
		},
		{
			path: '/about',
			component: About
		},
		{
			path: '/home',
			component: Home,
			children:[
				{
					path:'news',
					component:News,
				},
				{
					path:'message',
					component:Message,
				},
				{
					path:'',
					component:Message
				}
			]
		}
	]
}) */