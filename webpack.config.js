const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function(env, argv) {
    return {
        target: 'web',
        entry: {
            main: './src/client/index.js'
        },
        mode: env && env.production ? 'production' : 'development',
        devtool: env && env.production ? false : 'source-map',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: env && env.production ? '[chunkhash:8].js' : '[name].js',
            publicPath: '/dist/'
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }, {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: env && env.production
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: env && env.production,
                            implementation: require('sass')
                        }
                    }
                ]
            }, {
                test: /\.(woff2|ttf|png|jpg|gif|jpeg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }
            }]
        },
        performance: {
            hints: false
        },
        plugins: [
            new LoadablePlugin(),
            new MiniCssExtractPlugin()
        ]
    };
};
