//用于创建整个应用的路由
import VueRouter from "vue-router"
//引入组件
import NotFoundComponent from '../components/NotFoundComponent'
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'

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
})