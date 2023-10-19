import { Helper } from 'boot/services'

const Meta = {
	endpoint: 'roles',
	title: 'Roles',
	indexName: 'IndexRoles',
	formName: 'FormRoles',
	breadcrumbsIndex: [
		{ label: 'Home', icon: 'home' },
		{ label: 'User Managements', icon: 'manage_accounts' },
		{ label: 'Roles' }
	],
	breadcrumbsForm: [
		{ label: 'Home', icon: 'home' },
		{ label: 'User Managements', icon: 'manage_accounts' },
		{ label: 'Roles', icon: 'group' },
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
		name: null,
		permissions: []
	},
	details: (L) => {
		return [
			{ key: 'name', label: L.name, value: null },
			{ key: 'permissions', label: L.permissions, value: null }
		]
	}, 
	table: (H, L) => {
		return [
			{ name: 'action', label: L.action, field: 'id', style: 'width: 20px', align: 'center' },
			{ name: 'name', label: L.name, field: 'name', align: 'center' },
			{ name: 'permissions', label: L.permissions, field: 'permissions', align: 'center' },
		]
	}
}

export default Meta