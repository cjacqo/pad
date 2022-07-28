import _ from 'lodash'
import opmgmt from './opmgmt'
import { Graph } from './modules/graph'
import Board from './modules/board/board'

function component() {
    const element = document.createElement('div')
    const btn = document.createElement('button')

    const g = new Graph()

    // g.addVertex('A')
    // g.addVertex('B')
    // g.addVertex('C')
    // g.addVertex('D')
    // g.addVertex('E')
    // g.addVertex('F')
    // g.addVertex('G')

    // g.addEdge('A', 'B')
    // g.addEdge('A', 'C')
    // g.addEdge('A', 'D')
    // g.addEdge('B', 'C')
    // g.addEdge('B', 'D')
    // g.addEdge('C', 'D')
    // g.addEdge('C', 'E')
    // g.addEdge('D', 'F')
    // g.addEdge('F', 'G')

    // g.printAdjacent()
    // g.printVertices()

    // g.dfs('G')

    const board = new Board()
    board.buildPuzzle()

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ')

    btn.innerHTML = 'Click me and look at console'
    btn.onclick = board.start

    element.appendChild(btn)

    return element
}

document.body.appendChild(component())