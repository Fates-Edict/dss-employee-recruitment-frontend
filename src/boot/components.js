import { boot } from 'quasar/wrappers';
import TopTable from '../components/TopTable.vue'

export default boot(({ app }) => {
	app.component('TopTable', TopTable)
})