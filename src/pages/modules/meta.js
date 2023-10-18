import { Helper } from 'boot/services'

const Meta = {
	endpoint: 'modules',
	title: 'modules',
	breadcrumbsIndex: [
		{ label: 'Home', icon: 'home' },
		{ label: 'User Managements', icon: 'manage_accounts' },
		{ label: 'Modules' }
	],
	breadcrumbsForm: [
		{ label: 'Home', icon: 'home' },
		{ label: 'User Managements', icon: 'manage_accounts' },
		{ label: 'Modules', icon: 'group' },
		{ label: 'Add' },
	],
	model: {
		id: null,
		name: null,
		slug: null
	},
	table: (H, L) => {
		return [
			{ name: 'action', label: L.action, field: 'id' },
			{ name: 'name', label: L.name, field: 'name' },
			{ name: 'slug', label: L.slug, field: 'slug' }
		]
	}
}

export default Meta