import Graph from "../graph/graph"

function Piece({ name, id, matrix }) {
    this.n = name
    this.i = id
    this.m = matrix
    this.generateRotations = function (m) {
        this.rotations = [m]
        const temp = this.rotations

        const test = [
            [1, 0, 0],
            [1, 1, 1]
        ]
        const test2 = [
            [1, 1],
            [1, 0],
            [1, 0]
        ]
        const test3 = [
            [1, 1, 1],
            [0, 0, 1]
        ]
        const test4 = [
            [1, 0, 0],
            [1, 1, 1]
        ]

        const testRotations = [test, test2]
        // this.addRotation([test, test2], test3)
        this.addRotation([test, test2, test3], test4)

        this.rotate(temp)
        // this.rotations.push(matrix)
        // console.log(this.rotations)
    }

    this.getRotations

    this.generateRotations(this.m)
}

class PieceTest {
    constructor({ name, id, matrix }) {
        this.n = name
        this.i = id
        this.m = matrix
        this.rotations = []
        this.dimensions = function (m) {
            const currentDimensions = {
                r: m.length,
                c: m[0].length
            }
            const nextDimensions = {
                r: m[0].length,
                c: m.length
            }
            return { currentDimensions, nextDimensions }
        }
    }

    get name() { return this.n }
    get index() { return this.i }
    get matrix() { return this.m }
    get rotationsArr() { return this.rotations }
    set rotationsArr(r) {
        this.rotations.push(r)
    }

    // pass a matrix that will push a rotation to the first index
    #addRotation(m) {
        this.rotations.push(m)
        return
    }

    // initialize the rotations array to have it's 0 index set to the piece
    //     matrix by default, and start building the array of rotations
    #initRotationsArr() {
        // - push default starting matrix
        if (this.rotations.length === 0) this.#addRotation(this.m)
        return
    }

    #compareMatrices(curr, next) {
        if (curr.length !== next.length) return false
        const tempMatch = []
        let truthCount = 0
        for (let r = 0; r < next.length; r++) {
            const currRow = curr[r]
            const nextRow = next[r]
            let tempEval = []
            for (let c = 0; c < nextRow.length; c++) {
                tempEval.push(nextRow[c] === currRow[c])
            }
            tempEval = tempEval.reduce((prev, next) => !prev && !next ? false : true)
            tempMatch.push(tempEval)
        }

        tempMatch.forEach(match => {
            if (match) truthCount++
        })
        return truthCount === tempMatch.length
    }

    #rotate(cm, d) {
        const { currentDimensions, nextDimensions } = d
        const nm = []
        const maxRows = nextDimensions.r
        const maxCols = nextDimensions.c
        // --- run for loops while nm rows (length) are not equal to the nextDimensions rows
        while (nm.length !== maxRows) {
            const arr = []
            let i = 0
            let j = nm.length
            while (arr.length !== maxCols) {
                arr.push(cm[i][j])
                i++
            }
            nm.push(arr.reverse())
        }
        return nm
    }
    #transform(cm) {
        const nm = []
        const maxRows = cm.length
        const maxCols = cm[0].length

        while (nm.length !== maxRows) {
            const arr = []
            let i = 0
            let j = nm.length
            while (arr.length !== maxCols) {
                arr.push(cm[j][i])
                i++
            }
            nm.push(arr.reverse())
        }
        return nm
    }

    #createRotations(a, i) {
        const initialMatrix = a[i]
        const dimensions = this.dimensions(initialMatrix)
        const nextMatrix = this.#rotate(initialMatrix, dimensions)
        const deepCopyArr = a
        if (this.#compareMatrices(deepCopyArr[0], nextMatrix)) return deepCopyArr
        deepCopyArr.push(nextMatrix)
        return this.#createRotations(deepCopyArr, ++i)
    }

    #createTransformations(a, i) {
        const initialMatrix = a[i]
        const nextMatrix = this.#transform(initialMatrix)
        const deepCopyArr = a
        if (this.#compareMatrices(deepCopyArr[0], nextMatrix)) return deepCopyArr
        deepCopyArr.push(nextMatrix)
        return this.#createTransformations(deepCopyArr, ++i)
    }

    #buildRotationsArr(rotArr) {
        const tempRotationsArr = rotArr
        return this.#createRotations(tempRotationsArr, 0)
    }

    #buildTransformationsArr(rotArr) {
        const tempTransformationsArr = rotArr
        console.log(rotArr)
        return this.#createTransformations(tempTransformationsArr, 0)
        // const allTransformations = this.#createTrxansformations(tempTransformationsArr, 0)
    }

    init() {
        // initialize the rotations array
        this.#initRotationsArr()
        this.rotations = this.#buildTransformationsArr(this.#buildRotationsArr(this.rotations))
        console.log(this.rotations)
        // this.#startRotations(this.rotations)
        return
    }
}

Piece.prototype.addRotation = function (arr, nr, addToArr) {
    const stack = arr

    while (stack.length > 0 || addToArr === false) {
        const compare = stack.pop()
        // for (let )

        if (compare[0].length === nr.length) {
            for (let r = 0; r < compare.length; r++) {
                if (compare[r] !== nr[r]) {
                    const tempArr = arr
                    tempArr.push(nr)
                    console.log(compare[r])
                    // this.rotations.push(nr)
                    this.addRotation(arr, nr, true)
                }
            }
        }
        console.log(compare, nr)

        // compare.forEach(cr => {
        //     if (cr[0].length === nr[0].length) {
        //         let cRow
        //         let nRow
        //         let cVal
        //         let nVal
        //         for (let r = 0; r < cr.length; r++) {
        //             cRow = cr[r]
        //             nRow = nr[r]
        //             for (let j = 0; j < cRow.length; j++) {
        //                 cVal = cRow[j]
        //                 nVal = nRow[j]
        //                 // if (cVal !== nVal) {
        //                 //     endCheck = true
        //                 //     addRotation = true
        //                 // }
        //             }
        //         }
        //     }
        //     // endCheck = false
        //     // addRotation = false
        // })
    }
    if (addToArr) {
        // this.rotations.push(nr)
        console.log(this.rotations)
    }
    // var addRotation = false
    // var endCheck = false
    // console.log(nr)
    // while (endCheck === false) {
    //     arr.forEach(cr => {
    //         if (cr[0].length === nr[0].length) {
    //             let cRow
    //             let nRow
    //             let cVal
    //             let nVal
    //             for (let r = 0; r < cr.length; r++) {
    //                 cRow = cr[r]
    //                 nRow = nr[r]
    //                 for (let j = 0; j < cRow.length; j++) {
    //                     cVal = cRow[j]
    //                     nVal = nRow[j]
    //                     if (cVal !== nVal) {
    //                         endCheck = true
    //                         addRotation = true
    //                     }
    //                 }
    //             }
    //         }
    //         endCheck = false
    //         addRotation = false
    //     })
    //     endCheck = true

    // }
    // console.log(addRotation)
    // if (addRotation) {
    //     arr.push(nr)
    // }
    // console.log(arr)
}

Piece.prototype.compareRows = function (cr, nr) {
    console.log(cr)
    console.log(nr)
}

Piece.prototype.getDimensions = function (m) {
    const currentDimensions = {
        r: m.length,
        c: m[0].length
    }
    const nextDimensions = {
        r: m[0].length,
        c: m.length
    }
    return { currentDimensions, nextDimensions }
}

// @param: cm = current matrix
// @param: d = current & next matrix dimensions
Piece.prototype.getRotatedMatrix = function (cm, d) {
    const { currentDimensions, nextDimensions } = d
    const nm = []
    const maxRows = nextDimensions.r
    const maxCols = nextDimensions.c
    // --- run for loops while nm rows (length) are not equal to the nextDimensions rows
    while (nm.length !== maxRows) {
        const arr = []
        let i = 0
        let j = nm.length
        while (arr.length !== maxCols) {
            arr.push(cm[i][j])
            i++
        }
        nm.push(arr.reverse())
    }

    this.rotationExists(nm)

    // if (!this.rotationExists(nm)) {
    //     console.log(this.rotations)
    //     this.rotations.push(nm)
    //     const currentRotation = this.rotations[this.rotations.length - 1]
    //     const dimensions = this.getDimensions(currentRotation)
    //     this.getRotatedMatrix(currentRotation, dimensions)
    // }

    console.log(this.rotations)

    return
}

Piece.prototype.rotationExists = function (nm) {
    var searching = true
    // this.rotations.forEach(rotation => {
    //     for (let i = 0; i < rotation.length; i++) {
    //         console.log(rotation)
    //         console.log(nm)
    //     }
    // })
    // for (let i = 0; i < this.rotations.length; i++) {
    //     const tempRotation = this.rotations[i]
    //     // check if the heights are equal
    //     console.log(tempRotation.length === nm.length)
    //     if (tempRotation.length === nm.length) {
    //         // double loop over rotation and compare to nm
    //         for (let r = 0; r < nm.length; r++) {
    //             for (let c = 0; c < nm[0].length; c++) {
    //                 const nmVal = nm[r][c]
    //                 const trVal = tempRotation[r][c]
    //                 console.log(nmVal)
    //                 console.log(trVal)
    //             }
    //         }
    //     }
    //     searching = false
    // }
    // return false
    // // const { cm, nm } = matrices
    // this.rotations.filter(rotation => {
    //     if (rotation.length === nm.length) {
    //         for (let i = 0; i < rotation.length; i++) {
    //             for (let j = 0; j < rotation.length; j++) {
    //                 console.log(nm[i][j])
    //             }
    //         }
    //     }
    //     return false
    // })

}

Piece.prototype.rotate = function (rotations) {
    // get the current rotation, then the dimensions of this and the next matrix
    const currentRotation = rotations[rotations.length - 1]
    const dimensions = this.getDimensions(currentRotation)
    this.getRotatedMatrix(currentRotation, dimensions)

    // get new matrix based on next dimensions
    // if (this.rotationExists(this.getRotatedMatrix(currentRotation, dimensions))) {
    //     console.log("DON'T ADD TEMPMATRIX")
    // }

    // // create a copy of this rotations array, and pop the temp stack for a current matrix
    // const tempRotations = this.rotations
    // const currentRotation = tempRotations.pop()
    // console.log(this.rotations)


    // // get dimensions of the next matrix
    // const dimensions = this.getDimensions(currentRotation)

    // // get new matrix based on next dimensions
    // if (this.rotationExists(this.getRotatedMatrix(currentRotation, dimensions))) {
    //     console.log("DON'T ADD TEMPMATRIX")
    // }

    return
}

export { Piece, PieceTest }