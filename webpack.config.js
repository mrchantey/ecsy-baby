const path = require('path');

module.exports = {
	entry: './examples/spinning-cube/src/index.ts',
	mode: "development",
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './examples/spinning-cube',
		// historyApiFallback: true
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js'],
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'examples/spinning-cube/'),
	},
};