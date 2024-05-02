const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/editor/index.js', // Your library's entry point
    output: {
        filename: 'tse.js', // Output filename for the bundled library
        path: path.resolve(__dirname, 'dist'), // Output directory for the bundle
        library: 'the-simple-editor', // Name of the library exposed globally
        libraryTarget: 'umd', // Supports AMD, CommonJS, and browser globals
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Transpile modern JavaScript to ES5 (optional)
                    options: {
                        // Your Babel configuration (optional)
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // Process CSS files
            },
        ],
    },
}
