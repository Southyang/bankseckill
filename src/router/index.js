//用于创建整个应用的路由
import VueRouter from "vue-router"
//引入组件
import NotFoundComponent from '../components/NotFoundComponent'
import User from '../components/User'
import Manager from '../components/Manager'

//引入路由组件
import UserLogin from '../pages/user/UserLogin'
import Userregister from '../pages/user/Userregister'
import ManagerLogin from '../pages/manager/ManagerLogin'

//创建并暴露路由
export default new VueRouter({
	mode: 'history',
	routes: [
		{ //整体的默认路由
			path: '',
			redirect: '/bankuser'
		},
		{
			path: '/bankuser',
			component: User,
			children: [
				{ //bankuser的默认路由
					path: '',
					component: UserLogin
				},
				{
					path: 'login',
					component: UserLogin
				},
				{
					path:'register',
					component: Userregister
				}
			]
		},
		{
			path: '/bankmanager',
			component: Manager,
			children: [
				{ //bankmanager的默认路由
					path: '',
					component: ManagerLogin
				},
				{
					path: 'login',
					component: ManagerLogin
				}
			]
		},
		{ //整体的错误提示路由
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