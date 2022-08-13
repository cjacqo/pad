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
        // console.log(board.getBoard()[0][0].getCell())
    }

    const printPuzzle = function() {
        for (let r = 0; r < board.getBoard().length; r++) {
            for (let c = 0; c < board.getBoard()[r].length; c++) {
                const cell = board.getBoard()[r][c]
                console.log(cell.getCell())
            }
        }
    }

    obj.start = function() {
        view.displayBoard(board)
    }
    
    return obj
}

export default PuzzleControl