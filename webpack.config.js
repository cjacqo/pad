const path = require('path')

module.exports = {
    // set the entry to the path of the output file for the app/code in the 'src' folder
    entry: './src/index.js',
    // set the output to the path of the input file in the bundle folder, 'dist'
    output: {
        filename: 'bundle.js',
        // helps resolve the path name to the bundle folder
        path: path.resolve(__dirname, 'dist')
    },
    // asset management
    module: {
        rules: [
            // CSS Styles
            {
                test: /\.css$/i,
                // add the npm packages in this array
                use: ['style-loader', 'css-loader']
            },
            // Image Assets
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            // Fonts
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource'
            }
        ]
    }
}