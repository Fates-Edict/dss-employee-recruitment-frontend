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
			selected: []
		}
		return table
	},

	baseApi() {
		const url = 'localhost:8000/api'
		return url
	}
}