import { createRouter, createWebHashHistory } from 'vue-router';
import ChatApp from '@/components/ChatApp.vue';

// const stockRoutes = [
// 	{
// 		path: '/stock/inventory',
// 		component: Layout,
// 		redirect: '/inventory/',
// 		meta: { title: 'Quản lý tồn kho' },
// 		children: [
// 			{
// 				path: '/',
// 				name: 'list-inventory',
// 				component: () => import('@/views/Inventories/index'),
// 				meta: { title: 'Danh sách' },
// 			},
// 		],
// 	},
// ];

//  App - router view
// 					-> Layout -> router view

export const constantRoutes = [
	// {
	// 	path: '/',
	// 	component: layouts,
	// 	redirect: '/dashboard',
	// 	children: [
	// 		{
	// 			path: 'dashboard',
	// 			name: 'dashboard',
	// 			component: () => import('@/views/Dashboard/index'),
	// 			meta: { title: 'Dashboard' },
	// 		},
	// 	],
	// },
	// {
	// 	path: '/404',
	// 	name: 'error-404',
	// 	component: () => import('@/views/Error404'),
	// },
];

const router = createRouter({
	history: createWebHashHistory(),
	routes: [{ path: '/', component: ChatApp }],
});

export default router;
