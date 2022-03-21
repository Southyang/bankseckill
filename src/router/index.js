//用于创建整个应用的路由
import VueRouter from "vue-router"
//引入组件
import NotFoundComponent from '../components/NotFoundComponent'
import User from '../components/User'
import Manager from '../components/Manager'
import CheckGoods from '../components/CheckGoods'
import Checkseckill from '../components/Checkseckill'
import GoodsDetail from '../components/GoodsDetail'
import SeckillGoodsDetail from '../components/SeckillGoodsDetail'

//引入路由组件
import UserLogin from '../pages/user/UserLogin'
import Userregister from '../pages/user/Userregister'
import Userforget from '../pages/user/Userforget'
import Userinterface from '../pages/user/Userinterface'
import InterfaceAccount from '../pages/user/InterfaceAccount'
import InterfaceHome from '../pages/user/InterfaceHome'
import InterfaceOrder from '../pages/user/InterfaceOrder'
import OrderAll from '../pages/user/OrderAll'
import OrderBook from '../pages/user/OrderBook'
import OrderFinish from '../pages/user/OrderFinish'
import InterfaceSetting from '../pages/user/InterfaceSetting'
import SettingPerson from '../pages/user/SettingPerson'
import SettingAccount from '../pages/user/SettingAccount'
import SettingArticle from '../pages/user/SettingArticle'
import HomeActivity from '../pages/user/HomeActivity'
import OrderDetail from '../pages/user/OrderDetail'

import ManagerLogin from '../pages/manager/ManagerLogin'
import ManagerInterface from '../pages/manager/ManagerInterface'
import InterfaceCheck from '../pages/manager/InterfaceCheck'
import InterfaceGet from '../pages/manager/InterfaceGet'
import InterfaceConfigure from '../pages/manager/InterfaceConfigure'
import InterfaceAdd from '../pages/manager/InterfaceAdd'
import InterfaceModify from '../pages/manager/InterfaceModify'
import InterfaceDelete from '../pages/manager/InterfaceDelete'
import InterfaceAddseckill from '../pages/manager/InterfaceAddseckill'
import InterfaceModifyseckill from '../pages/manager/InterfaceModifyseckill'
import InterfaceDeleteseckill from '../pages/manager/InterfaceDeleteseckill'
import InterfaceAddDetail from '../pages/manager/InterfaceAddDetail'
import InterfaceModifyDetail from '../pages/manager/InterfaceModifyDetail'

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
					path: 'register',
					component: Userregister
				},
				{
					path: 'forget',
					component: Userforget
				},
				{
					path: 'interface',
					component: Userinterface,
					children: [
						{ //interface的默认路由
							path: '',
							redirect: 'account'
						},
						{
							path: 'account',
							component: InterfaceAccount
						},
						{
							path: 'home',
							component: InterfaceHome,
							children: [
								{ //InterfaceHome的默认路由
									path: '',
									redirect: 'homeactivity'
								},
								{
									path: 'checkgoods',
									component: CheckGoods
								},
								{
									path: 'homeactivity',
									component: HomeActivity
								},
								{
									path: 'checkseckillgoods',
									component: Checkseckill
								}/* ,
								{
									name: 'goodsdetail',
									path: 'goodsdetail',
									component: GoodsDetail
								},
								{
									name: 'seckillgoodsdetail',
									path: 'seckillgoodsdetail',
									component: SeckillGoodsDetail
								}, */
							]
						},
						{
							path: 'order',
							component: InterfaceOrder,
							children: [
								{ //order的默认路由
									path: '',
									redirect: 'orderall'
								},
								{
									path: 'orderall',
									component: OrderAll
								},
								{
									path: 'orderbook',
									component: OrderBook
								},
								{
									path: 'orderfinish',
									component: OrderFinish
								}
							]
						},
						{
							path: 'setting',
							component: InterfaceSetting,
							children: [
								{ //setting的默认路由
									path: '',
									redirect: 'settingperson'
								},
								{
									path: 'settingperson',
									component: SettingPerson
								},
								{
									path: 'settingaccount',
									component: SettingAccount
								},
								{
									path: 'settingarticle',
									component: SettingArticle
								}
							]
						}
					]
				},
				{
					name: 'seckillgoodsdetail',
					path: 'seckillgoodsdetail',
					component: SeckillGoodsDetail
				},
				{
					name: 'goodsdetail',
					path: 'goodsdetail',
					component: GoodsDetail
				},
				{
					name: 'orderdetail',
					path: 'orderdetail',
					component: OrderDetail
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
				},
				{
					path: 'interface',
					component: ManagerInterface,
					children: [
						{ //interface的默认路由
							path: '',
							redirect: 'checkapplication'
						},
						{
							path: 'checkapplication',
							component: InterfaceCheck
						},
						{
							path: 'getresult',
							component: InterfaceGet
						},
						{
							path: 'configurerule',
							component: InterfaceConfigure
						},
						{
							path: 'addgoods',
							component: InterfaceAdd
						},
						{
							path: 'modifygoods',
							component: InterfaceModify
						},
						{
							path: 'deletegoods',
							component: InterfaceDelete
						},
						{
							path: 'addseckillgoods',
							component: InterfaceAddseckill
						},
						{
							path: 'modifyseckillgoods',
							component: InterfaceModifyseckill
						},
						{
							path: 'deleteseckillgoods',
							component: InterfaceDeleteseckill
						},
						{
							path: 'addgoodsdetail',
							component: InterfaceAddDetail
						},
						{
							path: 'modifygoodsdetail',
							component: InterfaceModifyDetail
						}
					]
				}
			]
		},
		{ //整体的错误提示路由
			path: '*',
			component: NotFoundComponent
		}
	]
})