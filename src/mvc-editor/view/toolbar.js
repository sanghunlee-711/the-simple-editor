import { $tseEditorToolbar } from '../constants/element.js'
import { createButton, createIcon, createSelect } from '../utils/element.js'

class ToolbarView {
    constructor() {
        this.toolbar = document.createElement('div')
        this.init()
    }

    init() {
        this.toolbar.className = $tseEditorToolbar
        this.toolbar.id = $tseEditorToolbar
    }

    makeSelects(command) {
        const formatSelects = createSelect(
            'formatblock',
            'Styles',
            [
                { value: 'h1', text: 'Title 1' },
                { value: 'h2', text: 'Title 2' },
                { value: 'h3', text: 'Title 3' },
                { value: 'h4', text: 'Title 4' },
                { value: 'h5', text: 'Title 5' },
                { value: 'h6', text: 'Title 6' },
                { value: 'p', text: 'Paragraph', selected: true },
                { value: 'pre', text: 'Preformatted' },
            ],
            command
        )

        const fontNameSelects = createSelect(
            'fontname',
            'Font',
            [
                { value: 'serif', text: 'Serif', selected: true },
                { value: 'sans-serif', text: 'Sans Serif' },
                { value: 'monospace', text: 'Monospace' },
                { value: 'cursive', text: 'Cursive' },
                { value: 'fantasy', text: 'Fantasy' },
            ],
            command
        )

        return {
            formatSelects,
            fontNameSelects,
        }
    }

    makeButtons(command) {
        const boldButton = createButton(
            'bold',
            'Bold',
            createIcon('fas fa-bold'),
            command
        )

        const italicButton = createButton(
            'italic',
            'Italic',
            createIcon('fas fa-italic'),
            command
        )

        const underLineButton = createButton(
            'underline',
            'underline',
            createIcon('fas fa-underline'),
            command
        )

        const uploadImage = createButton(
            'inertImage',
            'insertImage',
            createIcon('fas fa-image'),
            command,
            'tse-image-upload-button'
        )

        return {
            boldButton,
            italicButton,
            underLineButton,
            uploadImage,
        }
    }

    makeAlign(command) {
        const left = createButton(
            'Left align',
            'justifyLeft',
            createIcon('fas fa-align-left'),
            command
        )

        const right = createButton(
            'Right align',
            'justifyRight',
            createIcon('fas fa-align-right'),
            command
        )

        const center = createButton(
            'Center align',
            'justifyCenter',
            createIcon('fas fa-align-center'),
            command
        )

        return {
            left,
            right,
            center,
        }
    }

    makeList(command) {
        const bulletedList = createButton(
            'Bulleted list',
            'insertUnorderedList',
            createIcon('fas fa-list-ul'),
            command
        )

        const numberdList = createButton(
            'Numbered list',
            'insertOrderedList',
            createIcon('fas fa-list-ol'),
            command
        )

        return {
            bulletedList,
            numberdList,
        }
    }

    makeIndent(command) {
        const dcreasedIndent = createButton(
            'Decrease indent',
            'outdent',
            createIcon('fas fa-indent fa-flip-horizontal'),
            command
        )

        const increasedIndent = createButton(
            'Increase indent',
            'indent',
            createIcon('fas fa-indent'),
            command
        )
        return {
            dcreasedIndent,
            increasedIndent,
        }
    }
}

export default ToolbarView
