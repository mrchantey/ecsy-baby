const fs = require('fs');


const ignore = [
    './src/modules',
    './src/zz-archive',
    './src/zz-deprecated'
]

const ases = [
    'MatrixExt',
    'QuaternionExt',
    'Vector2Ext',
    'Vector3Ext',
]



function getDirsRecursive(parentDir, depth = -1, arr = []) {
    fs.readdirSync(parentDir)
        .forEach(file => {
            const path = `${parentDir}/${file}`
            const stat = fs.statSync(path);
            // console.dir(stat);
            if (stat.isDirectory()) {
                arr.push(path)
                arr = getDirsRecursive(path, depth - 1, arr)
            }
            // else if (depth !== 0)
        })
    return arr
}


const parentDir = './src'

const dirs = getDirsRecursive(parentDir, -1, [parentDir])
    .filter(dir => !ignore.includes(dir))



dirs.forEach(dir => {
    const contents = fs.readdirSync(dir)
        .map(name => name.split('.')[0])
        .filter(name => !ignore.includes(`${dir}/${name}`))
        .filter(name => name != 'index')
        .map(name => {
            if (ases.includes(name))
                return `export * as ${name} from "./${name}"`
            return `export * from "./${name}"`
        })
        .join('\n')
    // console.log(contents);
    fs.writeFileSync(`${dir}/index.ts`, contents)
})

// console.dir(dirs);
