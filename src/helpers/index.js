import { Loading, Notify } from 'quasar'

export const Helper = {
	getCurrentLanguage() {
		const lang = localStorage.getItem('language')
		return lang
	},

	getAppName() {
		const lang = this.getCurrentLanguage()
		let appName = ''
		if (lang === 'EN') appName = 'Decision Support System For New Employee Recruitment'
		else appName = 'Sistem Pendukung Keputusan Karyawan Baru'
		return appName
	},

	rowsPerPageOptions() {
		return [5, 10, 25, 50, 0]
	},

	makeTable(columns) {
		const table = {
			columns: [...columns],
			data: [],
			selected: [],
			loading: false,
			pagination: {
				sortBy: 'id',
				descending: true,
				page: 1,
				rowsPerPage: 5,
				rowsNumber: 10
			}
		}
		return table
	},

	baseApi() {
		const url = 'http://localhost:8000/api'
		return url
	},

	rootBaseApi() {
		const url = 'http://localhost:8000'
		return url
	},

	unReactive (arr) {
		arr = JSON.stringify(arr)
		return JSON.parse(arr)
	},

	getToken() {
		const token = localStorage.getItem('token') || null
		const config = {
			headers: { Authorization: `Bearer ${token}` }
		}
		return config
	},

	handlePagination(page, rowsPerPage, sortBy, descending, rowsNumber) {
		let result = { sortBy, descending, page, rowsPerPage, rowsNumber }
		return result
	},

	slugify(str) {
		return String(str)
			.normalize('NFKD') // split accented characters into their base characters and diacritical marks
			.replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
			.trim() // trim leading or trailing whitespace
			.toLowerCase() // convert to lowercase
			.replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
			.replace(/\s+/g, '-') // replace spaces with hyphens
			.replace(/-+/g, '-'); // remove consecutive hyphens
	},

	extractPermissions(meta) {
		const permissions = JSON.parse(sessionStorage.getItem('permissions')).find(obj => obj.slug === meta.endpoint)
		return permissions
	},

	extractErrors(arr, metaRaw) {
		if(arr) {
			const meta = Object.keys(metaRaw)
			let errors = {}
			meta.forEach(element => {
				const key = element
				if(arr[element]) errors[key] = arr[element][0]
				else errors[key] = null
			})
			return errors
		}
	},

	alertSuccess(message) {
		Notify.create({
			type: 'positive',
			message
		})
	},

	alertError(message) {
		Notify.create({
			type: 'negative',
			message
		})
	},

	loadingOverlay(show = false, message) {
		Loading.show({ message })
    if(show === false) setTimeout(() => { Loading.hide() }, 300)
	},

	criteriaType() {
		return ['cost', 'benefit']
	}
}