import Node from './node.js'

class Tree {
    constructor(rootElement) {
        this.rootElement = rootElement
        this.nodes = []
    }

    /**
     * addNode : 노드를 트리에 추가하는 메서드
     * tagName
     */
    addNode(tagName, content = '', attributes = {}) {
        const node = new Node(tagName, content, attributes)
        this.nodes.push(node)
        node.appendTo(this.rootElement)
    }

    // 노드 내용 수정 메서드
    updateNodeContent(node, content) {
        node.setContent(content)
    }

    // 노드 속성 수정 메서드
    updateNodeAttribute(node, key, value) {
        node.setAttribute(key, value)
    }

    // 커서 위치에 따라 노드 찾기 메서드 (예: content 기준)
    findNodeByContent(content) {
        for (let node of this.nodes) {
            let found = Node.findNodeByContent(node, content)
            if (found) return found
        }
        return null
    }
}

export default Tree
