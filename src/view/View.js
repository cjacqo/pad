const View = (hsFn) => {
    const obj = {}
    let boardContainer

    const loopMatrix = function (board) {
        const matrix = board.getBoard()
        const temp = []
        for (let r = 0; r < matrix.length; r++) {
            for (let c = 0; c < matrix[r].length; c++) {
                const cell = matrix[r][c]
                const { getText, d, isOOB } = cell
                if (isOOB()) continue

                const cellContainer = document.createElement('div')
                cellContainer.classList.add('puzzle-board-cell')
                cellContainer.style.gridColumn = `${c + 1} / ${c + 2}`
                cellContainer.style.gridRow = `${r + 1} / ${r + 2}`

                cellContainer.addEventListener('click', function() {
                    hsFn(cell)
                })

                const textNode = document.createTextNode(getText())
                cellContainer.appendChild(textNode)
                temp.push(cellContainer)
            }
        }
        return temp
    }

    obj.displayBoard = function (board) {
        boardContainer = document.createElement('div')
        boardContainer.classList.add('puzzle-board')
        boardContainer.style.display = 'grid'
        const children = loopMatrix(board)
        children.forEach(el => {
            boardContainer.appendChild(el)
        })
        document.body.appendChild(boardContainer)
    }

    return obj
}

export default View