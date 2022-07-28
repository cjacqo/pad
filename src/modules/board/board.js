import { Graph } from '../graph'
import './style.css'

class Piece {
    constructor(matrix) {
        this.m = matrix
    }

    draw() {
        for (let i = 0; i < this.m.length; i++) {
            const value = this.m[i]
            console.log(value)
        }
    }
}

const Pieces = [
    [
        [0, 0, 0],
        [1, 0, 1],
        [1, 1, 1]
    ]
]

class BoardCell {
    constructor(type, value, xCoor, yCoor) {
        this.t = type
        this.v = value
        this.x = xCoor
        this.y = yCoor
        this.selected = false
        this.visited = false
    }
}

class Board {
    constructor() {
        this.board = [
            { type: 'month', cells: ['jan', 'feb', 'mar', 'apr', 'may', 'jun'] },
            { type: 'month', cells: ['jul', 'aug', 'sep', 'oct', 'nov', 'dec'] },
            { type: 'day', cells: [1, 2, 3, 4, 5, 6, 7] },
            { type: 'day', cells: [8, 9, 10, 11, 12, 13, 14] },
            { type: 'day', cells: [15, 16, 17, 18, 19, 20, 21] },
            { type: 'day', cells: [22, 23, 24, 25, 26, 27, 28] },
            { type: 'day', cells: [29, 30, 31] },
        ]
        this.neighborDirections = [
            [0, -1],
            [-1, 0], [1, 0],
            [0, 1]
        ]
        this.selection = { month: null, day: null }
        this.vertices = []
        this.adjacent = {}
        this.edges = 0
    }

    start() {
        let errs = []
        for (const [key, value] of Object.entries(this.selection)) {
            if (value === null) {
                errs.push(key)
            }
        }
        if (errs.length === 0) {
            // start the DFS search
            console.log('START SEARCH...')
            this.#markSelections()
            this.#buildEdges()
            this.#recursiveDfs(this.adjacent, this.vertices[0])
        } else {
            let str = 'You need to select a '
            for (let i = 0; i < errs.length; i++) {
                if (i === 1) str += ' & '
                str += errs[i]
            }
            // error message return
            console.log(str)
        }
    }

    #recursiveDfs(graph, node) {
        const callStack = []
        let max = 0

        // Record the visited nodes
        const visited = []

        // Define the DFS function It's nested so we can more easily keep track of the visited nodes and the callstack depth.
        const dfs = (graph, node, visited) => {
            // Mark the next level deep
            callStack.push(node)
            max = Math.max(max, callStack.length)

            // Mark the node as visited
            visited.push(node)

            // Call the function for each child that hasn't been visited
            graph[callStack.length - 1].forEach(child => {
                if (!visited.includes(child) && child.visited === false) {
                    child.visited = true
                    dfs(graph, child, visited)
                }
            })

            // All the children of this node have been scanned, so we're done with it.
            callStack.pop()
        }

        dfs(graph, node, visited)
        console.log('Longest Stack:', max)
    }

    setSelection(type, c) {
        for (const [key, value] of Object.entries(this.selection)) {
            if (type === key) {
                this.selection[key] = c
            }
        }
    }

    #markSelections() {
        const { month, day } = this.selection
        for (let i = 0; i < this.vertices.length; i++) {
            const temp = this.vertices[i]
            if (temp.v === month.v || temp.v === day.v) {
                temp.selected = true
                temp.visited = true
            }
        }
    }

    getBoardCells() {
        return this.board.map(r => (
            r.cells.map(c => c)
        ))
    }

    createAdjacentGraph() {
        const { month, day } = this.selection
        return this.board.map(r => (
            r.cells.map(c => {
                const [temp] = this.vertices.filter(vert => vert.v === c)
                const { v, x, y } = temp
                return {
                    selected: c === month.v || c === day.v,
                    visited: c === month.v || c === day.v,
                    v,
                    x,
                    y
                }
            })
        ))
    }

    #addBoardCell(bc) {
        this.vertices.push(bc)
        this.adjacent[bc] = []
    }

    #buildBoard() {
        const boardContainer = document.createElement('div')
        boardContainer.classList.add('puzzle-board')

        for (let y = 0; y < this.board.length; y++) {
            const { type, cells } = this.board[y]
            const rowContainer = document.createElement('div')
            for (let x = 0; x < cells.length; x++) {
                const v = cells[x]
                const boardCell = new BoardCell(type, v, x, y)
                this.#addBoardCell(boardCell)
                const cellContainer = document.createElement('div')
                cellContainer.addEventListener('click', () => {
                    this.setSelection(type, boardCell)
                })
                cellContainer.innerText = v
                rowContainer.appendChild(cellContainer)
            }
            boardContainer.appendChild(rowContainer)
        }
        document.body.appendChild(boardContainer)
    }

    #buildStartPannel() {
        const startPannelContainer = document.createElement('div')
        const btn = document.createElement('button')
        btn.innerText = 'START'
        btn.addEventListener('click', () => {
            this.start()
        })
        startPannelContainer.appendChild(btn)
        document.body.appendChild(startPannelContainer)
    }

    #buildPieces() {
        for (let i = 0; i < Pieces.length; i++) {
            const p = new Piece(Pieces[i])
        }
    }

    #getFromBoard = (m) => ([x, y]) => (m[y] || [])[x]

    #filterAdjacentNeighbors(x, y, m) {
        return this.neighborDirections
            .map(([dX, dY]) => [x + dX, y + dY])
            .map(this.#getFromBoard(m))
            .filter(v => v !== undefined)
    }

    #buildEdges() {
        const tempBoard = this.createAdjacentGraph()
        let tempNeighbors = []
        for (let r = 0; r < this.board.length; r++) {
            const { cells } = this.board[r]
            for (let c = 0; c < cells.length; c++) {
                if (c >= 0)
                    tempNeighbors.push(this.#filterAdjacentNeighbors(c, r, tempBoard))
            }
        }
        this.adjacent = tempNeighbors
        this.edges = this.adjacent.length
    }

    buildPuzzle() {
        this.#buildBoard()
        this.#buildStartPannel()
        this.#buildPieces()
    }
}

export default Board