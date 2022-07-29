class Graph {
    constructor() {
        this.vertices = []
        this.adjacent = {}
        this.edges = 0
    }

    // ADD
    addVertex(v) {
        this.vertices.push(v)
    }
    addEdge(v, w) {
        this.adjacent[v].push(w)
        this.adjacent[w].push(v)
        this.edges++
    }
}

export default Graph