
const spawn = require('cross-spawn');


const argsIn = process.argv.slice(2)

if (argsIn.length === 0) {
    console.log(`
arg0: build|watch
arg1: dirName
`)
    return
}

const argsOut = []


const instruction = argsIn.shift()
const fileName = argsIn.shift()
const path = `./examples/${fileName}/webpack.config.js`

switch (instruction) {
    default:
    case 'build':
        argsOut.push('webpack', '--config', path)
        break
    case 'watch':
        argsOut.push('webpack', 'serve', '--config', path)
        break
}

const result = spawn.sync('npx', argsOut, { stdio: 'inherit' });