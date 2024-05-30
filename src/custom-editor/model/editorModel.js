import { STORAGE_SAVE_DATA_KEY } from '../constants/storage.js'

class EditorModel {
    constructor() {
        this.initialState = ''

        this.init()
    }

    init() {
        const data = window.sessionStorage.getItem(STORAGE_SAVE_DATA_KEY) || ''
        this.initialState = data
    }
}

export default EditorModel
