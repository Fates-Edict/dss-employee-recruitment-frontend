import { Helper } from 'boot/services'

const Meta = {
	endpoint: 'alternatives',
	title: 'Alternatives',
	indexName: 'IndexAlternatives',
	formName: 'FormAlternatives',
	breadcrumbsIndex: [
		{ label: 'Home', icon: 'home' },
		{ label: 'Master Data', icon: 'folder' },
		{ label: 'Alternatives' }
	],
	breadcrumbsForm: [
		{ label: 'Home', icon: 'home' },
		{ label: 'Master Data', icon: 'folder' },
		{ label: 'Alternatives', icon: 'group' },
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
		name: null
	},
	details: (L) => {
		return [
			{ key: 'name', label: L.name, value: null }
		]
	}, 
	table: (H, L) => {
		return [
			{ name: 'action', label: L.action, field: 'id', style: 'width: 20px', align: 'center' },
			{ name: 'name', label: L.name, field: 'name', align: 'center' }
		]
	}
}

export default Meta