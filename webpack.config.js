const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    mode: isProd ? 'production' : 'development',
    devtool: 'inline-source-map',
    entry: './src/Index.tsx',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: "/",
    },
    devServer: {
        port: 8080,
        open: true, //opens the browser on server start, does not mean the server is 'open' to outside access -Tim
        compress: true,
        liveReload: true,
        hot: true,
        historyApiFallback: true,
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
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        // Creates 'style' nodes from JS strings (injects the CSS into a <style> element in the <head> of the HTML page)
                        loader: "style-loader",
                    },
                    {
                        // Translates CSS into CommonJS (helps with using @import and url())
                        loader: "css-loader",
                    },
                    {
                        // Compiles Sass to CSS
                        loader: "sass-loader",
                    },
                    {
                        // Parse CSS and add vendor prefixes to CSS rules, used by Bootstrap (required for Autoprefixer)
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: () => [
                                    require('autoprefixer'),
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: {
                            plugins: [!isProd && require.resolve('react-refresh/babel')].filter(Boolean),
                        },
                    },
                ],
            },
        ],
    },
    plugins: [!isProd && new ReactRefreshWebpackPlugin()].filter(Boolean),
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
}
