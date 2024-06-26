import EditorModel from './model/editorModel.js'
import TextEditorView from './view/textEditor.js'
import ToolbarView from './view/toolbar.js'
import TextEditorController from './controller/textEditor.js'
import ToolbarController from './controller/toolbar.js'

export default class TSEEditor {
    constructor({ onSaveCallback, onSaveImageCallback } = {}) {
        this.editorModel = new EditorModel()
        const editorView = new TextEditorView()
        new TextEditorController({
            model: this.editorModel,
            view: editorView,
            onSaveCallback,
        })

        new ToolbarController({
            model: this.editorModel,
            view: new ToolbarView(),
            editorView: editorView,
            onSaveImageCallback,
        })

        window.onbeforeunload = () => {
            storage.setStorage({ id: 'editor-data', value: '' })
            return
        }
    }
}
