export default class ToolbarController {
    constructor({ model, view, editorView }) {
        this.model = model
        this.view = view
        this.editorView = editorView
        this.init()
    }

    init() {
        this.view.init()
        this.makeToolbarNodeIntoEditor()
        this.view.makeOptions(this.execCommand.bind(this))

        this.execCommand('defaultParagraphSeparator', 'p')
    }

    async uploadImage(event) {
        const file = event.target.files[0]
        const base64 = await convertBase64(file)
        avatar.src = base64
        textArea.innerText = base64
    }

    convertBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)

            fileReader.onload = () => {
                resolve(fileReader.result)
            }

            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    toggleImageUploadPopup() {
        const container = document.querySelector('.tse-image-upload-button')
        const wrapper = document.querySelector('.tse-image-upload-popup')

        if (wrapper) {
            if (wrapper.classList.contains('hidden'))
                wrapper.classList.remove('hidden')
            else wrapper.classList.add('hidden')
        } else {
            const popup = document.createElement('div')
            const uploadInput = document.createElement('input')
            uploadInput.setAttribute('type', 'file')
            const saveButton = document.createElement('button')
            saveButton.textContent = 'save'
            saveButton.setAttribute('data-command', 'save')
            popup.className = 'tse-image-upload-popup'
            popup.appendChild(uploadInput)
            popup.appendChild(saveButton)

            // 2. insert image into editor with insertImage commandKeyword
            let base64 = ''
            uploadInput.addEventListener('change', async (e) => {
                const file = e.target.files[0]
                base64 = await this.convertBase64(file)
            })

            saveButton.addEventListener('click', (e) => {
                const editor = document.getElementById('tse-editor')
                editor.focus()
                document.execCommand('insertImage', false, base64)
                document
                    .querySelector('.tse-image-upload-popup')
                    .classList.add('hidden')
            })

            container.insertAdjacentElement('afterend', popup)
        }
    }

    // * TODO: execCommand가 갈수록 커질 것
    execCommand(commandId, value) {
        if (commandId === 'insertImage') {
            return this.toggleImageUploadPopup()
        }

        document?.execCommand(commandId, false, value || '')
    }

    makeToolbarNodeIntoEditor() {
        const editor = document.getElementById('tse-editor')

        editor.insertAdjacentElement('beforebegin', this.view.toolbar)
    }

    makeToolbarNodeIntoEditor() {
        this.editorView.editor.insertAdjacentElement(
            'beforebegin',
            this.view.toolbar
        )
    }
}
