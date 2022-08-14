import Piece from "./Piece"

const piecesArr = [
    {
        name: 'T',
        matrix: [
            [1, 1, 1, 1],
            [0, 1, 0, 0]
        ],
        color: 'green',
    }
]

const Pieces = () => {
    const obj = {}

    obj.pieces = []

    const buildPieces = function() {
        obj.pieces = piecesArr.map(p => {
            const { name, matrix } = p
            const piece = Piece(name, matrix)
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