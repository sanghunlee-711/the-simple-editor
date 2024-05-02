import { createSeparator } from '../utils/element.js'

export default class ToolbarController {
    constructor({ model, view }) {
        this.model = model
        this.view = view
        this.init()
    }

    init() {
        this.view.init()
        this.addOptionsInToolBar(this.execCommand.bind(this))
        this.addToolbarNodeIntoEditor()

        this.execCommand('defaultParagraphSeparator', 'p')
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

    async uploadImage(event) {
        const file = event.target.files[0]
        const base64 = await convertBase64(file)
        avatar.src = base64
        textArea.innerText = base64
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

    // * Check: execCommand가 갈수록 커질 것
    execCommand(commandId, value) {
        if (commandId === 'insertImage') {
            console.log('insterImage value : ', value, this)
            this.toggleImageUploadPopup()
            return
        }
        document?.execCommand(commandId, false, value || '')
    }

    addToolbarNodeIntoEditor() {
        const editor = document.getElementById('tse-editor')

        editor.insertAdjacentElement('beforebegin', this.view.toolbar)
    }

    uploadImageCommand(commandId, value, callback) {
        //*TODO: find element in direct way is not good
        const popup = document.querySelector('.tse-image-upload-popup hidden')
        if (popup.classList.contains('hidden')) popup.classList.remove('hidden')
        else popup.classList.add('hidden')
    }

    addOptionsInToolBar(command) {
        const { formatSelects, fontNameSelects } =
            this.view.makeSelects(command)

        const { boldButton, italicButton, underLineButton, uploadImage } =
            this.view.makeButtons(command)
        const { left, right, center } = this.view.makeAlign(command)
        const { bulletedList, numberdList } = this.view.makeList(command)
        const { dcreasedIndent, increasedIndent } =
            this.view.makeIndent(command)

        this.view.toolbar.insertAdjacentElement('beforeend', formatSelects)
        this.view.toolbar.insertAdjacentElement('beforeend', fontNameSelects)

        this.view.toolbar.insertAdjacentElement('beforeend', createSeparator())

        this.view.toolbar.insertAdjacentElement('beforeend', boldButton)
        this.view.toolbar.insertAdjacentElement('beforeend', italicButton)
        this.view.toolbar.insertAdjacentElement('beforeend', underLineButton)
        this.view.toolbar.insertAdjacentElement('beforeend', uploadImage)

        this.view.toolbar.insertAdjacentElement('beforeend', createSeparator())

        this.view.toolbar.insertAdjacentElement('beforeend', left)
        this.view.toolbar.insertAdjacentElement('beforeend', center)
        this.view.toolbar.insertAdjacentElement('beforeend', right)

        this.view.toolbar.insertAdjacentElement('beforeend', createSeparator())

        this.view.toolbar.insertAdjacentElement('beforeend', bulletedList)
        this.view.toolbar.insertAdjacentElement('beforeend', numberdList)

        this.view.toolbar.insertAdjacentElement('beforeend', createSeparator())

        this.view.toolbar.insertAdjacentElement('beforeend', increasedIndent)
        this.view.toolbar.insertAdjacentElement('beforeend', dcreasedIndent)
    }
}
