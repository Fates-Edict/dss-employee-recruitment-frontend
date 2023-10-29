import { Helper } from 'boot/services'

const Meta = {
	endpoint: 'simulations',
	title: 'Simulations',
	indexName: 'IndexSimulations',
	formName: 'FormSimulations',
	breadcrumbsIndex: [
		{ label: 'Home', icon: 'home' },
		{ label: 'Master Data', icon: 'folder' },
		{ label: 'Simulations' }
	],
	breadcrumbsForm: [
		{ label: 'Home', icon: 'home' },
		{ label: 'Master Data', icon: 'folder' },
		{ label: 'Simulations', icon: 'group' },
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
		alternatives: [],
		criterias: []
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
			{ name: 'job_vacancy_id', label: L.jobVacancyName, field: 'job_vacancy_name', align: 'center' },
		]
	}
}

export default Meta