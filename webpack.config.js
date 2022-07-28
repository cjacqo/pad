const path = require('path')

module.exports = {
    // set the entry to the path of the output file for the app/code in the 'src' folder
    entry: './src/index.js',
    // set the output to the path of the input file in the bundle folder, 'dist'
    output: {
        filename: 'main.js',
        // helps resolve the path name to the bundle folder
        path: path.resolve(__dirname, 'dist')
    }
}