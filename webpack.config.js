const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/Index.tsx',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    devServer: {
        port: 8080,
        open: true, //opens the browser on server start, does not mean the server is 'open' to outside access -Tim
        compress: true,
        liveReload: true,
        static: {
            directory: path.resolve(__dirname, './dist'),
        },
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
            progress: true,
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/i,
                use: "css-loader",
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
}