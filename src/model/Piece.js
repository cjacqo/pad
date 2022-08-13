import Cell from "./Cell"

function Piece(name, matrix) {
    const obj = {}
    obj.name = name
    obj.matrix = matrix
    obj.piece = []

    const buildPiece = function() {
        for (let r = 0; r < obj.matrix.length; r++) {
            const row = []
            for (let c = 0; c < obj.matrix[r].length; c++) {
                const value = obj.matrix[r][c]
                const cell = Cell(r, c, value, 'p', obj.name)
                row.push(cell)
            }
            obj.piece.push(row)
        }
    }

    obj.getPiece = function() {
        if (obj.piece.length === 0) buildPiece()
        return obj.piece
    }

    return obj
}

export default Piece