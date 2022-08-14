/* Cell Object
* @param: r - number - row
* @param: c - number - column
* @param: v - num/str - value
* @param: t - character - type (d, m, p)
**/
function Cell(r, c, v, t, text) {
    var obj = {
        r,
        c,
        v,
        t,
        text,
        neighbors: {},
        visited: false,
        edges: [],
        getCoordinates: function() { return [r, c] },
        getCell: function() { return this },
        getText: function() { return text },
        getValue: function() { return v },
        getNeighbors: function() { return this.neighbors },
        getNeighborsByKey: function(key) { return this.neighbors[key] },
        hasNeighbors: function() {
            for (var prop in this.neighbors) {
                if (Object.prototype.hasOwnProperty.call(this.neighbors, prop)) {
                    return true
                }
            }
            return false
        },
        changeValue: function(val) { v = val },
        isCovered: function() { return v === 1 },
        isOOB: function() { return v === -1 },
        isVisited: function() { return this.visited },
        setVisited: function(vis) { this.visited = vis },
        setNeighbor: function(key, value) {
            this.neighbors[key] = value 
        }
    }
    return obj
}

export default Cell