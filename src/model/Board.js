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

    return obj
}

export default Board
