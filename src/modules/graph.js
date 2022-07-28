class Graph {
    constructor() {
        this.vertices = []
        this.adjacent = {}
        this.edges = 0
    }

    addVertex(v) {
        this.vertices.push(v)
        this.adjacent[v] = []
    }

    addEdge(v, w) {
        this.adjacent[v].push(w)
        this.adjacent[w].push(v)
        this.edges++
    }

    printAdjacent() {
        const temp = this.adjacent
        console.log(temp)
    }

    printVertices() {
        console.log(this.vertices)
    }

    dfs(goal, v = this.vertices[0], discovered = []) {
        // base case
        let adj = this.adjacent
        discovered[v] = true

        for (let i = 0; i < adj[v].length; i++) {
            let w = adj[v][i]
            console.log(discovered[w])
            if (!discovered[w]) {
                this.dfs(goal, w, discovered)
            }
        }

        console.log(discovered)

        return discovered[goal] || false
    }
}

export { Graph }