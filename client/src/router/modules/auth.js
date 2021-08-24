const stockRoutes = [
	{
		path: '/stock/inventory',
		component: Layout,
		redirect: '/inventory/',
		meta: { title: 'Quản lý tồn kho' },
		children: [
			{
				path: '',
				name: 'list-inventory',
				component: () => import('@/views/Inventories/index'),
				meta: { title: 'Danh sách' },
			},
			{
				path: 'search',
				name: 'search-inventory',
				component: () => import('@/views/Inventories/components/FormSearchProduct'),
				meta: { title: 'Tìm kiếm' },
			},
			{
				path: 'add/:productId',
				name: 'add-inventory',
				component: () => import('@/views/Inventories/components/FormInventory'),
				meta: { title: 'Thêm mới' },
			},
			{
				path: 'edit/:inventoryId',
				name: 'edit-inventory',
				component: () => import('@/views/Inventories/components/FormInventory'),
				meta: { title: 'Cập nhật' },
			},
		],
	},
];

export default stockRoutes;
