import Piece from "./Piece"

const piecesArr = [
    {
        name: 'T',
        matrix: [
            [1, 1, 1, 1],
            [0, 1, 0, 0]
        ],
        color: 'green',
    },
    {
        name: 'L',
        matrix: [
            [1, 1, 1, 1],
            [0, 0, 0, 1]
        ],
        color: 'blue'
    },
    {
        name: 'B',
        matrix: [
            [1, 0],
            [1, 1],
            [1, 1]
        ],
        color: 'red'
    }
]

const Pieces = () => {
    const obj = {}

    obj.pieces = []

    const buildPieces = function() {
        obj.pieces = piecesArr.map(p => {
            const { name, matrix, color } = p
            const piece = Piece(name, matrix, color)
            return piece
        })
    }

    obj.getPieces = function() {
        if (obj.pieces.length === 0) buildPieces()
        return obj.pieces
    }
    obj.getPiece = function(name) {
        return obj.pieces.find(p => p.name === name)
    };

    (() => {
        buildPieces()
    })()
    
    return obj
}

export default Pieces