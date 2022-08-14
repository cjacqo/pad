import './style.css'

const View = (hsFn) => {
    const obj = {}
    let boardContainer
    let piecesContainer

    const loopMatrix = function (matrix, addClick = false, addText = false, color = false) {
        const temp = []
        for (let r = 0; r < matrix.length; r++) {
            for (let c = 0; c < matrix[r].length; c++) {
                const cell = matrix[r][c]
                const { getText, d, isOOB, isCovered } = cell
                if (isOOB()) continue

                const cellContainer = document.createElement('div')
                cellContainer.style.gridColumn = `${c + 1} / ${c + 2}`
                cellContainer.style.gridRow = `${r + 1} / ${r + 2}`

                if (addClick) {
                    cellContainer.addEventListener('click', function() {
                        hsFn(cell)
                    })
                }
                if (addText) {
                    cellContainer.classList.add('board-cell')
                    const textNode = document.createTextNode(getText())
                    cellContainer.appendChild(textNode)
                }  
                if (color) {
                    cellContainer.classList.add('piece-cell')
                    if (isCovered()) cellContainer.style.backgroundColor = color
                }
                
                temp.push(cellContainer)
            }
        }
        return temp
    }

    const displayBoard = function (board) {
        boardContainer = document.createElement('div')
        boardContainer.classList.add('board-container')
        const children = loopMatrix(board.getBoard(), true, true)
        children.forEach(el => {
            boardContainer.appendChild(el)
        })
        document.body.appendChild(boardContainer)
    }

    const displayPieces = function (pieces) {
        piecesContainer = document.createElement('div')
        piecesContainer.classList.add('pieces-container')
        pieces.getPieces().forEach(p => {
            const children = loopMatrix(p.getPiece(), false, false, p.getColor())
            const pieceContainer = document.createElement('div')
            pieceContainer.classList.add('piece-container')
            children.forEach(el => {
                pieceContainer.appendChild(el)
            })
            piecesContainer.appendChild(pieceContainer)
        })
        document.body.appendChild(piecesContainer)
    }

    obj.displayPuzzle = function (board, pieces) {
        displayBoard(board)
        displayPieces(pieces)
    }

    return obj
}

export default View