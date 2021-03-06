const path = require('path');

module.exports = {
	entry: './src/js/index.js',
	mode: 'production',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'web/js/')
	},
	module: {
		rules: [{
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
			}
		}]
	},
};
