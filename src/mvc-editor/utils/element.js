import { $toolbarItem, $toolbarSeperator } from '../constants/element.js'

export function createButton(
    commandId,
    title,
    children,
    handler,
    extraClass = ''
) {
    const button = document.createElement('button')
    button.dataset.commandId = commandId
    button.className = $toolbarItem + ' ' + extraClass
    button.title = title
    button.type = 'button'
    button.insertAdjacentElement('beforeend', children)
    button.addEventListener('click', () => handler(title, commandId))

    return button
}

export function createSeparator() {
    const separator = document.createElement('span')
    separator.className = $toolbarSeperator

    return separator
}

export function createIcon(className) {
    const icon = document.createElement('i')
    icon.className = className

    return icon
}

export function createSelect(id, title, options, handler) {
    const select = document.createElement('select')
    select.dataset.id = id
    select.className = $toolbarItem
    select.title = title

    select.addEventListener('change', (e) => {
        const optionValue = e.target.options[e.target.selectedIndex].value
        handler(id, optionValue)
    })

    for (const option of options) {
        const { value, text, selected } = option

        select.insertAdjacentElement(
            'beforeend',
            createOption(value, text, selected)
        )
    }

    return select
}

export function createOption(value, text, isSelected) {
    const option = document.createElement('option')
    option.innerText = text

    if (value) {
        option.setAttribute('value', value)
    }

    if (isSelected) {
        option.setAttribute('selected', isSelected)
    }

    return option
}
