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

        this.initAttribute(attributes)
    }

    /**
     *   // 속성 설정
     * @param {Record<string, any>} attributes
     */
    initAttribute(attributes) {
        for (let [key, value] of Object.entries(attributes)) {
            this.element.setAttribute(key, value)
        }
    }

    /**
     * content내용 설정
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
     * @returns
     */
    getAttribute(key) {
        return this.element.getAttribute(key)
    }

    /**
     * 속성값 변경
     * @param {tagName, content = '', attributes = {}} prevAttribute
     * @returns {tagName: string, content:string, attributes = {}}
     */
    static updateAttribute(prevAttribute) {
        return [...prevAttribute].reduce((acc, attr) => {
            acc[attr.name] = attr.value
            return acc
        }, {})
    }

    /**
     * ID로 노드 찾기
     * @param {Node} rootNode
     * @param {String} id
     * @returns Node
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
     * 다른 Node 하위에 현재 Node 추가
     * @param {Node} parentElement
     */
    appendTo(parentElement) {
        parentElement.appendChild(this.element)
    }

    /**
     * 현재 Node 하위에 Node 추가
     * @param {Node} node
     */
    appendChild(node) {
        this.element.appendChild(node.element)
    }
}

export default Node
