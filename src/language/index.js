import { ID } from './indonesian.js'
import { EN } from './english.js'
const language = localStorage.getItem('language')
let lang = language ? (language === 'ID' ? ID : EN) : EN
export default {
	...lang
}