# webpack-default
A default project setup for webpack

Steps to Recreate:
------------------

1:: run npm init -y

2:: install the following packages...
    - Starting
        + webpack        (--save-dev)
        + webpack-cli    (--save-dev)
        + lodash         (--save)
    - Asset Management
        + css-loader     (--save-dev)
        + style-loader   (--save-dev)
        + csv-loader     (--save-dev)
        + xml-loader     (--save-dev)
        + toml           (--save-dev)
        + yamljs         (--save-dev)
        + json5          (--save-dev)
    - Output Management
        + html-webpack-plugin (--save-dev)

3:: create the following directories and files...
    - Bundle
        + dist/index.html
    - Code/Components/App
        + src/index.js
    - Config
        + webpack.config.js

4:: add starting code to the following files...
    - dist/index.html
        + write initial html DOCTYPE
        + add a script tag whose src is equal to the webpack.config.js output object's filename
    - src.index.js
        + import _ from 'lodash'
        + write code that will be the parent/output for the app's code/components; it is defaulted to write 'Hello webpack'
    - webpack.config.js
        + require the following...
            * path
            * html-webpack-plugin
            * toml, yaml, json5 (if using these data parsers; uninstall these packages if they will not be used, and remove these line from this file)
        + create a module.exports object that handles the following...
            * entry: the app's code/components/content output file/path
              ~ ex. './src/index.js' ~
            * plugins: an array that initiates a new HtmlWebpackPlugin() within the array
              ~ ex. 'plugins: [ new HtmlWebpackPlugin({ title: 'TITLE' }) ]
            * output: object with properties for the bundle file name, and the path handler from required 'path'
              ~ ex. 'output: { filename: 'bundle.js', path: path.resolve(__dirname, 'BUNDLE FOLDER NAME (dist)') }
            * module: object with a property of 'rules' that is an array of rules; this is where asset management packages will NEED to have rules set
                      for any package not used, uninstall the package, and remove the related rule(s) object in rules array
              ~ ex. 'module: { rules: [] } ~

5:: 


TO UNINSTALL PACKAGES FOR ASSET MANAGEMENT (css, data, etc.): npm uninstall css-loader style-loader csv-loader xml-loader toml yamljs json5