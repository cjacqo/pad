/* Cell Object
* @param: r - number - row
* @param: c - number - column
* @param: v - num/str - value
* @param: t - character - type (d, m, p)
**/
const Cell = function (r, c, v, t, text) {
    const obj = {}
    obj.r = r
    obj.c = c
    obj.v = v
    obj.t = t
    obj.text = text
    obj.neighbors = {
        top: null,
        right: null,
        bottom: null,
        left: null
    }

    obj.getRow = function() { return obj.r }
    obj.getColumn = function() { return obj.c }
    obj.getCoordinates = function() { return [obj.r, obj.c] }
    obj.getValue = function() { return obj.v }
    obj.getType = function() { return obj.t }
    obj.getNeighbors = function() { return obj.neighbors }
    obj.getNeighborAtKey = function(key) { return obj.neighbors[key]}
    /* d = direction, c = cell */
    obj.setNeighbor = function(d, c = null) {
        obj.neighbors[d] = c
    }

    return {
        getCell: function() { return obj },
        getText: function() { return obj.text },
        getValue: function() { return obj.v },
        changeValue: function(val) {
            this.value = val
        },
        isCovered: function() { return obj.v === 1 },
        isOOB: function() {
            return obj.v === -1
        }
    }
}

export default Cell