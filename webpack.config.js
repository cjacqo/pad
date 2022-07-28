const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const toml = require('toml')
const yaml = require('yamljs')
const json5 = require('json5')

module.exports = {
    // set the entry to the path of the output file for the app/code in the 'src' folder
    // - if you want to split entries, create an object that stores a key/value pair of entryName/entryPath
    entry: {
        index: './src/index.js'
    },
    // plugins
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management'
        })
    ],
    // set the output to the path of the input file in the bundle folder, 'dist'
    output: {
        filename: '[name].bundle.js',
        // helps resolve the path name to the bundle folder
        path: path.resolve(__dirname, 'dist'),
        // clean the dist folder on each save
        clean: true
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
            },
            // Data
            // --- csv
            {
                test: /\.(csv|tsv)$/i,
                // add the npm packages in this array
                use: ['csv-loader']
            },
            // --- xml
            {
                test: /\.xml$/i,
                // add the npm packages in this array
                use: ['xml-loader']
            },
            // --- toml
            {
                test: /\.toml$/i,
                type: 'json',
                parser: {
                    // add imported toml parser
                    parse: toml.parse
                }
            },
            // --- yaml
            {
                test: /\.yaml$/i,
                type: 'json',
                parser: {
                    // add imported yaml parser
                    parse: yaml.parse
                }
            },
            // --- json5
            {
                test: /\.json5$/i,
                type: 'json',
                parser: {
                    // add imported json5 parser
                    parse: json5.parse
                }
            }
        ]
    }
}