class Node {
    constructor(tagName, content = '', attributes = {}) {
        this.element = document.createElement(tagName)
        this.element.textContent = content

        // 속성 설정
        for (let [key, value] of Object.entries(attributes)) {
            this.element.setAttribute(key, value)
        }
    }

    // 노드 내용 수정 메서드
    setContent(content) {
        this.element.textContent = content
    }

    // 노드 속성 수정 메서드
    setAttribute(key, value) {
        this.element.setAttribute(key, value)
    }

    // 노드 속성 가져오기 메서드
    getAttribute(key) {
        return this.element.getAttribute(key)
    }

    // 노드 탐색 메서드 (DFS 방식)
    static findNodeByContent(rootNode, content) {
        if (rootNode.element.textContent === content) {
            return rootNode
        }
        for (let child of rootNode.element.children) {
            let found = Node.findNodeByContent(
                new Node(child.tagName, child.textContent, child.attributes),
                content
            )
            if (found) return found
        }
        return null
    }

    // DOM에 추가하는 메서드
    appendTo(parentElement) {
        parentElement.appendChild(this.element)
    }

    // 자식 노드 추가 메서드
    appendChild(node) {
        this.element.appendChild(node.element)
    }
}
