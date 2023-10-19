import { boot } from 'quasar/wrappers';
import TopTable from '../components/TopTable.vue'
import HeaderForm from '../components/HeaderForm.vue'
import ActionButtonTable from '../components/ActionButtonTable.vue'
import CardGeneral from '../components/CardGeneral.vue'

export default boot(({ app }) => {
	app.component('TopTable', TopTable)
	app.component('HeaderForm', HeaderForm)
	app.component('ActionButtonTable', ActionButtonTable)
	app.component('CardGeneral', CardGeneral)
})