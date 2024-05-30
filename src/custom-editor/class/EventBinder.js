class EventBinder {
    constructor(rootElement, stateManager, nodeManager, onChange) {
        this.rootElement = rootElement
        this.stateManager = stateManager
        this.nodeManager = nodeManager
        this.onChange = onChange

        this.init()
    }

    init() {
        this.rootElement.addEventListener('input', this.handleInput.bind(this))
        this.rootElement.addEventListener('click', this.handleClick.bind(this))
        this.rootElement.addEventListener(
            'keydown',
            this.handleKeydown.bind(this)
        )
        this.rootElement.addEventListener('focus', this.handleFocus.bind(this))
        this.rootElement.addEventListener('blur', this.handleBlur.bind(this))
    }

    handleInput(event) {
        this.stateManager.updateState()
        this.onChange()
    }

    handleClick(event) {
        this.stateManager.updateSelection()
    }

    handleKeydown(event) {
        if (event.key === 'Enter') {
            event.preventDefault() // 기본 Enter 동작 방지
            this.splitNode()
            this.stateManager.updateState()
            this.onChange()
        } else if (event.key === 'Backspace') {
            this.handleBackspace(event)
        }
    }

    handleFocus(event) {
        // 포커스 인 이벤트 처리
    }

    handleBlur(event) {
        // 포커스 아웃 이벤트 처리
    }

    splitNode() {
        const selection = this.stateManager.getState().selection
        if (selection && selection.startContainer) {
            const range = selection.getRangeAt(0)
            const startNode = range.startContainer
            const offset = range.startOffset

            const parentNode = startNode.parentNode
            const newTextNode = document.createTextNode(
                startNode.textContent.substring(offset)
            )
            startNode.textContent = startNode.textContent.substring(0, offset)

            const newNode = new Node({
                id: `node-${Date.now()}`,
                tagName: 'p',
                content: '',
                attributes: { 'data-id': `node-${Date.now()}` },
            })

            parentNode.after(newNode.element)
            newNode.element.appendChild(newTextNode)

            const newRange = document.createRange()
            newRange.setStart(newTextNode, 0)
            newRange.setEnd(newTextNode, 0)
            const newSelection = window.getSelection()
            newSelection.removeAllRanges()
            newSelection.addRange(newRange)
        }
    }

    handleBackspace(event) {
        const selection = this.stateManager.getState().selection
        if (selection && selection.startContainer === selection.endContainer) {
            const range = selection.getRangeAt(0)
            if (
                range.startOffset === 0 &&
                range.startContainer.parentNode.previousSibling
            ) {
                event.preventDefault()
                this.mergeNodes(
                    range.startContainer.parentNode.previousSibling,
                    range.startContainer.parentNode
                )
            }
        }
    }

    mergeNodes(prevNodeElement, currentNodeElement) {
        const prevNode = prevNodeElement
        const currentNode = currentNodeElement

        if (
            prevNode &&
            currentNode &&
            prevNode.nodeType === Node.ELEMENT_NODE &&
            currentNode.nodeType === Node.ELEMENT_NODE
        ) {
            const prevText = prevNode.textContent
            const currentText = currentNode.textContent

            prevNode.textContent = prevText + currentText
            currentNode.remove()

            // 커서 위치를 병합된 노드의 끝으로 이동
            const range = document.createRange()
            const selection = window.getSelection()
            range.setStart(prevNode.childNodes[0], prevText.length)
            range.collapse(true)
            selection.removeAllRanges()
            selection.addRange(range)

            this.stateManager.updateState()
            this.onChange()
        }
    }
}

export default EventBinder
