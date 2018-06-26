import path from "path";
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const miniCssExtractPlugin = new MiniCssExtractPlugin()
const htmlWebpackPlugin = new HtmlWebpackPlugin({ template: './src/index.html' })

export default {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [htmlWebpackPlugin, miniCssExtractPlugin]
}