import Cell from "./Cell"

const boardValues = [
    ['jan', 'feb', 'mar', 'apr', 'may', 'jun', null],
    ['jul', 'aug', 'sep', 'oct', 'nov', 'dec', null],
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, 31, null, null, null, null]
]

const Board = () => {
    const obj = {}
    const matrix = [
        [0, 0, 0, 0, 0, 0, -1],
        [0, 0, 0, 0, 0, 0, -1],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, -1, -1, -1, -1]
    ]

    obj.board = []
    obj.path = new Map()

    const findNeighbors = function(r, c, cell) {
        if (r < 0 || r >= obj.board.length || c < 0 || c >= obj.board[0].length || obj.board[r][c].isVisited()) return
        else if (!cell.isVisited()) {
            cell.setVisited(true)

            let top, right, bottom, left

            if (c - 1 > 0) {
                left = obj.board[r][c - 1]
                if (!left.isOOB() && !left.isVisited() && left.isCovered()) cell.setNeighbor('left', left)
            }
            if (c + 1 < obj.board[0].length) {
                right = obj.board[r][c + 1]
                if (!right.isOOB() && !right.isVisited() && right.isCovered()) cell.setNeighbor('right', right)
            }
            if (r - 1 > 0) {
                top = obj.board[r - 1][c]
                if (!top.isOOB() && !top.isVisited() && top.isCovered()) cell.setNeighbor('top', top)
            }
            if (r + 1 < obj.board.length) {
                bottom = obj.board[r + 1][c]
                if (!bottom.isOOB() && !bottom.isVisited() && bottom.isCovered()) cell.setNeighbor('bottom', bottom)
            }
        }
    }

    const buildPaths = function() {
        const rowLen = obj.board.length
        const colLen = obj.board[0].length
        let edge = 0
        for (let r = 0; r < rowLen; r++) {
            for (let c = 0; c < colLen; c++) {
                const cell = obj.board[r][r]
                if (!cell.isCovered() || !cell.isVisited() || !cell.isOOB()) findNeighbors(r, c, cell)
                // if (cell.hasNeighbors()) {
                //     const keys = Object.keys(cell.getNeighbors())

                // }
            }
        }
    }

    const buildMask = function(cell, dir, max) {
        const visited = new Set([ cell ])
        const queue = [ [cell, dir.shift(), 0 ] ]

        while (queue.length > 0) {
            const [ node, directions, distance ] = queue.shift()
            if (node === undefined || visited.size === max) return visited
            for (let d = 0; d < directions.length; d++) {
                const next = node.getNeighborsByKey(directions[d])
                if (next === undefined) return visited
                if (!visited.has(next)) {
                    visited.add(next)
                    queue.push([ next, dir.shift(), distance + 1 ])
                }
            }
        }
    }

    obj.handleSelection = function(cell) {
        console.log(cell.getValue())
        console.log(cell.isCovered())
        const isCovered = !cell.isCovered()
        const value = isCovered ? 1 : 0
        cell.changeValue(value)
        console.log(cell)
    }

    obj.getBoard = function() {
        if (obj.board.length === 0) obj.buildBoard()
        return obj.board
    }
    obj.buildBoard = function(a = false, b = false) {
        if (obj.board.length !== 0) obj.board = []
        for (let r = 0; r < matrix.length; r++) {
            const row = []
            for (let c = 0; c < matrix[r].length; c++) {
                let value = matrix[r][c]
                if (a && b && (a[0] === r && a[1] === c || b[0] === r && b[1] === c)) value = 1
                const text = boardValues[r][c]
                const type = typeof text === 'string' ? 'm' : 'd'
                const cell = Cell(r, c, value, type, text)
                row.push(cell)
            }
            obj.board.push(row)
        }
        return
    }

    obj.getCellAtVertex = function(coordinate) {
        return obj.board[coordinate[0]][coordinate[1]]
    }

    obj.placePiece = function(directions, size) {
        const rowLen = obj.board.length
        const colLen = obj.board[0].length
        let max = size
        console.log(size)
        // for (let i = 0; i < directions.length; i++) {
        //     for (let j = 0; j < directions[i].length; j++) {
        //         max++
        //     }
        // }

        let temp = []
        for (let r = 0; r < rowLen; r++) {
            for (let c = 0; c < colLen; c++) {
                /* create a copy of the directions & create a variable for the starting cell */
                const tempD = [...directions]
                const cell = obj.board[r][c]
                let mask
                if (!cell.isCovered() && !cell.isOOB()) mask = buildMask(cell, tempD, max)
                if (mask) {
                    if (mask.size === max) temp.push(mask)
                }
                // console.log(temp)
            }
        }
        return temp
    }

    return obj
}

export default Board
