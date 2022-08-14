import Cell from "./Cell"

function Piece(name, matrix, color) {
    const obj = {}
    obj.name = name
    obj.matrix = matrix
    obj.color = color
    obj.size = 0
    obj.piece = []

    const buildPiece = function() {
        for (let r = 0; r < obj.matrix.length; r++) {
            const row = []
            for (let c = 0; c < obj.matrix[r].length; c++) {
                const value = obj.matrix[r][c]
                if (value === 1) obj.size++
                const cell = Cell(r, c, value, 'p', obj.name)
                row.push(cell)
            }
            obj.piece.push(row)
        }
        return
    }

    obj.getPiece = function() {
        if (obj.piece.length === 0) buildPiece()
        return obj.piece
    }

    obj.getColor = function() { return obj.color }
    obj.getName = function() { return obj.name }

    const findNeighbors = function(r, c, cell) {
        if (r < 0 || r >= obj.piece.length || c < 0 || c >= obj.piece[0].length || obj.piece[r][c].isVisited()) return
        else if (!cell.isVisited()) {
            cell.setVisited(true)

            let top, right, bottom, left

            if (c - 1 > 0) {
                left = obj.piece[r][c - 1]
                if (!left.isOOB() && !left.isVisited() && left.isCovered()) cell.setNeighbor('left', left)
            }
            if (c + 1 < obj.piece[0].length) {
                right = obj.piece[r][c + 1]
                if (!right.isOOB() && !right.isVisited() && right.isCovered()) cell.setNeighbor('right', right)
            }
            if (r - 1 > 0) {
                top = obj.piece[r - 1][c]
                if (!top.isOOB() && !top.isVisited() && top.isCovered()) cell.setNeighbor('top', top)
            }
            if (r + 1 < obj.piece.length) {
                bottom = obj.piece[r + 1][c]
                if (!bottom.isOOB() && !bottom.isVisited() && bottom.isCovered()) cell.setNeighbor('bottom', bottom)
            }
        }
    }

    obj.getPath = function() {
        // if (obj.piece.length === 0) buildPiece()
        const rowLen = obj.piece.length
        const colLen = obj.piece[0].length
        let path = new Map()
        let edge = 0
        for (let r = 0; r < rowLen; r++) {
            for (let c = 0; c < colLen; c++) {
                const cell = obj.piece[r][c]
                if (cell.isCovered() || !cell.isVisited()) findNeighbors(r, c, cell)
                if (cell.hasNeighbors()) {
                    const keys = Object.keys(cell.getNeighbors())
                    path.set(cell, keys)
                    edge++
                }
            }
        }
        return path
    };
    obj.getSize = function() {
        return obj.size
    };

    (() => {
        buildPiece()
    })()

    return obj
}

export default Piece