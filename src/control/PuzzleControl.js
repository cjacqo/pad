import Board from "../model/Board"
import Pieces from "../model/Pieces"
import View from "../view/View"

const PuzzleControl = () => {
    const obj = {}
    obj.selection = {
        month: [],
        day: []
    }

    const handleSelection = function(cell) {
        const { r, c, t } = cell.getCell()
        const { month, day } = obj.selection
        let temp
        if (t === 'm') temp = month
        else temp = day
        if (temp[0] === r && temp[1] === c) temp = [] 
        else temp = [r, c]
        if (t === 'm') obj.selection.month = temp
        else obj.selection.day = temp
        solve()
    }

    const board = Board()
    const pieces = Pieces()
    const view = View(handleSelection)

    const solve = function() {
        const { month, day } = obj.selection
        if (month.length === 0 || day.length === 0) return
        // get board based on selection coordinates
        board.buildBoard(month, day)
        printPuzzle()
    }

    const printPuzzle = function() {
        for (let r = 0; r < board.getBoard().length; r++) {
            for (let c = 0; c < board.getBoard()[r].length; c++) {
                const cell = board.getBoard()[r][c]
                console.log(cell.getCell())
            }
        }
    }

    const placePieceOnBoard = function(p) {
        const path = p.getPath()
        const directions = [...path.values()]
        const boardMatrix = board.getBoard()

        for (let r = 0; r < boardMatrix.length; r++) {
            for (let c = 0; c < boardMatrix[0].length; c++) {
                const boardCell = boardMatrix[r][c]
                console.log(boardCell)
            }
        }

        for (let r = 0; r < directions.length; r++) {
            for (let c = 0; c < directions[r].length; c++) {
                const current = r
                console.log(current)
                console.log(directions[r][(directions[r].length - 1) - c])
            }
        }
    }

    const findNeighbors = function(r, c, cell, rl, cl, m, t) {
        if (r < 0 || r >= rl || c < 0 || c >= cl || m[r][c].isVisited() || m[r][c].isOOB()) return
        else if (!cell.isVisited()) {
            cell.setVisited(true)
            let top, right, bottom, left
            if (c - 1 >= 0) {
                left = m[r][c - 1]
                if (t === 'piece') {
                    if (!left.isOOB() && !left.isVisited() && left.isCovered()) cell.setNeighbor('left', left)
                }
                if (t === 'board') {
                    if (!left.isOOB()) cell.setNeighbor('left', left)
                }
            }
            if (c + 1 < m[0].length) {
                right = m[r][c + 1]
                if (t === 'piece') {
                    if (!right.isOOB() && !right.isVisited() && right.isCovered()) cell.setNeighbor('right', right)
                } else {
                    if (!right.isOOB() && !right.isCovered()) cell.setNeighbor('right', right)
                }
            }
            if (r - 1 >= 0) {
                top = m[r - 1][c]
                if (t === 'piece') {
                    if (!top.isOOB() && !top.isVisited() && top.isCovered()) cell.setNeighbor('up', top)
                } else {
                    if (!top.isOOB() && !top.isCovered()) cell.setNeighbor('up', top)
                }
            }
            if (r + 1 < m.length) {
                bottom = m[r + 1][c]
                if (t === 'piece') {
                    if (!bottom.isOOB() && !bottom.isVisited() && bottom.isCovered()) cell.setNeighbor('down', bottom)
                } else {
                    if (!bottom.isOOB() && !bottom.isCovered()) cell.setNeighbor('down', bottom)
                }
            }
        }
    }

    const loopMatrix = function(m, t, f) {
        const rowLen = m.length
        const colLen = m[0].length
        for (let r = 0; r < rowLen; r++) {
            for (let c = 0; c < colLen; c++) {
                const cell = m[r][c]
                if (t === 'piece') {
                    if (cell.isCovered() || !cell.isVisited()) f(r, c, cell, rowLen, colLen, m, t)
                }
                if (t === 'board') {
                    if (!cell.isCovered() || !cell.isVisited()) f(r, c, cell, rowLen, colLen, m, t)
                }
            }
        }
    }

    const loopPieces = function(cb) {
        pieces.getPieces().forEach(p => {
            cb(p)
        })
    }

    const placePieces = function() {
        const masks = {}
        pieces.getPieces().forEach(p => {
            const path = p.getPath()
            const directions = [...path.values()]
            masks[p.getName()] = board.placePiece(directions, p.getSize())
        })
        console.log(masks)
    }

    obj.start = function() {
        /* render HTML */
        view.displayPuzzle(board, pieces)

        /* get neighbors for each cell in each matrix (board, pieces) */
        loopMatrix(board.getBoard(), 'board', findNeighbors)
        pieces.getPieces().forEach(p => {
            loopMatrix(p.getPiece(), 'piece', findNeighbors)
        })

        /* find all ways each piece can be placed on an empty board */
        placePieces()
    }
    
    return obj
}

export default PuzzleControl