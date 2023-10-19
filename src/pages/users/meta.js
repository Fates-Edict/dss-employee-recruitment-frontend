import { Helper } from 'boot/services'

const Meta = {
	endpoint: 'users',
	title: 'Users',
	indexName: 'IndexUsers',
	formName: 'FormUsers',
	breadcrumbsIndex: [
		{ label: 'Home', icon: 'home' },
		{ label: 'User Managements', icon: 'manage_accounts' },
		{ label: 'Users' }
	],
	breadcrumbsForm: [
		{ label: 'Home', icon: 'home' },
		{ label: 'User Managements', icon: 'manage_accounts' },
		{ label: 'Users', icon: 'group' },
		{ label: 'Form' },
	],
	permissions: {
		create: false,
		read: false,
		update: false,
		delete: false,
		write: false
	},
	model: {
		id: null,
		role_id: null,
		name: null,
		username: null,
		password: null,
		email: null
	},
	details: (L) => {
		return [
			{ key: 'role_name', label: L.role, value: null },
			{ key: 'name', label: L.name, value: null },
			{ key: 'username', label: L.username, value: null },
			{ key: 'email', label: L.email, value: null }
		]
	}, 
	table: (H, L) => {
		return [
			{ name: 'action', label: L.action, field: 'id', style: 'width: 20px', align: 'center' },
			{ name: 'role_id', label: L.role, field: val => val.role_name, align: 'center' },
			{ name: 'name', label: L.name, field: 'name', align: 'center' },
			{ name: 'username', label: L.username, field: 'username', align: 'center' },
			{ name: 'email', label: L.email, field: 'email', align: 'center' },
		]
	}
}

export default Meta