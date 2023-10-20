import { Helper } from 'boot/services'

const Meta = {
	endpoint: 'criteria',
	title: 'Criteria',
	indexName: 'IndexCriteria',
	formName: 'FormCriteria',
	breadcrumbsIndex: [
		{ label: 'Home', icon: 'home' },
		{ label: 'Master Data', icon: 'folder' },
		{ label: 'Criteria' }
	],
	breadcrumbsForm: [
		{ label: 'Home', icon: 'home' },
		{ label: 'Master Data', icon: 'folder' },
		{ label: 'Criteria', icon: 'group' },
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
		slug: null,
		type: null
	},
	details: (L) => {
		return [
			{ key: 'name', label: L.name, value: null },
			{ key: 'slug', label: L.slug, value: null },
			{ key: 'type', label: L.type, value: null },
		]
	}, 
	table: (H, L) => {
		return [
			{ name: 'action', label: L.action, field: 'id', style: 'width: 20px', align: 'center' },
			{ name: 'name', label: L.name, field: 'name', align: 'center' },
			{ name: 'slug', label: L.slug, field: 'slug', align: 'center' },
			{ name: 'type', label: L.type, field: 'type', align: 'center' },
		]
	}
}

export default Meta