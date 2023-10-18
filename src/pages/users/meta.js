import { Helper } from 'boot/services'

const Meta = {
	endpoint: 'users',
	breadcrumbsIndex: [
		{ label: 'Home', icon: 'home' },
		{ label: 'User Managements', icon: 'manage_accounts' },
		{ label: 'Users' }
	],
	breadcrumbsForm: [
		{ label: 'Home', icon: 'home' },
		{ label: 'User Managements', icon: 'manage_accounts' },
		{ label: 'Users', icon: 'group' },
		{ label: 'Add' },
	],
	model: {
		id: null,
		role_id: null,
		name: null,
		username: null
	},
	table: (H, L) => {
		return [
			{ name: 'action', label: L.action, field: 'id' },
			{ name: 'role_id', label: L.role, field: 'role_name' },
			{ name: 'name', label: L.name, field: 'name' },
			{ name: 'username', label: L.username, field: 'username' }
		]
	}
}

export default Meta