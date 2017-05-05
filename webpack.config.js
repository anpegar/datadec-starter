const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const publicPath = ''
const isProd = (process.env.NODE_ENV === 'production') ? true : false;

module.exports = {
	entry: {
		vendor: './src/vendor',
		app: './src/main.js'
	},
	output: {
		path: resolve(__dirname, 'dist'),
		filename: isProd ? '[name].js?[chunkhash]' : '[name].js',
		chunkFilename: '[id].js?[chunkhash]',
		publicPath: isProd ? publicPath : '/dist/'
	},
	module: {
		rules: [{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						// Since sass-loader (weirdly) has SCSS as its default parse mode, we map
						// the "scss" and "sass" values for the lang attribute to the right configs here.
						// other preprocessors should work out of the box, no loader config like this necessary.
						'scss': 'vue-style-loader!css-loader!sass-loader',
						'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
					}
					// other vue-loader options go here
				}
			},
			{
				test: /\.js$/,
				use: ['babel-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'~': resolve(__dirname, 'src')
		}
	},
	devServer: {
		host: '127.0.0.1',
		// contentBase: __dirname + '/src',
		port: 3000,
		historyApiFallback: {
			index: url.parse(isProd ? publicPath : '/dist/').pathname
		},
		noInfo: false
	},
	devtool: '#eval-source-map',
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'manifest']
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
	]
}

if (isProd) {
	module.exports.devtool = '#source-map'
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	])
}