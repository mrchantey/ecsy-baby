const path = require('path');

module.exports = {
	entry: './examples/spinning-cube/src/index.ts',
	mode: "development",
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './examples/spinning-cube',
		overlay: true,
		port: 8080
		// historyApiFallback: true
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [{
					loader: 'ts-loader',
					options: {
						configFile: "tsconfig.json"
					}
				}],
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