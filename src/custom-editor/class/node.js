class Node {
    /**
     * Node 각 paragraph에 들어갈 최 하단의 노드
     * @param {Object} params - 매개변수
     * @param {string} params.id - 고유 ID
     * @param {string} params.tagName - 태그 이름
     * @param {string} [params.content=''] - 텍스트 내용
     * @param {Object} [params.attributes={}] - 속성들
     */
    constructor({ id, tagName, content = '', attributes = {} }) {
        this.id = id
        this.element = document.createElement(tagName)
        this.element.textContent = content
        this.element.setAttribute('data-id', id) // data-id 속성 설정
        this.initAttribute(attributes)
    }

    /**
     * 속성 설정
     * @param {Record<string, any>} attributes
     */
    initAttribute(attributes) {
        for (let [key, value] of Object.entries(attributes)) {
            this.element.setAttribute(key, value)
        }
    }

    /**
     * content 내용 설정
     * @param {String} content
     */
    setContent(content) {
        this.element.textContent = content
    }

    /**
     * 속성값 설정 eg. class, id
     * @param {String} key
     * @param {String} value
     */
    setAttribute(key, value) {
        this.element.setAttribute(key, value)
    }

    /**
     * 속성값 가져오기 eg. class, id
     * @param {String} key
     * @returns {String|null}
     */
    getAttribute(key) {
        return this.element.getAttribute(key)
    }

    /**
     * 속성값 변경
     * @param {NamedNodeMap} prevAttribute - 이전 속성
     * @returns {Object} - 변경된 속성
     */
    static updateAttribute(prevAttribute) {
        return [...prevAttribute].reduce((acc, attr) => {
            acc[attr.name] = attr.value
            return acc
        }, {})
    }

    /**
     * ID로 노드 찾기
     * @param {Node} rootNode - 탐색 시작 노드
     * @param {String} id - 찾고자 하는 노드의 ID
     * @returns {Node|null} - 찾은 노드 또는 null
     */
    static findNodeById(rootNode, id) {
        const stack = [rootNode]

        while (stack.length) {
            const currentNode = stack.pop()
            const isFind = currentNode.id === id

            if (isFind) return currentNode

            for (let child of currentNode.element.children) {
                const { tagName, textContent, attributes } = child

                stack.push(
                    new Node({
                        id: child.getAttribute('data-id'), // 노드의 ID를 가져옵니다.
                        tagName,
                        content: textContent,
                        attributes: this.updateAttribute(attributes),
                    })
                )
            }
        }
        return null
    }

    /**
     * 커서 위치로 노드를 찾는 메서드
     * @returns {Node|null} - 커서 위치의 노드 또는 null(찾지 못한 경우)
     * https://developer.mozilla.org/ko/docs/Web/API/Window/getSelection
     */
    static findNodeByCursor() {
        const selection = window.getSelection()

        if (!selection.rangeCount) return null

        const range = selection.getRangeAt(0)
        let node = range.startContainer

        while (node && !node.getAttribute('data-id')) {
            node = node.parentNode
        }

        if (!node) return null

        return new Node({
            id: node.getAttribute('data-id'),
            tagName: node.tagName,
            content: node.textContent,
            attributes: Node.updateAttribute(node.attributes),
        })
    }

    /**
     * 다른 Node 하위에 현재 Node 추가
     * @param {Node} parentElement - 부모 요소
     */
    appendTo(parentElement) {
        parentElement.appendChild(this.element)
    }

    /**
     * 현재 Node 하위에 Node 추가
     * @param {Node} node - 자식 노드
     */
    appendChild(node) {
        this.element.appendChild(node.element)
    }
}

export default Node
