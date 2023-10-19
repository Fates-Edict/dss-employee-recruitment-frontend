import { boot } from 'quasar/wrappers';
import TopTable from '../components/TopTable.vue'
import FormWrapper from '../components/FormWrapper.vue'
import ActionButtonTable from '../components/ActionButtonTable.vue'

export default boot(({ app }) => {
	app.component('TopTable', TopTable)
	app.component('FormWrapper', FormWrapper)
	app.component('ActionButtonTable', ActionButtonTable)
})