import { Helper } from 'boot/services'

const Meta = {
	endpoint: 'modules',
	title: 'Modules',
	indexName: 'IndexModules',
	formName: 'FormModules',
	breadcrumbsIndex: [
		{ label: 'Home', icon: 'home' },
		{ label: 'User Managements', icon: 'manage_accounts' },
		{ label: 'Modules' }
	],
	breadcrumbsForm: [
		{ label: 'Home', icon: 'home' },
		{ label: 'User Managements', icon: 'manage_accounts' },
		{ label: 'Modules', icon: 'group' },
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
		slug: null
	},
	details: (L) => {
		return [
			{ key: 'name', label: L.name, value: null },
			{ key: 'slug', label: L.slug, value: null }
		]
	}, 
	table: (H, L) => {
		return [
			{ name: 'action', label: L.action, field: 'id', style: 'width: 20px', align: 'center' },
			{ name: 'name', label: L.name, field: 'name', align: 'center' },
			{ name: 'slug', label: L.slug, field: 'slug', align: 'center' },
		]
	}
}

export default Meta