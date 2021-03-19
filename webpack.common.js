// const path = require('path');

module.exports.createCommonConfig = (dir) => {

    return {
        entry: `${dir}/src/index.ts`,
        mode: "development",
        devtool: 'inline-source-map',
        devServer: {
            contentBase: `${dir}/dist`,
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
            path: `${dir}/dist`,
        },
    }
}


