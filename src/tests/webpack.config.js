const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin')

//circular dependencies docs
//https://spin.atomicobject.com/2018/06/25/circular-dependencies-javascript/

const outDir = path.resolve(process.cwd(), `src/tests`)


module.exports = {
    // entry: `${dir}/src/index.ts`,
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        contentBase: outDir,
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
    plugins: [
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /a\.js|node_modules/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // allow import cycles that include an asyncronous import,
            // e.g. via import(/* webpackMode: "weak" */ './file.js')
            allowAsyncCycles: false,
            // set the current working directory for displaying module paths
            cwd: process.cwd(),
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        modules: [path.resolve(process.cwd(), 'src'), 'node_modules'],
    },
    output: {
        filename: 'main.js',
        path: outDir,
    },
}