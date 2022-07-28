import _ from 'lodash'
import opmgmt from './opmgmt'

function component() {
    const element = document.createElement('div')
    const btn = document.createElement('button')

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ')

    btn.innerHTML = 'Click me and look at console'
    btn.onclick = opmgmt

    element.appendChild(btn)

    return element
}

document.body.appendChild(component())