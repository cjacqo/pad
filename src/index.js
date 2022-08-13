import PuzzleControl from "./control/PuzzleControl"
import Board from "./model/Board"
import Cell from "./model/Cell"

(() => {
    /* App Entry */
    const puzzle = PuzzleControl()
    puzzle.start()
})()