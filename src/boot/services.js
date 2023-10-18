import { boot } from 'quasar/wrappers'
import { Helper } from '../helpers/index.js'
import Language from '../language/index.js'

export default boot(({ app }) => {
	app.config.globalProperties.$Helper = Helper
	app.config.globalProperties.$Lang = Language
})

export { Helper, Language }