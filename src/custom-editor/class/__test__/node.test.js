import { JSDOM } from 'jsdom'
import Node from '../node.js'

const { window } = new JSDOM()

global.document = window.document

// Node 클래스 테스트
describe('Node class', () => {
    const nodeData = {
        id: '1',
        tagName: 'p',
        content: '야호 클래스의 p태그 생성',
        attributes: {
            class: '야호',
            'data-id': '1',
        },
    }

    test('주어진 tag, content, attributes가 있는 경우, 노드를 생성할 수 있어야 한다.', () => {
        const node = new Node(nodeData)
        expect(node.element.tagName).toBe(nodeData.tagName.toUpperCase())
        expect(node.element.textContent).toBe(nodeData.content)
        expect(node.element.getAttribute('class')).toBe(
            nodeData.attributes.class
        )
        expect(node.id).toBe(nodeData.id)
    })

    test('setContent를 사용하는 경우, content내용이 변경되어야 한다.', () => {
        const node = new Node(nodeData)
        const changeContent = 'set Content Test'

        node.setContent(changeContent)
        expect(node.element.textContent).toBe(changeContent)
    })

    test('setAttribute를 사용하는 경우, getAttribute를 통해 변경된 값을 가져올 수 있어야 한다.', () => {
        const node = new Node(nodeData)
        node.setAttribute('class', 'test-class')
        expect(node.getAttribute('class')).toBe('test-class')
    })

    test('findNodeById 메서드를 사용하는 경우, ID로 자식 노드를 찾을 수 있어야 한다.', () => {
        const parent = new Node({
            id: '0',
            tagName: 'div',
            attributes: { 'data-id': '0' },
        })
        const child1 = new Node({
            id: '1',
            tagName: 'p',
            content: 'child Node 1',
            attributes: { 'data-id': '1' },
        })
        const child2 = new Node({
            id: '2',
            tagName: 'p',
            content: 'child Node 2',
            attributes: { 'data-id': '2' },
        })
        parent.appendChild(child1)
        parent.appendChild(child2)

        const foundNode = Node.findNodeById(parent, '2')
        expect(foundNode).not.toBeNull()
        expect(foundNode.element.textContent).toBe('child Node 2')
    })
})
